<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ page import="com.neusoft.tdframework.common.util.HttpObjectUtil" %>
<!-- 在本页要用到jstl-->
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%
	String webpath=request.getContextPath();
	String appName=HttpObjectUtil.getAppName(request);
	//String dealerTree = webpath+"/views/om/organ/log/DealerTree.jsp";
	String dealerTree = "/"+appName+"/om/organ/log/DealerTree.jsp";
	String organTree  = webpath+"/om/EmployeeQueryAction.do?OperType=organDisplay";
%>
<html>
<head>
<title>用户信息</title>
<link rel="stylesheet" href="<%=webpath%>/unieap/css/tab/unieapTab.css" type="text/css"></link>
<link rel="stylesheet" href="<%=webpath%>/common/css/td_style_tab.css" type="text/css"></link>
<script language="javascript" src="<%=webpath%>/unieap/js/tab/tabApi.js"></script>
<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
<script language="javascript" src="<%=webpath%>/unieap/js/tab/unieapTab.js"></script>
<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
<script language="javascript">
   var tempitem;
   
   function tabEventTabClick(item,controlid){//参数都是封装好的不用自己定义
	    if(item!=""){
	    	tempitem=item;
	    }    

	    if(tempitem.iframeid == 'tab_page_2'){
	    	//alert(tempitem.url);
	   		var editWindow=getCertainPageWindow(controlid,tempitem.iframeid);
	   		if(editWindow.document.readyState.toLowerCase()!="complete"){
	   		    setTimeout("tabEventTabClick('','"+controlid+"')",50);
	   		    return;
	   		}
	   		//外层调用内层方法
	   		//getCertainPageWindow(controlid,tempitem.iframeid).showWaitingBar();
	   		//实现TabPage动态刷新
	   		getTabIFrameObj(controlid,tempitem.iframeid).src=tempitem.url;
	   		
   		}
	}	
</script>
</head>

<body style="margin:0px;">
<form id="tabForm" name="tabForm" action=""  method="post" >
<unieap:Tab name="tab" width="100%" allLoad="false">
    <unieap:TabPage iframeid="tab_page_1" text="区域信息" title="区域信息" url=""  height="100%" autoCheckEAP="false" active="true"/>
    <unieap:TabPage iframeid="tab_page_2" text="渠道信息" title="渠道信息" url="<%=dealerTree%>" height="100%" autoCheckEAP="false"/>
</unieap:Tab>
</form>
</body>
</html>

