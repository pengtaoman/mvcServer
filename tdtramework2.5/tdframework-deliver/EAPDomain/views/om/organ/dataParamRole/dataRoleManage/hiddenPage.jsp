<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%
	String webpath = request.getContextPath();
	String message = (String)request.getAttribute("message");
	String operType = (String)request.getAttribute("operType");
	String flag = (String)request.getAttribute("flag");
	String ifAdd = (String)request.getAttribute("ifAdd");
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
	 *��ʼ���ű�
	 */
	function init(msg,operType,flag){
		if(msg!='null' && msg!=''){
			alert(msg);
		}
		if(operType!='null' && operType!=''){
			if(operType == 'delete'){
				//parent.RoleManage.bViewClick();
				parent.RoleManage.bGrantClick();
			}
		}
		if(flag!='null' && flag=='close'){
			parent.document.getElementById('closeFlag').value = 'close';
			//����ִ�в�ѯ
			parent.document.queryPage.document.getElementById("flag").value='showAddResult';
			parent.document.queryPage.doSearch('<%=webpath%>');
			//�رմ��ڣ�����ˢ��
			//window.returnValue = "true";
			//window.close();
			//window.opener.doRefresh();
			
		}
		if(flag != 'null' && flag == 'closeAdjust'){
			parent.document.getElementById('closeFlag').value = 'close';
			//����ִ�в�ѯ
			parent.document.queryPage.document.getElementById("flag").value='showAdjustResult';
			parent.document.queryPage.doSearch('<%=webpath%>');
		}
	}
</script>
</head>
<body onload="init('<%=message%>','<%=operType%>','<%=flag%>')">
<form method="post" action="">	
	<div id="hiddenDiv" style="display:none">
		<input type="hidden" id="operType" name="operType" value=""/>
		<input type="hidden" id="ifAdd" name="ifAdd" value="<%=ifAdd%>"/>		
	</div>			 	
</form>
</body>
</html>