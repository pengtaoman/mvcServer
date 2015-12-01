<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<TITLE>TitlePane样例</TITLE>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
			@import "../../../../../unieap/ria3.3/unieap/themes/default/form/form.css";
			@import "../../../../../unieap/ria3.3/unieap/themes/default/layout/layout.css";
		</style>
	</head>
	<script type="text/javascript" src="../../../../../unieap/ria3.3/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true">
	</script>
	<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
	</script>
	<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
	</script>
	<script type="text/javascript" src="<%=appPath%>/pages/samples/layout/titlepane/multi-titlepane.js"></script>
	<script>
		
	</script>
	<body class="unieap">
	<div dojoType="unieap.layout.TitlePane" style="line-height:20px;font-size:13px;font-family:宋体;" title="说明">
		该样例展示了TitlePane组件的如下特性：
		<br/>
		·设定高度；
		<br/>
		·设置标题；
		<br/>
		·自定义扩展信息；
		<br/>
		·打开和关闭前后的事件（onCollapse、onExpand、onBeforeCollapse和onBeforeExpand）；
		<br/>
		·自定义URL
	</div>
	<br/>
	<div dojoType="unieap.layout.TitlePane" title="例子">
		<!--设置奇数高度，使得内部container高度是偶数， 避免IE下出滚动条-->
		<div dojoType="unieap.layout.TabContainer" style="height:301px;width:auto;">
			<div dojoType="unieap.layout.ContentPane" title="高度">
				<div dojoType="unieap.layout.TitlePane" style="height:20%" title="20%">
					height:20%
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:30%" title="30%">
					height:30%
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:50%" title="50%">
					height:50%
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="标题">
				<div dojoType="unieap.layout.TitlePane" id = "titlepane_t" style="height:100%" title="设置标题">
					<div dojoType="unieap.form.Button" label="标题1" onClick="unieap.byId('titlepane_t').setTitle('标题1')">
					</div>
					<div dojoType="unieap.form.Button" style="margin-left:5px;" label="标题2" onClick="unieap.byId('titlepane_t').setTitle('标题2')">
					</div>
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="默认展开">
				<div dojoType="unieap.layout.TitlePane" style="height:50%" title="默认展开">
					默认展开
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:50%" open="false" title="默认关闭">
					默认关闭 open="false"
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="禁用伸展">
				<div dojoType="unieap.layout.TitlePane" style="height:50%" flexible="true" title="可伸展">
					可伸展
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:50%" flexible="false" title="不可伸展">
					不可伸展 flexible="false"
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="动画效果">
				<div dojoType="unieap.layout.TitlePane" style="height:50%" animate="true" title="动画">
					动画 animate="true"
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:50%" animate="false" title="无动画效果">
					无动画效果 animate="false"
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="动画延时">
				<div dojoType="unieap.layout.TitlePane" style="height:20%" animate="true" duration="500" title="500">
					动画延时 duration="500"
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:30%" animate="true" duration="2000" title="2000">
					动画延时 duration="2000"
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:50%" animate="true" duration="5000" title="5000">
					动画延时 duration="5000"
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="加载url">
				<div dojoType="unieap.layout.TitlePane" href="form_textarea.do" style="height:100%" title="加载url">
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="右上角自定义组件">
				<div dojoType="unieap.layout.TitlePane" id="hrefTitlePane" style="height:100%" title="右上角自定义组件">
					<div type="buttons" style="width:250px;margin-top:2px;">
						<div dojoType="unieap.form.ComboBox" onEnter="onComChange" onChange="onComChange" id="com" dataProvider="{store:'test'}">
						</div>
					</div>
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="关闭时触发事件">
				<div dojoType="unieap.layout.TitlePane" title="关闭时触发事件" style="height:100%" onCollapse="setEvent()">
					关闭时触发事件
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="打开时触发事件">
				<div dojoType="unieap.layout.TitlePane" open="false" title="打开时触发事件" style="height:100%" onExpand="setEvent()">
					打开时触发事件
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="关闭前触发事件">
				<div dojoType="unieap.layout.TitlePane" title="关闭前触发" style="height:100%" onBeforeCollapse="setEvent()">
					关闭前触发事件
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="打开前触发事件">
				<div dojoType="unieap.layout.TitlePane" open="false" title="打开前触发" style="height:100%" onBeforeExpand="setEvent()">
					打开前触发事件 
				</div>
			</div>
		</div>
	</div>
	</div>
</div>
<div dojoType="unieap.layout.TitlePane" open="false" title="代码">
	<textarea name="code" class="html">
		<div dojoType="unieap.layout.TabContainer" style="height:300px;width:100%;float:left">
			<div dojoType="unieap.layout.ContentPane" title="高度">
				<div dojoType="unieap.layout.TitlePane" style="height:20%" title="20%">
					height:20%
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:30%" title="30%">
					height:30%
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:50%" title="50%">
					height:50%
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="标题">
				<div dojoType="unieap.layout.TitlePane" style="height:100%" title="设置标题">
					<div dojoType="unieap.form.Button" label="标题1" onClick="unieap.byId('titlepane_t').setTitle('标题1')">
					</div>
					<div dojoType="unieap.form.Button" style="margin-left:5px;" label="标题2" onClick="unieap.byId('titlepane_t').setTitle('标题2')">
					</div>
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="默认展开">
				<div dojoType="unieap.layout.TitlePane" style="height:50%" title="默认展开">
					默认展开
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:50%" open="false" title="默认关闭">
					默认关闭 open="false"
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="禁用伸展">
				<div dojoType="unieap.layout.TitlePane" style="height:50%" flexible="true" title="可伸展">
					可伸展
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:50%" flexible="false" title="不可伸展">
					不可伸展 flexible="false"
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="动画效果">
				<div dojoType="unieap.layout.TitlePane" style="height:50%" animate="true" title="动画">
					动画 animate="true"
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:50%" animate="false" title="无动画效果">
					无动画效果 animate="false"
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="动画延时">
				<div dojoType="unieap.layout.TitlePane" style="height:20%" animate="true" duration="500" title="500">
					动画延时 duration="500"
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:30%" animate="true" duration="2000" title="2000">
					动画延时 duration="2000"
				</div>
				<div dojoType="unieap.layout.TitlePane" style="height:50%" animate="true" duration="5000" title="5000">
					动画延时 duration="5000"
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="加载url">
				<div dojoType="unieap.layout.TitlePane" href="/form_textarea.do" style="height:100%" title="加载url">
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="右上角自定义组件">
				<div dojoType="unieap.layout.TitlePane" style="height:100%" title="右上角自定义组件">
					<div type="buttons" style="width:250px">
						<div dojoType="unieap.form.ComboBox" onEnter="onComChange" onChange="onComChange" id="com" dataProvider="{store:'test'}">
						</div>
					</div>
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="关闭时弹出事件">
				<div dojoType="unieap.layout.TitlePane" title="关闭时弹出事件" style="height:100%" onCollapse="setEvent()">
					关闭时弹出事件
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="打开时触发事件">
				<div dojoType="unieap.layout.TitlePane" open="false" title="打开时触发事件" style="height:100%" onExpand="setEvent()">
					打开时弹出事件
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="关闭前触发事件">
				<div dojoType="unieap.layout.TitlePane" title="关闭前触发" style="height:100%" onBeforeCollapse="setEvent()">
					关闭前触发事件
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="打开前触发事件">
				<div dojoType="unieap.layout.TitlePane" open="false" title="打开前触发" style="height:100%" onBeforeExpand="setEvent()">
					打开前弹出事件 
				</div>
			</div>
		</div>
	</textarea>
</div>
<script>
</script>
</body>
</html>
