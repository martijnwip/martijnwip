import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import App from './components/App'

ReactDom.render(
    
    <BrowserRouter>
        <App >
            
        </App>    
    </BrowserRouter>
    
    ,
    document.querySelector('#root')
)