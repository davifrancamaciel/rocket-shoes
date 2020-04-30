import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as CartActions from '../../store/modules/cart/actions'

import {
    MdRemoveCircleOutline,
    MdAddCircleOutline,
    MdDelete,
} from 'react-icons/md'
import {Container, ProductTable, Total} from './styles'
import {formatPrice} from '../../util/format'

class Cart extends Component {
    increment = product => {
        const {updateAmountRequest} = this.props
        updateAmountRequest(product.id, product.amount + 1)
    }
    decrement = product => {
        const {updateAmountRequest} = this.props
        updateAmountRequest(product.id, product.amount - 1)
    }
    render () {
        const {cart, total, removeFromCart} = this.props
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
                                            onClick={() =>
                                                this.decrement(item)
                                            }>
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
                                            onClick={() =>
                                                this.increment(item)
                                            }>
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
                                        onClick={() => removeFromCart(item.id)}>
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
}
const mapStateToProps = state => ({
    cart: state.cart.map(product => ({
        ...product,
        subtotal: formatPrice(product.price * product.amount),
    })),
    total: formatPrice(
        state.cart.reduce((total, product) => {
            return total + product.price * Number(product.amount)
        }, 0)
    ),
})
const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
