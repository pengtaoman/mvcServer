<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%
//String path=EAPConfigHelper.getContextPath(request);
String message = NullProcessUtil.nvlToString((String) request.getAttribute("alertMsg"),"");
String messageDL = NullProcessUtil.nvlToString((String) request.getAttribute("alertMsgDL"),"");
String helpUri = request.getContextPath() + "/tdframework/mainframe/setting.html";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB2312">
<title>欢迎登录 中国电信 BSS系统</title>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<link rel="stylesheet" href="<%=path%>/common/dx20/css/login_style.css" type="text/css" />
<link rel="stylesheet" id="themeStyles" href="<%=path%>/unieap/ria3.3/dijit/themes/claro/claro.css">

<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/login.js" ></script>
<script type="text/javascript" >

dojo.require("dijit.dijit"); // optimize: load dijit layer
dojo.require("dijit.Tooltip");
dojo.require("dijit.TooltipDialog");
dojo.require("dijit.form.DropDownButton");

function init(){
	//var showAlert = document.getElementById("showAlert").value;
	//if(showAlert!="null"){
		//document.getElementById("alertMessage").style.display="block";
	//}
	<%
	if (!messageDL.equals("")) {
	%>
	MessageBox.alert(
			{title:"提示信息",message:'<%=messageDL%>'}
		);

	<%
	}
	%>

	focusUsername();
 }
   function fetchJcap(){
     //document.getElementById("jcaptcha").src="<%=request.getContextPath()%>/jcaptcha/"+ Math.round(Math.random(100)*100000);
	   document.getElementById("jcaptcha").src="ValidateCodeServlet?rd="+ Math.round(Math.random(100)*100000);
 }
   
   var password = "";

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
	
	function showDes(s) {
		if (s==1) {
			
			dojo.byId(note_div).style.display="block";
		} else {
			dojo.byId(note_div).style.display="none";
		}
		
	}
</script>
</head>
 
<body onLoad="init();" onkeydown="javascript:enter_key(event)" class="unieap">

<form name="logonform" id="logonform" method="post" action="<%=path%>/j_unieap_security_check.do">
  <div id="index_box">
    <div id="exeDownLoad" align="right" class="claro" style="position:absolute;width:100%">
      <span><a href="<%=path%>/tdframework/CRM_Multi-User_Login.exe" id="multiUser" onmouseover="showDes(1);" onmouseout="showDes(0);">允许多用户登录程序</a></span>
		      <div id="note_div" style="display:none;border: solid #769dc0 1px;background: #ffffff;width:360px">
					  <table width="350px" height="100px" border="0" cellspacing="0" cellpadding="0">
					    <tr>
					      <td align=left>如果要在本机使用多个用户同时登录系统，请点击运行“允许多用户登录程序”。
					      <br><br><font color="red">(※请注意，在IE8下同一个浏览器的多个tab页仍然不能多用户同时登录。
					      <br>可以通过多次打开浏览器程序的方式进行多用户同时登录。)</font></td>
					    </tr>
					  </table>
		</div>
    </div>
    <div  id="login">
      <table width="250px" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td colspan="2" height="33px" valign="bottom"><input type="text"  class="default"  tabIndex="1"  name="j_username" id="j_username"  
					onfocus="" onBlur="inputTextBlur(event)" tabindex=0></td>
        </tr>
        <tr>
          <td colspan="2" height="33px" valign="bottom"><input type="password"  class="default" tabIndex="2"  name="j_password" id="j_password"  
				onfocus="" onBlur="inputTextBlur(event)"></td>
        </tr>
        <tr>
          <%
          if(request.getAttribute("jcaptchaMsg")==null){%>
          <td height="35" width="140px" text-align="left" valign="bottom">
          <input class="proving" type="text" tabIndex="3" name="jcaptcha_response" onKeyDown="enterToSubmit(event)"></td>
          <td text-align="left;">
           <img width="77" height="30" border="0" src="ValidateCodeServlet" id="jcaptcha" title="刷新验证码"  onclick="fetchJcap()"/></td>
          </td>
          <%} else{%>
          <td height="35" width="140px" text-align="left" valign="bottom">
          <input class="proving" type="text" tabIndex="3" name="jcaptcha_response" onKeyDown="enterToSubmit(event)"></td>
          <td text-align="left;">
           <img width="77" height="30" border="0" src="ValidateCodeServlet" id="jcaptcha" title="刷新验证码"  onclick="fetchJcap()"/>
          </td>
          <%}%>
        </tr>
        <tr>
          <td colspan="2" align="left" valign="bottom" height="16px"><input type="checkbox" name="double_screen" id="double_screen" style="margin-left:30px">
            <label for="checkbox"></label></td>
        </tr>
        <tr>
          <td colspan="2" align="center" height="20px"><div id="alertMessage" > <%=message%> </div></td>
        </tr>
        <tr>
          <td colspan="2" align="left" class="company"><input type="hidden" name="showAlert" value="<%=message%>"/>
            <input name="B1" type="button" id="sub"  tabIndex="4" class="button_login"  value="" onClick="doSubmit(event);" />
            &nbsp;&nbsp;
            <input name="B2" type="reset" class="button_reset" value="" onClick="reload();" /></td>
        </tr>
      </table>
    </div>
    <div id="company">东软集团股份有限公司 Neusoft Group Ltd.</div>
  </div>
</form>
</body>
</html>
