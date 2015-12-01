/* AUTHOR: YUHAO
 * CREATION DATE:2008-02-27
 * WORKFILE:categoryManager.js
 * DESCRIPTION: Javascrpt file for categoryManager.jsp.It is build up  Ext 1.1.1.
 * Copyright: ? 2008 东软 基础软件事业部版权所有
 *  */
var Action_GetCategory=WEB_APP_CONTENT+"/var_templet.do?method=getCategory";
var Action_AddCategory=WEB_APP_CONTENT+"/var_templet.do?method=addCategory";
var Action_DeleteCategory=WEB_APP_CONTENT+"/var_templet.do?method=deleteCategory";
var Action_ModifyCategory=WEB_APP_CONTENT+"/var_templet.do?method=modifyCategory";

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

var nodeCategoryId;				//当前选中tree中节点的分类id 
var nodeCategoryName;			//当前选中tree中节点的分类名称
var rowResourceId;              //资源数据窗口现在所选的行的资源id   
var rowCategoryId;  			//资源数据窗口现在所选的行的分类id
var pResourceGrid;              //DataGrid的引用
var resourceCategoryTreePanel;  //tree的引用 
var resourceType;					//资源类型
var isCanShow=false;             //控制台是否显示的标志 引入ext-all-debug.js 控制台才有效
var CategoryManager_selectedNode;	//当前选择树节点的引用
var PosX;
var PosY;




//负责处理新建分类的表单处理模块
	var addCategoryDlg = function(){
   
    var dialog, showBtn,submitBtn,closeBtn;      
    var categoryNameValue,categoryTitleValue; 					  //html表单文本框的输入值
    var categoryTypeStore,parentIdStore;                          //保存当前节点分类类型以及父结点id的变量
    var dialogScope;
  
    return {
       init : function(){            
       dialogScope=this;
    		this.createDialog();    		
    		categoryNameValue=Ext.get("categoryname").getValue();    		
	 		categoryTitleValue="";    										               
            },
       
       
       dialogClose : function(){       					
       					
       					dialog.hide();      
      			 		Ext.get("categoryname").dom.value="";
     					Ext.get("categoryCategoryType").dom.value=""; 	
       },
       
       
       dialogSubmit : function(){    
       						//var dialogScope=this;					   
	 					  	categoryNameValue=Ext.get("categoryname").getValue(); 
	 					  	categoryTitleValue=""; 	
	 					  	//如果填写信息为空时的处理				   
        				  	if(categoryNameValue.length<1)
        				  	{
        				  		//this.dialogClose();
        				  		Ext.MessageBox.alert('status',isCanNullText);
        				  		return;
        				  	}  
        				  	if(!(categoryNameLimit()))
	        				{
	        					return;
	        				}  
        					if(CategoryManager_selectedNode.attributes.type=='category')
        					{        	
        					    categoryTypeStore=CategoryManager_selectedNode.attributes.categorytype;
        				   		parentIdStore=CategoryManager_selectedNode.attributes.category_id;				          					     				   
        					}        		
        					else
        					{        				   		
        				   		categoryTypeStore=CategoryManager_selectedNode.attributes.category_name;
        					    parentIdStore='';	//如果输入为空，则默认新建分类没有父分类
        					 }		
        					categoryNameValue=Ext.get("categoryname").getValue(); 
	 					  	categoryTitleValue="";  
        					var categoryNameValueEncode=encodeURIComponent(categoryNameValue);
        					var categoryTitleValueEncode=encodeURIComponent(categoryTitleValue);
        					var categoryTypeStoreEncode=encodeURIComponent(categoryTypeStore);
        				 	
        					Ext.Ajax.request(
        				{
        				   'method':'POST',
        				   'url':Action_AddCategory,
        				   'params':
        				   {
        				   	'inserttype':'category',
        				   	'name':categoryNameValueEncode,
        				   	'title':categoryTitleValueEncode,
        				   	'parentid':parentIdStore,
        				   	'categorytype':categoryTypeStoreEncode
        				   	},
        				   'success':dialogScope.getId,
        				   'failed' : dialogScope.showFailed
        				}
        				);     					  				   	
        				//layout.el.unmask.createDelegate(layout.el);	
        				dialogScope.dialogClose.call();
       				},         
       
       getId : function(o){       					
						var json=Ext.util.JSON.decode(o.responseText);							
						//layout.el.unmask.createDelegate(layout.el);
						if(json[0].category_id!=null)
						{															
							Ext.MessageBox.alert('Status',addSuccessText);							    
							var node=new CategoryManager_pTree.TreeNode(
        						{
        							text:categoryNameValue,
        							category_name:categoryNameValue,
        							category_id:json[0].category_id,
        							parentid:parentIdStore,
        							categorytype:categoryTypeStore,
        							iconCls:'file',
        							type:'category',
        							allowDelete:true,
        							allowEdit:true        							
        						}
        					);						
        					  
        					  					
        					CategoryManager_selectedNode.appendChild(node);
        				    CategoryManager_selectedNode.leaf='false';
        				    CategoryManager_selectedNode.attributes.iconCls='folder';
        					CategoryManager_selectedNode.expand();
						}
						else
						{
							Ext.MessageBox.alert('Status',addFailedText);
						}
						
      				},
      				
      	showFailed: function()
       	{
       		//layout.el.unmask.createDelegate(layout.el);
       		Ext.MessageBox.alert('Status',overTimeText);
       	},
        createDialog : function(){
        	//var scope=this;
        	//var testScope=this;
        	 
        	if(!dialog){ // lazy initialize the dialog and only create it once
                dialog = new Ext.BasicDialog("addcategory-dlg", 
                { 
                        autoTabs:true,
                        width:200,
                        height:130,
                        shadow:true,
                        minWidth:200,
                        minHeight:130                      
                });
                
                dialog.addKeyListener(27, dialog.hide, dialog);
                dialog.addKeyListener(13,dialogScope.dialogSubmit,dialog);
                submitBtn=dialog.addButton(submitText, dialogScope.dialogSubmit, this);                  
                closeBtn=dialog.addButton(closeText, dialogScope.dialogClose, this);                		    			
            }        	
        },        
       
       
        showDialog : function(){             
            
             //在html页面显示被选节点的分类类型                         
              
    		if(CategoryManager_selectedNode.attributes.type=='categorytype')
    		{
    			document.getElementById("categoryCategoryType").value=CategoryManager_selectedNode.attributes.category_name;
    		}
    		else
    		{
    			document.getElementById("categoryCategoryType").value=CategoryManager_selectedNode.attributes.categorytype;	
    		}    	
    		 
    	//	dialog.alignTo('msg','t-bl?',[PosX,PosY],true);	
            dialog.show();    
            Ext.get("categoryname").focus();     
        }
    };
}();

Ext.onReady(addCategoryDlg.init, addCategoryDlg, true);

//初始化提示框
Ext.onReady(function(){
	
});

 
Ext.onReady(function(){   
    
    var tree = Ext.tree;
    CategoryManager_pTree=tree; 
    

    // turn on quick tips
    Ext.QuickTips.init();

    var cview = Ext.DomHelper.append('tree',
        {cn:[{id:'main-tb'},{id:'cbody'}]}
    );


    // create the primary toolbar
    var tb = new Ext.Toolbar('main-tb');
    tb.add(	
    {
        id:'category',        
        text:addCategoryText,
        disabled:true,
        handler:addCategoryDlg.showDialog,        
        cls:'x-btn-text-icon add-category',
        tooltip:addCategoryText
    },    
    {
        id:'modify',       
        text:editText,
        disabled:true,
        handler:modify,
        cls:'x-btn-text-icon modify',
        tooltip:editText
    },
    '-',{
        id:'remove',       
        text:removeText,
        disabled:true,
        handler:removeNode,
        cls:'x-btn-text-icon remove',
        tooltip:removeText
    }
    );
    // for enabling and disabling
    var btns = tb.items.map;

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
      
    ctree.el.addKeyListener(Ext.EventObject.DELETE, removeNode);

    var croot = new tree.AsyncTreeNode({
        allowDrag:false,
        allowDrop:true,
        id:'croot',
        text:'变量模版分类',
        cls:'croot'		
    });
    
    CategoryManager_pcRoot=croot;    //初始化指向根节点的指针 
   //当合拢一个节点时，让此节点成为被选中的节点，使得子节点不能被误编辑
   
    function beforeCollapseHandler(node, deep, anim){		
		node.select();
	}  
    
    
    ctree.on('beforecollapse',beforeCollapseHandler);  
 
    ctree.on('contextmenu', prepareCtx);
    
    ctree.el.swallowEvent('contextmenu', true);
 
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
        					 
        					//	 alert(contextPath);
  		window.open(contextPath+"/vartmpresource.do?parentIdStore="+parentIdStore+"&deleteId=all","varTmpResource"); 
  	});
  	
    var sm = ctree.getSelectionModel();
    
    //设置增加分类以及删除按钮是否可用
    sm.on('selectionchange', function(){
        var n = sm.getSelectedNode();
        CategoryManager_selectedNode=n;								//将当前选择的节点指针保存，以备之后的增加表单之用        
        if(n)
        {
            btns.category.setDisabled(false);
          
        	  
        }
        if(!n){
            
            btns.remove.disable();          
            return;
        }
        var a = n.attributes;
        btns.modify.setDisabled(!a.allowDelete);
        btns.remove.setDisabled(!a.allowDelete);        
      
    });
      
    //与按钮绑定的事件
    var oldNode;
    var modifyNode;
    var node;
    function modify()
    {	
    	var ge = new tree.TreeEditor(ctree, {
	        allowBlank:false,
	        blankText:'此字段不能为空',
	        selectOnFocus:true        
    	});   
        node=sm.getSelectedNode();
    	ge.triggerEdit(node); 	
    	 
	    if(!ge.editNode.attributes.allowEdit){
	        return false;
	    }
	    
	    var node=sm.getSelectedNode();
	    oldNode= new tree.TreeNode();        
		oldNode.attributes.type=node.attributes.type;
		oldNode.attributes.text=node.attributes.text;		
		
   		 ge.on('complete',function()
		{
			modifyNode=sm.getSelectedNode();
			saveModify(modifyNode);
			ge.destroy();
		});
    }
    //在修改之前，保存当前节点的相关信息，如果这些信息没有被修改，则不发送请求   
	//发送修改请求
	 function saveModify(node)
    {
    	//如果用户没有修改，则不向servlet发送请求    	
    	if((node.attributes.type==oldNode.attributes.type)&&(node.attributes.text==oldNode.attributes.text))
    	{    		
    		return;
    	}
    	var param=[];
    	var parentIdStore;
    	 	
    	if(node.attributes.type=='categorytype'||node.parentNode.attributes.type=='categorytype')
    	{
    		parentIdStore='-1';
    	}    	
    	else
    	{    
    		parentIdStore=node.parentNode.attributes.category_id;    		
    	}
    	
    	if(node.parentNode.attributes.type=='categorytype')
		{
			node.attributes.categorytype=node.parentNode.attributes.category_name;					
		}
		else			
		{
			node.attributes.categorytype=node.parentNode.attributes.categorytype;				
		}	    	 
		var typeEncode=encodeURIComponent(node.attributes.type);
    	var category_nameEncode=encodeURIComponent(node.attributes.category_name); 
    	var newtextEncode=encodeURIComponent(node.attributes.text);
    	var categorytypeEncode= encodeURIComponent(node.attributes.categorytype);
    	
		Ext.Ajax.request(
        					{
	        				   'method':'POST',
	        				   'url':Action_ModifyCategory,
	        				   'params':
	        				   {
	        				   	'modifytype':typeEncode,
	        				   	'categoryid':node.attributes.category_id,
	        				   	'category_name':category_nameEncode,
	        				   	'parentid':parentIdStore,
	        				   	'newtitle':newtextEncode,
	        				   	'categorytype':categorytypeEncode
	        				   	},
	        				   'success': modifySuccess,
	        				   'failed': overTime
        					}
        				);  	
    }
    
    function modifySuccess(o)
    {
    	var jsonraw=Ext.util.JSON.decode(o.responseText);
		if(jsonraw[0].result=='1')
		{								
			Ext.MessageBox.alert('Status',modifySuccessText);						
		}	
		else
		{
			modifyNode.attributes.text=oldNode.attributes.text;			
			Ext.MessageBox.alert('Status',modifyFailedText);		
		}    	
    }
    
    //显示提示信息
    function showAlert(showText)
    {
    	Ext.MessageBox.alert('Status',showText);
    }

	//超时时显示
	function overTime()
    {
    	//layout.el.unmask.createDelegate(layout.el);
    	showAlert(overTimeText);
    }

	//将消息发送到servlet，删除对应的数据
	function removeService(btn)
	{
		var node=sm.getSelectedNode();			
		
		//如果选择删除
		if(btn=='yes')
		{			
			//如果要删除的是分类并且有子节点,提示是否删除其下的分类
			if(node.attributes.type=='category'&&node.childNodes.length>0)
			{	
				Ext.MessageBox.alert('Status'," 您要删除的流程"+node.attributes.text+"流程<br>含有子节点，请从子流程逐步删除"); 
				
			}else
			//如果要删除的没有子节点
			removeSub();					
		}
	}
	
	
	//删除被选中节点的子节点
	function removeSub(btn)
	{
		var node=sm.getSelectedNode();
		if(btn=="no")
		{
			return;
		}
		
		//是否存在子节点的标识
		var hasChild;
		if(btn==null)
		{
			hasChild='no';
		}
		else
		{
			hasChild='yes';
		}
		var typeEncode=encodeURIComponent(node.attributes.type);
		var category_nameEncode=encodeURIComponent(node.attributes.category_name);		
		Ext.Ajax.request(
	        				{
	        				   'method':'POST',
	        				   'url':Action_DeleteCategory,
	        				   'params':
	        				   {
	        				   	'deletetype':typeEncode,
	        				   	'name':category_nameEncode,
	        				   	'id':node.attributes.category_id,
	        				   	'deletemethod':hasChild
	        				   	},
	        				   'success': delSuccess,
	        				   'failed': overTime    				   
	        				}
        				); 		 
	}
	
	
	//显示删除是否成功
	function delSuccess(o)
	{
		var jsonraw=Ext.util.JSON.decode(o.responseText);
		//layout.el.unmask.createDelegate(layout.el);
		if(jsonraw[0].result=='1')
		{
			var node=sm.getSelectedNode();								
			Ext.MessageBox.alert('Status',removeSuccessText);						
			var parentnode=node.parentNode;
			ctree.getSelectionModel().selectPrevious(); 	
		    parentnode.removeChild(node);   
		}	
		else
		{
			Ext.MessageBox.alert('Status',removeFailedText);		
		}
	}
	
    // 删除按钮绑定事件
    function removeNode(){
        var n = sm.getSelectedNode();        
        n.expand();        
        if(n && n.attributes.allowDelete){
        	//提示用户是否删除
        	Ext.MessageBox.buttonText.yes=enterText; 
			Ext.MessageBox.buttonText.no=dropOpText; 
        	Ext.MessageBox.show({
          		 title:remindText,
          		 msg: realRemoveText+n.attributes.text+'?',
           		 buttons: Ext.MessageBox.YESNO,
          		 fn: removeService,
          		 animEl: 'tree'
      		 });                      
        }        
    }		
	
    function removeResource(){
    		Ext.MessageBox.buttonText.yes=enterText; 
			Ext.MessageBox.buttonText.no=dropOpText; 
        	Ext.MessageBox.show({
          		 title:remindText,
          		 msg: realRemoveText+proc_tmp_id+'?',
           		 buttons: Ext.MessageBox.YESNO,
          		 fn: removeSubResource,
          		 animEl: 'topic-grid'
      		 });
    }

    // 右键菜单

    var ctxMenu = new Ext.menu.Menu({
        id:'copyCtx',
        items: [      	
        	{
                id:'addcategory',
                handler:addCategoryDlg.showDialog,
                disabled:true,
                cls:'add-category',
                text:addCategoryText
            },	
            {
     		   id:'modify',       
   		  	   text:editText,
    		   disabled:true,
        	   handler:modify,
			   cls:'modify'       
    		}, '-',{
                id:'remove',
                handler:removeNode,
                cls:'remove-mi',
                text: removeNodeText
        }]
    });


	//在弹出右键菜单之前，判断需要能使用那些功能
    function prepareCtx(node, e){
        node.select();
        ctxMenu.items.get('remove')[node.attributes.allowDelete ? 'enable' : 'disable']();
        
       
        if((node.attributes.type=='undefined')||(node.attributes.type=='category'))
        {
        	ctxMenu.items.get('addcategory').setDisabled(false);
       		ctxMenu.items.get('modify').setDisabled(false);
        }
        else
        {
        
      
        	ctxMenu.items.get('addcategory').setDisabled(true);
       		ctxMenu.items.get('modify').setDisabled(true);
        }
        
        ctxMenu.showAt(e.getXY());
    }

	//合拢被选中节点
    function collapseAll(){
        ctxMenu.hide();
        setTimeout(function(){
        	  var n=sm.getSelectedNode();
        	  n.collapse(false, false);
        }, 10);
    }


	//展开被选中节点
    function expandAll(){
        ctxMenu.hide();
        setTimeout(function(){
        	var n=sm.getSelectedNode();
        	  n.expand(false, false);
        }, 10);
    }   
});