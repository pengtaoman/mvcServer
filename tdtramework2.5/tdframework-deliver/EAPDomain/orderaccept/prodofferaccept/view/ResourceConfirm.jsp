
<%
	 /* 
	 **************************************************************
	 * ������		: ��Դȷ��ҳ��
	 * ��������  	: 2012-10-02
	 * ����		: shanpa
	 * ģ��		:��Դȷ��ҳ��
	 * ����		: 
	 * ��ע		: 
	 * ------------------------------------------------------------
	 * �޸���ʷ
	 * ���		����		�޸���	�޸�ԭ��
	 * 1
	 * 2
	 **************************************************************
	 */
%>
<%@ page language="java" pageEncoding="GBK"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="MSThemeCompatible" content="no" />
		<title>��Դȷ��</title>
		<script language="javascript">
			function init(){
				document.getElementById("resConfirm").src = dialogArguments.resConfirmURL;
			}
		</script>
	</head>
    <body onload="init();">
		<iframe id="resConfirm" name="resConfirm" src="" style="width:100%;height:100%" scrolling="yes"  frameborder="0">
		</iframe>	
	</body>
</html>
