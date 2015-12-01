<%@ page contentType="text/html; charset=GBK"%>
<%@ page import="com.neusoft.form.manage.util.MessageUtil"%>
<%
String formID="";
formID=request.getParameter("formID");
%>
<HTML>
<head>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<LINK href="css/Style.css" rel=stylesheet>
<script language="javascript">
var flag=true;

function backToList(){
history.back();
}

function setPrivilege(obj){

if(flag){
var returnFlag1=window.document.formPrivilegeApplet.showFormPrvPanel();
if(!returnFlag1){
 var msg = '<%=MessageUtil.getString("form.privilege.setprivilege",session) %>';
 var styles="dialogWidth:426px;dialogHeight:240px;help:no;status:no;resizable:no"
 window.showModalDialog("<%=request.getContextPath()%>/unieap/pages/form/formErrorPage.jsp",msg,styles);
 history.back();
}
document.getElementById("next_and_pre").className="button_p";
document.all("save").className="button_save";
flag=!flag;
}
else{
var returnFlag2=window.document.formPrivilegeApplet.showOperatorSelectionPanel();
if(!returnFlag2){
 var msg = '<%=MessageUtil.getString("form.privilege.setprivilege",session) %>';
 var styles="dialogWidth:426px;dialogHeight:240px;help:no;status:no;resizable:no"
 window.showModalDialog("<%=request.getContextPath()%>/unieap/pages/form/formErrorPage.jsp",msg,styles);
 history.back();
}
document.getElementById("next_and_pre").className="button_next";
document.all("save").className="button_null";
flag=!flag;
}
obj.blur()
}
function saveSet(obj){

var flag4=window.document.formPrivilegeApplet.savePolicies();
if(!flag4){
 var msg = '<%=MessageUtil.getString("form.privilege.savefail",session) %>';
 var styles="dialogWidth:426px;dialogHeight:240px;help:no;status:no;resizable:no"
 window.showModalDialog("<%=request.getContextPath()%>/unieap/pages/form/formErrorPage.jsp",msg,styles);
history.back();

}
if(flag4)
var msg = '<%=MessageUtil.getString("form.privilege.savesuccess",session) %>';//"保存成功"
//var styles="dialogWidth:426px;dialogHeight:240px;help:no;status:no;resizable:no"
//window.showModalDialog("<%=request.getContextPath()%>/unieap/pages/form/formWarnPage.jsp",msg,styles);
alert(msg);
obj.blur()
}
function showButtons(){
  document.getElementById("back").className="button_back"
  document.getElementById("next_and_pre").className="button_next"
}

</script>
</head>
<body background="css/images/bg.gif">
<OBJECT id="myApplet"
        name=formPrivilegeApplet  MAYSCRIPT="true" scriptable="true"
        classid= "clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"
        codebase= "http://java.sun.com/products/plugin/autodl/jinstall-1_4_2-windows-i586.cab#Version=1,4,2,0"
        WIDTH="98%" HEIGHT="95%" align="center" style="margin-left:1%;margin-top:25px">

<PARAM NAME = CODE VALUE = "com.neusoft.form.manage.client.FormPrivilegeApplet" >
<PARAM NAME = ARCHIVE VALUE = "formprivilege.jar,framework.jar,form.jar,xpp3-1.1.3.4.I.jar,alloy.jar">
<param name="toollistener" value="<%=request.getContextPath()%>/formmanagerlistener">
<Param name="formID" value="<%=formID%>">
<param name="mayscript" value="true">
<PARAM NAME="scriptable" VALUE="true" >
<PARAM NAME="cache_option" VALUE="No">
<PARAM name="type" value="application/x-java-applet;version=1.4.2">
<COMMENT>
  <embed type="application/x-java-applet;version=1.4.2"
     code ="com.neusoft.monitor.client.DetectPluginApplet" width= 2 height= 2  MAYSCRIPT="true" scriptable="true">
  </embed>
</COMMENT>
</OBJECT>
<table width="98%" border="0" cellpadding="0" cellspacing="0">
<tr>
<td align="right" valign="middle" height="48px">
<input type="button"  name="back" value=" " class="button_null" onclick="javascript:backToList()">
<input type="button" name="next_and_pre" value=" " class="button_null" onclick="javascript:setPrivilege(this)">
<input type="button" name="save" class="button_null" onclick="javascript:saveSet(this)">
</td>
<tr>
</table>
</BODY>
</HTML>
