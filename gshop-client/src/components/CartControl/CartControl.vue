<template>
  <div class="cartcontrol">
      <transition name="move">
          <div class="iconfont icon-Remove" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
      </transition>
        <div class="cart-count" v-if="food.count">{{food.count}}</div>
        <div class="iconfont icon-jia" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>
<script>
import Vue from 'vue'
  export default {
    props: {
      food: Object
    },
    created () {
    },
    methods: {
        updateFoodCount (isAdd) {
            if (isAdd) {
                // 点击加号
                if (!this.food.count) {
                  // 如果需要往对象中新加属性就要使用vue.set，否则不会实时的做数据绑定更新
                  // Vue.set()传三个参数(对象名。 属性名， 属性值)
                  Vue.set(this.food, 'count', 1)
                  this.$store.commit('addCart', this.food)
                } else {
                  this.food.count++
                  this.$store.commit('addCart', this.food)
                }
            } else {
                // 点击减号
                this.food.count--
                this.$store.commit('removeCart', this.food)
            }
        }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .icon-Remove
      display: inline-block
      padding 6px
      line-height 24px
      font-size 20px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-jia
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 20px
      color $green
</style>
