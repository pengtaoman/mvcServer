BusCard.define('/orderaccept/attrapp/attr_prod_100531.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch = function() {
	        	var Me = this;
		        var session = BusCard.$session;
		        var cityCode = BusCard.$session.homeCity;
		        BusCard.$rs(this.$('100531'), BusCard.$remote("serviceParamDAO")
		                        .getSaleregionCode(BusCard.$session.homeCity).list);
		        (function(){
		        	var belongCode = prodOfferAcceptLoader.getBelongCode();
		        	var saleRegionCode = BusCard.$remote("serviceParamDAO").getDefaultSaleRegion(belongCode);
		        	Me.$('100531').value = saleRegionCode;
		        })();

	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
			 * 综合查询页面处理分支
			 * 
			 * @method
			 */
	        var allInfoQueryPageDispatch = function() {
	        	var prodInstVO = cardParam.prodInstVO;
	        	var prodInstAttrList = prodInstVO.prodInstAttrList;
	        	var instVO = prodInstAttrList.find(function(inst) {
	                return inst.attrId == 100531;
                });
		        var cityCode = prodInstVO.cityCode;
		        var list = BusCard.$remote("serviceParamDAO")
		                        .getSaleregionCode(cityCode).list;
		        var attrValName = dojo.filter(list,function(obj){
		        	return obj.id == instVO.attrValue;
		        })[0];
		        if(attrValName){
		        	$('100531').innerHTML=attrValName.name;
		        }else{
		        	$('100531').innerHTML = instVO.attrValue;
		        }
	        };
	        /**
			 * 二次业务处理分支
			 * 
			 * @method
			 */
	        var secondBusinessPageDispatch = function() {
	            var Me=this;
		        BusCard.$rs(Me.$('100531'), BusCard.$remote("serviceParamDAO")
		                        .getSaleregionCode(BusCard.$session.homeCity).list);
		        (function(){
		            var widget = dijit.getEnclosingWidget(Me.dom);
	                var prodInstVO=widget.prodInstVO;
	                var prodInstAttrList = prodInstVO.prodInstAttrList;
	        	    var instVO = prodInstAttrList.find(function(inst) {
	                      return inst.attrId == 100531;
                        });
	                 if(instVO){
	                    Me.$('100531').value=instVO.attrValue;
	                  }
		        })();
	     
	        };
	        /**
			 * 批量页面处理分支
			 * 
			 * @method
			 */
	        var batchPageDispatch = function() {};
	        
	        // 调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
        });
