<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
		function attr_multiMenu(){
			
			var menu=new unieap.menu.Menu({id:'menu',contextMenuForWindow:'true'});
			menu.addChild(new unieap.menu.MenuItem({
				label:'美国'
			}))
			var childMenu=new unieap.menu.Menu();
			childMenu.addChild(new unieap.menu.MenuItem({
				label:'辽宁'
			}));
			childMenu.addChild(new unieap.menu.MenuItem({
				label:'吉林'
			}));
			childMenu.addChild(new unieap.menu.MenuItem({
				label:'黑龙江'
			}));
			
			childMenu.addChild(new unieap.menu.MenuSeparator());
			childMenu.addChild(new unieap.menu.MenuItem({
				label:'河北'
			}));
			var popMenu=new unieap.menu.PopupMenuItem({
				label:'中国',
				popup:childMenu
			})
			menu.addChild(popMenu)
			menu.startup();
			
			//return "右键点击页面左上角的按钮会看到菜单,菜单项还拥有子菜单";
			
		}
		
		function menuClick(label,evt) {
			//alert(label);
			unieap.byId("dropButton").setLabel(label);
		}
		</script>
		
	</head>
<body class="unieap">
<div dojoType="unieap.layout.TitlePane" width="1000px" height="480px" title="">
<br>菜单基本样式<br>
<div dojoType="unieap.menu.Menu">
	<div dojoType="unieap.menu.MenuItem">第一个</div>
	<div dojoType="unieap.menu.MenuItem" disabled="true">第一个</div>
	<div dojoType="unieap.menu.MenuSeparator"></div>
	<div dojoType="unieap.menu.MenuItem">第三个</div>
</div>
<br>级联菜单样式<br>
	<div dojoType="unieap.menu.Menu">
		<div dojoType="unieap.menu.MenuItem" label="单独的"></div>
		<div dojoType="unieap.menu.PopupMenuItem" label="子项目">
			<div dojoType="unieap.menu.Menu">
				<div dojoType="unieap.menu.MenuItem" label="项目一"></div>
				<div dojoType="unieap.menu.MenuItem" label="项目二"></div>
			</div>
		</div>
	</div>
<br>右键菜单<br>
<div dojoType="unieap.form.Button" label="点击创建右键菜单" onclick="attr_multiMenu();"></div>

<br><br>下拉按钮菜单<br>
<div dojoType="unieap.form.DropDownButton" id="dropButton" onclick="" label="点击我">
		<div dojoType="unieap.menu.Menu">
		<div dojoType="unieap.menu.MenuItem" label="单独的" onclick="menuClick"></div>
		<div dojoType="unieap.menu.PopupMenuItem" label="子项目">
			<div dojoType="unieap.menu.Menu">
				<div dojoType="unieap.menu.MenuItem" label="项目一" onclick="menuClick"></div>
				<div dojoType="unieap.menu.MenuItem" label="项目二" onclick="menuClick"></div>
			</div>
		</div>
	</div>
</div>



</div>
</body>
</html>	
	