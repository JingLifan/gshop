<template>
   <div class="star star-24" :class="'star-' + size">
        <span class="star-item" v-for="(sc, index) in scClasses" :key="index" :class="sc"></span>
        <!-- <span class="star-item on"></span>
        <span class="star-item on"></span>
        <span class="star-item half"></span>
        <span class="star-item off"></span> -->
    </div>
</template>
<script>
export default {
    props: {
        score: Number,
        size: Number
    },
    computed: {
        scClasses () {
            let scArr = []
            const score = this.score
            let scoreInteger = Math.floor(score)
            // 全星的个数
            for (let i = 0; i < scoreInteger; i++) {
                scArr.push('on')
            }
            // 是否有半星
            if (score * 10 - scoreInteger * 10 > 5) {
                scArr.push('half')
            }
            // 无星的个数
            while (scArr.length < 5) {
                scArr.push('off')
            }
            return scArr
        }
    }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixins.styl'
.star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
