BusCard.define('/orderaccept/attrapp/attr_prod_200020.js',function(_buscard,cardParam){	
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;	
	  //���紫������Ϊ�ܻ�+�ֻ�ģʽ��ʱ����õķ���
    Me.totalModel=function(){
        if(Me.$("200071")){
	    	Me.$("200071").disabled = false;
	    }
		if(Me.$("200001")){
			Me.$("200001").disabled = false;
		}
	    if(!!Me.$("200071").getAttribute("isnull")){
	        if(Me.$("200071").getAttribute("isnull")=="1"){
	        	Me.$("200071").setAttribute("isnull","0");
				dojo.place("<span class=\"formRequested\">*</span>"+"\u5206\u673a\u53f7\u7801\u957f\u5ea6\uff1a",Me.$("label_200071"),"only");
	        }
		 }
		if(!!Me.$("200001").getAttribute("isnull")){
			if(Me.$("200001").getAttribute("isnull")=="1"){
				Me.$("200001").setAttribute("isnull","0");
				dojo.place("<span class=\"formRequested\">*</span>"+"\u603b\u673a\u53f7\u7801\uff1a",Me.$("label_200001"),"only");
			}
		 }
    }	
	if(Me.$("200020").value=="1"){
	    if(!!Me.$("200001")&&(!!Me.$("200071"))){
	    	Me.totalModel();
	    }
	}else{
	    if(Me.$("200071")){
	    	Me.$("200071").disabled = true;
	    	 if(Me.$("200071").getAttribute("isnull")=="0"){
	        	Me.$("200071").setAttribute("isnull","1");
	        	dojo.place("<span>\u5206\u673a\u53f7\u7801\u957f\u5ea6\uff1a</span>",Me.$("label_200071"),"only");
	         }
	    }
		if(Me.$("200001")){
			Me.$("200001").disabled = true;
			 if(Me.$("200001").getAttribute("isnull")=="0"){
	        	Me.$("200001").setAttribute("isnull","1");
	        	dojo.place("<span>\u603b\u673a\u53f7\u7801\uff1a</span>",Me.$("label_200001"),"only");
	         }
		}
	}
	Me.$("200020").onchange=function(){
		if(Me.$("200020").value=="1"){
			if(!!Me.$("200001")&&(!!Me.$("200071"))){
				Me.totalModel();
			}
		}else{
			if(Me.$("200071")){
		    	Me.$("200071").disabled = true;
		    	if(Me.$("200071").getAttribute("isnull")=="0"){
		        	Me.$("200071").setAttribute("isnull","1");
		        	dojo.place("<span>\u5206\u673a\u53f7\u7801\u957f\u5ea6\uff1a</span>",Me.$("label_200071"),"only");
	         	}
		    }
			if(Me.$("200001")){
				Me.$("200001").disabled = true;
				 if(Me.$("200001").getAttribute("isnull")=="0"){
		        	Me.$("200001").setAttribute("isnull","1");
		        	dojo.place("<span>\u603b\u673a\u53f7\u7801\uff1a</span>",Me.$("label_200001"),"only");
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
