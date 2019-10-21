import React from 'react';
import '../css/Home.css';
import '../tubiao/font_1273405_jt37u15d5gf/iconfont.css';
import { Carousel, WingBlank } from 'antd-mobile';
import axios from 'axios';
import 'antd-mobile/dist/antd-mobile.css';
import Mnav from './Mnav';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [1, 2, 3, 4, 5],
            imgHeight: 176,
            arr:[],
            date:'',
            brr:[],
        };
    }
    render(props){
        return(
            <div className='qar'>
                <div className='qur'>
                    <Mnav prop={this.props}/>
                    <div className='qur_top'>
                        <div className='qur_top_l'>
                            <span className="iconfont icon-caidan cai" onClick={this.tan.bind(this)}></span>
                        </div>
                        <em className='qur_top_home'>首页</em>
                        <div className='qur_top_r'>
                            <span className="'icon iconfont"></span>
                            <span></span>
                            <span className="iconfont icon-lingdang"></span>
                            <span className="iconfont icon-gengduo geng"></span>
                        </div>
                    </div>
                    <WingBlank style={{'margin': '0','paddingTop':'1.7rem'}} >
                        <Carousel autoplay={true}
                                  infinite
                                  // eforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)} afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.data.map(val => (
                                <a key={val} href="" style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight ,margin: '0',}}>
                                    <img src={val.image} alt="" style={{ width: '100%', verticalAlign: 'top' ,}} onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                    }}/>
                                    <p className='car_pai'>{val.title}</p>
                                </a>
                            ))}
                        </Carousel>
                    </WingBlank>
                    <div className='content' >
                        <h2 className='content_h2'>今日热闻</h2>
                        <ul className='content_ul'>
                            {
                                this.state.arr.map((val,ind) =>(
                                    <li className='content_li' key={ind} onClick={this.go.bind(this,val.id)}>
                                        <a>
                                            <div className='content_l'>
                                                <p>{val.title}</p>
                                            </div>
                                            <div className='content_r'>
                                                <img src={val.images} alt=""/>
                                            </div>
                                        </a>
                                    </li>
                            ))
                            }
                        </ul>
                    </div>
                    {
                        this.state.brr.map((val,ind)=>{
                            return(
                                <div className='content' key={ind}>
                                    <h2 className='content_h2'>{val.date}</h2>
                                    <ul className='content_ul'>
                                        {
                                            val.stories.map((val,ind) =>(
                                            <li className='content_li' key={ind} onClick={this.go.bind(this,val.id)}>
                                                <a>
                                                    <div className='content_l'>
                                                        <p>{val.title}</p>
                                                    </div>
                                                    <div className='content_r'>
                                                        <img src={val.images} alt=""/>
                                                    </div>
                                                </a>
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
    go(x){
        this.props.history.push({
            pathname:'/Details',
            state:x
        });
        console.log(x)
    }
    tan(){
        let Nav = document.getElementById('nav');
        Nav.style.display='block'
    }

    componentDidMount(){
        axios.get(
            'api/4/news/latest'
        ).then((res)=>{
            // console.log(res.data.top_stories);
            setTimeout(() => {
                this.setState({
                    data:res.data.top_stories
                });
            }, 100);
            // console.log(res.data.stories);
            this.setState({
                arr:res.data.stories,
                date:res.data.date
            });
            // console.log(this.arr);
        });
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll=()=>{
        // let sta = this;
        let Che = document.documentElement.clientHeight;//可视高
        let top = document.documentElement.scrollTop;//滚动条的高
        let She = document.documentElement.scrollHeight;//滚动内容高
        if((Che+top)>=She){
            axios.get(
                'api/4/news/before/'+this.state.date
            ).then((res)=>{
                // console.log(this.state.date);
                // console.log(res.data);
                this.state.brr.push(res.data);
                this.setState({
                    brr:this.state.brr,
                    date:res.data.date,
                    // oid:this.state.stories.id,
                });
            });
        }
    };
}

export default Home
