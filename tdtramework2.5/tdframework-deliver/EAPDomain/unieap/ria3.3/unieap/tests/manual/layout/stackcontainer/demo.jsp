<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
</head>
<script type="text/javascript">
	var dc = new unieap.ds.DataCenter('<%=request.getParameter("dc")%>');
	dataCenter.append(dc);
	var title = '<%=request.getParameter("title")%>';
	alert(title);
	function setTitle(){
		unieap.byId('titlePane').setTitle(title);
	}
</script>
<body class="unieap">
	<div dojoType="unieap.layout.TitlePane" id="titlePane" height="100%">
		<div dojoType="unieap.grid.Grid" width="auto" height="90%" binding="{store:'demo'}"
			 views="{rowNumber:true,orderType:'none'}">
			 <fixed>
				<cell label="员工编号" width="100px" name="attr_empno"></cell>
			 </fixed>
			 <header>
				<cell width="100px" label="姓名" name="attr_name"></cell>
				<cell width="150px" label="职位" name="attr_job"></cell>
				<cell width="150px" label="工资" name="attr_sal" headerStyles="text-align: left;"></cell>
			</header>
		</div>
		<div dojoType="unieap.form.Button" id="btn" onClick="setTitle()" label="设置Title">
	</div>
</body>
</html>