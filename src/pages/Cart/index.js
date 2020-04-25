import React from 'react'
import {
    MdRemoveCircleOutline,
    MdAddCircleOutline,
    MdDelete,
} from 'react-icons/md'
import {Container, ProductTable, Total} from './styles'

export default function Cart () {
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
                    <tr>
                        <td>
                            <img
                                src='https://static.netshoes.com.br/produtos/tenis-mizuno-wave-hawk-2-masculino/46/D16-4274-246/D16-4274-246_zoom2.jpg?ts=1586370047&ims=326x'
                                alt='Tenis Mizuno Wave Hawk 2 Masculino'
                            />
                        </td>
                        <td>
                            <strong>Tenis Mizuno Wave Hawk 2 Masculino</strong>
                            <span>R$129,90</span>
                        </td>
                        <td>
                            <div>
                                <button type='button'>
                                    <MdRemoveCircleOutline
                                        size={20}
                                        color='#7159c1'
                                    />
                                </button>
                                <input type='number' readOnly value={2} />
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
