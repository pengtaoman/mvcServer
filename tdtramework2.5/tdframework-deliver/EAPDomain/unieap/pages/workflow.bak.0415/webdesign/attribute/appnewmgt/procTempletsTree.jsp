<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<head>
<title>分类管理</title>
 	<%@include file="css.jsp" %> 
 	<%@include file="ext-js.jsp" %> 
 	<script type="text/javascript">
 	   var contextPath ="<%=request.getContextPath()%>";
 	</script>
 	<link rel="stylesheet" type="text/css" href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/css/appnewmgt/applicationManager.css" />
	<link rel="stylesheet" type="text/css" href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/css/appnewmgt/font.css" /> 
	<link rel="stylesheet" type="text/css" href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css" />
    
    
    <% String addNewNodeText="新增一个节点"; 													//新增一个节      									
       String notNullInputText="带*为必填项";													//带*为必填项
       String categoryNameText="分类名称";													//分类名称
       String categoryTitleText="分类标题";													//分类标题 										
       String tooLongText="输入过长";															//输入过长
	   String longBeyondText="长度超过";														//长度超过
	   String byteLimitText="字节限制";														//字节限制	
      %>
      
      <script>
      var Action_GetCategory='<%=request.getContextPath()%>'+"/appnew.do?method=getCategory";

var CategoryManager_selectedNode;													 //指向当前选择节点的指针
var layout;																			 //树容器的引用
var pTree;															 				 //指向树的指针，供表单新增分类类型以及分类使用
var CategoryManager_pcRoot;															 //指向树根节点的指针，供新增分类类型时，向树插入节点使用
var loadText='读取中';																 //读取中
var errorText='带标记的字段不能为空';													 //带标记的字段不能为空
var categoryTypeText='分类类型';														 //分类类型
var categoryText='分类';															 //分类
var overTimeText='超时失败';															 //超时失败
var alreadlyExistText='已经存在';														 //已经存在
var addSuccessText='添加成功';														 //添加成功
var addFailedText='添加失败';															 //添加失败
var editText='编辑';																	 //编辑
var modifySuccessText='修改成功';														 //修改成功
var modifyFailedText='修改失败';														 //修改失败
var removeSuccessText='删除成功';														 //删除成功
var removeFailedText='删除失败';														 //删除失败
var removeText='删除';																 //删除
var enterText='确定';																 //确定
var dropOpText='取消';																 //取消
var submitText='提交';																 //提交
var closeText='关闭';																 //关闭
var isCategoryTypeText='是分类类型';													 //是分类类型
var isCategoryText='是分类';															 //是分类
var delSubCategoryText='会一同删除其下的子分类，是否继续';								 //会一同删除其下的子分类，是否继续
var isCanNullText='带标记的字段不能为空';												 //带标记的字段不能为空
var categoryManageText='分 类 管 理';													 //分 类 管 理
var remindText='提示';																 //提示
var realRemoveText='真的要删除';														 //真的要删除
var addCategoryText='增加';														 //增加分类
var expandNodeText='展开节点';														 //展开节点
var removeNodeText='删除节点';														 //删除节点
var collapseNodeText='合拢节点';														 //合拢节点
var saveText='保存中';																 //保存中
var tooLongText='输入过长';															 //输入过长
var longBeyondText='长度超过';														 //长度超过
var byteLimitText='字节限制';															 //字节限制
var nameText='名称';																	 //名称
var titleText='标题';																 //标题
var ctree;
var PosX;
var PosY;
var appName="";
var appId="";
Ext.onReady(function(){   
    var tree = Ext.tree;
    CategoryManager_pTree=tree; 
    // turn on quick tips
    Ext.QuickTips.init();

    var cview = Ext.DomHelper.append('tree',
        {cn:[{id:'main-tb'},{id:'cbody'}]}
    );

	var layout = new Ext.BorderLayout('tree', {
        center: {    
            margins:{left:0,right:0,bottom:0,top:0}
        }
    }, 'main-ct');
    layout.beginUpdate();
    layout.batchAdd({
       center : {    
           el: cview,
           autoScroll:true,
           fitToFrame:true,
           resizeEl:'cbody'
       }

    });

    // the categorytype tree
     ctree = new tree.TreePanel('cbody', {
        animate:true,
        loader: new tree.TreeLoader({
        dataUrl:'<%=request.getContextPath()%>/procTempletsTree.do?method=getCategory&op=<%=request.getParameter("op")%>',
        baseParams:{'type':'root','id':'root'}}),
        loadingText: loadText+'...',
        containerScroll: true,
        autoScroll:true,
        fitToFrame:true  
     });
    
    ctree.loader.on("beforeload", function(treeLoader, node) {
    if(node.attributes.type){
    	var typeEncode=encodeURIComponent(node.attributes.type);
    	var category_idEncode=encodeURIComponent(node.attributes.category_id);
    	var category_nameEncode=encodeURIComponent(node.attributes.category_name);
    	treeLoader.baseParams.type = typeEncode;
        treeLoader.baseParams.category_id = category_idEncode;
        treeLoader.baseParams.category_name = category_nameEncode;
        node.id=encodeURIComponent(node.attributes.category_id);
      }
    });   
      

    var	croot = new tree.AsyncTreeNode({
        allowDrag:false,
        allowDrop:true,
        id:'croot',
        text:'流程'
    });
    
    CategoryManager_pcRoot=croot;    //初始化指向根节点的指针 
   //当合拢一个节点时，让此节点成为被选中的节点，使得子节点不能被误编辑
   
    function beforeCollapseHandler(node, deep, anim){		
		node.select();
	}  
    ctree.on('beforecollapse',beforeCollapseHandler);  
 	
    ctree.el.on('keypress', function(e){
        if(e.isNavKeyPress()){
            e.stopEvent();
        }
    });
  
  	ctree.setRootNode(croot);
    ctree.render();
    croot.expand();
 	if(croot.isExpanded()==false){
		croot.expand();
	}
 	ctree.on('click',function(){
  		var parentIdStore;			
  		var sm = ctree.getSelectionModel();	  	 
  		var n = sm.getSelectedNode();
       					CategoryManager_selectedNode=n;		   
        					if(CategoryManager_selectedNode.attributes.type=='resource')
        					{        	
        					    categoryTypeStore=CategoryManager_selectedNode.attributes.text;
        				   		parentIdStore=CategoryManager_selectedNode.attributes.category_id;
        				   		versionName=CategoryManager_selectedNode.attributes.version;	
        				   		appName=categoryTypeStore;
        						appId=parentIdStore;		          					     				   
        					}        		
 });
  ctree.on('load',initTreeChecked);
});
function commitValue(){
				var str="";
				var checkedArrary=[];
				if('create'=='<%=request.getParameter("op")%>')
					checkedArrary=ctree.getChecked();
				else if('modify'=='<%=request.getParameter("op")%>'){
					var treeNode = ctree.getSelectionModel().getSelectedNode();
					if(treeNode!=null)
						checkedArrary.push(treeNode);
				}
				for (i=0;i<checkedArrary.length;i++){
					if(checkedArrary[i].attributes.type=="resource"){
					if('create'=='<%=request.getParameter("op")%>')
						str=str+"["+"流程"+"]"+checkedArrary[i].attributes.text+";"
							+checkedArrary[i].attributes.id+"#"+"2";
					else
						str=str+checkedArrary[i].attributes.text+";"
							+checkedArrary[i].attributes.id+"#"+"2";
					}else{
						if('create'=='<%=request.getParameter("op")%>')
							str=str+"["+"分类"+"]"+checkedArrary[i].attributes.text+";"
							+checkedArrary[i].attributes.id+"#"+"1";
						else
							str=str+checkedArrary[i].attributes.text+";"
								+checkedArrary[i].attributes.id+"#"+"1";		
					}
					if(i!=checkedArrary.length-1){
					str=str+","
					}
				}
				/*
				var checkedArrary=window.opener.document.getElementById("categoryids").options;
				for(j=0;j<checkedArrary.length;j++){
					if(str.indexOf(checkedArrary[j].value.split("#")[0])==-1){
						if(str!=""){
						str=str+","+checkedArrary[j].text+";"+checkedArrary[j].value
						}else{
						str=checkedArrary[j].text+";"+checkedArrary[j].value
						}	
					}
				}*/
				opener.initSelect(str);
				window.close();
}

function initTreeChecked(){
if('create'=='<%=request.getParameter("op")%>'){
	var checkedArrary=window.opener.document.getElementById("categoryids").options;
		for(i=0;i<checkedArrary.length;i++){
			if(ctree.getNodeById(checkedArrary[i].value.split("#")[0])!=null){
			ctree.getNodeById(checkedArrary[i].value.split("#")[0]).attributes.checked=true;
			}
		}
	}
}
      </script> 
</head>
<body>
  <table style="width:220px" class="main_button">
	<tr>
		<td colspan="2" style="height:310px;width:220px;">
        <div id="tree" class="categorytreemanager" style="height:310px;width:220px;overflow:auto;left:0"></div>
        </td>
	</tr>
       <tr>
           <td align="right" style="width:220px">
             <input type="button" value="提交" class="button_small" onclick="commitValue()"/>&nbsp;
             <input type="button" value="取消" class="button_small" onclick="window.close()"/>  
           </td>
       </tr>
  </table> 



</body>
</html>