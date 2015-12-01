<%@ page contentType="text/xml; charset=gb2312" %>
<%@ page import="com.neusoft.popedom.*"%>
<%@ page import="com.neusoft.common.*"%>
<%@ taglib uri="/WEB-INF/tld/popedom.tld" prefix="cust" %>
   
<%
	//if(!SysMaint.checkPage(session,40,"EE")) return;
%>

<%
	String path = request.getContextPath();
	String errorMessage = (String)request.getAttribute("errorMessage");
	if(errorMessage==null){
		errorMessage="";
	}
	String selected = (String)request.getAttribute("selected");
	ParamObjectCollection tableCol = (ParamObjectCollection)session.getAttribute("tableObjCol");
	
	String if_city = "false";
	if(request.getAttribute("if_city")!=null)
		if_city = ((String)request.getAttribute("if_city")).trim();
	String op_citylevel = "";
	String op_citycode = "";
	try{
		Integer citylevel = (Integer)session.getAttribute("CityLevel");
		op_citylevel = String.valueOf(citylevel);
		op_citycode = (String)session.getAttribute("CityCode");
	}catch(Exception ex){
		ex.printStackTrace();
	}
	%>
<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/employee/AccountParam.xsl"?>
<root>
	<if_city><%=if_city%></if_city>
	<cust:CommonList paramId="0"  ifAll="0" paramObjectCollection="<%=tableCol%>" tagName="tableCol" tabs="2" />
	<TableSelected><%=selected%></TableSelected>
	
	<%if(if_city.intern() == "true".intern()){
       	//获得区域信息
		CityCollection cityColl= (CityCollection)request.getAttribute("CityColl");
        if(cityColl!=null){
        	int rowcount = cityColl.getRowCount();
		    for(int i=0;i<rowcount;i++){
		    	City cityInfo = cityColl.getCity(i);
		    	City nextCity = cityColl.getCity(i+1);
		    	int cityLevel = cityInfo.getCity_level();
		    	int nextLevel = 0;
		    	if(nextCity != null)
		    		nextLevel = nextCity.getCity_level();
		    	if(cityLevel == 1){
            %>
    <city_info>
    	<Op_citylevel><%=op_citylevel%></Op_citylevel>
		<Op_citycode><%=op_citycode%></Op_citycode>
		<City_center>
<%=cityInfo.toString(4)%>
		</City_center>
    <%
       	    	}else{
       	    		if(cityLevel < nextLevel){%>
     	<City>
     		<If_havesub>1</If_havesub>
<%=cityInfo.toString(4)%>   
     	</City>
     <%				}
     				else{%>
		<City>
     		<If_havesub>0</If_havesub>
<%=cityInfo.toString(4)%>   
    	</City>     			
      <% 	    	}
       	    	}
       	    }%>
    </city_info>
        <%}
	    }else{
		    ParamPowerInfoCollection allInfoCol = (ParamPowerInfoCollection)session.getAttribute("allInfoCol");
			String checked = "true";
			ParamPowerInfo info = null;
		    for ( int i = 0; i < allInfoCol.getRowCount(); i++){
				info = allInfoCol.getParamPowerInfo(i);
				if(info.getCheck_option() == 0) checked="false";	
%>
	<ParamTable>
		<%=info.toString(2)%>
		<Index><%=i%></Index>
		<checked><%= checked%></checked>
	</ParamTable>

<%
        	checked = "true";
    		}
    	}
%>

    <ErrorMessage><%= errorMessage%></ErrorMessage>
    <cust:DisabledButtonList session="<%=request.getSession()%>" system_id="40" function_string="FCB" />

</root>
