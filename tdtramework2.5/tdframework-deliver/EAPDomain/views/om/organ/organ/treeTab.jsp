<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ page import="com.neusoft.tdframework.common.util.HttpObjectUtil" %>
<!-- �ڱ�ҳҪ�õ�jstl-->
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
<title>��֯������</title>
<link rel="stylesheet" href="<%=webpath%>/unieap/css/tab/unieapTab.css" type="text/css"></link>
<link rel="stylesheet" href="<%=webpath%>/common/css/td_style_tab.css" type="text/css"></link>
<script language="javascript" src="<%=webpath%>/unieap/js/tab/tabApi.js"></script>
<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
<script language="javascript" src="<%=webpath%>/unieap/js/tab/unieapTab.js"></script>
<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
<script language="javascript">
   var tempitem;
   
   function tabEventTabClick(item,controlid){//�������Ƿ�װ�õĲ����Լ�����
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
	   		//�������ڲ㷽��
	   		//getCertainPageWindow(controlid,tempitem.iframeid).showWaitingBar();
	   		//ʵ��TabPage��̬ˢ��
	   		var areaId = document.getElementById("areaId").value;
	   		//alert(areaId);
	   		if(areaId == ''){
	   			alert("���κ�������Ϣ");
	   			
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
    <unieap:TabPage iframeid="tab_page_1" text="��֯����" title="��֯������Ϣ" url="<%=blank%>"  height="100%" autoCheckEAP="false" active="true"/>
<% }else{%>
    <unieap:TabPage iframeid="tab_page_1" text="������Ϣ" title="������Ϣ" url="<%=blank%>"  height="100%" autoCheckEAP="false" active="true"/>
    <unieap:TabPage iframeid="tab_page_2" text="������Ϣ" title="������Ϣ" url="<%=countryTree%>" height="100%" autoCheckEAP="false"/>
<% } %>

</unieap:Tab>
<input type="hidden" name="areaId" id="areaId" value=""></input>
</form>
</body>
</html>

