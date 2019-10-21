import React from 'react';
import '../css/Mnav.css';
import oin from '../img/20191017194307.jpg'



class Mnav extends React.Component{
    constructor(){
        super();
        this.state={
            width:document.documentElement.clientHeight,
        };
    }
    render() {
        return(
            <div className='nav' id='nav' onClick={this.chu.bind(this)} style={{'height':this.state.width}}>
                <div className='nav_a' style={{'height':this.state.width}}>
                    <div className='nav_t'>
                        <div className='nav_t_l'>
                            <img src={oin} alt=""/>
                            <span>漩涡鸣人</span>
                        </div>
                        <div className='nav_t_r'>
                            <div style={{display:'inline-block'}} onClick={this.goCol.bind(this)}>
                                <span className="icon iconfont">&#xe65f;</span>
                                <em>我的收藏</em>
                            </div>
                            <span className="icon iconfont">&#xe639;</span>
                            <em>离线下载</em>
                        </div>
                    </div>
                    <div className='nav_b'>
                        <div className='nav_b_r' onClick={this.chuqu.bind(this)}>
                            <span className="icon iconfont">&#xe630;</span>
                            <em>首页</em>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        console.log(this.state.width);
    }
    chu(e){
        let Nav = document.getElementById('nav');
        if(e.target.id === 'nav'){
            Nav.style.display='none'
        }
    }
    chuqu(){
        let Nav = document.getElementById('nav');
            Nav.style.display='none';
        this.props.prop.history.push({
            pathname: '/Home'
        })
    }
    goCol(){
        this.props.prop.history.push({
            pathname: '/Collection'
        })
    }
}

export default Mnav