<%--
/***************************************************************
* 程序名: detail.jsp
* 日期  : 2008-6-17 
* 作者  : zhaof@neusoft.com
* 模块  : 
* 描述  : 
* 备注  : 
* ------------------------------------------------------------
* 修改历史
* 序号  日期  修改人   修改原因
* 1
* 2
***************************************************************/
--%>
<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="com.neusoft.om.dao.menu.MenuVO" %>
<%@ page import="com.neusoft.om.dao.system.SystemVO" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%
	String path = request.getContextPath();
	String menuType = (String)request.getAttribute("menuType");
	String oper = (String)request.getAttribute("oper");
	MenuVO menuVO = (MenuVO)request.getAttribute("menuVO");
	if(menuVO == null){
		menuVO = new MenuVO();
	}
	SystemVO sysVO = (SystemVO)request.getAttribute("systemVO");
	if(sysVO == null){
		sysVO = new SystemVO();
	}
	String message = (String)request.getAttribute("Message");
	if(message == null){
		message = "";
	}
	ParamObjectCollection containerColl = (ParamObjectCollection)request.getAttribute("containerColl"); //容器
	ParamObjectCollection systemTypeColl = (ParamObjectCollection)request.getAttribute("systemTypeColl"); //子系统类型
	ParamObjectCollection parentSystemColl = (ParamObjectCollection)request.getAttribute("parentSystemColl"); //上级子系统
	ParamObjectCollection systemColl = (ParamObjectCollection)request.getAttribute("systemColl"); //子系统
	ParamObjectCollection parentMenuColl = (ParamObjectCollection)request.getAttribute("parentMenuColl"); //上级菜单
	
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>权限信息</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
		
		<script  language=javascript src="<%=path%>/unieap/js/Globals.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/Common.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/BaseObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/EAPObjsMgr.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/NumberObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/IDCardObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/IntegerObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/PosIntegerObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/ReadOnlyFieldObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/ReadOnlyObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/TextObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/TextAreaObj.js"> </script>
		
		<script language="javascript" src="<%=path%>/common/js/td_date.js"></script>
		<script language="javascript" src="<%=path%>/common/js/titlebar.js"> </script>
		<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>

		<script language="javascript">
		/*
		 *页面初始化方法
		 */
		function init()
		{		
			DateUtil.addDateArea("disabledDate","dateButton",false);
			var menuType = document.getElementById("menuType").value;
			var oper = document.getElementById("oper").value;
			if( menuType != null && menuType!="99" && oper=="modify"){ //菜单
					document.getElementById("menuType").value="<%=menuVO.getMenuType()%>";
					document.getElementById("inuse").value="<%=menuVO.getInuse()%>";
					document.getElementById("log").value="<%=menuVO.getLog()%>";					
			}
			var disabledDate = document.getElementById("disabledDate");
			if(disabledDate.value == "null"){
				disabledDate.value = "";
			}	
			if(oper!= null && oper=="view"){
				if(menuType=="99"){
					setSystemFieldReadOnly();
				}else{
					setMenuFieldReadOnly();
				}
				document.getElementById("bSave").disabled="true";
				document.getElementById("bReset").disabled="true";
			}			
		}
		/*
		 *保存修改信息
		 */
		function bSaveClick(webpath){
			var menuType = document.getElementById("menuType").value;
			if((menuType == "99" && checkSystem())||(menuType!="99"&&checkMenu())){
				EAPForm.action = webpath+ '/om/menuAction.do?method=doSave';
				EAPForm.target = "list";
		    	EAPForm.submit();
		    	window.close();				
			}
			
		}
		/*
		 *关闭方法
		 */
		function bBackClick(webpath)
		{
			if (!confirm('您确定关闭么？')) 
				return false;
			window.close();
		}
		/*
		 *重置方法
		 */
		function bResetClick(webpath)
		{
			if (!confirm('您确定要重置么？')) 
				return false;
			EAPForm.reset();
		}
		function getMenuColl(){
			var systemId = document.getElementById("systemId").value;
			var para = "systemId="+systemId;
			var result = executeRequest("menuAction","getMenuColl",para);
			document.all("parentMenuId").outerHTML = result;
		}
		function checkSystem(){
			var menuId = document.getElementById("systemId").value;
			var menuName = document.getElementById("sysName").value;
			if(menuId == null || menuId=='' || menuId =="null"){
				alert("请输入权限标识");
				document.getElementById("systemId").focus();
				return false;
			}else if(menuName == null || menuName=='' || menuName =="null"){
				alert("请输入权限名称");
				document.getElementById("sysName").focus();
				return false;
			}else{
				return true;
			}
		}
		
		function checkMenu(){
			var menuId = document.getElementById("menuId").value;
			var menuName = document.getElementById("menuName").value;
			var systemId = document.getElementById("systemId").value;
			if(menuId == null || menuId=='' || menuId =="null"){
				alert("请输入权限标识");
				document.getElementById("menuId").focus();
				return false;
			}else if(menuName == null || menuName=='' || menuName =="null"){
				alert("请输入权限名称");
				document.getElementById("menuName").focus();
				return false;
			}else if(systemId == null || systemId=='' || systemId =="null"){
				alert("请选择子系统");
				document.getElementById("systemId").focus();
				return false;
			}else{
				return true;
			}
		}
		function setSystemFieldReadOnly(){
			document.getElementById("systemId").readOnly="true";
			document.getElementById("sysName").readOnly="true";
			document.getElementById("systemType").disabled="true";
			document.getElementById("detailDesc").readOnly="true";
			document.getElementById("parentSystemId").disabled="true";
			document.getElementById("order").readOnly="true";
			document.getElementById("disabledDate").readOnly="true";
			document.getElementById("dateButton").disabled="true";
		}
		function setMenuFieldReadOnly(){
			document.getElementById("menuId").readOnly="true";
			document.getElementById("menuName").readOnly="true";
			document.getElementById("menuType").disabled="true";
			document.getElementById("systemId").disabled="true";
			document.getElementById("pageLink").readOnly="true";
			document.getElementById("parentMenuId").disabled="true";
			document.getElementById("inuse").disabled="true";
			document.getElementById("menuDesc").readOnly="true";
			document.getElementById("order").readOnly="true";
			document.getElementById("disabledDate").readOnly="true";
			document.getElementById("log").disabled="true";
			document.getElementById("container").disabled="true";
			document.getElementById("dateButton").disabled="true";
		}
		</script>
	</head>
	<body class="mainBody" onload="init()">
		<unieap:form action="" method="post">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">权限信息</td>
								<td class="tableTitleRight2">&#160;</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableL">
						<input type="hidden" id="oper" name="oper" value='<%=oper %>'/>
					</td>
					<td class="formTableC">
						<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
						<%if(menuType != null && menuType.trim().equals("99") && sysVO != null) {%>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									权限标识&#160;<span class="formRequested">*</span>
								</td>
								<% if(oper!= null && (oper.equals("modify")||(oper.equals("view")))){%>
								<td align="left" class="formField" style="width:30%"><%=sysVO.getSystemId()%>
									<input type="hidden" id="systemId" name="systemId" maxlength="4" readonly="true" value="<%=sysVO.getSystemId()%>"/>
								</td>
								<%} else {%>
								<td align="left" class="formField" style="width:30%">
									<input type="" id="systemId" name="systemId" maxlength="4"  value="<%=sysVO.getSystemId()%>"/>
								</td>
								<%} %>
								
								<td align="left" class="formLabel" style="width:20%">
									权限名称&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="sysName" name="sysName" prompt="权限名称" 
										maxlength="32" isnullable="true" classname="textType" value="<%=sysVO.getSystemName()%>"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									权限类型&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">子系统
									<input type="hidden" id="menuType" name="menuType" value="99">
								</td>
								<td align="left" class="formLabel" style="width:20%">
									子系统类型&#160;<span class="formRequested"></span>
								</td>
														
								<td align="left" class="formField" style="width:30%">
								<td:SelectTag selectColl="<%=systemTypeColl%>" selectvalue="<%=String.valueOf(sysVO.getSystemType())%>" 
												  selectFlag="" tagName="systemType" title="子系统类型" />
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									详细描述&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">
								<unieap:input  tcname="Text" id="detailDesc" name="detailDesc" prompt="详细描述" 
										maxlength="128" isnullable="true" classname="textType" value="<%=sysVO.getDetailDesc()%>"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									上级子系统标识&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=parentSystemColl%>" selectvalue="<%=sysVO.getParentSystemId()%>" 
										selectFlag="true" tagName="parentSystemId" title="上级子系统"/>												
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									显示顺序&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Number"  id="order" name="order" prompt="显示顺序" 
										maxlength="10" isnullable="true" classname="textType" value="<%=String.valueOf(sysVO.getOrder()) %>"/>						
								</td>
								<td align="left" class="formLabel" style="width:20%">
									失效日期&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="disabledDate" id="disabledDate" value="<%=sysVO.getDisabledDate()%>" />
									<button class="calendarImgButton" id="dateButton" ></button>							
								</td>
							</tr>	
							<tr>
								<td align="left" class="formLabel" style="width:20%">操作者&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text"  id="operator" name="operator" prompt="操作者" 
										isnullable="true" classname="textType" value="<%=sysVO.getOperatorName() %>" readonly='true'/>						
								</td>
								<td align="left" class="formLabel" style="width:20%">操作时间&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text"  id="operateDate" name="operateDate" prompt="操作时间" 
										isnullable="true" classname="textType" value="<%=sysVO.getOperateDate() %>" readonly='true'/>						
								</td>
							</tr>				
						<%}else if(menuType != null && menuVO != null){%>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									权限标识&#160;<span class="formRequested">*</span>
								</td>
								<%if(oper!=null && oper.equals("modify")){ %>
								<td align="left" class="formField" style="width:30%"><%=menuVO.getMenuId()%>
									<input type="hidden" id="menuId" name="menuId" value="<%=menuVO.getMenuId()%>"/>
								</td>
								<%}else{ %>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="menuId" name="menuId" prompt="权限标识" 
										maxlength="12" isnullable="true" classname="textType" value="<%=menuVO.getMenuId()%>"/>
								</td>
								<%} %>
								
								<td align="left" class="formLabel" style="width:20%">
									权限名称&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="menuName" name="menuName" prompt="权限名称" 
										maxlength="64" isnullable="true" classname="textType" value="<%=menuVO.getMenuName()%>"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									权限类型&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<select name="menuType" id="menuType"  onkeydown="nas_enter();">	
									<option value="1">菜单</option>
									<option value="0">按钮和组件</option>									
								</td>
								<td align="left" class="formLabel" style="width:20%">
									子系统&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
								<td:SelectTag selectColl="<%=systemColl%>" selectvalue="<%=menuVO.getSystemId()%>" 
										selectFlag="true" tagName="systemId" title="子系统" onchange="getMenuColl()"/>	
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									链接&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:80%" colspan="3">
								<unieap:input  tcname="Text" id="pageLink" name="pageLink" prompt="链接" 
										maxlength="256" isnullable="true" style="width:390" classname="textType" value="<%=menuVO.getPageLink()%>"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									上级菜单&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=parentMenuColl%>" selectvalue="<%=menuVO.getParentMenuId()%>" 
										selectFlag="true" tagName="parentMenuId" title="上级菜单"/>	
								</td>
								<td align="left" class="formLabel" style="width:20%">
									使用状态&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">
								<select name="inuse" id="inuse" onkeydown="nas_enter();">		
									<option value="1">使用中</option>
									<option value="0">停用</option>	
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									详细描述&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="menuDesc" name="menuDesc" prompt="详细描述" 
										maxlength="64" isnullable="true" classname="textType" value="<%=menuVO.getMenuDesc()%>"/>						</td>
								<td align="left" class="formLabel" style="width:20%">
									失效日期&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="disabledDate" id="disabledDate" value="<%=menuVO.getDisabledDate()%>" />
									<button class="calendarImgButton" id="dateButton" ></button>								
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									 是否记录日志&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<select name="log" id="log" onkeydown="nas_enter();">		
									<option value="1">记录</option>
									<option value="0">不记录</option>	
								</td>
								<td align="left" class="formLabel" style="width:20%">
									容器&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=containerColl%>" selectvalue="<%=String.valueOf(menuVO.getContainer())%>" 
												  selectFlag="" tagName="container" title="容器" myOptionValue="未知"/>							</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">显示顺序&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Number"  id="order" name="order" prompt="显示顺序" 
										maxlength="10" isnullable="true" classname="textType" value="<%=String.valueOf(menuVO.getOrder()) %>"/>						
								</td>
								<td align="left" class="formLabel" style="width:20%">操作者&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text"  id="operator" name="operator" prompt="操作者" 
										isnullable="true" classname="textType" value="<%=menuVO.getOperatorName() %>" readonly='true'/>						
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">操作时间&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text"  id="operateDate" name="operateDate" prompt="操作时间" 
										isnullable="true" classname="textType" value="<%=menuVO.getOperateDate() %>" readonly='true'/>						
								</td>
							</tr>
						<%} %>
						</table>
					</td>
					<td class="formTableR">&#160;</td>
				</tr>
				<tr>
					<td class="formTableLB">&#160;</td>
					<td class="formTableB">&#160;
						<input type="hidden" name="oper" value="<%=oper %>" />
						<input type="hidden" name="menuType" value="<%=menuType %>" />
					</td>
					<td class="formTableRB">&#160;</td>
				</tr>
			</table>
			<div class="formButtonDIV" id="formButton">
				<button class="formButton" id="bSave" name="bSave" onclick="bSaveClick('<%=path%>');">
					保&#160;&#160;存
				</button>
				<button class="formButton" id="bReset" name="bReset" onclick="return bResetClick();">
					重&#160;&#160;置
				</button>
				<button class="formButton" id="bBack" name="bBack" onclick="return bBackClick('<%=path%>');">
					关&#160;&#160;闭
				</button>
			</div>
		</unieap:form>
	</body>
</html>
