<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/advanced/grid_printexport.js"></script>
    </head>
    <body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体;width:auto" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了数据表格（Grid）组件的打印和导出特性：<br>
			·在toolbar标签上配置print和export属性即可开启表格的打印和导出功能(不支持pojo)；<br />
			·点击工具栏上的打印按钮，在弹出的打印设置页面中选择打印机即可打印；<br />
			·点击工具栏上的导出按钮，可以将数据表格中的数据导出为".csv"文件。<br />
		</div>
		<div dojoType="unieap.layout.TabContainer" style="width:auto" height="80%">
			<div dojoType="unieap.layout.ContentPane" title="导出打印（DRM）">
				<div id="grid" dojoType="unieap.grid.Grid" width="auto" height="250px"
						binding="{store:'empDataStore'}" views="{rowNumber:true,orderType:'client'}" selection="{selectType:'m'}">
						<fixed>
							<cell label="员工编号" width="80" name="attr_empno"></cell>
						</fixed>
						<header>
							<row>
								<cell rowSpan="2" width="20%" label="姓名" name="attr_ename" ></cell>
								<cell colSpan="4" label="基本信息" isMulTitle="true" ></cell>
								
							</row>
							<row>
								<cell width="20%" label="部门" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
								<cell width="20%" label="入职日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
								<cell width="20%" label="职位" name="attr_job" ></cell>
								<cell width="20%" label="工资" name="attr_sal"></cell>
							</row>
						</header>
						<toolbar print='{}' export='{defaultType:"client"}'></toolbar>
					</div>
					<br />
					<div dojoType="unieap.layout.TitlePane" open="false" width="98%" title="代码">
						<textarea name="code" class="html">
							<div id="grid" dojoType="unieap.grid.Grid" width="auto" height="250px"
								binding="{store:'empDataStore'}" views="{rowNumber:true,orderType:'client'}" selection="{selectType:'m'}">
								<fixed>
									<cell label="员工编号" width="80" name="attr_empno"></cell>
								</fixed>
								<header>
									<row>
										<cell rowSpan="2" width="20%" label="姓名" name="attr_ename" ></cell>
										<cell colSpan="3" width="20%" label="部门" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
									</row>
									<row>
										<cell width="20%" label="入职日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
										<cell width="20%" label="职位" name="attr_job" ></cell>
										<cell width="20%" label="工资" name="attr_sal"></cell>
									</row>
								</header>
								<toolbar print='{}' export='{defaultType:"client"}'></toolbar>
							</div>
						</textarea>
					</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="导出（POJO）">
				<div  dojoType="unieap.grid.Grid" width="auto" height="250px"
					binding="{store:'pojoDS'}" 
					views="{rowNumber:true,orderType:'client'}" selection="{selectType:'m'}">
					<fixed>
						<cell label="员工编号" width="100px" name="empno"></cell>
					</fixed>
					<header>
						<cell width="25%" label="姓名" width="25%" name="ename"></cell>
						<cell width="25%" label="职位" width="25%" name="job"></cell>
						<cell width="25%" label="工资" width="25%" name="sal"></cell>
						<cell width="25%" label="入职日期" width="25%" name="hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
					</header>
					<toolbar paging="{url:'/RIATest.do?method=testLoadPoJo'}"
							 export="{url:'/pojoExport.do?method=doExport'}">
					</toolbar>   
				</div>
				<br />
				<div dojoType="unieap.layout.TitlePane" open="false" width="98%" title="代码">
					<textarea name="code" class="html">
						 <div  dojoType="unieap.grid.Grid" width="auto" height="250px"
							binding="{store:'empDataStore'}" 
							views="{orderType:'client'}" selection="{selectType:'m'}" >
							<fixed>
								<cell label="员工编号" width="100px" name="empno"></cell>
							</fixed>
							<header>
								<cell width="25%" label="姓名" width="25%" name="ename"></cell>
								<cell width="25%" label="职位" width="25%" name="job"></cell>
								<cell width="25%" label="工资" width="25%" name="sal"></cell>
								<cell width="25%" label="入职日期" width="25%" name="hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							</header>
							<toolbar paging="{url:'/RIATest.do?method=testLoadPoJo'}"
									export="{url:'/pojoExport.do?method=doExport'}">
							</toolbar>   
						</div>
					</textarea>
				</div>
			</div>
		</div>
		
    </body>
</html>
