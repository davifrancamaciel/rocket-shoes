import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import './config/ReactotronConfig'

import GlobalStyle from './styles/global'
import Routes from './routes'
import Header from './components/Header'

// responsavel por guadar o estado glogal da aplicação
import store from './store'

function App () {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <GlobalStyle />
                <Header />
                <Routes />
            </BrowserRouter>
        </Provider>
    )
}

export default App
