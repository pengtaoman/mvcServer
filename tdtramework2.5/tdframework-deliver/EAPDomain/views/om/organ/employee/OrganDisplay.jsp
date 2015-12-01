<%
/* JSP程序简要描述信息
**************************************************************
* 程序名	: 操作员查询页面-组织机构树
* 建立日期: 
* 作者		: 任辉 ren.hui@neusoft.com
* 模块		: 权限
* 描述		: 权限系统-组织机构树
* 备注		: 
* ------------------------------------------------------------
* 修改历史
* 序号		日期		修改人			修改原因
* 1
* 2
**************************************************************
*/
%>
<%@ page contentType="text/xml; charset=gb2312" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.om.dao.organdisplay.OrganDisplayColl" %>
<%@ page import="com.neusoft.om.dao.organdisplay.OrganDisplayVO" %>

<% String path = request.getContextPath();
	String message = (String)request.getAttribute("Message");
	String adminType = (String)request.getAttribute("adminType");
	if(message == null){
		message = "";
	}
	String ulp = (String)request.getAttribute("ulp");
%>

<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/employee/OrganDisplay.xsl"?>

<root>
	<create>
		<Message><%=message%></Message>
	<%
       	//获得组织机构信息
		OrganDisplayColl organDisplayColl = (OrganDisplayColl)request.getAttribute("OrganDisplayColl");
        if(organDisplayColl!=null){
        	int rowcount = organDisplayColl.getRowCount();
		    for(int i=0;i<rowcount;i++){
		    	OrganDisplayVO vo = organDisplayColl.getOrganDisplay(i);
		    	OrganDisplayVO nextvo = organDisplayColl.getOrganDisplay(i+1);
		    	int organLevel = vo.getOrganLevel();
		    	int nextLevel = 0;
		    	if(nextvo != null)
		    		nextLevel = nextvo.getOrganLevel();
		    	if(organLevel == 1){
            %>
	<OrganCenter>
		<%=vo.toString(2)%>
	</OrganCenter>
    <%
       	    	}else{
       	    		if(organLevel < nextLevel){%>
     <OrganInfo>
     		<If_havesub>1</If_havesub>
				<%=vo.toString(2)%>
     </OrganInfo>
     <%				}
     				else{%>
		<OrganInfo>
     	<If_havesub>0</If_havesub>
				<%=vo.toString(2)%>
    </OrganInfo>     			
      <% 	    	}
       	    	}
       	    }
        }%>    			
    <path><%=path%></path> 
    <adminType><%=adminType%></adminType> 
    <ulp><%=ulp%></ulp>
   </create> 
</root>
