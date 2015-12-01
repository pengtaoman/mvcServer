dojo.provide("unieap.form.ComboBoxPopup");
dojo.require("unieap.form.Popup");
dojo.require("unieap.global")
dojo.declare("unieap.form.ComboBoxPopup", unieap.form.Popup, {
	/**
	 * @declaredClass:
	 * 		unieap.form.ComboBoxPopup
	 * @summary:
	 * 		下拉框的弹出框
	 * @superClass:
	 * 		unieap.form.Popup
	 * @example:
	 * |var city = new unieap.ds.DataStore('city_store', [
	 * |	{CODEVALUE: 1,CODENAME: '宁波'}, 
	 * |	{CODEVALUE: 2,CODENAME: '宁海'}, 
	 * |	{CODEVALUE: 3,CODENAME: '温州'}, 
	 * |	{CODEVALUE: 4,CODENAME: '沈阳'}, 
	 * |	{CODEVALUE: 5,CODENAME: '大连'}, 
	 * |	{CODEVALUE: 6,CODENAME: '金州'},
	 * |	{CODEVALUE: 7,CODENAME: '旅顺'},
	 * |	{CODEVALUE: 8,CODENAME: '鞍山'}
	 * |]);
	 * |<div dojoType="unieap.form.ComboBox" 
	 * |		dataProvider="{'store':'city_store',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"
	 * |		popup="{displayStyle:'multi',height:100px}">
	 * |</div>
	 * 上述代码展示，通过popup属性配置下拉框多选和下拉框高度
	 * @img:
	 * 		images/form/combobox_multi_height.png
	 */
	 
	// 用div标签并且设置taindex为0,在firefox下通过document.actionElement可以获得到
	templateString: 
		"<div tabindex='0' class='u-combobox-list' dojoAttachPoint='listNode,popupcontainer,containerNode'>"+
			"<div class='u-combobox-list-header' dojoAttachPoint='listHeaderNode'>"+
				"<table dojoAttachPoint='tableHeaderNode'></table>"+
			"</div>"+
			"<div class='u-combobox-items-container' dojoAttachPoint='listContainerNode'>"+
				"<table dojoAttachPoint='tableBodyNode,focusNode'><tbody></tbody></table>"+
			"</div>"+
			"<div class='u-combobox-list-footer' dojoAttachPoint='listFooterNode'></div>"+
		"<div>",
	/**
	 * @summary:
	 * 		指定下拉框的高度
	 * @type：
	 * 		{number}
	 * @default:
	 * 		auto
	 */
	height: "auto",
	
	/**
	 * 下拉列表item个数限制
	 */
	pageSize: -1,
	
	/**
	 * @summary:
	 * 		下拉框的显示类型
	 * @description:
	 * 		下拉框的显示类型,可以在global.js中定义全局默认值
	 * @type：
	 * 		"string"
	 * @enum：
	 * 		{"table"|"list"|"multi"}
	 * @example:
	 * |<div dojoType="unieap.form.ComboBox" popup="{displayStyle:'table'}" dataProvider="{'store':'city_store'}">
	 * |</div>
	 * 上述代码展示了displayStyle为table的配置
	 * @img:
	 * 		images/form/combobox_table.png
	 */
	displayStyle: unieap.widget.form.comboDisplayStyle,
	
	/**
	 * @summary:
	 * 		下拉框的结构
	 * @type:
	 * 		{object}
	 * @example:
	 *|	<script type="text/javascript">  
	 *|		var search = new unieap.ds.DataStore('mysearch', [
	 *|		 		{CODEVALUE:'baidu',CODENAME: '百度'}, 
	 *|		 		{CODEVALUE: 'google',CODENAME: '谷歌'} 
	 *|			]);
	 *|		dataCenter.addDataStore(search);
     *|		var structure = {   
	 *|	            rows : [{   
	 *|	                field :"CODEVALUE",   
	 *|	                width : "30%"   
	 *|	            }, {   
	 *|	                "title" : "代码标题",   
	 *|	                field : "CODENAME",   
	 *|	                width : "70%"   
	 *|	            }]   
	 *|	        }   
	 *|	    var imgPath="/EAPDomain/ria33demo/pages/samples/form/images/";   
	 *|	    function getInnerHTML(value, item, field, text, matchReg){   
	 *|	        if (field == 'CODEVALUE') {   
	 *|	            if (item.CODEVALUE == "baidu") {   
	 *|	                return "<img style='display:block;height:16px;width:16px' src='"+imgPath+"baidu.bmp"+"' />"   
	 *|	            }else{   
	 *|	                return "<img style='display:block;height:16px;width:16px' src='"+imgPath+"google.bmp"+"' />"   
	 *|	            }   
	 *|	        }   
	 *|	        return "<span>" + value + "</span>";   
	 *|	    }   
	 *|	</script>  
	 *|	<div dojoType="unieap.form.ComboBox" popup="{structure:structure,getInnerHTML:getInnerHTML}" dataProvider="{'store':'mysearch'}">  
	 *|	</div>  
	 *上述代码展示了自定义下结构和下拉框的例子
	 *@img:
	 *		images/form/combobox_custom.png
	 */
	structure: null,
	
	// assumption that the widget is instanceof ComboBox
	widget: null,
	
	// template variables during opening
	_selection: null,/* Array of Item */
	_highlighted: null,// domNode
	
	// callback will be a function which will be called at the end of the closing of this popup
	_callback: null,
	
	// lift cycle
	postMixInProperties: function() {
		this.inherited(arguments);
		if (this.displayStyle=="multi") {
			this.structure = this.structure || unieap.widget.form.comboStructure;
			dojo.require("unieap.form.ComboBoxPopupMulti");
			dojo.mixin(this, unieap.form.ComboBoxPopup.multi);
		} else {
			dojo.require("unieap.form.ComboBoxPopupList");
			dojo.mixin(this, unieap.form.ComboBoxPopup.list);
		}
	},
	postCreate: function() {
		this.inherited(arguments);
		if (dojo.isWebKit) {
			this.connect(this.focusNode, "onmousedown", "_onMouseDown");
		} else {
			this.connect(this.focusNode, "onclick", "_onClick");
		}
		this.connect(this.focusNode, "onmouseover", "_onMouseOver");
		this.connect(this.focusNode, "onmouseout", "_onMouseOut");
		this.connect(this.focusNode, "onblur",	"_onBlur");
	},
	destroy: function() {
		dojo.query(".u-comboxbox-item", this.tableBodyNode).forEach(dojo.hitch(this, function(tr) {
			dojo.removeAttr(tr, "item");
		}));
		this.inherited(arguments);
	},
	
	// override parent
	/**
	 * @summary:
	 * 		打开下拉框
	 */
	open: function(items, selection, callback) {
		if(!this.widget._canPopOpen()){
			return;
		}
		if (!dojo.isArray(items)) {
			items = this.widget.getDataProvider().getItems();
			if (!dojo.isArray(items) || items.length==0)
				return;
		}
		
		if (this.pageSize == 0) return;
		if (this.pageSize > 0) {
			items = items.slice(0, this.pageSize);
		}
		
		if (selection) {
			this._selection = dojo.isArray(selection)?selection:[];
		} else {
			this._updateSelection();
		}
		this._callback = callback || this.widget._onPopupClose;
		this._highlighted = null;
		
		if (this.structure == null) {
			this._createStructure();
		}
		this._createPopup(items, this.structure);
		this.inherited(arguments);
		if (!this.animate) {
			dojo.style(this.listContainerNode, "overflowY", "auto");
			// 高亮显示选中的节点
			if (this._selection && this._selection.length>0) {
				for (var i=0; i<this._selection.length; i++) {
					dojo.query(".u-combobox-item", this.tableBodyNode).forEach(dojo.hitch(this, function(tr) {
						if (tr.item==this._selection[i]) {
							this._focusOptionNode(tr);
						}
					}));
				}
			}
		}
	},
	
	/**
	 * @summary:
	 * 		关闭下拉框
	 */
	close: function(callback) {
		if (this.isOpen()) {
			this.inherited(arguments);
			if (dojo.isFunction(callback)) {
				callback.apply(this.widget, [this._selection]);
			} else if (dojo.isFunction(this._callback))  {
				this._callback.apply(this.widget, [this._selection]);
			}
		}
	},

	/**
	 * @summary:
	 * 		设置下拉框的结构
	 * @param：
	 * 		{object} structure
	 */ 
	setStructure:function(structure){
		this.structure=structure;
	},
	
	onAnimateBegin: function() {
		this.inherited(arguments);
		dojo.style(this.domNode, "visibility", "visible");
		dojo.style(this.listContainerNode, "overflowY", "hidden");
	},
	onAnimateEnd: function() {
		this.inherited(arguments);
		if (dojo.isIE) {
			if (this.listContainerNode.offsetHeight<this.tableBodyNode.offsetHeight) {
				dojo.style(this.listContainerNode, "overflowY", "scroll");
			}
		} else {
			dojo.style(this.listContainerNode, "overfolwY", "auto");
		}
	},
	
	
	// API
	/**
	 * @summary:
	 * 		选中某条下拉数据之后的回调方法。
	 * @type：
	 * 		{function}
	 * @param:	
	 * 		{object} item
	 * 		 选中的本行数据
	 * @param
	 * 		{unieap.form.Combobox} widget
	 * 		combobox变量	
	 * @example:
	 * |<script type="text/javascript">
	 * |	var city = new unieap.ds.DataStore('city_store', [
	 * |		{CODEVALUE: 1,CODENAME: '宁波'}, 
	 * |		{CODEVALUE: 2,CODENAME: '宁海'}, 
	 * |		{CODEVALUE: 3,CODENAME: '温州'}
	 * |	]);
	 * |	function selectItem(item,widget){
	 * |		alert(item.CODEVALUE);
	 * |		alert(widget.id);
	 * |	}
	 * |</script>
	 * |<div id="combobox" dojoType="unieap.form.ComboBox" popup="{onSelect:selectItem}" dataProvider="{'store':'city_store'}">
	 * |</div>
	 * onSelect的可以或得两个参数，1.被选中的数据对象item 2.ComboBox控件对象widget			
	 */
	onSelect: function(item, widget) {
	},
	
	/**
	 * @summary:
	 * 		渲染下拉列表中的td的innerHTML
	 * @param 
	 * 		{string} value
	 * 		显示值
	 * @param:
	 * 	 	{object} item
	 * 		本行数据
	 * @param: 
	 * 		{string} field
	 * 		显示值所在的字段值,如：CODEVALUE CODENAME
	 * @param:
	 * 		{string} text
	 * 		当前输入域文本
	 * @param:  {object} matchReg
	 * 		默认提供的正则表达式,控制输入文本的高亮显示。
	 * @return：
	 * 		返回innerHTMl
	 * @example :
	 * |	<div dojoType="unieap.form.ComboBox" popup="{getInnerHTML:getInnerHTML}">
	 * |	</div>
	 * |	function getInnerHTML(value,item,field,text,matchReg){
	 * |		if(field=='age'){
	 * |			if(value<16){
	 * |				reurn "<img src='child.png'/>"
	 * |			}
	 * |			return "<img src='person.png'/>"
	 * |		}
	 * |		return "<span>"+value+"</span>";
	 * |	} 
	 * 		修改年龄字段的显示为图片
	 */
	getInnerHTML: function(value, item, field, text, matchReg) {
		if (matchReg) {
			value = value.toString().replace(matchReg,"<strong class='mtach'>$1</strong>");
		}
		// ie下td的innerHTML为"<"时不能正常显示，帮套上一个<span>
		return "<span>"+value+"</span>";
	},
	// inner API
	_updateSelection: function(selection) {
		var selection = this.widget._getSelectedItems();
		this._selection = dojo.isArray(selection)?selection:null;
		// update ui?
	},
	_createPopup: function(items, structure) {
		// override by list|table|multi
	},
	_createStructure: function() {
		var d = this.widget.getDecoder();
		if (this.displayStyle=="table") {
			// table的默认展现方式
			this.structure = {
				rows: [
					{title:RIA_I18N.form.combobox.codeValue,field:d.valueAttr,width:'30%'},
					{title:RIA_I18N.form.combobox.codeName,field:d.displayAttr,width:'70%'}
				]
			}
		} else {
			this.structure = {
				rows: [
					{field: d.displayAttr}
				]
			}
		}
		return this.structure;
	},
	_resetWidgetHW: function() {
		var listWidth = this._getListContainerNodeWidth();
		if (this.animate)
			dojo.style(this.domNode, "visibility", "hidden");
		dojo.style(this.domNode, "display", "block");
		dojo.style(this.popupcontainer, "height", "");
		dojo.style(this.listContainerNode, "height", "");
		var textFiledWidth = dojo.style(this.widget.domNode, 'width');
		if(this.width == "auto" || this.width==""){
			dojo.style(this.popupcontainer, "width", (listWidth?(listWidth>textFiledWidth?listWidth:textFiledWidth):textFiledWidth) + 'px');
		}else{
			dojo.style(this.popupcontainer, "width", this.width);
		}
		this.height = (this.height+"").replace(/[^0-9]/g,'');
		if (this.height && this.domNode.offsetHeight>this.height) {
			dojo.style(this.popupcontainer, 'height', this.height+'px');
			var _h=this.height-this.listHeaderNode.offsetHeight;
			dojo.style(this.listContainerNode,'height',_h+'px');
		}
	},
	
	//获取下拉框的真实宽度
	_getListContainerNodeWidth:function(){
		var div = document.createElement("div");
		dojo.style(div,{
			visibility: "hidden",
			position: "absolute",
			top: "-100px",
			left: "-100px"
		});
		
		div.appendChild(this.tableBodyNode);
		dojo.doc.body.appendChild(div);
		var bodyWidth = this.tableBodyNode.offsetWidth;
		this.listContainerNode.appendChild(this.tableBodyNode);
		
		div.appendChild(this.tableHeaderNode);
		var headerWidth = this.tableHeaderNode.offsetWidth;
		this.listHeaderNode.appendChild(this.tableHeaderNode);
		dojo.destroy(div);
		return Math.max(headerWidth,bodyWidth)+24; //加上 24 px 是为了防止文字换行
	},
	
	// 使结点获得焦点，并高亮显示
	_focusOptionNode: function(/*DomNode */ node) {
		if (this._highlighted == node)
			return;
		this._blurOptionNode();
		this._highlighted = node;
		dojo.addClass(this._highlighted, "u-comobobox-item-hover");//这个class写错了，暂时将错就错。。。
		dijit.scrollIntoView(this._highlighted);	
	},
	_highlightNext: function() {
		if (!this._highlighted) {
			this._focusOptionNode(this.tableBodyNode.rows[0]);
		} else if (this._highlighted.nextSibling) {
			this._focusOptionNode(this._highlighted.nextSibling);
		}
	},
	_highlightPrev: function() {
		if (!this._highlighted) {
			this._focusOptionNode(this.tableBodyNode.rows[0]);
		} else if (this._highlighted.previousSibling) {
			this._focusOptionNode(this._highlighted.previousSibling);
		}
	},
	_blurOptionNode: function() {
		if (this._highlighted) {
			dojo.removeClass(this._highlighted, "u-comobobox-item-hover");
			this._highlighted = null;
		}
	},
	
	// inner event handler
	_onMouseDown: function(evt) {
		var t = evt.target || evt.srcElement;
		var isItem = true;
		while (!t.item) {
			t = t.parentNode;
			if (t === this.listNode) {
				isItem = false;
				break;
			}
		}
		isItem && this._onSelect(evt, t);
		this._inmousedown = true;
	},
	
	_onClick: function(evt) {
		var t = evt.target || evt.srcElement;
		var isItem = true;
		while (!t.item) {
			t = t.parentNode;
			if (t === this.listNode) {
				isItem = false;
				break;
			}
		}
		isItem && this._onSelect(evt, t);
	},
	_onSelect: function(evt, target) {
		// override by list|table|multi
	},
	// 鼠标移入
	_onMouseOver: function(evt) {
		var t = evt.target;
		while (t && !t.item) {
			t = t.parentNode;
		}
		if (!t) return;
		try {
			this._focusOptionNode(t);
		} catch (e) {}
	},
	// 鼠标移出
	_onMouseOut: function(evt) {
		this._blurOptionNode();
	},
	_handKeyUp: function(evt) {
		// 被autocompleter调用，似乎没必要
	},
	// when this popup is showing, handle onkeydown evt(from the inputNode of the widget)
	_handleKeyDown: function(evt) {
		// override by list|table|multi
	},
	_onBlur: function(evt){
		this.widget._onBlur(evt,true);
	}
});