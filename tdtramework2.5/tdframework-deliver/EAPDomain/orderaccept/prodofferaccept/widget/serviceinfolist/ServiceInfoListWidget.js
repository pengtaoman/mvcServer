defineModule("orderaccept.prodofferaccept.widget.serviceinfolist.ServiceInfoListWidget", [
                "orderaccept.custom.TooltipDialog"], function(TooltipDialog) {
	        
	        /**
			 * 服务号码对应的widget
			 * 
			 * @class
			 * @requires ["orderaccept.custom.TooltipDialog"]
			 * @module orderaccept.prodofferaccept.widget.subprodoffernum.SubProdOfferNumWidget
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.serviceinfolist.ServiceInfoListWidget", [TooltipDialog], {
	        	constructor : function(){
		        	this.inherited(arguments);	        	
	        		this.productId = arguments[0].productId;
	        		this.cityCode = arguments[0].cityCode;
	        		this.customerId = arguments[0].customerId;
	        		this.uniqueId = arguments[0].uniqueId;
	        	},	        	
		        postscript : function(){
		        	this.inherited(arguments);
		        	this.initChooseNumberTable();
		        },
		        /**
		         * 初始化表格
		         */
		        initChooseNumberTable : function(){
			        var widget = this,			        
			       		cm = new BusCard.widget.grid.ColumnModel({
				                metaData : this.getServiceInfoColumns()
			                }),
			            totalProperty = BusCard.$remote("secondAcceptCommBO").getServiceInfoCountByCustomerIdAndProdId(widget.customerId,widget.cityCode,widget.productId),
			            ds = new BusCard.widget.grid.JsonDataSource({
			           	 	loadData:function(param){
			            		var list =  BusCard.$remote("secondAcceptCommBO").getServiceInfoConversionByCustomerIdAndProdId(widget.customerId, widget.cityCode,widget.productId, param.start, param.end);
			           	 		return  {totalProperty:totalProperty,root:list};
			           		 }
			            }, cm); 
						var subProdOfferOrderGrid = new orderaccept.custom.BusCardGrid({
				                cm : cm,
				                ds : ds,
				                paging:true,
				                pageSize:5
			            }, this.containerNode);

		        },
		        getServiceInfoColumns : function() {
		        	var widget = this;
			        return cm = [{
			        			width: '15%',
			        			text : '选择',
			        			name:'checkService',
			        			render:function(value,index,record){
			        					var serviceId = record.getByName("serviceId");
			        					var prodOfferInstId = record.getByName("prodOfferInstId");
			        					var userId = record.getByName("userId");
			        				 	var serviceKind = record.getByName("serviceKind");
			        				 	var interpretedTemplate = BusCard.Template.create("<input type = 'radio' productUniqueId='${uniqueId}'  prodOfferInstId = '${prodOfferInstId}' cityCode='${cityCode}' serviceKind='${serviceKind}' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/oldnumberselect' serviceId='${serviceId}' userId='${userId}'/>").apply(
			        				  {serviceId:serviceId,prodOfferInstId:prodOfferInstId,cityCode:widget.cityCode,serviceKind:serviceKind,userId:userId,uniqueId:widget.uniqueId}
			        				  );
			        				  return interpretedTemplate;
			        			
			        			}
			        			 
			        			
			        		},{
				                cssStyle : 'width:80px',
				                text : '实例编号',
								name : 'userId'
			                },{
				                cssStyle : 'width:180px',
				                text : '产品名称',
				                name : 'productName'
			                },{
				                cssStyle : 'width:100px',
				                text : '入网时间',
				                name : 'applyStartDate'
			                },{
				                cssStyle : 'width:100px',
				                text : '产品接入号码',
				                name : 'serviceId'
			                },{
				                cssStyle : 'width:60px',
				                text : '服务状态',
				                name : 'servingStatusName'
			                },{
			                   text:'',
			                   name:'prodOfferInstId',
			                   cssStyle:'display:none'
			                },{
			                   text:'',
			                   name:'serviceKind',
			                   cssStyle:'display:none'
			                  }
			                ];
		        }
	        });
	        
        });