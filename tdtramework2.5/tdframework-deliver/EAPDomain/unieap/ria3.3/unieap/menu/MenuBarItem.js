dojo.require("unieap.menu.MenuItem");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Contained");
dojo.provide("unieap.menu.MenuBarItem");
dojo.declare("unieap.menu.MenuBarItem", [dijit._Widget, dijit._Templated, dijit._Contained], {
	
	templateString: 
		"<div class='menuBarItem' dojoAttachPoint='containerNode' >" +
		"</div>",
		
	attributeMap: dojo.delegate(dijit._Widget.prototype.attributeMap, {
		label: { node: "containerNode", type: "innerHTML" }
	}),
	
	baseClass: "menuBarItem",
	
	/**
	 * @summary:
	 * 		指定菜单项名称
	 * @type:
	 * 		{string}
	 * @default：
	 * 		''
	 * @example:
	 * |<div dojoType="unieap.menu.MenuBar">
	 * |		<div dojoType="unieap.menu.MenuBarItem" label="中国"></div>
	 * |		<div dojoType="unieap.menu.MenuBarItem" label="日本"></div>
	 * |</div>
	 */	
	label: '',

	/**
	 * @summary:
	 * 		设置是否禁用菜单项
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		false
	 * @example:
	 *|<div dojoType="unieap.menu.MenuBar">
	 *|		<div dojoType="unieap.menu.MenuBarItem" label="中国"></div>
	 *|		<div dojoType="unieap.menu.MenuBarItem" label="日本" disabled="true"></div>
	 *|</div>
	 */
	disabled: false,


	postCreate: function(){
		this.inherited(arguments);
		var label = this.id+"_text";
		dojo.attr(this.containerNode, "id", label);
		dojo.setSelectable(this.domNode, false);
		this.disabled&&this.setDisabled(this.disabled);
		this._conn();
	},
	
	_conn:function(){
		this.connect(this.containerNode,'onmouseover',this._onMouseOver);
		this.connect(this.containerNode,'onmouseout',this._onMouseOut);
		this.connect(this.containerNode,'onclick',this._onClick);
	},
	
	_onMouseOut: function(evt){
		if( this.getParent().focusChild == this) return;
		this._toggleClass(false);
		this._closePopup && this._closePopup();
	},
	
	_onMouseOver: function(evt){
		var focusChild = this.getParent().focusChild;
		if(focusChild != this){
			if(focusChild){
				focusChild._toggleClass(false);
				focusChild._closePopup && focusChild._closePopup();
			}
			this.getParent().focusChild = this;
		}
		dijit.focus(this.containerNode);
		
		!this.disabled && this._toggleClass(true);
	},

	_onClick: function(evt){
		if(this.disabled) return;
		this.getParent().autoPopup = true;
			this._startPopupTimer && this._startPopupTimer(evt);
		if(false == this.onClick(this.label, evt)){
			return;
		}
		dojo.stopEvent(evt);
	},

	/**
	 * @summary:
	 * 		点击菜单项时触发
	 * @param：
	 * 		{string} label
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |<script type="javascript/text">
	 * |	function fn(label,evt) {
	 * |		alert('您点击了'+label);
	 * |	}
	 * |</script>
	 * |<div dojoType="unieap.menu.MenuBar">
	 * |		<div dojoType="unieap.menu.MenuBarItem" label="中国" onClick="fn"></div>
	 * |		<div dojoType="unieap.menu.MenuBarItem" label="日本" disabled="true"></div>
	 * |</div>
	 */
	onClick: function(label, /*Event*/ evt){
		return true;
	},

	focus: function(){
		this._toggleClass(true);
		dijit.focus(this.domNode);
		
	},
	
	_toggleClass: function(isHover) {
		if (isHover) {
			dojo.addClass(this.domNode, 'menuBarItemHover');
		} else {
			dojo.removeClass(this.domNode, 'menuBarItemHover');
		}
	},

	/**
	 * @summary:
	 * 		设置菜单项是否可用
	 * @param：
	 * 		{boolean} value
	 * @example:
	 * |    var disItem=new unieap.menu.MenuBarItem({label:'法国'});
	 * |	disItem.setDisabled(true);
	 */
	setDisabled: function(/*Boolean*/ value){
		if(value){
			this.domNode && dojo.addClass(this.domNode, 'u-menu-itemDisabled');
		}
		else{
			this.domNode && dojo.removeClass(this.domNode, 'u-menu-itemDisabled');
		}
	}
	
});