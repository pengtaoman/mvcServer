/**
 * 
 */
dojo.require("unieap.form.ComboBox");
dojo.require("unieap.layout.TitlePane");

function getselection() {
	alert(unieap.byId("multiCombo").getValue());
//	unieap.debug(unieap.byId("multiCombo").getValue());
}
function openCombo() {
	setTimeout(function(){
		unieap.byId("multiCombo").getPopup().open();
	}, 0);
	
}
// html select end
var city = new unieap.ds.DataStore('city_store', [
	{CODEVALUE: 1, CODENAME: '宁波', filter: 11},
	{CODEVALUE: 2, CODENAME: '宁海', filter:11},
	{CODEVALUE: 4, CODENAME: '沈阳', filter: 12},
	{CODEVALUE: 15, CODENAME: '大连', filter: 12},
	{CODEVALUE: 16, CODENAME: '金州', filter: 12}
]);
var province = new unieap.ds.DataStore("province_store", [
	{CODEVALUE: 11, CODENAME: "浙江"},
	{CODEVALUE: 12, CODENAME: "辽宁"}
]);
var search = new unieap.ds.DataStore('search_store', [
	{CODEVALUE: 'baidu', CODENAME: '百度'},
	{CODEVALUE: 'google', CODENAME: '谷歌'}
]);

dataCenter.addDataStore(city);
dataCenter.addDataStore(province);
dataCenter.addDataStore(search);

dojo.addOnLoad(function(){
	var cwd = unieap.byId("combo_withDialog")
	var dialog = new unieap.dialog.Dialog({
		inner: "<div dojoType='unieap.form.ComboBox' dataProvider='{store:\"city_store\"}'></div>",
		title: "Hello World!"
	});
	dojo.connect(cwd, "onClick", function() {
		
		setTimeout(function() {
			dialog.show();
			dojo.parser.parse(dialog.domNode);
		},1000);
		
	});
//	var city = unieap.byId("combo1");
//	city.getDataProvider().getItems("宁", true);
//	dojo.connect(unieap.byId("combo1"), "onClick", function() {
//		alert("combo1 clicked");
//	}); 
//	dojo.connect(unieap.byId("combo1"), "onIconClick", function() {
//		alert("combo1 icon clicked");
//	});
})

function myfilter(item) {
	return item.CODEVALUE<10;
}
function comboChange() {
	alert(unieap.byId("combo1").getValue());
}
function getValue() {
	alert(unieap.byId("combo1").getValue());
}
function setValue() {
	unieap.byId("combo1").setValue("abc123");
}
function changeCombo(){ 
	unieap.byId("combo1").setValue(1);
}
function getCurrentItems() {
	console.log(unieap.byId("c_combo").getDataProvider().getCurrentItems());
}
function getItems() {
	console.log(unieap.byId("c_combo").getDataProvider().getItems());
}
function customChange() {
	alert(document.getElementById("originCombo").value);
}
function myclick() {
	document.getElementById("originCombo").value = "saab";
//	var values = ["aaa", "bbb", "ccc"];
//	dojo.forEach(values, dojo.hitch(this, function(v) {
//		alert(v);
//	}));
}
function fn(item, widget){
	if (widget.getDecoder().code(item)==1) {
//		setTimeout(function() {
			widget.setValue("2,4,15,16");
//		}, 0);
		
	}
}
function setnull() {
	unieap.byId("nullvalueCombo").setValue(null);
}
function getnullvalue() {
	alert(unieap.byId("nullvalueCombo").getValue());
}
function toggleVisible() {
	var combo = unieap.byId("combo1");
	if ("visible"==dojo.style(combo.domNode, "visibility")) {
		combo.setVisible(false);
	} else {
		combo.setVisible(true);
	}
}
function addItem() {
	var combo = unieap.byId("combo1");
	combo.getDataProvider().addItem([{CODEVALUE:6,CODENAME:'鞍山'},{CODEVALUE:7,CODENAME:'瓦房店'}]);
	
}
function toggleReq() {
	var combo = unieap.byId("combo1");
	combo.setRequired(!combo.required);
}
function togReq4t() {
	var text = unieap.byId("text1");
	text.setRequired(!text.required);
}
function setTextValue() {
	var text = unieap.byId("text1");
	text.setValue("text value");
}
var tv = true;
function toggleTextVisible() {
	var text = unieap.byId("text1");
	tv = !tv
	text.setVisible(tv);
}
