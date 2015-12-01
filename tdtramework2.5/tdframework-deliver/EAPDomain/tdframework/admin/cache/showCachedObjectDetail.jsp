<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.lang.reflect.*" %>
<%@ page import="com.neusoft.unieap.config.CacheConfig" %>
<%@ page import="com.neusoft.tdframework.admin.cache.common.CacheConst" %>
<%@ page import="com.neusoft.tdframework.memcache.CacheManagerProxy" %>
<%@ page import="com.neusoft.tdframework.admin.cache.common.CacheUtil" %>
<%

	String webpath=request.getContextPath();
	String userName=request.getParameter("username");
	String password=request.getParameter("password");
	
	ArrayList methodNames = (ArrayList)request.getAttribute("methodNames");
	ArrayList valueRows = (ArrayList)request.getAttribute("valueRows");
	
	String cacheKey = (String)request.getAttribute("cacheKey");
	
	String isReloadAble = (String)request.getAttribute("isReloadAble");
	String isUpdateDBAble = (String)request.getAttribute("isUpdateDBAble");
	String mapKey = (String)request.getAttribute("mapKey");
	
	String updateDataError = (String)request.getAttribute("updataError");
	if (updateDataError != null && !"".equals(updateDataError)) {
		out.println("<script  language=javascript > alert('"+ updateDataError +"');</script>");
	}
%>
<html>
<head>
<title>缓存对象管理</title>
<contextPath value="<%=webpath%>"/>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<title>Catch Manage</title>
<!-- 禁止 windows 主题风格ss -->
<meta http-equiv="MSThemeCompatible" content="no" />
<!-- 禁止缓存 headers -->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />
<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
<script  language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
<script  language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
<script  language=javascript src="<%=webpath%>/common/js/prototypeajax.js"> </script>
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
	
function checkValues(){
    var ifHaveChoose = false;
	var allElements = document.body.getElementsByTagName("INPUT");
	for (var i = 0; i < allElements.length; i++) {
		var e = allElements[i];
		if (e.type == 'checkbox') {
			if (e.checked == true) {
			    i = allElements.length;
				ifHaveChoose = true;
			} 
		}
	}
	if (ifHaveChoose == false){
		alert("请选择你要操作的记录！");
	}
	return ifHaveChoose;
}

function validCachedObjectAll(){
	if(checkValues()){

	    //alert("catchManager()" + document.getElementById("chkbx_user").SelectedItem.length);
	    //document.forms[0].action = "cacheObjectManagerAction.do?method=getCacheObjectList&nav="+(Math.random()*100000) + "&upvalidall="+valid;	    	
		document.forms[0].submit();
		
	}
}
function validCachedObjectAllNochk(){
	    //alert("catchManager()" + document.getElementById("chkbx_user").SelectedItem.length);
	    //document.forms[0].action = "cacheObjectManagerAction.do?method=getCacheObjectList&nav="+(Math.random()*100000) + "&upvalidall="+valid;	    	
		document.forms[0].submit();
}
</script>
</head>

<body class="mainBody"  onload="init();">
<table><tr><td><font color="blue">缓存KEY：<%=request.getParameter("cacheKey").split(":")[0] %> </font>|</td><td> <font color="blue">缓存类型：<%=request.getParameter("cacheKey").split(":")[1] %>  </font></td>
<%if (mapKey != null && !"".equals(mapKey)) {%>
<td>| <font color="blue">Map KEY：<%=mapKey%>  </font></td>
<%} %></tr></table>
<form name="ec" action="cacheObjectManagerAction.do?method=invalidateSubObj&cacheKey=<%=cacheKey%>" method="post"  maxRowsExported="5000"  minColWidth="35"  style="visibility :hidden;">
<div class="eXtremeTable"  id="ec_main_content"  style="width:100%;" >

      <table  id="ec_table" border="0"  cellspacing="0"  cellpadding="0"  class="tableRegion"  width="100%"  >
          <thead id="ec_table_head" >
          <tr>
          <% 
             if (methodNames != null) {
            	 StringBuilder sbu = new StringBuilder();
            	 if ("1".equals(isReloadAble)) {
            		 //sbu.append("<td width=15 class=\"tableHeader\"><input type='checkbox' title='全选/全消' class='checkbox' onclick=\"ECSideUtil.checkAll('ec','chkbx_sub',this)\" /></td>");
            	 }
            	 sbu.append("<td class=\"tableHeader\">序号</td>");
            	 
            	 for (int i = 0; i < methodNames.size(); i++) {
				     String mName = (String)methodNames.get(i);
            		 sbu.append("<td class=\"tableHeader\">").append(mName).append("</td>");
            	 }
            	 
            	 if ("1".equals(isReloadAble)) {
            	     sbu.append("<td class=\"tableHeader\">编辑</td>");
            	 }
            	 out.println(sbu.toString());
             }
          %>
          </tr>
          </thead>
          <tbody id="ec_table_body" >
          <% 
             if (valueRows != null) {
            	 
            	 StringBuilder sbuv = new StringBuilder();
            	 for (int i = 0; i < valueRows.size(); i++) {
            		  sbuv.append("<tr class=\"even \"  onclick=\"ECSideUtil.selectRow('ec',this);\"   >");
            		  if ("1".equals(isReloadAble)) {
            	          //sbuv.append("<td width=15><input type='checkbox' name='chkbx_sub'  class='checkbox' value='");
           		          //sbuv.append(i);
           		          //sbuv.append("'  null />");
           		          //sbuv.append("</td>");
            		  }       
            		 
       		         sbuv.append("<td>");
       		         sbuv.append(i+1);
       		         sbuv.append("</td>");
            		 
            		 ArrayList values = (ArrayList)valueRows.get(i);
            		 for (int j = 0; j < values.size(); j++) {
					     String value = (String)values.get(j);
            			 sbuv.append("<td>").append(value).append("</td>");
            		 }
            		 if ("1".equals(isReloadAble)) {
	            		 sbuv.append("<td nowrap><table><tr>");
	            		 /**/
	            		 sbuv.append("<td><a href='cacheObjectManagerAction.do?method=invalidateSubObj&index=");
	            		 sbuv.append(i);
	            		 sbuv.append("&cacheKey=");
	            		 sbuv.append(cacheKey);
	            		 sbuv.append("&isDetailReloadAble=1&mapKey=");
	            		 sbuv.append(mapKey);
	            	     sbuv.append("'>无效</a></td>");
	            	     
	            	     if ("1".equals(isUpdateDBAble)) {
		            		 sbuv.append("<td><a href='cacheObjectManagerAction.do?method=showDetailForUpdate&index=");
		            		 sbuv.append(i);
		            		 sbuv.append("&cacheKey=");
		            		 sbuv.append(cacheKey);
		            		 sbuv.append("&isDetailReloadAble=1&mapKey=");
		            		 sbuv.append(mapKey);
		            	     sbuv.append("'>编辑</td>");
	            	     }
	            	     sbuv.append("</tr></table></td>");
            		 }
            		 sbuv.append("</tr></tbody>");
            	 }
            	 out.println(sbuv.toString());
            	 
             }
          %>
      </table>
      
       <% 
       out.println("<input type='hidden' name='mapKey' value='"+mapKey+"'>");
       if (valueRows != null) { 
           if ("1".equals(isReloadAble)) {
        	   out.println("<input type='hidden' name='isDetailReloadAble' value='1'>");
    	   } else {
    		   out.println("<input type='hidden' name='isDetailReloadAble' value='0'>");
    	   }
       %>
      <table border="0"  cellspacing="0"  cellpadding="0"  class="tableRegion"  width="100%" >
	     <%if ("1".equals(isReloadAble)) {%>
         <!--  <tr><td align=center><button type="button" class="formButton" onclick="validCachedObjectAll()"  >  无  效   </button></td></tr>-->
		 <%
		 } else {
		 %>
		 <!--<tr><td align=center><button type="button" class="formButton" onclick="validCachedObjectAllNochk()"  >  无  效   </button></td></tr>-->
		 <%
		 }
		 %>
      </table>
      <%} else { %>
      <table border="0"  cellspacing="0"  cellpadding="0"  class="tableRegion"  width="100%" >
         <tr><td>没有有效数据。</td></tr>
      </table>
      <%} %>
      </form>
      </div>
  </body>
</html>
