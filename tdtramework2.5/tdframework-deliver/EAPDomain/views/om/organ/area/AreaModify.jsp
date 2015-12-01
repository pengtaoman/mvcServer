<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%@ page import="com.neusoft.om.dao.area.AreaVO" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%
	String path = request.getContextPath();	
	ParamObjectCollection areaLevelColl = (ParamObjectCollection)request.getAttribute("areaLevelColl"); //���򼶱�
	
	String parentAreaId   = NullProcessUtil.nvlToString((String)request.getAttribute("parentAreaId"),"");
	String parentAreaName = NullProcessUtil.nvlToString((String)request.getAttribute("parentAreaName"),"");
	
	AreaVO areaVO = (AreaVO)request.getAttribute("areaVO");
	String mode = (String)request.getAttribute("mode");
	String flag = (String)request.getAttribute("flag");
	String message = (String)request.getAttribute("message");
	
	String areaId = "";
	String areaName = "";
	String postalCode = "";
	String areaCode = "";
	String activeDate = "";
	String inactiveDate = "";
	String cityCode = "";
	if(areaVO != null){
		areaId = areaVO.getAreaId();
		areaName = areaVO.getAreaName();
		postalCode = areaVO.getPostalCode();
		areaCode = areaVO.getAreaCode();
		activeDate = areaVO.getActiveDate();
		inactiveDate = areaVO.getInactiveDate();
		cityCode = areaVO.getCityCode();
		
		parentAreaId = areaVO.getParentAreaId();
		parentAreaName = areaVO.getParentAreaName();
	}else{
		areaId = "�Զ�����";
		cityCode = "�Զ�����";
		areaCode = "�Զ�����";
		activeDate = (String)request.getAttribute("nowDate");
	}	
	
	String newAreaId   = NullProcessUtil.nvlToString((String)request.getAttribute("newAreaId"),"");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<!-- ��ֹ windows ������ -->
<meta http-equiv="MSThemeCompatible" content="no" />
<!-- ��ֹ���� headers -->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />
<!-- end ��ֹ���� headers --> 
		
<title>����ά��</title>
<contextPath value="<%=path%>"/>
<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">

<script language="javascript" src="<%=path%>/unieap/js/Globals.js"> </script>
<script language="javascript" src="<%=path%>/unieap/js/Common.js"> </script>
<script language="javascript" src="<%=path%>/unieap/js/EAPObjsMgr.js"> </script>
<script language="javascript" src="<%=path%>/unieap/js/BaseObj.js"> </script>	
<script language="javascript" src="<%=path%>/unieap/js/NumberObj.js"> </script>		
<script language="javascript" src="<%=path%>/unieap/js/DWNameRule.js"></script>
<script language="javascript" src="<%=path%>/unieap/js/DWManager.js"></script>
<script language="javascript" src="<%=path%>/unieap/js/tab/tabApi.js"></script>
<script language="javascript" src="<%=path%>/common/js/td_common.js"> </script>
<script language="javascript" src="<%=path%>/common/js/td_date.js" ></script>
<script language="javascript" src="<%=path%>/common/js/titlebar.js"> </script>
<script language="javascript" src="<%=path%>/unieap/js/TextObj.js"> </script>
<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>
<script language="javascript" src="<%=path%>/views/common/js/nas_date_compare.js"></script>
<SCRIPT language="JavaScript">
		//������Ϣ
		function bResetClick(){
			if (!confirm('��ȷ��Ҫ������Ϣ��')) return false;
			EAPForm.reset();
			var inactiveDate = document.getElementById("inactiveDate").value;
			var activeDate = document.getElementById("activeDate").value;
			if(activeDate!= null && activeDate!=""){
				document.getElementById("activeDate").value = activeDate.substring(0,10);
			}
			if(inactiveDate!= null && inactiveDate!=""){
				document.getElementById("inactiveDate").value = inactiveDate.substring(0,10);
			}
			return false;	
		}
		
		//�رմ���ǰȷ��
		function bBackClick(webpath){
			if (!confirm('��ȷ���ر����������')) return false;
			window.close();
		}
						
		//�����޸���Ϣ
		function bSaveClick(webpath){
			var areaName = document.getElementById("areaName").value;
			if(areaName == null || areaName==""){
				alert("�������Ʋ���Ϊ��");
				document.getElementById("areaName").focus();
				return;
			}

		    EAPForm.action=webpath+ '/om/areaaction.do?OperType=modify';
		    EAPForm.submit();  
		      
		}	
			
		//����������Ϣ
		function bAddClick(webpath){	
			var areaName = document.getElementById("areaName").value;
			if(areaName == null || areaName == ""){
				alert("��������������");
				document.getElementById("areaName").focus();
				return;
			}
		    EAPForm.action=webpath+ '/om/areaaction.do?OperType=add';
		    EAPForm.submit();  		     
		}	
		/*
		 *ylm
		 */
		function init(msg,flag){
		    var aDate = document.getElementById("activeDate");
		    if(aDate.value == 'null'){
		    	aDate.value = "";
		    }
			if(msg!='null' && msg!=''){
				alert(msg);
			}
			if(flag == 'close'){								
				var path = document.getElementById("path").value;
				var parentAreaId = document.getElementById("parentAreaId").value;
				var parentAreaName = document.getElementById("parentAreaName").value;
				var areaId = window.opener.parent.document.getElementById("areaId").value;
				window.opener.location=path+"/om/areaaction.do?OperType=initQueryPage&areaIdValue="+areaId
					+"&parentAreaId="+parentAreaId+"&parentAreaName="+parentAreaName;
				window.opener.doSearch('<%=path%>','<%=newAreaId%>');
				window.close();
			}
				
			eapObjsMgr.onReady();
			DateUtil.addDateArea("activeDate","activeDateDate",false);
			DateUtil.addDateArea("inactiveDate","inactiveDateDate",false);	
				
			var activeDate = document.getElementById("activeDate");
			var inactiveDate = document.getElementById("inactiveDate");
			if(activeDate.value!=null && activeDate.value!=""){
				var actAry = activeDate.value.split(" ");
				activeDate.value = actAry[0];
			}
			if(inactiveDate.value!=null && inactiveDate.value!=""){
				var inactAry = inactiveDate.value.split(" ");
				inactiveDate.value = inactAry[0];				
			}
				
			var mode = document.getElementById("mode").value;
				
			if(mode == 'show'){
				setAllReadOnly();
			}
			

		}	
			
		function setAllReadOnly(){
			document.getElementById("areaId").readOnly = 'true';
			document.getElementById("areaName").readOnly = 'true';
			document.getElementById("parentAreaName").readOnly = 'true';
			document.getElementById("areaLevel").disabled = 'disabled';
			document.getElementById("postalCode").readOnly='true';
			document.getElementById("areaCode").readOnly='true';
			document.getElementById("activeDate").readOnly='true';
			document.getElementById("activeDateDate").disabled='disabled';
			document.getElementById("inactiveDate").readOnly='true';
			document.getElementById("inactiveDateDate").disabled='disabled';
				
			document.getElementById("bSave").disabled='disabled';		
			document.getElementById("bReset").disabled='disabled';			
		}
		/*
		 *ylm
		 */
		function doMethod(mode){				
		    var postalCode = document.getElementById("postalCode").value;
		    if(postalCode != null && postalCode != ""){			    
				var length = postalCode.length;
				if(length != 6){
					alert("��������ӦΪ6λ��");
					document.getElementById("postalCode").focus();
					return;
				}				
			}
			if(!checkTime()){
				return;
			}
			
			if(mode == 'add'){
				bAddClick('<%=path%>');
			}else if(mode == 'modify'){
				bSaveClick('<%=path%>');
			}
			
			
		}
		//�����˺��ֵĳ����ж�		
		// c-1 getLength(String)		
		function getLength(str){		
		 var templen=str.length;		
		 if(navigator.appName=='Netscape') return templen;		
		 for(var i=0;i<str.length;i++){		
		      var rstr=escape(str.substring(i,i+1)); 		
		      if (rstr.substring(0,2)=="%u"){ 		
		          templen++;		
		      } 		
		   }		
		 return templen;		
		}
		
		function fixLength(){
			var areaName = document.getElementById("areaName").value;
			if(getLength(areaName) > 32){
				alert("�����������Ϊ16λ���ֻ�32λ�ַ�");
				document.getElementById("areaName").focus();
				return;
			}
		}
		
		function checkTime(){
			var activeDate = document.getElementById("activeDate").value;
			var inActiveDate = document.getElementById("inActiveDate").value;
			if(activeDate!= null && activeDate!="" && activeDate!="null" 
			&& inActiveDate!= null && inActiveDate !="" && inActiveDate!="null" 			
			&& activeDate > inActiveDate){
				alert("ʧЧʱ�䲻��������Чʱ��");
				document.getElementById("inActiveDate").focus();
				return false;
			}else{
				return true;
			}
		}
		
	</SCRIPT>
</head>
<body onload="init('<%=message%>','<%=flag%>');" class="mainBody">
	<unieap:form method="post" action="">
	<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
		<tr class="tableTitleTR2">
			<td colspan="4" >
			<table width="100%" border="0" cellpadding="0" cellspacing="0" >
                <tr>
				<td class="tableTitleLeft2" >&#160;</td>
				<td class="tableTitle2">������Ϣ</td>
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
					<td align="left" class="formLabel" >�������&#160;&#160;<span class="formRequested" >*</span></td>
					<td align="left" class="formField" >
						<input type="text" name="areaIdValue" id="areaIdValue" value="<%=areaId%>" disabled="disabled"/>
						<input type="hidden" name="areaId" id="areaId" value="<%=areaId%>"/>
					</td>	
					<td align="left" class="formLabel" >��������&#160;&#160;<span class="formRequested" >*</span></td>
					<td align="left" class="formField" >
						<input type="text" name="areaName" id="areaName" value="<%=areaName%>" onblur="fixLength()"/>
					</td>
				</tr>
				<tr>
					<td align="left" class="formLabel" >�ϼ�����&#160;&#160;<span class="formRequested" >*</span></td>
					<td align="left" class="formField" >
						<input type="text" name="parentAreaName" id="parentAreaName" value="<%=parentAreaName%>" disabled="disabled"/>
						<input type="hidden" name="parentAreaId" id="parentAreaId" value="<%=parentAreaId%>"/>
						<input type="hidden" name="hiddenPareaName" id="hiddenPareaName" value="<%=parentAreaName%>"/>
					</td>	
					<td align="left" class="formLabel" >���򼶱�&#160;&#160;<span class="formRequested" >*</span></td>
					<td align="left" class="formField" >
						<td:SelectTag selectFlag="" selectColl="<%=areaLevelColl%>" selectvalue="" tagName="areaLevel" title="���򼶱�" />
					</td>
				</tr>
				<tr>
					<td align="left" class="formLabel" >��������&#160;&#160;</td>
					<td align="left" class="formField" >
						<unieap:input tcname="Number" id="postalCode" name="postalCode" prompt="��������" maxlength="6" isnullable="false"  value="<%=postalCode%>" onchange=""/>
					</td>	
					<td align="left" class="formLabel" >��;����&#160;&#160;</td>
					<td align="left" class="formField" >
						<!-- 
						<unieap:input tcname="Number" id="areaCode" name="areaCode" prompt="��;����" maxlength="4" isnullable="false"  value="<%=areaCode%>" onchange=""/>
						-->
						<input type="text" name="h_areaCode" id="h_areaCode" value="<%=areaCode%>" disabled="disabled"/>
						<input type="hidden" name="areaCode" id="areaCode" value="<%=areaCode%>" />
					</td>
				</tr>
				<tr>
					<td align="left" class="formLabel" >��Чʱ��&#160;&#160;<span class="formRequested" >*</span></td>
					<td align="left" class="formField" >
						<input type="text" maxlength="16" class="dateField" name="activeDate" id="activeDate" value="<%=activeDate%>" />
						<button class="calendarImgButton" id="activeDateDate" ></button>
					</td>	
					<td align="left" class="formLabel" >ʧЧʱ��&#160;&#160;</td>
					<td align="left" class="formField" >
						<input type="text" maxlength="16" class="dateField" name="inactiveDate" id="inactiveDate" value="<%=inactiveDate%>" onchange="checkTime()"/>
						<button class="calendarImgButton" id="inactiveDateDate" ></button>
					</td>
				</tr>
				<tr>
					<td align="left" class="formLabel" >���д���&#160;&#160;<span class="formRequested" >*</span></td>
					<td align="left" class="formField" colspan="3">
						<input type="text" name="cityCode" id="cityCode" value="<%=cityCode%>" disabled="disabled"/>
					</td>	
				</tr>
			</table>
			</td>
           <td class="formTableR" >&#160;</td>
         </tr> 
		 <tr> 
		   <td class="formTableLB">&#160;</td>
		   <td class="formTableB">&#160;
		   		<input type="hidden" id="mode" name="mode" value="<%=mode%>"/>
		   		<input type="hidden" id="flag" name="flag" value="<%=flag%>"/>
		   		<input type="hidden" id="path" name="path" value="<%=path %>"/> 
		   	</td>
		   <td class="formTableRB">&#160;</td>
	     </tr>        
	</table>				 
	<div class="formButtonDIV" id="filebutton" style="display:block"> 
		<button class="formButton" id="bSave" name="bSave" onclick="doMethod('<%=mode%>');">��&#160;&#160;��</button>
		<button class="formButton" id="bReset" name="bReset" onclick="return bResetClick();">��&#160;&#160;��</button>
		<button class="formButton" id="bBack" name="bBack" onclick="return bBackClick('<%=path%>');">��&#160;&#160;��</button>
	</div>		
	</unieap:form>
</body>
</html>
