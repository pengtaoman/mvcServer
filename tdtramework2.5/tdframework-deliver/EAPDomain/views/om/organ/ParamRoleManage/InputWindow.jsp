
<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>���ݽ�ɫά��</title>
    
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    
    <link rel="stylesheet" type="text/css" href="<%=path%>/views/common/css/pubstyle.css" TYPE="text/css">
    <script language="JavaScript">
    <!--
    	/*
    	 * ҳ���ʼ��
    	 */
    	function load() 
	    {
	    	var arrayBtn=new Array(myform.confirm, myform.cancel);
		    for (var i=0;i<arrayBtn.length;i++)
		    {
		    /**
				arrayBtn[i].className="btn3_mouseout";
				arrayBtn[i].onmouseover=function(){this.className="btn3_mouseover"};
				arrayBtn[i].onmouseout=function(){this.className="btn3_mouseout"};
				arrayBtn[i].onmousedown=function(){this.className="btn3_mousedown"};
				arrayBtn[i].onmouseup=function(){this.className="btn3_mouseup"};
			*/
		    }
		    myform.roleName.value=window.dialogArguments;
		}
		
		/**
		 * �رմ���
		 */
		function wClose()
		{
			window.close();
		}
		
		/**
		 * ȷ�ϰ�ť
		 */
		function confirmOnClick()
		{
			var roleName = myform.roleName.value;
			if (roleName.length == 0){
				alert ('����������һ������');
				return false;
			}
			var ifValid = checkValues();
			if (ifValid != ''){
				alert (ifValid);
				return false;
			}
			window.returnValue = roleName;
			window.close();
		}
		
		/**
		 * �ı���س�
		 */
		function nas_enter(){
			var scode=(navigator.appname=="Nwtscape")?event.which:event.keyCode;
			if(scode == 13){
				//event.keyCode = 9;
				confirmOnClick();
			}
		}
		
		function checkValues()
		{
			var msg = '';
			var roleName = document.getElementById('roleName').value;
			if (roleName.indexOf('\'') >= 0) {
				msg = '�����в�������ַǷ��ַ�';
			}
			if (roleName.indexOf('\"') >= 0) {
				msg = '�����в�������ַǷ��ַ�';
			}
			if (roleName.indexOf('\\') >= 0) {
				msg = '�����в�������ַǷ��ַ�';
			}
			return msg;
		}
	-->
	</script>
  </head>
  
	<body onload="load();">
		<form name="myform">
			<table border="0" cellpadding="0" cellspacing="0" class="tableType1" id="AutoNumber1">
				<tr height="20" class="trType">
					<td width="100%" ></td>
				</tr>
			</table>
			<table border="0" cellpadding="0" cellspacing="0" class="tableType1"  width="294" id="AutoNumber2">
				<tr class="trType">
					<td width="100%" colspan="2">��</td>
				</tr>
				<tr class="trType">
					<td width="100%" colspan="2" align="center">
						��ɫ����&nbsp;<input id="roleName" name="roleName" type="text" maxlength="20" class="textType" value="" onkeydown="nas_enter();" >
					</td>
				</tr>
				<tr height="15" class="trType">
					<td width="100%" colspan="2"></td>
				</tr>
				<tr class="trType">
					<td width="50%" align="center"><input type="button" id="confirm" value="ȷ��" class="button1" onClick="return confirmOnClick();"></td>
					<td width="50%" align="center"><input type="button" id="cancel" value="ȡ��" class="button1" onClick="wClose();"></td>
				</tr>
			</table>
		</form>
	</body> 
</html>
