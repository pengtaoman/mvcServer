<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%
	String webpath=request.getContextPath();
	String message = (String)request.getAttribute("message");
	String roleId = request.getParameter("roleId");
	String ifUseBox = request.getParameter("ifUseBox");
	String operType = request.getParameter("operType");
	//String title = "模块功能";
	
	if(operType == null){
		operType = (String)request.getAttribute("operType");
		if(operType == null)
			operType = "viewRole";
	}
	
	String nodeId = request.getParameter("nodeId");
	String menuTree = "";
	if(roleId!=null){
		if(operType.equals("viewRole")){
			menuTree  = webpath+"/om/roleManage.do?method=viewRoleOM&roleId="+roleId;
		}else if(operType.equals("grantRole")){
			menuTree  = webpath+"/om/roleManage.do?method=grantRoleOM&roleId="+roleId;
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
	      	//alert('<%=nodeId%>');
	      	var obj = getCertainPageWindow('tab',treeName);

	        obj.document.forms[0].OperType.value='insertMenus';
	        obj.document.forms[0].target = "RoleManage";
			obj.document.forms[0].action = "<%=webpath%>/om/roleManage.do?method=insertMenus";
			obj.document.forms[0].submit();
	  }
	  
	  function init(msg){
	  	  if(msg!=null && msg!='null'){
	  		  alert(msg);
	  		  
	  		  try {
				  parent.RoleButton.document.getElementById('bAdd').disabled = false;
			  } catch (ex) {}
	  	  }
	  }
	  
	
</script>
</head>

<body style="margin:0px;" onload="init('<%=message%>')">
<form id="tabForm" name="tabForm" action=""  method="post">
<unieap:Tab name="tab" width="100%" allLoad="false" design="2" >
    <unieap:TabPage iframeid="tab_page_1" text="子系统" title="子系统" url="<%=menuTree%>"  height="100%" autoCheckEAP="false" active="true"/>
    <unieap:TabPage iframeid="tab_page_2" text="模块功能" title="模块功能"  height="100%" autoCheckEAP="false"/>
</unieap:Tab>
</form>
</body>
</html>
