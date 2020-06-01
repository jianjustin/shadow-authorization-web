<template>
    <v-toolbar id="core-toolbar" app style="background: #FFFFFF;" flat prominent>
        <v-spacer />
        <v-toolbar-items>
            <v-flex align-center layout py-2>
                <router-link v-ripple class="toolbar-items" to="/">
                    <v-icon color>mdi-home</v-icon>
                </router-link>
                <v-menu bottom left content-class offset-y transition="slide-y-transition">
                    <router-link v-ripple slot="activator" class="toolbar-items" to="/dashboard/notifications">
                        <v-badge color="error" overlap>
                            <template slot="badge">{{ notifications.length }}</template>
                            <v-icon color>mdi-bell</v-icon>
                        </v-badge>
                    </router-link>
                    <v-card>
                        <v-list dense>
                            <v-list-tile v-for="notification in notifications" :key="notification" @click="onClick">
                                <v-list-tile-title v-text="notification" />
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-menu>
                <router-link v-ripple class="toolbar-items" to="/dashboard/user-profile">
                    <v-icon color>mdi-account</v-icon>
                </router-link>
                <v-icon class="toolbar-items" color @click="logout">mdi-power</v-icon>
            </v-flex>
        </v-toolbar-items>
    </v-toolbar>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
    data: () => ({
        notifications: [],
        title: '',
        responsive: false,
        responsiveInput: false
    }),

    computed: {
        ...mapGetters(['authorized'])
    },

    watch: {
        $route(val) {
            this.title = val.meta.name
        }
    },

    mounted() {
        this.onResponsiveInverted()
        window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResponsiveInverted)
    },

    methods: {
        ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
        onClickBtn() {
            this.setDrawer(!this.$store.state.app.drawer)
        },
        onClick() {
            //
        },
        onResponsiveInverted() {
            if (window.innerWidth < 991) {
                this.responsive = true
                this.responsiveInput = false
            } else {
                this.responsive = false
                this.responsiveInput = true
            }
        },
        logout: function() {
            this.$store.dispatch('logout').then(() => {
                this.$router.push('/')
            })
        }
    }
}
</script>
<style>
#core-toolbar a {
    text-decoration: none;
}
</style>