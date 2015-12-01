<%@ page contentType="text/html; charset=gb2312" %>
<%@ page language="java" import="java.lang.*,java.util.*" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
String path = request.getContextPath();
String message = (String)request.getAttribute("Message");
String operFlag = (String)request.getAttribute("OperFlag");
String operType =(String)request.getAttribute("OperType");
String organDim = (String)request.getAttribute("organDim");
message = NullProcessUtil.nvlToString(message,"");
String operAreaId = (String)request.getAttribute("operAreaId");
if("".intern() != message.intern()){
	message = message.replaceAll(" ","");
	message = message.replaceAll("\"","'");
}
%>

<html>
  <head>
    <title></title>
  </head>
  <script>
  function init(){
  		var organDim = myform.organDim.value;
  		var message = myform.errorInfo.value;
		if(message != null && message != "" && message != "null"){
			alert(message);
			var path = document.getElementById("path").value;
			var operAreaId = document.getElementById("operAreaId").value;
			var parentForm = parent;
			if(myform.OperType.value == "add" || myform.OperType.value == "modify" ){					
				var areaId = parentForm.citySelect.document.getElementById("areaId").value;	
				var src = path+"/om/OrganDisplayAction.do?OperType=init&changArea="+areaId;	
				parentForm.organdisplay.tabForm.document.all("tab").contentWindow.document.all("tab_page_1").src=src;
				var operAreaId = document.getElementById("operAreaId").value;
				if(organDim != null && organDim!="" && organDim!="null" && organDim!="organ"){
					parentForm.organdisplay.tabForm.document.all("tab").contentWindow.document.all("tab_page_2").src 
					= "<%=path%>/om/OrganDisplayAction.do?OperType=init&areaId="+operAreaId;
				}
				var formLength = parentForm.organmaintance.myform.length;
				for (var i=0;i<formLength;i++){
					parentForm.organmaintance.myform[i].disabled=true;
				}
				parentForm.organmainbuttons.document.getElementById('main').style.display='';
				parentForm.organmainbuttons.document.getElementById('tail').style.display='none';
				parentForm.organmainbuttons.document.getElementById('bAdd').disabled='true';
				parentForm.organmainbuttons.document.getElementById('bModify').disabled='true';
				parentForm.organmainbuttons.document.getElementById('bDelete').disabled='true';
				parentForm.organmainbuttons.document.getElementById('bEmployeeModify').disabled='true';				
			}else{
				var areaId = parentForm.citySelect.document.getElementById("areaId").value;
				var src = path+"/om/OrganDisplayAction.do?OperType=init&changArea="+areaId;
				parentForm.organdisplay.tabForm.document.all("tab").contentWindow.document.all("tab_page_1").src=src;
				parentForm.organdisplay.tabForm.document.all("tab").contentWindow.document.all("tab_page_2").src=src = "<%=path%>/om/OrganDisplayAction.do?OperType=init&areaId="+operAreaId;
				//parent.organdisplay.location.href=myform.path.value+"/views/om/organ/organ/treeTab.jsp";
				//alert(myform.errorInfo.value);
				parent.organmainbuttons.init();	
				parentForm.organmainbuttons.document.getElementById('bAdd').disabled='true';
				parentForm.organmainbuttons.document.getElementById('bModify').disabled='true';
				parentForm.organmainbuttons.document.getElementById('bDelete').disabled='true';
				parentForm.organmainbuttons.document.getElementById('bEmployeeModify').disabled='true';
			}
		}
	}
</script>
  <body onload="init()" bgcolor="transparent">
  <form name="myform">
    <input type="hidden" name="errorInfo" value="<%=message%>"/>
    <input type="hidden" name="OperType" value="<%=operType%>"/>
    <input type="hidden" name="path" value="<%=path%>"/>
	<input type="hidden" name="OperFlag" value="<%=operFlag%>"/>
    <input type="hidden" name="OrganId" value=""/>
    <input type="hidden" name="OrganName" value=""/>
    <input type="hidden" name="OrganKind" value=""/>
    <input type="hidden" name="OrganStatus" value=""/>
    <input type="hidden" name="ParentOrganId" value=""/>
    <input type="hidden" name="AreaId" value=""/>
    <input type="hidden" name="InnerDuty" value=""/>
    <input type="hidden" name="Principal" value=""/>
    <input type="hidden" name="ActiveDate" value=""/>
    <input type="hidden" name="InactiveDate" value=""/>
    <input type="hidden" name="OrganDesc" value=""/>
    <input type="hidden" name="CurrentSelectKind" value=""/>
    <input type="hidden" name="order" value=""/>
    <input type="hidden" name="priOrganName" value=""/>
    <input type="hidden" name="operAreaId" value="<%=operAreaId %>">
    <input type="hidden" name="dutyParent" value=" "/>
    <input type="hidden" name="organDim" value="<%=organDim %>"/>
  </form>
  </body>
</html>
