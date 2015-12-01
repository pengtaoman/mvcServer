<%@ page contentType="text/html;charset=GBK" %>
<%@ page import="com.neusoft.om.dao.area.AreaColl" %>
<%@ page import="com.neusoft.om.dao.area.AreaVO" %>
<%
	String path = request.getContextPath();
	AreaColl areaColl = (AreaColl)request.getAttribute("areaColl");
%>
<html>
<head>
   <title>区域信息</title>
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

   function clickArea(areaId, areaName){
	   window.opener.document.getElementById("AreaId").value =  areaId;
	   window.opener.document.getElementById("areaName").value = areaName;
	   window.close();
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
	      tree.icons['area']  = 'book.gif';
		  tree.iconsExpand['area'] = 'bookopen.gif'; //展开时对应的图片
		  tree.setIconPath('<%=path%>/views/om/commontree/'); //可用相对路径
          tree.nodes['-1_1'] = 'text:区域树';
        <% if(areaColl != null && areaColl.getArea(0)!= null){ 
        	AreaVO vo0 = areaColl.getArea(0);
        	String rootId1 = vo0.getAreaId();
        	String rootName1 = vo0.getAreaName();
        	%>
        	tree.nodes['1_<%=rootId1%>'] = 'text:<%=rootName1%>; data:areaId=<%=rootId1%>;icon:area;method:clickArea("<%=rootId1%>","<%=rootName1%>")';
        	<%
        	for(int i=1; i < areaColl.getRowCount(); i++){	        	       
	           	AreaVO vo = areaColl.getArea(i);
	           	String areaId = vo.getAreaId();
	           	String areaName = vo.getAreaName();
	           	String parentAreaId = vo.getParentAreaId();	           	
	           	%>
	           	tree.nodes['<%=parentAreaId%>_<%=areaId%>'] = 'text:<%=areaName%>; data:areaId=<%=areaId%>;icon:area;method:clickArea("<%=areaId%>","<%=areaName%>")';
	           	<%
	           	}
           	}%>
          document.getElementById('treeviewarea').innerHTML = tree.toString();
          </SCRIPT>
        </td>        
      </tr>
      
    </table>
    <form name="myform" id="myform" action="" method="POST">
			<input type="hidden" name="OperType" value="" />
			<input type="hidden" name='Path' value='<%=path %>'>
		</form>
    
  </body>
  </html>