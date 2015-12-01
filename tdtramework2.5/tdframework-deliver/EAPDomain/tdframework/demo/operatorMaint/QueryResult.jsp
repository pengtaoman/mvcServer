<%@ page session="true"  contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>

<%
	String webpath = request.getContextPath();
	request.setAttribute("col1","blackBG");
%>

<html>
<head>

<title>Query Result</title>

<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<meta http-equiv="MSThemeCompatible" content="no" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />

<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet>
<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>

<script language="javascript" src="<%=webpath%>/common/js/prototypeajax.js"> </script>
<script language="javascript" src="<%=webpath%>/common/js/eccn.js"> </script>
<script language="javascript" src="<%=webpath%>/tdframework/demo/js/queryResult.js"> </script>

<script language="javascript">

parent.query.WaitingBar.hideMe();

function click1(){
	var message = document.getElementsByName("pathValue")[0].value;
	alert(message);
}

function exportFile(){
	var oldAction = document.forms.ec.action;
    document.forms.ec.action='demoExtremeTable.do?method=doExport';
    document.forms.ec.submit();
    document.forms.ec.action=oldAction;
}
 
function testn(){

    var checkboxNum = 0;
  	var outputStr = "";
  	
  	if(document.forms.ec.chkbx_user != undefined){
  		for(var i=0;i<document.forms.ec.chkbx_user.length;i++){
  			if(document.forms.ec.chkbx_user[i].checked){
  				outputStr = outputStr+";"+document.forms.ec.chkbx_user[i].value;
  			}
  		}
  		checkboxNum = document.forms.ec.chkbx_user.length;
  		alert("function testn():\n表格体内共有"+checkboxNum+"个复选框\n其中选中项内容如下:"+outputStr);
  	}
}

function redirect(URLStr) { location = URLStr; }

</script>

<style type="text/css">
.blackBG {
	background-color:#0EE000;
}
</style>

</head>
<body class="mainBody" onload="init2();">
	<ec:table items="optrs" var="pre" maxRowsExported="55" rowsDisplayed="5"  
         	  toolbarContent="navigation|pagejump|pagesize|export|extend|status"  showPrint="true" 
         	  action="${pageContext.request.contextPath}/demoExtremeTable.do?method=query">
		<ec:extend>
			<button type="button" onclick="exportFile()" value="文件导出">文件导出</button>
			<button type="button" onclick="testn()" value="测试">测试</button>
		</ec:extend>
		<ec:exportXls fileName="名单test.xls" />
		<ec:row styleClass="${col1}" ondblclick="alert('双击事件')">
			<ec:column cell="checkbox" headerCell="checkbox" width="15" alias="chkbx_user" value="${pre.workno}" onclick="alert('${pre.workno}')" />
			<ec:column cell="radiobox" headerCell="radiobox" width="25" alias="radbx_user" value="${pre.workno}" onclick="alert('${pre.workno}')" />
			<ec:column property="id">
				<a href="#" onclick="modify1('${pre.workno}')" title="点击进入编辑页面">${pre.id}</a>
			</ec:column>
			<ec:column property="id" sortable="true" width="40px">
				<input type="text" value=${pre.id} width="40px" />
			</ec:column>
			<ec:column property="名字" title="删除" width="40px">
				<input type="image" src="<%=webpath%>/common/images/icon/delete.gif" style="width:20px" 
				       onClick="alert('delete');return;" value="${pre.workno}"/>				 
			</ec:column>
			<ec:column property="name" title="名字" style="width:100px">
				<span style="width:100px" class="ellipsis" onclick="showAllText(this)">${pre.name}</span>
			</ec:column>
			<ec:column property="area" calc="total" calcspan="3" calcTitle="总数(自定义)" />
			<ec:column property="organ" calc="total"/>
			<ec:column property="workno" />
		</ec:row>
		<ec:extendrow>
			<tr class="calcRow">
				<td class="calcTitle" colspan="4">myTitle</td>
				<td class="calcResult">&#160;</td>
				<td class="calcResult">&#160;</td>
				<td class="calcResult">&#160;</td>
				<td class="calcResult">&#160;</td>
			</tr>
		</ec:extendrow>
	</ec:table>
</body>
</html>