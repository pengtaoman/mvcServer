<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%
	String path = request.getContextPath();
	String message = (String)request.getAttribute("message");
	String flag = (String)request.getAttribute("flag"); 
	String employeeId = (String)request.getParameter("employeeId");
	if(employeeId==null || employeeId.equals("null")){
		employeeId = (String)request.getAttribute("employeeId");
	}
%>
<html>
<head>
<title>����ά��</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link href="<%=path%>/common/css/td_style.css"    rel=stylesheet></link>
<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>

<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
<script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
<script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
<script language="javascript" src="<%=path%>/unieap/js/Common.js"></script>
<script language="javascript" src="<%=path%>/unieap/js/Globals.js"></script>
<script language="javascript" src="<%=path%>/common/js/eccn.js"></script>
<script language="javascript">
	/*
	 *΢��ȡ��
	 */	
	function init(msg,flag){
		if(msg!='null' && msg!=''){
			alert(msg);
		}
		if(flag!='null' && flag=='close'){
			window.close();
		}
	}
	/*
	 *�ж�ҳ���Ƿ��и�ѡ��ѡ��
	 */
	function ifHaveChecked(){ 
		var flag = true;
		var allElements = document.body.getElementsByTagName("INPUT");
		for (var i = 0; i < allElements.length; i ++) {
			var e = allElements[i];
			if (e.type == 'checkbox') {
				if(e.checked == true){
					flag = false;
					break;
				}
			}
		}
		return flag;
	}
	/*
	 *΢��ȡ��
	 */
	function cancelInching(){
		var empId = document.getElementById("employeeId").value;
		if(empId=='null' || empId==''){
			alert("ְԱ���Ϊ�գ����ܽ���Ȩ��΢��ȡ������");
			return;
		}
		
		if(ifHaveChecked()){
			return;
		}
		
		if(confirm("ȷ��ȡ����ְԱ��΢����Ϣ?")){
			document.forms[0].action = "<%=path%>/om/EmployeeMaintanceAction.do?OperType=cancelInching&employeeId=" + empId;    	
			document.forms[0].target = "_self";
			document.forms[0].submit();
		}
	}
	/*
	 *΢��ȡ��
	 */
	function goBack12(){
		window.close();
	}
</script>
</head>
<body class="mainBody" onload="init('<%=message%>','<%=flag%>')">
<form id="ec" method="post">
<div id="listDiv">
  <div class="listTableBox">
	  <table id="mt1" border="0" align="center" cellpadding="0" cellspacing="1" class="listTable">
	     <tr class="listTableHead">
		    <td class="tableHeader" width="15"></td>
		    <td class="tableHeader">Ȩ������</td>
	     </tr>
		 <tbody>
		    <tr class="odd" style="cursor:hand;">
				<td width="15"><input type="checkbox" class="checkbox" name="checkboxs" id="funcRoleAdjust" value="1"/></td>
		        <td >����Ȩ��΢��ȡ��</td>
			</tr>
			<tr class="even" style="cursor:hand;">
		        <td width="15"><input type="checkbox" class="checkbox" name="checkboxs" id="dataRoleAdjust" value="2"/></td>
		        <td >����Ȩ��΢��ȡ��</td>
			</tr>
		 </tbody>
	  </table>
  </div>
</div>
<div class="formButtonDIV" id="filebutton1" style="display:block"> 
	<input type="hidden" id="employeeId" name="employeeId" value="<%=employeeId%>"/>
 	<button class="formButton" id="doSub" name="doSub" onclick="cancelInching();">��&#160;&#160;��</button>
 	<button class="formButton" id="goBack" name="goBack" onclick="goBack12();">��&#160;&#160;��</button>
</div>
</form>
</body>
</html>
