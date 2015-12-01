<%@ page contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%
	String path = request.getContextPath();
	String condType = (String)request.getParameter("condType");
	String employeeId = (String)request.getParameter("employeeId");
%>
<html>
<head>
<TITLE>��ɫά��</TITLE>
<link href="<%=path%>/common/css/td_style.css" rel=stylesheet></link>
<script language=javascript src="<%=path%>/unieap/js/tab/tabApi.js"></script>
<script language=javascript src="<%=path%>/unieap/js/Globals.js"></script>
<script language=javascript src="<%=path%>/unieap/js/Common.js"> </script>
<script language="javascript">
  function init(){
  	document.getElementById("bCloseAll").disabled = true;
  	document.getElementById("bOpenAll").disabled = false;
  }
  /**
   * ����MENU�˵���Ϣ
  */
  function doExport(){
  		if('<%=condType%>'=='employeeId' && <%=employeeId%>!=null){
  			document.myform.action = "<%=path%>/om/roleManage.do?method=doExport&employeeId=<%=employeeId%>";
  		}else{
  			var roleId = parent.RoleListButton.document.getElementById("roleId").value;	
	  		document.myform.action = "<%=path%>/om/roleManage.do?method=doExport&roleId="+roleId;	
  		}
  		
  		var oldAction=document.myform.action;	
		var oldtarget=document.myform.target;	
		document.myform.target="grid";
		document.myform.submit();		
		document.myform.action=oldAction;
		document.myform.target=oldtarget;

  }
  function doClose(){
  		parent.RoleManage.getCertainPageWindow("tab","tab_page_1").document.forms[0].all("treediv").innerHTML = executeRequest('rolePowerAction','closeAll',null);
  		document.getElementById("bCloseAll").disabled = true;
  		document.getElementById("bOpenAll").disabled = false;
  }
  /*
   *  չ��/�۵�
   */
   function doOpen(){    
	parent.RoleManage.getCertainPageWindow("tab","tab_page_1").document.forms[0].all("treediv").innerHTML = executeRequest('rolePowerAction','openAll',null);
	document.getElementById("bCloseAll").disabled = false;
  	document.getElementById("bOpenAll").disabled = true;   
  	}
 </script>
</head>
<body onload="init()">
	<form name="myform" action="" method="post">
		<table width="100%" border="0" align="center">
			<tr align="right">
				<td width="30%" align="center">
					<button class="formButton" name="bOpenAll" onClick="doOpen();" title="չ��" style="display:none">ȫ��չ��</button>
				</td>
				<td width="30%" align="center">
					<button class="formButton" name="bCloseAll" onClick="doClose();" title="�۵�" style="display:none">ȫ���۵�</button>
				</td>
				<td width="30%" align="center">
					<button class="formButton" name="bExport" onClick="doExport();" title="����XSL">��&#160;&#160;��</button>
				</td>
				
			</tr>
		</table>
	</form>
	<iframe name="grid" id="grid" style="display:none"></iframe>
</body>
</html>
