import React from 'react';
import axios from 'axios';
import '../css/Details.css';
import '../tubiao/font_1273445_n8n925ia2c/iconfont.css';


class Details extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arr:[],
            // css:[],
            drr:[],
            crr:[],
            frr:[],
            flag: false,
        };
    }
    render(props) {
        let span = this.state.flag ? <span className="icon iconfont" style={{color:'yellow'}} id='col' onClick={this.col.bind(this)}>&#xe65f;</span> : <span className="icon iconfont" style={{color:'white'}} id='col' onClick={this.col.bind(this)}>&#xe65f;</span>;
        return(
            <div className='del'>
                <div className='del_'>
                    <div className='del_t'>
                        <div className='del_t_l'>
                            <span className="icon iconfont" onClick={this.step.bind(this)}>&#xe614;</span>
                        </div>
                        <div className='del_t_r'>
                            <span className="icon iconfont" onClick={this.share.bind(this)}>&#xe633;</span>
                            {span}
                            {/*<span className="icon iconfont" style={{color:this.state.color}} id='col' onClick={this.col.bind(this)}>&#xe65f;</span>*/}
                            <span className="icon iconfont" onClick={this.com.bind(this,this.props.location.state)}>&#xe616;<em className='del_t_r_em'>
                                {this.state.frr.comments===0?0:this.state.frr.comments}
                            </em></span>
                            <span className="icon iconfont">&#xe673;<em className='del_t_r_em'>
                                {this.state.frr.popularity}
                            </em></span>
                        </div>
                    </div>
                    <div className='del_b'>
                        <link href={this.state.arr.css} rel="stylesheet"/>
                        <div dangerouslySetInnerHTML={{ __html: this.state.arr.body }} className="ma60" />
                    </div>
                    <div id='share' onClick={this.one.bind(this)} style={{'height':document.documentElement.clientHeight,'display':'none'}}>
                        <div className='share_d'>
                            <h3 className='share_d_hw'>分享</h3>
                            <ul className='share_d_ul'>
                                <li>
                                    <span className="icon iconfont xin">&#xe636;</span>
                                    <p>新浪微博</p>
                                </li>
                                <li>
                                    <span className="icon iconfont wei">&#xe637;</span>
                                    <p>微信</p>
                                </li>
                                <li>
                                    <span className="icon iconfont you">&#xe8c1;</span>
                                    <p>微信朋友圈</p>
                                </li>
                                <li>
                                    <span className="icon iconfont yin">&#xe695;</span>
                                    <p>印象笔记</p>
                                </li>
                                <li>
                                    <span className="icon iconfont dao">&#xe69c;</span>
                                    <p>有道云笔记</p>
                                </li>
                                <li>
                                    <span className="icon iconfont qq">&#xe617;</span>
                                    <p>QQ</p>
                                </li>
                                <li>
                                    <span className="icon iconfont duo">&#xe6dd;</span>
                                    <p>更多内容</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        axios.get(
            'api/4/news/' + this.props.location.state
        ).then((res) => {
            console.log(res.data);
            // console.log(res.data.css);
            this.setState({
                // css:res.data.css,
                arr: res.data
            });
            let oImg = document.getElementsByClassName('img-place-holder')[0];
            let bigImg = document.createElement("img");
            let P = document.createElement('p');
            bigImg.src = this.state.arr.image;
            P.innerHTML = this.state.arr.title;
            oImg.appendChild(bigImg);
            oImg.appendChild(P)
            // console.log(oImg);
        });
        axios.get(
            `api/4/story-extra/${this.props.location.state}`
        ).then((res)=>{
            console.log(res);
            this.setState({
                frr:res.data
            });
            console.log(this.state.arr);
        });
        let arr = [];
        for(let i = 0;i<sessionStorage.length;i++){
            arr.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))))
        }
        console.log(arr,'数组');
        let tag = arr.some((val)=>{
            return val.id === this.props.location.state
        });
        console.log(tag,'状态');
        this.setState({
            flag : tag
        })
    }
    step(){
        this.props.history.go(-1)
    }
    com(x){
        this.props.history.push({
            pathname:'/Comments',
            state:x
        })
    }
    share(){
        let oDiv = document.getElementById('share');
        oDiv.style.display ='block'
    }
    one(e){
        let oDiv = document.getElementById('share');
        if(e.target.id==='share'){
            oDiv.style.display = 'none'
        }
    }
    col(){
        let obj = {
            id: this.props.location.state,
            title : this.state.arr.title,
            img:this.state.arr.image,
        };
        console.log(sessionStorage.getItem('data'));
        let flag = this.state.flag;    // false
        if(!flag){       // 点击收藏
            this.setState({
                flag: true
            });
            sessionStorage.setItem(this.props.location.state,JSON.stringify(obj));
        }else {          // 取消收藏
            this.setState({
                flag: false
            });
            sessionStorage.removeItem(this.props.location.state);
        }
    }
}


export default Details