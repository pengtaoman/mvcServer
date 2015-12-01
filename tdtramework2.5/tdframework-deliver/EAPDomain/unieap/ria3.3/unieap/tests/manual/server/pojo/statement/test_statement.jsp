<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
        <title>statement-complex</title>
		<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
		<script type="text/javascript" src="test_statement.js"></script>
    </head>
    <body class="unieap">
     <div id="grid" jsId="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
					binding="{store:'empDataStore'}"
					lockedRow="{statistics:{'EMPNO':'max','SAL':'avg'}}"
					views="{rowNumber:false,rowBar:true,orderType:'none'}"
					selection="{selectType:'s'}">
					<fixed>
						<cell label="员工编号" width="150" name="EMPNO"></cell>
					</fixed>
					<header>
						<cell width="100px" label="姓名" width="25%" name="ENAME"></cell>
						<cell width="150px" label="职位" width="25%" name="JOB"></cell>
						<cell width="150px" label="工资" width="25%" name="SAL"></cell>
					</header>
				</div>
	</body>
</html>
