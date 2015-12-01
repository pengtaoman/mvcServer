dojo.provide("unieap.form.InlineEditBox")
dojo.require("unieap.form.FormWidget")
dojo.declare("unieap.form.InlineEditBox",unieap.form.FormWidget,{
	
	
	/**
	 * @declaredClass:
	 * 		unieap.form.InlineEditBox
	 * @superClass:
	 * 		unieap.form.FormWidget
	 * @summary:
	 * 		从外表上看,InlineEditBox控件是一个只读文本;当点击只读文本时,会弹出一个编辑器,它可以对文本进行编辑。编辑器失去焦点后，编辑器消失，文本的值发生改变。
	 * @img:
	 * 		images/form/inlineeditbox.png
	 * @example:
     * |<form dojoType="unieap.form.Form" binding="{store:'empStore'}">
     * |	<div id="sex" dojoType="unieap.form.InlineEditBox" binding="{name:empName}" editor="{editorClass:'unieap.form.TextBox'}">
     * |	</div>
     * |</div>
	 */
	 
	 
	 UserInterfaces : dojo.mixin({
		showUnderLine : "boolean",
		decoder : "object",
		editor : "object",
		displayFormatter: "object",
		value : "string",
		disabled : "boolean",
		skipFocus : "boolean",
		onChange : "function"
	},
	unieap.form.FormWidget.prototype.UserInterfaces),
	 
	templateString:
			"<div class=\"u-form-inlineWidget\">"+
				'<div dojoAttachPoint=\"inlineNode\"  class="u-form-inline">' +
					"<div dojoAttachPoint=\"modifiedNode\" class=\"u-form-modified\"></div>"+
					'<div class="u-form-inline-display" dojoAttachPoint="displayNode,focusNode"></div>' +
				 "</div>" + 
			'</div>',
				  

	
	/**
	 * @summary:
	 * 		设置是否在只读文本下显示下划线
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		false
	 * @example:
	 * |	<div dojoType="unieap.form.InlineEditBox" showUnderLine="true"></div>
	 */
	showUnderLine:true,
	
	/**
	 * @summary:
	 * 		设置InlineEditBox的转码,例如将数字3转码成辽宁省等
	 * @type:
	 * 		{object}
	 * @example:
	 * |	<div dojoType="unieap.form.InlineEditBox" decoder="{store:'provinceStore',displayAttr:'id',valueAttr:'name'}"></div>
	 *      decoder的valueAttr和displayAttr属性的值分别为id,name。
	 */
	decoder:null,
	
	
	/**
	 * @summary:
	 * 		对InlineEditBox控件的显示值进行格式化
	 * @type:
	 * 		{object}
	 * @example:
	 *      下面的代码会把数字22转换为"$22.00"
	 * |	<div dojoType="unieap.form.InlineEditBox" displayFormatter="{declaredClass:'unieap.form.NumberDisplayFormatter',dataFormat:'$###,###.00'}"></div>
	 *      下面的代码会把字符串"1202745600000"变为"2008/02/02"
	 * |	div dojoType="unieap.form.InlineEditBox" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy/MM/dd'}"></div>
	 *      
	 */
	displayFormatter:null,
	
	/**
	 * @summary:
	 * 		对日期值进行格式化。
	 * @type:
	 * 		{object}
	 * @example:
	 * 		假设有一个字符串为"2008-01-01",我们想把它格式化成"2008/01/01"
	 * |	<div dojoType="unieap.form.InlineEditBox" value="2008-01-01" valueFormatter="{declaredClass:'unieap.form.DateValueFormatter',dataFormat:'yyyy-MM-dd'}"
	 * |		 displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy/MM/dd'}">
	 * |	</div>
	 * 		
	 */
	valueFormatter:null,
	
	
	/**
	 * @summary:
	 * 		设置InlineEditorBox控件的编辑器,默认编辑器为unieap.form.TextBox
	 * 
	 * @type：
	 * 		{object}
	 * @example:
	 * |	<div dojoType="unieap.form.InlineEditBox" editor="{editorClass:'unieap.form.TextBox'}"></div>
	 * |	<div dojoType="unieap.form.InlineEditBox" editor="{editorProps:{required:true}}"></div>
	 */
	editor:{},
	
	/**
	 * @summary:
	 * 		设置是否禁用InlineEditBox控件
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		false
	 * @description:
	 * 		禁用后,控件将不可编辑
	 */
	disabled:false,

	/**
	 * @summary:
	 * 		控件初始化时显示的文本值
	 * @type:
	 * 		{string}
	 */
	value: "",

	//回车聚焦时跳过
	skipFocus: true,
	
	/**
	 * @summary:
	 * 		当控件的值发生变化时触发
	 * @param:
	 * 		{object} value
	 */
	onChange:function(value){
		
	},

	postCreate: function(){
		//设置静态文本格式化参数
		unieap.setLabelFormatProps(this);
		//如果设置了显示下划线
		if(!this.showUnderLine){
			//设置一个无效的1px 下划线消失?why?如果为空,ff下下划线不消失
			this.inlineNode.style.height= '20px';
			this.inlineNode.style.borderBottom="1px";
		}		
        //给displayNode增加点击事件
	    this.connect(this.domNode, 'onclick', '_onClick');
		this.connect(this.inlineNode, 'onmouseover', '_onMouseover');
		this.connect(this.inlineNode, 'onmouseout', '_onMouseout');

		//初始化displayNode的值
		this.value&&this.setValue(this.value);
		
		//由于数据绑定后源binding属性将变为unieap.form.FormWidgetBinding,克隆原有的binding属性
		this.orignBinding = dojo.clone(this.binding);
	},
	
	destroy:function(){
		//销毁InlineEditor中的editWidget，以免发生内存泄露
		if(this.getEditor().editWidget){
			this.getEditor().editWidget.destroy();
		}
		this.inherited(arguments);
	},

    //点击只读文本时触发
	_onClick: function(evt){
		//如果配置了禁用属性或者正在编辑中……
		if(this.disabled || this.editing){ return; }
		if(evt){ dojo.stopEvent(evt); }
		var editor = this.getEditor();		
		editor.attachEditor();
	},
	
	_onMouseover: function(evt) {
		//displayNode Div实际高度>行高，说明换行，Inline显示不下，需要Tooltip
		var needTooltip = dojo.style(this.displayNode, "height") 
						> dojo.style(this.displayNode, "lineHeight");
		var text = this.getText();
		var domNode = this.domNode;
		if(needTooltip && text) {
			this.toolTip = window.setTimeout(function(){
				unieap.showTooltip({inner:text,autoClose:true},domNode);
			},500);
		}
	},
	
	_onMouseout: function(evt) {
		var needTooltip = dojo.style(this.displayNode, "height") 
						> dojo.style(this.displayNode, "lineHeight");
		var domNode = this.domNode;
		if(needTooltip && this.toolTip) {
			window.clearTimeout(this.toolTip);
			unieap.hideTooltip(domNode);
		}
	},
	
	//获得编辑器对象,获得一次后讲缓存这个编辑器对象.缓存过程可以查看getModuleInstance这个方法
	getEditor:function(){
		this.editor.editorProps = dojo.mixin({},
			this.editor.editorProps,
			{binding:this.orignBinding}
		);
		return unieap.getModuleInstance(this,"editor","unieap.form.InlineEditor");
	},
	
	//用户可以自己定义自己的formatter,例如
	//displayFormatter="{declaredClass:'unieap.form.NumberDisplayFormatter',dataFormat:'###,###.00'}"
	getDisplayFormatter:function(){
		return unieap.getModuleInstance(this,"displayFormatter","unieap.form.SimpleFormatter");
	},
	
	//获得Decodr对象
	getDecoder:function(){
		return unieap.getModuleInstance(this,"decoder","unieap.form.InlineDecoder");
	},
	
	/**
	 * @summary:
	 * 		设置InlineEditBox控件的解码器
	 * @param:
	 * 		{object} decoder
	 * @example:
	 * |	unieap.byId("inline").setDecoder({store:'ds',valueAttr:'id',displayAttr:'name'});
	 */
	setDecoder:function(decoder){
		this.getDecoder = dojo.getObject(this.declaredClass).prototype.getDecoder;
		this.decoder=decoder;
		this.setValue(this.value);
	},
	
	//对日期进行格式化
	getValueFormatter:function(){
		return unieap.getModuleInstance(this,"valueFormatter","unieap.form.SimpleFormatter");
	},
	
	setValue: function(value){
		(value==null||typeof(value)=="undefined")&&(value="");
		this.value=value;
		//如果处于控件处于编辑状态，直接返回
		if (this.editing) {
			return;
		}
		//进行解码操作
		if(this.decoder){
			value=this.getDecoder().decode(value);
		}
		//value值格式化操作
		if (this.valueFormatter) {
			value = this.getValueFormatter().format(value);
		}
		
		//显示值格式化操作
		if (this.displayFormatter) {
			value = this.getDisplayFormatter().format(value);
		}
		this.setText(value);
		this.fireDataChange();
	},

	/**
	 * @summary:
	 * 		获得控件的值
	 * @return:
	 * 		{string}
	 * @example:
	 * |	例如控件的值是"0411",但显示成"大连"。那么getValue()返回的就为0411
	 */
	getValue: function(){
		return this.value;
	},
	
	/**
	 * @summary:
	 * 		获取控件的文本值
	 * @return:
	 * 		{string}
	 */
	getText:function(){
		return this.displayNode[dojo.isFF?"textContent":"innerText"] || "";
	},
	
	/**
	 * @summary：
	 * 		设置控件的显示值
	 */
	setText:function(text){
		text = text==null? "" : dojo.trim(String(text));
		this.displayNode[dojo.isFF?"textContent":"innerText"] = text;
		
	}
});