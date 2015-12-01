<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>
<%@ page import="com.neusoft.tdframework.common.util.PassWord" %>
<%
String webpath = request.getContextPath();

AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
String employeeId = authorizeVO.getEmployeeId();

StringBuffer paramStr = new StringBuffer();
String userName = authorizeVO.getWorkNo();
String passWord = PassWord.decode(authorizeVO.getWorkPwd());
paramStr.append("j_username=").append(userName).append("&j_password=").append(passWord);

%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
		"http://www.w3.org/TR/html4/strict.dtd">
<html style="overflow-y:hidden;overflow-x:hidden;">
<head>
<title>欢迎登录 中国电信 BSS系统</title>
<contextPath value="<%=webpath%>"/>


<%out.println("<script type='text/javascript'>function getcontext(){var APP_PATH = '"+webpath+"'; return APP_PATH;}</script>");%>
    <style type="text/css">
		@import "<%=webpath%>/unieap/ria3.3/dojox/layout/resources/GridContainer.css";
		.dj_ie6 .dropIndicator, .dj_ie6 .dojoxPortlet{
			margin: 5px;
		}
		.gridContainerZone > *{
			margin: 5px !important;
		}
		

	</style>
	
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<link rel="stylesheet" id="themeStyles" href="<%=webpath%>/unieap/ria3.3/dijit/themes/claro/claro.css">
<link href="<%=webpath%>/common/dx20/css/crm6_portal.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="<%=webpath%>/home/portalpage.js" ></script>
	<script type="text/javascript">
	    dojo.require("dojox.json.query");

	    dojo.require("dijit.Tooltip");
		dojo.require("dijit.TooltipDialog");
		dojo.require("dojox.widget.DialogSimple");
		dojo.require("dojox.widget.Dialog");
		
		dojo.require("dijit.form.MultiSelect");
		
		
		dojo.provide("dojo.data.ObjectStore");
		dojo.require("dojo.store.DataStore");
		dojo.require("dojo.store.Memory");
		dojo.require("dojo.store.Memory");
		
		
		var employeeid = "<%=employeeId%>";
		var settingPortalTempStore = new dojo.store.Memory();
		var settingPortalTempHeight = new dojo.store.Memory();
		
		//dojo.cookie("viewToMenuRela" + employeeid,"");
		//alert("11111111111   "+employeeid+"     " + dojo.cookie("viewToMenuRela" + employeeid));
		

	   
	    var authQueryStr = "<%=paramStr.toString()%>";
	    
	    var isToolDialogOpenned = false;
	    
	    var tempSettingSelectView;
	    var tempSettingHeightSelectView;
	
	    var mod = new ModTreeClass();
		dojo.subscribe("/dojox/mdnd/drop", function(theNews){
			mod.subscribeLayout();
		 });  
		//alert("-------------------------");
		dojo.addOnLoad(function() {
			//alert("0000000000000000000000000000");
			mod.getViewInfo();
			
			var viewIds = "";
			for (var i = 0; i < mod.viewInfoJson.length; i++) {
				if (i == 0) {
					viewIds = viewIds + mod.viewInfoJson[i]["view_Id"];
				} else {
					viewIds = viewIds + "~" + mod.viewInfoJson[i]["view_Id"];
				}
			}
			mod.getAllPortalet();
			mod.initSettingInfo(viewIds, "", false);
			
			
			var viewSel = dojo.byId("viewSel");
			viewSel.options.length = 0;
			for (var i = 0; i < mod.viewInfoJson.length; i++) {
				viewSel.add(new Option(mod.viewInfoJson[i]["view_Name"],mod.viewInfoJson[i]["view_Id"]));
			}
			
			for (var i = 0; i < viewSel.options.length; i++) {
				
				if (viewSel.options[i].value == mod.defaultView["default_view_Id"]) {
					viewSel.options[i].selected="selected";
					//alert(viewSel.options[i].value);
					break;
				}
			}
			//alert(mod.defaultView["view_Id"] + "!!!");
			mod.createPortalet(mod.defaultView["view_Id"]);
			mod.createPortaletSubMenu();
			
		});
		
		function checklayout(sel) {
			var container =  dijit.byId("gridContainer");
			try {
				dojo.cookie("portalContainerColums-"+dojo.byId("viewSel").options[dojo.byId("viewSel").selectedIndex].value,
			    		sel);

			    container.set("colWidths", sel);
			    
			} catch (e) {
				//
			}
		}
		
		function checkViewSel(sel) {
			mod.clearPortalContainer();
			mod.unsubscribeAllHandler();
			mod.createPortalet(sel.options[sel.selectedIndex].value);
			mod.createPortaletSubMenu();
		}
		
		function checkColNumSel(sel) {
			mod.clearPortalContainer();
			mod.unsubscribeAllHandler();
			
			var selectedColNum = sel.options[sel.selectedIndex].value;
			if (selectedColNum == null || selectedColNum == "") {
				selectedColNum = 3;
			}
			mod.containerColumn = selectedColNum;
			
			
			var container =  dijit.byId("gridContainer");
			container.setColumns(mod.containerColumn);
			
			var cLay = mod.containerLayout;
			var layoutSel = dojo.byId("layoutSel");
			layoutSel.options.length = 0;
			for (var i = 0; i < cLay[mod.containerColumn].length; i++) {
				layoutSel.add(new Option(cLay[mod.containerColumn][i],cLay[mod.containerColumn][i]));
			}
			
			try {
			    container.set("colWidths", layoutSel.options[0].value);
			} catch (e) {
				//
			}
			
			var viewValue = dojo.byId("viewSel");
			mod.createPortalet(viewValue.options[viewValue.selectedIndex].value);
			mod.createPortaletSubMenu();
			dojo.cookie("portalColNumber",
					mod.containerColumn);
		}
		
		function refleshPortalPage() {
			var viewValue = dojo.byId("viewSel");

			var viewId = viewValue.options[viewValue.selectedIndex].value;
            dojo.cookie("portalLayout_" + employeeid + "_" + viewId,"");
            dojo.cookie("portalContainerColums-"+viewId,"");
            dojo.cookie("viewToMenuRela" + employeeid,"");
			dojo.cookie("menuHeightSetting" + employeeid,"");
			settingPortalTempStore = null;
			settingPortalTempHeight = null;
            mod.clearPortalContainer();
            mod.unsubscribeAllHandler();
           
			mod.createPortalet(viewId);
			mod.createPortaletSubMenu();
			
			
		}

		
		function confirmSetting() {

			dojo.byId("alertDiv").style.display = "none";
            dojo.byId("settingDiv").style.display = "block";
		}
		
		function onSettingDiaShow() {
			/*
			var viewIds = "";
			for (var i = 0; i < mod.viewInfoJson.length; i++) {
				if (i == 0) {
					viewIds = viewIds + mod.viewInfoJson[i]["view_Id"];
				} else {
					viewIds = viewIds + "~" + mod.viewInfoJson[i]["view_Id"];
				}
			}
			mod.initSettingInfo(viewIds, "", false);
			*/
		}
		
		function leftToRight(dirct) {
			if (dirct == 0) {
				dijit.byId("selectViewsPoint").addSelected(dijit.byId("selectViewsAll")); 
				
			} else {
				dijit.byId("selectViewsAll").addSelected(dijit.byId("selectViewsPoint")); 
			}
		}
		
		function checkviewSelectSet(sel) {
			var viewIds = "";
			for (var i = 0; i < mod.viewInfoJson.length; i++) {
				if (i == 0) {
					viewIds = viewIds + mod.viewInfoJson[i]["view_Id"];
				} else {
					viewIds = viewIds + "~" + mod.viewInfoJson[i]["view_Id"];
				}
			}
			var tempPoint = mod.getMulSelectOptions(tempSettingSelectView);
			
		    if (settingPortalTempStore != null && settingPortalTempStore != "" && dojo.toJson(tempPoint) != dojo.toJson(settingPortalTempStore.get(tempSettingSelectView+"tempselect"))) {
		    	//alert(dojo.toJson(tempPoint) +"-----------------"+ dojo.toJson(settingPortalTempStore.get(tempSettingSelectView+"tempselect")));
		    	for (var i = 0; i < sel.options.length; i++) {
					if (sel.options[i].value == tempSettingSelectView) {
						sel.options[i].selected="selected";
						break;
					}
				}
		    	dojo.byId("alertDiv").style.display = "block";
	            dojo.byId("settingDiv").style.display = "none";
	            dojo.byId("alertDiv").innerHTML = "<br><br><br><br><br><br><br>您做的设置还没有应用，请在设置页面点击\"应用\"按钮或\"取消\"按钮。<br><br><br><br><div align=center><input type=button value='    确定    ' onclick='confirmSetting();'></input></div>";
		    	return false;
		    }
			mod.initSettingInfo(viewIds,sel.options[sel.selectedIndex].value ,true);
		}
		
		function checkviewSelectSetHeight(sel) {
			
			var viewSelect = sel.options[sel.selectedIndex].value;
			var vali = mod.generateInputMenu(viewSelect);
			if (vali == false) {
				for (var i = 0; i < sel.options.length; i++) {
					if (sel.options[i].value == tempSettingHeightSelectView) {
						sel.options[i].selected="selected";
						break;
					}
				}
			}
		}
		function applySettingClick() {
			var sel = dojo.byId("viewSelectSet");
			var viewSelect = sel.options[sel.selectedIndex].value;
			settingPortalTempStore.put(mod.getMulSelectOptions(viewSelect));
		}
		
		function applySettingHeightClick() {
			//unieap.debug(settingPortalTempHeight);
			var sel = dojo.byId("viewSelectSetMenu");
			var viewSelect = sel.options[sel.selectedIndex].value;
			var temHeights = settingPortalTempHeight.get(viewSelect+"tempHeight")["value"];
			for (var i = 0; i < temHeights.length; i++) {
				var inputHeight = unieap.byId(temHeights[i]["menu_Id"]+"HeightInput").getValue();
				temHeights[i]["f_Height"] = inputHeight;
			}
			unieap.debug(settingPortalTempHeight);
		}
		
		
		function cancelSettingClick() {
			var viewIds = "";
			for (var i = 0; i < mod.viewInfoJson.length; i++) {
				if (i == 0) {
					viewIds = viewIds + mod.viewInfoJson[i]["view_Id"];
				} else {
					viewIds = viewIds + "~" + mod.viewInfoJson[i]["view_Id"];
				}
			}
			mod.initSettingInfo(viewIds,tempSettingSelectView ,true);
		}
		
		function cancelSettingHeightClick() {
			var sel = dojo.byId("viewSelectSetMenu");
			var viewSelect = sel.options[sel.selectedIndex].value;
			var vali = mod.generateInputMenu(viewSelect,true);
		}
		
		
		function saveSettingPortal() {
			//alert(dojo.toJson(settingPortalTempStore));
			//unieap.debug(settingPortalTempHeight);
			//document.writeln(dojo.toJson(settingPortalTempStore));
			dojo.cookie("viewToMenuRela" + employeeid,dojo.toJson(settingPortalTempStore));
			dojo.cookie("menuHeightSetting" + employeeid,dojo.toJson(settingPortalTempHeight));
			unieap.debug(settingPortalTempHeight);
			//settingPortalTempStore.setData(dojo.fromJson(dojo.cookie("viewToMenuRela" + employeeid)));
			//settingPortalTempStore = dojo.fromJson(dojo.cookie("viewToMenuRela" + employeeid));
			//alert("1111");
			//unieap.debug(dojo.cookie("menuHeightSetting" + employeeid));
			//var cookieviewToMenuRela = dojo.fromJson(dojo.cookie("menuHeightSetting" + employeeid));
			//unieap.debug(cookieviewToMenuRela);
			//settingPortalTempHeight = new dojo.store.Memory({
			//	data: cookieviewToMenuRela["data"]
			//	});
			//unieap.debug(settingPortalTempHeight);
			//unieap.debug(settingPortalTempStore.get("v01tempselect"));
			//var aa = mod.getMulSelectOptions("v02");
			//unieap.debug(aa);
			//settingPortalTempStore.put(aa);
			//alert("      "+employeeid+"  " +   dojo.cookie("viewToMenuRela" + employeeid));
			
		}
        //////////////////////////////////////////////////////////////
		function publishInfos(topicName, infos) {
				dojo.publish(topicName,infos);
		}

		function subscrubeInfos(topicName, menuId, method) {
			 var handler = dojo.subscribe(topicName,method);
			 handler.id = menuId+"subHandler";
			 mod.subscribeHandles.push(handler);
		}
	</script>
</head>
<body class="unieap" style="overflow-y:hidden;overflow-x:hidden;">
<br>
<!--  -->

<div height="5%">
   <table width="100%"><tr><td width="60%">
        &nbsp;<img src="<%=webpath%>/common/dx20/images/portal_person.png" width="20" height="20"/>上午好，XXXX，欢迎#####################,登陆地点：
   <hr>
   </td>
   <td rowspan=2 align=right>
       <table width="100%" border="0">
       <tr>
         <td>
                <span style="text-decoration:none;">
                <div data-dojo-type="dijit.form.Button" style="border:0">
                   <span border=0 onclick="javascript:refleshPortalPage();"><img src="<%=webpath%>/common/dx20/images/portal_refresh.png" width="16" height="16" border="0" style="bottom_margn:0"/>刷新</span>
                 </div>
               </span>&nbsp;&nbsp;&nbsp;
               <span>
                 
                  <div id="tooltipDlgButton" data-dojo-type="dijit.form.DropDownButton" style="border:0">
		              <span border=0><img src="<%=webpath%>/common/dx20/images/portal_setting.png" id="settingPortal11" width="16" height="16" border="0"/>设置</span>
		              
		              <div id="id1_tooltip" data-dojo-type="dijit.TooltipDialog" data-dojo-props='style:"width: 480px; height: 450px;",onShow:onSettingDiaShow' align="center">
		                <div style="align:center;width: 462px; height: 405px; display:none;border:1px solid #86b5e4" id="alertDiv" align="center">
                             <table style="width:80%;height=80%;border:1px solid #86b5e4" align="center">
                             <tr>
                                 <td id='msgAlert' align="center"></td>
                             </tr>
                             </table>
                         </div>

                         <div class="claro" id="settingDiv">
			              <div data-dojo-type="dijit.layout.TabContainer" data-dojo-props='style:"width: 462px; height: 405px;"'>
							<div data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"视图设置"'>
								<table style="width:100%;border:0px solid #86b5e4">
								    <tr>
								        <td colspan=2>选择视图:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="viewSelectSet" onchange="checkviewSelectSet(this);"></select><hr>
								        </td>
								    </tr>
								    <tr>
								        <td colspan=2>
								            <table style="width:100%;border:0px solid #86b5e4">
								            <tr>
								              <td align=right>可见主题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
								                <select id="selectViewsAll" multiple data-dojo-type="dijit.form.MultiSelect" size="12" 
								                        data-dojo-props='style:{height:"200px", width:"175px", border:"1px solid #86b5e4"}'> </select>	
								              </td>	
								              <td align=center><br>
						                          <button class="switch" id="right" onclick="leftToRight(0);">＞</button><br>
								                  <button class="switch" id="left" onclick="leftToRight(1);">＜</button>
								              </td>							          
								              <td align=left>&nbsp;&nbsp;&nbsp;&nbsp;当前视图主题<br>
								                <select id="selectViewsPoint" multiple data-dojo-type="dijit.form.MultiSelect" size="12" 
                                                        data-dojo-props='style:{height:"200px", width:"175px", border:"1px solid #86b5e4"}'> </select>
								              </td>
								              </tr>
								              </table>
								        </td>
								    </tr>
								    
								    <tr>
								        <td align=right> <br><br><input type=button value="    应 用    " onclick="applySettingClick();" >&nbsp;&nbsp;&nbsp;&nbsp;
								        <input type=button value="    取消    " onclick="cancelSettingClick();" ></input>
								        </td>
								    </tr>
								    <tr>
								        <td>
								        </td>
								    </tr>
                                </table>
							</div>
							<div data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"窗口设置"'>
								<table style="width:100%;border:0px solid #86b5e4">
								    <tr>
								        <td colspan=2>选择视图:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="viewSelectSetMenu" onchange="checkviewSelectSetHeight(this);"></select><hr>
								        </td>
								    </tr>
								    <tr>
								        <td colspan=2 id="settingPortaletHeightTd">
								        </td>
								    </tr>
								    
								    <tr>
								        <td align=right> <br><br><input type=button value="    应 用    " onclick="applySettingHeightClick();" >&nbsp;&nbsp;&nbsp;&nbsp;
								        <input type=button value="    取消    " onclick="cancelSettingHeightClick();" ></input>
								        </td>
								    </tr>
								    <tr>
								        <td>
								        </td>
								    </tr>
                                </table>
							</div>
						</div>
						<div align=center><input type=button value=" 保存设置 " onclick="saveSettingPortal();"></input></div>	
						</div>
                     
                     </div>
		          </div>
               </span>
               <span>
               <div data-dojo-type="dijit.form.Button" style="border:0">
                  <span border=0><img src="<%=webpath%>/common/dx20/images/portal_wenxin.png" width="16" height="16"/>温馨提示</span>
                </div>
             </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
         </td>
        </tr>
        </table>
   </td>
   </tr>
   <tr>
   <td>
       &nbsp;<img src="<%=webpath%>/common/dx20/images/portal_warning.png" width="20" height="20"/>上次登录时间：
   </td>
   <td></td>
   </tr>
   </table>
</div>
<br>
<div height="5%">
   &nbsp; 视图选择：<select id="viewSel" onchange="checkViewSel(this);"></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <span id="columnRate"><img src="<%=webpath%>/common/dx20/images/portal_icon.png" onclick="checklayout('30,70');" alt="30:70"/>
                         <img src="<%=webpath%>/common/dx20/images/portal_icon.png" onclick="checklayout('50,50');">
                         <img src="<%=webpath%>/common/dx20/images/portal_icon.png" onclick="checklayout('70,30');">
                         </span>
   <!-- &nbsp;&nbsp;列宽设置(百分比)：<select id="layoutSel" onchange="checklayout(this);"></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          列数选择：<select id="colNumSel" onchange="checkColNumSel(this);"><option></option><option value=2>2</option><option value=3>3</option><option value=4>4</option></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
  
</div>
	<div dojoType="dojox.layout.GridContainer"
			id="gridContainer"
			isAutoOrganized="false"
			allowAutoScroll="false" 
			hasResizableColumns="false"
			dragHandleClass="dijitTitlePaneTitle"
			nbZones="2"
			style="width:100%;height:80%;leftmargin=0;rightmargin=0;overflow-y:auto;overflow-x:hidden;border:0px"
			doLayout="true" onkeydown="javascript:return;">
			
			
	</div>
</body>
</html>

