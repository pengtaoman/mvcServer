<%@ page contentType="text/xml; charset=gb2312" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.om.dao.menuoperate.MenuOperateVO" %>
<%@ page import="com.neusoft.om.dao.menuoperate.MenuOperateColl" %>
<%@ page import="com.neusoft.tdframework.authorization.AuthorizeVO" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>

<% String path = request.getContextPath();
	
	MenuOperateVO vo = (MenuOperateVO)request.getAttribute("onemenu");
	AuthorizeVO authrizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);

%>

<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/menuoperate/MenuOperate.xsl"?>


<root>
	<create>
	<MenuId><%=vo.getMenuId()%></MenuId>
	<MenuName><%=vo.getMenuName()%></MenuName>
	<SystemId><%=vo.getSystemId()%></SystemId>
	<ModuleId><%=vo.getModuleId()%></ModuleId>
	<MenuType>
			<option>
				<value>0</value>
				<caption>按钮</caption>
			</option>
   			<option>
				<value>1</value>
				<caption>最小子菜单</caption>
			</option>
			<option>
				<value>2</value>
				<caption>菜单</caption>
			</option>
			<selected><%=vo.getMenuType()%></selected>
	</MenuType>
	<OpenMethod>
			<option>
				<value>0</value>
				<caption>在框架中打开</caption>
			</option>
			<option>
				<value>1</value>
				<caption>在新窗口中打开</caption>
			</option>
			<selected><%=vo.getOpenMethod()%></selected>
	</OpenMethod>
	<PageLink><%=vo.getPageLink()%></PageLink>
	<Layer><%=vo.getLayer()%></Layer>
	<Log><%=vo.getLog()%></Log>
	<Order><%=vo.getOrder()%></Order>
	<IfMyWork>
			<option>
				<value>0</value>
				<caption>显示</caption>
			</option>
			<option>
				<value>1</value>
				<caption>不显示</caption>
			</option>
			<selected><%=vo.getIfMyWork()%></selected>
	</IfMyWork>
	<ParentMenuId><%=vo.getParentMenuId()%></ParentMenuId>
	<Inuse>
			<option>
				<value>0</value>
				<caption>停用</caption>
			</option>
			<option>
				<value>1</value>
				<caption>使用中</caption>
			</option>
			<selected><%=vo.getInuse()%></selected>
	
	</Inuse>
	<MenuDesc><%=vo.getMenuDesc()%></MenuDesc>
	<PortalWinId><%=vo.getPortalWinId()%></PortalWinId>
    <path><%=path%></path> 
   </create> 
</root>