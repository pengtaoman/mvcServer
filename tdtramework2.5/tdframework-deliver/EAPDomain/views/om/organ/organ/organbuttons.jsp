<%@ page contentType="text/html; charset=gb2312"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%String path = request.getContextPath();

			%>
<html>
	<head>
		<title>actionBtn</title>
		<script language="javascript">
<!--
	function init(){
		document.getElementById("bAdd").disabled = "true";
		document.getElementById("bModify").disabled = "true";
		document.getElementById("bDelete").disabled = "true";
		document.getElementById("bEmployeeModify").disabled = "true";
	}
	
	function bAddClick(flag){
		var webPath = myform.Path.value;
		var currentOrganKind = parent.organdisplayhidden.myform.CurrentSelectOrganKind.value;
		var currentOrganId = parent.organdisplayhidden.myform.CurrentSelectOrganId.value;
		var belongAreaId = parent.organdisplayhidden.myform.CurrentSelectBelongArea.value;
		if(flag==null || flag==''){
			flag = 'organ';
		}
		if(flag == 'organ'){
			document.getElementById('myform').bBack.style.display = '';
		}else{
			document.getElementById('myform').bBack.style.display = 'none';
		}		
		document.getElementById('myform').bModifyBack.style.display = 'none';
		document.getElementById('main').style.display='none';
		document.getElementById('tail').style.display='';		
		var params = "&OrganKind="+currentOrganKind+"&OrganId="+currentOrganId+"&belongAreaId="+belongAreaId;		
		parent.organmaintance.location.href=webPath+"/om/OrganMaintanceAction.do?OperType=addinit"+params;
	}
	
	function bModifyClick(){
		var myObj=parent.organmaintance.myform;
		var webPath = myform.Path.value;
		myObj.OrganName.disabled=false;
		myObj.dutyParent.disabled = false;
		myObj.Principal.disabled=false;
		myObj.OrganDesc.disabled=false;
		myObj.order.disabled=false;				
		myObj.OrganKind.disabled = false;
		myObj.InnerDuty.disabled = false;
		myObj.AreaId.disabled = false;
		myObj.priOrganName.disabled = false;
		myObj.ParentOrganId.disabled = false;
		document.getElementById('myform').bBack.style.display = 'none';
		document.getElementById('myform').bModifyBack.style.display = '';
		document.getElementById('main').style.display='none';
		document.getElementById('tail').style.display='';
		var organDim = parent.organmaintance.document.getElementById("organDim").value;
		if(organDim != null && organDim == "organ"){
			parent.organmaintance.document.getElementById("showAreaBtn").style.display="";				
			myObj.areaName.disabled = false;
		}					
	}
	
	function bDeleteClick(){
		if (!confirm('您确定要删除么？'))	return;
		var webPath = myform.Path.value;
		CurrentSelectOrganId=parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
	
		parent.organmaintance.location.href=webPath+"/om/OrganMaintanceAction.do?OperType=delete&OrganId="+CurrentSelectOrganId;
		//parent.organdisplay.location.href=webPath+"/om/OrganDisplayAction.do?OperType=init";
	}
	
	function bEmployeeModifyClick(){
		var webPath = myform.Path.value;
		var CurrentSelectOrganId=parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
		var width =650;
		var height = 350;
		var wleft=(screen.width-width)/2;
		var wtop=(screen.availHeight-height)/2-20;
		dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
		window.open(webPath+"/om/OrganMaintanceAction.do?OperType=initDutyInfo&OrganId="+CurrentSelectOrganId,'markpage',dimensions);
		//window.showModalDialog(webPath+"/om/OrganMaintanceAction.do?OperType=initDutyInfo&OrganId="+CurrentSelectOrganId, window, "status:no;dialogWidth:500px;dialogHeight:300px");
	}

-->
</script>
		<link rel="stylesheet" href="<%=path%>/views/common/css/pubstyle.css" type="text/css" />
		<link href="<%=path%>/common/css/td_style.css" REL="stylesheet" TYPE="text/css" />
		
	</head>
	<body class="BODY" onload="init();">
		<form id="myform" action="" method="post">
			<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
				<tr>
					<td align="center" class="formField" id="main" >
						<unieap:unieapbutton securityid="organadd" name="bAdd" value="增加"  onclick="bAddClick();" styleClass="formButton"/>
						<unieap:unieapbutton securityid="organmodify" name="bModify" value="修改"  onclick="bModifyClick();" styleClass="formButton"/>
						<unieap:unieapbutton securityid="organdelete" name="bDelete" value="删除"  onclick="bDeleteClick();" styleClass="formButton"/>
						<unieap:unieapbutton securityid="organempmodify" name="bEmployeeModify" value="职员调整"  onclick="bEmployeeModifyClick();return false;" styleClass="formButton"/>
						<input type="hidden" id="Path" name="Path" value="<%=path%>" />
					</td>
					<td align="center" class="formField" id="tail" style="display:none">
						<input type="button" id="bSave" name="bSave" value="保存" class="formButton" onclick="parent.organmaintance.document.getElementById('bSubmit').click()"/>
						<input type="button" id="bBack" name="bBack" value="返回" class="formButton" onclick="history.back();"/>
						<input type="button" id="bModifyBack" name="bModifyBack" value="返回" class="formButton" onclick="parent.organmaintance.document.getElementById('bReload').click()"/>
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>
