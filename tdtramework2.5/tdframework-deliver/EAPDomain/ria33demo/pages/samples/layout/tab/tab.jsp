<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>Tab样例</title>
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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/layout/tab/tab.js">
		</script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了Tab组件的如下特性：
			<br>
			·多页横向和纵向的Tab布局；
			<br>
			·多Tab出现滚动按钮；
			<br>
			·指定URL，懒加载；(href)
			<br>
			·自动添加Tab页和删除Tab页；
			<br>
			·点击Tab，调用初始化方法；(onInit)
			<br>
			·展开事件。(onShow)
			<br>
			·动态创建Tab
		</div>
		<div dojoType="unieap.layout.TitlePane" id="titlepane" style="height:450px" title="tab控件样例">
			<table>
				<colgroup>
					<td width="48%">
					</td>
					<td width="2%">
					</td>
					<td width="50%">
					</td>
				</colgroup>
				<tr>
					<td>
						<div dojoType="unieap.layout.TabContainer" id="tabcontainer" style="height:200px;">
							<div dojoType="unieap.layout.ContentPane" title="顶部排列Tab">
								顶部排列，指定url加载，多Tab出现滚动按钮。
							</div>
							<div dojoType="unieap.layout.ContentPane" href="http://www.baidu.com" title="点击加载url(百度)">
							</div>
							<div dojoType="unieap.layout.ContentPane" title="容器2">
							</div>
							<div dojoType="unieap.layout.ContentPane" title="容器3">
							</div>
							<div dojoType="unieap.layout.ContentPane" title="容器4">
							</div>
							<div dojoType="unieap.layout.ContentPane" title="容器5">
							</div>
							<div dojoType="unieap.layout.ContentPane" title="容器6">
							</div>
							<div dojoType="unieap.layout.ContentPane" title="容器7">
							</div>
							<div dojoType="unieap.layout.ContentPane" title="容器8">
							</div>
							<div dojoType="unieap.layout.ContentPane" title="容器9">
							</div>
							<div dojoType="unieap.layout.ContentPane" title="容器10">
							</div>
							<div dojoType="unieap.layout.ContentPane" title="容器11">
							</div>
						</div>
					</td>
					<td></td>
					<td>
						<div dojoType="unieap.layout.TabContainer" tabPosition="bottom" style="height:200px;">
							<div dojoType="unieap.layout.ContentPane" title="底部排列tab" id="tab1">
								底部排列，其中第二个tab页为可删除tab页，点击叉图标可以删除当前tab页
								点击下面增加按钮可增加一个Tab，点删除按钮可将新增Tab删除。
							</div>
							<div dojoType="unieap.layout.ContentPane" id="tab2" title="closable=true" closable="true">
								closable="true" 可以被关闭
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div dojoType="unieap.layout.TabContainer" tabPosition="left-h" style="height:200px;">
							<div dojoType="unieap.layout.ContentPane" title="左端">
								初始化下一个Tab页可触发事件
							</div>
							<div dojoType="unieap.layout.ContentPane" onShow="alert('show')" title="onShow">
								onShow="alert('show')" 每一次
							</div>
							<div dojoType="unieap.layout.ContentPane" onInit="alert('init')" title="onInit">
								onInit="alert('init')" 第一次
							</div>
						</div>
					</td>
					<td></td>
					<td>
						<div dojoType="unieap.layout.TabContainer" tabPosition="right-h" style="height:200px;">
							<div dojoType="unieap.layout.ContentPane" title="右端排列Tab">
								操作tab容器
								<br>
								<div dojoType="unieap.form.Button" id='createTabButton' onClick="createTab" label="创建tab容器">
								</div>
								<div dojoType="unieap.form.Button" id='addTabButton' disabled="true" onClick="addTab" label="增加tab页">
								</div>
								<div dojoType="unieap.form.Button" id='removeTabButton' disabled="true" onClick="removeTab" label="删除tab页">
								</div>
								<div dojoType="unieap.form.Button" id='getTabButton' disabled="true" onClick="getTab" label="取得当前tab页">
								</div>
							</div>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" open="false" dojoType="unieap.layout.TitlePane" title="tab控件源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.layout.TitlePane" id="titlepane" title="tab控件样例">
					<div dojoType="unieap.layout.TabContainer" id="tabcontainer" style="height:200px;">
						<div dojoType="unieap.layout.ContentPane" title="顶部排列Tab">
							顶部排列，指定url加载，多Tab出现滚动按钮。
						</div>
						<div dojoType="unieap.layout.ContentPane" href="http://www.baidu.com" title="点击加载url(百度)">
						</div>
						<div dojoType="unieap.layout.ContentPane" title="容器2">
						</div>
						<div dojoType="unieap.layout.ContentPane" title="容器3">
						</div>
						<div dojoType="unieap.layout.ContentPane" title="容器4">
						</div>
						<div dojoType="unieap.layout.ContentPane" title="容器5">
						</div>
						<div dojoType="unieap.layout.ContentPane" title="容器6">
						</div>
						<div dojoType="unieap.layout.ContentPane" title="容器7">
						</div>
						<div dojoType="unieap.layout.ContentPane" title="容器8">
						</div>
						<div dojoType="unieap.layout.ContentPane" title="容器9">
						</div>
						<div dojoType="unieap.layout.ContentPane" title="容器10">
						</div>
						<div dojoType="unieap.layout.ContentPane" title="容器11">
						</div>
					</div>
					<div dojoType="unieap.layout.TabContainer" tabPosition="bottom" style="height:200px;">
						<div dojoType="unieap.layout.ContentPane" title="底部排列tab" id="tab1">
							底部排列，其中第二个tab页为可删除tab页，点击叉图标可以删除当前tab页
							点击下面增加按钮可增加一个Tab，点删除按钮可将新增Tab删除。
						</div>
						<div dojoType="unieap.layout.ContentPane" id="tab2" title="closable=true" closable="true">
							closable="true" 可以被关闭
						</div>
					</div>
					<div dojoType="unieap.layout.TabContainer" tabPosition="left-h" style="height:200px;">
						<div dojoType="unieap.layout.ContentPane" title="左端">
							初始化下一个Tab页可触发事件
						</div>
						<div dojoType="unieap.layout.ContentPane" onShow="alert('show')" title="onShow">
							onShow="alert('show')" 每一次
						</div>
						<div dojoType="unieap.layout.ContentPane" onInit="alert('init')" title="onInit">
							onInit="alert('init')" 第一次
						</div>
					</div>
					<div dojoType="unieap.layout.TabContainer" tabPosition="right-h" style="height:200px;">
						<div dojoType="unieap.layout.ContentPane" title="右端排列Tab">
							操作tab容器
							<br>
							<div dojoType="unieap.form.Button" id='createTabButton' onClick="createTab" label="创建tab容器">
							</div>
							<div dojoType="unieap.form.Button" id='addTabButton' disabled="true" onClick="addTab" label="增加tab容器">
							</div>
							<div dojoType="unieap.form.Button" id='removeTabButton' disabled="true" onClick="removeTab" label="删除tab容器">
							</div>
							<div dojoType="unieap.form.Button" id='getTabButton' disabled="true" onClick="getTab" label="取得当前tab页">
							</div>
						</div>
					</div>
				</div>
				<script>
					function createTab(){
						new unieap.layout.TabContainer({
							id: 'createTab',
							style: {
								height: '200px',
								width: '48%',
								float: 'left'
							}
						}).placeAt(dojo.byId("titlepane").containerNode, 'last').startup();
						
						unieap.byId('createTabButton').setDisabled(true);
						unieap.byId('addTabButton').setDisabled(false);
						unieap.byId('removeTabButton').setDisabled(false);
						unieap.byId('getTabButton').setDisabled(false);
						
					}
					
					function addTab(){
						unieap.byId('createTab').addChild(new unieap.layout.ContentPane({
							title: "新增的Tab页"
						}));
					}
					
					function removeTab(){
						var t = unieap.byId('createTab');
						var c = t.getChildren();
						var n = Math.ceil(Math.random() * (c.length - 1));
						if (c[n]) {
							t.removeChild(c[n]);
						}
					}
					
					function getTab(){
						var t = unieap.byId('createTab');
						if (t && t.selectedChildWidget) 
							alert("id :" + t.selectedChildWidget.id + "\r\ntitle :" + t.selectedChildWidget.title)
						
					}
				</script>
			</textarea>
		</div>
	</body>
</html>
