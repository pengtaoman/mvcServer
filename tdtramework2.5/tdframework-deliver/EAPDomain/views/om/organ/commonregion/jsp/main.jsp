<%@ page language="java" contentType="text/html; charset=gb2312"%>
<%
	String webpath = request.getContextPath();
	
	String treeViewUrl=webpath+"/om/commonRegionAction.do?method=initCommonRegionTree";
%>
<html>
	<head>
		<title>���ù�������</title>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<meta http-equiv="MSThemeCompatible" content="no" />
		<!-- ��ֹ���� headers -->
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="-1" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<!-- end ��ֹ���� headers -->
		<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
		<!-- ����js  -->
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=webpath%>/views/om/organ/commonregion/js/main.js"></script>
	</head>

	<body class="frameBody" onload="init()">
		<table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
			<tr>
				<td id="commonRegionTreeTD" style="width:230px;">
					<iframe frameborder="0" scrolling="auto" marginwidth="0"
						marginheight="0" style="height:100%;width:100%;" name="commonRegionTree"
						id="commonRegionTree" src="<%=treeViewUrl%>"></iframe>
				</td>
				<td style="width:1px;"  id="viewControlButtonTD">
					<b style="color:red;cursor:hand;" id="ControlButton" onclick="showOrHide('commonRegionTreeTD', this.id)"><</b>
				</td>
				<td id="commonRegionDetailTD" style="height:100%;">
					<iframe frameborder="0" scrolling="auto" marginwidth="0"
						marginheight="0" style="height:100%;width:100%;" name="commonRegionDetail"
						id="commonRegionDetail"></iframe>
				</td>
			</tr>
		</table>
		<div style="height:0px;width:100%;display:none">
		</div>
	</body>
</html>
