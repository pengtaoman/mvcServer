<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ page import="com.neusoft.tdframework.common.util.HttpObjectUtil" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%
	String webpath=request.getContextPath();
	String message = (String)request.getAttribute("message");
	String roleId = request.getParameter("roleId");
	String nodeId = request.getParameter("nodeId");
	String employeeId = request.getParameter("employeeId");
	String ifUseBox = request.getParameter("ifUseBox");
	String title = "子菜单信息";
	//选择生成哪个TAB页
	String operType = request.getParameter("operType");
	if(operType == null){
		operType = (String)request.getAttribute("operType");
		if(operType == null)
			operType = "parent";
		else if(operType.equals("grant"))
			title = "子系统";
	}
	
	String menuTree = "";
	
	if(roleId!=null && !roleId.equals("null")){
		if(operType.equals("viewRole")){
			//生成功能权限树
			menuTree  = webpath+"/om/roleManage.do?OperType=viewRole&roleId="+roleId;
		}else if(operType.equals("grantRole")){
			//生成赋权菜单树
			menuTree  = webpath+"/om/roleManage.do?OperType=grantRole&roleId="+roleId;
		}else if(operType.equals("openChildPage")){
			if(nodeId!=null){
				if(ifUseBox == null){
					//生成可编辑子菜单树
					menuTree  = webpath+"/om/roleManage.do?nodeId="+nodeId+"&roleIdValue="+roleId+"&OperType=openChildPage";
				}else{
					//生成不可编辑子菜单树
					menuTree  = webpath+"/om/roleManage.do?nodeId="+nodeId+"&roleIdValue="+roleId+"&OperType=openChildPage&ifUseBox=false";
				}
			}	
		}
	}else if(employeeId!=null && !employeeId.equals("null")){
		if(operType.equals("showPermission")){
			//生成职员菜单权限树
			menuTree = webpath+"/om/EmployeeMaintanceAction.do?OperType=showPermission&employeeId="+employeeId;
		}else if(operType.equals("showAdjustPowerInit")){
			//生成权限微调菜单树
			menuTree = webpath+"/om/EmployeeMaintanceAction.do?OperType=showAdjustPowerInit&employeeId="+employeeId;
		}else if(operType.equals("openChildPage")){
			if(nodeId!=null){
				if(ifUseBox == null){
					//生成可编辑子菜单树
					menuTree  = webpath+"/om/EmployeeMaintanceAction.do?nodeId="+nodeId+"&employeeIdValue="+employeeId+"&OperType=openChildPage&ifUseBox=true";
				}else{
					//生成不可编辑子菜单树
					menuTree  = webpath+"/om/EmployeeMaintanceAction.do?nodeId="+nodeId+"&employeeIdValue="+employeeId+"&OperType=openChildPage&ifUseBox=false";
				}
			}	
		}
	}
%>
<html>
<head>
<title>菜单信息</title>
<link rel="stylesheet" href="<%=webpath%>/unieap/css/tab/unieapTab.css" type="text/css"></link>
<link rel="stylesheet" href="<%=webpath%>/common/css/td_style_tab.css" type="text/css"></link>
<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet></link>

<script language=javascript src="<%=webpath%>/unieap/js/tab/tabApi.js"></script>
<script language=javascript src="<%=webpath%>/unieap/js/Globals.js"></script>
<script language=javascript src="<%=webpath%>/unieap/js/tab/unieapTab.js"></script>
<script language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
<script  language="javascript">
	  function selectAll(){
		  var obj = getCertainPageWindow('tab','tab_page_2');
		  obj.selectAllMenus('childTree',true);
	  }
	
	  function unselectAll(){
	  	  var obj = getCertainPageWindow('tab','tab_page_2');
	      obj.deleteAllMenus('childTree',false);
	  } 
	   
	  function resetSelect(){
	  	  //parent.RoleListButton.bGrantClick();
	  	  var obj = getCertainPageWindow('tab','tab_page_2');
	  	  var nodeId = '<%=nodeId%>';  
	  	  obj.childMenuPage(nodeId);
	  }
	  function changePic(src){
			var exForm = getCertainPageWindow('tab','tab_page_2').forms[0];    
			var objs=exForm.all.tags("img");    
			for(var p=0;p<objs.length;p++){
			if(objs[p].name.substring(0,3)=="org")
			  objs[p].src=src;
			}  
	  }
	  /**
	   * 提交
	   */
	  function doSubmit(treeName){
	  		//var roleId = parent.RoleManage.document.forms[0].roleId.value;
	  		//var params = '&roleId='+roleId;
	        //var message = executeRequest('rolePowerAction','doGrantRole',params);
	      	var obj = getCertainPageWindow('tab',treeName);

			obj.document.forms[0].action = "<%=webpath%>/om/EmployeeMaintanceAction.do?&OperType=doAdjustPower&treeName=childTree";
			obj.document.forms[0].target = "RoleManage";
			obj.document.forms[0].submit();
	  }
	  
	  function init(msg){
	  	if(msg!=null && msg!='null'){
	  		alert(msg);
	  	}
	  }
</script>
</head>

<body style="margin:0px;" onload="init('<%=message%>')">
<form id="tabForm" name="tabForm" action=""  method="post">
<unieap:Tab name="tab" width="100%" cellWidth="120" allLoad="false"> 
    <%if(operType.equals("openChildPage")){%>
    	<unieap:TabPage iframeid="tab_page_2" text="<%=title%>" title="<%=title%>" height="100%" url="<%=menuTree%>" autoCheckEAP="false" active="true"/>
	<%}else{%>
	<div NOWRAP="true">
		<unieap:TabPage iframeid="tab_page_1" text="子系统" title="子系统" height="100%" url="<%=menuTree%>" autoCheckEAP="false" active="true"/>
	</div>
	
	<%}%>
	<input type='hidden' name='roleId' value='<%=employeeId%>'/>
	<input type='hidden' name='roleId' value='<%=nodeId%>'/>
</unieap:Tab>
</form>
</body>
</html>
