<template lang="pug">
  .h-100.df-row-ac
    .container.bg-white.py-5
      .py-4.signUp-border(style="margin:0 auto;width:800px;")
        .px-5.ml-5.mr-5
          el-form.mt-5(size="small" :model="domain" :rules="ruleForm" ref="ruleForm")
            .d-flex.w-70.m-auto
              .flex-1
                el-form-item(label='Username', prop='username' )
                  el-input(v-model="domain.username" )
                el-form-item(label='Password', prop='password')
                  el-input(v-model="domain.password", type="password" placeholder="Please input a password")
                el-form-item( label="Confirm password:" prop="againPassword")
                  el-input(type='password' v-model="domain.againPassword" placeholder="Please enter your password again")
          .py-3.df-row-jc
            el-button(type="primary" style="width:300px;" @click="signUp" :loading="loading") signUp

</template>

<script>
// import API from '@/api/api'

export default {
  name: 'SurrogateSignup',
  data() {
    return {
      domain: {},
      loading: false,
      inputInfo: '', //用户输入信息
      verificationCode: '', //生成的验证码
      hintInformation: '', //提示信息,
      ruleForm: {
        username: [
          {
            required: true,
            pattern: /^[a-zA-Z0-9_-]{6,16}$/,
            message: 'Please enter the correct format of your username',
            trigger: 'blur'
          }
        ],
        password: [
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
    signUp() {
      this.$router.push('/login')
      // this.$refs.ruleForm.validate((valid) => {
      //   if (!valid) {
      //     this.loading = false
      //     return
      //   }
      //   if (this.domain.password != this.domain.againPassword) {
      //     this.$message.error(' Two inconsistent password input! ')
      //     return
      //   }
      //   this.loading = true
      //   this.domain.type = 'surrogate'
      //   this.domain.source = 'portal'
      //   API.signupWithEmail(this.domain).then((res) => {
      //     this.$message.success('Congratulations, signUp succeeded!')
      //     // this.$router.replace('/login')
      //     window.location.href = '/login.html'
      //   }).catch(() => {
      //     this.loading = false
      //     this.$message.error('Sorry, signUp failed, please try again.')
      //   })
      // })
    }
  },
  mounted() {
    // this.createCode()
  }
}
</script>

<style lang="postcss">
body {
  background-color: #f5f5f5;
}

:root h1 {
  --color: red;
  display: flex;
  color: var(--color);
}
</style>
