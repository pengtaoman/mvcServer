BusCard.define('/orderaccept/attrapp/attr_prod_200029.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;

	Me.checkNumber=function(object){
		if(!/^\+?[1-9][0-9]*$/i.test(object.value)){
		    alert("\u8bf7\u8f93\u5165\u5927\u4e8e\u96f6\u7684\u6570\u5b57");
			object.value="";
		}
	}

	Me.$("200029").onblur=function(){
		if(!/^([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){2}([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/i.test(Me.$("200029").value)
			&&Me.$("200029").value!=""){
			alert("\u0049\u0050\u5730\u5740\u4e0d\u5408\u6cd5");
			Me.$("200029").value="";
		}
	}

	Me.$("200126").onblur=function(){
		if(!/^([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){2}([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/i.test(Me.$("200126").value)
			&&Me.$("200126").value!=""){
			alert("\u0049\u0050\u5730\u5740\u4e0d\u5408\u6cd5");
			Me.$("200126").value="";
		}
	}
	Me.$("link_200126").onclick=function(){
		var ipUse = Me.getIpUse(Me.$("200043").value,Me.$("200052"));
		var ip = BusCard.$remote("serviceParamDAO").getIp(ipUse);
		Me.$("200126").value = eval(ip);
	}
	Me.getIpUse = function(a,b){
		if(b==2){
			return 13;
		}else{
			return a==2?12:11;
		}
	}
	Me.$("200030").onblur=function(){
		Me.checkNumber(Me.$("200030"));
	}

	Me.$("200053").onblur=function(){
		Me.checkNumber(Me.$("200053"));
	}

	Me.$("200007").onblur=function(){
		Me.checkNumber(Me.$("200007"));
	}

	Me.$("200114").onblur=function(){
		Me.checkNumber(Me.$("200114"));
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
