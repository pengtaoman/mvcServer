<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath();  
	String operFlag = request.getContextPath();
%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="content-type" content="text/html; charset=gb2312">
<title></title>
			<link rel="stylesheet" href="<%=path%>/views/common/css/crm_style.css" TYPE="text/css"/>	
			<script language="javascript" src="<%=path%>/views/common/js/nas_trim.js"></script>
<script language="JavaScript">
	function bSubmitClick(){
		var workNo=nas_trim(myform.WorkNo.value);
		if (workNo.length==0){
			alert ('请输入账号!');
			myform.WorkNo.focus();
			return;
		}
		parent.bottom.location.href = myform.Path.value+"/om/powerAdjust.do?operType=queryEmployee&workNo="+myform.WorkNo.value;
		return;
	}
	
	function init(){
		var arrayBtn=new Array(myform.bSubmit);
		for (var i=0;i<arrayBtn.length;i++){
			arrayBtn[i].className="btn3_mouseout";
			arrayBtn[i].onmouseover=function(){this.className="btn3_mouseover"};
			arrayBtn[i].onmouseout=function(){this.className="btn3_mouseout"};
			arrayBtn[i].onmousedown=function(){this.className="btn3_mousedown"};
			arrayBtn[i].onmouseup=function(){this.className="btn3_mouseup"};
			//arrayBtn[i].disabled="true";
		}
	}
</script>
</head>

<body onload="init();" class="BODY">
<form action="" name="myform" method="post">
<table align="center"  border="0" cellspacing="0" cellpadding="0" class="tab_line">
			<tr>
				<td width="5%" align="center" valign="top">
					<img src="../../../common/images/current2.gif" align="center" width="20" height="20"/>
				</td>
				<td  class="h14">权限微调</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="15"/>
			</tr>
		</table>

<TABLE border="0" align="center" cellpadding="0" cellspacing="1">
	<TR>
		<TD class="tdlabelStyle">
			请输入账号
		</TD>
		<TD class="tdtextStyle">
			<input type="text" size="20" name="WorkNo" class="textStyle"/>
			<input type="hidden" name ="Path" value="<%=path%>"/>
			<input type="hidden" name ="operFlag" value="<%=operFlag%>"/>
		</TD>
		<TD colspan="2" align="center">
			<input type="button" value="查 询" onClick="bSubmitClick();return false;" name="bSubmit" class="btn3_mouseout" nmouseover="this.className='btn3_mouseover'"
 onmouseout="this.className='btn3_mouseout'" onmousedown="this.className='btn3_mousedown'"  onmouseup="this.className='btn3_mouseup'">
		</TD>
	</TR>
</form>
</table>
</body>
</html>
