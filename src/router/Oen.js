import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'

import Details from "../components/Details"
import Home from '../components/Home'
import Comments from '../components/Comments'
// import Mnav from '../components/Mnav'
import Collection from '../components/Collection'

const One = (props)=>{
    return(
        <div>
            <Switch>
                <Route path='/Home' component={Home}></Route>
                <Route path='/Details' component={Details}></Route>
                <Route path='/Comments' component={Comments}></Route>
                {/*<Route path='/Mnav' component={Mnav}></Route>*/}
                <Route path='/Collection' component={Collection}></Route>
                <Redirect to='./Home'></Redirect>
            </Switch>
        </div>
    )
};

export default One