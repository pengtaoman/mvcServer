<%@ page session="true"  contentType="text/html;charset=gb18030"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="com.neusoft.unieap.config.CacheConfig" %>
<%@ page import="com.neusoft.tdframework.admin.cache.common.CacheConst" %>
<%@ page import="com.neusoft.tdframework.memcache.CacheManagerProxy" %>
<%@ page import="com.neusoft.tdframework.admin.cache.common.CacheUtil" %>
<%
	String webpath = request.getContextPath();
    HashMap difMap = (HashMap)request.getAttribute("difMap");
    String mapKey = request.getParameter("mapKey");
    
    StringBuilder sbu = new StringBuilder();
    if (difMap != null) {
    	if (difMap.get(CacheConst.MAP_KEY_DIFF_ERRORMSG) != null) {
    		sbu.append("<script  language=javascript>");
    		sbu.append("alert('").append((String)difMap.get(CacheConst.MAP_KEY_DIFF_ERRORMSG)).append("');");
    		sbu.append("history.back();");
    		sbu.append("</script>");
    		
    	} else {
		    HashMap oldRowMap = (HashMap)difMap.get(CacheConst.MAP_KEY_DIFF_PROPVALUE_OLD);
		    HashMap newRowMap = (HashMap)difMap.get(CacheConst.MAP_KEY_DIFF_PROPVALUE_NEW);
		    
		    ArrayList propNameLst = (ArrayList)difMap.get(CacheConst.MAP_KEY_DIFF_PROPNAME);
		    
		    
		    sbu.append("<table id='ec_table' border='0'   cellspacing='0'  cellpadding='0'  class='tableRegion' width='100%' align=center>");
		    sbu.append("<thead id='ec_table_head'><tr nowrap><td  nowrap class='tableHeader' >序号</td><td  nowrap class='tableHeader' >数据类别</td>");
		    for (String propName : (ArrayList<String>)propNameLst) {
		    	sbu.append("<td class='tableHeader' nowrap>");
		    	sbu.append(propName);
		    	sbu.append("</td>");
		    }
		    //sbu.append("<td nowrap class='tableHeader'>更新缓存</td>");
		    sbu.append("</tr></thead><tbody id='ec_table_body'>");
		   
		    Iterator it = oldRowMap.keySet().iterator();
		    int rowNum = 1;
		    while (it.hasNext()) {
		    	sbu.append("<tr>");
		    	String key = (String)it.next();
		    	sbu.append("<td rowspan=2 class='formField'>");
		    	sbu.append(rowNum++);
		    	sbu.append("</td>");
		    	
		    	ArrayList oldRowList = (ArrayList)oldRowMap.get(key);
		    	ArrayList newRowList = (ArrayList)newRowMap.get(key);
		    	sbu.append("<td class='formField'>缓存");
		    	sbu.append("</td>");
		    	for (String oldPropValue : (ArrayList<String>)oldRowList) {
		        	sbu.append("<td class='formField'>");
		        	sbu.append(oldPropValue);
		        	sbu.append("</td>");
		    	}
		    	//sbu.append("<td rowspan=2 class='formField'><table><tr><td><a href='");
		    	//sbu.append(webpath);
		    	//sbu.append("/cacheObjectManagerAction.do?method=updateCacheFromDB&cacheKey=").append(request.getParameter("cacheKey"));
		    	//sbu.append("&index=");
		    	//sbu.append(key);
		    	//sbu.append("&mapKey=").append(mapKey).append("'>更新</a></td></tr></table></td>");
		    	sbu.append("</tr>");
		    	
		    	sbu.append("<tr>");
		    	sbu.append("<td class='formField'>数据库");
		    	sbu.append("</td>");
		    	for (String newPropValue : (ArrayList<String>)newRowList) {
		        	sbu.append("<td class='formField'>");
		        	sbu.append(newPropValue);
		        	sbu.append("</td>");
		    	}
		    	sbu.append("</tr>");
		    }
		    sbu.append("</tbody></table>");
		    if (rowNum == 1) {
		    	sbu = new StringBuilder("缓存中的数据与数据库中的数据完全一致。");
		    }
    	}
    } else {
		sbu.append("缓存中的数据与数据库中的数据完全一致。");
    }
    
    String tableHTML = sbu.toString();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<title></title>
<contextPath value="<%=webpath%>"/>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
<script  language=javascript src="<%=webpath%>/common/js/eccn.js"> </script>
<script  language=javascript> 
var eccn=new ECCN("ec");
function init(){
	//不使用预读取技术，使用传统方式提交form
	eccn.doPrep=false;
	// 不预读取“前一页”
	eccn.doPrepPrev=false;
	eccn.init();
	}
</script>
</head>
<body class="unieap" onload="init();">
<table><tr><td><font color="blue">缓存KEY：<%=request.getParameter("cacheKey").split(":")[0] %> </font>|</td><td> <font color="blue">缓存类型：<%=request.getParameter("cacheKey").split(":")[1] %>  </font></td>
<%if (mapKey != null && !"".equals(mapKey)) {%>
<td>| <font color="blue">Map KEY：<%=mapKey%>  </font></td>
<%} %></tr></table>
<div id='showDetalDataDIV' class="eXtremeTable"  id="ec_main_content"  style="width:100%;" align=center>
<%=tableHTML%>
</div>


</body>
</html>