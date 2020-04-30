import {call, put, all, takeLatest, select} from 'redux-saga/effects'
import {toast} from 'react-toastify'

import api from '../../../services/api'
import history from '../../../services/history'
import {addToCartSuccess, updateAmountSuccess} from './actions'
import {
    ADD_TO_CART_REQUEST,
    UPDATE_TO_CART_REQUEST,
} from '../../../constants/Cart'
import {formatPrice} from '../../../util/format'
/**
 * o * é como se fosse o async
 * yield -> como se fosse oa await do gernerator ele aguarda a execução para cotinuar a execução do restante do codigo
 * call  -> responsavel por chamar metodos que são assincronos e que retoran promises no JS
 * primeiro parameto é o metodo que vai usar sem os ()
 * ai o segundo parametro leva a url que iria dentro do get
 *
 * put -> dispara uma action do redux
 *
 * all -> serve para cadastrar varios listners para ouvir quando uma action for disparada dispara a ação abaixo
 *
 * takeLatest -> serve para observar qunado hover varias requisições para a mesma função ex
 * quando um usuario clicar varias vezes em um botão o saga ira usar somente a ultima ação disparada
 * O primeiro parametro é a ação que queira ouvir e
 * O segundo é a função que vai ser disparada
 *
 * select -> responsavel por buscarinformações dentro do estado
 */

function * addToCart ({id}) {
    const productExistis = yield select(state =>
        state.cart.find(p => p.id === id)
    )

    const stock = yield call(api.get, `/stock/${id}`)

    const stockAmount = stock.data.amount
    const currentAmount = productExistis ? productExistis.amount : 0
    const amount = currentAmount + 1

    if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora e estoque.')
        return
    }

    if (productExistis) {
        yield put(updateAmountSuccess(id, amount))
    } else {
        const response = yield call(api.get, `/products/${id}`)

        const data = {
            ...response.data,
            amount: 1,
            priceFormated: formatPrice(response.data.price),
        }

        yield put(addToCartSuccess(data))
        history.push('/cart')
    }
}

function * upadateAmount ({id, amount}) {
    if (amount <= 0) return

    const stock = yield call(api.get, `/stock/${id}`)

    const stockAmount = stock.data.amount

    if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora e estoque.')
        return
    }
    yield put(updateAmountSuccess(id, amount))
}

export default all([
    takeLatest(ADD_TO_CART_REQUEST, addToCart),
    takeLatest(UPDATE_TO_CART_REQUEST, upadateAmount),
])
