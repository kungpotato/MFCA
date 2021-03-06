import React from 'react'
// import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render } from 'react-snapshot'
import reducer from './redux/reducers/reducer'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min'
// import 'jquery/dist/jquery.min'
// import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'

const store = createStore(reducer)


// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
render(<Provider store={store}><App /></Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
