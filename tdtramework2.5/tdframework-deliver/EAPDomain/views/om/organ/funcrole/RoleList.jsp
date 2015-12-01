<%@ page contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%@ page import="java.util.List"%>
<%@ page import="com.neusoft.om.dao.role.RoleVO"%>
<%
     String path =request.getContextPath();
     List roleList = (List)request.getAttribute("roleList");
     String str=(String)request.getAttribute("Message");
     String action = path+"/om/roleManage.do?method=getInitInfo";
%>
<html>
<head>
<TITLE>功能角色维护</TITLE>
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
     
     function load() {
		 eccn.doPrep=false;
		 //eccn.doPrepPrev=false;
		 //eccn.ajaxSubmit=false;
		 eccn.init();
	   
	     <%if(str!=null&&!str.equals("")){%>
	          var msg='<%=str%>';
	          alert(msg);
		 <%}
	       if(roleList!=null&&!roleList.isEmpty()){
	     %>
		      initCheckBox();
	     <%}%>
	 }
	
	 var rid='';
	 var rname='';
	 
	 function radioOnclick(kind,roleid,rolename,roleDesc){
	 	 var EAPForm = parent.RoleListButton.EAPForm;
	 	
         if(kind=="0"){
            EAPForm.bView.disabled=false;
            EAPForm.bModify.disabled=true;
            EAPForm.bDelete.disabled=true;
            EAPForm.bGrant.disabled=true;
            EAPForm.bApp.disabled=true;
            rid=roleid;
            EAPForm.roleId.value=rid;
            EAPForm.roleName.value = rolename;
            EAPForm.roleDesc.value = roleDesc;
         }else{
            EAPForm.bModify.disabled=false;
            EAPForm.bDelete.disabled=false;
            EAPForm.bGrant.disabled=false;
            EAPForm.bView.disabled=false;
            EAPForm.bApp.disabled=false;
            rid=roleid;
            EAPForm.roleId.value=rid;
            EAPForm.roleName.value = rolename;
            EAPForm.roleDesc.value = roleDesc;
            rname=rolename;
         }
        //选择其他角色时将session中的角色权限信息去掉
        //executeRequest('rolePowerAction','clearSession',null);
     }   
		
       function initCheckBox(){
	      var ec=document.getElementById("ec");
	      if(ec!=null){
	         var objs=ec.all.tags("input");;
	         var obj;
	       
	         <%
	          if(roleList !=null){
	          	for(int index=0;index<roleList.size();index++){%>
	             for(var i=0 ;i<objs.length;i++){
	                 obj=objs[i];			
	                 if (obj.type=='checkbox'&&obj.name=='usable<%=((RoleVO)roleList.get(index)).getRoleId()%>'&&<%=((RoleVO)roleList.get(index)).getF_usable_flag()%>==1||obj.type=='checkbox'&&obj.name=='admin<%=((RoleVO)roleList.get(index)).getRoleId()%>'&&<%=((RoleVO)roleList.get(index)).getF_admin_flag() %>==1) {
	                 	obj.checked=true;
	                 }
	             }
	         <%}
	         }%>
	      }
       }
	   function funload(){
	        var treeFlag="menuTree";
	        executeRequest('eaptree','removeTreeFromSession','remove=true'+'&treeFlag='+treeFlag);
	        //页面离开时将session中的角色权限信息去掉
	        //executeRequest('rolePowerAction','clearSession',null);
	   }
	   /**
	   * 模拟点击radio & 查看权限按钮
	   */
	   function ClickRowBtn(radioID){
	   		var EAPForm = parent.RoleListButton.EAPForm;
	   		
	   		document.getElementById(radioID).click();
	   		EAPForm.bView.click();
	   }
	   /**
	    *单击一行时候选中单选按钮
	    */
	   function doOnClickEvent(kind,roleid,rolename,roledesc){
	   		//alert("workNo="+workNo+" employeeId="+employeeId);
	   		var cb = document.getElementById(roleid);
			cb.checked = "checked";
			radioOnclick(kind,roleid,rolename,roledesc);
	   }
</script>
</head>
<body onLoad="load()" onunload="funload()" >
<%if(roleList==null||roleList.isEmpty()) {%>
	<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
		<tr class="tableTitleTR2">
			<td colspan="4" >
			<table width="100%" border="0" cellpadding="0" cellspacing="0" >
	            <tr>
				<td class="tableTitleLeft2" >&#160;</td>
				<td class="tableTitle2">角色信息&#160;</td>
				<td class="tableTitleRight2" >&#160;</td>
				</tr>
			 </table>
			 </td>
		</tr>
	    <tr> 
	       <td class="formTableL" >&#160;</td>
	       <td class="formTableC" align="center">
				<span style="font-size:20px;color:red;">无符合条件的角色信息</span>
		   </td>
	       <td class="formTableR" >&#160;</td>
	    </tr> 
		<tr> 
		    <td class="formTableLB">&#160;</td>
		    <td class="formTableB">&#160;</td>
		    <td class="formTableRB">&#160;</td>
		</tr>        
	</table>
<%}else{%>
	<ec:table items="roleList" var="role" rowsDisplayed="50" action="<%=action %>" > 
			<ec:row onclick="ClickRowBtn(${role.roleId});doOnClickEvent('${role.f_if_creater}','${role.roleId}','${role.roleName}','${role.desc}');">
			    <ec:column property="recordId" title=" " width="15px">
                 <input type="radio" name="radio" class="radio" id="${role.roleId}" onclick="radioOnclick('${role.f_if_creater}','${role.roleId}','${role.roleName}','${role.desc}')" />
                </ec:column>
				<ec:column property="roleName" title="角色名称"/>
				<ec:column property="if_creater" title="创建" style="text-align:center" width="15px">
				<c:if test="${role.f_if_creater == 0}">
					<input type="checkbox" class="checkbox" disabled="disabled" id="u_${role.roleId}" name="uf_${role.roleId}" value="1" onClick="usebleFlagChangeStat('${role.roleId}')" />
				</c:if>
				<c:if test="${role.f_if_creater == 1}">
					<input type="checkbox" class="checkbox" disabled="disabled" id="u_${role.roleId}" name="uf_${role.roleId}" value="1" onClick="usebleFlagChangeStat('${role.roleId}')" checked="checked" />
				</c:if>
				</ec:column>
				<ec:column property="f_usable_flag" title="使用" style="text-align:center" width="15px">
					<input type="checkbox" class="checkbox" name="usable${role.roleId}" disabled=true/>
				</ec:column>
				<ec:column property="f_admin_flag" title="管理" style="text-align:center" width="15px">
					<input type="checkbox" class="checkbox" name="admin${role.roleId}" disabled=true/>
				</ec:column>
		   </ec:row>		
	</ec:table>
<%}%>
</body>
</html>
