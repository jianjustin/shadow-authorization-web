<template>
    <v-navigation-drawer id="app-drawer" v-model="inputValue" app floating persistent mobile-break-point="991" width="260" absolute>
        <v-layout class="fill-height" tag="v-list" column>
            <v-list-tile avatar>
                <v-list-tile-avatar >
                    <v-img :src="logo" />
                </v-list-tile-avatar>
                <v-list-tile-title class="title">
                    权限管理系统
                </v-list-tile-title>
            </v-list-tile>
            <v-divider />
            <v-list-tile v-for="(link, i) in links" :key="i" :to="link.to" :active-class="color" class="v-list-item">
                <v-list-tile-action>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title v-text="link.text" />
            </v-list-tile>
        </v-layout>
    </v-navigation-drawer>
</template>
<script>
export default {
    data: () => ({
        logo: require('@/assets/img/logo.jpg'),
        links: [{
            to: '/',
            icon: 'mdi-view-dashboard',
            text: '首页'
        }, {
            to: '/dashboard/sys-role',
            icon: 'mdi-account-box',
            text: '系统角色'
        }, {
            to: '/dashboard/sys-resource',
            icon: 'mdi-clipboard-outline',
            text: '系统资源'
        }, {
            to: '/dashboard/sys-user',
            icon: 'mdi-account-box',
            text: '系统用户'
        }]
    }),
    computed: {},
    mounted() {},
    beforeDestroy() {},
    methods: {}
}
</script>
<style lang="scss">
#app-drawer {
    .v-list__tile {
        border-radius: 4px;

        &--buy {
            margin-top: auto;
            margin-bottom: 17px;
        }
    }
}
</style>