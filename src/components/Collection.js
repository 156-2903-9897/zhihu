import React from 'react';
import '../css/Collection.css'
import oin from '../img/20191017194307.jpg'
import Mnav from './Mnav';

class Collection extends React.Component{
    constructor(){
        super();
        this.state={
            data:[],

        };
        // console.log(this.state.data);
    }
    render() {
        return(
            <div className='col'>
                <div className='col_gg'>
                    <Mnav prop={this.props}/>
                    <div className='col_gg_t'>
                        <span className="icon iconfont" id='ssi' onClick={this.hui.bind(this)}>&#xe605;</span>
                        <em>{this.state.data.length===0?0:this.state.data.length}条收藏</em>
                    </div>
                    <div className='col_gg_b'>
                        <div className='col_gg_b_f'>
                            <ul>
                                {
                                    this.state.data.map((val,ind)=>{
                                        return(
                                            <li key={ind} onClick={this.sss.bind(this,val.id)}>
                                                <div className='li_l'>
                                                    <p>
                                                        {val.title}
                                                    </p>
                                                </div>
                                                <div className='li_r'>
                                                    <img src={val.img} alt=""/>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    hui(){
        // this.props.history.push({
        //     pathname:'/Mnav',
        // });
        let Nav = document.getElementById('nav');
        Nav.style.display='block'
    }
    componentDidMount() {
        let arr = [];
        for(var i = 0 ; i <sessionStorage.length ; i++ )
            arr.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
        console.log(arr);
        this.setState({
            data:arr,
        });

    }
    sss(x){
        this.props.history.push({
            pathname:'/Details',
            state:x
        });
        console.log(x);
    }
}


export default Collection