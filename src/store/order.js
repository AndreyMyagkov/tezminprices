export default {
    state: {
        order: {

        },
        orderShow: false
    },
    getters: {
        getOrder(state) {
            return state.order;
        },
        getOrderShow(state) {
            return state.orderShow;
        },

    },
    mutations: {
        openOrderShow(state, payload) {
            state.orderShow = true;
        },
        closeOrder(state, payload) {
            state.orderShow = false;

        },
        setOrder(state, payload) {
            state.order = payload;
        }
    },

    actions: {

    }
}