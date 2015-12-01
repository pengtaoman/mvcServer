dojo.provide("unieap.menu.MenuBar");
dojo.require("unieap.menu.MenuBarItem");
dojo.require("unieap.menu.PopupMenuBarItem");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._KeyNavContainer"); 
dojo.declare("unieap.menu.MenuBar",[dijit._Widget, dijit._Templated, dijit._KeyNavContainer], {
	/**
	 * @declaredClass:
	 * 		unieap.menu.MenuBar
	 * @summary:
	 * 		横向菜单控件。
	 * @example:
	 * |<div dojoType="unieap.menu.MenuBar">
	 * |	<div dojoType="unieap.menu.MenuItem" disabled="true">第一个</div>
	 * |	<div dojoType="unieap.menu.PopupMenuBarItem" label="第二个">
	 * |		 <div dojoType="unieap.menu.Menu">
	 * |			<div dojoType="unieap.menu.MenuItem">子项1</div>
	 * |			<div dojoType="unieap.menu.MenuItem" disabled="true">子项2</div>
	 * |			<div dojoType="unieap.menu.MenuSeparator"></div>  
	 * |			<div dojoType="unieap.menu.MenuItem">子项3</div>
	 * |		 </div>
	 * |	</div>
	 * |	<div dojoType="unieap.menu.MenuBarItem">第三个</div>
	 * |</div>
	 */

	templateString: 
		"<div class='menuBar' dojoAttachPoint='containerNode'>" +
		"</div>",

	focusChild: null,
	
	/**
	 * @summary:
	 * 		指定menuBar是否默认弹出
	 * @type：
	 * 		{boolean}
	 * @default:
     * 		false
     *  @example:
     * |<div dojoType="unieap.menu.MenuBar" autoPopup=true>
	 * |	<div dojoType="unieap.menu.MenuBarItem" label="项目一"></div>
	 * |	<div dojoType="unieap.menu.PopupMenuBarItem" label="项目二">
	 * |		<div dojoType="unieap.menu.Menu" isShowIcon=false menuWidth=100 menuHeight=30>
	 * |			<div dojoType="unieap.menu.MenuItem">子项目一</div>
	 * |			<div dojoType="unieap.menu.MenuItem">子项目二</div>
	 * |			<div dojoType="unieap.menu.MenuItem">子项目三</div>
	 * |		</div>
	 * |	</div>
	 * |</div>
	 */
	autoPopup: false,
	
	postCreate: function(){
		
		dojo.forEach(this.getChildren(), function(child){ child.startup(); });
	}
});