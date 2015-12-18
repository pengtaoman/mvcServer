<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page import="java.util.List"%>
<%@ page import="com.neusoft.tdframework.demo.dao.staffer.EmployeeVO" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>

<%
	
	String webpath=request.getContextPath();
		
	List orgColl = (List)request.getAttribute("OrgColl");
	List areaColl = (List)request.getAttribute("AreaColl");
	
    EmployeeVO optr = (EmployeeVO)request.getAttribute("optr");
    
    String employeeId = optr.getAccountNo();
    
    String account = optr.getAccountNo();
    if(account == null)
    	account = "";
    	
    String nickname = optr.getName();
    if(nickname == null)
    	nickname = ""; 
    	
    String password=optr.getPassword();
    if(password == null)
    	password = "";
    	
    String areaid = optr.getAreaId();
    if(areaid == null)
    	areaid = "0";
    	
    String orgid = optr.getOrgId();
    if(orgid == null)
    	orgid = "0";
    	
    String certiType = optr.getCertType();
    if(certiType == null)
    	certiType = "0";
    	
    String certNumber = optr.getCertNumber();
    if(certNumber == null)
    	certNumber = "";
    	
    String createDate=optr.getCreateDate();
    if(createDate == null) 
    	createDate="";
    	
    String telephone = optr.getTelephone();
    if(telephone == null)
    	telephone="";
    	
    String email = optr.getEmail();
    if(email == null)
    	email = "";
    	
    String stature=optr.getStature();
    if(stature == null)
    	stature = "";
    	
    String money = optr.getMoney();
    if(money == null)
    	money = "0";
    	
    String remark = optr.getRemark();
    if(remark == null) 
    remark = "";

%>

<html>
<head>

<title>基本信息</title>

<contextPath value="<%=webpath%>"/>

<link href="<%=webpath%>/unieap/css/UniEAP.css" rel="stylesheet""></link>
<link href="<%=webpath%>/unieap/css/standard/Style.css" rel=stylesheet> 
<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet> 

<script language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/Tree.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/BaseObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/NumberObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/DoubleObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/IDCardObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/IntegerObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/MoneyObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/PasswordConfirmObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/PasswordObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/PosIntegerObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/ReadOnlyFieldObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/ReadOnlyObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/TextObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/TextAreaObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/SelectObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/QuickSelectObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/FormatNumber.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/CursorDispose.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/EmailObj.js"> </script>
<script language=javascript src="<%=webpath%>/unieap/js/DWNameRule.js"></script>
<script language=javascript src="<%=webpath%>/unieap/js/tab/tabApi.js"></script>

<script language=javascript src="<%=webpath%>/common/js/td_common.js" ></script>
<script language=javascript src="<%=webpath%>/common/js/td_date.js" ></script>

<script language=javascript src="<%=webpath%>/tdframework/demo/js/baseInfo.js"></script>

<script language="javascript">
function testA(){
   //window.frameElement.parent.ui();
   //parent.parent.document.getElementById("strKind").value;
   parent.parent.parent.ui();
}
</script>

</head>

<body class="main_body_bg" leftmargin="20" onload="init();">

<unieap:form action="null" >
	<table bordercolordark="#FFFFFF" bordercolorlight="#E8E8E8" cellspacing="0"  class="main_table3_4" border="0" width="95%" align="left">
		<tr> 
	    	<td class="main_table3_2_th" valign="middle" >
	    		<span class="text_title">帐户基本信息</span>
	    	</td>
	    </tr>
	    <tr> 
	    	<td class="main_table3_3_td" valign="middle"  width="80"> 
	        	<table cellspacing="0" class="main_table5">
	          		<tr> 
	           	 		<td class="main_table5_td1" valign="middle" >帐户名称</td>
	            		<td class="main_table5_td1" valign="middle" > 
	            			<unieap:input tcname="Text" id="name" name="name" prompt="name" isnullable="false" tooltip="account"  value="<%=account%>"/>*
	            		</td>
	            		<td class="main_table5_td1" valign="middle" > &nbsp;nickname&nbsp;&nbsp;&nbsp;</td>
	            		<td class="main_table5_td1" valign="middle" > 
	               			<unieap:input tcname="Text" id="nickname" name="nickname" prompt="姓名" isnullable="true" value="<%=nickname%>"/>*
	            		</td>
	          		</tr>
	          		<tr> 
	            		<td class="main_table5_td1" valign="middle" >登录密码</td>
	            		<td class="main_table5_td1" valign="middle" > 
	               			<unieap:input tcname="Password" id="password" name="password" prompt="登录密码" isnullable="false" value="********"/>*
	            		</td>
	            		<td class="main_table5_td1" valign="middle" > &nbsp;确认密码</td>
	           			<td class="main_table5_td1" valign="middle" > 
	               			<unieap:input tcname="PasswordConfirm" id="confirmpassword" name="confirmpassword" prompt="确认密码" 
	               			              isnullable="true" prePassword="password" />*
	            		</td>
	          		</tr>
	          		<tr> 
	           	 		<td class="main_table5_td1" valign="middle" >区域&nbsp;&nbsp;&nbsp;</td>
	            		<td class="main_table5_td1" valign="middle" > 
							<td:SimpleSelect selectFlag="" selectColl="<%=areaColl%>" selectvalue="<%=areaid%>" tagName="Area"/>
	            		</td>
	            		<td class="main_table5_td1" valign="middle" > &nbsp;组织机构</td>
	            		<td class="main_table5_td1" valign="middle" > 
							<td:SimpleSelect selectFlag="" selectColl="<%=orgColl%>" selectvalue="<%=orgid%>" tagName="Organ"/>
	            		</td>
	          		</tr>
	          		<tr> 
	            		<td class="main_table5_td1" valign="middle" >证件类型</td>
	            		<td class="main_table5_td1" valign="middle" > 
	               			<unieap:input tcname="QuickSelect" id="certificateType" name="certificateType" prompt="区域" 
	               			              isnullable="true" style="width:150" onchange="">
	                	    	<option value="sfz">身份证</option>
	                 			<option value="hz">护照</option>
	                 			<option value="jgz">军官证</option>
	                 			<option value="jz">驾照</option>
	              			</unieap:input>*
	            		</td>
	            		<td class="main_table5_td1" valign="middle" > &nbsp;证件号码</td>
	            		<td class="main_table5_td1" valign="middle"  id="alterCertificate"> 
	               			<input type="text" name="certificateNumber" value="<%=certNumber%>" />* 
	            		</td>
	          		</tr>
	          		<tr> 
	            		<td class="main_table5_td1" valign="middle" >入职日期</td>
	            		<td class="main_table5_td1" valign="middle" > 
	               			<input type="hidden" name="path" value="<%=webpath%>"/> 
	              			<input type="text" maxlength="16" class="dateField" name="workDate" value="" />
				   			<button class="calendarImgButton" id="chooseDate" ></button>
	           			</td>
	            		<td class="main_table5_td1" valign="middle" > &nbsp;身高&nbsp;&nbsp;&nbsp;</td>
	            		<td class="main_table5_td1" valign="middle" > 
	               			<unieap:input tcname="PosInteger" id="stature" name="stature" prompt="身高" isnullable="false"  value="<%=stature%>" />
	            		</td>
	          		</tr>
	          		<tr> 
	            		<td class="main_table5_td1" valign="middle" > &nbsp;Email&nbsp;&nbsp;</td>
	            		<td class="main_table5_td1" valign="middle" > 
	               			<unieap:input tcname="Email" id="email" name="email" prompt="Email" isnullable="true"  value="<%=email%>" />
	            		</td>
	            		<td class="main_table5_td1" valign="middle" > &nbsp;联系电话</td>
	            		<td class="main_table5_td1" valign="middle" > 
	               			<unieap:input tcname="Number" id="telephone" name="telephone" prompt="联系电话" isnullable="false"  value="<%=telephone%>" />
	            		</td>
	          		</tr>
	          		<tr> 
	            		<td class="main_table5_td1" valign="middle" > &nbsp;收入&nbsp;&nbsp;&nbsp;</td>
	            		<td class="main_table5_td1" valign="middle"  colspan="3" > 
	              			<unieap:input tcname="Money" id="money" name="money" prompt="收入" pattern="+#,###.00" isnullable="true" value="<%=money%>" />￥
	            		</td>
	          		</tr>
	          		<tr> 
	            		<td class="main_table5_td1" valign="middle" > &nbsp;备注&nbsp;&nbsp;&nbsp;</td>
	            		<td class="main_table5_td1" valign="middle"  colspan="3" > 
	               			<unieap:input securityid="" tcname="TextArea" id="remark" name="remark" prompt="备注" 
	               			              rows="3" cols="53" isnullable="true" value="<%=remark%>" onkeydown=" foucsto()"/>
	            		</td>
	          		</tr>
	          		<tr>
		          		<td><td:Checkbox name="chk" value="2" securityid="secu_chk2" />checkbox</td>
		          		<td><td:Radio name="rad" value="2" securityid="secu_rad1" />radio1</td>
	          		</tr>
	           		<tr> 
	            		<td class="main_table5_td1" valign="middle" > &nbsp;按钮&nbsp;&nbsp;&nbsp;</td>
	            		<td class="main_table5_td1" valign="middle"  colspan="1" >
	               			<input type="button" name="test1" class="formButton" value="普通按钮" onclick="reCheckDate()"/> 
	            		</td>
	            		<!-- td class="main_table5_td1" valign="middle"  colspan="1" > 
	               			<jsp:include page="/tdframework/demo/operatorMaint/Test.jsp"/>
	            		</td>-->
	          		</tr>
	        	</table>
	      	</td>
	    </tr>
	</table>
</unieap:form>    
</body>
</html>