<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
			var text = "[{'id':'1001','label':'辽宁','parent':'','leaf':false,'desc':'shenyang00000001','location':'A45B78'},"+
	        "{'id':'10011','label':'沈阳','parent':'1001','leaf':true,'desc':'shenyang00000001','location':'A45B78'},"+
			 "{'id':'10013','label':'大连','parent':'1001','leaf':true,'desc':'dalian00000001','location':'A00B78'},"+
			 "{'id':'10014','label':'鞍山','parent':'1001','leaf':true,'desc':'anshang00000001','location':'A45B00'},"+
			 "{'id':'10015','label':'盘锦','parent':'1001','leaf':true,'desc':'panjin00000001','location':'002B78'},"+
			 "{'id':'10016','label':'锦州','parent':'1001','leaf':true,'desc':'jinzhou00000001','location':'98B78'},"+
			 "{'id':'10017','label':'营口','parent':'1001','leaf':true,'desc':'yingkou00000001','location':'001002'},"+
			 "{'id':'10018','label':'大石桥','parent':'1001','leaf':true,'desc':'dashiqiao00000001','location':'555666'},"+
			 "{'id':'10019','label':'熊岳','parent':'1001','leaf':true,'desc':'xiongyue00000001','location':'113322'},"+
			 "{'id':'10020','label':'盖县','parent':'1001','leaf':true,'desc':'gaixian00000001','location':'991457'},"+
			 "{'id':'1002','label':'广州', 'parent':'','leaf':false,'desc':'shenyang00000001','location':'A45B78'},"+
			 "{'id':'1003','label':'深圳', 'parent':'1002','leaf':true,'desc':'shenzhen00000001','location':'Q45B78'}]";
			
		 var newRowSet = eval("(" + text + ")");
		 var newtreeStorePart = new unieap.ds.DataStore("tree01",newRowSet);
		 dataCenter.addDataStore(newtreeStorePart);
		
		</script>
		
	</head>
<body class="unieap">
<div dojoType="unieap.layout.TitlePane" width="1000px" height="480px" title="">
   <font color="red">复选框父子节点关系没有体现，xgrid不支持，懒加载实现方式没有接口(基础软件后续提供)</font>
    <div id="grid" jsId="grid" dojoType="unieap.grid.Grid" width="100%" height="420px"
			binding="{store:'tree01'}" views="{rowNumber:true}" rows="{defaultRowHeight:25}"
			tree="{id:'id',parent:'parent'}" selection="{selectType:'multiple'}">
			<header>
				<cell width="250px" label="名称" name="label"></cell>
				<cell width="150px" label="id" name="id"></cell>
				<cell width="150px" label="parent" name="parent"></cell>
				<cell width="250px" label="位置" name="location"></cell>
				<cell width="150px" label="类型" name="desc"></cell>
			</header>
			<toolbar></toolbar>
		</div>
</div>
</body>
</html>	
	