import React from 'react';
import './App.css';

import Oen from "./router/Oen";


var deviceWidth = document.documentElement.clientWidth;
if (deviceWidth > 1080) deviceWidth = 1080;
document.documentElement.style.fontSize = deviceWidth / 10.8 + "px";

class App extends React.Component{
    render(){
        return (
            <div className="App">
                <Oen/>
            </div>
        );
    }
}

export default App;
