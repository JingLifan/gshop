/*
直接更新state的多个方法的对象
 */
// import Vue from 'vue'
export default {
    receive_adress (state, res) {
        state.address = res.data.data
    },
    // 将地址信息添加到store中
    receive_shops (state, res) {
        state.shops = res
        // console.log(state)
    },
    // 将登录后的用户信息存储到state中
    receive_userInfo (state, res) {
        state.userInfo = res
    },
    // 用户登出重置用户信息
    reset_userInfo (state) {
        state.userInfo = {}
    },
    receive_goods (state, res) {
        state.goods = res
    },
    receive_info (state, res) {
        state.info = res
    },
    receive_ratings (state, res) {
        state.ratings = res
    },
    receive_searchShops (state, res) {
        state.searchShops = res
    },
    // 添加到购物车并更新store
    addCart (state, food) {
        const index = state.cartFoods.findIndex(v => v.name === food.name)
        if (index === -1) {
            // 购物车中没有
            state.cartFoods.push(food)
        } else {
            // 购物车中已有这种food
            state.cartFoods[index].count = food.count
        }
        console.log(state.cartFoods)
    },
    // 从购物车中删除并更新store
    removeCart (state, food) {
        const index = state.cartFoods.findIndex(v => v.name === food.name)
        if (food.count > 0) {
            state.cartFoods[index].count = food.count
        } else if (food.count <= 0) {
            state.cartFoods.splice(index, 1)
        }
        console.log(state)
    },
    // 增加foodcount
    // addFoodCount (state, food) {
    //     if (!food.count) {
    //         // 如果需要往对象中新加属性就要使用vue.set，否则不会实时的做数据绑定更新
    //         // Vue.set()传三个参数(对象名。 属性名， 属性值)
    //         Vue.set(food, 'count', 1)
    //         state.cartFoods.push(food)
    //     } else {
    //         food.count++
    //     }
    // },
    // 减少foodcount
    // removeFoodCount (state, food) {
    //     if (food.count > 0) {
    //         food.count--
    //     } else {
    //         state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
    //     }
    // },
    // 清空购物车数据
    clearCart (state) {
        // 1.将购物车数组中所有food的count值置为0
        state.cartFoods.forEach((food) => {
            food.count = 0
        })
        // 2.将购物车数组置为空数组
        state.cartFoods = []
    }
}
