<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%
//String path=EAPConfigHelper.getContextPath(request);
String message = NullProcessUtil.nvlToString((String) request.getAttribute("alertMsg"),"");
String messageDL = NullProcessUtil.nvlToString((String) request.getAttribute("alertMsgDL"),"");
String helpUri = request.getContextPath() + "/tdframework/mainframe/setting.html";
String path = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB2312">
<title>BSS系统监测<% out.println("----------------" + request.getContextPath()); %></title>

<script type="text/javascript" >


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
    <div  id="login">
      <table width="250px" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td colspan="2" height="33px" valign="bottom"><input type="text"  class="default"  tabIndex="1"  name="j_username" id="j_username"  
					onfocus="" tabindex=0></td>
        </tr>
        <tr>
          <td colspan="2" height="33px" valign="bottom"><input type="password"  class="default" tabIndex="2"  name="j_password" id="j_password"  
				onfocus=""></td>
        </tr>
        <tr>
          <td height="35" width="140px" text-align="left" valign="bottom">
          <input class="proving" type="text" tabIndex="3" name="jcaptcha_response"></td>
          <td text-align="left;">
          </td>
          
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
            <input name="B1" type="button" id="sub"  tabIndex="4" class="button_login"  value=""/>
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
