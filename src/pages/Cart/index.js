import React, {Component} from 'react'
import {connect} from 'react-redux'

import {
    MdRemoveCircleOutline,
    MdAddCircleOutline,
    MdDelete,
} from 'react-icons/md'
import {Container, ProductTable, Total} from './styles'

class Cart extends Component {
    render () {
        const {cart} = this.props
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
                                        <button type='button'>
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
                                        <button type='button'>
                                            <MdAddCircleOutline
                                                size={20}
                                                color='#7159c1'
                                            />
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <strong>R$258,80</strong>
                                </td>
                                <td>
                                    <button type='button'>
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
                        <strong>R$129,90</strong>
                    </Total>
                </footer>
            </Container>
        )
    }
}
const mapStateToProps = state => ({
    cart: state.cart,
})
export default connect(mapStateToProps)(Cart)
