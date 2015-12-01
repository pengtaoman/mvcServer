dojo.provide("unieap.form.AutoCompleter");
dojo.require("unieap.rpc");
dojo.declare("unieap.form.AutoCompleter",null,{
	/**
	 * @declaredClass:
	 * 		unieap.form.AutoCompleter
	 * @summary:
	 * 		下拉框的自动完成模块,用于自动从后台读取数据
	 * @example:
	 * |	<div dojoType="unieap.form.ComboBox" autoCompleter="{url:'/process.do'}"></div>
	 * 		上述代码表明服务端处理请求的地址为/process.do,在后台可以这样获得控件发送的字符串:
	 * |	String query=request.getParameter("query"); 
	 * 		然后服务端返回一个dataCenter对象,控件会自动把该dataCenter中的第一个datastore设置到ComboBox控件上
	 */
	
	//构造函数
	constructor:function(params){
		dojo.mixin(this,params);
	},
	
	widget:null,
	
	/**
	 * @summary:
	 * 		设置当输入的字符串长度为多少时,控件才向后台发送请求
	 * @type:
	 * 		{number}
	 */
	minQueryLength:1,
	
	/**
	 * @summary:
	 * 		设置处理http请求的url地址
	 * @description:
	 * 		url地址为应用程序相对路径,比如/process.do,控件会自动为之加上unieap.WEB_APP_NAME
	 * @type:
	 * 		{string}
	 */
	url:'',
	
	
	/**
	 * @summary:
	 * 		发送到服务端的字符串的名称,通过request.getParameter()可以获得到
	 * @default:
	 * 		query
	 * @type:
	 * 		{string}
	 */
	queryName:'query',
	
	
	/**
	 * @summary:
	 * 		设置是否让AutoComplter总是往后台发送请求
	 * @description:
	 * 		默认情况下,用户输入一个字符,服务端会返回一个datastore;如果用户再次输入一个字符并且该字符在返回的datastore之中，
	 * 		控件就不会再发请求。设置该属性为true,用户每输入一个字符,控件都会向服务端发送数据请求
	 * @type:
	 * 		{boolean}
	 * @defaut:
	 * 		false
	 */
	alwaysSendRequest:false,
	
	/**
	 * @summary:
	 * 		控件向服务端请求数据的回调事件,在请求数据之前触发
	 * @params:
	 * 		{object} params 传到后台的参数,用户可以自己来添加自定义的参数
	 * @example:
	 * |	<div dojoType="unieap.form.ComboBox" autoCompleter="{onBeforeSendQuery:fn}"></div>
	 * |	function fn(params,dc){
	 * |		unieap.debug(dc);
	 * |		params.name="psd";
	 * |		params.age=22;
	 * |	}
	 * |	//在Action端通过如下方法获取传递的参数：
	 * |	String name = request.getParameter("name"); //psd
	 * |	String age = request.getParameter("age"); //22
	 */
	onBeforeSendQuery:function(params,dc){
	},
	
	/**
	 * @summary:
	 * 		控件向服务端请求数据的回调事件,在获得请求的数据之后触发
	 * @params:
	 * 		{unieap.ds.DataCenter} dc 服务端返回的dataCenter
	 * @example:
	 * |	<div dojoType="unieap.form.ComboBox" jdId="demo" autoCompleter="{onBeforeSendQuery:fn}"></div>
	 * |	function fn(dc){
	 * |		alert(dc.declaredClass=='unieap.ds.DataCenter');
	 * |		unieap.debug(dc);
	 * |	}
	 */
	onAfterSendQuery:function(dc){
	},
	

	
	//////////////////////////////////////////内部方法///////////////////////////////
	
	_canSendQuery:function(sQuery){
	    if(!sQuery||this.minQueryLength<=0) {
	        return false;
	    }
	    if(sQuery.length < this.minQueryLength) {
	        return false;
	    }
		return true;
	},
	
	//往服务端发送数据请求
	
	_sendQuery:function(sQuery){
		var me=this;
	    if(this.url&&this._canSendQuery(sQuery)){
	    	var url=unieap.WEB_APP_NAME+this.url;
	    	var query=me.queryName;
			me.params = {};
			me.params[query] = sQuery;
		    var dc=new unieap.ds.DataCenter();
		    me.onBeforeSendQuery(me.params,dc);//可以在此回调方法中重新修改已有参数或者增加其他参数
		    unieap.Action.requestData({
		    	url:url,
		    	parameters:me.params,
		    	sync:false,
		    	load:function(dc){
				    if(!dc){
						return;
					}
		    		me._showResult(dc);
		    		me.onAfterSendQuery(dc);
					
		    	}
		    },dc,false);//fasle表示不显示loading
	    }

	},
	
	_showResult:function(dc){
	    var store=dc.getSingleDataStore();
		this.widget.getDataProvider().setDataStore(store);
//		this.widget.getPopup()._handKeyUp();
		//在设置alwaysSendRequest为true的情况下,用鼠标点击弹出的item,再输入字符,弹出窗口不打开,需要处理
		this.widget.getPopup()._isShowingNow && this.widget.getPopup().close();
		this.widget.getPopup().open(this.widget.getText(), [], this.widget._onPopupClose); 
	},
	
	_handleKeyUp: function(){
		var text=this.widget.getText();
		if(this.alwaysSendRequest){
			this._sendQuery(text);
		}else{
			var arr=this.widget.getDataProvider().getItems(text,false);
			arr.length==0&&this._sendQuery(text)
		}
	}
})