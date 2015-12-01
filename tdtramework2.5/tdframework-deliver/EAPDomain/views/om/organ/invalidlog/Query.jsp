<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String message = (String)request.getAttribute("message");
	ParamObjectCollection areaColl= (ParamObjectCollection)request.getAttribute("AreaColl");
	String opAreaId = (String) request.getAttribute("opAreaId");
	String beginDate = (String)request.getAttribute("beginDate");
	String endDate = (String)request.getAttribute("endDate");
	if(beginDate==null || beginDate.trim().equals("")){
		beginDate = new SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date());
	}
	if(endDate==null || endDate.trim().equals("")){
		endDate = new SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date());
	}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>工号自动失效日志查询</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link   href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
<script language="javascript" src="<%=path%>/unieap/js/Globals.js"> </script>
<script language="javascript" src="<%=path%>/unieap/js/Common.js"> </script>
<script language="javascript" src="<%=path%>/unieap/js/EAPObjsMgr.js"> </script>
<script language="javascript" src="<%=path%>/unieap/js/BaseObj.js"> </script>		
<script language="javascript" src="<%=path%>/common/js/titlebar.js"> </script>
<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>
<script language="javascript" src="<%=path%>/views/common/js/nas_date_compare.js"></script>
<script language="javascript" src="<%=path%>/common/js/td_common.js" ></script>
<script language="javascript" src="<%=path%>/common/js/td_date.js" ></script>
<script type="text/javascript">

		function nas_enter(webpath)
		{
			var scode=(navigator.appname=="Nwtscape")?event.which:event.keyCode;
			if(scode == 13){
				doSearch(webpath);
			}
		}
		function load(beginDate,endDate){
			TitleBar.addTitleBarByTag('select');
			DateUtil.addDateArea("starttime","chooseDate1",false);
			DateUtil.addDateArea("endtime","chooseDate2",false);
			if(beginDate!='' && endDate!=''){
		    	document.getElementById("starttime").value = beginDate;
		    	document.getElementById("endtime").value   = endDate;
		    }
		    
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
			if(DTvalue1==null || DTvalue1==""){
				alert("起始日期不能为空，请选择或输入");
				document.getElementById(beginDateName).focus();				
				return false;
			}else if(DTvalue2 == null || DTvalue2==""){
				alert("终止日期不能为空，请选择或输入");
				document.getElementById(endDateName).focus();
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
			//if (!checkDateValue("starttime","endtime",true)){
			//	return false;
			//}	
			document.forms[0].target='InvalidLogList';
			document.forms[0].action='invalidLogAction.do?method=getInvalidLogInfo';
			document.forms[0].submit();
			
		}
		

</script>
</head>
  
<body onload="load('','')">
<form method="POST" name="myform">
	<input type="hidden" id="message" name="message" value="<%=message%>" />
	<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
		 <tr class="tableTitleTR2">
			<td colspan="4" >
				<table width="100%" border="0" cellpadding="0" cellspacing="0" >
		            <tr>
					<td class="tableTitleLeft2" >&#160;</td>
					<td class="tableTitle2" id="qd_mgr">工号失效日志查询</td>
					</tr>
				 </table>
			 </td>
		</tr>
		<tr> 
	       <td class="formTableL" >&#160;</td>
	       <td class="formTableC">		 	 			
			<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
				<tr>		
					<td class="formLabel" width="13%"align="left">区域</td>
					<td class="formField" align="left">
						<td:SelectTag selectColl="<%=areaColl%>" selectFlag="" selectvalue="<%=opAreaId %>"  tagName="cityId" title="区域名称" />
					</td>  					
					<td class="formLabel" width="13%" align="left">登录账号</td>
					<td class="formField" align="left">
						<input type="text" name="workNo" id="workNo" value="" />
					</td>          
				  </tr>
				  <tr>
					<td class="formLabel" width="16%" align="left">起始时间&#160;&#160;<span class="formRequested" ></span></td>
					<td class="formField" align="left">
						<input type="text" maxlength="16" class="dateField" name="starttime" id="starttime" value="" />
						<button class="calendarImgButton" id="chooseDate1" ></button>
					</td>
					<td class="formLabel" width="16%" align="left">终止时间&#160;&#160;<span class="formRequested" ></span></td>
					<td class="formField" align="left">
						<input type="text" maxlength="16" class="dateField" name="endtime" id="endtime" value="" />
						<button class="calendarImgButton" id="chooseDate2" ></button>
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
	 <div class="formButtonDIV" id="filebutton1" style="display:block"> 
	 	<button class="formButton" name="bQuery" onclick="bQueryClick()">查&#160;&#160;询</button>
	 </div>
	 <input type="hidden" name="message" value="<%=message %>"/>
</form>
</body>
</html>
