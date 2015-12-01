BusCard.define('/buscardapp/rela/js/common.js', function(_buscard, cardParam) {
	        // export function or class to global context
	        (function() {
		        var _globalObject = this; 
		        
		        /**
				 * 标准地址接口
				 * 
				 * @param {$} 按id获取页面dom节点
				 * @param {$n} 按name获取页面dom节点
				 * @param {service} 
				 * @param {cityCode} 地市编号
				 */
				var StandardAddInterface = function(oParameter){
					var Me=this;
					Me.service=oParameter["service"];
					Me.$=oParameter["$"];
					Me.$n=oParameter["$n"];
					Me.cityCode=oParameter["cityCode"];
					Me.uniqueId = oParameter["uniqueId"];
					Me.setAddrDetail = function(oParamter){
						var addrDetail = oParamter["addrDetail"];
						var addrId = oParamter["addrId"];
						for(var i = 0, len = document.getElementsByName("addrDetail").length; i < len; i++){
							//if(document.getElementsByName("addrDetail")[i].value == ""){
								document.getElementsByName("addrDetail")[i].value = addrDetail;
							//}
							//if(document.getElementsByName("addrId")[i].value == "" || document.getElementsByName("addrId")[i].value == "1"){
								document.getElementsByName("addrId")[i].value = addrDetail;
								document.getElementsByName("addrId")[i].rvalue = addrId;
							//}
						}
						Me.$("addrDetail").value = addrDetail;
						Me.$("addrId").value = addrDetail;
						Me.$("addrId").rvalue = addrId;
						Me.$("addrDetail").focus();
						//设置除标准地址以外的信息
						Me.setAttrValueMethod(oParamter);
					};
					
					/**
					 * 设置标准地址以为的其它信息
					 */
					Me.setAttrValueMethod = function(obj){
						var innetMethodAttr = obj["innetMethodId"];
						//返回交换局id
						var switchno = obj["switchNo"];
						if(!!innetMethodAttr&&innetMethodAttr!=""){
							if(!!window.prodOfferAcceptLoader){
								if(prodOfferAcceptLoader&&prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance)
								{
									var targetAttr =prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance.$('100542');
									if(!!targetAttr){
										targetAttr.value = innetMethodAttr;
									}
								}
							
							}else
							{//接入方式100542//入网方式100539为只读
							     if($("prodAttrCardContainer"))
							     {
							       BusCard.each(BusCard.query("[controlFieldName]",$("prodAttrCardContainer")),function(node){
										if(node.id=='100542'){
										  node.value=innetMethodAttr;
										}
									});
								 }
							
							}
						}
						
						if(!!switchno&&switchno!="")
						{
							
							if(!!window.prodOfferAcceptLoader){
								if(prodOfferAcceptLoader&&prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance)
								   {
									  var targetSwitchAttr =prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance.$('60056');
										if(!!targetSwitchAttr)
										{
											targetSwitchAttr.value = switchno;
										}
								   }
							  }else{
							     if($("prodAttrCardContainer")){
							      BusCard.each(BusCard.query("[controlFieldName]",$("prodAttrCardContainer")),function(node){
										if(node.id=='60056'){
										  node.value=switchno;
										}
									});
								 }else if(!!Me.$("switchNo")){//预订单受理记录交换局ID
								 	Me.$("switchNo").value = switchno;
								 }
							   }
						}
					};
					//Me.initDoc = xmlCore.initDoc;
					//Me.getDoc = xmlCore.getDoc;
				};
				
				var StandardAddMultipleInterface = function(oParameter){
					var Me=this;
					Me.service=oParameter["service"];
					Me.$=oParameter["$"];
					Me.$n=oParameter["$n"];
					Me.cityCode=oParameter["cityCode"];
					Me.uniqueId = oParameter["uniqueId"];
					Me.setAddrDetail = function(oParamter){
	        			if(!!window.prodOfferAcceptLoader){
	        				Me.setAddrDetail_1(oParamter);
	        			}else{
							Me.setAddrDetail_2(oParamter);
	        			}
	        			//设置除标准地址以外的信息
						Me.setAttrValueMethod(oParamter);
					};
					
					/**
					 * 设置特殊的资源确认地址
					 */
					Me.setAddrDetail_1 = function(oParamter){
						var addrDetail = oParamter["addrDetail"];
						var addrId = oParamter["addrId"];
        				var serviceCardWidgetMap = prodOfferAcceptLoader.serviceCardWidgetMap;
		        		for(var key in serviceCardWidgetMap){
		        			if (!serviceCardWidgetMap.hasOwnProperty(key)) {
						        continue;
					       	}
					       	if(!!$ac$.get("_switch8090_")&&$ac$.get("_switch8090_")==1){
					       		if(serviceCardWidgetMap[key].cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_NEW
					       		|| serviceCardWidgetMap[key].cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PRODUCT_CHANGE_ACCEPT
					       		|| serviceCardWidgetMap[key].cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_QUIT){
						       		//只处理不需要资源确认的地址
							       	if(serviceCardWidgetMap[key].busCardInstance.needResourceComfirm === false){
							       		if(serviceCardWidgetMap[key].busCardInstance.$('addrId')){
					        				//if(serviceCardWidgetMap[key].busCardInstance.$('addrId').value == ""){
					        					serviceCardWidgetMap[key].busCardInstance.$('addrId').value = addrDetail;
					        					serviceCardWidgetMap[key].busCardInstance.$('addrId').rvalue = addrId;
					        				//}
					        			}
					        			if(serviceCardWidgetMap[key].busCardInstance.$('addrDetail')){
					        				//if(serviceCardWidgetMap[key].busCardInstance.$('addrDetail').value == ""){
					        					serviceCardWidgetMap[key].busCardInstance.$('addrDetail').value = addrDetail;
					        				//}
					        			}
							       	}
					       		}
					       	}else{
					       		if(serviceCardWidgetMap[key].cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_NEW 
					       		|| serviceCardWidgetMap[key].cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PRODUCT_CHANGE_ACCEPT
					       		|| serviceCardWidgetMap[key].cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_QUIT){
						       		if(serviceCardWidgetMap[key].busCardInstance.$('addrId')){
				        				//if(serviceCardWidgetMap[key].busCardInstance.$('addrId').value == ""){
				        					serviceCardWidgetMap[key].busCardInstance.$('addrId').value = addrDetail;
				        					serviceCardWidgetMap[key].busCardInstance.$('addrId').rvalue = addrId;
				        				//}
				        			}
				        			if(serviceCardWidgetMap[key].busCardInstance.$('addrDetail')){
				        				//if(serviceCardWidgetMap[key].busCardInstance.$('addrDetail').value == ""){
				        					serviceCardWidgetMap[key].busCardInstance.$('addrDetail').value = addrDetail;
				        				//}
				        			}
					       		}
					       	}
					       	
		        		}
					
					};
					
					/**
					 * 设置业务资源的标准地址
					 */
					Me.setAddrDetail_2 = function(oParamter){
						var addrDetail = oParamter["addrDetail"];
						var addrId = oParamter["addrId"];
						for(var i = 0, len = document.getElementsByName("addrDetail").length; i < len; i++){
							//if(document.getElementsByName("addrDetail")[i].value == ""){
								document.getElementsByName("addrDetail")[i].value = addrDetail;
							//}
							//if(document.getElementsByName("addrId")[i].value == "" || document.getElementsByName("addrId")[i].value == "1"){
								document.getElementsByName("addrId")[i].value = addrDetail;
								document.getElementsByName("addrId")[i].rvalue = addrId;
							//}
						}
						if(Me.$("addrDetail")){
						   Me.$("addrDetail").value = addrDetail;
						}
						if(Me.$("addrId")){
							Me.$("addrId").value = addrDetail;
							Me.$("addrId").rvalue = addrId;
//						Me.$("addrDetail").focus();
						}
					};
				   /**
					 * 设置标准地址以为的其它信息
					 */
					Me.setAttrValueMethod = function(obj){
						var innetMethodAttr = obj["innetMethodId"];
						//返回交换局id
						var switchno = obj["switchNo"];
						if(!!innetMethodAttr&&innetMethodAttr!=""){
							if(!!window.prodOfferAcceptLoader){
								if(prodOfferAcceptLoader&&prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance)
								{
									var targetAttr =prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance.$('100542');
									if(!!targetAttr){
										targetAttr.value = innetMethodAttr;
									}
								}
							
							}else
							{//接入方式100542//入网方式100539为只读
							     if($("prodAttrCardContainer"))
							     {
							       BusCard.each(BusCard.query("[controlFieldName]",$("prodAttrCardContainer")),function(node){
										if(node.id=='100542'){
										  node.value=innetMethodAttr;
										}
									});
								 }
							
							}
						}
						
						if(!!switchno&&switchno!="")
						{
							
							if(!!window.prodOfferAcceptLoader){
								if(prodOfferAcceptLoader&&prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance)
								   {
									  var targetSwitchAttr =prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance.$('60056');
										if(!!targetSwitchAttr)
										{
											targetSwitchAttr.value = switchno;
										}
								   }
							  }else{
							     if($("prodAttrCardContainer")){
							      BusCard.each(BusCard.query("[controlFieldName]",$("prodAttrCardContainer")),function(node){
										if(node.id=='60056'){
										  node.value=switchno;
										}
									});
								 }else if(!!Me.$("switchNo")){//预订单受理记录交换局ID
								 	Me.$("switchNo").value = switchno;
								 }
							   }
						}
					};
				};
				
				
				/**
				 * 资源确认设置
				 */
				var ResourceConfirmInterface = function(oParameter){
					var Me = this;
					Me.setReturnValue =  function(oParamter){
						Me.setAddrDetail(oParamter);
						Me.setOtherAttribute(oParamter);
					};
					/**
					 * 设置标准地址
					 */
					Me.setAddrDetail = function(oParamter){
						var addrDetail = oParamter["addrDetail"];
						var addrId = oParamter["addrId"];
						var branchNo = oParamter["siteofficename"];
						//区分二次业务和综合订单受理
	        			if(!!window.prodOfferAcceptLoader){
	        				//综合订单受理
	        				var serviceCardWidgetMap = prodOfferAcceptLoader.serviceCardWidgetMap;
	        				if(!!$ac$.get("_switch8091_")&&$ac$.get("_switch8091_")==0){ 
	        					BusCard.each(oParamter.packageinfo||[],function(data){
				        			var uniqueId = data.uniqueid;
				        			var serviceWidgetObj = serviceCardWidgetMap["serviceCardWidget_"+uniqueId];
		        					if(serviceWidgetObj.busCardInstance.$('addrId')){
				        				//if(serviceWidgetObj.busCardInstance.$('addrId').value == ""){
				        					serviceWidgetObj.busCardInstance.$('addrId').value = addrDetail;
				        					serviceWidgetObj.busCardInstance.$('addrId').rvalue = addrId;
				        				//}
				        			}
				        			if(serviceWidgetObj.busCardInstance.$('addrDetail')){
				        				//if(serviceWidgetObj.busCardInstance.$('addrDetail').value == ""){
				        					serviceWidgetObj.busCardInstance.$('addrDetail').value = addrDetail;
				        				//}
				        			}
				        		});
	        				}else{
	        					for(var key in serviceCardWidgetMap){
				        			if (!serviceCardWidgetMap.hasOwnProperty(key)) {
								        continue;
							       	}
							       	if(serviceCardWidgetMap[key].cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_NEW 
							       	|| serviceCardWidgetMap[key].cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PRODUCT_CHANGE_ACCEPT){
					        			if(serviceCardWidgetMap[key].busCardInstance.needResourceComfirm === false){
								       		continue;
								       	}
					        			if(serviceCardWidgetMap[key].busCardInstance.$('addrId')){
					        				//if(serviceCardWidgetMap[key].busCardInstance.$('addrId').value == ""){
					        					serviceCardWidgetMap[key].busCardInstance.$('addrId').value = addrDetail;
					        					serviceCardWidgetMap[key].busCardInstance.$('addrId').rvalue = addrId;
					        				//}
					        			}
					        			if(serviceCardWidgetMap[key].busCardInstance.$('addrDetail')){
					        				//if(serviceCardWidgetMap[key].busCardInstance.$('addrDetail').value == ""){
					        					serviceCardWidgetMap[key].busCardInstance.$('addrDetail').value = addrDetail;
					        				//}
					        			}
							       	}
				        		}
	        				}
	        			}else{
	        				//二次业务
	        				var addrDetail = oParamter["addrDetail"];
						    var addrId = oParamter["addrId"];
						    if(oParameter["$"]('addrId')){
							   oParameter["$"]('addrId').value=addrDetail;
							   oParameter["$"]('addrId').rvalue=addrId;
						    }
						    if(_globalObject.$('addrDetail')){
						        _globalObject.$('addrDetail').value=addrDetail;
						    }
						    //交换局Id	
							if($("prodAttrCardContainer")){
							      BusCard.each(BusCard.query("[controlFieldName]",$("prodAttrCardContainer")),function(node){
									if(node.id=='60056'){
									  node.value=branchNo;
									}
								});
							}else if(!!_globalObject.$("switchNo")){//预订单受理记录交换局ID
								 _globalObject.$("switchNo").value = branchNo;
							}
						    
	        			}
					};
					
					/**
					 * 设置返回的属性信息
					 */
					Me.setOtherAttribute = function(oParamter){
						//区分二次业务和综合订单受理
						var prodOfferAcceptLoader = dojo.getObject("prodOfferAcceptLoader");
	        			if(!!prodOfferAcceptLoader){
	        				//综合订单受理
	        				var serviceCardWidgetMap = prodOfferAcceptLoader.serviceCardWidgetMap;
			        		BusCard.each(oParamter.packageinfo||[],function(data){
			        			var uniqueId = data.uniqueid;
			        			var serviceCardWidgetObj = serviceCardWidgetMap["serviceCardWidget_"+uniqueId];
			        			//设置属性值
			        			var attrBusCardInstance = serviceCardWidgetObj.attrCardWidget.busCardInstance;
			        			if(attrBusCardInstance.$('60056')){
			        				attrBusCardInstance.$('60056').value=oParamter["siteofficename"];
			        			}
			        			if(attrBusCardInstance.$('100542')){
			        				attrBusCardInstance.$('100542').value=data.connmodechoose;
			        				//触发刷新入网方式的事件
			        				BusCard.dispatchEvent(attrBusCardInstance.$('100542'),'change');
			        			}
			        		});
	        			}else{
	        				//二次业务
	        			    //交换局Id
			        			 BusCard.each(BusCard.query("[controlFieldName]",$("prodAttrCardContainer")),function(node){
										if(node.id=='60056'){
										  node.value=oParamter["siteofficename"];
										}
									});
							       BusCard.each(BusCard.query("[controlFieldName]",$("prodAttrCardContainer")),function(node){
										if(node.id=='100542'){
										  node.value=oParamter.packageinfo[0].connmodechoose;
										  //触发刷新入网方式的事件
			        				      BusCard.dispatchEvent(node,'change');
										}
									});
              			}
					};
				};
				
				/**
				 * 初始化标准地址的开关
				 */
				var GetSwitchForAddr = {
					initSwitch:function(cityCode){
						//判断是否调用资源确认的URL的开关,1-使用资源确认页面 0-不使用资源确认页面
						var param = "cityCode=" + cityCode;
						if(!$ac$.get("_switch8090_")){
							var switch8090 = executeRequest("prodOfferSaleAjaxAction", "getUseResourceConfirmURL", param);
	        				$ac$.set("_switch8090_",switch8090);
						}
						if(!!$ac$.get("_switch8090_")&&$ac$.get("_switch8090_")==1){
							if(!$ac$.get("_switch8091_")){
			        			//判断是否支持多产品调用资源确认,1-是 0-否
			        			var switch8091 = executeRequest("prodOfferSaleAjaxAction", "getMultipleProdResourceConfirm", param);
		        				$ac$.set("_switch8091_",switch8091);
							}
						}
					}
				};
				
				/**
				 * 公用函数对象，全部是静态调用
				 */
				var jsCommon={
					checkEasyPassword:function(password,onlyCheck){
						//获取到密码值,取其第一位,生成以其开头的3个简单密码 连续的:555555(第一位为5),递增的456789(第一位为4),
				      	//递减的654321(第一位为6),用密码值与其比较,如果密码值与其中一个相同,即为简单密码
				   		var value = password.value;
						var start = value.charAt(0);
						var a1 = parseInt(start);
						var a2 = parseInt(start);
						var b = start;	
						var c = start;
						var d = a1+''+a1+''+a1+''+a1+''+a1+''+a1;//6位密码一样
						var e = "";
						if(isNaN(start)){
							e = start+start+start+start+start+start;
						}
						for(var i=0;i<5;i++){
				    		if(a1 != 9){ 
				        		a1 = a1+1;
				        		b = b+''+a1;//6位密码递增
				    		}
				    		if(a2 != 0){ 
				        		a2 = a2-1;
				        		c = c+''+a2;//6位密码递减
				    		}    
						}
						if( value == d || value == b || value == c || value == e){
							
							if(!onlyCheck){
				    			alert("\u60a8\u7684\u5bc6\u7801\u8fc7\u4e8e\u7b80\u5355,\u8bf7\u91cd\u65b0\u8bbe\u7f6e. \u7b80\u5355\u5bc6\u7801\u4e0d\u80fd\u529e\u7406\u5176\u4ed6\u4efb\u4f55\u4e1a\u52a1\!\n\
\u7b80\u5355\u5bc6\u7801\u6307:\n        \(1):6\u4f4d\u5bc6\u7801\u4e00\u6837;\n        \(2):6\u4f4d\u5bc6\u7801\u9012\u589e;\n        \(3):6\u4f4d\u5bc6\u7801\u9012\u51cf;\n        \u5982'111111,123456,654321,ssssss'");
				    			password.value = "";
				    			password.focus();
			    			}
				    		return false;
				    	}
				    	return true;
					},
					checkNotNullByContainer : function(container){//检测非空，包括不可见的元素
						var textBoxes=container.getElementsByTagName('input');
						var iTextBoxes=textBoxes.length;
						for(var i=0;i<iTextBoxes;i++){
							var textBox=textBoxes[i];
							if(textBox.ztype != 'mock'){
								if(textBox.type!='text'&&textBox.type!='password')continue;
							}
							if(textBox.disabled)continue;
							if(textBox.readOnly)continue;
							if(textBox.value!='')continue;
							if(!this.checkItem(textBox)){
								return false;
							}
						}
						if(!this.checkSelectNotNull()){
							return false;
						}
						return true;
					},
						checkSelectNotNull : function(){
							var textBoxes=document.getElementsByTagName('select');
							var iTextBoxes=textBoxes.length;
							for(var i=0;i<iTextBoxes;i++){
								var textBox=textBoxes[i];
								if(!isDisplay(textBox,true))continue;
								if(textBox.disabled)continue;
								if(textBox.readOnly)continue;
								if(textBox.value!='')continue;
								if(!this.checkItem(textBox)){
									return false;
								}
							}
							return true;
						},
						
				   checkItem : function(item){//检测非空，单个控件,公共的不好用
						var nullable=item.isnullable;
						if(nullable == "false"){
							nullable=false;
						}else{
							nullable=true;
						}
						var empty=item.value;
						if(!nullable&&!empty){
							promptNotNull(item.prompt);
							if(isDisplay(item,true)){
								item.focus();
							}
							return false;
						}
						return true;
					}
										
				};

				var isValid = function(obj){
					if (obj==null || typeof obj=="undefined" ){
						return false;
					}else{
						return true;
					}
				};
				
				var ServiceIdInterface = function(oParameter){
					var Me=this;
					Me.$ = oParameter["$"];
					Me.setServiceId = function(param){
						var serviceId = param["serviceId"];
						var resInstId = param["resInstId"];
						var uimId = param["uimId"];
						var uimResInstId = param["uimResInstId"];
						Me.$("serviceId").value = serviceId;
						Me.$("resInstId").value = resInstId;
						if(uimId && uimId != "null"){
							Me.$("uimId").value = uimId;
							Me.$("uimResInstId").value = uimResInstId;
						}
						Me.$("serviceId").focus();
					};
				};
				var check_identity_new = function(identity_length_array,identity_method_array,
													identity_kind_field_name,identity_kind_field,identity_code_field){
					var err_message=identity_kind_field_name+'\u8f93\u5165\u9519\u8bef!';
					var check_result = {};
					var select_point=identity_kind_field.selectedIndex;
					var select_value=identity_kind_field.options[select_point].value;
					var select_text=identity_kind_field.options[select_point].text;
					var code_value=identity_code_field.value;
					if (!identity_length_array)
					{
						var identity_length_array = [];
						identity_length_array[1] = '18';
						identity_length_array[3] = '18';
						identity_length_array[5] = '20';
						identity_length_array[6] = '20';
						identity_length_array[7] = '20';
						identity_length_array[8] = '20';
					}
					if(typeof identity_length_array[select_value] === 'undefined'){
						check_result.status=true;
						check_result.message='';
						return check_result;
					}
					if (!identity_method_array){
						var identity_method_array = new Array();
						identity_method_array[1] = '1';
						//identity_method_array[2] = '1';
						//identity_method_array[3] = '1';
						//identity_method_array[4] = '1';
						//identity_method_array[5] = '1';--zhangzhenzhong
					}
					
					//如果是15位身份证而证件号码长度不为15位
					//alert(select_value);
					//alert(code_value.length);
					if (select_value==1 &&  code_value.length!=0)
					{
						if(code_value.length==18||code_value.length==15)
						{}else
						{
							err_message=identity_kind_field_name+'\u957f\u5ea6\u9519\u8bef!';
							check_result.status=false; 
							check_result.message=err_message; 
							identity_code_field.value="";
							return check_result; 	
						}
					}
					if (code_value.length>identity_length_array[select_value])
					{
						err_message=identity_kind_field_name+'\u957f\u5ea6\u8d85\u51fa\u6700\u5927\u9650\u5236\u957f\u5ea6!';
						check_result.status=false; 
						check_result.message=err_message; 
						identity_code_field.value="";
						return check_result; 	
					}
					
					//确定当前证件类型的校验规则
					//0	全为数字
					//1	全为数字，字母
					//2	任意字符组合
					if ( code_value.length!=0)
					{
						if (identity_method_array[select_value] == 0 || identity_method_array[select_value] == "0")
						{	var decimal_expr = /^[\d]+$/;	}
						else if  (identity_method_array[select_value]  == 1 || identity_method_array[select_value]  == "1")
						{	var decimal_expr = /^[\w]+$/;	}
						else if (identity_method_array[select_value]  == 2 || identity_method_array[select_value]  == "2")
						{	var decimal_expr = /^[*]+$/;	}
						
						var match_array = code_value.match(decimal_expr);
						
						if (match_array==null)
						{
							if (identity_method_array[select_value] == 0 || identity_method_array[select_value] == "0")
								{	err_message=identity_kind_field_name+'\u5e94\u8be5\u4e3a\u6570\u5b57!';	}
							else if  (identity_method_array[select_value]  == 1 || identity_method_array[select_value]  == "1")
								{	err_message=identity_kind_field_name+'\u5e94\u8be5\u4e3a\u6570\u5b57\u548c\u5b57\u6bcd\u7684\u7ec4\u5408!';	}
							else if (identity_method_array[select_value]  == 2 || identity_method_array[select_value]  == "2")
								{	err_message=identity_kind_field_name+'\u683c\u5f0f\u9519\u8bef!';	}
							else
								{	err_message=identity_kind_field_name+'\u683c\u5f0f\u9519\u8bef!';	}	
								
							check_result.status=false; 
							check_result.message=err_message; 
							identity_code_field.value="";
							return check_result; 	
						}
					}
					
					//判断15位身份证的日期是否正确
					if (select_value==1 && code_value.length==15)
					{	
						if(isNaN(parseInt(code_value))){
							var err_message = "15\u4f4d\u8eab\u4efd\u8bc1\u53f7\u7801\u5e94\u5168\u4e3a\u6570\u5b57";
							check_result.status=false; 
							check_result.message=err_message; 
							identity_code_field.value="";
							return check_result;
						}
						var year = code_value.substr(6,2);
						var month = code_value.substr(8,2);
						var day = code_value.substr(10,2);
						var new_year = "19" + year;
						var year_int=parseInt(new_year,10);
						var month_int=parseInt(month,10);
						var day_int=parseInt(day,10);
						
						if ((year_int%4==0)&&(year_int%100!=0) || (year_int%400==0)) 
						{
							var day_number=new Array(31,29,31,30,31,30,31,31,30,31,30,31);
						}
						else
						{
					    		var day_number=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
						}
						
						if (year_int<1900) 
						{
						var err_message = identity_kind_field_name+"\u7684\u5e74\u6ca1\u6709\u610f\u4e49！\u8bf7\u91cd\u65b0\u8f93\u5165！";
						check_result.status=false; 
						check_result.message=err_message; 
						identity_code_field.value="";
						return check_result;
						}	
					
						if (month_int<1 || month_int>12) 	
						{
						var err_message = identity_kind_field_name+"\u7684\u6708\u4efd\u4e0d\u6b63\u786e!";
						check_result.status=false; 
						check_result.message=err_message; 
						identity_code_field.value="";
						return check_result;
						}
					
						if (day_int<1 || day_int>day_number[(month-1)])	
						{
						var err_message = identity_kind_field_name+"\u7684\u65e5\u671f\u90e8\u5206\u4e0d\u6b63\u786e!";
						check_result.status=false; 
						check_result.message=err_message; 
						identity_code_field.value="";
						return check_result;
						}
					}		 	
					
					
					//判断18位身份证的日期是否正确
					if(select_value==1 && code_value.length==18)
					{	
						var decimal_expr = /^[0-9]{17}(x|([0-9]{1}))$/i;
						if(!decimal_expr.test(code_value)){
							var err_message = "18\u4f4d\u8eab\u4efd\u8bc1\u53f7\u7801\u5e94\u5168\u4e3a\u6570\u5b57\u6216\u6700\u540e\u4e00\u4f4d\u4e3ax";
							check_result.status=false; 
							check_result.message=err_message; 
							identity_code_field.value="";
							return check_result;
						}
						
						var year = code_value.substr(6,4);
						var month = code_value.substr(10,2);
						var day = code_value.substr(12,2);
						var year_int=parseInt(year,10);
						var month_int=parseInt(month,10);
						var day_int=parseInt(day,10);
						
						if ((year_int%4==0)&&(year_int%100!=0) || (year_int%400==0)) 
						{
							var day_number=new Array(31,29,31,30,31,30,31,31,30,31,30,31);
						}
						else
						{
					    		var day_number=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
						}
						
						if (year_int<1900) 
						{
						var err_message = identity_kind_field_name+"\u7684\u5e74\u6ca1\u6709\u610f\u4e49!";
						check_result.status=false; 
						check_result.message=err_message; 
						identity_code_field.value="";
						return check_result;
						}	
					
						if (month_int<1 || month_int>12) 	
						{
						var err_message = identity_kind_field_name+"\u7684\u6708\u4efd\u4e0d\u6b63\u786e!";
						check_result.status=false; 
						check_result.message=err_message; 
						identity_code_field.value="";
						return check_result;
						}
					
						if (day_int<1 || day_int>day_number[(month-1)])	
						{
						var err_message = identity_kind_field_name+"\u7684\u65e5\u671f\u90e8\u5206\u4e0d\u6b63\u786e!";
						check_result.status=false; 
						check_result.message=err_message; 
						identity_code_field.value="";
						return check_result;
						}
					}		 	
					
					check_result.status=true;
					check_result.message=""; 
					return check_result;		 		
				};
				function checkid_iden_new(alert_name,iden_kind,iden_value){
					if(!iden_kind.disabled){
						var result=check_identity_new("","",alert_name,iden_kind,iden_value)
						if (false==result.status){
							alert(result.message);
							iden_value.select();
							iden_value.focus();
							return false;
						}else{
							return true;
						}
					}else {
						return true;
					}
				};
				
				var WeakPwdCheck = {
					weakPwdCheck : function(obj, serviceId) {
						if (this.checkPwdSp(obj, "\u5bc6\u7801\u4fee\u6539")) {
							if (this.pwdLengthCheck(obj)) {
								if (this.ifSameAsServiceId(obj, serviceId)) {
									if (this.checkEasyPwd(obj)) {
										if (this.useServicePart(obj, serviceId)) {
											this.charEasyCheck(obj);
										}
									}
								}
							}
						}
					},
				
					createWeakPawCheck : function(obj) {
				
						if (this.checkPwdSp(obj, "\u5bc6\u7801\u4fee\u6539")) {
				
							if (this.pwdLengthCheck(obj)) {
				
								if (this.checkEasyPwd(obj)) {
				
									this.charEasyCheck(obj);
								}
							}
						}
					},
					ifSameAsServiceId : function(obj, serviceId) {
						var pwdValue = obj.value;
						if (serviceId != "") {
							if (pwdValue == serviceId) {
								alert("\u5bf9\u4e0d\u8d77\uff0c\u5bc6\u7801\u548c\u8d26\u53f7\u4e0d\u80fd\u76f8\u540c\u8bf7\u91cd\u65b0\u8f93\u5165\u5bc6\u7801");
								obj.value = "";
								return false;
							}
						}
						return true;
					},
					checkPwdSp : function(obj, lable) {
						var str = "\"'$";
						return this.checkSpPri(obj, lable, str);
					},
					checkSpPri : function(obj, lable, special) {
						var SPECIAL_STR = special;
						var res = "";
						for (i = 0; i < obj.value.length; i++) {
							var cc = obj.value.charAt(i);
							if (" " == cc) {
								res = res + "\u7a7a\u683c";
							}
							if (SPECIAL_STR.indexOf(cc) != -1) {
								if (res.indexOf(cc) == -1) {
									res = res + cc;
								}
							}
						}
						if (res == "") {
							return true;
						}
						alert(lable + "\u4e2d\u542b\u6709" + res + "\u7279\u6b8a\u5b57\u7b26\uff01");
				
						obj.value = "";
						return false;
					},
					checkEasyPwd : function(obj) {
						var s = obj.value;
						if (/^(\d)\1+$/.test(s)) {
							alert("\u5bc6\u7801\u53d6\u503c\u4e0d\u80fd\u4e00\u6837\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u5bc6\u7801");
							obj.value = "";
							return false; 
						}
				
						var str = s.replace(/\d/g, function($0, pos) {
									return parseInt($0) - pos;
								});
						if (/^(\d)\1+$/.test(str)) {
							alert("\u5f31\u5bc6\u7801\u7c7b\u578b\u8bf7\u91cd\u65b0\u8f93\u5165\u5bc6\u7801");
							obj.value = "";
							return false; 
						}
				
						str = s.replace(/\d/g, function($0, pos) {
									return parseInt($0) + pos;
								});
						if (/^(\d)\1+$/.test(str)) {
							alert("\u5f31\u5bc6\u7801\u7c7b\u578b\u8bf7\u91cd\u65b0\u8f93\u5165\u5bc6\u7801");
							obj.value = "";
							return false; 
						}
						return true;
					},
					useServicePart : function(obj, serviceId) {
						var value = obj.value;
						if (serviceId != "") {
							if (serviceId.indexOf(value) != -1) {
								alert("\u4e0d\u80fd\u7528\u8d26\u53f7\u4e2d\u7684\u8fde\u7eed\u516d\u4f4d\u4f5c\u4e3a\u60a8\u7684\u5bc6\u7801\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u5bc6\u7801");
								obj.value = "";
								return false;
							}
						}
						return true;
					},
					pwdLengthCheck : function(obj) {
						var pwdValue = obj.value;
						if (pwdValue.length > 6) {
							alert("\u5bc6\u7801\u957f\u5ea6\u5927\u4e8e\u516d\u4f4d\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u5bc6\u7801");
							obj.value = "";
							return false;
						} else {
							return true;
						}
					},
					charEasyCheck : function(obj) {
						var s = obj.value;
						if (/^(\w)\1+$/.test(s)) {
							alert("\u5f31\u5bc6\u7801\u7c7b\u578b\u8bf7\u91cd\u65b0\u8f93\u5165\u5bc6\u7801");
							obj.value = "";
							return false; 
						}
						var str = "abcdefghijklmnopqrstuvwxyz";
						var strCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
						if ((str.indexOf(s) != -1)) {
							alert("\u5f31\u5bc6\u7801\u7c7b\u578b\u8bf7\u91cd\u65b0\u8f93\u5165\u5bc6\u7801");
							obj.value = "";
							return false;
						}
						if ((strCaps.indexOf(s) != -1)) {
							alert("\u5f31\u5bc6\u7801\u7c7b\u578b\u8bf7\u91cd\u65b0\u8f93\u5165\u5bc6\u7801");
							obj.value = "";
							return false;
						}
						return true;
					}
				};
		        
		        _globalObject.StandardAddInterface = StandardAddInterface;
		        _globalObject.ServiceIdInterface = ServiceIdInterface;
		        _globalObject.jsCommon = jsCommon;
		        _globalObject.isValid = isValid;
		        _globalObject.check_identity_new = check_identity_new;
		        _globalObject.checkid_iden_new = checkid_iden_new;
		        _globalObject.GetSwitchForAddr = GetSwitchForAddr;
		        _globalObject.StandardAddMultipleInterface=StandardAddMultipleInterface;
		        _globalObject.ResourceConfirmInterface = ResourceConfirmInterface;
		        _globalObject.WeakPwdCheck = WeakPwdCheck;
		        _globalObject.doMoveSpecialHandler=function(){};
		        
	        }());
	        
        });
