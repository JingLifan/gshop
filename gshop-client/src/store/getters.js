/*
包含多个基于state的getter计算属性的对象
 */
export default {
    totalCount (state) {
        return state.cartFoods.reduce((totalCount, food, foodIndex) => totalCount + food.count, 0)
    },
    totalPrice (state) {
        return state.cartFoods.reduce((totalPrice, food, foodIndex) => totalPrice + food.count * food.price, 0)
    },
    // 计算shopratings中满意评价的数量
    positiveSize (state) {
        return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1 : 0), 0)
    }
}
