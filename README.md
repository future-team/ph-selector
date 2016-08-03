# ph-selector

一款类似城市选择器的组件，应用于移动端

## 使用

```js

	import {Selector} from 'ph-selector';
	import ReactDom from 'react/lib/ReactDOM';
	
	ReactDom.render(
        <Selector />,
        document.getElementById('root')
    );
```

## API

```js

	//数据请求地址
	url:'/mocks/cities',
	//是否本地缓存数据
	isCache:true,
	//缓存的id
	cacheKey:'__searchList__',
	//placeholder
	placeholder:'请输入城市名查询',
	//缓存过期时间
	cacheExpire:24 * 3600,
	//搜索按钮
	submitButton:null,
	//默认值
	defaultValue:'',
	//历史记录
	historyKey:'__history_citys__',
	//提交回调函数
	successCallback: function(){},
	searchCallback: function(){},
	initCallback: function(){}

```

## 数据格式

请参考example/mocks/cities

## Command

```
	#测试	
	npm run test	
	#打包	
	npm run build	
	#例子演示	
	npm run demo	
```


