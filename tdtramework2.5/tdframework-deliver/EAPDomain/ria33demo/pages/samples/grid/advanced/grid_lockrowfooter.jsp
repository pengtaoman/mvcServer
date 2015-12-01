<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/advanced/grid_lockrowfooter.js">
		</script>		
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了数据表格（Grid）组件的表尾（Footer）和锁定行特性。
			<br/>
			配置foot标签的express属性在footbar显示统计值，自定义数据及上下文等。
			<br/>
			实现getLockedRow方法及statistics属性在锁定行中显示最大值，最小值，小计，合计等统计值。
			在该样例中，拖动上下滚动条时,最后四行数据固定不动，当拖动左右滚动条时,最后四行与普通行数据行一样可以左右滚动。
			<br/>
		</div>
		<br/>
		<div dojoType="unieap.layout.TitlePane" title="Panel: Grid" open="true">
			<div dojoType="unieap.grid.Grid" width="100%" height="250px" binding="{store:'empLockDataStore'}" views="{rowBar:true,rowNumber:true}" lockedRow="{getLockedRow:getLockedRow,statistics:[{attr_sal:'max'},{attr_sal:'min'}]}">
				<fixed>
					<row>
						<cell label="员工编号" name="attr_empno" headerStyles="text-align: left; ">
						</cell>
					</row>
				</fixed>
				<header>
					<row>
						<cell width="400px" label="姓名" name="NAME" headerStyles="text-align: left; ">
						</cell>
						<cell width="500px" label="职位" name="attr_job">
						</cell>
						<cell width='500px' label="工资" name="attr_sal">
						</cell>
					</row>
				</header>
				<foot style="text-align:center;">
					最大薪资：<span style="color: #2748c2" express="max(attr_sal)"></span>；
					最小薪资：<span style="color: #2748c2" express="min(attr_sal)"></span>；
					行数：<span style="color: #2748c2" express="getRowCount()"></span>；
					自定义数据：<span style="color: #2748c2" express="getData()"></span>；
					测试上下文：<span style="color: #2748c2" express="${testContext}" context="myContext"></span>
				</foot>
			</div>
		</div>
		<br/>
		<div dojoType="unieap.layout.TitlePane" open="false" title="代码">
			<textarea name="code" class="html">
				<div dojoType="unieap.grid.Grid" width="100%" height="250px" binding="{store:'empLockDataStore'}" views="{rowBar:true,rowNumber:true}" lockedRow="{getLockedRow:getLockedRow,statistics:[{attr_sal:'max'},{attr_sal:'min'}]}">
					<fixed>
						<row>
							<cell label="员工编号" name="attr_empno" headerStyles="text-align: left; ">
							</cell>
						</row>
					</fixed>
					<header>
						<row>
							<cell width="400px" label="姓名" name="NAME" headerStyles="text-align: left; ">
							</cell>
							<cell width="500px" label="职位" name="attr_job">
							</cell>
							<cell width='500px' label="工资" name="attr_sal">
							</cell>
						</row>
					</header>
					<foot style="text-align:center;">
						最大薪资：<span style="color: #2748c2" express="max(attr_sal)"></span>；
						最小薪资：<span style="color: #2748c2" express="min(attr_sal)"></span>；
						行数：<span style="color: #2748c2" express="getRowCount()"></span>；
						自定义数据：<span style="color: #2748c2" express="getData()"></span>；
						测试上下文：<span style="color: #2748c2" express="${testContext}" context="myContext"></span>
					</foot>
				</div>
				<script type="text/javascript">
						var getLockedRow = function(){
							return [{
								attr_sal: '小计: 25555'
								}, {
								attr_sal: '合计: 25555'
								}];
						}
						function getData(){
							return '自定义数据！';
						}
			
						var myContext = {
							testContext: '上下文！'
						}
				</script>
			</textarea>
		</div>
	</body>
</html>
