<%@ page contentType="text/html; charset=GB18030" %>
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
	
	String jsonStr = (String)request.getAttribute("jsonStr");
	
	String cacheKey = (String)request.getAttribute("cacheKey");
	String index = (String)request.getAttribute("index");
	String mapKey = (String)request.getAttribute("mapKey");
%>
<html>
<head>
<title></title>
<contextPath value="<%=webpath%>"/>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
<script  language=javascript src="<%=webpath%>/common/js/eccn.js"> </script>
<script  language=javascript> 
function init(){
	
	var jspJson = '<%=jsonStr%>';
	var jsonStrJS = eval("(" + jspJson + ")");
	
	var detailTable = '<table id="ec_table" border="0"   cellspacing="0"  cellpadding="0"  class="tableRegion"  width="80%" align=center>';
	detailTable = detailTable + '<thead id="ec_table_head" >';
	detailTable = detailTable + '<tr><td class="tableHeader" >对象属性名</td><td class="tableHeader" >对象属性值</td></tr></thead><tbody id="ec_table_body" >';
	for (var key in jsonStrJS[0]) {
		var kValue = jsonStrJS[0][key];
		var kValueArr = (String(kValue)).split('<%=CacheConst.CACHE_SPEC_SEP%>');
		var kInputText = "";
	        
	    if (kValueArr.length > 1 && kValueArr[0] == '<%=CacheConst.CACHE_COMPLEX_DATA_AD%>') {
	    	
	    	kInputText = kValueArr[1];
	    	
	    } else if (kValueArr.length > 1) {
	    	
        	kInputText = '<div dojoType="unieap.form.DateTextBox" value="' 
        	    +kValueArr[0]
        	    + '" width=125 name="'
        	    + key
        	    +'" displayFormatter="{dataFormat:\'yyyy-MM-dd\'}" valueFormatter="{dataFormat:\'yyyy-MM-dd\'}"></div>';
        } else {
        	
        	if (typeof(kValue) == 'object') {
        		kInputText = '其他复杂数据类型';
        		
        	} else {
        	
	        	kInputText = "<input type=text name='"
	    	        + key
	    	        +"' value='"
	    	        + kValueArr[0] 
	    	        +"' class='textType'/>";
        	}
    	        
        }
	    
		detailTable = detailTable 
		        + "<tr><td>" 
		        + key 
		        + "</td><td class=\"formField\">"
		        + kInputText
                + "</td></tr>";
		
	}
	detailTable = detailTable + "</tbody></table>";
	document.getElementById('showDetalDataDIV').innerHTML = detailTable;
}
	
function allPrpos(obj) { 
    // 用来保存所有的属性名称和值 
    var props = ""; 
    // 开始遍历 
    for(var p in obj){  
        // 方法 
        if(typeof(obj[p])=="function"){  
            obj[p](); 
        }else{  
            // p 为属性名称，obj[p]为对应属性的值 
            props+= p + "=" + obj[p] + "       "; 
        }  
    }  
    // 最后显示所有的属性 
    alert( props);
}
</script>

</head>

<body class="unieap" onload="init();">
      <form name="ec" action="cacheObjectManagerAction.do?method=updateDBFromCache" method="post">
      <div id='showDetalDataDIV' class="eXtremeTable"  id="ec_main_content"  style="width:100%;" align=center></div>
      <input type=hidden name="cacheKey" value="<%=cacheKey %>">
      <input type=hidden name="mapKey" value="<%=mapKey %>">
      <input type=hidden name="index" value="<%=index %>">
      <br>
      <table border="0"  cellspacing="0"  cellpadding="0"  class="tableRegion"  width="100%" >
         <tr><td align=center><input type='submit' class="formButton" value="更新数据库 "></td></tr>
      </table>
      </form>
  </body>
</html>
