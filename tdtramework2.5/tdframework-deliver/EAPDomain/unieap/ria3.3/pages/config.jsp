<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="com.neusoft.unieap.ria.config.RIAConfig" %>
<%@ page import="com.neusoft.unieap.service.org.Person" %>

<%
	String path = request.getContextPath();
    String appPath = EAPConfigHelper.getApplicationContextPath(request);
    String cmpPath = request.getRequestURI(); //获取页面路径地址
    String themePath = path + "/unieap/ria3.3/unieap/themes/blue/css";
    boolean dialogRelogin= RIAConfig.DIALOGRELOGIN;//设置是否使用Dialog进行重新登录
    boolean PUBLICATION = RIAConfig.PUBLICATION; //设置是否
	boolean isEncrypt = RIAConfig.ENCRYPT;//是否使用加密
	Person person = (Person) session.getAttribute("userinfo");
	
	
	java.util.Properties envProp = (java.util.Properties)request.getSession().getServletContext().getAttribute("ENVCONF");
	//System.out.println("???????????????????????????????????    " + envProp.getProperty("td.jscompress.flag"));
	boolean isCompressJs = false;
	if ("1".equals(envProp.getProperty("td.usejscompress.flag"))) {
		isCompressJs = true;
	}
%>
<style>
	body{
		margin : 0px;
		visibility : hidden;
	}
</style>
<script type="text/javascript">
	//var beginTime = new Date();
	//初始化系统参数
	unieap = {};
	unieap.WEB_APP_NAME = "<%=path%>";
	unieap.appPath = "<%=appPath%>";
	unieap.cmpPath = "<%=cmpPath%>"; //unieap.cmpPath用于grid自定义中
	unieap.dialogRelogin="<%=dialogRelogin%>";
	unieap.isEncrypt = "<%=isEncrypt%>";
	unieap.loginAccount = '<%=(person!=null?person.getAccount():"")%>';
	unieap.locale = "zh_CN";
</script>
 <!--  
<link rel="stylesheet" type="text/css" href="<%//=path%>/unieap/ria3.3/unieap/themes/base/css/unieap.css" charset="utf-8"></link>
<link rel="stylesheet" type="text/css" href="<%//=themePath%>/<%//=PUBLICATION?"unieap-all.css":"unieap.css"%>" ></link>
-->
<%if(!isCompressJs) {//if(!PUBLICATION){ %>
<link rel="stylesheet" type="text/css" href="<%=path%>/unieap/ria3.3/unieap/themes/base/css/unieap.css" charset="utf-8"></link>
<link rel="stylesheet" type="text/css" href="<%=themePath%>/<%=PUBLICATION?"unieap-all.css":"unieap.css"%>" ></link>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/dojo/dojo.js" djConfig=" parseOnLoad: true,locale:'zh'" ></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/patch/dojo-patch.js"  charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/dijit/dijit.js"  charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/nls/application_zh_CN.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/global.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/cache.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/rpc.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/Form.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/FieldSet.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/TextBox.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/InlineEditBox.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/Textarea.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/NumberTextBox.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/TextBoxWithIcon.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/ComboBox.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/DateTextBox.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/ComboBoxTree.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/Button.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/DropDownButton.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/CheckBox.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/RadioButton.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/CheckBoxGroup.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/RadioButtonGroup.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/FileInput.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/tree/Tree.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/layout/Container.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/layout/TitlePane.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/layout/TabContainer.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/layout/AdaptiveContainer.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/layout/BorderContainer.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/layout/BorderPane.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/layout/HBoxContainer.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/layout/VBoxContainer.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/grid/Grid.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/core/lib.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/core/cell.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/manager/Manager.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/core/rowbar.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/manager/LayoutManager.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/core/builder.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/core/view.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/core/scroller.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/manager/ViewManager.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/manager/RowManager.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/manager/BindingManager.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/manager/MenuManager.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/manager/SelectionManager.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/manager/RowEditManager.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/manager/PagingManager.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/manager/ExportManager.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/menu/lockcell.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/menu/showcell.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/manager/Individual.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/core/toolbar.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/xgrid/Grid.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/dialog/DialogUtil.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/dialog/MessageBox.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/menu/Menu.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/Tooltip.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/form/RichTextEditor.js"></script>
<%} else{%>
<!-- 
<script type="text/javascript" src="<%//=path%>/unieap/ria3.3/dojo/dojo.js" djConfig="parseOnLoad: true,locale:'zh'" ></script>
<script type="text/javascript" src="<%//=path%>/unieap/ria3.3/unieap/nls/application_zh_CN.js"></script>
-->
<!--将global.js文件独立出来,用来可以在此处引入自己的global.js文件 -->
<!-- 
<script type="text/javascript" src="<%//=path%>/unieap/ria3.3/unieap/global.js"></script>
<script type="text/javascript" src="<%//=path%>/unieap/ria3.3/unieap/unieap-all.js" ></script>
 -->
<link rel="stylesheet" type="text/css" href="<%=themePath%>/unieap-combo.css" ></link>
<link rel="stylesheet" type="text/css" href="<%=path%>/unieap/ria3.3/unieap/themes/base/css/tooltip.css" ></link>
<link rel="stylesheet" type="text/css" href="<%=path%>/unieap/ria3.3/unieap/themes/blue/css/tooltip.css" ></link>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/dojo/dojo.js" djConfig="parseOnLoad: true,locale:'zh'" ></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/dijit/dijit.js"  charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/pages/unieap-combo.js" charset="utf-8"></script>


<%} %>
<script type="text/javascript">
	//var jsTime = new Date();
	dojo.addOnLoad(function(){
		dojo.style(document.body,"visibility","visible");
		//设置容器的大小
		//unieap.fireContainerResize();	
		//解决在dojo.addOnLoad方法里控件聚焦的问题
		unieap.blurWidget();
		
	});
	unieap.session.dialogRelogin=<%=dialogRelogin%>;
</script>

