dojo.provide("unieap.layout.ContentPane");
//dojo.require("dijit.layout._LayoutWidget");
dojo.require("unieap.layout.Container");
dojo.declare("unieap.layout.ContentPane", [unieap.layout.Container], {
	/**
	 * @declaredClass:
	 * 		unieap.layout.ContentPane
	 * @summary:
	 * 		容器类
	 * @classDescription:
	 * 		在TabContainer中使用
	 * @example:
	 * |<div dojoType="unieap.layout.TabContainer" style="width:400px;height:400px;">
	 * |	<div dojoType="unieap.layout.ContentPane" title="测试一"></div>
	 * |	<div dojoType="unieap.layout.ContentPane" title="测试二"></div>
	 * |</div>
	 * 		包含两个ContentPane的TabContainer
	 * @img：
	 * 		images/layout/contentpane.png
	 */
	
	/**
	 * @summary:
	 * 		使用iframe的src路径
	 * @type：
	 * 		{string}		
	 */
	href: "",
	

	//是否已经初始化内容
	_hasInit:false,
	
	//是否在TabContainer中
	_inTabContainer:false,
	
	/**
	 * @summary:
	 * 		是否显示登录进度条
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		false
	 */
	showLoading:false,
	
	/**
	 * @summary:
	 * 		页面显示时是否需要刷新页面
	 * @type:
	 * 		{boolean}
	 * @default：
	 * 		false
	 */
	refreshOnShow:false,
	
	
	/**
	 * @summary:
	 * 		是否默认选中
	 * @type：
	 * 		{boolean}
	 * @default：
	 * 		false
	 * @description：
	 * 		当所有的ContentPane都未设置selected时选中第一个ContentPane。
	 * 		否则选中配置selected的ContentPane。
	 */
	selected:false,
	
	/**
	 * @summary:
	 * 		设置Tab页在Tab容器中是否可关闭
	 * @type：
	 * 		{boolean}
	 * @default：
	 * 		false
	 */
	closable:false,
	
	/**
	 * @summary:
	 * 		设置Tab页在Tab容器中是否隐藏
	 * @type：
	 * 		{boolean}
	 * @default：
	 * 		false
	 * @example:
	 * |<div dojoType="unieap.layout.TabContainer" style="width:400px;height:400px;">
	 * |	<div dojoType="unieap.layout.ContentPane" title="测试一"></div>
	 * |	<div dojoType="unieap.layout.ContentPane" title="测试二" hidden="true"></div>
	 * |</div>
	 */
    hidden:false,
    
	/**
	 * @summary:
	 * 		装载页面内容的提示语
	 * @type：
	 * 		{string}
	 * @default:
	 * 		"正在装入..."
	 */
	loadingMessage: RIA_I18N.layout.contentPane.loading,
	

	startup: function(){
	   if(this._started){ return; }
	   
	   //在父类的startup中改变child的_inTabContainer属性
	   if(!this._inTabContainer){
		   //不在TabContainer中时
	  	   this._onShow();
	   }
	   this.inherited(arguments);
    },
	
	/**
	 * @summary:
	 * 		重新设置容器的显示内容，将会把原有内容清空。
	 * @param 
	 * 		{String|DomNode|Nodelist} data
	 * @example:
	 * |var content = "<div dojoType='unieap.form.Button' label='取消'></div>";
	 * |unieap.byId("container").setContent(content);
	 */
    setContent:function(data){
    	this.href = "";
		this._setContent(data || "");
		this._createSubWidgets();
		unieap.fireContainerResize(this.domNode);
    },
    
	_setContent: function(cont){
		this.destroyDescendants();
		var node = this.containerNode || this.domNode;
		try{
			while(node.firstChild){
				dojo._destroyElement(node.firstChild);
			}
			if(typeof cont == "string"){
				node.innerHTML = cont;
			}else{
				if(cont.nodeType){
					node.appendChild(cont);
				}else{
					dojo.forEach(cont, function(n){
						node.appendChild(n.cloneNode(true));
					});
				}
			}
		}catch(e){
			
		}
	},
	
	_createSubWidgets: function(){
		var rootNode = this.containerNode || this.domNode;
		try{
			dojo.parser.parse(rootNode, true);
		}catch(e){
			
		}
	},
    
	postCreate:function(){
		this.inherited(arguments);
	},
//	resizeContainer : function(size){
//		dojo.marginBox(this.domNode, size);
//		var node = this.containerNode||this.domNode,
//			mb = dojo.mixin(dojo.marginBox(node), size||{});
//		var cb = (this._contentBox = dijit.layout.marginBox2contentBox(node, mb));
//		this.resizeChildrenContainer();
//	},
	
	/**
	 * @summary:
	 * 		设置容器的链接地址
	 * @param 
	 * 		{string} href
	 * @example:
	 * |unieap.byId("container").setHref("http://www.google.com");
	 */
	setHref: function(/*String|Uri*/ href){
		this.href=href;
		this.refresh();
	},
	
	/**
	 * @summary:
	 * 		刷新ContentPane中iframe的src
	 * @example:
	 * |unieap.byId("contentPane").refresh();
	 */
	refresh:function(){
		if(this.href){
			this.onDownloadStart();
			if(dojo.isIE){
				this._if.src="javascript:false;";
			}
			if(dojo.isIE){
				this._if.src=this.href;
			}else{
				//在火狐下若主页面尚未加载完成，不添加延时的话，子页面的addOnload不会执行
				var self = this;
			    setTimeout(function(){
				  self._if.src=self.href;
			    },1000);
			}
		}
	},
	
	/**
	 * @summary:
	 * 		在Tab容器中,点击关闭按钮的回调方法
	 * @description:
	 * 		当返回false时,不关闭Tab页。
	 * 		当返回true时,关闭Tab页。
	 * 		默认返回true。
	 * @return:
	 * 		{boolean}
	 * @example:
	 * |<div dojoType="unieap.layout.TabContainer" style="width:400px;height:400px;">
	 * |	<div dojoType="unieap.layout.ContentPane" title="测试一" onClose="testOnClose" closable="true"></div>
	 * |	<div dojoType="unieap.layout.ContentPane" title="测试二"></div>
	 * |</div>
	 * |<script>
	 * |	function testOnClose(pane){
	 * |		//自定义逻辑判断
	 * |	}
	 * |</script>
	 *      
	 */
	onClose:function(){
		return true;
	},

	/**
	 * @summary:
	 * 		当内容显示时触发的事件，每次显示的时候均会触发
	 * @param: 
	 * 		{unieap.layout.ContentPane} pane
	 * @example:
	 * |<div dojoType="unieap.layout.TabContainer" style="width:400px;height:400px;">
	 * |	<div dojoType="unieap.layout.ContentPane" title="测试一" onShow="testOnShow"></div>
	 * |	<div dojoType="unieap.layout.ContentPane" title="测试二"></div>
	 * |</div>
	 * |<script>
	 * |	function testOnShow(pane){
	 * |		alert("showing");
	 * |	}
	 * |</script>
	 */
	onShow:function(pane){
		
	},
	
	/**
	 * @summary:
	 * 		当内容初始化时触发的事件，仅在初始化的时候执行一次
	 * @param: 
	 * 		{unieap.layout.ContentPane} pane
	 * @example:
	 * |<div dojoType="unieap.layout.TabContainer" style="width:400px;height:400px;">
	 * |	<div dojoType="unieap.layout.ContentPane" title="测试一" onInit="testOnInit"></div>
	 * |	<div dojoType="unieap.layout.ContentPane" title="测试二"></div>
	 * |</div>
	 * |<script>
	 * |	function testOnInit(pane){
	 * |		alert("init the pane");
	 * |	}
	 * |</script>
	 */
	onInit:function(pane){
		
	},
	
	_onShow: function(){
		this.onShow(this);
        if (this.refreshOnShow||this._hasInit==false) {
			//refreshOnShow为true或第一次载入 时刷新pane
            this.refresh();
        }
		if(this._hasInit==false&&this._onInit){
			this._hasInit=true;
			this._onInit();
		}
    },
	
	
	_onInit:function(){
		this.onInit(this);
	},
	
	_onreadystatechange:function(e){
		if(e.type=="load"){
			this.onDownloadEnd();
		}else if(e.target.readyState=="complete"){
			this.onDownloadEnd();
		}
	},
		
	//刷新contentpane的的href前的动作
	onDownloadStart: function(){
		if(this.showLoading){
			this._loadingNode&&dojo.destroy(this._loadingNode);
			this._loadingNode=dojo.create("div",{'class':'loading','innerHTML':this.loadingMessage},this.containerNode||this.domNode,'first');
			if(!this._if){
				this._if=dojo.create('iframe',{'class':'u-contentpane-iframe'},this.containerNode||this.domNode);
				if(dojo.isIE){
					this.connect(this._if,'onreadystatechange','_onreadystatechange');
				}else{
					this.connect(this._if,'onload','_onreadystatechange');
				}
				this.connect(this._if,'onactivate',function(evt){dojo.stopEvent(evt);});
			}
			if(dojo.isIE){
				dojo.style(this._if,'width',0)
			}else{
				dojo.style(this._if,'display','none')
			}
		}else{
			if (!this._if) {
				this._if = dojo.create('iframe', {
					'class': 'u-contentpane-iframe',
					'style':{
						'height':'100%',
						'width':'100%'
					}
				}, this.containerNode || this.domNode);
				this.connect(this._if,'onactivate',function(evt){dojo.stopEvent(evt);});
			}
		}
		this._if.frameBorder="no";
	},
	
	//成功设置href后的动作
	onDownloadEnd: function(){
		this._loadingNode&&dojo.destroy(this._loadingNode);
		dojo.style(this._if,{
			display:"",
			height:"100%",
			width:"100%"
		})
	},
	/**
	 * @summary:
	 * 		获取iframe的window对象
	 * @return:
	 * 		{object}
	 * @example:
	 * 		var container = unieap.byId("container");
	 * 		var win = container.getContentWindow();
	 * 		alert(win);
	 */
	getContentWindow : function(){
		if(this._if){
			return this._if.contentWindow;
		}	
		return window;
	}
});
