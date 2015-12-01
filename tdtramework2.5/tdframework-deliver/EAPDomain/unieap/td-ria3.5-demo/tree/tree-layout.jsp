<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
				var text = "[{id:'1001',label:'辽宁',parent:'',leaf:false},"+
		        "{id:'10011',label:'沈阳',parent:'1001',leaf:true},"+
				 "{id:'10013',label:'大连',parent:'1001',leaf:true},"+
				 "{id:'10014',label:'鞍山',parent:'1001',leaf:true},"+
				 "{id:'10015',label:'盘锦',parent:'1001',leaf:true},"+
				 "{id:'10016',label:'锦州',parent:'1001',leaf:true},"+
				 "{id:'10017',label:'营口',parent:'1001',leaf:true},"+
				 "{id:'10018',label:'大石桥',parent:'1001',leaf:true},"+
				 "{id:'10019',label:'熊岳',parent:'1001',leaf:true},"+
				 "{id:'10020',label:'盖县',parent:'1001',leaf:true},"+
				 "{id:'1002',label:'广州', parent:'',leaf:false},"+
				 "{id:'1003',label:'深圳', parent:'1002',leaf:true}]";
			 var newRowSet = eval("(" + text + ")");
			 var newtreeStorePart = new unieap.ds.DataStore("tree01",newRowSet);
			 dataCenter.addDataStore(newtreeStorePart);
			 


		</script>
		
	</head>
<body class="unieap">
         带有复选框的树，选择父节点，则子节点自动选择
		 <div dojoType='unieap.tree.Tree' label="地市" checkLogic="{model:'halfChecked'}" style='height:200px;width:400px;overflow-x:hidden;overflow-y:auto' id='menuNaviTree' " binding="{'leaf':'leaf','id':'id','store':'tree01','label':'label','parent':'parent',query:{name:'parent',relation:'=',value:''}}"></div>

</body>
</html>	
	