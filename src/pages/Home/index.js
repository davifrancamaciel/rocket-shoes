import React, {useState, useEffect} from 'react'
import {MdAddShoppingCart} from 'react-icons/md'
import {useSelector, useDispatch} from 'react-redux'

import api from '../../services/api'
import {formatPrice} from '../../util/format'

import * as CartActions from '../../store/modules/cart/actions'

import {ProductList} from './styles'

export default function Home () {
    const [products, setProducts] = useState([])
    const amount = useSelector(state =>
        state.cart.reduce((sumAmount, product) => {
            sumAmount[product.id] = product.amount
            return sumAmount
        }, {})
    )
    const dispatch = useDispatch();


    useEffect(() => {
        async function loadProducts () {
            const response = await api.get('products')
            const data = response.data.map(product => ({
                ...product,
                priceFormated: formatPrice(product.price),
            }))
            setProducts(data)
        }
        loadProducts()
    }, [])

    function handleAddProduct (id) {
        dispatch(CartActions.addToCartRequest(id))
    }

    return (
        <ProductList>
            {products.map(item => (
                <li key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <strong>{item.title}</strong>
                    <span>{item.priceFormated}</span>
                    <button
                        type='button'
                        onClick={() => handleAddProduct(item.id)}>
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
