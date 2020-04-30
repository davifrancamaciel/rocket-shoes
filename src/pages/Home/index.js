import React, {Component} from 'react'
import {MdAddShoppingCart} from 'react-icons/md'
import {connect} from 'react-redux'

import api from '../../services/api'
import {formatPrice} from '../../util/format'
import {ADD_TO_CART} from '../../constants/Cart'
import * as CartActions from '../../store/modules/cart/actions'

import {ProductList} from './styles'
import {bindActionCreators} from 'redux'

class Home extends Component {
    state = {
        products: [],
    }

    async componentDidMount () {
        const response = await api.get('products')
        const data = response.data.map(product => ({
            ...product,
            priceFormated: formatPrice(product.price),
        }))
        this.setState({products: data})
    }

    handleAddProduct = id => {
        const {addToCartRequest} = this.props
        addToCartRequest(id)
    }

    render () {
        const {products} = this.state
        const {amount} = this.props
        return (
            <ProductList>
                {products.map(item => (
                    <li key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <strong>{item.title}</strong>
                        <span>{item.priceFormated}</span>
                        <button
                            type='button'
                            onClick={() => this.handleAddProduct(item.id)}>
                            <div>
                                <MdAddShoppingCart size={16} color='#fff' />{' '}
                                {amount[item.id] || 0}
                            </div>
                            <span>ADICIONAR AO CARRINHO</span>
                        </button>
                    </li>
                ))}
            </ProductList>
        )
    }
}
const mapStateToProps = state => ({
    products: state.products,
    amount: state.cart.reduce((amount, product) => {
        amount[product.id] = product.amount
        return amount
    }, {}),
})
const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home)
