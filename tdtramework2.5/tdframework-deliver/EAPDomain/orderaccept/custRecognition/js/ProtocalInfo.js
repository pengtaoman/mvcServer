var init = function(contractInfoColl, regionCodeColl) {
	var contractInfoList = contractInfoColl.list || [];
	var regionCodeList = regionCodeColl.list || [];
	if (!contractInfoList.length) { return; }
	var trTpl = "<tr><td>&nbsp;</td><td class='partContractId'>{partContractId}</td>\
 		<td><span class='partContractName'>{partContractName}</span></td>\
		<td><span class='partCorpCode'>{partCorpCode}</span></td>\
		<td><span  class='partName'>{partName}</span></td>\
		<td><span  class='partContrStartTime'>{partContrStartTime}</span></td>\
		<td><span class='partContrEndTime'>{partContrEndTime}</span></td>\
		<td><a class='oper-link' href = '#'>\u8f6c\u8ba2\u5355</a></td>\
		</tr>";
	var domFragment = dojo._toDom(dojo.map(contractInfoList, function(constractInfoVO) {
		        return dojo.replace(trTpl, constractInfoVO);
	        }).join(""));
	protocolInfoListID.appendChild(domFragment);
	dojo.forEach(dojo.map(regionCodeList, function(regionVO) {
		                var op = document.createElement("option");
		                op.value = regionVO.id || regionVO.ids;
		                op.text = regionVO.name;
		                return op;
	                }), function(node) {
		        dojo.byId("belongCodeSelect").options.add(node);
	        });
	bindEventListener();
	
};
/**
 * 为每个链接绑定点击事件
 * 
 * @param {} node
 */
var bindEachProtocal = function(node) {
	dojo.connect(node, "onclick", function(event) {
        event.preventDefault();
		var contractId = dojo.query(".partContractId", this.parentNode.parentNode)[0].innerHTML;
		var belongCode = dojo.byId("belongCodeSelect").value;
		dojo.byId("protocolAcceptInfoVO").value = "";
		param = "&contractId=" + contractId + "&belongCode=" + belongCode + "&cityCode=" + dojo.byId("cityCode").value + "&custId=" + dojo.byId("custId").value; 
		var path = dojo.byId("webpath").value + "/prodOfferSaleAction.do?method=getProtocolDetail" + param;
		var htmlStr = "<iframe id='ifraProtocalDetail' src='about:blank' onload=\"setFrameSrc('ifraProtocalDetail','"+path+"')\" frameborder='0' scrolling='no' width='400px' height='140px' />";
		unieap.showTooltip({inner:htmlStr,autoClose:true},node,['above','below','before']);
	});
};

/**
  * 延时加载指定iframe的src。解决浏览器进度条一直loading问题（IE BUG）
  * 该方法通过iframe的onload事件触发（能够避免该方法被调用时，iframe还没有被加载到页面导致找不到iframe的问题）
  */
function setFrameSrc(frameName,path){
	if(dojo.byId(frameName).src != "about:blank"){//如果已经加载过SRC，则清空onload方法
		dojo.byId(frameName).onload = function(){};
		return;
	}
	path = path.replace(/\"/g,"'");//双引号替换为单引号
	var runStr = "dojo.byId('"+frameName+"').src = \"" + path + "\";";
	window.setTimeout(runStr,1);//延时加载iframe内容，解决浏览器进度条一直loading问题（IE BUG）
}

// 为所有链接绑定事件
var bindEventListener = function() {
var objs = dojo.query(".oper-link", document);
	dojo.forEach(objs, function(node) {
		return bindEachProtocal(node);
	});
	
};
