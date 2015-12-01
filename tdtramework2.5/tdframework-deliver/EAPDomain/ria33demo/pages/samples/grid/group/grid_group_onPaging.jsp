<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/grid/group/grid_group_onPaging.js"></script>
        </script>
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			分组功能支持表格翻页<br>
		</div>
		<br />
	    <div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
			binding="{store:'empDataStore'}" views="{orderType:'client'}" 
			group="{name:['attr_deptno'],groupBar:true}" >
			<fixed>
				<cell label="员工编号" width="180px" name="attr_empno" headerStyles="text-align: left;"></cell>
			</fixed>
			<header>
				<cell width="20%" label="姓名" name="attr_ename" headerStyles="text-align: left;" ></cell>
				<cell width="20%" label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
				<cell width="20%" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
				<cell width="20%" label="入职日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
				<cell width="20%" label="工资" name="attr_sal"></cell>
			</header>
			<toolbar>
            </toolbar>
		</div>
		<br />
    </body>
</html>
