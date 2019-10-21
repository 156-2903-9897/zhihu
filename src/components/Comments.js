import React from 'react';
import axios from 'axios';
import '../css/Comments.css';
import aImg from '../img/images/ww_03.jpg';
import '../tubiao/font_1273405_xtil2xitork/iconfont.css';
import moment from 'moment';

class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state={
            drr:[],
            crr:[],
            arr:[],
            aw:0,
            show:true,
            display:'block',
            displays:'block'
        }
    }
    render() {
        // console.log(this.props.location.state);
        let aee = this.state.show?<span className="icon iconfont" id='lsl' onClick={this.ant.bind(this)} style={{'display':this.state.displays}}>&#xe646;</span> :
            <span className="icon iconfont" id='lsr' onClick={this.ant.bind(this)}>&#xe64e;</span>;
        return(
            <div className='Comments'>
                <div className='com'>
                    <div className='com_top' id='com_top'>
                        <div className='com_top_t_l'>
                            <span className="icon iconfont" onClick={this.step.bind(this)}>&#xe614;</span>
                            <em>{this.state.arr.comments===0?0:this.state.arr.comments}条点评</em>
                        </div>
                        <div className='com_top_t_r'>
                            <span className="icon iconfont">&#xe71b;</span>
                        </div>
                    </div>
                    <div className='com_nei'>
                        <div className='com_nei_long'>
                            <div className='com_nei_long_d4'>
                                <p className='com_nei_long_d1'><span>{this.state.crr.length===0 ? this.state.aw : this.state.crr.length}</span>条长评</p>
                            </div>
                            <div className='com_nei_long_d2'>
                                <div className='com_nei_long_d3' style={{'display':this.state.display}}>
                                    <img src={aImg} alt=""/>
                                </div>
                                <ul className='com_nei_long_ul'>
                                    {
                                        this.state.crr.map((val,ind) =>(
                                            <li className='com_nei_long_li clearfix' key={ind}>
                                                <div className='com_nei_long_li_l'>
                                                    <img src={val.avatar} alt=""/>
                                                </div>
                                                <div className='com_nei_long_li_r'>
                                                    <div className='com_nei_long_li_t'>
                                                        <span className="icon iconfont">&#xe673;</span>
                                                        <em>{val.likes}</em>
                                                    </div>
                                                    <p className='com_nei_long_li_r_p1'>{val.author}</p>
                                                    <p className='com_nei_long_li_r_p2'>
                                                        {val.content}
                                                    </p>
                                                    <p className='com_nei_long_li_r_p3'>{moment(val.time).format("MM-DD HH:mm:ss")}</p>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='com_nei_short'>
                            <div className='com_nei_long_d4'>
                                <p className='com_nei_long_d1'><span>{this.state.drr.length===0 ? this.state.aw : this.state.drr.length}</span>条短评</p>
                                {aee}
                                {/*<span className="icon iconfont" id='lsl' onClick={this.ant.bind(this)} style={{'display':'block'}}>&#xe646;</span>*/}
                                {/*<span className="icon iconfont" id='lsr' onClick={this.anu.bind(this)} style={{'display':'none'}}>&#xe64e;</span>*/}
                            </div>
                            <div className='com_nei_long_d2' id='com_nei_long_d2' style={{'display':'none'}}>
                                <ul className='com_nei_long_ul'>
                                    {
                                        this.state.drr.map((val,ind) =>(
                                            <li className='com_nei_long_li clearfix' key={ind}>
                                                <div className='com_nei_long_li_l'>
                                                    <img src={val.avatar} alt=""/>
                                                </div>
                                                <div className='com_nei_long_li_r'>
                                                    <div className='com_nei_long_li_t'>
                                                        <span className="icon iconfont">&#xe673;</span>
                                                        <em>{val.likes}</em>
                                                    </div>
                                                    <p className='com_nei_long_li_r_p1'>{val.author}</p>
                                                    <p className='com_nei_long_li_r_p2'>
                                                        {val.content}
                                                    </p>
                                                    <p className='com_nei_long_li_r_p3'>{moment(val.time).format("MM-DD HH:mm:ss")}</p>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        // console.log(this.props);
        axios.get(
            `api/4/story/${this.props.location.state}/short-comments`
        ).then((res)=>{
            // console.log(res);
            this.setState({
                drr:res.data.comments,
            });
            // console.log(this.state.drr);
            // console.log(this.state.[2].time);
        });
        axios.get(
            `api/4/story/${this.props.location.state}/long-comments`
        ).then((res)=>{
            // console.log(res);
            this.setState({
                crr:res.data.comments
            });
            // console.log(this.state.crr.length);
            if(this.state.crr.length===0) {
                this.setState({
                    display:'block'
                });
            }else {
                this.setState({
                    display:'none'
                })
            }
        });
        axios.get(
            `api/4/story-extra/${this.props.location.state}`
        ).then((res)=>{
            // console.log(res);
            this.setState({
                arr:res.data
            });
            // console.log(this.state.arr);
        })
    }
    step(){
        this.props.history.go(-1)
    }
    ant(){
        // console.log(1111);
        this.setState({
            show:!this.state.show
        });
        let oAn = document.getElementById('com_nei_long_d2');
        let lsl = document.getElementById('lsl');
        // let comLong = document.getElementsByClassName('com_nei_long_d3');
        let lsr = document.getElementsByClassName('com_top')[0];
        // var comTop =document.getElementById('com_top');
        if(!this.state.show){
            oAn.style.display = 'none';
        }else {
            oAn.style.display = 'block';
            document.documentElement.scrollTop = oAn.offsetTop-lsr.clientHeight;
        }
    }
}


export default Comments