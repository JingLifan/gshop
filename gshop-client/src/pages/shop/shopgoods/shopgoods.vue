<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in this.goods" :key="index"
              :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import CartControl from '../../../components/CartControl/CartControl'
import Food from '../../../components/Food/Food'
import { mapState } from 'vuex'
import ShopCart from '../../../components/ShopCart/ShopCart'
export default {
    data () {
        return {
            tops: [], // 右侧li的tops数组
            scrollY: '', // 右侧食品滑动的坐标
            food: {} // 传递给Food组件的食物详情
        }
    },
    created () {
        this.getShopGoods()
    },
    methods: {
        // 获取goods数据
        getShopGoods () {
            this.$ajax({
                method: 'get',
                url: '/goods'
            }).then((res) => {
                // console.log(res)
                // this.goods = res.data.data
                // 将获取到的goods存储到store中
                this.$store.commit('receive_goods', res.data.data)
            }).then(() => {
                this.$nextTick(() => {
                    this._initScroll()
                    this._initTops()
                })
            })
        },
        // 初始化bscroll组件
        _initScroll () {
            // 初始化左侧滑动
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            })
            // 初始化右侧
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 2 // 因为惯性滑动不会触发
            })
            // 右侧滑动滚动事件监听
            this.foodsScroll.on('scroll', ({x, y}) => {
                this.scrollY = Math.abs(y)
            })
            // 右侧滑动滚动 结束 事件监听
            this.foodsScroll.on('scrollEnd', ({x, y}) => {
                this.scrollY = Math.abs(y)
            })
        },
        // 初始化Tops，即右侧每个li的top值
        _initTops () {
            const tops = []
            let top = 0
            tops.push(top)
            const lis = document.getElementsByClassName('food-list-hook')
            Array.from(lis).forEach(li => {
                top += li.clientHeight
                tops.push(top)
            })
            // console.log(tops)
            this.tops = tops
        },
        // 点击左侧分类右侧滚动到指定高度
        clickMenuItem (index) {
            const scrollY = this.tops[index]
            this.scrollY = scrollY
            // bscroll方法，传递三个参数(x, y, time)
            this.foodsScroll.scrollTo(0, -scrollY, 300)
        },
        // 点击查看food详情
        showFood (food) {
          this.food = food
          // 调用Food子组件的方法显示Food
          // 父组件调用子组件的方法 1.给子组件中加上ref即可通过this.$refs.ref.[方法名] 调用
          this.$refs.food.toggleShow()
        }
    },
    computed: {
        ...mapState(['goods']),
        // computed执行：1.项目初始化时 2.相关数据发生变化时
        currentIndex () {
            const {scrollY, tops} = this
            const index = tops.findIndex((top, index) => {
                return scrollY >= top && scrollY < tops[index + 1]
            })
            return index
        }
    },
    components: {
      CartControl,
      Food,
      ShopCart
    }
}
</script>
<style lang="stylus">
@import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 80px
        padding: 0 0px
        line-height: 14px
        text-align center
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
