<%@ page contentType="text/html; charset=UTF-8" import="com.neusoft.uniflow.web.common.trees.beans.NWMenuTreeNode,java.util.List"%>
<%
 String pageId = (String)request.getAttribute("pageId"); 

 String actionBase = request.getContextPath() + "/";
 NWMenuTreeNode tree = (NWMenuTreeNode)request.getAttribute("listtree");
 String picBase = (String)request.getAttribute("picBase");
 if(tree==null || picBase==null) {out.print("无法打开本级菜单。");return;}
 %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><%=tree.getName()%></title>
<link href="<%=picBase%>style09.css" rel="stylesheet" type="text/css" />
<script language="javascript">var pageId="<%=pageId%>";</script>
<script language="javascript" src="<%=picBase%>2levelMenuShared.js"></script>
</head>

<body>
<table width="80%" border="0" cellspacing="0" cellpadding="0" align="center">
  <tr>
    <td><img src="<%=picBase%><%=tree.getTitlePic()%>" width="150" height="36" /></td>
  </tr>
  <tr>
    <td id="menuTitleToInstructionSeprator"></td>
  </tr>
  <tr>
    <td class="funInstruction"><%=tree.getInstruction()%></td>
  </tr>
  <tr>
    <td id="menuHeadToContentSeprator"></td>
  </tr>
  <tr>
  	<td>
	<%  List _2levelMenus = tree.getLeaves();
		int len = _2levelMenus.size();
		if(len>0)
		{
			for(int i=0;i<len;i++)
			{
				NWMenuTreeNode _2levelMenu = (NWMenuTreeNode)_2levelMenus.get(i);
	 %>
				<div id="menuItemContainer">
					<div id="menuItem">
						<div id="itemIcon">
	<%					if(_2levelMenu.getIcon().length()>0)
						{
	 %>
							<img src="<%=picBase%><%=_2levelMenu.getIcon()%>" width="54" height="54" border="0"/>
	<%					
						}
	 %>
						</div>
						<div id="itemText">
	<%					if(_2levelMenu.getAction().length()>0)
						{
	 %>
						<a href="javascript:goToURL('<%=actionBase%><%=_2levelMenu.getAction()%>')"><%=_2levelMenu.getName() %></a>
	 <%
	 					}
						else
						{
							out.print(_2levelMenu.getName());
						}
	
						if(!_2levelMenu.isLeaf())
						{
							List _3levelMenus = _2levelMenu.getLeaves();
							int slen = _3levelMenus.size();
							out.print("&nbsp;|&nbsp;");
							for(int j=0;j<slen;j++)
							{
								NWMenuTreeNode _3levelMenu = (NWMenuTreeNode)_3levelMenus.get(j);
								if(_3levelMenu.getAction().length()>0)
								{
	  %>
									<a href="javascript:goToURL('<%=actionBase%><%=_3levelMenu.getAction()%>')"><%=_3levelMenu.getName() %></a>&nbsp;
	 <%
								}
								else
								{
									out.print(_3levelMenu.getName() + "&nbsp;");
								}
							}
						}
	  %>				
						</div>
						<div id="itemRemark"><%=_2levelMenu.getInstruction()%></div>
					</div>
				</div>
	 <% 		if(i<len-1)
	   		{
	  %>
					<div id="menuItemSeprator"></div>
     <%		} 
      		}	
		}
	 %>
	</td>
  </tr>
</table>
</body>
</html>
