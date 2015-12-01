<%@ page contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%
	String path = request.getContextPath();
%>
<html>
<head>
<TITLE>��������ά��</TITLE>
<link href="<%=path%>/common/css/td_style.css" rel=stylesheet></link>
<script language="javascript">

	function init(){
		document.getElementById("modify").disabled="true";
		document.getElementById("delete").disabled="true";
	}
	function doSearch(path){  	 
		document.EAPForm.action=path+"/om/ipsInvpnAction.do?method=query";
		document.EAPForm.target='list';
		document.EAPForm.submit();
	}
	function doModify(path){
		var address = document.getElementById("address").value;
		var url=path+"/om/ipsInvpnAction.do?method=modiInit&address="+address;
	    var style="status:no;dialogWidth:600px;dialogHeight:250px";
	    window.showModalDialog(url,window,style);
	}
	function doDelete(path){	
		var address = document.getElementById("address").value;
		document.EAPForm.action=path+"/om/ipsInvpnAction.do?method=doDelete&address="+address;
		document.EAPForm.target='list';
		document.EAPForm.submit();
	}
	function doAdd(path){
		var url=path+"/om/ipsInvpnAction.do?method=modiInit&address=";
	    var style="status:no;dialogWidth:600px;dialogHeight:250px";
	    window.showModalDialog(url,window,style);
	}
</script>
</head>

<body class="mainBody" onload="init()">
<unieap:form  action="" method="post">
	<input type='hidden' name='path' value='<%=path%>'/>
	<table width="100%" border="0" align="center">
		<tr align="right">
			<td align="left" class="formLabel" style="width:15%">
				���Σ�
			</td>
			<td align="left" class="formField" style="width:35%">
				<input type="text" id="segmentAddress" name="segmentAddress" />
			</td>
			<td align="left" class="formLabel" style="width:15%">
				������
			</td>
			<td align="left" class="formField" style="width:35%">
				<input type="text" id="segmentDesc" name="segmentDesc" />
			</td>			
		</tr>
	</table>
	<input type="hidden" id="address" value=""/>
	<div class="formButtonDIV" id="filebutton1" style="display:block"> 
	 	<button class="formButton" name="search" onclick="doSearch('<%=path%>')">�� ѯ</button>
	 	<button class="formButton" name="add" onclick="doAdd('<%=path%>')">�� ��</button>
	 	<button class="formButton" name="modify" onclick="doModify('<%=path%>')">�� ��</button>
	 	<button class="formButton" name="delete" onclick="doDelete('<%=path%>')">ɾ ��</button>
	</div>
</unieap:form>
</body>
</html>
