BusCard.define('/orderaccept/attrapp/attr_prod_100830.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch = function() {
		        var session = BusCard.$session;
		        var cityCode = BusCard.$session.homeCity;
		        BusCard.$rs(this.$('100830'), BusCard.$remote("serviceParamDAO")
		                        .getSaleInnetMethod(BusCard.$session.homeCity).list);
		        
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
	                return inst.attrId == 100830;
                });
		        var cityCode = prodInstVO.cityCode;
		        var list = BusCard.$remote("serviceParamDAO")
		                        .getSaleInnetMethod(cityCode).list;
		        var attrValName = dojo.filter(list,function(obj){
		        	return obj.id == instVO.attrValue;
		        })[0];
		        if(attrValName){
		        	$('100830').innerHTML=attrValName.name;
		        }else{
		        	$('100830').innerHTML = instVO.attrValue;
		        }
	        };
	        /**
			 * 二次业务处理分支
			 * 
			 * @method
			 */
	        var secondBusinessPageDispatch = function() {
	            var Me=this;
	            
	             prodOfferAcceptPageDispatch.apply(this,arguments);
	             var widget = dijit.getEnclosingWidget(Me.dom);
	             var prodInstVO=widget.prodInstVO;
	             var prodInstAttrList = prodInstVO.prodInstAttrList;
	        	 var instVO = prodInstAttrList.find(function(inst) {
	                  return inst.attrId == 100830;
                  });
                  if(!!instVO){
                 	Me.$('100830').value=instVO.attrValue;
                  }
	     
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
