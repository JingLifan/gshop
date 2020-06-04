<template>
    <div class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
            <router-link to="/search" class="header_search" slot="left">
                <i class="iconfont icon-sousuo"></i>
            </router-link>
            <router-link :to="userInfo._id ? '/user' : '/login'" class="header_login" slot="right">
                <span class="header_login_text" v-if="userInfo._id"><i class="iconfont icon-wode"></i></span>
                <span class="header_login_text" v-else>登录|注册</span>
            </router-link>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
            <div class="swiper-container" v-if="navCategory.length">
                <mt-swipe :auto="0" class="swiper-wrapper">
                    <!-- <mt-swipe-item class="swiper-slide">
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/1.jpg">
                            </div>
                            <span>甜品饮品</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/2.jpg">
                            </div>
                            <span>商超便利</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/3.jpg">
                            </div>
                            <span>美食</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/4.jpg">
                            </div>
                            <span>简餐</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/5.jpg">
                            </div>
                            <span>新店特惠</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/6.jpg">
                            </div>
                            <span>准时达</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/7.jpg">
                            </div>
                            <span>预订早餐</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/8.jpg">
                            </div>
                            <span>土豪推荐</span>
                        </a>
                    </mt-swipe-item>
                    <mt-swipe-item class="swiper-slide">
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/1.jpg">
                            </div>
                            <span>甜品饮品</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/2.jpg">
                            </div>
                            <span>商超便利</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/3.jpg">
                            </div>
                            <span>美食</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/4.jpg">
                            </div>
                            <span>简餐</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/5.jpg">
                            </div>
                            <span>新店特惠</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/6.jpg">
                            </div>
                            <span>准时达</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/7.jpg">
                            </div>
                            <span>预订早餐</span>
                        </a>
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                            <img src="./images/nav/8.jpg">
                            </div>
                            <span>土豪推荐</span>
                        </a>
                    </mt-swipe-item> -->
                    <mt-swipe-item class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
                        <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                            <div class="food_container">
                                <img :src="baseImgurl + category.image_url">
                            </div>
                            <span>{{category.title}}</span>
                        </a>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <img src="./images/msite_back.svg" alt="" srcset="" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-xuanxiang"></i>
                <span class="shop_header_title">附近商家</span>
            </div>
            <ShopList></ShopList>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
export default {
    data () {
        return {
            address: {}, // 地址信息
            navCategory: [], // 分类导航数据
            baseImgurl: 'https://fuss10.elemecdn.com' // 分类导航图片的baseurl
        }
    },
    created () {
        this.getAddress()
        this.getNavCategory()
        this.getShops()
    },
    methods: {
        // 获取地址信息
        getAddress () {
            this.$ajax({
                methods: 'get',
                url: '/api/position/40.10038,116.36867'
            }).then(response => {
                // 调用store中的mutations，将地址信息保存到vuex中
                this.$store.commit('receive_adress', response)
                // 保存到data中
                this.address = response.data.data
            })
        },
        // 获取分类导航
        getNavCategory () {
            this.$ajax({
                method: 'get',
                url: '/api/index_category'
            }).then(res => {
                // console.log(res.data.data)
                this.navCategory = res.data.data
            })
        },
        // 获取商家列表数组
        getShops () {
            this.$ajax({
                method: 'get',
                url: '/api/shops',
                params: {
                    latitude: '40.10038',
                    longitude: '116.36867'
                }
            }).then(res => {
                // console.log(res.data.data)
                // 将商家列表添加到store中
                this.$store.commit('receive_shops', res.data.data)
            })
        }
    },
    components: {
        HeaderTop,
        ShopList
    },
    computed: {
        // 渲染分类导航的数组
        categorysArr () {
            const navCategory = this.navCategory
            // 准备一个空的大数组
            const arr = []
            // 准备一个小数组(最大长度为8)
            let minArr = []
            navCategory.forEach(v => {
                if (minArr.length === 8) {
                    minArr = []
                }
                if (minArr.length === 0) {
                    arr.push(minArr)
                }
                minArr.push(v)
            })
            return arr
        },
        // 获取store中的userInfo
        ...mapState(['userInfo'])
    }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixins.styl'
&.msite  //首页
          width 100%
          .msite_header
            background-color #02a774
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
            .header_search
              position absolute
              left 15px
              top 50%
              transform translateY(-50%)
              width 10%
              height 50%
              .icon-sousuo
                font-size 25px
                color #fff
            .header_title
              position absolute
              top 50%
              left 50%
              transform translate(-50%, -50%)
              width 50%
              color #fff
              text-align center
              .header_title_text
                font-size 20px
                color #fff
                display block
            .header_login
              font-size 14px
              color #fff
              position absolute
              right 15px
              top 50%
              transform translateY(-50%)
              .header_login_text
                color #fff
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .mint-swipe-indicators
                  .mint-swipe-indicator
                    background-color #ccc
                    opacity: 1
                  .is-active
                    background-color $green
                    opacity: 1
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>
