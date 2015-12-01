dojo.provide("unieap.global");
	/**
	 * @declaredClass:
	 * 		unieap.global
	 * @summary:
	 * 		定义全局变量，用户可以修改里面的参数
	 */

if(!unieap){
	unieap={};
}

if(!unieap.global){
	unieap.global={};
}

/**
 * @summary:
 * 		根据id获取组件方法 
 * @param：
 * 	{string} id
 * 		组件在页面上的唯一标识
 * @param:
 * 	{domNode} rootNode 控件所在的上下文节点
 * @example:
 * 	| var widget = unieap.byId("grid");
 */
unieap.byId=function(id,rootNode){
	if(!dijit) return null;
	var contextId =rootNode?rootNode.id:"";
	return dijit.byId(contextId ? contextId+id : id);
}

unieap.currentRootNode = null;


/**
 * @summary:
 * 		根据id和上下文来销毁控件
 * @param {String} id 要销毁的控件id
 * @param {domNode} context 控件所在的上下文节点
 */
unieap.destroyWidget=function(id,rootNode){
	if(!dijit) return;
	var contextId =rootNode?rootNode.id:"";
	var widget=dijit.byId(contextId ? contextId+id : id);
	widget && widget.destroy && widget.destroy();
}

/**
 * @summary:
 * 		删除context上下文中的所有widget控件
 * @param:
 * 		{String} context
 */
unieap.destroyWidgets=function(rootNode){
	if(!dijit  || !rootNode) return;
	var widgets = dojo.query("[widgetId]",rootNode).map(dijit.byNode);
	for(var i=widgets.length-1,widget;widget=widgets[i];i--){
		if(widget.destroy){
			widget.destroy();
		}
		else if(widget.id){
			dijit.registry.remove(widget.id);
		}
	}
}


/**
 * @summary:
 * 		设置是否支RIA的页面持调试工具
 * @description:
 * 		当为true时，通过快捷键Alt + X 可以调试当前页面dataCenter对象，为false没有此功能
 * @type:
 * 		{boolean} 
 * @default:
 * 		true
 */
unieap.isDebug = true;
/**
 * @summary:
 * 		设置是否使用客户端缓存
 * @type:
 * 		{boolean}
 * @default:
 * 		false
 */
unieap.global.isUseClientCache = false;

/**
 * @summary:
 * 		设置汉字所占字节
 * @type:
 * 		{number}
 * @default:
 * 		3
 */
unieap.global.bitsOfOneChinese=3;

/**
 * @summary:
 * 		数据类型
 * @description:
 * 		数据类型与java.sql.Types数据类型一致
 * @type:
 * 		{object}
 * @default:
 * 		无
 */
unieap.DATATYPES={
		TINYINT : -6,
	 	SMALLINT : 5,
	 	INTEGER : 4,
  		BIGINT : -5,
  		FLOAT : 6,
  		REAL : 7,
  		DOUBLE : 8,
  		NUMERIC : 2,
  		DECIMAL : 3,
  		VARCHAR : 12,
		STRING : 12,
        LONGVARCHAR : -1,
		DATE : 91,
  		TIME : 92,
		TIMESTAMP : 93,
   		BOOLEAN : 16
};

unieap.session = {
	//Ajax请求返回的超时的标记
	timeout : "<!-- THE-NODE-OF-SESSION-TIMEOUT -->",
	//登陆成功
	reloginSuccessful:"THE-NODE-OF-RELOGIN-SUCCESSFUL",
	/**
	 * @summary:
	 * 		是否用Dialog重新登陆
	 * @type:
	 * 		{boolean}
	 */
	dialogRelogin : true
};

/**
 * @summary:
 * 		动画统一开关
 * @type:
 * 		{boolean}
 * @default:
 * 		true
 */
unieap.animate = false;

unieap.widget={
	
	/**
	 * @summary:
	 * 		是否在Form和Grid进行主动校验时自动提示错误信息
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		false
	 */
	errorPrompt:false,
	
	grid:{
		/**
		 * @summary:
		 * 		是否总是在grid的表头上显示菜单按钮(点击按钮就会弹出菜单)
		 * @type:
		 * 		{boolean}
		 */
		alwaysShowMenu:false,
		
		/**
		 * @summary:
		 * 		grid翻页时，当本页发生变化时默认采取的操作
		 * @description:
		 * 		discard： 不提示，不保存，翻页
		 * 
		 * 		saveconfirm： 根据提示进行操作 “数据发生改变，是否保存修改?”
		 * 				  选择确定：保存，不翻页
		 * 				  选择取消：不保存，翻页
		 * 		discardconfirm：根据提示进行操作，“数据发生改变，是否放弃修改？”
		 * 				  选择确定：不保存，翻页
		 * 				  选择取消：	不保存，不翻页
		 * @type:
		 * 		{string}
		 * @enum:
		 * 		{"discard"|"saveconfirm"|"discardconfirm"}
		 */
		pagingModifiedSave:"saveconfirm",
		
		
		/**
		 * @summary:
		 * 		grid 的默认编辑模式
		 * @type:
		 * 		{string}
		 * @enum:
		 * 		{"rowEdit"|"cellEdit"|"readonly"}
		 * 		
		 */
		editType:"readonly",
			
		
		/**
		 * @summary:
		 * 		设置是否单击触发编辑
		 * @type:
		 * 		{boolean}
		 * 
		 */
		singleClickEdit:false,
		
		/**
		 * @summary:
		 * 		设置每页显示的数据条数
		 * @type:
		 * 		{boolean|array}
		 */
		userPageSize:false
			
	},
	form:{
		
		/**
		 * @summary：
		 *   当输入文本框内容为空并且鼠标焦点置入时,设置文本框是否显示当前时间。
		 * @type：
		 * 	 {boolean}
		 * @default:
		 * 		true
		 */
		autoDate : true,
		
		
		alwaysShowErrMessage:true,
		
		/**
		 * @summary:
		 * 		下拉框的显示类型
		 * @type：
		 * 		{string}
		 * @enum：
		 * 		{"table"|"list"|"multi"}
		 */
		comboDisplayStyle: "list",
		
		/**
		 * @summary:
		 * 		多选下拉框的弹出结构
		 */
		comboStructure: null,
		
		/**
		 * @summary:
		 * 		是否在每个下拉框都否显示 <请选择> 列
		 * @type:
		 * 		{boolean}
		 */
		comboShowSelect : false,

		/**
		 * @summary:
		 * 		下拉框 <请选择> 列，自定义显示
		 * @description：
		 * 		下拉框 <请选择> 列，自定义显示，当comboShowSelect的值为true时有效
		 */
		comboShowSelectText : "<请选择>",
		
		/**
		 * @summary:
		 * 		下拉框 <请选择> 列，自定义VALUE
		 * @description：
		 * 		下拉框 <请选择> 列，自定义VALUE，当comboShowSelect的值为true时有效
		 */
		comboShowSelectValue : "",
		
		textValidate : false
		
	}
}

//引入国际化文件
if(typeof(RIA_I18N)=='undefined'){
	var locale=navigator.browserLanguage||navigator.language;
	locale=locale.slice(0,2)+"_"+locale.slice(3,5).toUpperCase();
	!unieap.locale&&(unieap.locale=locale);
	//locale值为zh_CN、en_US等
	dojo.require("unieap.nls.application_"+locale);
}

