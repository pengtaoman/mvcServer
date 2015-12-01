<%
/* JSP程序简要描述信息
**************************************************************
* 程序名	: 行政区域维护
* 建立日期: 
* 作者		: 任辉 ren.hui@neusoft.com
* 模块		: 权限
* 描述		: 权限系统-行政区域维护
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
<%@ page import="com.neusoft.om.dao.area.AreaVO" %>
<%@ page import="com.neusoft.om.dao.area.AreaColl" %>
<%@ page import="com.neusoft.tdframework.authorization.AuthorizeVO" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>

<% String path = request.getContextPath();
	
	AreaVO vo = (AreaVO)request.getAttribute("vo");
	AuthorizeVO authrizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
	String operateAreaLevel = String.valueOf(authrizeVO.getAreaLevel());
	String operateAreaId = authrizeVO.getAreaId();
	String oprFlag = (String)request.getAttribute("OprFlag");
	String areaId = "";
	String parentAreaId = "";
	String areaName = "";
	int areaLevel;
	String postalCode = "";
	String areaCode = "";
	String actMode = "";
	
//actMode = (String)request.getAttribute("Act_mode");
	if(oprFlag != null&&vo != null){
		if(oprFlag.intern() == "0".intern()){
			areaId = vo.getAreaId();
			parentAreaId = vo.getParentAreaId();
			areaLevel = vo.getAreaLevel();
			areaName = vo.getAreaName();
			postalCode = vo.getPostalCode();
			areaCode = vo.getAreaCode();
			
			actMode = (String)request.getAttribute("Act_mode");
		}
	}
	String message = (String)request.getAttribute("Message");
	if(message == null){
		message = "";
	}
%>

<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/area/Area.xsl"?>


<root>
	<create>
		<!--Op_Arealevel,Op_AreaId 应从session中获得-->
		<Op_AreaLevel><%=operateAreaLevel%></Op_AreaLevel>
		<Op_AreaId><%=operateAreaId%></Op_AreaId>
		<Code><%=areaId%></Code>
		<OprFlag><%=oprFlag%></OprFlag>
		<Message><%=message%></Message>
		<Area_id><%=areaId%></Area_id>
		<Area_name><%=areaName%></Area_name>
		<Area_code><%=areaCode%></Area_code>
		<Postal_code><%=postalCode%></Postal_code>
		<Act_mode><%=actMode%></Act_mode>

	<%
       	//获得区域信息
				AreaColl coll= (AreaColl)request.getAttribute("area");
        if(coll!=null){
        	int rowcount = coll.getRowCount();
		    for(int i=0;i<rowcount;i++){
		    	AreaVO areaInfo = coll.getArea(i);
		    	AreaVO nextArea = coll.getArea(i+1);
		    	areaLevel = areaInfo.getAreaLevel();
		    	int nextLevel = 0;
		    	if(nextArea != null)
		    		nextLevel = nextArea.getAreaLevel();
		    	if(areaLevel == 1){
            %>
	<Area_center>
		<%=areaInfo.toString(2)%>
	</Area_center>
    <%
       	    	}else{
       	    		if(areaLevel < nextLevel){%>
     <Area>
     		<If_havesub>1</If_havesub>
				<%=areaInfo.toString(2)%>   
     </Area>
     <%				}
     				else{%>
		<Area>
     	<If_havesub>0</If_havesub>
			<%=areaInfo.toString(2)%>   
    </Area>     			
      <% 	    	}
       	    	}
       	    }
        }%>    			
    <path><%=path%></path> 
   </create> 
</root>
