  BusCard.define('/buscardapp/rela/js/getProductAttr.js', function(_buscard, cardParam) {
	  
	        var productId = cardParam.productId;
	        
	        //var prodInstId = cardParam.prodInstId;
	        
	        var productInfoVO = BusCard.$remote("innerInterfaceBO").getProductInfo({productId:parseInt(productId.toString()),interfaceType:'1'});
	        
	        alert(productInfoVO.productId);
	        
	        dojo.require("orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget");
	        var productAttrCardWidget = 
	        	new orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget({productInfoVO:productInfoVO});
	        
//	        //��Ʒ���Իص�	
//	        productAttrCardWidget.addCardCallback(function(){
//	        	
//		         var card = this.busCardInstance;
//		         
//		         //var AttrVOList = BusCard.$remote("innerInterfaceBO").getProductAttrList({productId:parseInt(productId.toString())});
//		         var AttrVOList = productInfoVO.attrList;
//		         
//		         var attrInstList = BusCard.$remote("prodInstAttrBO").getProdInstAttrByInstId({prodInstId:parseInt(prodInstId.toString())});
//	
//		         //����card��ȥ������ʾ���������
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
//		         var value = {};//��ʼ������map
//		         
//		         dojo.forEach(attrInstList, function(attrInst){
//		        	 value[attrInst.attrCd] =attrInst.attrValue; 
//		         });
//		         
//		         card.renderDefaultValue(value);
//		         card.$("");
//	        
//	        });
	        
	        //��Ʒ������Ⱦ
	        productAttrCardWidget.renderCard($("prodAttrCardContainer"),"first");
	        
	        
        });