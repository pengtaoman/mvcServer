<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%
 String webpath = request.getContextPath();
 String message = (String) request.getAttribute("message") == null ? "" : (String) request
                    .getAttribute("message");
 String flag = (String) request.getAttribute("flag") == null ? "" : (String) request
                    .getAttribute("flag");
%>
<html>
<head>
<base target="_self">
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<!-- ��ֹ windows ������ -->
<meta http-equiv="MSThemeCompatible" content="no" />
<!-- ��ֹ���� headers -->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />
<!-- end ��ֹ���� headers --> 
		
<title></title>
<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
<script language="javascript" src="<%=webpath%>/common/js/td_common.js"> </script>
<script  language="javascript" src="<%=webpath%>/common/js/waitingbar.js" ></script>
<script  language="javascript">
	/*
	*��ʾ�ȴ���
	*/
	function showWaitingBar(){
		//WaitingBar.setMsg("ϵͳ�����У����Ե�");
		WaitingBar.showMe();  //��ʾ�ȴ���
		//WaitingBar.hideMe();
	}
	function init(message,flag){
		if(message!=''){
			alert(message);
		}
		if(flag=='close'){
			window.close();
		}
	}
</script>
</head>
<body onload="init('<%=message%>','<%=flag%>')">
<form method="post" action="">	
	<div id="hiddenDiv" style="display:none">
		<input type="hidden" id="ifValidId" name="ifValidId" value="false"/>
	</div>			 	
</form>
</body>
</html>