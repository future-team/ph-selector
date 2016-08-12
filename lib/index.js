'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../css/index.less');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactLibReactDOM = require('react/lib/ReactDOM');

var _reactLibReactDOM2 = _interopRequireDefault(_reactLibReactDOM);

require('whatwg-fetch');

var Selector = (function (_Component) {
    _inherits(Selector, _Component);

    _createClass(Selector, null, [{
        key: 'propTypes',
        value: {

            classPrefix: _react.PropTypes.string,
            componentTag: _react.PropTypes.string
        },
        enumerable: true
    }, {
        key: 'defaultProps',
        value: {
            componentTag: 'div',
            //数据请求地址
            url: '/mocks/cities',
            //是否本地缓存数据
            isCache: true,
            //缓存的id
            cacheKey: '__searchList__',
            placeholder: '请输入城市名查询',
            //缓存过期时间
            cacheExpire: 24 * 3600,
            //载入页面后第一次的初始数据
            initData: null,
            //列表容器
            listContainer: null,
            //搜索按钮
            submitButton: null,
            //默认城市
            defaultValue: '',
            //历史记录
            historyKey: '__history_citys__',
            //提交回调函数
            successCallback: function successCallback() {},
            //失败回调函数
            errorCallback: function errorCallback() {},
            searchCallback: function searchCallback() {},
            initCallback: function initCallback() {}
        },
        enumerable: true
    }]);

    function Selector(props, context) {
        _classCallCheck(this, Selector);

        _Component.call(this, props, context);

        this.isInit = true;

        this.storage = this.localstorage = window.localStorage;

        //搜索缓存
        this._cache = {};
        this._data = null;
        //调用验证缓存的逻辑执行数据初始渲染
        this.cacheId = this.props.cacheKey;

        this.searchTimeout = null;
        //var input = this.props.input;
        //input.val(this.props.defaultCity||'');

        //efte.cache.remove(this.cacheId, {});

        this.state = {
            isSearch: false,
            data: [],
            historyShow: this.getHistory().length > 0,
            history: this.getHistory() || []
        };
    }

    /**
     * @description 读取数据
     * */

    Selector.prototype.getData = function getData() {
        var _this = this;

        if (this.props.isCache) {

            //判断从哪里读取
            var data = this.getCache(this.cacheId);

            if (!data || typeof data === 'undefined') {
                _this.updateCache();
                return this;
            } else {
                //todo 渲染

                //_this.render(data);
                this.setState({
                    data: data
                });
            }
            //跟新数据
            _this.save(data);
        }
    };

    Selector.prototype.getAsyData = function getAsyData() {
        var list = this._cache[key];
        if (list) {

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
        } else {
                //todo 更改state重新渲染
            }
    };

    //缓存获取数据

    Selector.prototype.getCacheData = function getCacheData(key) {
        var data = this._data,
            list = this._cache[key],
            item = null;

        if (data && key != '') {

            if (!list) {
                data = JSON.stringify(data);
                var reg = new RegExp('(\{[^}[]+"name":"[^"]*' + key + '[^"]*".+?\})', 'gi');

                data = data.match(reg);
                this._cache[key] = data ? data : [];
                list = this._cache[key];
            }
            //todo 更改state重新渲染
            this.setState({
                isSearch: true,
                data: list
            });
        } else {
            this.isInit = true;
            this.setState({
                isSearch: false,
                data: data
            });
            this.getData();
        }
    };

    Selector.prototype.setHistory = function setHistory(val) {
        if (val) {
            var _history = this.state.history;

            if (_history.length >= 10) {
                _history.shift();
            }
            var isAdd = true;
            for (var i = 0, len = _history.length; i < len; i++) {
                if (val.name == _history[i].name) {
                    isAdd = false;
                    break;
                }
            }
            if (isAdd) {
                _history.push(val);
                this.setState({
                    history: _history
                });
            }

            this.localstorage.setItem(this.props.historyKey, JSON.stringify(_history));
        }
    };

    Selector.prototype.getHistory = function getHistory() {
        var h = this.localstorage.getItem(this.props.historyKey);
        return h ? JSON.parse(h) : [];
    };

    Selector.prototype.removeHistory = function removeHistory() {
        this.localstorage.removeItem(this.props.historyKey);
        this.setState({
            history: this.getHistory()
        });
    };

    Selector.prototype.setCache = function setCache(data) {
        var _this = this;

        var newData = {
            expiration: +new Date(),
            'value': data
        };
        this.localstorage.setItem(this.cacheId, JSON.stringify(newData));

        this.save(data);
    };

    Selector.prototype.getCache = function getCache(key, props) {
        //efte.cache.load(key, props || {});

        var c = JSON.parse(this.localstorage.getItem(this.cacheId) || '{}'),
            expiration = typeof c.expiration != 'undefined' ? c.expiration : +new Date(),
            currentTime = +new Date(),
            cacheExpire = this.props.cacheExpire,
            time = currentTime - expiration;

        if (time > cacheExpire) {
            c.value = null;
        }
        return c.value;
    };

    //获取新的城市数据

    Selector.prototype.updateCache = function updateCache() {
        var _this2 = this;

        var _this = this;

        fetch(this.props.url).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.code === 200) {
                _this.setCache(data.msg);
                //todo 重新渲染
                _this2.setState({
                    data: data.msg
                });
            } else {
                //没有更多数据了

            }
        });
    };

    Selector.prototype.search = function search(val) {
        if (typeof val === 'string') {

            if (this.props.isCache) {
                this.getCacheData(val);
            } else {
                this.getAsyData(val);
            }
        }
    };

    Selector.prototype.save = function save(data) {
        //把得到的数据保存起来
        data = typeof data === 'string' ? JSON.parse(data) : data;
        this._data = data;
        //执行初始化的回调
    };

    //每次输入信息后执行关键字搜索匹配

    Selector.prototype.searchInterceptor = function searchInterceptor(e) {
        var value = e.target.value;
        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout((function () {
            this.props.searchCallback(value);
            this.search(value);
        }).bind(this), 600);
    };

    Selector.prototype.renderLetters = function renderLetters(letters) {
        var _this3 = this;

        setTimeout(function () {
            if (letters && letters.length > 0 && _this3.lettersElement) {
                var height = _this3.lettersElement.offsetHeight;
                _this3.lettersElement.style.cssText = 'top:' + (document.documentElement.clientHeight / 2 - height / 2) + 'px;visibility:visible';
            }
        }, 800);

        return letters && letters.length > 0 ? _react2['default'].createElement(
            'div',
            { className: 'nav j-nav', style: { visibility: 'hidden' }, ref: function (lettersElement) {
                    _this3.lettersElement = lettersElement;
                } },
            letters.map(function (item) {
                return _react2['default'].createElement(
                    'a',
                    { href: "#" + item, key: item },
                    item
                );
            })
        ) : null;
    };

    Selector.prototype.componentDidMount = function componentDidMount() {
        var _this4 = this;

        if (this.isInit) {
            this.isInit = false;
            setTimeout(function () {
                _this4.props.initCallback.call(_this4);
            }, 400);
        }

        this.getData();
    };

    Selector.prototype.renderHistory = function renderHistory() {
        var _this5 = this;

        //todo 判断是否有history数据，在renderItem中调用
        var _state = this.state;
        var isSearch = _state.isSearch;
        var history = _state.history;
        var historyShow = _state.historyShow;

        return historyShow != true || isSearch && history.length <= 0 ? null : _react2['default'].createElement(
            'div',
            { className: 'list-box history' },
            _react2['default'].createElement(
                'a',
                { href: '#', className: 't' },
                '搜索历史'
            ),
            history.map(function (item) {
                return _react2['default'].createElement(
                    'a',
                    { href: 'javascript:void(0);', className: 'item', onClick: _this5.activeHandler.bind(_this5, item.name, item.id), key: item.id },
                    item.name
                );
            }),
            _react2['default'].createElement(
                'a',
                { href: 'javascript:void(0);', className: 'clear j-clear', key: 'qingchulishi', onClick: this.clear.bind(this) },
                '清除搜索历史'
            )
        );
    };

    Selector.prototype.activeHandler = function activeHandler(name, id) {
        var json = {
            name: name,
            id: id
        };
        //获取到value
        this.setHistory(json);
        //做什么事情我不关心，留给调用方处理
        this.props.successCallback.call(this, json);
    };

    Selector.prototype.renderItem = function renderItem() {
        var _this6 = this;

        var _state2 = this.state;
        var data = _state2.data;
        var isSearch = _state2.isSearch;
        var history = _state2.history;

        //let data = typeof(this.state.data)=='string' ? JSON.parse(this.state.data) :this.state.data;

        var letters = [];

        return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
                'div',
                { className: 'list-box' },
                _react2['default'].createElement(
                    'div',
                    { className: 'list' },
                    isSearch ? data.map(function (item) {
                        item = JSON.parse(item);
                        return _react2['default'].createElement(
                            'a',
                            { href: 'javascript:void(0);', className: 'item', key: item.name,
                                onClick: _this6.activeHandler.bind(_this6, item.name, item.id) },
                            item.name
                        );
                    }) : data.map(function (item) {
                        var group = null;
                        if (item.letter) {
                            letters.push(item.letter);
                            group = _react2['default'].createElement(
                                'a',
                                { href: 'javascript:void(0);', className: 't', id: item.letter, key: item.letter },
                                item.letter
                            );
                        }
                        var cities = item.cities.map(function (city) {

                            return _react2['default'].createElement(
                                'a',
                                { href: 'javascript:void(0);', className: 'item',
                                    onClick: _this6.activeHandler.bind(_this6, city.name, city.id), key: city.name },
                                city.name
                            );
                        });
                        return _react2['default'].createElement(
                            'div',
                            null,
                            group,
                            cities
                        );
                    })
                )
            ),
            this.renderLetters(letters)
        );
    };

    Selector.prototype.clear = function clear() {
        this.removeHistory();
        //todo 让history隐藏起来
        this.setState({
            historyShow: false
        });
    };

    Selector.prototype.render = function render() {

        return _react2['default'].createElement(
            'div',
            { className: 'w-search' },
            _react2['default'].createElement(
                'div',
                { className: 'search-input-box' },
                _react2['default'].createElement('input', { type: 'search', placeholder: this.props.placeholder, className: 'search', ref: 'j-search', onKeyUp: this.searchInterceptor.bind(this), onInput: this.searchInterceptor.bind(this), defaultValue: this.props.defaultValue }),
                _react2['default'].createElement(
                    'a',
                    { href: 'javascript:void(0);', className: 'search-buttom clear', ref: 'j-clear', onClick: this.clear.bind(this) },
                    'x'
                )
            ),
            _react2['default'].createElement(
                'div',
                { ref: 'j-content' },
                this.renderHistory(),
                this.renderItem()
            )
        );
    };

    return Selector;
})(_react.Component);

exports.Selector = Selector;