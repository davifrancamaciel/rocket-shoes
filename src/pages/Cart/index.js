import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import * as CartActions from '../../store/modules/cart/actions'

import {
    MdRemoveCircleOutline,
    MdAddCircleOutline,
    MdDelete,
} from 'react-icons/md'
import {Container, ProductTable, Total} from './styles'
import {formatPrice} from '../../util/format'

export default function Cart () {
    const cart = useSelector(state =>
        state.cart.map(product => ({
            ...product,
            subtotal: formatPrice(product.price * product.amount),
        }))
    )
    const total = useSelector(state =>
        formatPrice(
            state.cart.reduce((totalSum, product) => {
                return totalSum + product.price * Number(product.amount)
            }, 0)
        )
    )
    const dispatch = useDispatch()

    function increment (product) {
        dispatch(
            CartActions.updateAmountRequest(product.id, product.amount + 1)
        )
    }

    function decrement (product) {
        dispatch(
            CartActions.updateAmountRequest(product.id, product.amount - 1)
        )
    }

    return (
        <Container>
            <ProductTable>
                <thead>
                    <tr>
                        <th></th>
                        <th>PRODUTO</th>
                        <th>QTD</th>
                        <th>SUBTOTAL</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.image} alt={item.title} />
                            </td>
                            <td>
                                <strong> {item.title}</strong>
                                <span>{item.priceFormated}</span>
                            </td>
                            <td>
                                <div>
                                    <button
                                        type='button'
                                        onClick={() => decrement(item)}>
                                        <MdRemoveCircleOutline
                                            size={20}
                                            color='#7159c1'
                                        />
                                    </button>
                                    <input
                                        type='number'
                                        readOnly
                                        value={item.amount}
                                    />
                                    <button
                                        type='button'
                                        onClick={() => increment(item)}>
                                        <MdAddCircleOutline
                                            size={20}
                                            color='#7159c1'
                                        />
                                    </button>
                                </div>
                            </td>
                            <td>
                                <strong>{item.subtotal}</strong>
                            </td>
                            <td>
                                <button
                                    type='button'
                                    onClick={() =>
                                        dispatch(
                                            CartActions.removeFromCart(item.id)
                                        )
                                    }>
                                    <MdDelete size={20} color='#7159c1' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </ProductTable>
            <footer>
                <button type='button'>Finalizar pedido</button>
                <Total>
                    <span>TOTAL</span>
                    <strong>{total}</strong>
                </Total>
            </footer>
        </Container>
    )
}
