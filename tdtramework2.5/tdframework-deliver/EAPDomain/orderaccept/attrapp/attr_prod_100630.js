BusCard.define('/orderaccept/attrapp/attr_prod_100630.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch = function() {
		        // 见orderaccept/attrapp/attr_prod_100625.js处理逻辑
		        // modify 处理netType!=54的
		        var widget = dijit.getEnclosingWidget(this.dom),
			        productInfoVO = widget.productInfoVO,
			        unshiftNullSelectOption = function(list) {
				        return [{
					                name : '\u8bf7\u9009\u62e9',
					                id : '',
					                ids : ''
				                }].concat(list || []);
			        };
		        if (productInfoVO.netType == 54) { return false; }
		        var Me = this;
		        var cityChange = function() {
			        if (!!Me.$("100629")) {
				        var provId = Me.$("100629").value;
				        var indbCityList = BusCard.$remote("customerParamBO").getIndbCity(provId);
				        BusCard.$rs(Me.$("100630"), unshiftNullSelectOption(indbCityList.list), true);
				        
			        }
		        };
		        
		        if (!!Me.$("100629")) {
			        Me.$("100629").onchange = cityChange;
			        var nullSelectedOption = document.createElement("option");
			        nullSelectedOption.value = "";
			        nullSelectedOption.text = "\u8bf7\u9009\u62e9";
			        Me.$("100629").options.add(nullSelectedOption);
			        Me.$("100629").value = "";
		        }
		        cityChange();
		        
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
			 * 综合查询页面处理分支
			 * 
			 * @method
			 */
	        var allInfoQueryPageDispatch = function() {};
	        /**
			 * 二次业务处理分支
			 * 
			 * @method
			 */
	        var secondBusinessPageDispatch = function() {
	        var widget = dijit.getEnclosingWidget(this.dom),
			        productInfoVO = widget.productInfoVO,
			        unshiftNullSelectOption = function(list) {
				        return [{
					                name : '\u8bf7\u9009\u62e9',
					                id : '',
					                ids : ''
				                }].concat(list || []);
			        };
		        if (productInfoVO.netType == 54) { return false; }
		        var Me = this;
		        var cityChange = function() {
			        if (!!Me.$("100629")) {
				        var provId = Me.$("100629").value;
				        var indbCityList = BusCard.$remote("customerParamBO").getIndbCity(provId);
				        BusCard.$rs(Me.$("100630"), unshiftNullSelectOption(indbCityList.list), true);
				        
			        }
		        };
		        
		        if (!!Me.$("100629")) {
			        Me.$("100629").onchange = cityChange;
			        var nullSelectedOption = document.createElement("option");
			        nullSelectedOption.value = "";
			        nullSelectedOption.text = "\u8bf7\u9009\u62e9";
			        Me.$("100629").options.add(nullSelectedOption);
			        Me.$("100629").value = "";
		        }
		        cityChange();  
		        //获得实例属性值
		         var prodInstVO=widget.prodInstVO;
	             var prodInstAttrList = prodInstVO.prodInstAttrList;
	        	 var getAttrValue=function(id){
	       	 		   var instVO=prodInstAttrList.find(function(inst) {
	                     return inst.attrId == id;
                      });
                       return instVO;
                  };
                if(getAttrValue('100629')){
                   Me.$('100629').value=getAttrValue('100629').attrValue;
                }
                 if(getAttrValue('100630')){
                   Me.$('100630').value=getAttrValue('100630').attrValue;
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
