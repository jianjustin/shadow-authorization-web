<template>
    <v-content>
        <v-container fill-height fluid>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar color="general">
                            <v-toolbar-title>管理系统｜登陆面板</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field ref="username" v-model="username" :rules="[() => !!username || 'This field is required']" prepend-icon="mdi-account" label="Login" placeholder="TotallyNotThanos" required />
                                <v-text-field ref="password" v-model="password" :rules="[() => !!password || 'This field is required']" :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" label="Password" placeholder="*********" counter required @keydown.enter="login" @click:append="showPassword = !showPassword" />
                            </v-form>
                        </v-card-text>
                        <v-divider class="mt-5" />
                        <v-card-actions>
                            <v-spacer />
                            <v-btn align-center justify-center color="general" @click="login">Login
                            </v-btn>
                        </v-card-actions>
                        <v-snackbar v-model="snackbar" :color="color" :top="true">
                            {{ errorMessages }}
                            <v-btn dark flat @click="snackbar = false">
                                Close
                            </v-btn>
                        </v-snackbar>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>
<script>
export default {
    metaInfo() {
        return {
            title: '权限管理系统｜登陆'
        }
    },
    data: function() {
        return {
            username: '',
            password: '',
            errorMessages: 'Incorrect login info',
            snackbar: false,
            color: 'general',
            showPassword: false
        }
    },

    
    methods: {
        login: function() {
            let username = this.username;
            let password = this.password;
            let _this = this;
            this.$store.dispatch('login', { username, password })
                .then(response => {
                    this.$router.push('/dashboard')
                }).catch(err => {
                    _this.errorMessages = err;
                    this.snackbar = true
                })
        }
    }
}
</script>