defineModule("orderaccept.prodofferaccept.batch.prodofferdetail.BatchFavour", ["../../util",
                "orderaccept.common.js.ConstantsPool","orderaccept.common.dialog.MessageBox",
                "unieap.form.DateTextBox"], function(util,ConstantsPool,messageBox,DateTextBox) {
	        /**
			 * 定义亲情信息整体构造器
			 * 
			 * @class
			 * @extends
			 */
	        dojo.declare("orderaccept.prodofferaccept.batch.prodofferdetail.BatchFavour.FavourBuilder", [], { 
	        	       	
		    	Me : this,
	        	constructor : function(args){	
	        		this.prodOfferDetailWidget = args.prodOfferDetailWidget,
					this.rowData = args.rowData,
					this.showData = this.rowData.showData,
					this.prodOfferInfoVO = args.prodOfferInfoVO,//销售品信息
					this.container = args.container,//亲情号码容器
					this.favourRelaInstList = args.favourRelaInstList.Components,//用户已经存在的亲情实例信息
					this.hasFavourItemList = args.hasFavourItemList,//用户已经保存的亲情信息
					this.selfFavorLimitList = args.selfFavorLimitList,//亲情限制信息
					this.favourType = args.favourType,//亲情类型0互惠，1自惠
					this.unitId = "";
					this.favourItemList = [],//保存所有亲情信息，包括新增的或者取消的亲情信息
					this.uncheckedFavourList = {},//页面上展示了，却没有选中的亲情号码
					this.favourReturnItem = {},//临时变量 保存java中返回的亲情号码属性
					this.FavourKindConst = ConstantsPool.load("FavourKindConst").FavourKindConst;
	        	},
				/**
			     * 初始化销售品亲情项
			     */
				init : function(){
					//初始化用户已经保存的亲情信息
					if(this.hasFavourItemList != null){
						for(var i = 0;i < this.hasFavourItemList.length;i++){
							//暂时不考虑变更将所有已经保存的全部刷到页面上
			//				favourItemList.push(this.hasFavourItemList[i]);
							this.createFavourNumberHtmlByData(this.hasFavourItemList[i]);
						}
					}
					return true;
				},
				
				/**
			     * 初始化销售品亲情项
			     */
				createFavourNumberHtml : function(favourNumberObj){
					//创建亲情号码项
					var favourItem = this.createFavourItem(favourNumberObj);
					//创建亲情代码
					var favourNumberHtml = favourItem.generateFavourNumberHtml();
					//将代码插入页面
					dojo.place(favourNumberHtml,this.container,"last");
					dojo.parser.parse(this.container);			
					var rowIndex = this.rowData.rowIndex;
					var favourId = !!favourNumberObj.objServiceId?favourNumberObj.objServiceId:favourNumberObj.unitId;
					if(!!favourNumberObj.unitId && !this.unitId){
						this.unitId = favourNumberObj.unitId;
					}
					var beginDate = dijit.getEnclosingWidget(dojo.query("[id='beginDate-"+rowIndex+"-"+favourId+"']",this.container)[0]);
					var enfDate = dijit.getEnclosingWidget(dojo.query("[id='endDate-"+rowIndex+"-"+favourId+"']",this.container)[0]);
					beginDate.onChange = function(){
						var beginDateVal = util.DateHelper.getDateFromString(beginDate.getValue());
						var enfDateVal = util.DateHelper.getDateFromString(enfDate.getValue());
						var today = util.DateHelper.getDateFromString($ac$.requestParam.today);
						if(beginDateVal < today){						
					       MessageBox.alert({
						         busiCode : "08410201"
					        }, beginDate.domNode);
					        beginDate.setValue($ac$.requestParam.today);
					        return false;
						}
						if(enfDateVal < beginDateVal){
					       MessageBox.alert({
						         busiCode : "08410202"
					        }, beginDate.domNode);
					        beginDate.setValue($ac$.requestParam.today);
					        return false;
						}
					}
					enfDate.onChange = function(){
						var beginDateVal = util.DateHelper.getDateFromString(beginDate.getValue());
						var enfDateVal = util.DateHelper.getDateFromString(enfDate.getValue());
						if(enfDateVal < beginDateVal){
					       MessageBox.alert({
						        busiCode : "08410202"
					        }, enfDate.domNode);
					        enfDate.setValue('2037-01-01');
					        return false;
						}
					}
					this.prodOfferDetailWidget.enableEvtMsgPropagation(dojo.query("[id='favour_div_"+favourItem.getFavourNumber()+"']",this.container)[0]);		
				},
				
				/**
			     * 初始化亲情号码项
			     */
				createFavourItem : function(favourNumberObj){
					var args = {
						"builder" : this,
						"prodOfferInfoVO" : this.prodOfferInfoVO,//销售品信息
						"favourNumberObj" : favourNumberObj,//亲情号码
						"addItemList" : this.addItemList,//增加亲情号码项事件
						"favourType" : this.favourType,//亲情号码类型
						"removeItemList" : this.removeItemList,//移除亲情号码项
						"hasFavourItemData" : null//已有的亲情号码信息
					};
					var favourItem = new orderaccept.prodofferaccept.batch.prodofferdetail.Favour.FavourItem(args);
			//		var favourItemData = favourItem.createItemData();
					this.favourItemList.push(favourItem);
					return favourItem;
				},
				
				/**
			     * 初始化已保存的亲情号码项
			     */
				createFavourNumberHtmlByData : function(hasFavourItemData){
					var builder = this;
					var favourReturnTempItem = {};
					var objectServiceId = "";//COMMON_FAVOUR:serviceId SELF_FAVOUR:objectServiceId OCS_FAVOUR:objServiceId
					var objectServiceKind = "";//COMMON_FAVOUR:serviceKind SELF_FAVOUR:objServiceKind OCS_FAVOUR:serviceKi1nd
					var beginValidDate = "";//COMMON_FAVOUR:beginValidDate SELF_FAVOUR:beginValidDate OCS_FAVOUR:effectiveDate
					var endValidDate = "";//COMMON_FAVOUR:endValidDate SELF_FAVOUR:endValidDate OCS_FAVOUR:expireDate
					if(builder.FavourKindConst.COMMON_FAVOUR == builder.favourType){
						objectServiceId = hasFavourItemData.serviceId;
						objectServiceKind = hasFavourItemData.serviceKind;
						beginValidDate = hasFavourItemData.beginValidDate;
						endValidDate = hasFavourItemData.endValidDate;
					}else if(builder.FavourKindConst.SELF_FAVOUR == builder.favourType){
						objectServiceId = hasFavourItemData.objectServiceId;
						objectServiceKind = hasFavourItemData.objServiceKind;
						beginValidDate = hasFavourItemData.beginValidDate;
						endValidDate = hasFavourItemData.endValidDate;
					}else if(builder.FavourKindConst.OCS_FAVOUR == builder.favourType){
						objectServiceId = hasFavourItemData.objServiceId;
						objectServiceKind = "";
						beginValidDate = hasFavourItemData.effectiveDate;
						endValidDate = hasFavourItemData.expireDate;
					}
					favourReturnTempItem.objServiceId = objectServiceId;//业务号码 
					favourReturnTempItem.objCityCode = hasFavourItemData.cityCode;//地市编码
					favourReturnTempItem.objServiceKind = objectServiceKind;//业务类型 
					favourReturnTempItem.beginDate = beginValidDate;
					favourReturnTempItem.endDate = endValidDate;
					favourReturnTempItem.netOwner = hasFavourItemData.netOwner;
					favourReturnTempItem.unitId = hasFavourItemData.unitId;
					favourReturnTempItem.operKind = 2;
					if(!!hasFavourItemData.subGroupType){
	       	 			var subGroupTypeObj = util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?"+
	       	 										"method=getSubGroupTypeDetailInfo&subgroupType="+hasFavourItemData.subGroupType);	
	       	 			if(!!subGroupTypeObj){
	       	 				subGroupTypeObj.name = subGroupTypeObj.subgroupName;
	       	 				subGroupTypeObj.value = subGroupTypeObj.subgroupType;
	       	 			}
						favourReturnTempItem.subGroupType = subGroupTypeObj;
					}
					var args = {
						"builder" : this,
						"prodOfferInfoVO" : this.prodOfferInfoVO,//销售品信息
						"favourNumberObj" : favourReturnTempItem,//亲情号码
						"addItemList" : this.addItemList,//增加亲情号码项事件
						"favourType" : this.favourType,//亲情号码类型
						"removeItemList" : this.removeItemList,//移除亲情号码项
						"hasFavourItemData" : hasFavourItemData//已有的亲情号码信息
					};
					//创建亲情项
					var favourItem = new orderaccept.prodofferaccept.batch.prodofferdetail.Favour.FavourItem(args);
					this.favourItemList.push(favourItem);
					//生成亲情项的html代码
					var favourNumberHtml = favourItem.generateFavourNumberHtml(); 
					//将代码插入页面
					dojo.place(favourNumberHtml,this.container,"last");
					dojo.parser.parse(this.container);									
					var rowIndex = this.rowData.rowIndex;
					var favourId = !!favourReturnTempItem.objServiceId?favourReturnTempItem.objServiceId:favourReturnTempItem.unitId;
					var beginDate = dijit.getEnclosingWidget(dojo.query("[id='beginDate-"+rowIndex+"-"+favourId+"']",this.container)[0]);
					var enfDate = dijit.getEnclosingWidget(dojo.query("[id='endDate-"+rowIndex+"-"+favourId+"']",this.container)[0]);
					beginDate.setReadOnly(true);
					beginDate.changeIconState(false);
					enfDate.setReadOnly(true);
					enfDate.changeIconState(false);
					this.prodOfferDetailWidget.enableEvtMsgPropagation(dojo.query("[id='favour_div_"+favourItem.getFavourNumber()+"']",this.container)[0]);	
				},
			     
				/**
			    * 获取修改后全部产品属性相关数据
			    */
				getData : function(){
					var list = [];
					//循环亲情信息集合，如果操作类型为2，则跳过
					for(var i = 0;i < this.favourItemList.length;i++){
						var relaBusData = this.favourItemList[i].createItemData();
						//如果操作类型为2-变更，则跳过
						if(relaBusData.operKind == 2){
							continue;
						}
						list.push(relaBusData);
					}
					return data;
				},
				/**
				 * 外部接口函数，返回该Builder对象对应的亲情项集合
				 */
				getFavourItemList : function(){
					var favourItemListData = [];
					for(var i = 0, len = this.favourItemList.length; i < len; i++) {
						favourItemListData.push(this.favourItemList[i].createItemData());
					}
				    return                           Data;
				},
				/**
				 * 回调函数，点击checkBox触发事件
				 */
				addItemList : function(favourItem){
					//获取亲情号码
					var favourNumber = favourItem.getFavourNumber();
					//亲情检测
					if(!this.checkMaxNumber(favourNumber)){
						$("familyNumberCh-" + favourNumber).checked = ""; 
						return false;
					}
					//添加到亲情集合中
					this.favourItemList.push(favourItem);
					//未选中的亲情号码集合
					if(this.uncheckedFavourList[favourNumber]){
					   delete this.uncheckedFavourList[favourNumber];
					}
					return;
				},
				/**
				 * 回调函数，点击checkBox触发事件
				 */
				removeItemList : function(favourItem){
					if(!this.favourItemList || this.favourItemList.length == 0){
						return;
					}
					//获取亲情号码
					var favourNumber = favourItem.getFavourNumber();
					for(var i = 0;i < this.favourItemList.length;i++){
						//获取亲情数据项
						var favourItemData = this.favourItemList[i].createItemData();
						var objFavourId ;
						if(this.FavourKindConst.COMMON_FAVOUR == favourItemData.favourKind){
							//亲情互惠该改造
							//objFavourId = favourItemData.unitId;	
							objFavourId = favourItemData.objServiceId;				
						}else if(this.FavourKindConst.SELF_FAVOUR == favourItemData.favourKind ||this.FavourKindConst.OCS_FAVOUR == favourItemData.favourKind){	
							objFavourId = favourItemData.objServiceId;		
						}
						if(favourNumber == objFavourId){
							this.uncheckedFavourList[favourNumber] = this.favourItemList[i];
							//从集合中移除当前取消的亲情号码项
							this.favourItemList.splice(i,1);
							return;
						}
					}
				},
				/**
				 * 对于亲情号码个数的检测
				 */
				doCheck : function(favourNumber,subGroupType){
					//判断是否输入自身
					if(this.showData && this.showData.chooseNumberObj){
						var serviceId = this.showData.chooseNumberObj.serviceId;
						if(favourNumber == serviceId){
					       /** MessageBox.alert({
						        title : "\u63d0\u793a\u4fe1\u606f",
						        message : "\u8bf7\u91cd\u65b0\u586b\u5199\u4eb2\u60c5\u53f7\u7801\uff0c\u4e0d\u80fd\u6dfb\u52a0\u81ea\u8eab\u4e3a\u4eb2\u60c5\u53f7\u7801"
					        }, $('familyNumber'));*/
							//alert("请重新填写亲情号码，不能添加自身为亲情号码");
							 messageBox.alert({
								busiCode : "08410107"
						 	 }, $('familyNumber'));
							return false;
						}
					}
					//判断是否重复输入
					for(var i = 0;i < this.favourItemList.length;i++){
						var favourItemData = this.favourItemList[i].createItemData();
						if(this.FavourKindConst.COMMON_FAVOUR == favourItemData.favourKind){					
							if(favourNumber == favourItemData.objServiceId){						
							//if(favourNumber == favourItemData.unitId){
						       /** MessageBox.alert({
							        title : "\u63d0\u793a\u4fe1\u606f",
							        message : "\u8bf7\u91cd\u65b0\u586b\u5199\u4eb2\u60c5\u5355\u5143\uff0c\u8be5\u4eb2\u60c5\u5355\u5143\u5df2\u5b58\u5728"
						        }, $('familyNumber'));*/
								//alert("请重新填写亲情单元，该亲情单元已存在");
								 messageBox.alert({								 	
									busiCode : "08410109"
									//亲情互惠改造
									//busiCode : "08410108"
							 	 }, $('familyNumber'));
								return false;
							}						
						}else if(this.FavourKindConst.SELF_FAVOUR == favourItemData.favourKind　|| this.FavourKindConst.OCS_FAVOUR == favourItemData.favourKind){							
							if(favourNumber == favourItemData.objServiceId){
						        /**MessageBox.alert({
							        title : "\u63d0\u793a\u4fe1\u606f",
							        message : "\u8bf7\u91cd\u65b0\u586b\u5199\u4eb2\u60c5\u53f7\u7801\uff0c\u8be5\u4eb2\u60c5\u53f7\u7801\u5df2\u5b58\u5728"
						        }, $('familyNumber'));
								//alert("请重新填写亲情号码，该亲情号码已存在");*/
								messageBox.alert({
									busiCode : "08410109"
							 	 }, $('familyNumber'));
								return false;
							}
						}
					}
					//亲情号码检测事件
					if(!this.checkMaxNumber(favourNumber,subGroupType)){
						return false;
					}else{
						//检测在页面上是否存在输入的亲情号码
						for(var p in this.uncheckedFavourList){
							var favourItemData =  this.uncheckedFavourList[p];
							var favourId = null;
							if(this.FavourKindConst.COMMON_FAVOUR == favourItemData.favourType){	
								//亲情互惠改造
								//favourId = this.uncheckedFavourList[p].createItemData().unitId;
								favourId = this.uncheckedFavourList[p].createItemData().objServiceId;
							}else if(this.FavourKindConst.SELF_FAVOUR == favourItemData.favourType ||this.FavourKindConst.OCS_FAVOUR == favourItemData.favourType){	
								favourId = this.uncheckedFavourList[p].createItemData().objServiceId;
							}
							if(favourNumber == favourId){
								var favourItem = this.createFavourItem(this.favourReturnItem);
								$("familyNumberCh-" + favourNumber).checked = "checked"; 
								return false;
							}
						}
					}
					return true;
				},
				
				checkMaxNumber : function(favourNumber,subGroupType){
					//检测输入的亲情号码的最大的个数
					var favourRelaLimitXML = dojo.toJson(this.getRelaLimitData());//亲情限制json串
					var relaNumberXML = dojo.toJson(this.getAllFavourData());//已存在的亲情号码集合 
					var parameters = "&favourNumber="+favourNumber;
					parameters += "&favourRelaLimitXML="+favourRelaLimitXML;
					parameters += "&relaNumberXML="+relaNumberXML;
					parameters += "&favourType="+this.favourType;
					parameters += "&unitId="+this.unitId;
					parameters += "&dojoType=1";
			        var resultJsonObj = util.ServiceFactory
		                .getService("url:prodOfferSaleAjaxAction.do?method=doCheckRelaNumber" + parameters);
					if(!resultJsonObj){						
				        /**MessageBox.alert({
					        title : "\u63d0\u793a\u4fe1\u606f",
					        message : "\u4eb2\u60c5\u68c0\u6d4b\u5931\u8d25\uff0c\u8bf7\u786e\u8ba4\uff01"
				        }, $('familyNumber'));*/
						//alert("亲情检测失败，请确认！");
						messageBox.alert({
							busiCode : "08410110"
					 	 }, $('familyNumber'));
						$('familyNumber').value ="";
						return false;
					}
					if(resultJsonObj.code/1 < 0 && resultJsonObj.message){
				        /**MessageBox.alert({
					        title : "\u63d0\u793a\u4fe1\u606f",
					        message : "\u4eb2\u60c5\u68c0\u6d4b\u5931\u8d25\uff0c\u539f\u56e0\u4e3a:"+resultJsonObj.message
				        }, $('familyNumber'));*/
						//alert("亲情检测失败，原因为:"+resultJsonObj.message);
						 messageBox.alert({
							busiCode : "08410111",
							infoList : [ resultJsonObj.message ]
					 	 }, $('familyNumber'));
						$('familyNumber').value ="";
						return false;
					}else{
						this.favourReturnItem.objServiceId = (this.favourType==this.FavourKindConst.SELF_FAVOUR
																	||this.favourType==this.FavourKindConst.COMMON_FAVOUR
																	||this.favourType==this.FavourKindConst.OCS_FAVOUR?favourNumber:"");//亲情号码
						this.favourReturnItem.objCityCode =  (this.favourType==this.FavourKindConst.SELF_FAVOUR
																	||this.favourType==this.FavourKindConst.COMMON_FAVOUR
																	||this.favourType==this.FavourKindConst.OCS_FAVOUR?resultJsonObj.objCityCode:"");//地市编码
						this.favourReturnItem.objServiceKind =  (this.favourType==this.FavourKindConst.SELF_FAVOUR
																	||this.favourType==this.FavourKindConst.COMMON_FAVOUR
																	||this.favourType==this.FavourKindConst.OCS_FAVOUR?resultJsonObj.objServiceKind:"");//业务类型
						this.favourReturnItem.netOwner = (this.favourType==this.FavourKindConst.SELF_FAVOUR
																	||this.favourType==this.FavourKindConst.COMMON_FAVOUR
																	||this.favourType==this.FavourKindConst.OCS_FAVOUR?resultJsonObj.netOwner:"");//网络运营商 0 不区分,1 联通C, 2 联通G, 3 网通, 4 移动, 5 电信, 6 铁通
						this.favourReturnItem.unitId = "";//(this.favourType==this.FavourKindConst.COMMON_FAVOUR?favourNumber:"");//亲情单元id
						this.favourReturnItem.subGroupType = (this.favourType==this.FavourKindConst.OCS_FAVOUR?subGroupType:null);//OCS亲情群组
					}
					return true;
				},
				
				/**
				 * 对于亲情号码个数的检测
				 */
				getFavourReturnItem : function(){
					return this.favourReturnItem;
				},
				
				/**
			     * 获取修改后全部产品属性相关数据
			     */
				getRelaLimitData : function(){
					var list = [];
					for(var p in this.selfFavorLimitList){
						if(typeof (this.selfFavorLimitList[p].maxOppositeNbr) == "undefined"){
							continue;
						}
						var relaNumberLimitVO = {
							maxOppositeNbr: this.selfFavorLimitList[p].maxOppositeNbr,//最多允许亲情号码个数
							netOwner: this.selfFavorLimitList[p].netOwner,// 网络运营商 0 不区分,1 联通C, 2 联通G, 3 网通, 4 移动, 5 电信, 6 铁通
							ifLocal: this.selfFavorLimitList[p].ifLocal,// 是否区分本地
							ifMobile: this.selfFavorLimitList[p].ifMobile// 是否移动:0固话1移动						
						};
						list.push(relaNumberLimitVO);
					}
					return list;
				},
				
				/**
			     * 获取所有亲情号码信息
			     */
				getAllFavourData : function(){
					var list = [];
					for(var i = 0;i < this.favourItemList.length;i++){
						var relaBusData = this.favourItemList[i].createItemData();
						list.push(relaBusData);
					}
					return list;
				}
		});
		
		/**
		 * 销售品亲情号码项
		 */
        dojo.declare("orderaccept.prodofferaccept.batch.prodofferdetail.Favour.FavourItem", [], { 
				Me : this,
	        	constructor : function(args){		
	        		this.builder = args.builder,
					this.favourType = args.builder.favourType,//亲情类型0互惠，1自惠
					this.prodOfferInfoVO = args.builder.prodOfferInfoVO//销售品信息						
					this.favourNumberObj = args.favourNumberObj,//亲情号码
					this.hasFavourItemData = args.hasFavourItemData,//包含用户已有的亲情实例信息和用户保存过的亲情信息
					this.favourNumber = this.favourNumberObj.objServiceId,//亲情号码		
					this.checkedOption = " checked='checked' ",//是否选中
					this.operKind = this.hasFavourItemData ? this.hasFavourItemData.operKind : 1;//针对亲情的操作类型
					this.beginDate = !!this.favourNumberObj.beginDate?this.favourNumberObj.beginDate:args.builder.rowData.today;
					this.endDate = !!this.favourNumberObj.endDate?this.favourNumberObj.endDate:"2037-01-01";	
	        	},
				
				/**
				 * 创建销售品亲情号码项
				 */
				createItemData : function(){
					var objServiceKind = this.favourNumberObj.objServiceKind;//亲情号码
					if(objServiceKind/1 < 0){
						objServiceKind = 0;
					}
					var favourId = !!this.favourNumber?this.favourNumber:this.favourNumberObj.unitId;		
					var rowIndex = this.builder.rowData.rowIndex;
					var beginDateDom = dojo.query("[id='beginDate-"+rowIndex+"-"+favourId+"']",this.builder.container)[0];
					var beginDate = dijit.getEnclosingWidget(beginDateDom).getValue();
					var enfDateDom = dojo.query("[id='endDate-"+rowIndex+"-"+favourId+"']",this.builder.container)[0];
					var enfDate = dijit.getEnclosingWidget(enfDateDom).getValue();
					
					/**
					 * 亲情数据信息
					 */
					var relaBusData = {
						"cityCode" : "",
						"userId" : "0",
						"serviceId" : "",
						"serviceKind" : "0",
						"favourKind" : this.favourType,// 亲情类型
						"unitId" : this.builder.unitId,
						"prodOfferId" : this.prodOfferInfoVO.prodOfferId,// 销售品id
						"operKind" : !!this.operKind?this.operKind:1,//操作类型
						"beginDate" : beginDate,
						"endDate" : enfDate,
						"objServiceId" : !!this.favourNumber?this.favourNumber:"",//亲情类型
						"objCityCode" : !!this.favourNumberObj.objCityCode ? this.favourNumberObj.objCityCode : "",//地市编码
						"objServiceKind" : objServiceKind,//业务类型
						"ifBind" : "-1",
						"netOwner" : !!this.favourNumberObj.netOwner?this.favourNumberObj.netOwner:"",//网络提供商
						"areaId" : "",
						"subGroupType" : !!this.favourNumberObj.subGroupType?this.favourNumberObj.subGroupType.value:""
					};
					return relaBusData;
				},
				
				/**
				 * 生成销售品亲情号码HTML代码
				 */
				generateFavourNumberHtml : function(){
					//如果是删除的，则将复选框设置非选中状态
					if(this.operKind == 3){
						this.checkedOption = "";
					}
					var favourNumberHtml = "";
					var rowIndex = this.builder.rowData.rowIndex;
					if(this.favourType == this.builder.FavourKindConst.SELF_FAVOUR
								||this.favourType == this.builder.FavourKindConst.OCS_FAVOUR 								
								|| this.favourType == this.builder.FavourKindConst.COMMON_FAVOUR){//自惠，添加亲情号码
						var subGroupType = this.favourNumberObj.subGroupType;
					    favourNumberHtml ="<div class='buscard-row'> \
							<div class='buscard-item-label' style='width:40%;' id='favour_div_"+this.favourNumber+"'>\
								<input type='checkbox' " + this.checkedOption + " id='familyNumberCh-" + this.favourNumber + "' \
									dojoAttachEvent = 'onclick:elementclick' dojoAttachTopic = '/familyNumberCh'\
									rowIndex='"+this.builder.rowData.rowIndex+"' \
									name='familyNumberCh-" + this.favourNumber + "' value='" + this.favourNumber + "' />:\
							</div>\
							<div class='buscard-item-el' style=\"width:50%\">\
								<input type='text' readonly='true' style='width:50%' id='familyNumberTe-" + this.favourNumber + "' name='familyNumberTe-" + this.favourNumber + "' value='" + this.favourNumber + (!!subGroupType?"/"+subGroupType.name:"")+"' /> \
								<font style='display:none'>&nbsp;开始:</font><div dojoType=\"unieap.form.DateTextBox\" id=\"beginDate-"+rowIndex+"-"+ this.favourNumber+"\" style='width:100px;display:none' \
													value=\""+this.beginDate+"\" displayFormatter=\"{dataFormat:'yyyy-MM-dd'}\" valueFormatter=\"{dataFormat:'yyyy-MM-dd'}\"></div> \
								<font style='display:none'>&nbsp;结束:</font><div dojoType=\"unieap.form.DateTextBox\" id=\"endDate-"+ rowIndex+"-"+ this.favourNumber+"\" style='width:100px;display:none' \
													value=\""+this.endDate+"\" displayFormatter=\"{dataFormat:'yyyy-MM-dd'}\" valueFormatter=\"{dataFormat:'yyyy-MM-dd'}\"></div> \
							</div></div>\ ";
					}
					/*else if(this.favourType == this.builder.FavourKindConst.COMMON_FAVOUR){
						var unitId = this.favourNumberObj.unitId;
				        var param = "unitId=" + this.favourNumberObj.unitId + 
				        			"&method=getRelativeUnitInfo";
				        var relaUnitMap = util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?" + param);	
				        if(!!relaUnitMap.relUnitList && relaUnitMap.relUnitList.length > 0){
				        	var relaUnit = relaUnitMap.relUnitList[0];
						    favourNumberHtml ="<div class='buscard-row'><div class='buscard-item-label' style='width:10%;' id='favour_div_"+unitId+"'>\
								<input type='checkbox' " + this.checkedOption + " id='familyNumberCh-" + unitId + "' \
									dojoAttachEvent = 'onclick:elementclick' dojoAttachTopic = '/familyNumberCh'\
									rowIndex='"+this.builder.rowData.rowIndex+"' \
									name='familyNumberCh-" + unitId + "' value='" + unitId + "' />:\
								</div>\
								<div class='buscard-item-el' style='width:80%;'>\
									<input type='text' readonly='true' style='width:25%'  id='familyNumberTe-" + unitId + "' name='familyNumberTe-" +unitId + "' value='" + relaUnit.unitName + "' /> \
									&nbsp;开始:<div dojoType=\"unieap.form.DateTextBox\" id=\"beginDate-"+rowIndex+"-"+ unitId+"\" style='width:25%' \
														value=\""+this.beginDate+"\" displayFormatter=\"{dataFormat:'yyyy-MM-dd'}\" valueFormatter=\"{dataFormat:'yyyy-MM-dd'}\"></div> \
									&nbsp;结束:<div dojoType=\"unieap.form.DateTextBox\" id=\"endDate-"+rowIndex+"-"+ unitId+"\" style='width:25%' \
														value=\""+this.endDate+"\" displayFormatter=\"{dataFormat:'yyyy-MM-dd'}\" valueFormatter=\"{dataFormat:'yyyy-MM-dd'}\"></div> \
								</div></div>\ ";
				        }
					}*/
					return favourNumberHtml;
				},
				
				/**
				 * 为checkBox绑定事件
				 */
				handleFavourNumber : function(){
					var favourItem = this;
					//亲情号码前的复选框的点击事件
					var checkBoxObj = $("familyNumberCh-"+favourItem.getFavourNumber());
					//不存在则不处理
					if(!checkBoxObj){
						return false; 
					}
					//给复选框绑定事件
					//如果选中
					if(checkBoxObj.checked == true){
						//如果用户已有的话，则设置成操作类型为变更
						if(favourItem.hasFavourItemData != null){//用户已有的
							favourItem.operKind = 2;
						}else{
							if(favourItem.builder.addItemList){
								favourItem.builder.addItemList(favourItem);
							}
						}
					}else{
						//如果原有的信息不为空
						if(favourItem.hasFavourItemData != null){//删除已有的
							//如果是保存过的亲情信息，非实例信息
							if(favourItem.hasFavourItemData.operKind == 1){
								//移除该亲情项
								if(favourItem.builder.removeItemList){
									favourItem.builder.removeItemList(favourItem);
								}
							}else{
								//否则为删除
								favourItem.operKind = 3;
							}
						}else{
							//没有原有的信息，则直接移除
							if(favourItem.builder.removeItemList){
								favourItem.builder.removeItemList(favourItem);
							}
						}
					}
				},
				/**
				 * 获取亲情号码
				 */
				getFavourNumber : function(){
					var favourNumber;
					if(this.favourType == this.builder.FavourKindConst.SELF_FAVOUR || this.favourType == this.builder.FavourKindConst.OCS_FAVOUR){
						favourNumber = this.favourNumber;
					}else if(this.favourType == this.builder.FavourKindConst.COMMON_FAVOUR){
						//亲情互惠改造
						//favourNumber = this.favourNumberObj.unitId;
						favourNumber = this.favourNumber;
					}
					return favourNumber;
				}
			});
		});