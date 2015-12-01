<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>	

<%
	String webpath = request.getContextPath();	
	String message = (String)request.getAttribute("message");	
	String batchNo = NullProcessUtil.nvlToString((String)request.getAttribute("batchNo"),"");
%>

<html>
<head>

<title>批量导入测试页面</title>

<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="MSThemeCompatible" content="no" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />
		
<contextPath value="<%=webpath%>"/>

<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">

<script language="javascript" src="<%=webpath%>/common/js/td_common.js"> </script>
<script language="javascript" src="<%=webpath%>/common/js/waitingbar.js" ></script>

<script language="javascript" src="<%=webpath%>/tdframework/demo/js/demoUpLoad.js"></script>

<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/DWNameRule.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/DWManager.js"> </script>

<script language="javascript"> 
function init(){
	var alertMessage = document.all("showAlert").value;
    if(alertMessage!="null"){
    	alert(alertMessage);
    }
}
</script>

</head>

<body onload="eapObjsMgr.onReady();init();" class="mainBody">
	<form name="EAPForm" method="POST" action="" ENCTYPE="multipart/form-data">
		<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
			<tr class="tableTitleTR2">
				<td colspan="4" >
					<table width="100%" border="0" cellpadding="0" cellspacing="0" >
                		<tr>
							<td class="tableTitleLeft2" >&#160;</td>
							<td class="tableTitle2">批量导入测试页面</td>
							<td class="tableTitleRight2" >&#160;</td>
						</tr>
			 		</table>
			 	</td>
			</tr>
        	<tr> 
          		<td class="formTableL" >&#160;
           			<input type="hidden" name="showAlert" value="<%=message%>">
           		</td>
           		<td class="formTableC">		 	 			
					<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
						<tr>
							<td align="center" class="formLabel">请选择要导入的文件&#160;&#160;
								<span class="formRequested" >*</span>
							</td>
							<td align="center" class="formField" >
								<input type="file" name="fileName" title="" onmouseover="showTitle(this)"/>
							</td>
							<td align="left" class="formField" >导入格式 ：自定义</td>
							<td align="center" class="formField" >&#160;</td>
						</tr>
						<tr>
							<td align="center" class="formLabel">导入文件的批次号&#160;&#160;&#160;&#160;
								<span class="formRequested" >*</span>
							</td>
							<td align="center" class="formField" >
								<input type="text" name="batchNo" disabled="disabled" value="<%=batchNo%>"/>
							</td>
							<td align="left" class="formField" colspan="2">稍后你可以根据此批次号查询文件导入是否完成</td>
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
			<button class="formButton"  onclick="load_submit()">确 定</button>
			<button class="formButton"  onclick="alert('无操作');">查 询</button>
		</div>		
	</form>
</body>
</html>
