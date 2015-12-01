<%@ page contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%
	String path = request.getContextPath();
	String cityName = (String)request.getAttribute("cityName");
	String hallName = (String)request.getAttribute("hallName");
	String city = (String)request.getAttribute("city");
	String hallId = (String)request.getAttribute("hallId");
	ParamObjectCollection cityColl =  (ParamObjectCollection)request.getAttribute("cityColl");
%>
<html>
<head>
<TITLE>MAC地址维护</TITLE>
<link href="<%=path%>/common/css/td_style.css" rel=stylesheet></link>
	<script language="javascript" src="<%=path%>/unieap/js/Common.js"></script>
	<script language="javascript" src="<%=path%>/unieap/js/Globals.js"></script>
<script language="javascript">

	function init(){
		document.getElementById("add").disabled="true"
		document.getElementById("modify").disabled="true";
		document.getElementById("delete").disabled="true";
	}
	function doSearch(path){  	 
		document.EAPForm.action=path+"/om/macsPermittedAction.do?method=query";
		document.EAPForm.target='list';
		document.EAPForm.submit();
	}
	function doModify(path){
		var address = document.getElementById("address").value;
		var url=path+"/om/macsPermittedAction.do?method=modiInit&address="+address;
	    var style="status:no;dialogWidth:600px;dialogHeight:250px";
	    window.showModalDialog(url,window,style);
	}
	function doDelete(path){	
		var address = document.getElementById("address").value;
		document.EAPForm.action=path+"/om/macsPermittedAction.do?method=doDelete&address="+address;
		document.EAPForm.target='list';
		document.EAPForm.submit();
	}
	function doAdd(path){
		var city = document.getElementById("city").value;
		var hallId = document.getElementById("hall").value;
		var url=path+"/om/macsPermittedAction.do?method=modiInit&city="+city+"&hallId="+hallId+"&address=";
	    var style="status:no;dialogWidth:600px;dialogHeight:250px";
	    window.showModalDialog(url,window,style);
	}
	
	function getOrganColl(){
		var cityId = document.getElementById("city").value;
		var para = "cityId="+cityId;
		var result = executeRequest("macsPermittedAction","getOrganColl",para);
		document.all("organ").outerHTML = result;
		document.all("hall").outerHTML = "<SELECT id=hall />";
	}
	function getHallColl(){
		var organId = document.getElementById("organ").value;
		var para = "organId="+organId;
		var result = executeRequest("macsPermittedAction","getHallColl",para);
		document.all("hall").outerHTML = result;
		var hall = document.getElementById("hall").value;
		if(hall != null && hall != ""){
			document.getElementById("add").disabled = "";
		}else{
			document.getElementById("add").disabled = "true";
		}
	}

</script>
</head>

<body class="mainBody" onload="init()">
<unieap:form  action="" method="post">
	<input type='hidden' name='path' value='<%=path%>'/>
	<table width="100%" border="0" align="center">
		<tr align="right">
			<td align="left" class="formLabel" style="width:10%">
				区域：
			</td>
			<td align="left" class="formField" style="width:23%">
			<td:SelectTag selectFlag="true" selectColl="<%=cityColl%>" selectvalue="" 
												  tagName="city" title="区域" onchange="getOrganColl();"/>
			</td>
			<td align="left" class="formLabel" style="width:10%">
				部门：
			</td>
			<td align="left" class="formField" style="width:23%">
				<SELECT id="organ" />
			</td>
			<td align="left" class="formLabel" style="width:10%">
				营业厅：
			</td>
			<td align="left" class="formField" style="width:24%">
				<SELECT id="hall" name="hall" />
			</td>			
		</tr>
		<tr align="right">
			<td align="left" class="formLabel" style="width:10%">
				联系人：
			</td>
			<td align="left" class="formField" style="width:23%">
				<input type="text" id="contactName" name="contactName" />
			</td>
			<td align="left" class="formLabel" style="width:10%">
				MAC地址：
			</td>
			<td align="left" class="formField" style="width:23%">
				<input type="text" id="macAddress" name="macAddress" />
			</td>			
		</tr>
	</table>
	<input type="hidden" id="address" value=""/>
	<div class="formButtonDIV" id="filebutton1" style="display:block"> 
	 	<button class="formButton" name="search" onclick="doSearch('<%=path%>')">查 询</button>
	 	<button class="formButton" name="add" onclick="doAdd('<%=path%>')">新 增</button>
	 	<button class="formButton" name="modify" onclick="doModify('<%=path%>')">修 改</button>
	 	<button class="formButton" name="delete" onclick="doDelete('<%=path%>')">删 除</button>
	</div>
</unieap:form>
</body>
</html>
