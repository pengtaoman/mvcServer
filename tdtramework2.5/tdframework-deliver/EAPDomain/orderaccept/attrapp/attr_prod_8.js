BusCard.define('/orderaccept/attrapp/attr_prod_8.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me=this;
	        	Me.$("8").disabled=true;
	        	if(Me.$("8").value==""){
	        		 resultVO = BusCard.$remote("sequenceGeneratorBO").doGenerateId({name:"bbQqyjkd58IdSeq"});
	        		 Me.$("8").value = resultVO.idValue;
	        	}
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {
	        };
	        /**
	         * 二次业务处理分支
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {};
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {	        	
	        	var Me=this;
	        	Me.$("8").disabled=true;
	        	if(Me.$("8").value==""){
	        		resultVO = BusCard.$remote("sequenceGeneratorBO").doGenerateId({name:"bbQqyjkd58IdSeq"});
	        		Me.$("8").value = resultVO.idValue;
	        	}
	        
	        };
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
        });
