defineModule("orderaccept.prodofferaccept.behavior.PromotionChangeBehavior", ["../util"],
        function(util,ProductAttrCardWidget) {
	        
	        /**
			 * 对促销政策变更页面的行为做统一封装
			 * 
			 * @class
			 * 
			 */
	        dojo.declare("orderaccept.prodofferaccept.behavior.PromotionChangeBehavior", [], {
		        controller : null,
		        /**
				 * @type Array
				 */
		        handleRegistry : null,
		        constructor : function(controller) {
			        this.controller = controller;
			        this.handleRegistry = [];
		        },
		        postscript : function() {
			        this.subscribe();
		        },
		        /**
				 * 订阅各种消息
				 * 
				 * @method
				 */
		        subscribe : function() {
			        var behavior = this;
			        var controller = this.controller;
			        // 促销政策组更换事件
			        this.handleRegistry.push(dojo.subscribe("/promotionGroup/change", function(evt) {
				                return behavior.onPromotionGroupChange(evt);
			                }));
			        // 监听促销政策名称搜索按键事件
			        this.handleRegistry.push(dojo.subscribe("/promotionName/keyup", function() {
				                behavior.onPromotionNameSearchKeyup.apply(behavior, arguments);
			                }));
			         // 监听促销政策名称搜索框获得焦点事件
			        this.handleRegistry.push(dojo.subscribe("/promotionName/focus",function(){
			        		  behavior.onPromotionNameSearchFocus.apply(behavior, arguments); 
			        	}));
			        // 监听促销政策名称搜索框获得失去事件
			        this.handleRegistry.push(dojo.subscribe("/promotionName/blur",function(){
			        		  behavior.onPromotionNameSearchBlur.apply(behavior, arguments); 
			        	}));
			        // 促销政策更换事件
			        this.handleRegistry.push(dojo.subscribe("/promotionInfo/change", function(evt) {
				                return behavior.onPromotionInfoChange(evt);
			                }));
			        //促销政策查询
			        this.handleRegistry.push(dojo.subscribe("/promotionSearchBtn/click",function(evt){
			        	behavior.onPromotionSearchClick(evt);
			        }));
			        //促销政策列表选择
			        this.handleRegistry.push(dojo.subscribe("/promotionSelect/click",function(evt){
			        	behavior.onPromotionSelectClick(evt);
			        }));
		        },
		        /**
		         * 促销政策组更换事件
		         */
		        onPromotionGroupChange : function() {
		        	var behavior = this;
		        	var controller = this.controller;
		        	var promotionGroup = dojo.byId("promotion-group").value;
                	var promotionList =this.controller.requestParam.promotionList;
                	var promotionNamevalueCache = dojo.attr(dojo.byId("promotion-name"),'valueCache');
                	var promotionName = BusCard.native2ascii(dojo.trim(dojo.byId("promotion-name").value).toLowerCase());
                	var resultData = dojo.map(dojo.filter(dojo.fromJson(promotionList)||[], function(promotion){
                			if(promotionNamevalueCache){
                				return promotion.promotionGroup != promotionGroup && BusCard.native2ascii
                						(promotion.promotionName.toLowerCase()).indexOf(promotionName)>-1; 
                			}else{
                				return promotion.promotionGroup != promotionGroup;
                			}
        				}), function(promotion) {
				        return {
					        id : promotion.promotionId,
					        name : promotion.promotionName
				        };
			        });
                	BusCard.$rs(dojo.byId("promotion-info"),resultData);
                	behavior.onPromotionInfoChange();
		        },
		        /**
				 * 促销政策名称搜索按键事件
				 * 
				 */
		        onPromotionNameSearchKeyup : function(event) {
		        	var behavior = this;
		        	var controller = this.controller;
			        if (event.keyCode == 13) {
				        var promotionName = BusCard.native2ascii(dojo.trim(event.currentTarget.value).toLowerCase());
				        var promotionGroup = dojo.byId("promotion-group").value;
				        if (promotionName) {
				        	var promotionList =this.controller.requestParam.promotionList;
		                	var resultData = dojo.map(dojo.filter(dojo.fromJson(promotionList)||[], function(promotion){
		                			if(promotionGroup){
		                				return promotion.promotionGroup != promotionGroup && BusCard.native2ascii
                						(promotion.promotionName.toLowerCase()).indexOf(promotionName)>-1; 
		                			}else{
		                				return BusCard.native2ascii(promotion.promotionName.toLowerCase()).indexOf(promotionName)>-1;
		                			}
		        				}), function(promotion) {
						        return {
							        id : promotion.promotionId,
							        name : promotion.promotionName
						        };
					        });
		                	BusCard.$rs(dojo.byId("promotion-info"),resultData);
		                	behavior.onPromotionInfoChange();
				        }
			        }
			        var promotionInfo = dojo.byId("promotion-info").value;
                	if(!promotionInfo){
                		controller.destroyPromotionChangeWidget();
                	}
		        },
		        /**
		        * 促销政策名称搜索框获得焦点触发事件	
		        *
		        */
		        onPromotionNameSearchFocus : function (event){
		        	var currentTarget = event.currentTarget;
       				     currentTarget.value  = dojo.attr(currentTarget,'valueCache');
       				 //光标始终在文字最后
       				 if(currentTarget.createTextRange) { // IE              
        					var r = currentTarget.createTextRange();
      						 r.moveStart('character',currentTarget.value.length);
       						 r.collapse(true);
      						 r.select();
    				 } else if(typeof currentTarget.selectionStart == 'number') { // Firefox 
        					 currentTarget.setSelectionRange(currentTarget.value.length, currentTarget.value.length);
    				 }	 
      				 currentTarget.style.color="#000000";
		        },
		        /**
		        * 促销政策名称搜索框失去焦点触发事件	
		        *
		        */
		        onPromotionNameSearchBlur : function (event){
		        	var currentTarget = event.currentTarget;
    				if(currentTarget.value==""){
            			dojo.attr(currentTarget,'valueCache',"");
            			currentTarget.value=dojo.attr(currentTarget,'tips');
            			currentTarget.style.color="#cccccc";
        			}else{
            			dojo.attr(currentTarget,'valueCache',currentTarget.value);
    				}
		        },
		        /**
		         * 促销政策更换事件
		         */
		        onPromotionInfoChange : function() {
			        var controller = this.controller;
			        var promotionId = dojo.byId("promotion-info").value;
			        if(promotionId){
			        	controller.renderPromotionWidget(promotionId);
			        }else{
			        	controller.destroyPromotionChangeWidget();
			        }
		        },
		        destroy : function() {
			        dojo.forEach(this.handleRegistry, function(handle) {
				                dojo.unsubscribe(handle);
			                });
			        while (this.handleRegistry.length) {
				        this.handleRegistry.pop();
			        }
		        },
		        
		        /**
		         * 促销政策查询
		         */
		        onPromotionSearchClick : function(event){
		        	var promotionSearchBuilderObj = this.controller.promotionSearchBuilderObj;
		        	promotionSearchBuilderObj.getPromotionList();
		        },
		        
		        /**
		         * 促销政策选择
		         */
		        onPromotionSelectClick : function(event){
		        	var rowIndex = event.currentTarget.getAttribute("rowIndex");
		        	var promotionSearchBuilderObj = this.controller.promotionSearchBuilderObj;
		        	promotionSearchBuilderObj.onPromotionSelectClick(rowIndex);
		        }
	        });
        });