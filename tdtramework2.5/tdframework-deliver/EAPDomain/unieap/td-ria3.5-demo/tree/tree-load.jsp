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
				 "{id:'1002',label:'广州', parent:'',leaf:false}"+
				 "]";
			 var newRowSet = eval("(" + text + ")");
			 var newtreeStorePart = new unieap.ds.DataStore("tree01",newRowSet);
			 dataCenter.addDataStore(newtreeStorePart);
			 
             function lazyLoad(item) {
            	 
            	 if (item.data["id"] == "1001") {
            		 var text01 = "[{id:'100101',label:'营口',parent:'1001',leaf:true},"+
    				 "{id:'100102',label:'大石桥', parent:'1001',leaf:true},"+
    				 "{id:'100103',label:'熊岳', parent:'1001',leaf:true},"+
    				 "{id:'100104',label:'沈阳', parent:'1001',leaf:false},"+
    				 "{id:'100105',label:'辽阳', parent:'1001',leaf:true}"+
    				 "]";
            		 var treeStorePart = new unieap.ds.DataStore("treeStore",dojo.fromJson(text01));
            		 return treeStorePart;
            	 } else if (item.data["id"] == "1002") {
            		 var text02 = "[{id:'100201',label:'珠海',parent:'1002',leaf:true},"+
    				 "{id:'100202',label:'汕头', parent:'1002',leaf:true},"+
    				 "{id:'100203',label:'湛江', parent:'1002',leaf:true},"+
    				 "{id:'100204',label:'佛山', parent:'1002',leaf:true},"+
    				 "{id:'100205',label:'东莞', parent:'1002',leaf:true}"+
    				 "]";
            		 var treeStorePart02 = new unieap.ds.DataStore("treeStore02",dojo.fromJson(text02));
            		 return treeStorePart02;
            	 } else {
            		 alert(item.data["id"] + " 没有子项目.");
            	 }
             }
			 

		</script>
		
	</head>
<body class="unieap">
		 <div dojoType='unieap.tree.Tree' label="地市" loader="{'getLocalData':lazyLoad}"  style='height:200px;width:400px;overflow-x:hidden;overflow-y:auto' id='menuNaviTree' " binding="{'leaf':'leaf','id':'id','store':'tree01','label':'label','parent':'parent',query:{name:'parent',relation:'=',value:''}}"></div>
          <div dojoType="unieap.layout.TitlePane" flexible="false" width="400px" height="200px" title="加载方式">
                                          采用懒加载的实现方式。
         </div>
</body>
</html>	
	