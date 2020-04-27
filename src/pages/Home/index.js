import React, {Component} from 'react'
import {MdAddShoppingCart} from 'react-icons/md'
import {connect} from 'react-redux'

import api from '../../services/api'
import {formatPrice} from '../../util/format'
import {ADD_TO_CART} from '../../constants/Cart'

import {ProductList} from './styles'

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

    handleAddProduct = product => {
        const {dispatch} = this.props
        dispatch({
            type: ADD_TO_CART,
            product,
        })
    }

    render () {
        const {products} = this.state
        return (
            <ProductList>
                {products.map(item => (
                    <li key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <strong>{item.title}</strong>
                        <span>{item.priceFormated}</span>
                        <button
                            type='button'
                            onClick={() => this.handleAddProduct(item)}>
                            <div>
                                <MdAddShoppingCart size={16} color='#fff' /> 3
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
})
export default connect(mapStateToProps)(Home)
