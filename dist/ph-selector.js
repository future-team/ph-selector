(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react/lib/ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react/lib/ReactDOM"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("react/lib/ReactDOM")) : factory(root["React"], root["ReactDom"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(2);

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(7);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _reactLibReactDOM = __webpack_require__(8);

	var _reactLibReactDOM2 = _interopRequireDefault(_reactLibReactDOM);

	__webpack_require__(9);

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
	                    { href: "#" + item },
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
	                    { href: 'javascript:void(0);', className: 'item', onClick: _this5.activeHandler.bind(_this5, item.name, item.id), key: item.name },
	                    item.name
	                );
	            }),
	            _react2['default'].createElement(
	                'a',
	                { href: 'javascript:void(0);', className: 'clear j-clear', onClick: this.clear.bind(this) },
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".w-search .search-input-box {\n  display: flex;\n  display: -webkit-flexbox;\n  display: -webkit-box;\n  position: relative;\n  padding: 0.93rem 0.8rem 0.5rem 0.8rem;\n}\n.w-search .search-input-box .search {\n  position: relative;\n  flex: 1;\n  -webkit-flex: 1;\n  -webkit-box-flex: 1;\n  height: 2.5rem;\n  display: block;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  border: 1px solid #cccccc;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: 100%;\n  font-size: 1rem;\n  border-radius: 4px;\n  -webkit-appearance: none;\n}\n.w-search .search-input-box .search-buttom {\n  margin-left: 0.5rem;\n  width: 2.5rem;\n  display: block;\n  line-height: 2.5rem;\n  text-align: center;\n  color: #ee5511;\n}\n.w-search .search-input-box .clear {\n  display: block;\n  width: 16px;\n  height: 16px;\n  position: absolute;\n  background: #ccc;\n  text-align: center;\n  line-height: 14px;\n  color: #fff;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  border-radius: 50%;\n  top: 50%;\n  margin-top: -8px;\n  right: 23px;\n  font-size: 12px;\n  display: none;\n}\n.w-search .list-box a {\n  color: #323232;\n  padding-left: 0.625rem;\n  border-bottom: 1px solid #e3e3e3;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  display: block;\n  text-decoration: none;\n}\n.w-search .list-box a.item {\n  background: #fff;\n}\n.w-search .list-box a.t {\n  color: #999;\n}\n.w-search .list-box a.clear {\n  text-align: center;\n  background: #fff;\n}\n.w-search .nav {\n  height: auto;\n  margin: auto;\n  position: fixed;\n  top: 10px;\n  right: 0px;\n  text-align: center;\n}\n.w-search .nav a {\n  display: block;\n  margin: 0px;\n  font-size: 10px;\n  color: #000088;\n  padding: 1px 5px;\n  border: none;\n  text-decoration: none;\n}\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return
	      }

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ }
/******/ ])
});
;