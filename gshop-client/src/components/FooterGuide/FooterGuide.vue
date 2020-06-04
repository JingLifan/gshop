<template>
    <div class="footerguide">
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon iconfont icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon iconfont icon-sousuo"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
            <router-link class="mui-tab-item" to="/order">
                <span class="mui-icon iconfont icon-dingdan"></span>
                <span class="mui-tab-label">订单</span>
            </router-link>
            <router-link class="mui-tab-item" to="/user">
                <span class="mui-icon iconfont icon-wode"></span>
                <span class="mui-tab-label">我的</span>
            </router-link>
		</nav>
    </div>
</template>
<script>
export default {}
</script>
<style lang="stylus">
@import '../../common/stylus/mixins.styl'
.footerguide{
    top-border-1px(#e4e4e4)
    width 100%
    position fixed
    bottom 0
    .mui-bar-tab{
        position relative
        // top-border-1px(#ccc)
        background-color #fff
        .mui-tab-item{
            .iconfont{
                width 22px
                height 22px
            }
            .mui-tab-label{
                font-size 12px
                margin-top 8px
            }
        }
        .router-link-active{
            color $green
        }
    }
}
</style>
