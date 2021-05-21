<template lang="pug">
  .w-100.p-5
    .bg-white.py-5
      .py-4.signUp-border.my-3(style="margin:auto;width:800px;")
        .py-5.mt-5.mb-5.m-auto.w-60
          el-form( :model="passwordForm" :rules="validateRules" ref="passwordForm" :label-position="labelPosition" label-width='250px' :validate-on-rule-change="false")
            el-form-item(label="Current password")
              el-input(type="password" v-model="passwordForm.OldPassword" size="small")
            el-form-item.mt-4( label="New password"  prop="newPassword")
              el-input(type="password" v-model="passwordForm.newPassword" size="small")
                <!--i.el-input__icon.iconfont.icon-icon_xianshi.pointer(slot="suffix" @click="showPwd")-->
            el-form-item.mt-4( label="Confirm new password" prop="againPassword")
              el-input(type="password" v-model="passwordForm.againPassword" size="small")
                <!--i.el-input__icon.iconfont.icon-icon_xianshi.pointer(slot="suffix" title="显示密码" @click="showAgainPwd")-->
          .mt-5.text-center
            el-button(type="primary" @click.native="savePassword" ) Update
            el-button( @click.native="handleBack" ) Cancel
</template>

<script>
import API from '@/api/api'

export default {
  components: {},
  name: 'ChangePassword',
  data() {
    return {
      labelPosition: 'right',
      passwordForm: {},
      // pwdType: 'password',
      // againType: 'password',
      validateRules: {
        newPassword: [
          {
            required: true,
            pattern: /^[A-Za-z0-9]{6,}$/,
            message:
              'Please enter a password containing at least 6 digits of numbers or letters',
            trigger: 'blur'
          }
        ],
        againPassword: [
          {
            required: true,
            pattern: /^[A-Za-z0-9]{6,}$/,
            message: 'Please enter your password again',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    savePassword: function() {
      this.$refs.passwordForm.validate(valid => {
        if (!valid) {
          return
        }
        if (this.passwordForm.againPassword !== this.passwordForm.newPassword) {
          this.$message.error(
            'The new passwords mismatch, please check and input again.'
          )
          return
        }
        API.user
          .changePassword(this.passwordForm)
          .then(() => {
            this.$message.success('Change password success!')
            window.location.href = '/console.html'
          })
          .catch(() => {
            this.$message.error(
              'Change password fail, please ensure you input correct password and try again.'
            )
          })
      })
    },
    handleBack: function() {
      this.$router.go(-1)
    }
  },
  mounted() {}
}
</script>
