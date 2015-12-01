

function showTooltipInner(evt){
	var inner="<b>我是一段HTML片段信息</b>"
	unieap.showTooltip({inner:inner,autoClose:true},unieap.byId("showInner").domNode)
}
function showTooltipDom(){
	var inner  = document.getElementById("info");
	unieap.showTooltip({inner:inner,autoClose:true},unieap.byId("showInnerDom").domNode)

}
function showTooltipUrl(){
	var appPath=document.getElementById("path").getAttribute("value");
	var path =appPath + "/pages/samples/integration/tooltip/content.txt"
	unieap.showTooltip({url:path,autoClose:true},unieap.byId("showUrl").domNode)
}

function autoCloseTooltip(){
   var inner = "<table  vlign='center' ><tr>";
   inner += "<td align='center'><span>提示框不会自动消失</span></td></tr></table>"
	unieap.showTooltip(inner,unieap.byId("autoClose").domNode,['above','below','after'])
}
function hideTooltip(){
	unieap.hideTooltip(unieap.byId("autoClose").domNode)
}

function showSun(event){
  var inner = "太阳";
  unieap.showTooltip({inner:inner,autoClose:true},event);
}
function showMerglobe(event){
  var inner = "水星";
  unieap.showTooltip({inner:inner,autoClose:true},event);
}
function showVenglobe(event){
  var inner = "金星";
  unieap.showTooltip({inner:inner,autoClose:true},event);
}
function showEarglobe(event){
  var inner = "地球";
  unieap.showTooltip({inner:inner,autoClose:true},event);
}
function showMarglobe(event){
  var inner = "火星";
  unieap.showTooltip({inner:inner,autoClose:true},event);
}
function showJupglobe(event){
  var inner = "木星";
  unieap.showTooltip({inner:inner,autoClose:true},event);
}
function showSatglobe(event){
  var inner = "土星";
  unieap.showTooltip({inner:inner,autoClose:true},event);
}
function showUraglobe(event){
  var inner = "天王星";
  unieap.showTooltip({inner:inner,autoClose:true},event);
}
function showNepglobe(event){
  var inner = "海王星";
  unieap.showTooltip({inner:inner,autoClose:true},event);
}
function showPluglobe(event){
  var inner = "冥王星";
  unieap.showTooltip({inner:inner,autoClose:true},event);
}

