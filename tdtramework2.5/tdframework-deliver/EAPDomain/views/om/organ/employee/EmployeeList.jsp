<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ taglib prefix="unieap" uri="/WEB-INF/taglib/unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%@ page import="java.util.List" %>

<% 
	String path = request.getContextPath();
	String actionName = (String) request.getAttribute("ActionName");
	String operType = (String) request.getAttribute("OperType");
	String action = path + "/" + actionName + "?OperType=" + operType;
	String message = (String)request.getAttribute("Message");
	String authId = (String)request.getAttribute("authId");
	String ifShowTree = (String)request.getAttribute("ifShowTree");
	String size = String.valueOf(((List)request.getAttribute("EmployeeList")).size());
	String queryInfo = (String) request.getAttribute("queryInfo");
	if(message == null){
		message = "";
	}
	String ulp = (String)request.getAttribute("ulp");
%>
<html>
	<head>
	<link href="<%=path%>/common/css/td_style.css"    rel=stylesheet></link>
	<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>

	<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
	<script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
	<script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
	<script language="javascript" src="<%=path%>/unieap/js/Common.js"></script>
	<script language="javascript" src="<%=path%>/unieap/js/Globals.js"></script>
	<script language="javascript" src="<%=path%>/common/js/eccn.js"></script>
	<script language="JavaScript">
		/**
		 * ҳ���ʼ��
		 */
		var eccn=new ECCN("ec");
		function initial(){
			parent.employeebutton.load();
		    var message = "<%=message%>";
		    if(message != null && message != ""){
		    	alert(message);
		    }
			var allElements = document.body.getElementsByTagName("img");
			for (var i = 0; i < allElements.length; i ++) {
				var e = allElements[i];
				var eName = e.name.substring(4,5);
				//alert(eName);
				if(eName == 0){
					e.src='<%=path%>/common/images/icon/time.gif';
					e.title='����';
				}else if(eName == 1){
					e.src='<%=path%>/common/images/icon/icon_wljz1.gif';
					e.title='ͣ��';
				}
			}
			
			if(OperForm.size.value != '0')
				parent.employeebutton.setAllButtonDisabled();
				
			eccn.doPrep=false;
			eccn.ajaxSubmit=false;
			eccn.init();
		}
		/**
		 * �Խ�Ҫ�ύ�ı굥��ֵ
		 */
		function selectEmployee(workNo, employeeId, adminType)
		{		
			var ifShowTree = '<%=ifShowTree%>';
			var authId = OperForm.authId.value;
			var ulp = document.getElementById("ulp").value;
			OperForm.workNo.value = workNo;
			OperForm.employeeId.value = employeeId;
			//alert(ifShowTree);
			parent.employeebutton.setAllButtonEnabled(ifShowTree);
			if (OperForm.employeeId.value == authId)
			{
				// ��ѡ���Լ�ʱ ��Ȩ��ť������
				parent.employeebutton.document.all("bModify").disabled = true;
				parent.employeebutton.document.all("bDelete").disabled = true;
				parent.employeebutton.document.all("bRenewPassword").disabled = true;
				parent.employeebutton.document.all("bGrant").disabled = true;
				parent.employeebutton.document.all("bGrantParamDuty").disabled = true;
				parent.employeebutton.document.all("bInching").disabled = true;
				parent.employeebutton.document.all("bCancelInching").disabled = true;
				parent.employeebutton.document.all("dataPowerAdjust").disabled = true;
			}
			if(adminType == 0){ //ѡ����ͨ����Աʱ,Ȩ��ת�ư�ť������
				parent.employeebutton.document.all("bDeliverPower").disabled = true;
			}
			if(ulp != null && ulp == "true"){
				parent.employeebutton.document.all("bDelete").disabled = true;
				parent.employeebutton.document.all("bRenewPassword").disabled = true;
			}
		}
	
		/**
		 * ��ϸ��Ϣ
		 */
		function getDetail(webpath, employeeId, workNo, adminType)
		{
			var cb = document.getElementById("idx_" + employeeId);
			cb.checked = "checked";
			selectEmployee(workNo,employeeId,adminType);
			var belongArea = parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
			var organId = parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
			var authId = OperForm.authId.value;
			var url = webpath+ '/om/EmployeeMaintanceAction.do?BelongArea='+belongArea+'&OrganId='+organId+'&workNo='+workNo+'&employeeId='+employeeId+'&authId='+authId+'&OperType=query';
			var width = 550;
			var height = 580;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
		
		/**
		 *  ���session�е�menuTree
		 */
	
		function funload(){
	        var treeFlag="menuTree";
	        executeRequest('eaptree','removeTreeFromSession','remove=true'+'&treeFlag='+treeFlag);
	    }
	   
	    // begin add by jialixin
	    /**
	     *����һ��ʱ��ѡ�е�ѡ��ť
	     */
	    function doOnClickEvent(workNo, employeeId,adminType,areaId){
	   		//alert("workNo="+workNo+" employeeId="+employeeId);
	   		var cb = document.getElementById("idx_" + employeeId);
			cb.checked = "checked";
			selectEmployee(workNo, employeeId, adminType);
			parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value=areaId;
	    }
	    /**
	     *��ʾ�ȴ���
	     */
	    function showWaitingBar(){
			//WaitingBar.setMsg("���ڲ�ѯԱ����Ϣ�����Ե�");
			WaitingBar.showMe();  //��ʾ�ȴ���
			//WaitingBar.hideMe();
		}
		
	  /**
	   * ����ְԱ��Ϣ
	  */
	  function doExport(){
	    var queryInfo = document.getElementById("queryInfo").value;	    	
		document.OperForm.action = '<%=path%>/om/EmployeeMaintanceAction.do?OperType=doExportEmp'+queryInfo;
	  	var oldAction=document.OperForm.action;	
		var oldtarget=document.OperForm.target;	
		document.OperForm.target="grid";
		document.OperForm.submit();		
		document.OperForm.action=oldAction;
		document.OperForm.target=oldtarget;	
		
	  }
	  /*
	    ����ְԱ��΢����Ϣ
	  */
	  function doExportAdjust(){
	  	var queryInfo = document.getElementById("queryInfo").value;	    	
		document.OperForm.action = '<%=path%>/om/EmployeeMaintanceAction.do?OperType=doExportAdjPower'+queryInfo;
	  	var oldAction=document.OperForm.action;	
		var oldtarget=document.OperForm.target;	
		document.OperForm.target="grid";
		document.OperForm.submit();		
		document.OperForm.action=oldAction;
		document.OperForm.target=oldtarget;	
	  }
	</script>
	</head>
	<body onLoad="initial();" onunload="funload();" class="mainBody">
		<%
		if(!((List)request.getAttribute("EmployeeList")).isEmpty()) {
			// ${pageContext.request.contextPath}/EmployeeMaintanceAction.do?OperType=search
		%>
			<ec:table items="EmployeeList" var="employee" action="<%=action%>">
				<ec:exportXls fileName="employeeList.xls"/>
				<ec:parameter name="radio"   value=""/>
				<ec:parameter name="img_1.x" value=""/>
				<ec:parameter name="img_1.y" value=""/>
				<ec:parameter name="img_0.x" value=""/>
				<ec:parameter name="img_0.y" value=""/>
				<ec:row  onclick="doOnClickEvent('${employee.workNo}','${employee.employeeId}',${employee.adminType},'${employee.areaId}');">
				    <ec:column property="recordId" title=" " width="15">
	                   <input type="radio" class="radio" id="idx_${employee.employeeId}" name="radio" onClick="selectEmployee('${employee.workNo}','${employee.employeeId}','${employee.adminType}')" />
	                </ec:column>
					<ec:column property="employeeName" title="����">
						<a href="javascript:getDetail('<%=path%>','${employee.employeeId}','${employee.workNo}','${employee.adminType}')">${employee.employeeName}</a>
					</ec:column>
					<ec:column property="workNo" title="��½�ʺ�"/>
					<ec:column property="organName" title="��֯����"/>					
					<ec:column property="dealerName" title="����"/>
					<ec:column property="adminTypeName" title="����Ա����"/>
					<ec:column property="roleNum" title="��ɫ��"/>
					<ec:column property="adjusetPowerDesc" title="΢��"/>
					<ec:column property="EMPstatus" title="״̬" style="text-align:center">
						<img onclick="return false;" name="img_${employee.status}" src="" title=""></img>			 
					</ec:column>						
			    </ec:row>
			</ec:table>
		<%
		} else {
		%>
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4" >
					<table width="100%" border="0" cellpadding="0" cellspacing="0" >
			            <tr>
						<td class="tableTitleLeft2" >&#160;</td>
						<td class="tableTitle2">ְԱ��Ϣ&#160;</td>
						<td class="tableTitleRight2" >&#160;</td>
						</tr>
					 </table>
					 </td>
				</tr>
			    <tr> 
			       <td class="formTableL" >&#160;</td>
			       <td class="formTableC" align="center">
						<span style="font-size:20px;color:red;">�޷��ϲ�ѯ��������Ϣ</span>
				   </td>
			       <td class="formTableR" >&#160;</td>
			    </tr> 
				<tr> 
				    <td class="formTableLB">&#160;</td>
				    <td class="formTableB">&#160;</td>
				    <td class="formTableRB">&#160;</td>
				</tr>        
			</table>			 	
		<%
		}
		%>
		<form name="OperForm" id="OperForm"  method="POST">
			<table width="100%" border="0" align="center">
				<tr align="right">
					<td width="50%" align="center">
						<div class="formButtonDIV" id="filebuttons" style="display:block">
							<button class="formButton" name="bExport" onClick="doExport();" title="����XSL">��&#160;&#160;��</button>
						</div>
					</td>
					<td width="50%" align="center">
						<div class="formButtonDIV" id="filebuttons" style="display:none">
							<button class="formButton" name="bExportAdjust" onClick="doExportAdjust();" title="����XSL">����΢����Ϣ</button>
						</div>
					</td>
				</tr>
			</table>    
			<input type="hidden" name="OperType" value="" />
			<input type="hidden" name="workNo" value="" />
			<INPUT type="hidden" name="employeeId" value="" />
			<input type="hidden" name="authId" value="<%=authId%>" />
			<input type="hidden" name="size" value="<%=size%>" />
			<input type="hidden" name="queryInfo" value="<%=queryInfo%>" />
			<input type="hidden" name="ulp" value="<%=ulp%>" />
		</form>
	</body>
</html>