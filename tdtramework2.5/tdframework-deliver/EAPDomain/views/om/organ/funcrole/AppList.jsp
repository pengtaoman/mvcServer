<%@ page contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%@ page import="java.util.List"%>
<%@ page import="com.neusoft.om.dao.app.AppVO"%>
<%@ page import="com.neusoft.om.dao.app.AppRoleRelVO"%>

<%
     String path =request.getContextPath();
     String roleId = (String)request.getAttribute("roleId");
     List appList = (List)request.getAttribute("appList");    
     List appRoleList = (List)request.getAttribute("appRoleList"); 
     String str=(String)request.getAttribute("message");
%>
<html>
  <head>
  <base target="_self">
  <TITLE>角色维护</TITLE>
  <link href="<%=path%>/common/css/td_style.css"    rel=stylesheet></link>
  <link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>
  <script language=javascript src="<%=path%>/common/js/eccn.js"> </script>
  <script language="javascript">
    var eccn=new ECCN("ec");
    var checkedFlag = false;
    
	function load() {
		eccn.doPrep=false;
		eccn.doPrepPrev=false;
		eccn.init();
		<%if(str!=null&&!str.equals(""))
		  {	%>
			var msg='<%=str%>';
		    alert(msg);
		<%}%> 
		<%if(appList!=null&&!appList.isEmpty())
		  { %>
			initCheckBox();
		<%}%>
	}	
	var rid='';
	var rname='';	
	
	function initCheckBox(){
		var ec=document.getElementById("ec");    
		if(ec!=null){
			var objs=ec.all.tags("input");
			var obj;
			<%for(int index=0;index<appRoleList.size();index++){%>
		      	for(var i=0 ;i<objs.length;i++){
		        	obj=objs[i];	            	
		        	if(obj.type=='checkbox' && obj.value=='<%=((AppRoleRelVO)appRoleList.get(index)).getAppId()%>')
		        	{
						obj.checked=true;
					}
				}
			<%}%>
		}
	}   
	
	function showSaveButton(){
		var ec=document.getElementById("ec");   
		
		if(ec!=null){
			var objs=ec.all.tags("input");
			var obj;
	      	for(var i=0 ;i<objs.length;i++){
	        	obj=objs[i];	            	
	        	if(obj.type=='checkbox' && obj.checked==true){
	        		document.getElementById('bSave').disabled = '';
	        		return;
				}
			}
		}
		
		document.getElementById('bSave').disabled = 'disabled';
	}
	
	function bSaveClick(){
	    var ec=document.getElementById("ec");   
	    var checkedIds = ""; 
		if(ec!=null){
			var objs=ec.all.tags("input");
			var obj;
	      	for(var i=0 ;i<objs.length;i++){
	        	obj=objs[i];	            	
	        	if(obj.type=='checkbox' && obj.checked==true){
	        		document.getElementById('bSave').disabled = '';
	        		if(checkedIds=='' || checkedIds == null){
	        			checkedIds = obj.value; //appRoleRelVO.appId
	        		}else{
	        			checkedIds = checkedIds + ',' + obj.value;
	        		}
					
				}else{
					document.getElementById('bSave').disabled = 'disabled';
				}
			}
		}	
		
		//ec.target="_self";
		ec.action="roleManage.do?method=doGrantAppRole&checkedIds="+checkedIds;
		//parent.RoleButton.location='<%=path%>/views/om/blank.html';
		ec.submit(); 
	}
	
	function bSelectAllClick(){
		var ec = document.getElementById("ec");    
		if(ec!=null){
			var objs=ec.all.tags("input");
			var obj;
			if(checkedFlag == false){
				for(var i=0 ;i<objs.length;i++){
		        	obj=objs[i];	            	
		        	if(obj.type=='checkbox'){
		        		obj.checked = true;
					}
				}
				checkedFlag = true;
			}else{
				for(var i=0 ;i<objs.length;i++){
		        	obj=objs[i];	            	
		        	if(obj.type=='checkbox'){
		        		obj.checked = false;
					}
				}
    			checkedFlag = false;
    		}
		}
	}
	
	function bCancelAllClick(){
		var ec=document.getElementById("ec");    
		if(ec!=null){
			var objs=ec.all.tags("input");
			var obj;
		    for(var i=0 ;i<objs.length;i++){
	        	obj=objs[i];	            	
	        	if(obj.type=='checkbox'){
	        		obj.checked=false;
				}
			}
			<%for(int index=0;index<appRoleList.size();index++){%>
		      	for(var i=0 ;i<objs.length;i++){
		        	obj=objs[i];	         	
		        	if(obj.type=='checkbox' && obj.value=='<%=((AppRoleRelVO)appRoleList.get(index)).getAppId()%>'){
						obj.checked=true;
					}
				}
			<%}%>
		}
	}
	
	function bBackClick(){
		if (!confirm('您确定关闭么？')) 
			return false;
		window.close();
	}
  </script>
  </head>
  
 <body onLoad="load()">
 <%if (appList==null||appList.isEmpty()) {	%>	
	<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
		<tr class="tableTitleTR2">
			<td colspan="4" >
			<table width="100%" border="0" cellpadding="0" cellspacing="0" >
	            <tr>
				<td class="tableTitleLeft2" >&#160;</td>
				<td class="tableTitle2">应用赋权&#160;</td>
				<td class="tableTitleRight2" >&#160;</td>
				</tr>
			 </table>
			 </td>
		</tr>
	    <tr> 
	       <td class="formTableL" >&#160;</td>
	       <td class="formTableC" align="center">
				<span style="font-size:20px;color:red;">无可赋权的应用信息</span>
		   </td>
	       <td class="formTableR" >&#160;</td>
	    </tr> 
		<tr> 
		    <td class="formTableLB">&#160;</td>
		    <td class="formTableB">&#160;</td>
		    <td class="formTableRB">&#160;</td>
		</tr>        
	</table>
<%}else {	%>
<ec:table items="appList" var="app" paginationLocation="false"  rowsDisplayed="-1"> 
	<ec:row>
		<ec:column property="recordId" title="选择" width="30px" style="text-align:center">
             <input type="checkbox" name="checkbox_${app.appId}" value='${app.appId}' class="checkbox"/>
        </ec:column>
		<ec:column property="appName" title="待赋权应用信息"/>
	</ec:row>		
</ec:table>
<p>&#160;</p>
<div class="formButtonDIV" id="filebuttons" style="display:block">
	<button class="formButton" name="bSelectAll" onClick="bSelectAllClick();return false;">全&#160;&#160;选</button>
	<button class="formButton" name="bCancelAll" onClick="bCancelAllClick();return false;">重&#160;&#160;置</button>
	<button class="formButton" name="bSave" onClick="bSaveClick();return false;">提&#160;&#160;交</button>
	<button class="formButton" name="bBack" onClick="bBackClick();">返&#160;&#160;回</button>
</div>
<%}%>		
</body>
</html>
