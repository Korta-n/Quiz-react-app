import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import rootReducer from './store/reducers/rootReducer'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose

const loggerMiddleware = (store) => (next) => (action) => {
    next(action)
}
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(loggerMiddleware, reduxThunk))
)

const application = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(
    <React.StrictMode>{application}</React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
