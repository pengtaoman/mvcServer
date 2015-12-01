<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>菜单样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			.plusIcon{
				background: url("<%=appPath%>/pages/samples/menu/plus.gif") no-repeat center center;
		 		height: 18px;
				width:18px;
			}
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/menu/menu.js"></script>
	</head>
	<body class="unieap">
		<div dojoType="unieap.layout.TitlePane" style="line-height:20px;font-size:13px;font-family:宋体;length:250px" title="菜单">
			·targetNodeIds属性绑定；
        	<br>
			·bindDomNode方法绑定及取消绑定；
        	<br>
        	·菜单事件；
        	<br>
        	·加图标；
       		<br>
        	·多级菜单；
        	<br>
		</div>
		<div dojoType="unieap.layout.TitlePane" style="line-height:20px;font-size:13px;font-family:宋体;length:250px" title="菜单">
		 <fieldset dojoType="unieap.form.FieldSet" title="菜单控件">
		<table width="100%" border="0">
			<tr length="40">
				<td>
					targetNodeIds属性绑定菜单		
			<div dojoType="unieap.form.Button" id="btn" label="右键点击生成一个菜单"></div>&nbsp;&nbsp;点击菜单中的"中国"可以触发菜单事件；中国前增加一个加号图标<br>
			<div dojoType="unieap.menu.Menu" targetNodeIds="btn" id="menu" style="display:none">
				<div dojoType="unieap.menu.MenuItem" iconClass="plusIcon" onClick="fn_click">中国</div>
				<div dojoType="unieap.menu.MenuItem" disabled="true">日本</div>
				<div dojoType="unieap.menu.MenuSeparator"></div>  
				<div dojoType="unieap.menu.PopupMenuItem">
					<span>美国</span>
						<div dojoType="unieap.menu.Menu">
							<div dojoType="unieap.menu.MenuItem">阿拉斯加</div>
							<div dojoType="unieap.menu.MenuItem">拉斯维加斯</div>
							<div dojoType="unieap.menu.MenuSeparator"></div>
							<div dojoType="unieap.menu.MenuItem">纽约</div>
						</div>
				</div>	
			</div>
			</div>
				</td>
			</tr>
			<tr length="40">
				<td>
					bindDomNode方法绑定菜单&nbsp;&nbsp;
					<div dojoType="unieap.form.Button" id="btn1" label="右键点击生成一个菜单"></div><br>
				</td>
			</tr>
			<tr length="40">
				<td>
					点击解除上一按钮菜单绑定&nbsp;&nbsp;
					<div dojoType="unieap.form.Button" id="btn2" label="点击解除上一按钮绑定" onclick="fn_unbind"></div>
				</td>
			</tr>
			</table>
			</fieldset>	
		</div>
	</div>
	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="菜单源码">
	       <textarea name="code" class="html">
			<!--生成菜单及属性绑定-->
			<div dojoType="unieap.menu.Menu" targetNodeIds="btn" id="menu" style="display:none">
				<div dojoType="unieap.menu.MenuItem" iconClass="plusIcon" onClick="fn_click">中国</div>
				<div dojoType="unieap.menu.MenuItem" disabled="true">日本</div>
				<div dojoType="unieap.menu.MenuSeparator"></div>  
				<div dojoType="unieap.menu.PopupMenuItem">
				<span>美国</span>
					<div dojoType="unieap.menu.Menu">
					<div dojoType="unieap.menu.MenuItem">阿拉斯加</div>
					<div dojoType="unieap.menu.MenuItem">拉斯维加斯</div>
					<div dojoType="unieap.menu.MenuSeparator"></div>
					<div dojoType="unieap.menu.MenuItem">纽约</div>
				</div>
			</div>
			<!--bindDomNode绑定及解绑定-->
			<script type="text/javascript">
			unieap.byId('menu').bindDomNode(dojo.byId('btn1'));
			function fn_unbind(){
				unieap.byId('menu').unBindDomNode(dojo.byId('btn1'));
			}
			</script>		
        </textarea>
		</div>
	</body>