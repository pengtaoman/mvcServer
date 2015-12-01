/* AUTHOR: YUHAO
 * CREATION DATE:2008-02-27
 * WORKFILE:categoryManager.js
 * DESCRIPTION: Javascrpt file for categoryManager.jsp.It is build up  Ext 1.1.1.
 * Copyright: ? 2008 东软 基础软件事业部版权所有
 
 *  */
var path=document.getElementById("path").value
var Action_GetCategory=path+"/appnew.do?method=getCategory";

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

var PosX;
var PosY;


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
    var ctree = new tree.TreePanel('cbody', {
        animate:true,
        loader: new tree.TreeLoader({
        dataUrl:Action_GetCategory,
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
      }
    });   
      

    var croot = new tree.AsyncTreeNode({
        allowDrag:false,
        allowDrop:true,
        id:'croot',
        text:'应用程序分类',
        cls:'croot'		
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
 	
  	ctree.on('click',function(){
  	//	PosX=window.event.x+10;
  	//	PosY=window.event.y+80;
  		var parentIdStore;			
  		var sm = ctree.getSelectionModel();	  	 
  		var n = sm.getSelectedNode();
  		
       						 CategoryManager_selectedNode=n;	
        				   
        					if(CategoryManager_selectedNode.attributes.type=='category')
        					{        	
        					    categoryTypeStore=CategoryManager_selectedNode.attributes.type;
        				   		parentIdStore=CategoryManager_selectedNode.attributes.category_id;				          					     				   
        					}        		
        					else
        					{        				   		
        				   		categoryTypeStore=CategoryManager_selectedNode.attributes.category_name;
        					    parentIdStore='';	//如果输入为空，则默认新建分类没有父分类
        					 }
        					 alert(parentIdStore);
        					//	 alert(contextPath);
  	//	window.open(contextPath+"/applicationresource.do?parentIdStore="+parentIdStore+"&deleteId=all","applicationResource"); 
  	});
  	
});