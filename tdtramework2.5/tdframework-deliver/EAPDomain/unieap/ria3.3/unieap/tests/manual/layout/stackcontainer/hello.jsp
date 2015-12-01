<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>HBox测试</title>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
</head>

<script type="text/javascript">
	
	function add(){
		var table=dojo.byId('box'),
			index=table.getElementsByTagName("tr").length;
		var row=dojo.isIE?table.insertRow():table.insertRow(-1);
		row.insertCell(0).innerHTML="哈哈"+index;
		row.insertCell(1).innerHTML="呵呵"+index;
		
		unieap.byId('adaptcontainer').notifyResize();
		
	}
	
	function del(){
		var table=dojo.byId('box'),
			index=table.getElementsByTagName("tr").length;
		table.deleteRow(index-1);
		unieap.byId('adaptcontainer').notifyResize();
	}
	
</script>
<body class="unieap">
	传来的值为:<% out.println(request.getParameter("name"));%>
	传来的值为:<% out.println(request.getParameter("age"));%>
    <div  dojoType="unieap.layout.AdaptiveContainer"  id="adaptcontainer" height="94%" width="auto">
    	<div dojoType="unieap.layout.AdaptivePane">
			<table style='width:100%;border:1px solid red;table-layout:fixed' id='box' border="1">
				<colgroup>
					<col width="50%"></col>
					<col width="50%"></col>
				</colgroup>
				<tbody>
					<tr>
						<td>测试</td>
						<td>测试</td>
					</tr>
				</tbody>
			</table>
    	</div>
    	<div dojoType="unieap.layout.AdaptivePane" autoHeight=true>
    		<div dojoType="unieap.grid.Grid" width="auto" height="100%">
    			<header>
    				<cell label="OK" width="50%"></cell>
					<cell label="OK" width="50%"></cell>
    			</header>
    		</div>
    	</div>
    </div>
	
	<button onclick="add()">增加一条</button>
	<button onclick="del()">删除一条</button>
</body>
</html>