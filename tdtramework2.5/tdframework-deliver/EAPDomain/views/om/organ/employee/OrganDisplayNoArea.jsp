<%@ page contentType="text/html;charset=GBK" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.om.dao.organ.OrganColl" %>
<%@ page import="com.neusoft.om.dao.organ.OrganVO" %>
<%@ page import="com.neusoft.om.dao.organdisplay.OrganDisplayColl" %>
<%@ page import="com.neusoft.om.dao.organdisplay.OrganDisplayVO" %>

<% String path = request.getContextPath();
	String message = (String)request.getAttribute("Message");
	String adminType = (String)request.getAttribute("adminType");
	if(message == null){
		message = "";
	}
	OrganColl organColl = (OrganColl)request.getAttribute("organColl");
	String ulp = (String)request.getAttribute("ulp");
%>

<html>
<head>
   <title>组织机构信息</title>
   <script  language=javascript src="<%=path%>/unieap/js/Globals.js"> </script>
   <script  language=javascript src="<%=path%>/unieap/js/treehandle.js"> </script>
   <script  language=javascript src="<%=path%>/unieap/js/Common.js"> </script>
   <script  language=javascript src="<%=path%>/unieap/js/treeAPI.js"> </script>   
   <script  language=javascript src="<%=path%>/common/js/tree/fw_menu.js"></script>
   <script  language=javascript src="<%=path%>/common/js/tree/fw_menuEvent.js"> </script>
   <link_rel="stylesheet_href="<%=path%>/unieap/css/tab/unieapTab.css"_type="text/css">
</link>
<style>
A.MzTreeview
{
  font-size: 9pt;
  font-color:#000000;
  padding-left: 3px;
  
}
</style>
	<script type="text/javascript" src="<%=path%>/unieap/js/tab/tabApi.js"></script>
	<script type="text/javascript" src="<%=path%>/unieap/js/tab/unieapTab.js"></script>
	<script type="text/javascript" src="<%=path%>/views/om/commontree/MzTreeView10.js" ></script>   	

   <script language=javascript>     
   var disabledRadio = '';
   var parentObject = parent.parent.parent;

   function clickOrgan(organId, areaId){
   		var parentForm = parent.parent.parent;
            parentForm.organdisplayhidden.document.myform.CurrentSelectOrganKind.value= "organ";
            parentForm.organdisplayhidden.document.myform.CurrentSelectOrganId.value = organId;
            parentForm.organdisplayhidden.document.myform.CurrentSelectDutyId.value = "";
            parentForm.organdisplayhidden.document.myform.CurrentSelectBelongArea.value = areaId;
            parentForm.organdisplayhidden.document.myform.CurrentSelectDealerId.value = "";            
            parentForm.employeemaintance.location.href = webpath+"/views/om/blank.html";
            parentForm.employeelist.showWaitingBar();
            var webpath = document.getElementById("Path").value;
            parentForm.employeelist.location.href = webpath+"/om/EmployeeQueryAction.do?OrganKind='organ'&BelongArea="+areaId+"&OrganId=" + organId + "&OperType=employeeList";
            parentForm.dealerdisplay.location.href = webpath+"/om/EmployeeQueryAction.do?OrganKind='organ'&BelongArea="+areaId+"&OrganId=" + organId + "&OperType=treeDisplay";

            var adminType = document.getElementById("adminType").value;
            if(adminType != null && adminType != '0'){
            	parentForm.employeebutton.myform.bAdd.disabled = false;
            }
            var ulp  = document.getElementById("ulp").value;
            if(ulp != null && ulp == 'true'){
            	parentForm.employeebutton.myform.bAdd.disabled = true;
            }
        parentForm.employeebutton.showDealerMsg('');
    }
   </script>
</head>

  <body>
    <table width="100%" border=0 cellspacing=3 >
      <tr>
        <td>
          <div id=treeviewarea style="background-color: "></div>
          <SCRIPT LANGUAGE="JavaScript">
          
          var tree = new MzTreeView("tree");
		  tree.icons['css'] = 'collection.gif';
	      tree.icons['organ']  = 'book.gif';
		  tree.iconsExpand['organ'] = 'bookopen.gif'; //展开时对应的图片
		  tree.setIconPath('<%=path%>/views/om/commontree/'); //可用相对路径
          tree.nodes['-1_1'] = 'text:组织机构树';
        <% if(organColl != null && organColl.getOrgan(0)!= null){ 
        	for(int i=0; i < organColl.getRowCount(); i++){	        	       
	           	OrganVO vo = organColl.getOrgan(i);
	           	String organId = vo.getOrganId();
	           	String organName = vo.getOrganName();
	           	String parentOrganId = vo.getParentOrganId();
	           	String areaId = vo.getAreaId();
	           	if(parentOrganId == null || parentOrganId.equals("")){
	           	%>
	           	tree.nodes['1_<%=organId%>'] = 'text:<%=organName%>; data:orgId=<%=organId%>;icon:organ;method:clickOrgan("<%=organId%>","<%=areaId%>")';
	           	<%
	           	}else{
	           	%>
	           	tree.nodes['<%=parentOrganId%>_<%=organId%>'] = 'text:<%=organName%>; data:orgId=<%=organId%>;icon:organ;method:clickOrgan("<%=organId%>","<%=areaId%>")';
	           	<%
	           	}
           	}

          }%>
          document.getElementById('treeviewarea').innerHTML = tree.toString();
          </SCRIPT>
        </td>        
      </tr>
      
    </table>
    <form name="myform" id="myform" action="" method="POST">
			<input type="hidden" name="OperType" value="" />
			<input type="hidden" name="workNo" value="" />
			<INPUT type="hidden" name="employeeId" value="" />
			<input type="hidden" name='Path' value="<%=path %>" />
			<input type="hidden" name="adminType" value="<%=adminType %>"/>
			<input type="hidden" name="ulp" value="<%=ulp %>"/>
		</form>
    
  </body>
