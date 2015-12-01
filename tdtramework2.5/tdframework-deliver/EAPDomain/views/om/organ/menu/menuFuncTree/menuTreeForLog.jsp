<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ page import="com.neusoft.om.dao.system.SystemVO" %>
<%@ page import="com.neusoft.om.dao.system.SystemColl" %>
<%@ page import="com.neusoft.om.dao.menu.MenuVO" %>
<%@ page import="com.neusoft.om.dao.menu.MenuColl" %>
<%
	String webpath=request.getContextPath();
	String needCheckBox = (String)request.getAttribute("needCheckBox");
	String message = (String)request.getAttribute("message");
	String roleId = (String)request.getAttribute("roleId");
	String childAccount = (String)request.getAttribute("childAccount");
	SystemColl sysColl = (SystemColl)request.getAttribute("sysColl");
	MenuColl menuColl = (MenuColl)request.getAttribute("menuColl");
%>
<html>
<head>
   <title>权限信息</title>
   <script  language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/treehandle.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/treeAPI.js"> </script>   
   <script  language=javascript src="<%=webpath%>/common/js/tree/fw_menu.js"></script>
   <script  language=javascript src="<%=webpath%>/common/js/tree/fw_menuEvent.js"> </script>
   <script type="text/javascript" src="<%=webpath%>/unieap/js/tab/tabApi.js"></script>
	<script type="text/javascript" src="<%=webpath%>/unieap/js/tab/unieapTab.js"></script>
	<script type="text/javascript" src="<%=webpath%>/views/om/commontree/MzTreeView10.js" ></script>   
   <style>
		A.MzTreeview
		{
		  font-size: 9pt;
		  font-color:#000000;
		  padding-left: 3px;
		  
		}
		</style>
  <script language=javascript> 
   function unload(){
    //alert("a");
   	//removetreefromsession();
   	//alert("b");
   }
   
   function init(){
       var message = document.forms[0].message.value;
       if(message != null && message != '' && message != 'null'){
           alert(message);
       }
       var childAccount = document.forms[0].childAccount.value;
       if(childAccount == 0){
           alert('此角色暂时没有任何权限');
       }
       
   }
   
   function openAll(){
       var treeNode=getNode('menuTree','virtualcatalog');
       alert(treeNode);
   }
   
   function clickMenu(obj1, obj2){
       var nodeId = obj1;
       var nodeName = obj2;
       parent.parent.parent.logquerybanner.document.forms[0].funcmenu.value=nodeId;
       parent.parent.parent.logquerybanner.document.forms[0].funcmenuname.value=nodeName;
   }
   </script>

</head>
<body onload='init()' onunload="unload()">
   <table width="100%" border=0 cellspacing=3 >
      <tr>
        <td>
          <div id=treeviewarea style="background-color: "></div>
          <SCRIPT LANGUAGE="JavaScript">
          
          var tree = new MzTreeView("tree");
		  tree.icons['css'] = 'collection.gif';
	      tree.icons['menu']  = 'book.gif';
		  tree.iconsExpand['menu'] = 'bookopen.gif'; //展开时对应的图片
		  tree.setIconPath('<%=webpath%>/views/om/commontree/'); //可用相对路径
          tree.nodes['-1_1'] = 'text:菜单树';
        <% if(sysColl != null && sysColl.getSystem(0)!= null){ 
        	for(int i=0; i < sysColl.getRowCount(); i++){	        	       
	           	SystemVO vo = sysColl.getSystem(i);
	           	String systemId = vo.getSystemId();
	           	String systemName = vo.getSystemName();
	           	String parentSysId = vo.getParentSystemId();
	           	if(parentSysId == null || parentSysId.equals("")){
	           	%>
	           	tree.nodes['1_<%=systemId%>'] = 'text:<%=systemName%>; data:orgId=<%=systemId%>;icon:organ;method:clickMenu("<%=systemId%>","<%=systemName%>")';
	           	<%
	           	}else{
	           	%>
	           	tree.nodes['<%=parentSysId%>_<%=systemId%>'] = 'text:<%=systemName%>; data:orgId=<%=systemId%>;icon:organ;method:clickMenu("<%=systemId%>","<%=systemName%>")';
	           	<%
	           	}
           	}

          }%>
          <% if(menuColl != null && menuColl.getMenu(0)!= null){ 
        	for(int i=0; i < menuColl.getRowCount(); i++){	        	       
	           	MenuVO vo = menuColl.getMenu(i);
	           	String menuId = vo.getMenuId();
	           	String menuName = vo.getMenuName();
	           	String parentMenuId = vo.getParentMenuId();
	           	String systemId = vo.getSystemId();
	           	if(parentMenuId == null || parentMenuId.equals("")){
	           	%>
	           	tree.nodes['<%=systemId%>_<%=menuId%>'] = 'text:<%=menuName%>; data:orgId=<%=menuId%>;icon:organ;method:clickMenu("<%=menuId%>","<%=menuName%>")';
	           	<%
	           	}else{
	           	%>
	           	tree.nodes['<%=parentMenuId%>_<%=menuId%>'] = 'text:<%=menuName%>; data:orgId=<%=menuId%>;icon:organ;method:clickMenu("<%=menuId%>","<%=menuName%>")';
	           	<%
	           	}
           	}

          }%>
          document.getElementById('treeviewarea').innerHTML = tree.toString();
          </SCRIPT>
        </td>        
      </tr>
      
    </table>
<form> 
<input type='hidden' name='OperType' value=''/>                                             
<input type='hidden' name='message' value='<%=message%>'/>  
<input type='hidden' name='roleId' value='<%=roleId%>'/>  
<input type='hidden' name='childAccount' value='<%=childAccount%>'/> 
<!--  input type='button' name='open' value='全部展开' onClick="openAll()" class="button1" /-->                                                                              
</form>
</body>
</html>