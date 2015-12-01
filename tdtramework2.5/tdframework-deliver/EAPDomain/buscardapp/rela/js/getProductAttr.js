  BusCard.define('/buscardapp/rela/js/getProductAttr.js', function(_buscard, cardParam) {
	  
	        var productId = cardParam.productId;
	        
	        //var prodInstId = cardParam.prodInstId;
	        
	        var productInfoVO = BusCard.$remote("innerInterfaceBO").getProductInfo({productId:parseInt(productId.toString()),interfaceType:'1'});
	        
	        alert(productInfoVO.productId);
	        
	        dojo.require("orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget");
	        var productAttrCardWidget = 
	        	new orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget({productInfoVO:productInfoVO});
	        
//	        //产品属性回调	
//	        productAttrCardWidget.addCardCallback(function(){
//	        	
//		         var card = this.busCardInstance;
//		         
//		         //var AttrVOList = BusCard.$remote("innerInterfaceBO").getProductAttrList({productId:parseInt(productId.toString())});
//		         var AttrVOList = productInfoVO.attrList;
//		         
//		         var attrInstList = BusCard.$remote("prodInstAttrBO").getProdInstAttrByInstId({prodInstId:parseInt(prodInstId.toString())});
//	
//		         //遍历card，去掉不显示项，配置属性
//		         var attrShowData = dojo.map(attrInstList, function(attrInst){
//		        	 return BusCard.find(AttrVOList, function(AttrVO){
//		        		 return AttrVO.attrCd ==attrInst.attrCd; 
//		        	 });
//		         });
//		         
//		         productInfoVO.attrList = attrShowData;
//		         
//		         var productAttrCardWidget = 
//			        	new orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget({productInfoVO:productInfoVO});
//		         
//		         var value = {};//初始化数据map
//		         
//		         dojo.forEach(attrInstList, function(attrInst){
//		        	 value[attrInst.attrCd] =attrInst.attrValue; 
//		         });
//		         
//		         card.renderDefaultValue(value);
//		         card.$("");
//	        
//	        });
	        
	        //产品属性渲染
	        productAttrCardWidget.renderCard($("prodAttrCardContainer"),"first");
	        
	        
        });