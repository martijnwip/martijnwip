import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'

import App from './components/App'
import Homepage from './components/Homepage'
import MenuAnimation from './components/techlab/MenuCssTransition'
import MenuListTransitionGroup from './components/techlab/MenuListTransitionGroup'

ReactDom.render(
    
    <BrowserRouter>
        <App>
            <Route path="/" exact component={Homepage} />
            <Route path="/css-transition" exact component={MenuAnimation} />
            <Route path="/group-transition" exact component={MenuListTransitionGroup} />
        </App>    
            
        
    </BrowserRouter>
    
    ,
    document.querySelector('#root')
)