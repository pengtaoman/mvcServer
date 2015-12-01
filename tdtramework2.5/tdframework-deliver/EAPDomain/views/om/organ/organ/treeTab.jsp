<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ page import="com.neusoft.tdframework.common.util.HttpObjectUtil" %>
<!-- 在本页要用到jstl-->
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%
	String webpath=request.getContextPath();
	String appName=HttpObjectUtil.getAppName(request);
	String blank = "/views/om/blank.html";
	String countryTree = "/views/om/organ/organ/waittingPage.jsp";
	String areaTree  = webpath+"/om/OrganDisplayAction.do?OperType=init";
	String organDim = (String)request.getAttribute("organDim");
%>
<html>
<head>
<title>组织机构树</title>
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

		if(tempitem.iframeid == 'tab_page_1'){
	    	//alert(tempitem.url);
	   		var editWindow=getCertainPageWindow(controlid,tempitem.iframeid);
	   		if(editWindow.document.readyState.toLowerCase()!="complete"){
	   		    setTimeout("tabEventTabClick('','"+controlid+"')",50);
	   		    return;
	   		}
	   		
	   		var areaId = document.getElementById("areaId").value;
	   		if(areaId != ''){
	   			getTabIFrameObj(controlid,'tab_page_2').src = "<%=webpath%>/views/om/organ/organ/waittingPage.jsp";
	   		}	
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
	   		var areaId = document.getElementById("areaId").value;
	   		//alert(areaId);
	   		if(areaId == ''){
	   			alert("无任何乡镇信息");
	   			
	   			getTabIFrameObj(controlid,'tab_page_2').src = "<%=webpath%>/views/om/blank.html";
	   		}else{
	   			getTabIFrameObj(controlid,tempitem.iframeid).src = "<%=webpath%>/om/OrganDisplayAction.do?OperType=init&areaId="+areaId;
	   		}
   		}
	}	
</script>
</head>

<body style="margin:0px;">
<form id="tabForm" name="tabForm" action=""  method="post" >
<unieap:Tab name="tab" width="100%" allLoad="false">
<%if(organDim!= null && organDim.toUpperCase().equals("ORGAN")){ %>
    <unieap:TabPage iframeid="tab_page_1" text="组织机构" title="组织机构信息" url="<%=blank%>"  height="100%" autoCheckEAP="false" active="true"/>
<% }else{%>
    <unieap:TabPage iframeid="tab_page_1" text="区域信息" title="区域信息" url="<%=blank%>"  height="100%" autoCheckEAP="false" active="true"/>
    <unieap:TabPage iframeid="tab_page_2" text="乡镇信息" title="乡镇信息" url="<%=countryTree%>" height="100%" autoCheckEAP="false"/>
<% } %>

</unieap:Tab>
<input type="hidden" name="areaId" id="areaId" value=""></input>
</form>
</body>
</html>

