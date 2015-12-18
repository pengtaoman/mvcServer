<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%
	String webpath=request.getContextPath();
	String userName=request.getParameter("username");
	String password=request.getParameter("password");
	
%>
<html>
<head>
<title>参数刷新</title>
<contextPath value="<%=webpath%>"/>
<!-- 禁止 windows 主题风格 -->
<meta http-equiv="MSThemeCompatible" content="no" />
<!-- 禁止缓存 headers -->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />
<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">  
<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
<script language="javascript" src="<%=webpath%>/common/js/td_common.js" ></script>
<script language="javascript" src="<%=webpath%>/unieap/js/SelectObj.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/QuickSelectObj.js"> </script>
<script language="javascript" src="<%=webpath%>/common/js/jquery.min.js" type="text/javascript"></script>
<script  language=javascript src="<%=webpath%>/tdframework/admin/cache/cacheCommon.js"> </script>
<script language="javascript">
function init(){
   eapObjsMgr.onReady();
}
function changeApp(){
	//parent.grid.location.href="http://localhost:8080/tdframework/tdframework/demo/operatorMaint/Query.jsp";
	var appName = document.forms(0).query.value;
	/////appName = "tdframework";
	if(appName==''){
		alert("请选择要刷新的应用!");
		return false;
 	}
	var urlstr = "/"+appName+"/cacheManagerAction.do?method=cacheManager&appName="+appName;
	parent.grid.location.href=urlstr;
}
</script>
</head>

  <body class="mainBody" onload="init();" >
  <unieap:form action="" target='grid'>
  <input type="hidden" id="queryType" name="queryType" value="account" />
         <table cellspacing="0"  border="0" class="formTable" >
		  <tr class="tableTitleTR2" > 
            <td colspan="3" >
			<table width="100%" border="0" cellpadding="0" cellspacing="0" >
                <tr>
				<td class="tableTitleLeft2" >&#160;</td>
				<td class="tableTitle2">参数刷新</td>
				<td class="tableTitleRight2" >&#160;</td>
				</tr>
			 </table>
           </td>
          </tr>


            <tr> 
              <td valign="middle" nowrap width="70%"> 
                <table  cellspacing="0" border="0" class="formTableCore">
                  <tr> 
                    <td class="formLabel" width="20%">选择应用<span class="formRequested" >*</span></td>
                    <td class="formField" width="20%"> 
                      <unieap:input tcname="QuickSelect" prompt="方式" id="query" >
                         <option value="crm1">crm1</option>
                         <option value="crm2">crm2</option>
                         <option value="crm3">crm3</option>
                         <option value="crm4">crm4</option>
                         <option value="baseinfo">基础信息维护</option>
                      </unieap:input>
                    </td>                    
		            <td class="formLabel" width="20%">&#160;&#160;</td>
		            <td class="formLabel" width="20%">&#160;&#160;</td>
		            <td class="formLabel" width="20%">&#160;&#160;</td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!--tr>
            	<td width="100%" colSpan="4">
            		<table id="tempTable" >
            		</table>
            	</td>
            </tr-->
          </table>
          <div class="formButtonDIV">
			<button  class="formButton" name="" id="check" onclick="changeApp()">查询</button>
		  </div>
          
      </unieap:form>  
  </body>
</html>
