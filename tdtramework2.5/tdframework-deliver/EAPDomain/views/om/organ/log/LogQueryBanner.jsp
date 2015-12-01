<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>

<% 
	String path = request.getContextPath();
	String beginDate = (String)request.getAttribute("beginDate");
	String endDate = (String)request.getAttribute("endDate");
	String operatorCity = (String)request.getAttribute("cityCode");
	//ParamObjectCollection monthColl=(ParamObjectCollection)request.getAttribute("month");
	ParamObjectCollection areaColl = (ParamObjectCollection)request.getAttribute("AreaColl");
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
<script>
function load(beginDate,endDate){
	TitleBar.addTitleBarByTag('select');
	DateUtil.addDateArea("starttime","chooseDate1",false);
	DateUtil.addDateArea("endtime","chooseDate2",false);
	if(beginDate!='' && endDate!=''){
    	document.getElementById("starttime").value = beginDate;
    	document.getElementById("endtime").value   = endDate;
    }
    
	//eapObjsMgr.onReady();
	
	var arrayBtn=new Array(document.forms[0].bQuery);
	for (var i=0;i<arrayBtn.length;i++){
		arrayBtn[i].className="formButton";		
	}
}

window.DateCallBack=function(dateValue,inputField,openWindow){
 	var beginDate = document.getElementById("starttime").value;
	var endDate = document.getElementById("endtime").value;
	if(beginDate != ''){
		if(dateValue.substring(5,7) != beginDate.substring(5,7)){
			alert ('起始日期与终止日期应在同一个月内');
			inputField.value=dateValue;
			openWindow.close();
		}else{
			inputField.value=dateValue;
			openWindow.close();
		}
	}else if(endDate != ''){
		if(dateValue.substring(5,7) != endDate.substring(5,7)){
			alert ('起始日期与终止日期应在同一个月内');
			inputField.value=dateValue;
			openWindow.close();
		}else{
			inputField.value=dateValue;
			openWindow.close();
		}
	}else{
		inputField.value=dateValue;
		openWindow.close();
	}
}

function checkDateValue(beginDateName,endDateName,inSameMonth){
	var DTvalue1 = document.getElementById(beginDateName).value;
	var DTvalue2 = document.getElementById(endDateName).value;
	if(DTvalue1!="" && DTvalue2==""){
		alert("终止日期不能为空，请选择或输入");
		document.getElementById(endDateName).focus();
		return false;
	}else if(DTvalue1=="" && DTvalue2!=""){
		alert("起始日期不能为空，请选择或输入");
		document.getElementById(beginDateName).focus();
		return false;
	}else{
		var beginVDate=DateUtil.parseDate(beginDateName,"请选择或输入正确的日期","date");
		var endVDate=DateUtil.parseDate(endDateName,"请选择或输入正确的日期","date");
		if (!beginVDate){	// 如果不成功 则不提交表单
			return false;
		}else if(!endVDate){	
			return false;
		}
	}
	
	if(inSameMonth == true){
		if(DTvalue1.substring(5,7) != DTvalue2.substring(5,7)){
		  	alert('起始日期与终止日期应在同一个月内');
		  	document.getElementById(endDateName).focus();
			return false;
		}
	}
	if(DTvalue1 > DTvalue2){
		document.getElementById(beginDateName).value = DTvalue2;
		document.getElementById(endDateName).value = DTvalue1;
	}
	
	return true;
}

function bQueryClick(){	
	if (!checkDateValue("starttime","endtime",true)){
		return false;
	}	
	document.getElementById('workNo').value = document.getElementById('workNo').value.toUpperCase();
	//alert(document.getElementById("funcmenu").value);
	document.forms[0].target='logquerybottom';
	document.forms[0].action='LogQueryAction.do?&OperType=query';
	document.forms[0].submit();
	
}
</script>
</head>
<body onload="load('<%=beginDate%>','<%=endDate%>')">
<unieap:form method="post" action="">
<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
	 <tr class="tableTitleTR2">
		<td colspan="4" >
		<table width="100%" border="0" cellpadding="0" cellspacing="0" >
            <tr>
			<td class="tableTitleLeft2" >&#160;</td>
			<td class="tableTitle2">日志查询</td>
			<td class="tableTitleRight2" >&#160;</td>
			</tr>
		 </table>
		 </td>
	</tr>
	<tr> 
       <td class="formTableL" >&#160;</td>
       <td class="formTableC">		 	 			
			<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
				<tr>
					<td class="formLabel" width="13%" align="left">区&#160;&#160;域&#160;&#160;<span class="formRequested" >*</span></td>
					<td align="left" class="formField" >
						<td:SelectTag selectFlag="" selectColl="<%=areaColl%>" selectvalue="<%=operatorCity%>" tagName="area" title="城市名称" onchange=""/>
					</td>			
					<td class="formLabel" width="13%"align="left">菜&#160;&#160;单</td>
					<td class="formField" align="left">
						<input type="hidden" id="funcmenu" name="funcmenu" readOnly="readonly" class="textType"/>	
						<input type="text" id="funcmenuname" name="funcmenuname" readOnly="readonly" class="textType"/>								
					</td>            
				  </tr>
				  <tr>
					<td class="formLabel" width="16%" align="left">起始时间&#160;&#160;<span class="formRequested" >*</span></td>
					<td class="formField" align="left">
						<input type="text" maxlength="16" class="dateField" name="starttime" id="starttime" value="" />
						<button class="calendarImgButton" id="chooseDate1" ></button>
					</td>
					<td class="formLabel" width="16%" align="left">终止时间&#160;&#160;<span class="formRequested" >*</span></td>
					<td class="formField" align="left">
						<input type="text" maxlength="16" class="dateField" name="endtime" id="endtime" value="" />
						<button class="calendarImgButton" id="chooseDate2" ></button>
					</td>		
				  </tr>		
			      <tr>
					<td class="formLabel" width="13%" align="left">操作员姓名</td>
					<td class="formField" align="left">
						<input type="text" id="employeeName" name="employeeName" class="textType"/>		
					</td>
					<td  class="formLabel" width="13%" align="left">登陆IP地址</td>
					<td class="formField" align="left">
						<input type="text" name="loginHost" class="textType"/>		
					</td>
				  </tr>
			      <tr>
					<td class="formLabel" width="13%" align="left">登陆账号</td>
					<td class="formField" align="left">
						<input type="text" id="workNo" name="workNo" class="textType"/>		
					</td>
					<td  class="formLabel" width="13%" align="left">描&#160;&#160;述</td>
					<td class="formField" align="left">
						<input type="text" name="discription" class="textType"/>		
					</td>
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
 <div class="formButtonDIV" id="filebutton" style="display:block"> 
	<button class="formButton" name="bQuery" onclick="bQueryClick()">查&#160;&#160;询</button>
 </div>
</unieap:form>
</body>
</html>