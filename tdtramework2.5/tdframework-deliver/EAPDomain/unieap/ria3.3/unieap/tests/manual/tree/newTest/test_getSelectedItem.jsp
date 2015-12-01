<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>单元测试</title>
		<script type="text/javascript">
		  function getSelected(){
			  var tree = unieap.byId("lazyTree");
			  tree.getCheckLogic().getSelectedItems(function(items){
                      unieap.debug(items);
				  });
		  }
		  function getStore(){
		  	 var tree = unieap.byId("lazyTree");
		  	 unieap.debug(tree.getBinding().getStore());
		  }
		  function refresh(){
		  	 var tree = unieap.byId("lazyTree");
		  	 tree.getBinding().refresh(tree.getBinding().getRootNodeItem());
		  }
		</script>
	</head>
	<body class="unieap">
	   <p>
	         树现在的复选逻辑是cascade，也就是选中一个节点时会关联其父子节点。在原来的代码中，若选中一个非叶子节点，且此节点的子节点尚未生成，反复调用tree.getCheckLogic().getSelectedItems()方法会出现内存溢出现象。
	   </p>
	   <div dojoType="unieap.tree.Tree" id="lazyTree"   
	     label="UniEAP"  checkLogic = "{model:'cascade'}"
	     loader="{'url':unieap.WEB_APP_NAME+'/getLazyData.do?method=getTrueData'}" 
	     binding = "{id:'UP_TREE_TEST_ID','label':'UP_TREE_TEST_LABEL','parent':'UP_TREE_TEST_PARENTID',query:{name:'UP_TREE_TEST_PARENTID',relation:'=',value:'unieap_ria_tree_id_for_root'}}">
	     </div>
	   <div dojoType="unieap.form.Button" onclick="getSelected" label="test"></div>
	   <div dojoType="unieap.form.Button" onclick="getStore" label="获取DataStore"></div>
	   <div dojoType="unieap.form.Button" onclick="refresh" label="刷新根节点"></div>
	</body>
</html>