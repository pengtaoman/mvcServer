defineModule("orderaccept.prodofferaccept.builder.promotiondetail.PromotionSearchBuilder",[
				"../../util","../../../custom/TooltipDialog","../../widget/promotionchange/PromotionSearchCardWidget",
				"../../../custom/BusCardGrid"],
				function(util,TooltipDialog,PromotionSearchCardWidget,BusCardGrid){
	
	/**
	 * 促销政策查询页面构建器
	 */
	dojo.declare("orderaccept.prodofferaccept.builder.promotiondetail.PromotionSearchBuilder",[],{
		
		promotionSearchWidget : null,
		
		promotionSearchCardWidgetClass : PromotionSearchCardWidget,
		
		promotionSearchCard : null,
		
		showPromotionGrid : null,
		/**
		 * 构造函数
		 */
		constructor : function(loader){
			this.loader = loader;
		},
		
		/**
		 * 初始化促销政策查询页面
		 */
		initPromotionSearchPage : function(){
			var loader = this;
			if(unieap.byId("promotionSearch")){
				unieap.byId("promotionSearch").destroyRecursive();
			}
			var promotionSearchWidget = new TooltipDialog({
				id : "promotionSearch"
			});
			promotionSearchWidget.domNode.style.width = "600px";
			loader.promotionSearchWidget = promotionSearchWidget;
			loader.createPromotionSearchHeadPageInfo();
			
		},
		
		/**
		 * 初始化促销政策查询条件页面
		 */
		createPromotionSearchHeadPageInfo : function(){
			var builder = this;
			builder.promotionSearchCard = new builder.promotionSearchCardWidgetClass({
				level : 4,
				cardMetaData:{
					gType:2,
	        		cardId : 300
				}
			});
			//查询按钮样式
			var button = "<div style='text-align:left;vertical-align:middle'><a href='javascript:void(0);' dojoAttachEvent='onclick:elementclick' \
			    dojoAttachTopic='/promotionSearchBtn'\ style='text-align:center;vertical-align:middle;color:red'>查询</a></div>";
			builder.promotionSearchCard.renderCard(builder.promotionSearchWidget.containerNode,"first");
			builder.promotionSearchCard.addCardCallback(function(){
				//初始化促销分组
				builder.renderPromotionGroup();
				//初始化促销大类
				builder.renderPromotionType();
			});
			dojo.place(button,builder.promotionSearchWidget.containerNode,"last");
			builder.promotionSearchWidget.enableEvtMsgPropagation(builder.promotionSearchWidget.domNode);
		},
		
		/**
		 * 初始化促销分组下拉框
		 */
		renderPromotionGroup : function(){
			var promotionSearchCard = this.promotionSearchCard;
			var loader = this.loader;
			var groupList = loader.requestParam.promotionGroupColl.list;
			if(!this.ifHasChoose(groupList)){
				var po = {"id":"","name":"请选择"};
				groupList.push(po);
			}
			BusCard.$rs(promotionSearchCard.busCardInstance.$("promotionGroup"),groupList.reverse());
			promotionSearchCard.busCardInstance.$("promotionGroup").value = "";
		},
		
		/**
		 * 初始化促销大类
		 */
		renderPromotionType : function(){
			var builder = this;
			var promotionSearchCard = this.promotionSearchCard;
			var loader = this.loader;
			var promotionTypeList = loader.requestParam.typeColl.list;
			if(!this.ifHasChoose(promotionTypeList)){
				var po = {"id":"","name":"请选择"};
				promotionTypeList.push(po);
			}
			BusCard.$rs(promotionSearchCard.busCardInstance.$("promotionType"),promotionTypeList.reverse());
			promotionSearchCard.busCardInstance.$("promotionType").value = "";
			promotionSearchCard.busCardInstance.$("promotionType").onchange = function(){
				builder.renderPromotionSubType();
			}
			builder.renderPromotionSubType();
		},
		
		/**
		 * 获取促销小类
		 */
		renderPromotionSubType : function(){
			var promotionType = this.promotionSearchCard.busCardInstance.$("promotionType").value;//促销大类
			var param = "&promotionTypeB="+promotionType;
			var promotionSubTypeList = util.ServiceFactory.getService("url:salesPromotionAction.do?method=getPromotionSubType" + param);
			promotionSubTypeList = dojo.map(promotionSubTypeList||[],function(onePromotionSubType){
				return {
					"id" : onePromotionSubType.promotionTypeId,
					"name" : onePromotionSubType.promotionTypeName
				};
			});
			if(!this.ifHasChoose(promotionSubTypeList)){
				var po={"id":"","name":"请选择"};
				promotionSubTypeList.push(po);
			}
			BusCard.$rs(this.promotionSearchCard.busCardInstance.$("promotionSubType"),promotionSubTypeList.reverse());
			this.promotionSearchCard.busCardInstance.$("promotionSubType").value = "";
		},
		
		/**
		 * 判断是否存在请选择选项
		 */
		ifHasChoose : function(list){
			return dojo.some(list||[],function(oneItem){
				return oneItem.id == "";
			});
		},
		
		/**
		 * 查询促销政策列表
		 */
		getPromotionList : function(){
			var promotionSearchCard = this.promotionSearchCard.busCardInstance;
			var promotionName = promotionSearchCard.$("promotionName").value;//促销名称
			var promotionGroup = promotionSearchCard.$("promotionGroup").value;//促销分组
			var promotionType = promotionSearchCard.$("promotionType").value;//促销大类
			var promotionSubType = promotionSearchCard.$("promotionSubType").value;//促销小类
			var promotionList = eval("("+this.loader.requestParam.promotionList+")");//目标促销集合
			promotionList = dojo.filter(promotionList||[],function(onePromotionInfo){
				return onePromotionInfo.promotionId != "" && onePromotionInfo.promotionId != 0;
			});
			if(promotionGroup){//促销分组不为空
				promotionList = dojo.filter(promotionList||[],function(onePromotionInfo){
					return onePromotionInfo.promotionGroup == promotionGroup;
				});
			}
			if(promotionType){//促销大类不为空
				promotionList = dojo.filter(promotionList||[],function(onePromotionInfo){
					return onePromotionInfo.catalogCode == promotionType;
				});
			}
			if(promotionSubType){//促销小类不为空
				promotionList = dojo.filter(promotionList||[],function(onePromotionInfo){
					return onePromotionInfo.catalogSubCode == promotionSubType;
				});
			}			
//			var selectedPromotionList = dojo.filter(promotionList||[],function(onePromotionInfo){
//				return onePromotionInfo.promotionGroup == promotionGroup && onePromotionInfo.catalogCode == promotionType && 
//						onePromotionInfo.catalogSubCode == promotionSubType;
//			});
			if(promotionName){//促销名称不为空
				promotionList = dojo.filter(promotionList||[],function(onePromotion){
					return onePromotion.promotionName.indexOf(promotionName)>=0;
				});
			}
			
			//展示过滤后的促销政策列表
			this.showSelectedPromotionList(promotionList);
		},
		
		/**
		 * 展示过滤后的促销政策列表
		 */
		showSelectedPromotionList : function(selectedPromotionList){
			if(this.showPromotionGrid){
				this.showPromotionGrid.destroy();
			}
			//初始化表格
			var cm = new BusCard.widget.grid.ColumnModel({
				metaData : this.getPromotionColumns()
			});
			
			var totalProperty = selectedPromotionList.length;
			var ds = new BusCard.widget.grid.JsonDataSource({
				loadData : function(param){
					var list = selectedPromotionList.slice(param.start,param.end);
					return  {totalProperty:totalProperty,root:list};
				}
			},cm);
			var grid = this.showPromotionGrid = new BusCardGrid({
				cm : cm,
                ds : ds,				               
                paging : true,
                pageSize : 5
			});
			dojo.place(grid.domNode,this.promotionSearchWidget.containerNode,"last");
		},
		
		/**
		 * 生成展示表格
		 */
		getPromotionColumns : function(){
			var promotionFormatter = function(value,index){
				var promotionHtml = "<div class='promotionSelect" +index+"\'>"+
        			"<input type = 'radio' id ='promotionRadio" +index+ "' name = 'promotionRadio"+
        			"' rowIndex = '"+index+"' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/promotionSelect'>" +
        			"</div>";
        		return promotionHtml;
			};
			return cm = [{
		                width : '7%',
		                name : 'promoSelect',
		                text : '选择',
		                render : promotionFormatter
	                }, {
		                width : '10%',
		                name : 'promotionId',
		                text : '促销政策标识'
	                },{
		                width : '10%',
		                name : 'promotionName',
		                text : '促销政策名称'
	                }
	        ];
		},
		
		/**
		 * 促销政策选择事件
		 */
		onPromotionSelectClick : function(rowIndex){
			var promotionInfo = this.showPromotionGrid.ds.getRawData()[rowIndex];
			this.loader.getSelectPromotionInfo(promotionInfo);
		}
	});
});