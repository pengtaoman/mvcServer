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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/advanced/grid_pagecache.js"></script>
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了数据表格（Grid）组件中的翻页缓存特性。<br>
			通过配置Toolbar的“paging”属性，当您在第一页选中某些行后翻到下一页，然后再翻回第一页的时候，先前选中的行会继续保持选中状态。
		</div>
		<br />
	    <div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
			binding="{store:'empDataStore'}" views="{rowNumber:true,rowBar:true}" 
			selection="{selectType:'m'}" >
			<header>
				<cell label="员工编号" width="180px" name="attr_empno" headerStyles="text-align: left;"></cell>
				<cell width="20%" label="姓名" name="attr_ename" headerStyles="text-align: left;" ></cell>
				<cell width="20%" label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
				<cell width="20%" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
				<cell width="20%" label="入职日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
				<cell width="20%" label="工资" name="attr_sal"></cell>
			</header>
			<toolbar paging="{pageCache:true}" ></toolbar>
		</div>
		
		<div dojoType="unieap.form.Button" label="获得选中数据" onClick="getPagedData"></div>
		<br />
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<textarea name="code" class="html">
				<div dojoType="unieap.grid.Grid">
					<header>
						<cell name="empno" label="员工编号"></cell>
					</header>
					<!--  设置翻页缓存     -->
					<toolbar paging="{pageCache:true}"></toolbar>
				</div>
				
				<script type="text/javascript">
					function getPagedData(){
						var data=grid.getManager("PagingManager").getSelectedCachedData();
						unieap.debug(data);
					}
				</script>
			</textarea>
		</div>
    </body>
</html>
