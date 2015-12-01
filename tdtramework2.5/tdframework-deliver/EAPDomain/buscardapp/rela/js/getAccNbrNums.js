BusCard.define('/buscardapp/rela/js/getAccNbrNums.js',function(_buscard,cardParam){ 
var Me = this;
var a = arguments[0];
var b = arguments[1];
var GetAccNbrNums = function(){	
}
GetAccNbrNums.prototype = {
	_fusionNumsList : [],
	oldAccNbrData : [],
	getInnerHtml : function(){
		var Me = this;	
		var tpParam = {};
		var data = BusCard.$remote("prodInstCommFacadeBO").getAccNbrInstByProdInstId(b.userId);
		Me.oldAccNbrData = data;
		if (data && data.length != 0) {
			BusCard.util.each(data, function(item) {
				Me._fusionNumsList.push({
					userId : item.prodInstId,
					productId:item.productId,
					serviceId : item.accNbr
				});
			});
			tpParam.fusionNumsList = Me._fusionNumsList;
		};
		
		var tp = "<div id='oldAccNbrDiv'>\
	              <tp:for ds='fusionNumsList'>\
	                <input type='checkbox' id='#{userId}' value='#{userId}' productId='#{productId}' serviceId='#{serviceId}' name='oldAccNbrInfo'/>\
	               <span>#{serviceId}</span>\
	             </tp:for>\
	            </div>";
	     var innerStr = BusCard.Template.create(tp).apply(tpParam);     
	     return innerStr;
	},

	initCheckBox : function(flag){
		var checkboxList = document.getElementsByTagName("input");
		BusCard.util.each(checkboxList, function(dom) {
			if (dom.type && dom.type.toUpperCase() == 'CHECKBOX') {
					dom.checked = true;	
					dom.disabled = true;		
			}
		})
	},
	
	collectData : function(){
		var data = [];
		var checkboxList = dojo.query("[name=oldAccNbrInfo]",dojo.query('#oldAccNbrDiv',Me.dom)[0])
		BusCard.util.each(checkboxList, function(dom) {
			if (dom.type && dom.type.toUpperCase() == 'CHECKBOX' && dom.checked) {
				var obj = {};
				obj.userId = dom.value;
				obj.prodInstId = dom.value;
				obj.serviceId = dom.serviceId;
				obj.productId = dom.productId;
				data.push(obj);
			}
		})
		return data;
	}
};

var getAccNbrNums = new GetAccNbrNums();
BusCard.Namespace.create("ordermgr.accept.accNbrHandler");
ordermgr.accept.accNbrHandler.getAccNbrNums = getAccNbrNums;
});
