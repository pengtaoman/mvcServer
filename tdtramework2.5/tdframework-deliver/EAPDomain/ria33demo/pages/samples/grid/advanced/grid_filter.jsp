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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/advanced/grid_fitler.js">
		</script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了数据表格（Grid）组件的列过滤特性。<br />
			·在Grid标签上配置filter="{}"，可打开表格过滤功能；<br />
			·鼠标移至表头,表头右侧会出现下拉箭头,点击会弹出过滤菜单，选择“过滤”，弹出过滤设置的对话框，<br />
			·设置过滤条件后即可对该数据表格内容进行过滤。<br />
		</div>
		<br/>
		<div dojoType='unieap.layout.TitlePane'>
			<div dojoType="unieap.grid.Grid" filter='{}' width="100%" height="300px" binding="{store:'empDataStore'}" lockedRow="{getLockedRow:getLockedRow}">
				<fixed>
					<cell label="员工编号" width="150" name="attr_empno">
					</cell>
				</fixed>
				<header>
					<row>
						<cell label="部门" decoder="{store:'deptDs'}" name="attr_deptno">
						</cell>
						<cell label="姓名" name="attr_ename" width="150" headerStyles="text-align: left;">
						</cell>
						<cell label="日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd HH:mm:ss'}">
						</cell>
						<cell label="工资" width="250" name="attr_sal">
						</cell>
						<cell label="职务" width="300" name="attr_job">
						</cell>
					</row>
				</header>
				<foot style="text-align:center;">
					最大薪资：<span style="color: #2748c2" express="max(attr_sal)"></span>；
					最小薪资：<span style="color: #2748c2" express="min(attr_sal)"></span>；
					行数：<span style="color: #2748c2" express="getRowCount()"></span>；
				</foot>
			</div>
		</div>
		<br/>
		<div dojoType="unieap.layout.TitlePane" open="false" title="代码">
			<textarea name="code" class="html">
			<div dojoType="unieap.grid.Grid" filter="{}" width="100%" height="300px" binding="{store:'empDataStore'}" >
				<fixed>
					<cell label="员工编号" width="150" name="attr_empno">
					</cell>
				</fixed>
				<header>
					<row>
						<cell label="部门" decoder="{store:'deptDs'}" name="attr_deptno">
						</cell>
						<cell label="姓名" name="NAME" width="150" headerStyles="text-align: left;">
						</cell>
						<cell label="日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd HH:mm:ss'}">
						</cell>
						<cell label="工资" width="250" name="attr_sal">
						</cell>
						<cell label="职务" width="300" name="attr_job">
						</cell>
					</row>
				</header>
				<foot style="text-align:center;">
					最大薪资：<span style="color: #2748c2" express="max(attr_sal)"></span>；
					最小薪资：<span style="color: #2748c2" express="min(attr_sal)"></span>；
					行数：<span style="color: #2748c2" express="getRowCount()"></span>；
				</foot>
			</div>
		</div>
		</textarea>
	</div>
	</body>
</html>
