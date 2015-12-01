<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/data.js">
		</script>
		<script>
			dojo.addOnLoad(function(){
				dp.SyntaxHighlighter.HighlightAll('code');
			});
		</script>
		<title>adaptcontainer</title>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			自适应容器包含多个自适应部分 高度百分比分配
			<br/>
			自适应容器嵌套
		</div>
		<br/>
		<div dojoType="unieap.layout.AdaptiveContainer" title="自适应样例" height="500px" width="49%" style='float:left'>
			<div dojoType="unieap.layout.AdaptivePane">
				<div dojoType="unieap.layout.TitlePane" style="height:200px" title="自适应容器">
					当此titlepane收拢时,以下表格自动变高。
					<br/>
					普通表格为40%高
					<br/>
					unieap grid为60%高
				</div>
			</div>
			<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="40%">
				<table style="width:100%;height:100%;" border=1>
					<tr>
						<td>
							1
						</td>
						<td>
							2
						</td>
					</tr>
					<tr>
						<td>
							3
						</td>
						<td>
							4
						</td>
					</tr>
				</table>
			</div>
			<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="60%">
				<div dojoType="unieap.grid.Grid" width="100%" height="100%" binding="{store:'empDataStore'}">
					<fixed>
						<cell label="员工编号" width="80px" name="attr_empno">
						</cell>
					</fixed>
					<header>
						<cell width="30%" label="姓名" name="NAME">
						</cell>
						<cell width="40%" label="职位" name="attr_job">
						</cell>
						<cell width="30%" label="工资" name="attr_sal" dataType="number">
						</cell>
					</header>
				</div>
			</div>
		</div>
		<div dojoType="unieap.layout.AdaptiveContainer" title="自适应样例" height="500px" width="49%" style="float:right;">
			<div dojoType="unieap.layout.AdaptivePane">
				<div dojoType="unieap.layout.TitlePane" title="自适应容器嵌套" style="height:100px;">
					以下嵌套了两个自适应容器
				</div>
			</div>
			<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="100%">
				<div dojoType="unieap.layout.AdaptiveContainer" height="100%" width="49%" style="float:left;">
					<div dojoType="unieap.layout.AdaptivePane">
						<div dojoType="unieap.layout.TitlePane" title="自适应容器嵌套1" style="height:100px;">
							自适应容器嵌套1 高100px
						</div>
					</div>
					<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="100%">
						<div dojoType="unieap.grid.Grid" width="100%" height="100%" binding="{store:'empDataStore'}">
							<header>
								<cell width="50px" label="姓名" name="NAME">
								</cell>
								<cell width="60px" label="职位" name="attr_job">
								</cell>
								<cell width="50px" label="工资" name="attr_sal" dataType="number">
								</cell>
							</header>
						</div>
					</div>
				</div>
				<div dojoType="unieap.layout.AdaptiveContainer" height="100%" width="49%" style="float:right;">
					<div dojoType="unieap.layout.AdaptivePane">
						<div dojoType="unieap.layout.TitlePane" title="自适应容器嵌套2" style="height:150px;">
							自适应容器嵌套2 高150px
						</div>
					</div>
					<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="100%">
						<div dojoType="unieap.grid.Grid" width="100%" height="100%" binding="{store:'empDataStore'}">
							<header>
								<cell width="30%" label="姓名" name="NAME">
								</cell>
								<cell width="40%" label="职位" name="attr_job">
								</cell>
								<cell width="30%" label="工资" name="attr_sal" dataType="number">
								</cell>
							</header>
						</div>
					</div>
				</div>
			</div>
		</div>
		<br/>
		<div dojoType="unieap.layout.TitlePane" open="false" style="margin-top:20px;width:100%;clear:both;" title="代码">
			<textarea name="code" class="html">
			<div dojoType="unieap.layout.AdaptiveContainer" title="自适应样例" height="500px" width="49%" style='float:left'>
				<div dojoType="unieap.layout.AdaptivePane">
					<div dojoType="unieap.layout.TitlePane" style="height:200px" title="自适应容器">
						当此titlepane收拢时,以下表格自动变高。
						<br/>
						普通表格为40%高
						<br/>
						unieap grid为60%高
					</div>
				</div>
				<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="40%">
					<table style="width:100%;height:100%;" border=1>
						<tr>
							<td>
								1
							</td>
							<td>
								2
							</td>
						</tr>
						<tr>
							<td>
								3
							</td>
							<td>
								4
							</td>
						</tr>
					</table>
				</div>
				<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="60%">
					<div dojoType="unieap.grid.Grid" width="100%" height="100%" binding="{store:'empDataStore'}">
						<fixed>
							<cell label="员工编号" width="80px" name="attr_empno"></cell>
						</fixed>
						<header>
							<cell width="30%" label="姓名" name="NAME"></cell>
							<cell width="40%" label="职位" name="attr_job"></cell>
							<cell width="30%" label="工资" name="attr_sal" dataType="number"></cell>
						</header>
					</div>
				</div>
			</div>
			</textarea>
			<textarea name="code" class="html">
			<div dojoType="unieap.layout.AdaptiveContainer" title="自适应样例" height="500px" width="49%" style="float:right;">
				<div dojoType="unieap.layout.AdaptivePane">
					<div dojoType="unieap.layout.TitlePane" title="自适应容器嵌套" style="height:100px;">
						以下嵌套了两个自适应容器
					</div>
				</div>
				<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="100%">
					<div dojoType="unieap.layout.AdaptiveContainer" height="100%" width="49%" style="float:left;">
						<div dojoType="unieap.layout.AdaptivePane">
							<div dojoType="unieap.layout.TitlePane" title="自适应容器嵌套1" style="height:100px;">
								自适应容器嵌套1 高100px
							</div>
						</div>
						<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="100%">
							<div dojoType="unieap.grid.Grid" width="100%" height="100%" binding="{store:'empDataStore'}">
								<header>
									<cell width="50px" label="姓名" name="NAME">
									</cell>
									<cell width="60px" label="职位" name="attr_job">
									</cell>
									<cell width="50px" label="工资" name="attr_sal" dataType="number">
									</cell>
								</header>
							</div>
						</div>
					</div>
					<div dojoType="unieap.layout.AdaptiveContainer" height="100%" width="49%" style="float:right;">
						<div dojoType="unieap.layout.AdaptivePane">
							<div dojoType="unieap.layout.TitlePane" title="自适应容器嵌套2" style="height:150px;">
								自适应容器嵌套2 高150px
							</div>
						</div>
						<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="100%">
							<div dojoType="unieap.grid.Grid" width="100%" height="100%" binding="{store:'empDataStore'}">
								<header>
									<cell width="30%" label="姓名" name="NAME">
									</cell>
									<cell width="40%" label="职位" name="attr_job">
									</cell>
									<cell width="30%" label="工资" name="attr_sal" dataType="number">
									</cell>
								</header>
							</div>
						</div>
					</div>
				</div>
			</div>
			</textarea>
		</div>
	</body>
</html>
