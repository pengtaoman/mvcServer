<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%
String path=EAPConfigHelper.getContextPath(request);
String message = NullProcessUtil.nvlToString((String) request.getAttribute("alertMsg"),"");
String helpUri = request.getContextPath() + "/tdframework/mainframe/setting.html";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<META content="MSHTML 6.00.2800.1106" name=GENERATOR></HEAD>
<title>��ӭ��¼ �Ĵ���ͨ BSSϵͳ</title>
<link rel="stylesheet" href="<%=path%>/tdframework/mainframe/css/login_lt.css" type="text/css" />
<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/login.js" ></script>
<SCRIPT type="text/javascript" event="OnCompleted(hResult,pErrorObject, pAsyncContext)" for=foo>
 document.forms[0].txtMACAddr.value=unescape(MACAddr);
 document.forms[0].txtIPAddr.value=unescape(IPAddr);
 document.forms[0].txtDNSName.value=unescape(sDNSName);
 //document.formbar.submit();
</SCRIPT>

<SCRIPT type="text/javascript" event=OnObjectReady(objObject,objAsyncContext) for=foo>
   if(objObject.IPEnabled != null && objObject.IPEnabled != "undefined" && objObject.IPEnabled == true)
   {
    if(objObject.MACAddress != null && objObject.MACAddress != "undefined")
    MACAddr = objObject.MACAddress;
    if(objObject.IPEnabled && objObject.IPAddress(0) != null && objObject.IPAddress(0) != "undefined")
    IPAddr = objObject.IPAddress(0);
    if(objObject.DNSHostName != null && objObject.DNSHostName != "undefined")
    sDNSName = objObject.DNSHostName;
    }
</SCRIPT>
<script type="text/javascript" >
function init(){
	var showAlert = document.all("showAlert").value;
	if(showAlert!="null"){
		//document.getElementById("alertMessage").style.display="block";
	}
 }
</script>
</head>

<body onLoad="init();" >
<OBJECT id=locator classid=CLSID:76A64158-CB41-11D1-8B02-00600806D9B6 VIEWASTEXT></OBJECT>
<OBJECT id=foo classid=CLSID:75718C9A-F029-11d1-A1AC-00C04FB6C223></OBJECT>
<SCRIPT type="text/javascript" >
  try{
  	   if(navigator.userAgent.indexOf('Windows NT 5.1') != -1)
  	   {
		   var service = locator.ConnectServer();
		   var MACAddr ;
		   var IPAddr ;
		   var DomainAddr;
		   var sDNSName;
		   service.Security_.ImpersonationLevel=3;
		   service.InstancesOfAsync(foo, 'Win32_NetworkAdapterConfiguration');
  	   }else{
 	       //alert("welcome, you are windows 98");
  	   }
	   
   }catch(e){
	   alert("����йؽ����ؼ�");
	   window.location.href="<%=helpUri%>";
   }
</SCRIPT>
<form  name="logonform" method="post" action="<%=path%>/j_unieap_security_check.do">
<INPUT value=""  type="hidden" name="txtMACAddr"> 
<INPUT value="" type="hidden" name="txtIPAddr"> 
<INPUT value=""  type="hidden" name="txtDNSName">
<div id="index_box">
  <div id="comp"><span class="company_word">�й���ͨBSSϵͳ|</span><span class="province_word">�Ĵ��ֹ�˾</span></div>
  <div id="ver">v2.0 </div>
  <div  id="login">
      <table border="0">
        <tr>
          <th align="center"><img border="0" src="<%=path%>/tdframework/mainframe/images/dot.gif" /></th>
          <th><b>�û���</b></th>
          <td>
 				<input type="text"  class="default" name="j_username" onKeyDown="enterToTab()" 
					onfocus="inputTextFocus()" onBlur="inputTextBlur()">           		</td>
        </tr>
        <tr>
          <th align="center"><img border="0" src="<%=path%>/tdframework/mainframe/images/dot.gif" /></th>
          <th>��&nbsp; ��</th>
          <td>
	   			<input type="password"  class="default" name="j_password" onKeyDown="enterToSubmit()" 
				onfocus="inputTextFocus()" onBlur="inputTextBlur()">          </td>
        </tr>
        <!-- tr>
              	<th align="center"><img border="0" src="<%=path%>/tdframework/mainframe/images/dot.gif" /></th>
          		<th>�����</th>
        
                 <%
                  if(request.getAttribute("jcaptchaMsg")==null){%>
                 <td height="26" align="left">   
                	<input type="text" tabIndex="3" size="6" name="jcaptcha_response" onkeydown="enterToTab()"> 

                    <a href='<%= response.encodeURL(EAPConfigHelper.getContextPath(request)+"/login.do?method=begin") %>'>
                       <img border="0" width="77" height="26" id="captcha" src="jcaptcha" title="ˢ����֤��"/>
                    </a>
                  </td>
                  <%} else{%> 
                  <td height="26" align="left">   
                	<input type="text" tabIndex="3" size="6" name="jcaptcha_response" onkeydown="enterToTab()"> 

                    <a href='<%= response.encodeURL(EAPConfigHelper.getContextPath(request)+"/login.do?method=begin") %>'>
                       <img border="0" width="77" height="26" id="captcha" src="jcaptcha" title="ˢ����֤��"/>
                    </a>
                  </td>
                  <%}%>   
       </tr-->

        
        <tr>
          <td colspan="3" align="right" class="company"><div align="left">
              <input type="checkbox" name="double_screen" id="double_screen">
          ����˫������</div></td>
        </tr>
        <tr>
          <td colspan="3" align="right" class="company"><input type="hidden" name="showAlert" value="<%=message%>"><input name="B1" type="button" id="sub" class="Button"  value="��¼" onClick="doSubmit();" />
              <input name="B2" type="reset" class="Button" value="����" onClick="reload();" />
            &nbsp; </td>
        </tr>
      </table>

  </div>
  <div id="company">�����Źɷ����޹�˾ Neusoft Group Ltd.</div>
</div> 

</form>
</body>
</html>
