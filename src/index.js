import '../css/index.less';

import React,{PropTypes,Component} from 'react';
import classnames from 'classnames';
import ReactDom from 'react/lib/ReactDOM';

import 'whatwg-fetch';

export class Selector extends Component{

    static propTypes = {

        classPrefix:PropTypes.string,
        componentTag:PropTypes.string
    };

    static defaultProps = {
        componentTag:'div',
        //数据请求地址
        url:'/mocks/cities',
        //是否本地缓存数据
        isCache:true,
        //缓存的id
        cacheKey:'__searchList__',
        placeholder:'请输入城市名查询',
        //缓存过期时间
        cacheExpire:24 * 3600,
        //载入页面后第一次的初始数据
        initData:null,
        //列表容器
        listContainer:null,
        //搜索按钮
        submitButton:null,
        //默认城市
        defaultValue:'',
        //历史记录
        historyKey:'__history_citys__',
        //提交回调函数
        successCallback: function(){},
        //失败回调函数
        errorCallback: function(){},
        searchCallback: function(){},
        initCallback: function(){}
    };

    constructor(props,context){
        super(props,context);


        this.isInit = true;

        this.storage =this.localstorage = window.localStorage;

        //搜索缓存
        this._cache = {};
        this._data = null;
        //调用验证缓存的逻辑执行数据初始渲染
        this.cacheId = this.props.cacheKey;

        this.searchTimeout = null;
        //var input = this.props.input;
        //input.val(this.props.defaultCity||'');

        //efte.cache.remove(this.cacheId, {});

        this.state={
            isSearch:false,
            data:[],
            historyShow:this.getHistory().length>0,
            history:this.getHistory() || []
        };

    }

    /**
     * @description 读取数据
     * */
    getData(){
        var _this = this;

        if(this.props.isCache){

            //判断从哪里读取
            var data = this.getCache(this.cacheId);

            if (!data || typeof(data) === 'undefined' ) {
                _this.updateCache();
                return this;
            }else{
                //todo 渲染

                //_this.render(data);
                this.setState({
                    data:data
                });

            }
            //跟新数据
            _this.save(data);
        }

    }

    getAsyData(){
        var list = this._cache[key];
        if(list){

           /* fetch(this.props.url).then(
                (data)=>{
                    if(data.success ){
                        list = this._cache[key] = data ? data :[];
                        //todo 更改state
                        this.render(list);
                    }else{
                        //没有更多数据了
                        //alert(data.message);
                    }
                }
            );*/
        }else{
            //todo 更改state重新渲染
        }

    }

    //缓存获取数据
    getCacheData(key){
        var data = this._data,
            list = this._cache[key],
            item = null;

        if(data && key!=''){

            if(!list){
                data = JSON.stringify(data);
                var reg = new RegExp('(\{[^}[]+"name":"[^"]*'+key+'[^"]*".+?\})','gi');

                data = data.match(reg);
                this._cache[key] = data ? data :[];
                list = this._cache[key];
            }
            //todo 更改state重新渲染
            this.setState({
                isSearch:true,
                data:list
            });

        }else{
            this.isInit = true;
            this.setState({
                isSearch:false,
                data:data
            });
            this.getData();
        }
    }

    setHistory(val){
        if(val){
            let {history} = this.state;
            if(history.length >= 10){
                history.shift();
            }
            var isAdd = true;
            for(var i= 0,len=history.length;i<len;i++){
                if(val.name == history[i].name ){
                    isAdd = false;
                    break;
                }
            }
            if(isAdd){
                history.push(val );
                this.setState({
                    history:history
                });
            }

            this.localstorage.setItem(this.props.historyKey,JSON.stringify(history ) );
        }
    }

    getHistory(){
        var h = this.localstorage.getItem(this.props.historyKey);
        return h ? JSON.parse(h) : [];
    }

    removeHistory(){
        this.localstorage.removeItem(this.props.historyKey );
        this.setState({
            history:this.getHistory()
        });
    }

    setCache(data){
        var _this = this;

        var newData = {
            expiration:+new Date(),
            'value':data
        };
        this.localstorage.setItem(this.cacheId,JSON.stringify(newData) );


        this.save(data);
    }

    getCache(key,props){
        //efte.cache.load(key, props || {});

        var c = JSON.parse(this.localstorage.getItem(this.cacheId) || '{}'),
            expiration = typeof(c.expiration)!='undefined' ? c.expiration : +new Date(),
            currentTime = +new Date(),
            cacheExpire = this.props.cacheExpire,
            time = currentTime - expiration;

        if(time > cacheExpire){
            c.value = null;
        }
        return c.value;
    }

    //获取新的城市数据
    updateCache(){
        var _this = this;

        fetch(this.props.url).then(
            (response)=>{
                return response.json()
            }
        ).then((data)=>{
            if(data.code ===200 ){
                _this.setCache(data.msg);
                //todo 重新渲染
                this.setState({
                    data:data.msg
                });
            }else{
                //没有更多数据了

            }
         });

    }

    search(val){
        if(typeof(val) === 'string' ){

            if(this.props.isCache){
                this.getCacheData(val);
            }else{
                this.getAsyData(val);
            }
        }

    }

    save(data){
        //把得到的数据保存起来
        data = typeof(data)==='string' ?JSON.parse(data) : data;
        this._data = data;
        //执行初始化的回调
    }

    //每次输入信息后执行关键字搜索匹配
    searchInterceptor(e){
        let value = e.target.value;
        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(function(){
            this.props.searchCallback(value );
            this.search(value );
        }.bind(this),600);
    }

    renderLetters(letters){

        setTimeout(()=>{
            if(letters && letters.length >0 && this.lettersElement){
                let height = this.lettersElement.offsetHeight;
                this.lettersElement.style.cssText = `top:${(document.documentElement.clientHeight / 2) - (height / 2)}px;visibility:visible`;
            }
        },800);

        return (
            letters && letters.length > 0?
                <div className="nav j-nav" style={{visibility: 'hidden'}} ref={(lettersElement)=>{
                    this.lettersElement = lettersElement;
                }}>
                    {
                        letters.map((item)=>{
                            return <a href={"#"+item}>{item}</a>
                        })
                    }
                </div>
                :null
        );
    }

    componentDidMount(){
        if(this.isInit){
            this.isInit =false;
            setTimeout(()=>{
                this.props.initCallback.call(this);
            },400);

        }

        this.getData();
    }

    renderHistory(){
        //todo 判断是否有history数据，在renderItem中调用
        const {isSearch,history,historyShow} = this.state;
        return (
            historyShow!=true||(isSearch && history.length<=0)?null:
            <div className="list-box history">
                <a href="#" className="t">搜索历史</a>
                {
                    history.map((item)=>{
                        return <a href="javascript:void(0);" className="item" onClick={this.activeHandler.bind(this,item.name,item.id)} key={item.name}>{item.name}</a>
                    })
                }
                <a href="javascript:void(0);" className="clear j-clear"  onClick={::this.clear}>清除搜索历史</a>
            </div>

        );
    }

    activeHandler(name,id){
        let json = {
            name:name,
            id:id
        };
        //获取到value
        this.setHistory(json );
        //做什么事情我不关心，留给调用方处理
        this.props.successCallback.call(this,json);
    }

    renderItem(){

        const {data,isSearch,history} = this.state;

        //let data = typeof(this.state.data)=='string' ? JSON.parse(this.state.data) :this.state.data;

        let letters = [];

        return (
            <div>
            <div className="list-box">
                <div className="list">

                    {isSearch ? data.map((item)=> {
                        item = JSON.parse(item);
                        return <a href="javascript:void(0);" className="item" key={item.name}
                                  onClick={this.activeHandler.bind(this,item.name,item.id)}>{item.name}</a>
                    })
                        : data.map((item)=> {
                            let group = null;
                            if (item.letter) {
                                letters.push(item.letter);
                                group=<a href="javascript:void(0);" className="t" id={item.letter} key={item.letter}>{item.letter}</a>;
                            }
                            let cities = item.cities.map((city)=> {

                                return <a href="javascript:void(0);" className="item"
                                          onClick={this.activeHandler.bind(this,city.name,city.id)} key={city.name}>{city.name}</a>
                            });
                            return <div>
                                {group}
                                {cities}
                            </div>;
                        })
                    }

                </div>
            </div>
            {this.renderLetters(letters)}
            </div>
        );
    }

    clear(){
        this.removeHistory();
        //todo 让history隐藏起来
        this.setState({
            historyShow:false
        });
    }

    render(){

        return (
            <div className="w-search">
                <div className="search-input-box">
                    <input type="search" placeholder={this.props.placeholder} className="search" ref="j-search" onKeyUp={::this.searchInterceptor} onInput={::this.searchInterceptor} defaultValue={this.props.defaultValue} />
                    <a href="javascript:void(0);" className="search-buttom clear" ref="j-clear" onClick={::this.clear}>x</a>
                </div>

                <div ref="j-content">
                    {this.renderHistory() }
                    {this.renderItem() }
                </div>

            </div>
        );
    }

}