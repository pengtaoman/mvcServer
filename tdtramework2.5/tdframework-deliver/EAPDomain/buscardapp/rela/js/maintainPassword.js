BusCard.define('/buscardapp/rela/js/maintainPassword.js',function(_buscard,cardParam){ 
	var Me = this;
	var i = arguments[0];
	var h = arguments[1];
	var k = this.$("currentPassword");
	var g = this.$("password");
	var e = this.$("repeatPassword");
	Me.oldPassWord="";
	//var f = this.$("passwordLevel");
	var citycode=h.cityCode;
	var servicekind=h.serviceRelation.serviceKind;
	var flag=0;
	//f.value = "3";
	var executeRequest = _buscard.executeRequest;
	Me.$("label_passwordReset").style.visibility = "hidden";
		
		
	k.onblur = function () {
		var b = k.value;
		if (b == "") {
			return false;
		}
		var a = h.serviceRelation.password;
		if (b != a) {
			alert("\u60a8\u8f93\u5165\u7684\u5f53\u524d\u5bc6\u7801\u6709\u8bef\uff0c\u8bf7\u786e\u8ba4\u540e\u518d\u8bd5\uff01");
			k.value = "";
			k.focus();
			return false;
		}
		return true;
	};
	g.onkeypress = function () {
		//c();
	};
	g.onblur = function () {
//		if (!j(g)) {
//			return;
//		}
		//l(g, e);
	  Me.easyPwdCheck();
	};
	e.onkeypress = function () {
		//c();
	};
	e.onblur = function () {
//		if (!j(e)) {
//			return;
//		}
		l2(g, e);
	};
	var c = function () {
		if (!(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) || (window.event.keyCode == 13))) {
			window.event.keyCode = 0;
		}
	};
	var j = function (p) {
		var s = p.value;
		if (s == "") {
			return false;
		}
		var m = s.charAt(0);
		var n = parseInt(m);
		var a = parseInt(m);
		var t = m;
		var r = m;
		var q = n + "" + n + "" + n + "" + n + "" + n + "" + n;
		for (var o = 0; o < 5; o++) {
			if (n != 9) {
				n = n + 1;
				t = t + "" + n;
			}
			if (a != 0) {
				a = a - 1;
				r = r + "" + a;
			}
		}
		if (s == q || s == t || s == r) {
			alert("\u60a8\u7684\u5bc6\u7801\u8fc7\u4e8e\u7b80\u5355\uff0c\u8bf7\u91cd\u65b0\u8bbe\u7f6e6\u4f4d\u4e0d\u89c4\u5219\u5bc6\u7801!\n\u7b80\u5355\u5bc6\u7801\u6307\uff1a6\u4f4d\u5bc6\u7801\u4e00\u6837\uff0c6\u4f4d\u5bc6\u7801\u9012\u589e\uff0c6\u4f4d\u5bc6\u7801\u9012\u51cf\uff0c\u5982'111111,123456,654321'!");
			return true;
		}
		return true;
	};
	var l = function (a, m) {
		var b = window.event;
		if (b) {
			b = b.srcElement;
		}
		if (b && b.value != "" && b.value.length < 6) {
			alert("\u5bc6\u7801\u5fc5\u987b\u662f6\u4f4d\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165!");
			b.value = "";
			b.focus();
			return false;
		}
		if(b && b.value){
		jsCommon.checkEasyPassword(b);
		}
		if (a && m && a.value != "" && m.value != "" && a.value != m.value) {
			alert("\u5bc6\u7801\u8f93\u5165\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165!");
			m.value = "";
			m.focus();
			return false;
		}
		return true;
	};
	var l2 = function (a, m) {
		if (a && m && a.value != "" && m.value != "" && a.value != m.value) {
			alert("\u5bc6\u7801\u8f93\u5165\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165!");
			m.value = "";
			m.focus();
			return false;
		}
		return true;
	};
	
		//控制显示红*
	Me.initElement=function(id){
		var requestedSpanElem = document.createElement("span");
		requestedSpanElem.id="currentPasswordId";
		requestedSpanElem.innerHTML="*";
		requestedSpanElem.className = "formRequested";
		this.$("label_"+id).getElementsByTagName("span")[0].appendChild(requestedSpanElem);
		//	this.$("label_newCardNum").getElementsByTagName("span")[0].appendChild(requestedSpanElem);	
	}
	Me.initElement("currentPassword");
	//getdata前回调
	this.addPreDataBuilderAspect(function(_buscard,param){
		var currentPassword= Me.$("currentPassword").value;
		if(flag==0){
			if(currentPassword==""){
				alert("\u5f53\u524d\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a");
				return false;				
			}
		}else{
			return true;
		}

	});
	Me.$("passwordType").onchange=function(){
	        Me.$('currentPassword').value="";
		    Me.$('password').value="";
		    Me.$('repeatPassword').value="";
		    if(Me.$("passwordType").value==2){
		       $("doSaveOrderBtn").value="\u53d7\u7406\u5b8c\u6210";
		    }else{
		       $("doSaveOrderBtn").value="\u4fdd\u5b58/\u9884\u7b97";
		    }
		    
	}
	Me.easyPwdCheck = function(){ 
	  var pwdObj=Me.$('password');
	  var serviceId=h.serviceRelation.serviceId;
	  if(pwdObj.value!=""){
	     WeakPwdCheck.weakPwdCheck(pwdObj,serviceId);	
	  }
    };

	
	
	Me.queryPassword=function(){
		var passwordType= Me.$("passwordType").value;
		var parameter="passwordType="+passwordType+"&servicekind="+servicekind+"&cityCode="+citycode;	
		var resultJsonStr = executeRequest("secondAcceptAjaxAction", "getDefaultPassword", parameter);
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj ) {
				var password;
				password = jsonResultObj.password;
				Me.$("password").value=password;
				Me.$("repeatPassword").value=password;
				Me.$("password").onblur=null;
				Me.$("repeatPassword").onblur=null;
				
			}
		}
		catch (e) {
			alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
			return false;
		}
	}
	
	//密码检查
	Me.$("currentPassword").onblur=function(){
		 if(Me.$("currentPassword").value!=""){
			 Me.getOldPass();
			  var currentPassWord=Me.$("currentPassword").value;
			   if(Me.oldPassWord!=currentPassWord){
			      alert("\u539f\u5bc6\u7801\u8f93\u5165\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165");
			      Me.$("currentPassword").value="";
			      Me.$("currentPassword").focus();
			      return false;
			   }
		 }
	
	}
	Me.getOldPass=function(){
	        var passType=Me.$("passwordType").value;
			  var queryValue;
				  if(Me.$("passwordType").value==1){//用户密码
				      queryValue=h.serviceRelation.userId
				  }else if(Me.$("passwordType").value==2){//客户密码
				      queryValue=h.serviceRelation.customerId;
				  }/*else{//账户密码
				       queryValue=h.serviceRelation.userId
				  }*/
			  var cityCode=h.serviceRelation.cityCode;
			  var accNbr=h.serviceRelation.serviceId;
			  var passWord=BusCard.$remote("secondAcceptCommBO") .getPassWord(passType,queryValue,cityCode,accNbr);	  
	              Me.oldPassWord=eval(passWord);
	
	}
	
	
	
	 BusCard.addEventListener(Me.$("password"), 'blur', function() {
		   if(Me.oldPassWord==""){
		       Me.getOldPass();
		   }
		   if(Me.$("password").value!=""&&Me.$("password").value==Me.oldPassWord){
		          alert("\u65b0\u5bc6\u7801\u548c\u539f\u5bc6\u7801\u76f8\u540c\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u3002");
				  Me.$("password").value="";
			      Me.$("password").focus();
			      return false;
			}
		});
	 BusCard.addEventListener(Me.$("repeatPassword"), 'blur', function() {
	       if(Me.oldPassWord==""){
		       Me.getOldPass();
		   }
		   if(Me.$("repeatPassword").value!=""&&Me.$("repeatPassword").value==Me.oldPassWord){
		          alert("\u65b0\u5bc6\u7801\u548c\u539f\u5bc6\u7801\u76f8\u540c\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u3002");
				  Me.$("repeatPassword").value="";
			      Me.$("repeatPassword").focus();
			      return false;
			}
		});
	
	//如果用户点击密码重置，将查询出来的默认密码赋值给新密码和确认密码。当前密码应该不为必填项。	
	Me.$("passwordReset").onclick = function(){
		Me.queryPassword();
		Me.$("currentPasswordId").style.display="none";
		Me.$("password").readOnly=true;
		Me.$("repeatPassword").readOnly=true;
		flag=1;
	}
	
});
