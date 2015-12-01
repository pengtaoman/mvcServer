<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%
	String webpath = request.getContextPath();
	String message = (String)request.getAttribute("message");
	String operType = (String)request.getAttribute("operType")==null?"":(String)request.getAttribute("operType");
	String flag = (String)request.getAttribute("flag");
%>
<html>
<head>
<base target="_self">
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<!-- 禁止 windows 主题风格 -->
<meta http-equiv="MSThemeCompatible" content="no" />
<!-- 禁止缓存 headers -->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />
<!-- end 禁止缓存 headers --> 
		
<title></title>
<script language="javascript" src="<%=webpath%>/common/js/td_common.js"> </script>
<script  language="javascript" src="<%=webpath%>/common/js/waitingbar.js" ></script>
<script  language="javascript">
	/*
	 *初始化脚本
	 */
	function init(msg,operType,flag){
		if(msg!='null' && msg!=''){
			alert(msg);
		}
		
		if(operType!='null' && operType!=''){
			if(operType == 'delete'){
				parent.query.doSearch('<%=webpath%>');
			}else if(operType == 'add'){
				parent.query.doSearch('<%=webpath%>');
			}else if(operType == 'modify'){
				parent.query.doSearch('<%=webpath%>');
			}
		}
		
		if(flag!='null' && flag=='close'){
			window.returnValue = "true";
			window.close();
			//window.opener.doRefresh();
		}
	}
</script>
</head>
<body onload="init('<%=message%>','<%=operType%>','<%=flag%>')">
<form method="post" action="">	
	<div id="hiddenDiv" style="display:none">
		<input type="hidden" id="operType" name="operType" value="<%=operType%>"/>
	</div>			 	
</form>
</body>
</html>