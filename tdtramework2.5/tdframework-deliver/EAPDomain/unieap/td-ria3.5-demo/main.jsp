<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%
String webpath = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%   out.println("<script type='text/javascript'>function getcontext(){var APP_PATH = '"+webpath+"'; return APP_PATH;}</script>");%>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
		
		var APP_PATH = getcontext();
		
         var initStore = new unieap.ds.DataStore();

         dataCenter.addDataStore(initStore);
         
         dojo.addOnLoad(function(){
        	 var text =    
             '[{"menuId":"form","menuName":"表单","pageLink":"","parentMenuId":"","ifChild":false},'+
             '{"menuId":"form-textbox","menuName":"文本框","pageLink":"/unieap/td-ria3.5-demo/form/textBox.jsp","parentMenuId":"form","ifChild":true},'+
			 '{"menuId":"form-date","menuName":"日期","pageLink":"/unieap/td-ria3.5-demo/form/date.jsp","parentMenuId":"form","ifChild":true},'+
			 '{"menuId":"form-checkbox","menuName":"复选框","pageLink":"/unieap/td-ria3.5-demo/form/checkbox.jsp","parentMenuId":"form","ifChild":true},'+
			 '{"menuId":"form-ridio","menuName":"单选框","pageLink":"/unieap/td-ria3.5-demo/form/radio.jsp","parentMenuId":"form","ifChild":true},'+
			 '{"menuId":"form-combobox","menuName":"ComboBox","pageLink":"/unieap/td-ria3.5-demo/form/combobox.jsp","parentMenuId":"form","ifChild":true},'+
			 '{"menuId":"form-rich","menuName":"富文本编辑器","pageLink":"/unieap/td-ria3.5-demo/form/rich.jsp","parentMenuId":"form","ifChild":true},'+
			 '{"menuId":"form-textarea","menuName":"Textarea","pageLink":"/unieap/td-ria3.5-demo/form/textarea.jsp","parentMenuId":"form","ifChild":true},'+
			 '{"menuId":"grid","menuName":"表格","pageLink":"","parentMenuId":"","ifChild":false},'+
			 '{"menuId":"grid-base","menuName":"基本表格","pageLink":"/unieap/td-ria3.5-demo/grid/grid-base.jsp","parentMenuId":"grid","ifChild":true},'+
			 '{"menuId":"grid-layout","menuName":"表格布局","pageLink":"/unieap/td-ria3.5-demo/grid/grid-layout.jsp","parentMenuId":"grid","ifChild":true},'+
			 '{"menuId":"grid-tree","menuName":"表格树","pageLink":"/unieap/td-ria3.5-demo/grid/grid-tree.jsp","parentMenuId":"grid","ifChild":true},'+
			 '{"menuId":"grid-edit","menuName":"表格编辑","pageLink":"/unieap/td-ria3.5-demo/grid/grid-edit.jsp","parentMenuId":"grid","ifChild":true},'+
			 '{"menuId":"grid-turnpage","menuName":"表格翻页","pageLink":"/unieap/td-ria3.5-demo/grid/grid-turnpage.jsp","parentMenuId":"grid","ifChild":true},'+
			 '{"menuId":"grid-export","menuName":"表格导出","pageLink":"/unieap/td-ria3.5-demo/grid/grid-export.jsp","parentMenuId":"grid","ifChild":true},'+
			 '{"menuId":"grid-print","menuName":"表格打印","pageLink":"/unieap/td-ria3.5-demo/grid/grid-print.jsp","parentMenuId":"grid","ifChild":true},'+
			 '{"menuId":"tree","menuName":"树","pageLink":"","parentMenuId":"","ifChild":false},'+
			 '{"menuId":"tree-bind","menuName":"数据绑定","pageLink":"/unieap/td-ria3.5-demo/tree/tree-bind.jsp","parentMenuId":"tree","ifChild":true},'+
			 '{"menuId":"tree-edit","menuName":"编辑树","pageLink":"/unieap/td-ria3.5-demo/tree/tree-edit.jsp","parentMenuId":"tree","ifChild":true},'+
			 '{"menuId":"tree-load","menuName":"数据加载","pageLink":"/unieap/td-ria3.5-demo/tree/tree-load.jsp","parentMenuId":"tree","ifChild":true},'+
			 '{"menuId":"tree-layout","menuName":"树样式","pageLink":"/unieap/td-ria3.5-demo/tree/tree-layout.jsp","parentMenuId":"tree","ifChild":true},'+
			 '{"menuId":"container","menuName":"容器","pageLink":"","parentMenuId":"","ifChild":false},'+
			 '{"menuId":"container-tab","menuName":"Tab容器 ","pageLink":"/unieap/td-ria3.5-demo/container/container-tab.jsp","parentMenuId":"container","ifChild":true},'+
			 '{"menuId":"container-border","menuName":"方位布局容器 ","pageLink":"/unieap/td-ria3.5-demo/container/container-border.jsp","parentMenuId":"container","ifChild":true},'+
			 '{"menuId":"container-box","menuName":"Adaptive布局容器 ","pageLink":"/unieap/td-ria3.5-demo/container/container-box.jsp","parentMenuId":"container","ifChild":true},'+
			 '{"menuId":"dialog","menuName":"对话框","pageLink":"","parentMenuId":"","ifChild":false},'+
			 '{"menuId":"dialog-window","menuName":"弹出窗口 ","pageLink":"/unieap/td-ria3.5-demo/dialog/dialog-window.jsp","parentMenuId":"dialog","ifChild":true},'+
			 //'{"menuId":"dialog-util","menuName":"对话框工具 ","pageLink":"/unieap/td-ria3.5-demo/dialog/dialog-util.jsp","parentMenuId":"dialog","ifChild":true},'+
			 '{"menuId":"dialog-message","menuName":"消息对话框 ","pageLink":"/unieap/td-ria3.5-demo/dialog/dialog-message.jsp","parentMenuId":"dialog","ifChild":true},'+
			 '{"menuId":"dialog-message01","menuName":"消息定制 ","pageLink":"/unieap/td-ria3.5-demo/dialog/crm-message.jsp","parentMenuId":"dialog","ifChild":true},'+
			 '{"menuId":"menu","menuName":"菜单","pageLink":"","parentMenuId":"","ifChild":false},'+
			 '{"menuId":"menu-base","menuName":"基本菜单 ","pageLink":"/unieap/td-ria3.5-demo/menu/menu-base.jsp","parentMenuId":"menu","ifChild":true}'+
			 ']';
         //document.write(text);
         var newRowSet = dojo.fromJson(text);//eval("(" + text + ")");
         
         var newtreeStorePart = new unieap.ds.DataStore("newbasicTree",newRowSet);
         dataCenter.addDataStore(newtreeStorePart);
 
 		 var menuTree = unieap.byId('menuNaviTree');
		 var root = menuTree.getRootNode();
		 if (newtreeStorePart.getRecordCount() != 0) {
			menuTree.getBinding().setDataStore(root, newtreeStorePart, null);
		 } 

         root.refresh();
	    });
         
         function menuClick(node) {
        		var menuName = node.getLabel();
        		var menuUrl = node.getData()["pageLink"];
        		var menuId = node.getData()["menuId"];
        		var ifChild = node.getData()["ifChild"];
        		
        		var menuTree = unieap.byId('menuNaviTree');
        		
        		if (ifChild) {
        			var url = menuUrl;
        	        url = parent.parent.dealLeaf(node);
        			if (menuUrl.indexOf("/") == 0) {
        				url = APP_PATH + url;
        			} else {
        				url = APP_PATH +"/"+ url;
        			}
        	        //alert(url);
        		    var tabContain = unieap.byId("tabContainer");
        		    /* 
        		    //if (!tabContain) {
        		    	var tabContain = new unieap.layout.TabContainer({
        		    		id:"tabContainer",
        		    		height:"100%"
        		    	}
        		        );
        		    	tabContain.placeAt("tabc");
        		    	tabContain.show();
        		    //}
        		    */  
        		    var children = tabContain.getChildrenContainer();
        		    for ( var i = 0; i < children.length; i++) {
        				var paneUrl = children[i].href;
        				if (paneUrl == url) {
        					tabContain.selectChild(children[i]);
        					return;
        				}
        			}
        		    //alert(children.length);
        		    tabContain.addChild(new unieap.layout.ContentPane({
        		    	title: menuName,
        		    	href:url,
        		    	closable:true
        		    }));
        		    
        		} else {
        			if (!node.isOpend()) {
        				menuTree.expandNode(node); 
        			} else {
        				menuTree.collapseNode(node); 
        			}
        		}
        	}

        </script>
		
	</head>
<body class="unieap">
<div id="bc" dojoType="unieap.layout.BorderContainer" splitLine="true">
	<div dojoType="unieap.layout.BorderPane" region="center" id="centerBorderPane" title="TD前端控件效果展示">
	    <div id="tabc" height="100%"></div>
	    <!--  -->
	    <div dojoType="unieap.layout.TabContainer" id="tabContainer" height="100%">
	    </div>
	</div>
	<div dojoType="unieap.layout.BorderPane" region="left" title="TD前端控件" width="15%">
		<div dojoType='unieap.tree.Tree' style='height:100%;overflow-x:hidden;overflow-y:auto' id='menuNaviTree' onClick='menuClick' " 
	 binding="{'leaf':'ifChild','id':'menuId','store':initStore,'label':'menuName','parent':'parentMenuId',query:{name:'parentMenuId',relation:'=',value:''}}">
	</div>
 </div> 
</body>
</html>	
	