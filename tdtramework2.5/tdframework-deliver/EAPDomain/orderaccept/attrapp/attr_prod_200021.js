BusCard.define('/orderaccept/attrapp/attr_prod_200021.js',function(_buscard,cardParam){	
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;	
	//集团vpn接入方式改变时进行的操作
    Me.vpnModeOper=function(){
//	    if(!!Me.$("200155").getAttribute("isnull")){
//	        if(Me.$("200155").getAttribute("isnull")=="1"){
//	        	Me.$("200155").setAttribute("isnull","0");
//				dojo.place("<span class=\"formRequested\">*</span>"+"\u0031\u0039\u0030\u0056\u0050\u004e\u0020\u0069\u0070\u5730\u5740\uff1a",Me.$("label_200155"),"only");
//	        }
//		 }
		if(!!Me.$("200045").getAttribute("isnull")){
			if(Me.$("200045").getAttribute("isnull")=="1"){
				Me.$("200045").setAttribute("isnull","0");
				dojo.place("<span class=\"formRequested\">*</span>"+"\u7535\u8def\u4ee3\u7801\uff1a",Me.$("label_200045"),"only");
			}
		 }
    }	
	if(Me.$("200021").value=="2"){
//	    if(!!Me.$("200155")&&(!!Me.$("200045"))){
	    if(!!Me.$("200045")){	
	    	Me.vpnModeOper();
	    }
	}else{
//	    if(Me.$("200155")){
//	    	 if(Me.$("200155").getAttribute("isnull")=="0"){
//	        	Me.$("200155").setAttribute("isnull","1");
//	        	dojo.place("<span>\u0031\u0039\u0030\u0056\u0050\u004e\u0020\u0069\u0070\u5730\u5740\uff1a</span>",Me.$("label_200155"),"only");
//	         }
//	    }
		if(Me.$("200045")){
			 if(Me.$("200045").getAttribute("isnull")=="0"){
	        	Me.$("200045").setAttribute("isnull","1");
	        	dojo.place("<span>\u7535\u8def\u4ee3\u7801\uff1a</span>",Me.$("label_200045"),"only");
	         }
		}
	}
	Me.$("200021").onchange=function(){
		if(Me.$("200021").value=="2"){
//		    if(!!Me.$("200155")&&(!!Me.$("200045"))){
			if(!!Me.$("200045")){
		    	Me.vpnModeOper();
		    }
		}else{
//		    if(Me.$("200155")){
//		    	 if(Me.$("200155").getAttribute("isnull")=="0"){
//		        	Me.$("200155").setAttribute("isnull","1");
//		        	dojo.place("<span>\u0031\u0039\u0030\u0056\u0050\u004e\u0020\u0069\u0070\u5730\u5740\uff1a</span>",Me.$("label_200155"),"only");
//		         }
//		    }
			if(Me.$("200045")){
				 if(Me.$("200045").getAttribute("isnull")=="0"){
		        	Me.$("200045").setAttribute("isnull","1");
		        	dojo.place("<span>\u7535\u8def\u4ee3\u7801\uff1a</span>",Me.$("label_200045"),"only");
		         }
			}
		}
	} 
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {};
	        /**
	         * 二次业务处理分支
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {};
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
