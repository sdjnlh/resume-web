<template lang="pug">
    .login-container.m-auto.d-flex.align-items-center
        .shadow(style='width: 1000px;height: 520px')
            .pt-5.df-row-ac(style="padding-left: 15%;")
            el-form.login-form.w-80.login-inner(autocomplete='on', :model='loginForm', :rules='loginRules', ref='loginForm' label-position='left')
                h3.title 登录
                el-form-item(prop='username')
                    el-input(placeholder='用户名', v-model='loginForm.username')
                        i.el-input__icon.el-icon-mobile-phone(slot='prefix')
                el-form-item(prop='password')
                    el-input(name='password', :type='pwdType', v-model='loginForm.password', autocomplete='on', placeholder='密码', @keyup.enter.native="handleLogin")
                        i.el-input__icon.el-icon-view(slot='prefix')
                    span.show-pwd(@click='showPwd')
                        <!--svg-icon(icon-class='eye')-->
                el-form-item.mt-5
                    el-button(type='primary', style='width:100%;', :loading='loading', @click='handleLogin') 登录

</template>

<script>
    export default {
        name: 'Login',
        data() {
            const validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码应至少为6位'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                user: {},
                loginRules: {
                    username: [{required: true, trigger: 'blur', message: '填写用户名'}],
                    password: [{required: true, trigger: 'blur', validator: validatePass}]
                },
                loading: false,
                pwdType: 'password'
            }
        },
        methods: {
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        const form = {
                            username: this.loginForm.username,
                            password: this.loginForm.password
                        }
                        this.$store
                            .dispatch('Login', form)
                            .then(() => {

                                location.assign('/oms.html#')
                                this.loading = false
                            })
                            .catch(err => {
                                this.loading = false
                                let errData = err.response.data
                                if (errData.code === 'auth.password.invalid') {
                                    this.$message.error('密码错误!')
                                } else if (errData.code === 'login.identity.notexist') {
                                    this.$message.error('用户不存在!')
                                } else {
                                    this.$message.error(
                                        '服务器错误，请联系管理员'
                                    )
                                }
                            })
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    $bg: #f9fbfc;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .login-container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: $bg;

        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            /*width: 520px;*/
            padding: 35px 35px 15px 35px;
            margin: 20px auto;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;

            &_login {
                font-size: 20px;
            }
        }

        .title {
            font-size: 22px;
            font-weight: 400;
            margin: 0px auto 40px auto;
            /*text-align: center;*/
            font-weight: bold;
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
    }
</style>
