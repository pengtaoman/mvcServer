dojo.provide("unieap.menu.PopupMenuBarItem");
dojo.require("unieap.menu.MenuBarItem");
dojo.declare("unieap.menu.PopupMenuBarItem", [unieap.menu.MenuBarItem], {

	// 对HTML中包含以下语句进行解析
	// <div dojoType="dijit.PopupMenuItem">
	//		<span>pick me</span>
	//		<popup> ... </popup>
	// </div>
	_fillContent: function(){
		if(this.srcNodeRef){
			var nodes = dojo.query("*", this.srcNodeRef);
			
			if(nodes && nodes[0] && nodes[0].tagName=="SPAN"){
				unieap.menu.PopupMenuItem.superclass._fillContent.call(this, nodes[0]);
			}
			this.dropDownContainer = this.srcNodeRef;
		}
	},

	startup: function(){
		this._orient = this.isLeftToRight() ? {BL: 'TL'} : {BR: 'TR'};
		if(this._started){ return; }
		this.inherited(arguments);

		// we didn't copy the dropdown widget from the this.srcNodeRef, so it's in no-man's
		// land now.  move it to dojo.doc.body.
		if(!this.popup){
			var node = dojo.query("[widgetId]", this.dropDownContainer)[0];
			this.popup = dijit.byNode(node);
		}
		dojo.body().appendChild(this.popup.domNode);
		this.popup.startup();

		this.popup.domNode.style.display="none";
		if(this.arrowWrapper){
			dojo.style(this.arrowWrapper, "visibility", "");
		}
		dijit.setWaiState(this.containerNode, "haspopup", "true");
	},
	
	_onMouseOver: function(evt){
		this.inherited(arguments);
		this.getParent().autoPopup && this._startPopupTimer(evt);
	},
	
	_startPopupTimer: function(evt) {
		if(!this.disabled && !this.hover_timer){
			this.hover_timer = setTimeout(dojo.hitch(this, "_openPopup"), this.popupDelay);
		}
	},
	
	_stopPopupTimer: function() {
		if(this.hover_timer){
			clearTimeout(this.hover_timer);
			this.hover_timer = null;
		}
	},
	
	_openPopup: function(){
		this._stopPopupTimer();	
		var popup = this.popup;
		
		popup.startup && popup.startup();
		dijit.popup.open({
			parent: this,
			popup: popup,
			around: this.domNode
		});
			
		popup.parentMenu=this;
		var children = popup.getChildren();
		dojo.forEach(children, function(child) {
			child._toggleClass && child._toggleClass(false);
		}, this);
		this._onBlur = function(){
			this._toggleClass(false);
			this._closePopup();
		}
	},
	
	_closePopup: function() {
		this._stopPopupTimer();
		dijit.popup.close(this.popup);
	}
});
