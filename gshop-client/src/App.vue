<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  created () {
    this.getUserInfo()
  },
  methods: {
    // 根据会话获取用户信息
    getUserInfo () {
      this.$ajax({
        method: 'get',
        url: '/api/userinfo'
      }).then((res) => {
        // console.log(res)
        if (res.data.code === 0) {
          this.$store.commit('receive_userInfo', res.data.data)
        } else if (res.data.code === 1) {
          const {msg} = res.data
          MessageBox('提示', msg)
        }
      })
    }
  },
  components: {
    FooterGuide
  }
}
</script>
<style lang="stylus">
#app
  height 100%
</style>
