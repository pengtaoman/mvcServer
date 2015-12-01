BusCard.define('/buscardapp/rela/js/installTimeHandler.js', function(_buscard, cardParam) {
	var Me = this;
	if(!window.installTimePopupIndx){
		window.installTimePopupIndx = 1;
	}
	var MessageBox = dojo.require("orderaccept.common.dialog.MessageBox");
	var util = dojo.require("orderaccept.prodofferaccept.util");
	var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
	//服务信息widget
	var serviceCardWidget = util.DomHelper.getParentWidget(Me.$("installTimeBtn"),
									"orderaccept.prodofferaccept.widget.servicecard.ServiceCardWidget");
	var mainProdOfferWidget = dojo.getObject("prodOfferAcceptLoader.mainProdOfferWidget");
	var customerData = $ac$.requestParam.customerData;
	if(!!mainProdOfferWidget){
		var prodBasicTR = dojo.query("tr[uniqueId="+serviceCardWidget.cardParam.uniqueId+"]",mainProdOfferWidget.domNode)[0];
		if(!!prodBasicTR){
			var param = "&ServiceKind="+prodBasicTR.getAttribute("serviceKind")+"&apply_event="+util.ACTION_CD_CONST.PRODUCT_INSTALL+"&infoId=1002";
			var result = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getCityBusinessParamValue" + param);
			if (!!result && result == "1") {// 开关打开
				Me.$("installTimeBtn").className = "formButtonL";
				dojo.style(Me.$("installTimeBtn"),"cursor","pointer");
				Me.$("timeName")?Me.$("timeName").disabled=true:null; 
				dojo.connect(Me.$("installTimeBtn"),"onclick",function(){
					var addrId = Me.$("addrId");
					var bookDate = Me.$("bookDate");
					if(!addrId || !addrId.rvalue){
						MessageBox.alert({
							title:"\u63d0\u793a\u4fe1\u606f",
							message:"\u8bf7\u5148\u9009\u62e9\u6807\u51c6\u5730\u5740"
						});
						return false;
					}		
					if(!bookDate || !bookDate.value){
						MessageBox.alert({
							title:"\u63d0\u793a\u4fe1\u606f",
							message:"\u8bf7\u5148\u9009\u62e9\u9884\u7ea6\u88c5\u673a\u65f6\u95f4"
						});
						return false;
					}		
							
					var requestXML = "<ADDR_ID>"+addrId.rvalue+"</ADDR_ID><PRODUCT_ID>"+Me.productId+"</PRODUCT_ID>"+
									  "<CUST_TYPE>"+customerData.custType+"</CUST_TYPE><CUST_BRAND>"+customerData.brandInd+"</CUST_BRAND>"+
									  "<BOOK_DATE>"+bookDate.value+"</BOOK_DATE>";
					var response = BusCard.$remote("iomServiceBO").doIntallTimeQueryHandle(requestXML);
					if(response.IS_SUCCESS == "T"){
						var count = 1;
						var htmlStr = "<div id=\"installTimePopup+"+window.installTimePopupIndx+"\" class=\"buscard-root\" style=\"width: 400px; height: auto;\">\
											<div class=\"buscard-legend\">\
												<span class=\"buscard-legend-img\"></span>\
												<span class=\"buscard-legend-text\">\u9884\u7ea6\u88c5\u673a\u65f6\u95f4\u6bb5</span>\
											</div>\
											<div class=\"buscard-content\">\
												<div class=\"buscard-container\">\
													<div class=\"buscard-subgroup\">\
														<div class=\"buscard-row\">";
						dojo.forEach(response.SLA_INFO,function(slaInfo){
							htmlStr += "<div class=\"buscard-item-label\" style=\"width:6%;\"> \
											<input type='radio' name='bookRadio' \
												 timeName='"+slaInfo.TIME_NAME+"' \
												 bookDate='"+slaInfo.BOOK_DATE+"' \
												 timeNameId='"+slaInfo.TIME_NAME_ID+"' /> \
										</div>\
										<div class=\"buscard-item-el\" style=\"width:24%;\">"+slaInfo.TIME_NAME+"</div>";	
							if(count%3==0 && !!response.SLA_INFO[count+1]){
								htmlStr += "</div><div class=\"buscard-row\">";
							}
							count++;
						});
						htmlStr +="</div></div></div></div></div>";
						unieap.showTooltip({inner:htmlStr,autoClose:true},Me.$("timeName"),['below','above','before']);
						var installTimePopup = dojo.byId("installTimePopup+"+window.installTimePopupIndx);
						if(!!installTimePopup){
							var bookRadios = dojo.query("[name=bookRadio]",installTimePopup);
							dojo.forEach(bookRadios,function(bookRadio){
								bookRadio.onclick = function(){
									!!Me.$("bookDate")?Me.$("bookDate").value=this.getAttribute("bookDate"):null; 
									!!Me.$("timeName")?Me.$("timeName").value=this.getAttribute("timeName"):null; 
									!!Me.$("installTimeSegmentId")? Me.$("installTimeSegmentId").value=this.getAttribute("timeNameId"):null;
									!!Me.$("bookDate")?Me.$("bookDate").disabled=true:null; 
									!!Me.$("timeName")?Me.$("timeName").disabled=true:null;
									unieap.hideTooltip(Me.$("timeName"));
								
								}
							});
						}
						window.installTimePopupIndx++
					}else if(response.IS_SUCCESS == "F"){						
						MessageBox.alert({
							title:"\u63d0\u793a\u4fe1\u606f",
							message:response.ERROR_DESC
						});
						return false;
					}
				});
			}else{		
				if(!!Me.$("installTimeBtn")){
					dojo.style(Me.$("installTimeBtn"),"display","none");
				}
				if(!!Me.$("label_installTimeBtn")){
					dojo.style(Me.$("label_installTimeBtn"),"display","none");
				}	
			}
		}
	}
});	
