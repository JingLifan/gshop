<template>
    <section class="loginContainer">
        <div class="loginInner">
        <div class="login_header">
            <h2 class="login_logo">同城外卖</h2>
            <div class="login_header_title">
              <a href="javascript:;" :class="{on: loginWay}" @click="loginWay = true">短信登录</a>
              <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay = false">密码登录</a>
            </div>
        </div>
        <div class="login_content">
            <form @submit.prevent="login">
              <div :class="{on: loginWay}">
                  <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                  <button :disabled="!rightphone" class="get_verification" :class="{rightphone: rightphone}"
                  @click.prevent="getCode">
                    {{computeTime > 0 ? `发送中(${computeTime})` : '获取验证码'}}
                  </button>
                  </section>
                  <section class="login_verification">
                  <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                  </section>
                  <section class="login_hint">
                  温馨提示：未注册同城外卖帐号的手机号，登录时将自动注册，且代表已同意
                  <a href="javascript:;">《用户服务协议》</a>
                  </section>
              </div>
              <div :class="{on: !loginWay}">
                  <section>
                  <section class="login_message">
                      <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                  </section>
                  <section class="login_verification">
                      <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                      <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                      <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                        <div class="switch_circle" :class="{right: showPwd}"></div>
                        <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                      </div>
                  </section>
                  <section class="login_message">
                      <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                      <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
                  </section>
                  </section>
              </div>
              <button class="login_submit">登录</button>
            </form>
            <a href="javascript:;" class="about_us">关于我们</a>
        </div>
          <a href="javascript:" class="go_back" @click="$router.back()">
              <i class="iconfont icon-jiantouzuo"></i>
          </a>
        </div>
    </section>
</template>
<script>
import { MessageBox } from 'mint-ui'
import qs from 'qs'
export default {
  data () {
    return {
      loginWay: true, // true表示短信登录，false表示密码登录
      phone: '', // 输入的手机号
      code: '', // 手机验证码
      computeTime: 0, // 获取手机验证码的倒计时
      showPwd: false, // 是否显示密码，true显示，false不显示
      name: '', // 用户名
      captcha: '', // 图形验证码
      pwd: '' // 密码
    }
  },
  computed: {
    rightphone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    getCode () {
      // 1.启动定时器
      if (!this.computeTime) {
        this.computeTime = 5
        this.timer = setInterval(() => {
          this.computeTime--
          if (this.computeTime <= 0) {
            clearInterval(this.timer)
          }
        }, 1000)
        // 2.发送请求获取手机验证码
        this.sendCode(this.phone)
      }
    },
    // 发送ajax请求 获取验证码
    sendCode (phone) {
      this.$ajax({
        method: 'get',
        url: '/api/sendcode',
        params: {
          phone: phone
        }
      }).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          MessageBox('提示', '验证码已发送')
        } else {
          MessageBox('提示', '验证码发送失败')
          this.computeTime = 0
          clearInterval(this.timer)
        }
      })
    },
    // 点击登录按钮
    login () {
      // 1.校验是否合法
      if (this.loginWay) {
        // 短信登录
        const {rightphone, phone, code} = this
        if (!rightphone) {
          // 提示手机号不正确
          MessageBox('提示', '请检查手机号是否正确')
        } else if (!/^\d{6}$/.test(code)) {
          // 提示验证码不正确
          MessageBox('提示', '请检查验证码是否正确')
        }
        // 发送请求，准备登录-短信验证码方式
        this.$ajax({
          method: 'post',
          url: '/api/login_sms',
          data: qs.stringify({
            phone: phone,
            code: code
          })
        }).then((res) => {
          // console.log(res)
          if (res.data.code === 1) {
            const {msg} = res.data
            MessageBox('提示', msg)
          } else if (res.data.code === 0) {
            // 将登录后的个人信息存储在store中
            this.$store.commit('receive_userInfo', res.data.data)
            // 登录成功，跳转到个人中心路由
            this.$router.replace('/user')
          }
        })
      } else {
        // 密码登录
        const {name, pwd, captcha} = this
        if (!name) {
          MessageBox('提示', '请检查用户名是否正确')
        } else if (!pwd) {
          MessageBox('提示', '请检查密码是否正确')
        } else if (!captcha) {
          MessageBox('提示', '请检查验证码是否正确')
        }
        // 发送请求 开始登录
        this.$ajax({
          method: 'post',
          url: '/api/login_pwd',
          data: qs.stringify({
            name: name,
            pwd: pwd,
            captcha: captcha
          })
        }).then((res) => {
          console.log(res)
          if (res.data.code === 1) {
            const {msg} = res.data
            MessageBox('提示', msg)
            // 请求失败后重新获取一次性验证码，并把输入框中的验证码清空
            this.getCaptcha()
            this.captcha = ''
          } else if (res.data.code === 0) {
            // 登录成功，将获取到的用户信息存储在store中
            this.$store.commit('receive_userInfo', res.data.data)
            // 登录成功，跳转到个人中心路由
            this.$router.replace('/user')
          }
        })
      }
    },
    // 获取新的图形验证码
    getCaptcha () {
      // 每次点击更新图片的src属性 src没更新一次就会重新请求一次
      // event.target.src = 'http://localhost:4000/captcha?time=' + new Date()
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + new Date()
    }
  }
}
</script>
<style lang="stylus">
.loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.rightphone
                    color black
                    font-weight bold
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 46px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(30px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
