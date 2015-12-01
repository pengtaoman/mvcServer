<%@ page contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%@ page import="java.util.List"%>

<%
     String path =request.getContextPath();
     List empList = (List)request.getAttribute("empList");
     String groupId = (String)request.getAttribute("groupId");
     String message=(String)request.getAttribute("message");
     String operType = (String)request.getAttribute("operType");
     String action = path+"/om/groupAction.do?method=queryEmp";
     if(operType.equals("show")){
     	action =  path+"/om/groupAction.do?method=getEmp";
     }
     int size = empList.size();
%>
<html>
<head>
<TITLE>组工号信息维护</TITLE>
<link href="<%=path%>/common/css/td_style.css"    rel=stylesheet></link>
<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>
  
<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
<script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
<script language="javascript" src="<%=path%>/unieap/js/Common.js"></script>
<script language="javascript" src="<%=path%>/unieap/js/Globals.js"></script>
<script language="javascript" src="<%=path%>/common/js/eccn.js"></script>
<script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
<script language="javascript" src="<%=path%>/common/js/prototypeajax.js"></script>
<script language="javascript">
     var eccn=new ECCN("ec");
     
     function initial() {
		 eccn.doPrep=false;
		 eccn.init();
	   
	     <%if(message!=null&&!message.equals("")){%>
	          var msg='<%=message%>';
	          alert(msg);
		 <%}%>
	 }	 
	 function radioOnclick(sysId,sysName,sysDesc){
	 	 var EAPForm = parent.QueryButton.EAPForm;         
         EAPForm.bView.disabled=false;
         EAPForm.bModify.disabled=false;
         EAPForm.bDelete.disabled=false;
         EAPForm.bGrant.disabled=false;
         EAPForm.sysId.value=sysId;
         EAPForm.sysName.value = sysName;
         EAPForm.sysDesc.value = sysDesc;
         EAPForm.bView.click();         
     }   	
	   
	function apply(path){
		var groupId = document.getElementById("groupId").value;
		var check = "";
		var unchek = "";
		var allData = "";
		var checkBoxs = document.getElementsByTagName("input");
		for(i=0; i<checkBoxs.length; i++){
				var e = checkBoxs[i];
				if(e.type == 'checkbox'){
					if(e.checked == true){
						check = check+'`'+e.id;
					}else{
						unchek = unchek+'`'+e.id;
					}
					allData = allData+'`'+e.id;
				}
			}
		document.getElementById("checkValue").value = check;
		document.getElementById("uncheckValue").value = unchek;
		document.getElementById("allValue").value = allData;
		
		var url = path + '/om/groupAction.do?method=doGrant&groupId='+groupId;
		ec.action = url;
		ec.submit();	
	}
	
	function checkAll(obj, flagAll, flagNone)
	{	
		var checkBoxs = document.getElementsByTagName("input");
		if (obj.value == flagAll) {
			for(i=0; i<checkBoxs.length; i++){
				var e = checkBoxs[i];
				if(e.type == 'checkbox'){
					e.checked = true;
				}
			}
	    	obj.value = flagNone;
	    }
	    else if (obj.value == flagNone) {
	    	for(i=0; i<checkBoxs.length; i++){
				var e = checkBoxs[i];
				if (e.type == 'checkbox') {
					e.checked = false;
				}
			}
	    	obj.value = flagAll;
	    }
	}
	function reset()
	{
		ec.reset();
	}
</script>
</head>
  <body onLoad="initial();" >  

  <input type="hidden" name='groupId' value='<%=groupId %>'/>
  <table width="100%" height="105" border="0" cellpadding="10" cellspacing="0">
    <tr>
    	<td width="100%">    	
			<%
				if (size>0) {
			%>
			<ec:table items="empList" var="employee"  action="<%=action%>">						
		 				<ec:extend>
		 				<input type="hidden" name="checkValue" id="checkValue" value=''/>
		 				<input type="hidden" name="uncheckValue" id="checkValue" value=''/>	
		 				<input type="hidden" name="allValue" id="allValue" value=''/>	
		 				</ec:extend>
					<ec:parameter name="beforetable" value="">
						<table border='0' cellpadding='0' cellspacing='0' class="tableRegion"  width='100%'>
							<tr class='trType' >
								<td colspan='2' height="1" align='center' bgcolor='#ffffff'>								
		 						</td>
							</tr>
							<tr class="trType">
								<td width='34' height="26" align='center' valign='middle' background="<%=path%>/views/common/images/top_line1.jpg">
								</td>
								<td align='center' height="26" valign='middle' background='<%=path%>/views/common/images/top_line_bg.jpg'>
									<div align='left'>职员信息</div>
								</td>
							</tr> 
						</table>
					</ec:parameter>
					<ec:row >
						<% if(operType.equals("grant")) { %>
					    <ec:column property="recordId" title=" " width="15px">					    
					    	<c:if test="${employee.roleNum == 1 }">
			            		<input type="checkbox" id="${employee.employeeId}" name="${employee.employeeId}" checked="checked" style="width:15px"/>
			            	</c:if>
			            	<c:if test="${employee.roleNum == 0 }">
			            		<input type="checkbox" id="${employee.employeeId}" name="${employee.employeeId}"  style="width:15px"/>
			            	</c:if>			            
			            	<input type="hidden" id="idx_${employee.employeeId}" name="idx_${employee.employeeId}" />			            	
			            </ec:column>
			            <%}%>
			            <ec:column property="employeeId" title="职员编号" ></ec:column>
			            <ec:column property="workNo" title="账号" ></ec:column>
						<ec:column property="employeeName" title="姓名" ></ec:column>
						<ec:column property="areaName" title="地市" ></ec:column>
				    </ec:row>	  
				</ec:table>
				<p>&#160;</p>
				<% if(operType.equals("grant")) { %>
				<div class="formButtonDIV" id="filebutton1" style="display:block"> 
					<button class="formButton" name="bSelectAll" onclick="checkAll(this, '全部选中', '撤销全选')">全部选中</button>
				 	<button class="formButton" name="bSave" onclick="apply('<%=path%>')">提&#160;&#160;交</button>
				 	<button class="formButton" name="bReset" onclick="reset()">重&#160;&#160;置</button>
				 </div>
				<%}
					} else {
				%>
				<p>没有工号信息</p>
				<%
					}
				%>
			</td>
   		</tr>
 	</table>

	</body>
</html>
