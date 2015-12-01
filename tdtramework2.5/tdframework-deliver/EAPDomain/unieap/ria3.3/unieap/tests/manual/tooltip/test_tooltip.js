function showTooltipInner(){
   var inner = "<table  vlign='center' ><tr>";
   inner += "<td align='center'><span>事先写好内容的提示框</span><img src='find.gif'></td></tr></table>"
	unieap.showTooltip({inner:inner,autoClose:true},showInner.domNode)
}
function showTooltipDom(){
	var inner  = document.createElement("div");
	inner.innerHTML = "预先定义Dom对象";
	unieap.showTooltip({inner:inner,autoClose:true},showInnerDom.domNode)

}
function showTooltipUrl(){
	var path ="content.txt"
	unieap.showTooltip({url:path,autoClose:true},showUrl.domNode)
}

function autoClose(){
   var inner = "<table  vlign='center' ><tr>";
   inner += "<td align='center'><span>提示框不会自动消失</span><img src='find.gif'></td></tr></table>"
	unieap.showTooltip(inner,aotoclose.domNode,['above','below','after'])
}
function hideTooltip(){
	unieap.hideTooltip(aotoclose.domNode)
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