<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>

<%

	String path=request.getContextPath();
	String option = null;
	String[][] regionSet = (String[][])request.getAttribute("regionSet");
	StringBuilder optionStr = new StringBuilder();
	
	if (regionSet != null) {
		for(int i = 0; i < regionSet.length; i++) {
		    String[] row = regionSet[i];
			optionStr.append("<option value='").append(row[0]).append("'>").append(row[1]).append("</option>");
		}
	    option = optionStr.toString();
	}
%>
<html>
<head>
<contextPath value="<%=path%>"/>
<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
<script language="javascript" src="<%=path%>/unieap/js/Globals.js"> </script>
<script language="javascript" src="<%=path%>/unieap/js/Common.js"> </script>
<script language="javascript" src="<%=path%>/unieap/js/EAPObjsMgr.js"> </script>
<script language="javascript" src="<%=path%>/unieap/js/BaseObj.js"> </script>		
<script language="javascript" src="<%=path%>/common/js/titlebar.js"> </script>
<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>
<script language="javascript" src="<%=path%>/views/common/js/nas_date_compare.js"></script>
<script language="javascript" src="<%=path%>/common/js/td_common.js" ></script>
<script language="javascript" src="<%=path%>/common/js/td_date.js" ></script>
<script language="javascript" src="<%=path%>/unieap/js/SelectObj.js"> </script>
<script language="javascript" src="<%=path%>/unieap/js/QuickSelectObj.js"> </script>
<script language="javascript">

var autoPara =  parent.parent.parent.parent.getJsParaAutoPara();

function init(){
   eapObjsMgr.onReady();
}
function changeApp(){
	//parent.grid.location.href="http://localhost:8080/tdframework/tdframework/demo/operatorMaint/Query.jsp";
	/*
	var appName = document.forms(0).query.value;
	/////appName = "tdframework";

	*/
	var appName = document.forms(0).query.value;
	var cacheObjKey = document.forms(0).cacheObjKey.value;
	if(appName==''){
		alert("请选择应用进行操作!");
		return false;
 	}
	//var cacheKey = document.forms(0).cacheKey.value;
	var urlstr = "/"+appName+"/cacheObjectManagerAction.do?method=getCacheObjectSumList&appName="+appName+"&cacheObjKey="+cacheObjKey + "&" + autoPara;
	//alert(urlstr);
	//return;
	parent.grid.location.href=urlstr;
}
function performanceApp(){
	//parent.grid.location.href="http://localhost:8080/tdframework/tdframework/demo/operatorMaint/Query.jsp";
	/*
	var appName = document.forms(0).query.value;
	/////appName = "tdframework";

	*/
	var appName = document.forms(0).query.value;
	var cacheObjKey = document.forms(0).cacheObjKey.value;
	if(appName==''){
		alert("请选择应用进行操作!");
		return false;
 	}
	//var cacheKey = document.forms(0).cacheKey.value;
	var urlstr = "/"+appName+"/cacheObjectManagerAction.do?method=showReloadAbleCacheObjectList&appName="+appName+"&cacheObjKey="+cacheObjKey+ "&" + autoPara;
	//alert(urlstr);
	//return;
	parent.grid.location.href=urlstr;
}

function reflashAllApp(){
	//parent.grid.location.href="http://localhost:8080/tdframework/tdframework/demo/operatorMaint/Query.jsp";
	/*
	var appName = document.forms(0).query.value;
	/////appName = "tdframework";

	*/
	var appName = document.forms(0).query.value;
	var cacheObjKey = document.forms(0).cacheObjKey.value;
	if(appName==''){
		alert("请选择应用进行操作!");
		return false;
 	}
	//var cacheKey = document.forms(0).cacheKey.value;
	var urlstr = "/"+appName+"/cacheObjectManagerAction.do?method=getCacheObjectSumList&appName="+appName+"&cacheObjKey="+cacheObjKey+"&reflashAll=1"+ "&" + autoPara;
	//alert(urlstr);
	//return;
	if(confirm("确定要全部刷新缓存对像么？")) {
	parent.grid.location.href=urlstr;
	}
}
function getAppName() {
	return document.forms(0).query.value;
}

function getQueryKey() {
	return document.forms(0).cacheObjKey.value;
}

function removeAllApp(){
	//parent.grid.location.href="http://localhost:8080/tdframework/tdframework/demo/operatorMaint/Query.jsp";
	/*
	var appName = document.forms(0).query.value;
	/////appName = "tdframework";

	*/
	var appName = document.forms(0).query.value;
	//alert(appName);
	var cacheObjKey = document.forms(0).cacheObjKey.value;
	//alert(cacheObjKey);
	if(appName==''){
		alert("请选择应用进行操作!");
		return false;
 	}
	//var cacheKey = document.forms(0).cacheKey.value;
	var urlstr = "/"+appName+"/cacheObjectManagerAction.do?method=getCacheObjectSumList&appName="+appName+"&cacheObjKey="+cacheObjKey+"&removeAll=1" + "&" + autoPara;
	//alert(urlstr);
	//return;
	if(confirm("确定要全部清除缓存对像么？")) {
	  parent.grid.location.href=urlstr;
	}
}
</script>
</head>

  <body class="mainBody" onload="init();" >
<unieap:form method="post" action="">
<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
	 <tr class="tableTitleTR2">
		<td colspan="4" >
		<table width="100%" border="0" cellpadding="0" cellspacing="0" >
            <tr>
			<td class="tableTitleLeft2" >&#160;</td>
			<td class="tableTitle2">缓存对象管理</td>
			<td class="tableTitleRight2" >&#160;</td>
			</tr>
		 </table>
		 </td>
	</tr>
	<tr> 
       <td class="formTableL" >&#160;</td>
       <td class="formTableC">		 	 			
			<table border="0" cellpadding="0" cellspacing="1" class="formTableCore">
				<tr>
					<td class="formLabel" align=left width=10%>缓存对象应用</td>
					<td class="formField" align=left width=20%><unieap:input tcname="QuickSelect" prompt="缓存对象应用" id="query" ><%=option%></unieap:input></td>			
					<td class="formLabel" align=left width=20%>&#160;</td>
					<td class="formLabel" align=left width=50%>&#160;</td>
				</tr>
				<tr>
				    <td class="formLabel" align=left width=10%>缓存对象标识</td>
					<td class="formField" align=left width=20%><input type="text" id="cacheObjKey" name="cacheObjKey" class="textType"/></td> 
				    <td class="formLabel" align=center width=20%>
				      <button  class="formButton" name="" id="check" onclick="changeApp()">查询</button>
				      <!--  <button  class="formButton" name="" id="performance" onclick="reflashAllApp()"> 全部无效</button>-->
				      <button  class="formButton" name="" id="performance" onclick="removeAllApp()"> 全部删除 </button>
				      <button  class="formButton" name="" id="performance" onclick="performanceApp()"> 全部重载</button></td>
				    <td class="formLabel" align=left width=50%>&#160;</td>
				  </tr>
			</table>
		</td>
       <td class="formTableR" >&#160;</td>
     </tr> 
     <tr> 
	   <td class="formTableLB">&#160;</td>
	   <td class="formTableB">&#160;</td>
	   <td class="formTableRB">&#160;</td>
     </tr>
 </table>
</unieap:form>
</body>
</html>