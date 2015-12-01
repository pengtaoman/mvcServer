<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
/* 
 JSP程序简要描述信息
 **************************************************************
 * 程序名	: CustInfoMgtHead.jsp
 * 建立日期: 2012-02-18
 * 作者		: Shaochy
 * 模块		: 基本订单受理
 * 描述		: 宽带标准化套餐
 * 备注		: 
 * ------------------------------------------------------------
 * 修改历史
 * 序号		日期		修改人	修改原因
 * 1
 * 2
 **************************************************************
 */
%>
<%
	String webPath = request.getContextPath();
	ParamObjectCollection certcoll = (ParamObjectCollection) request.getAttribute("certcoll");//证件类型
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>
			宽带标准化套餐
		</title>
		<!-- 禁止缓存 headers -->
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="-1" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<!-- end 禁止缓存 headers -->
		<!-- 公共css  -->
		<link rel="stylesheet" href="<%=webPath%>/common/css/td_style_new.css" type="text/css" />
		<!-- 公共js  -->
		<script language="javascript" src="<%=webPath%>/custcontact/common/js/td_operation.js"></script>
		<script language="javascript" src="<%=webPath%>/common/js/td_common.js"></script>
		<script  language=javascript src="<%=webPath%>/unieap/js/Globals.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/Common.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/BaseObj.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/EAPObjsMgr.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/TextObj.js"> </script> 
		<script  language=javascript src="<%=webPath%>/unieap/js/PasswordObj.js"> </script>
		<script language=javascript src="<%=webPath%>/orderaccept/common/js/CommonUtils.js"></script>
		<!-- title条js -->
		<script language="javascript" src="<%=webPath%>/common/js/titlebar.js"></script>
		<script language="javascript" src="<%=webPath%>/common/js/waitingbar.js"></script>
		<script language="javascript" src="<%=webPath%>/custcontact/common/businessmodule/base/Common.js"></script>	
		<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"/>
		<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css"/>	
		<script language="javascript" src="<%=webPath%>/unieap/ria3.3/dojo/dojo.js"></script>
		<script language="javascript" src="<%=webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script language="javascript" src="<%=webPath%>/orderaccept/common/dialog/MessageBox.js"></script>
    	<!-- 宽带标准化套餐js -->
    	<script language="javascript" src="<%=webPath%>/orderaccept/offerstandardaccept/js/OfferStandardAcceptHead.js"></script>
	</head>
	<body class="mainBody" onload="init();">
		<unieap:form action=""  >		
			<input type="hidden" name="webpath" id="webpath" value="<%=webPath%>" />
			<input type="hidden" id="QueryMet" name="QueryMet" value="1" />
			<table border="0" cellpadding="0" cellspacing="0" class="formTable">
				<!-- 表格标题行-->
				<tr class="tableTitleTR2">
					<td colspan="3">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">
									&#160;
								</td>
								<td class="tableTitle2">
									宽带标准化套餐查询
								</td>
								<td class="tableTitleRight2">
									&#160;
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableL">
						&#160;
					</td>
					<td class="formTableC">
						<!-- BEGIN 表单核心区域 -->
						<table align="center" border="0" cellpadding="0" cellspacing="2" class="formTableCore">					
							<tr>
								<td class="formLabel">
									<span class="formRequested">*</span>查询方式:
								</td>
								<td class="formField" colspan="7" >
									<input name="QueryFlag" type="radio" value="1" checked id="queryByServiceId" onclick="changeQuery(this)">
									<label for="queryByServiceId">业务号码查询</label>
									<input name="QueryFlag" type="radio" value="2" id="queryByCertId" onclick="changeQuery(this)">
									<label for="queryByCertId">证件号码查询</label>
									<input name="QueryFlag" type="radio" value="3" id="queryByCertId" onclick="changeQuery(this)">
									<label for="queryByFirstName">客户名称查询</label>									
             					 </td>
							</tr>	
								
							<tr id="trServiceId">
								<td class="formLabel">
									<span class="formRequested">*</span><span id="condition1">业务号码:</span>
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="serviceId" name="serviceId" prompt="业务号码" isnullable="false" 
										onblur="trimField(this);getProductIdList(this);" 
										maxlength="30" onfocus="focusEnd();"  />										
								</td>
								<td class="formLabel">
									<span class="formRequested">*</span><span id="condition2">产品名称:</span>
								</td>
								<td class="formField">
									<select name="productId" id='productId'>
										<option value="">
											请选择
										</option>
									</select>
				             	</td>							
								<td class="formField2">
									<unieap:unieapbutton classname="formButton" name="BQuery" onclick="BQuery_OnClick()" value="查 询" />
									<unieap:unieapbutton classname="formButton" name="BReset" onclick="BReset_OnClick()" value="重 置" />								
								</td>	
								<td class="formLabel" ></td>
								<td class="formField" ></td>																
							</tr>
															
													
							<tr id="trIdentity" style="display: none;">
								<td class="formLabel">
									<span class="formRequested">*</span>证件类型:
								</td>
								<td class="formField">
									<td:SelectTag selectFlag="" selectColl="<%=certcoll%>" selectvalue="" tagName="identityKind"/>	
								</td>
								<td class="formLabel">
									<span class="formRequested">*</span>证件号码:
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="identityCode" name="identityCode" prompt="证件号码" isnullable="true" 
										value="" maxlength="30" onkeypress="return on_key_id_check(document.forms[0].identityKind,this,this)"
										onblur="trimField(this);checkid_iden_new('证件号码',document.forms[0].identityKind,this)" 
										onfocus="setlength(document.forms[0].identityKind,this);" />
								</td>
								<td class="formField2">
									<unieap:unieapbutton classname="formButton" name="BQuery" onclick="BQuery_OnClick()" value="查 询" />
									<unieap:unieapbutton classname="formButton" name="BReset" onclick="BReset_OnClick()" value="重 置" />								
								</td>	
								<td class="formLabel" ></td>
								<td class="formField" ></td>																
							</tr>
								
							<tr id="trFirstName" style="display: none;">
								<td class="formLabel" >
									<span class="formRequested">*</span>客户名称:
								</td>
								<td class="formField" >
									<unieap:input tcname="Text"id="firstName" name="firstName" prompt="客户名称" isnullable="true" maxlength="30"
									onblur="trimField(this);" />	
									<input type="checkbox" name="checkbox" id="checkbox" onclick="changeQueryMet(this);">
									<img src="common/images/icon/jqcx_icon.png" width="20" height="20">							
								</td>	
								<td class="formLabel" >&#160;</td>
								<td class="formField" >&#160;</td>																
								<td class="formField2">
									<unieap:unieapbutton classname="formButton" name="BQuery" onclick="BQuery_OnClick()" value="查 询" />
									<unieap:unieapbutton classname="formButton" name="BReset" onclick="BReset_OnClick()" value="重 置" />							
								</td>									
								<td class="formLabel" ></td>
								<td class="formField" ></td>																			
							</tr>
						</table>
					</td>
					<td class="formTableR">
						&#160;
					</td>
				</tr>
				<tr>
					<td class="formTableLB">
						&#160;
					</td>
					<td class="formTableB">
						&#160;
					</td>
					<td class="formTableRB">
						&#160;
					</td>
				</tr>
				<tr>
					<td colspan="3" class="formButtonTD" align="center">

					</td>
				</tr>
			</table>
		</unieap:form>
	</body>
</html>