import produce from 'immer'
import {
    INITIAL_CART,
    ADD_TO_CART_SUCCESS,
    REMOVE_FROM_CART,
    UPDATE_TO_CART_SUCCESS,
} from '../../../constants/Cart'

export default function cart (state = INITIAL_CART, action) {
    console.tron.log(action)
    switch (action.type) {
        case ADD_TO_CART_SUCCESS:
            return produce(state, draft => {
                const {product} = action
                draft.push(product)
            })

        case REMOVE_FROM_CART:
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id)
                if (productIndex >= 0) {
                    draft.splice(productIndex, 1)
                }
            })
        case UPDATE_TO_CART_SUCCESS:
            console.log(action)

            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id)
                if (productIndex >= 0) {
                    draft[productIndex].amount = Number(action.amount)
                }
            })
        default:
            return state
    }
    // assistir aula 15
}
