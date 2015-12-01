<%@ page contentType="text/html; charset=GBK"%>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
//String path=EAPConfigHelper.getContextPath(request);
String message = NullProcessUtil.nvlToString((String) request.getAttribute("alertMsg"),"");
String messageDL = NullProcessUtil.nvlToString((String) request.getAttribute("alertMsgDL"),"");
String helpUri = request.getContextPath() + "/tdframework/mainframe/setting.html";
java.util.Properties properties = (java.util.Properties)request.getSession().getServletContext().getAttribute("ENVCONF");
String mobileFlag = (String)properties.getProperty("td.usemobilevalidate.flag");
String mobileEffTime = (String)properties.getProperty("td.mobilevalidate.effective.time");
String mobiErr = NullProcessUtil.nvlToString((String) request.getAttribute("mobiErr"),"");

String isLogOut = (String)request.getParameter("logout");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<%@page import="java.util.Properties"%>
<html style="overflow-y:hidden;overflow-x:hidden;">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB2312">
<title>欢迎登录 中国电信 BSS系统</title>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<link rel="stylesheet" href="<%=path%>/common/dx20/css/login_style.css"
	type="text/css" />
<link rel="stylesheet" id="themeStyles"
	href="<%=path%>/unieap/ria3.3/dijit/themes/claro/claro.css">

<script type="text/javascript"
	src="<%=path%>/tdframework/mainframe/js/login.js"></script>
<script type="text/javascript">
dojo.require("dojo.cookie");
dojo.require("dijit.dijit"); // optimize: load dijit layer
dojo.require("dijit.Tooltip");
dojo.require("dijit.TooltipDialog");
dojo.require("dijit.form.DropDownButton");



dojo.addOnLoad(function(){

<%if ("1".equals(isLogOut)) {%>
    dojo.cookie("USER_LOG_TEMP_VALUE", "");
	dojo.cookie("USER_LOG_TEMP_PSW_VALUE", "");
	dojo.byId("j_username").focus();
	return false;
<%}%>
       dojo.byId("vCodeDivImg").style.visibility='hidden';
       
       if (dojo.cookie("USER_LOG_TEMP_VALUE") == null) {
           dojo.byId("j_username").value="";
       } else {
           dojo.byId("j_username").value=dojo.cookie("USER_LOG_TEMP_VALUE");
           //alert("cookkie  j_username: " + dojo.byId("j_username").value);
       }
       
       if (dojo.cookie("USER_LOG_TEMP_PSW_VALUE") == null) {
           dojo.byId("j_password").value="";
       } else {
           dojo.byId("j_password").value=dojo.cookie("USER_LOG_TEMP_PSW_VALUE");
       }

       if (dojo.cookie("USER_LOG_TEMP_VALUE") != null && dojo.cookie("USER_LOG_TEMP_VALUE") != "") {

           try {
            var urla = APP_PATH + "/login.do?method=getValidateForEmp&rnd="+Math.random()+"&j_username="+dojo.byId("j_username").value;
			
			dojo.xhrGet({
						url : urla,
						sync : true,
						preventCache:true,
						handleAs:"text",
						load : function(text, args) {
						    var str02 = '<input class="proving" type="text" tabIndex="4" name="mobile_code" id="mobile_code" onKeyDown="enterToSubmit(event)">';
						    var str03 = '<input type="button" title="获取手机验证码" class="button_mobile" border="10" id="mobileCode" value="手机验证码" onclick="genMobileCode(this)" />';
							try {
								if (text == 1){
							    	dojo.byId("vCodeDiv").innerHTML = str02;
							    	dojo.byId("vCodeDivImg").innerHTML = str03;
							    	dojo.byId("vCodeDivImg").style.visibility='visible';
							    	dojo.byId("logonform").action=APP_PATH + "/j_unieap_security_check.do?isMobile=10012";
							    	dojo.byId("mobile_code").focus();
							    	isMobileText = 1;
							    } else if (text == 0){
							           dojo.byId("vCodeDiv").innerHTML = "";
								    	dojo.byId("vCodeDivImg").innerHTML = "";
								    	dojo.byId("vCodeDiv").style.visibility='hidden';
								    	dojo.byId("vCodeDivImg").style.visibility='hidden';
								    	dojo.byId("j_username").focus();
								    	dojo.byId("logonform").action=APP_PATH + "/j_unieap_security_check.do";
								    	isMobileText = 0;
								    	return false;
							    } else if (text == 3){
							    	 dojo.cookie("USER_LOG_TEMP_VALUE", "");
							    	 dojo.byId("j_username").value = "";
							    	 
							    	 alert("用户名错误，请正确填写。");
							    	 dojo.byId("j_username").focus();
							    } else if (text == 4){
							    	 dojo.cookie("USER_LOG_TEMP_PSW_VALUE", "");
							    	 alert("密码错误，请正确填写。");
							    	 dojo.byId("j_password").focus();
							    } else {
							        dojo.byId("j_username").focus();
							    }
							} catch (e) {
								alert("获取地市信息失败。" + e);
								return false;
							}
						}
					});
		 } catch(e) {
		     alert("获取地市信息失败。");
		 }
       } else {
    	   dojo.byId("j_username").focus();
       }
       
       init();
       
	});

function init(){
	//var showAlert = document.getElementById("showAlert").value;
	//if(showAlert!="null"){
		//document.getElementById("alertMessage").style.display="block";
	//}
	<%
	if (!messageDL.equals("")) {
	%>
//	MessageBox.alert(
//			{title:"提示信息",message:'<%=messageDL%>'}
//		);
    var msg = '<%=messageDL%>';
	alert(msg);
	<%
	    if (mobiErr != null && ("1".equals(mobiErr) || "2".equals(mobiErr))) {
	%>
      try {
          dojo.byId("mobile_code").style.display="block";
          dojo.byId("mobile_code").focus();
      } catch(e) { alert(e);}
<%
      }
	}
%>
    
	//focusUsername();
 }
   function fetchJcap(){
     document.getElementById("jcaptcha").src="<%=request.getContextPath()%>/jcaptcha/"+ Math.round(Math.random(100)*100000);
 }
   

/*
	function enter_key(evt) {
		if (evt == null) {
			evt = window.event;
		}
		var obj = evt.srcElement ? evt.srcElement : evt.target;

		var ele = document.forms["logonform"].elements;
		
		if (ele[0].value=="") {
			
		    ele[0].focus();
		}
		if (evt.keyCode == 13) {
			if (obj.type != "button" && obj.type != "checkbox") {
				for ( var i = 0; i < ele.length; i++) {
					if (ele[i].id == obj.id) {
						
						if (ele[i].type == "password") {
							//alert(ele[i].value);
							var val = ele[i].value;
							password = val;
						}
					    	
						ele[i + 1].focus();
						break;
					}
					ele[0].focus();
				}
			}

		} 
	}
	*/
	function showDes(s) {
		if (s==1) {
			
			dojo.byId(note_div).style.display="block";
		} else {
			dojo.byId(note_div).style.display="none";
		}
		
	}
	
    var APP_PATH = "<%=request.getContextPath()%>";
    
	function genMobileCode(val) {
	    if (dojo.byId("j_username").value == "" || dojo.byId("j_password").value == "") {
	        alert("请填写用户名和密码");
	        return false;
	    }
	    
	    var urla = APP_PATH + "/login.do?method=genMobileCode&rnd="+Math.random()+"&j_username="+dojo.byId("j_username").value+"&j_password="+dojo.byId("j_password").value;
		var falseType = 0;
		try {
			dojo.xhrGet({
						url : urla,
						sync : true,
						preventCache:　true,
						handleAs:　"text",
						load : function(text, args) {
							    if (text == 3){
							    	 alert('用户名错误，请正确填写。');
							    	 dojo.cookie("USER_LOG_TEMP_VALUE", "");
							    	 dojo.byId("j_username").value = "";
							    	 dojo.byId("j_username").focus();
							    	 falseType = 1;
							    	 return false;
							    } else if (text == 4){
							    	 alert('密码错误，请正确填写。');
							    	 dojo.cookie("USER_LOG_TEMP_PSW_VALUE", "");
							    	 dojo.byId("j_password").value = "";
							    	 dojo.byId("j_password").focus();
							    	 //MessageBox.alert( {title:"提示信息",message:'密码错误，请正确填写。'} );
							    	 falseType = 1;
							    	 return false;
							    } else if (text == 10){
							         dojo.cookie("USER_LOG_TEMP_PSW_VALUE", dojo.byId("j_password").value);
							    	 alert('手机验证码已经发送，请注意接收.');
							    	 return false;
							    } else if (text == 11){
							         dojo.cookie("USER_LOG_TEMP_PSW_VALUE", dojo.byId("j_password").value);
							    	 alert('请等待一分钟后再获取手机验证码.');
							    	 return false;
							    } else if (text == 12){
							         dojo.cookie("USER_LOG_TEMP_PSW_VALUE", dojo.byId("j_password").value);
							    	 alert('该用户没有维护手机号码，请联系系统管理员维护！');
							    	 falseType = 1;
							    	 return false;
							    }
						}
					});
		 } catch(e) {
		     alert("获取手机验证码失败。");
		 }
		 if (falseType == 0) {
		     disableButton(val);
		     countdown = 60;
		 }
	}
	
	var countdown=60;
	var time;
	function disableButton(val) {
	    if (countdown == 0) {
			clearTimeout(time);
			val.removeAttribute("disabled");
			val.value="手机验证码";
		} else {
			val.setAttribute("disabled", true);
			val.value="请等待(" + countdown + ")";
			countdown--;
		}
		time = setTimeout(function() {
          disableButton(val)
         },1000)
	}
	
		
    function enterUserName() {
        var event1 = arguments[0]||window.event;
	    var currentKey = event1.charCode||event1.keyCode; 
        if (currentKey == 13){
    	    dojo.byId("j_password").focus();
        }
    }
    
    function enterPass() {
        var event1 = arguments[0]||window.event;
	    var currentKey = event1.charCode||event1.keyCode; 
        if (currentKey == 13){
        /*
           if (dojo.byId("jcaptcha_response")) {
               dojo.byId("jcaptcha_response").focus();
           } else if (dojo.byId("mobile_code")) {
               dojo.byId("mobile_code").focus();
           }
         */
         //inputTextBlur(event1);
          enterToTab();
        }
    }
</script>
</head>

<body class="unieap">

<form name="logonform" id="logonform" method="post"
	action="<%=path%>/j_unieap_security_check.do">
<div id="index_box">
<div id="exeDownLoad" align="right" class="claro"
	style="position: absolute; width: 100%"><span><a
	href="<%=path%>/tdframework/CRM_Multi-User_Login.exe" id="multiUser"
	onmouseover="showDes(1);" onmouseout="showDes(0);">允许多用户登录程序</a></span>
<div id="note_div"
	style="display: none; border: solid #769dc0 1px; background: #ffffff; width: 360px">
<table width="350px" height="100px" border="0" cellspacing="0"
	cellpadding="0">
	<tr>
		<td align=left>如果要在本机使用多个用户同时登录系统，请点击运行“允许多用户登录程序”。 <br>
		<br>
		<font color="red">(※请注意，在IE8下同一个浏览器的多个tab页仍然不能多用户同时登录。 <br>
		可以通过多次打开浏览器程序的方式进行多用户同时登录。)</font></td>
	</tr>
</table>
</div>
</div>
<div id="login">
<table width="250px" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td colspan="2" height="33px" valign="bottom"><input type="text"
			class="default" tabIndex="1" name="j_username" id="j_username"
			onfocus="" onBlur="inputTextBlur(event)"
			onKeyDown="enterUserName(event)"></td>
	</tr>
	<tr>
		<td colspan="2" height="33px" valign="bottom"><input
			type="password" class="default" tabIndex="2" name="j_password"
			id="j_password" onfocus="" onBlur="inputTextBlur(event)"
			onKeyDown="enterPass(event)"></td>
	</tr>
	<tr>
		<td height="35" width="140px" text-align="left" valign="bottom">
		<div id="vCodeDiv"></div>
		</td>
		<td text-align="left;">
		<div id="vCodeDivImg"></div>
		</td>
		<%
          //if (!"1".equals(mobileFlag)) {
          %>
		<!--  <td height="35" width="140px" text-align="left" valign="bottom">
		          <div id="vCodeDiv">
		          
		          </div>
		          </td>
		          <td text-align="left;">
		          <div id="vCodeDiv1">
		              <img width="77" height="30" border="0" src="jcaptcha" id="jcaptcha" title="刷新验证码"  onclick="fetchJcap()"/>
		          </div>
	              </td>  -->

		<%
         // } else {
          %>
		<!--
          		  <td height="35" width="140px" text-align="left" valign="bottom">
          		  <div id="vMobileCodeDiv">
		          <input class="proving" type="text" tabIndex="3" name="mobile_code" id="mobile_code" onKeyDown="enterToSubmit(event)">
		          </div>
		          </td>
		          <td text-align="left;">
		          <div id="vMobileCodeDiv1">
		          <input type="button" title="获取手机验证码" class="button_mobile" border="10" id="mobileCode" value="手机验证码" onclick="genMobileCode(this)" />
		          </div>
		          </td>
		          -->
		<% 
          //}
          %>
		</div>
	</tr>
	<tr>
		<td colspan="2" align="left" valign="bottom" height="16px"><input
			type="checkbox" name="double_screen" id="double_screen"
			style="margin-left: 30px"> <label for="checkbox"></label></td>
	</tr>
	<tr>
		<td colspan="2" align="center" height="20px">
		<div id="alertMessage"><%=message%></div>
		</td>
	</tr>
	<tr>
		<td colspan="2" align="left" class="company"><input type="hidden"
			name="showAlert" value="<%=message%>" /> <input name="B1"
			type="button" id="sub" tabIndex="5" class="button_login" value=""
			onClick="doSubmit(event);" /> &nbsp;&nbsp; <input name="B2"
			type="reset" class="button_reset" value="" onClick="reload();" /></td>
	</tr>
</table>
</div>
<div id="company">东软集团股份有限公司 Neusoft Group Ltd.</div>
</div>
</form>
</body>
</html>
