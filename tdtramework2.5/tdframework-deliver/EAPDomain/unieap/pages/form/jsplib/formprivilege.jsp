<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="com.neusoft.unieap.form.manage.util.MessageUtil"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<HTML>
<HEAD>
<TITLE>orgPanel</TITLE>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<meta content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="../css/orgtree.css"/>
<LINK href="<%=request.getContextPath()%>/unieap/pages/form/css/Style2.css" rel=stylesheet>
<LINK href="<%=request.getContextPath()%>/unieap/pages/form/css/Style.css" rel=stylesheet>
<STYLE>
v\:*{behavior:url(#default#VML)}


td.empty_cell{border:none}
td.normal_cell{border:solid black 1px}
td.hidden_cell{border:none;width=0%;}
</STYLE>
<SCRIPT language="javascript" src="../jslib/orgTree.js"></SCRIPT>
<SCRIPT language="javascript" src="../jslib/vmlformmanager.js"></SCRIPT>

</HEAD>
<BODY onload="initorg('orgTreeSelectPanel','orgActorPanel','orgActorPrivilegePanel');init('form_page','label_name','visible','editable','printable','submitable');loadRoleOrg('privilege')">
<xml id="orgtreedata" src="temp/orgtree.xml">
</xml>
<div id="tempdiv" style="display:none"></div>
<DIV id="orgPagePanel" style="position:absolute;top:0;left:15;display:block;width:100%;height:100%;z-index:100;">
<table border="0" cellpadding="0"   cellspacing="0" height="100%">
  <tr>
    <td ><table  cellspacing="0" class="main_title_table">
      <tr>
        <td nowrap class="text_title" ><%=MessageUtil.getString("form.privilege.setformrole",session) %></td>
        <td align="right" class="main_table2_td2">&nbsp;</td>
      </tr>
    </table>
        <table border="0" cellpadding="0" cellspacing="10" class="main_label_outline" height="80%">
          <tr>
            <td valign="top">
           <table cellspacing="0"   class="main_label_table" height="100%">
                <tr height="3%">
                  <td valign="middle" nowrap class="main_label_td" >
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table_base" >
                    <tr>
                      <td nowrap><%=MessageUtil.getString("form.privilege.org",session) %></td>
                      <td align="right" ><span class="main_label_td2">
                        <input name="searchstr" type="text" size="10">
                      </span><img src="../images/search.gif" width="16" height="16" align="absmiddle" onclick="search()"></td>
                      <td width="25" align="right"><img src="../images/refresh.gif" style="cursor:hand" alt='<%=MessageUtil.getString("form.privilege.refresh",session) %>' width="16" height="16" onclick="refreshOrgTree('privilege')"></td>
                    </tr>
                  </table>
                  </td>
                  <td class="main_label_td" valign="middle" nowrap>&nbsp;</td>
                  <td class="main_label_td" valign="middle" nowrap ><%=MessageUtil.getString("form.privilege.formrole",session) %></td>
                </tr>
                <tr height="97%">
                  <td valign="top" nowrap width="40%"><table height="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" class="main_label_outline4">
                    <tr>
                      <td valign="top" bgcolor="#FFFFFF">
                      <DIV  onselectstart="return false" id="orgTreeSelectPanel" style="position:relative;top:0;left:0;width:240;height:100%;border:solid #b9b9b9 1px;overflow:auto" onscroll="clickScroll();return false" >
				        <div  style="font-size:12;">
				           
				           <span onclick="showBranch(this)" id="roleparent" style="vertical-align:middle;text-align:center">
				              <img src="../images/close.gif"/>&#160;&#160;<img src="../images/organise.gif" onclick="event.cancelBubble=true" style="vertical-align:middle;text-align:center"/>
				              <label style="vertical-align:middle;"><bean:message bundle="formResource" key="form.privilege.role"/></label>
				           </span>
				           <span class="branch">
				           </span>
				           <div onclick="showBranch(this)" id="personparent">
				               <img src="../images/close.gif"/>&#160;&#160;<img src="../images/organise.gif" onclick="event.cancelBubble=true" style="vertical-align:middle;text-align:center"/>
				               <label style="vertical-align:middle;text-align:center"><bean:message bundle="formResource" key="form.privilege.person"/></label>
				           </div>
				           <span class="branch">
				           </span>
				       </div>
				      </DIV>
                      </td>
                    </tr>
                  </table></td>
                  <td align="center" valign="middle" nowrap class="main_label_td">
                   <span class="button_td">
                    <input type="button" name="add" value='<%=MessageUtil.getString("form.datasource.add",session) %>' class="button_normal" onclick="addActorNode()">
                    <br>
                    <br>
                   </span>
                   <br>
                   <span class="button_td">
                   <input type="button" name="remove" value='<%=MessageUtil.getString("form.datasource.delete",session) %>' class="button_normal" onclick="deleteActorNode()">
                   </span>
                  </td>
                  <td valign="top" nowrap class="main_label_td"><table height="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td><table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" class="main_label_outline4">
                        <tr>
                          <td valign="top" bgcolor="#FFFFFF">
							<DIV id="orgActorPanel" onselectstart="return false" style="position:relative;top:0;left:0;width:240;height:100%;border:solid #b9b9b9 1px;overflow:auto">
							</DIV>
                          </td>
                        </tr>
                      </table>
                      </td>
                    </tr>
                    <tr>
                      <td height="35" align="right"><table class="button_table" cellspacing="0">
                        <tr align="right">
                          <td class="button_td" ><input type="submit" name="Submit34" value='<%=MessageUtil.getString("form.privilege.new",session) %>' class="button_normal" onclick="newActorNode()">
                          </td>
                          <td class="button_td"><input type="submit" name="Submit" value='<%=MessageUtil.getString("form.privilege.delete",session) %>' class="button_normal" onclick="deleteFormRoleNode()">
                          </td>
                          <td class="button_td"><input type="submit" name="Submit2" value='<%=MessageUtil.getString("form.privilege.modify",session) %>' class="button_normal" onclick="modifyFormRoleNode()"></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table></td>
                </tr>
                
            </table></td>
          </tr>
      </table>
      <table cellspacing="0" class="main_button">
          <tr>
            <td align="right" ><table class="button_table" cellspacing="0">
                <tr align="right">
                  <td class="button_td" ><input type="button" name="next" value='<%=MessageUtil.getString("form.privilege.previous",session) %>' class="button_normal" onclick="history.back(-1)">
                  </td>
                  <td class="button_td" ><input type="button" name="pre" value='<%=MessageUtil.getString("form.privilege.next",session) %>' class="button_normal" onclick="goToFormPagePanel('formpagePanel','orgPagePanel')">
                  </td>
                </tr>
            </table></td>
          </tr>
      </table></td>
  </tr>
</table>
</DIV>
  
<DIV id="formpagePanel" style="position:absolute;top:0;left:15;display:none;width:100%;height:100%;z-index:101;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" height="90%">
 <tr>
  <td valign="top" width="15%" >
    <table  border="0" cellpadding="0" cellspacing="0" width="100%" height="82%">
	  <tr >
	    <td valign="top" style="padding-top:11px;padding-left:4px;">
	    <DIV id="orgActorPrivilegePanel" onselectstart="return false" style="position:relative;width:160px;height:100%;overflow:auto;">
        </DIV>
	    </td>
	  </tr>
	</table>
        
  </td>
  <td valign="top" width="85%" height="100%" style="padding-left:4px;padding-top:20px" class="main_label_table2">
     <table cellspacing="0" cellpadding="0" height="100%">
      <tr>
        <td align="right">
	      <table border="0" cellpadding="0"  cellspacing="0" width="100%">
	        <tr>
	        <td width="65%"  align="left" valign="bottom"> 
	          <div id="page_number"></div>
	        </td>
	        <td width="35%"  align="right" valign="bottom">       
		      <table cellspacing="0">
		          <tr>
		            <td class="main_label_td2" valign="middle" nowrap><img src="../images/left2.gif" id="turnleft" onclick="MyScroll_Change2(-1)" style="cursor:hand;width:20;height:20;visibility:hidden;"/></td>
		            <td class="main_label_td2" valign="middle" nowrap><img src="../images/right2.gif" id="turnright" onclick="MyScroll_Change2(1)" style="cursor:hand;width:20;height:20;visibility:hidden;"/></td>
		            <td class="main_label_td2" valign="middle" nowrap> <input type="checkbox" id="visible" onclick="change_visible(this)" disabled>
		              <%=MessageUtil.getString("form.privilege.visible",session) %><span class="sign_red"></span></td>
		            <td valign="middle" nowrap class="main_label_td2"><input type="checkbox" id="editable" onclick="change_editable(this)" disabled>
		              <%=MessageUtil.getString("form.privilege.editable",session) %></td>
		            <td valign="middle" nowrap class="main_label_td2"><input type="checkbox" id="printable" onclick="change_printable(this)" disabled>
		              <%=MessageUtil.getString("form.privilege.printable",session) %></td>
		            <td valign="middle" nowrap class="main_label_td2"><input type="checkbox" id="submitable" onclick="change_submitable(this)" disabled>
		              <%=MessageUtil.getString("form.privilege.submitable",session) %></td>
		          </tr>
		       </table>
		      </td>  
		      </tr>         
		    </table>
		  </td>
		</tr>
		<tr>
		  <td align="left" height="100%">   
		   	<table border="0" cellpadding="0" cellspacing="0" height="100%">
		    	<tr><td>
					<DIV id="form_page" style="border:solid #b9b9b9 1;height:100%;overflow:auto">
					</DIV>
		    	</td></tr>
		   	</table>
		  </td>
		</tr>
		<tr>
		  <td align="right">  

			<table cellspacing="0" class="main_button">
			  <tr>
			    <td align="right" >
			    <table class="button_table" cellspacing="0">
			      <tr align="right">
			        <td class="button_td"><input type="button" name="datasource" value='<%=MessageUtil.getString("form.privilege.datasource",session) %>' class="button_normal" onclick="setDataSource()"></td>
			        <td class="button_td"><input type="button" name="otherset" value='<%=MessageUtil.getString("form.privilege.otherset",session) %>' class="button_normal" onclick="setOtherAttribute()"></td>
			        <td class="button_td"><input type="button" name="shortcut" value='<%=MessageUtil.getString("form.privilege.shortcut",session) %>' class="button_normal" onclick="setShortCut()"></td>
			        <td class="button_td"><input type="button" name="prev" value='<%=MessageUtil.getString("form.privilege.previous",session) %>' class="button_normal" onclick="history.go(0)"></td>
			        <td class="button_td"><input type="button" name="back" value='<%=MessageUtil.getString("form.privilege.returnback",session) %>' class="button_normal" onclick="history.go(-1)"></td>
			        <td class="button_td"><input type="button" name="ok" value='<%=MessageUtil.getString("form.button.ok",session) %>' class="button_normal" onclick="savePrivilege()"></td>
			      </tr>
			    </table>
			    </td>
			  </tr>
			</table>
	      </td>
	    </tr>
	  </table>  
  </td>
 </tr>
</table> 
</DIV>
</BODY>
</HTML>