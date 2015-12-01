<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>xGrid样例</title>
		<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/tests/manual/xgrid/advanced/xgrid.js"></script>
    </head>
    <body class="unieap">
			<div id="grid" jsId="grid" dojoType="unieap.xgrid.Grid" width="800px" height="70%" style="margin:5px;"
			binding="{store:'largedata'}" views="{onRowMousedown:fn2}">
				<fixed>
					<row>		
							<cell width="100" label="编号" name="attr_empno" headerStyles="color:red;" styles="color:red;"></cell>
							<cell width="100" label="姓名" name="NAME" headerStyles="color:blue;" styles="color:blue;"></cell>
					</row>
				</fixed>
				<header>		
						<row>		
							<cell width="200" label="职位" name="attr_job" styles="text-align: center;" formatter="fn"></cell>
							<cell width="200" label="职位" name="attr_job" styles="text-align: center;" get="fn1"></cell>
							<cell width="100" label="入职日期1" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="离职日期"1 name="attr_hiredate" 
								valueFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期2" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期3" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期4" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期5" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期6" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期7" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期8" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期9" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期10" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期11" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期12" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期13" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期14" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期15" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期16" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell width="100" label="入职日期17" name="attr_hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
						</row>
				</header>
				<toolbar></toolbar>
			</div>
			<!--  
			<div id="test"  dojoType="unieap.form.Button" label="增加一行" ></div>&nbsp;&nbsp;
			<div id="deleteRow"  dojoType="unieap.form.Button" label="删除第一行"></div>&nbsp;&nbsp;
			<div id="clearDataStore" dojoType="unieap.form.Button" label="清空Store"></div>&nbsp;&nbsp;
			<div id="deleteRows" dojoType="unieap.form.Button" label="删除前三行"></div>&nbsp;&nbsp;
			<div id="changeStore" dojoType="unieap.form.Button" label="改变Store"></div>&nbsp;&nbsp;</br></br>
			<div id="max" dojoType="unieap.form.Button" label="获得attr_sal列最大值"></div>&nbsp;&nbsp;
			<div id="min" dojoType="unieap.form.Button" label="获得attr_sal列最小值"></div>&nbsp;&nbsp;
			<div id="sum" dojoType="unieap.form.Button" label="获得attr_sal的总和"></div>&nbsp;&nbsp;
			<div id="avg" dojoType="unieap.form.Button" label="获得attr_sal的平均值"></div>&nbsp;&nbsp;
			-->
    </body>
</html>
