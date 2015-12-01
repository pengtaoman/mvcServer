dojo.provide("unieap.tdextend.layout.crm_TabContainer_middle");

dojo.require("unieap.layout.TabController");
dojo.require("unieap.layout.Container");
dojo.require("dijit._Templated");

dojo.declare("unieap.tdextend.layout.crm_TabContainer_middle", [unieap.layout.TabContainer], {
    
    templateString: "<div class='tabContainer'>" +
						"<div dojoAttachPoint='tabNest' class=\"tabContainer-nest\">" +
    					"<div dojoAttachPoint='tablistContainer' class='tab-scrolling-container'>"+
    						  "<div class='tab-scrolling' dojoAttachPoint='scrollingNode'>"+
    						    "<div style='float:left' dojoAttachPoint='fixbutton'></div>"+
		"<div dojoAttachPoint='tablistNode'></div>"+
							"</div>"+
						"</div>" +
    					"<div dojoAttachPoint='tablistSpacer' class='tabSpacer' style='dispaly:none;'></div>" +
    					"<div class='tabPaneWrapper'  dojoAttachPoint='containerNode' style='overflow:hidden;'></div>" +
						"</div>" +
    				"</div>"
});

