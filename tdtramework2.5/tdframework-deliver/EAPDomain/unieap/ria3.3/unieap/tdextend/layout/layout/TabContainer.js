dojo.provide("unieap.tdextend.layout.TabContainer");
dojo.require("unieap.form.DropDownButton_crm_extend");
dojo.require("unieap.form.FieldSet-crm");
dojo.require("unieap.layout.TabController");
dojo.require("unieap.layout.Container");
dojo.require("dijit._Templated");
//console.log("TDLOG: unieap.tdextend.layout.TabContainer's contextPath-" + getcontext());
dojo.declare("unieap.tdextend.layout.TabContainer", [unieap.layout.TabContainer,dijit._Widget, dijit._Templated ], {
    templateString: dojo.cache("TabContainer_template", getcontext()+"/unieap/ria3.3/unieap/tdextend/layout/TabContainer_template.html"),
    widgetsInTemplate: true   

});
