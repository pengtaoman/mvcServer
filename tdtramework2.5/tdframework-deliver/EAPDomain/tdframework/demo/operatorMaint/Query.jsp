<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>

<%
	String webpath=request.getContextPath();
%>

<html>
<head>

<title>人员综合管理</title>

<contextPath value="<%=webpath%>"/>

<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<meta http-equiv="MSThemeCompatible" content="no" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />

<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">  

<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"></script>
<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/SelectObj.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/QuickSelectObj.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/TimePicker.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/DateObj.js"></script>

<script language="javascript" src="<%=webpath%>/common/js/td_common.js" ></script>
<script language="javascript" src="<%=webpath%>/common/js/waitingbar.js" ></script>

<script language="javascript" src="<%=webpath%>/tdframework/demo/js/query.js"> </script>

<script language="javascript"> 
	
var submitted = false; 
WaitingBar.setMsg("可以自定义等待信息....");

function enterToSubmit(){
	if(submitted == false && event.keyCode == 13){
		WaitingBar.showMe();
		document.EAPForm.action = "demoExtremeTable.do?method=query";
		document.forms[0].target = "grid";	    	
		document.forms[0].submit();
	}
}
</script>

</head>

<body class="mainBody" onload="init();" >
	<unieap:form action="demoExtremeTable.do?method=query" target='grid'>
		 <input type="hidden" id="queryType" name="queryType" value="account" />
    	 <table cellspacing="0" border="0" class="formTable">
		 	<tr class="tableTitleTR2"> 
            	<td colspan="3">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
               	    	<tr>
							<td class="tableTitleLeft2">&#160;</td>
							<td class="tableTitle2">表单标题</td>
							<td class="tableTitleRight2">&#160;</td>
						</tr>
			 		</table>
           		</td>
          	</tr>
            <tr> 
            	<td valign="middle" nowrap width="70%"> 
                	<table cellspacing="0" border="0" class="formTableCore">
                 		<tr> 
                    		<td class="formLabel" width="20%">查询方式<span class="formRequested" >*</span></td>
                   		    <td class="formField" width="20%"> 
                      			<unieap:input tcname="QuickSelect" prompt="方式" id="query" onclick="alertQueryPattern(this)">
                         			<option value="account">帐户查询</option>
                         			<option value="role">角色查询</option>
                         			<option value="unit">组织结构查询</option>
                        			<option value="date">创建日期查询</option>
                        			<option value="test">TEST</option>
                      			</unieap:input>
                    		</td>                    
		           		 	<td class="formLabel" width="20%">&#160;&#160;</td>
		           			<td class="formLabel" width="20%">&#160;&#160;</td>
		           			<td class="formLabel" width="20%">&#160;&#160;</td>
                 		 </tr>
                	</table>
              	</td>
            </tr>
            <!-- 按帐户查询 -->
            <tr> 
            	<td id="account" style="display:none" valign="middle" nowrap width="70%"> 
                	<table cellspacing="0" border="0"  class="formTableCore">
                  		<tr> 
                  			<td class="formLabel" width="20%">帐户<span class="formRequested">*</span></td>
                    		<td class="formField" width="20%"> 
                     			<input name="zhanghu" value="" onkeydown="enterToSubmit()">
                   			</td>
                    		<td class="formLabel" width="20%">&#160;&#160;</td>
		           			<td class="formLabel" width="20%">&#160;&#160;</td>
		            		<td class="formLabel" width="20%">&#160;&#160;</td>
                  		</tr>
                	</table>
              	</td>
                <!-- 按角色查询 -->
                <td id="role"  style="display:none" valign="middle" nowrap width="70%"> 
                	<table cellspacing="0" border="0" class="formTableCore">
                    	<tr> 
                    		<td class="formLabel" width="20%">区域<span class="formRequested">*</span>&#160;&#160;</td>
                    		<td class="formField" width="20%"><input type="text" name="storeValue" readonly></td>
                    		<td class="formField" width="10%"><unieap:innertree id="inner" multiSelect="false" display="true" 
                    		    laterFunction="alterSelect()" valueBackInput="storeValue" buttonCssClass="searchImgButton" 
                    		    treeImagePath="<%=request.getContextPath()%>" innerTreeID="area" />
                    		</td>
                    		<td align="left" class="formLabel" width="20%">角色<span class="formRequested">*</span></td>
                   		    <td align="left" class="formField" width="20%"> 
                      			<select name="select">
                       				<option value="">请选择</option>
                      			</select>
                    		</td>
		            		<td class="formLabel" width="10%">&#160;&#160;</td>
                  		</tr>
              		</table>
              	</td>
               <!-- 按组织结构查询 -->
               <td id="unit" style="display:none" valign="middle" nowrap width="70%"> 
                <table cellspacing="0" border="0" class="formTableCore">
                  <tr> 
                    <td class="formLabel" width="20%">区域<span class="formRequested">*</span>&#160;&#160;</td>
                    <td class="formField" width="20%"><input type="text" name="initiative" value=""></td>
                    <td class="formField" width="10%"> 
                    	<unieap:innertree id="first" display="true" buttonCssClass="searchImgButton" valueBackInput="initiative"  
                    	                  multiSelect="false" treeImagePath="<%=request.getContextPath()%>" innerTreeID="area" 
                    	                  laterFunction="alterInnerTree()" />
                    </td>
                    <td class="formLabel" width="20%">组织机构</td>
                    <td class="formField" width="30%">
                        <input type="hidden" name="driven" value=""> 
                        <iframe id="drivenframe" frameborder="0" scrolling="no" width="190px" height="28px" 
                                src="<%=webpath%>/demoRequestInnerTreeData.do?method=drivenTree"></iframe>
                  	</td>
                  </tr>
                </table>
              </td>
              <!-- 按创建日期查询 -->
              <td id="date" style="display:none" valign="middle" nowrap width="70%"> 
              	<table cellspacing="0">
                	<tr> 
                    	<td class="formLabel" width="20%">起始日期<span class="formRequested" >*</span></td>
                    	<td class="formField" width="20%"> 
                      		<unieap:input id="preDate" tcname="Date" dateformat="YYYY-MM-DD" name="preDate" prompt="起始日期"/>
                    	</td>
                    	<td class="formField" width="10%">&#160;</td> 
                    	<td class="formLabel" width="20%">结束日期<span class="formRequested" >*</span></td>
                    	<td class="formField" width="20%"> 
                       		<unieap:input id="lastDate" tcname="Date" dateformat="YYYY-MM-DD" name="lastDate" prompt="结束日期"/>
                    	</td>
                     	<td class="formField" width="10%">&#160;</td> 
                  	</tr>
              	</table>
           	 </td>
           </tr>
         </table>
         <!-- 临时表显示区域 -->
         <div width="100%" id="tempTable" style="display:none"></div>
         <div class="formButtonDIV">
		 	<button  class="formButton" name="" id="check" onclick="checkValue()">分页查询</button>
			<button  class="formButton" name="" id="checkAll" onclick="checkAllValue()">全部查询</button>
			<button  class="formButton" name="" id="add" onclick="addUser()">新 增</button>
			<button  class="formButton" name="" id="errorDemo" onclick="openErrorPage()">ErrorDemo</button>
	  	 </div>
       </unieap:form>  
	</body>
</html>