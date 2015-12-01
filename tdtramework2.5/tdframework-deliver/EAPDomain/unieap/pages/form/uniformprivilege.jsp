<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.form.manage.util.MessageUtil"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<HTML xmlns:mpc>
<HEAD>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<link rel="stylesheet" type="text/css" href="css/orgtree.css"/>
<LINK href="<%=request.getContextPath()%>/unieap/pages/form/css/Style2.css" rel=stylesheet>
<LINK href="<%=request.getContextPath()%>/unieap/pages/form/css/Style.css" rel=stylesheet>
<STYLE>
v\:*{behavior:url(#default#VML)}


td.empty_cell{border:none}
td.normal_cell{border:solid black 1px}
td.hidden_cell{border:none;width=0%;}
</STYLE>

<script language="javascript" src="<%=request.getContextPath()%>/unieap/pages/form/jslib/vmlformmanager.js"></script>
<script language="javascript">

var activityid = "<%=request.getParameter("activityid")%>";
var participants = "<%=request.getParameter("participants")%>";
var formid = "<%=request.getParameter("formid")%>";


function resizes(){

  document.all.form_applet.style.width=parseInt(document.body.clientWidth)-300;
  document.all.form_applet.style.height=parseInt(document.body.clientHeight);

 }


function onload(){


init('form_page','','visible','editable','printable','submitable');
document.all.form_applet.style.visibility='visible';
setFormID(formid);
setPrivilegeID(formid,activityid);
loadForm();

}
function setFormOperators(actparti){
  
  if(actparti!=null&&actparti!=""){
  	setOperators(actparti);
  }
}

function save(){
    var retvalue =  savePolicies();
}
function back(){
  history.go(-1);
}
</script>

</HEAD>

<BODY BGCOLOR="#FFFFFF" ONLOAD="onload()">
  <div id=form_applet style="width:100%;height:100%;position:absolute;visibility:none;margin-left:0;margin-top:5;">
    <table cellspacing="0" cellpadding="0" height="100%" width="100%">
       <tr>
        <td align="right" width="100%">
	       <table border="0" cellpadding="0"  cellspacing="0" width="100%">
	        <tr>
	        <td width="65%"  align="left" valign="bottom"> 
	          <div id="page_number"></div>
	        </td>
	        <td width="35%"  align="right" valign="bottom">       
		      <table cellspacing="0">
		          <tr>
		            <td class="main_label_td2" valign="middle" nowrap><img src="css/images/left2.gif" id="turnleft" onclick="MyScroll_Change2(-1)" style="cursor:hand;width:20;height:20;visibility:hidden;"/></td>
		            <td class="main_label_td2" valign="middle" nowrap><img src="css/images/right2.gif" id="turnright" onclick="MyScroll_Change2(1)" style="cursor:hand;width:20;height:20;visibility:hidden;"/></td>
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
		<tr >
		  <td align="left" height="100%" width="100%"> 
		    
		   	<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
		    	<tr><td width="100%">
		    	    <div style="border:solid #b9b9b9 1;width:100%;height:100%;overflow:auto"> 
					<DIV id="form_page" style="width:100%;height:100%;">
					</DIV>
					</div>
		    	</td></tr>
		   	</table>
		   
		  </td>
		</tr>
		<tr>
		  <td align="right" >  
		  	<table cellspacing="0" class="main_button">
			  <tr>
			    <td align="right" >
			    <table class="button_table" cellspacing="0">
			      <tr align="right">
			        <td class="button_td"><input type="button" name="datasource" value='<%=MessageUtil.getString("form.privilege.datasource",session) %>' class="button_normal" onclick="setDataSource()"></td>
			        <td class="button_td"><input type="button" name="otherset" value='<%=MessageUtil.getString("form.privilege.otherset",session) %>' class="button_normal" onclick="setOtherAttribute()"></td>
			        <td class="button_td"><input type="button" name="shortcut" value='<%=MessageUtil.getString("form.privilege.shortcut",session) %>' class="button_normal" onclick="setShortCut()"></td>
			        <td class="button_td"><input type="button" name="ok" value='<%=MessageUtil.getString("form.button.ok",session) %>' class="button_normal" onclick="save()"></td>
			        <td class="button_td"><input type="button" name="cancel" value='<%=MessageUtil.getString("form.button.close",session) %>' class="button_normal" onclick="javascript:back()"></td>
			      </tr>
			    </table>
			    </td>
			  </tr>
			</table>
		  
	      </td>
	    </tr>
	  </table>  
	  
     </div>	  
     
</BODY>
</HTML>