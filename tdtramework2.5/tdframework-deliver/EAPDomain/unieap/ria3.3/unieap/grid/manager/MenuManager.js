dojo.provide('unieap.grid.manager.MenuManager');
dojo.require('unieap.menu.Menu');
dojo.declare("unieap.grid.manager.MenuManager", null, {
	/**
	 * @summary:
	 * 		菜单控制器
	 * @description:
	 * 		Grid的菜单控制器。
	 * @declaredClass:
	 * 		unieap.grid.manager.MenuManager
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" menu="{onBeforeMenuClick:fn}}"
	 * |	 width="100%" height="350px">
	 * |</div>
	 * |function fn(cell){
	 * |	console.info(cell.label);
	 * |	return true; //一定要有返回true,否则菜单项不会弹出来
	 * |}
	 * |此时点击标表头上的菜单按钮,会在控制台中打印出表所在的列名
	 */
	ui:{
		alwaysShowMenu:true,
		onBeforeMenuClick:true,
		addMenuControl:true,
		getMenu:true,
		getCell:true
	},
	
	//要加载的control对象的declaredClass
	controlsNameList:null,
	
	/**
	 * @summary:
	 * 		是否总是在Grid表头上显示菜单按钮(点击该按钮会弹出菜单)
	 * @description:
	 * 		该属性有效的前提是要弹出的菜单必须有子节点或者用户自自定义了onBeforeMenuClick函数。
	 * 		用户可以修改global.js中的unieap.widget变量来全局设定是否在表头上显示菜单按钮
	 * @type:
	 * 		 {boolean}
	 * @example:
	 * |<div dojoType='unieap.grid.Grid' filter="{}" menu="{alwaysShowMenu:true}"></div>
	 * |<div dojoType="unieap.grid.Grid' menu="{alwaysShowMenu:true,onBeforeMenuClick:fn}">
	 * |下面的代码不会在Grid表头上显示菜单按钮
	 * |<div dojoType='unieap.grid.Grid' menu="{alwaysShowMenu:true}"></div>
	 * 
	 */
	alwaysShowMenu:unieap.widget.grid.alwaysShowMenu,
	
	/*
	 * Grid菜单的事件句柄
	 */
	_connectHandlers: null,
	
    constructor: function(param){
    	this._connectHandlers = [];
        dojo.mixin(this, param);
        this.menu = new unieap.menu.Menu({});
		this.initEvent();
		this.menuControls=[];

		//延时实例化MenuControls
		setTimeout(dojo.hitch(this,function(){
			this.initControls();
		}),0);
		
		
    },

	initEvent:function(){
		this._connectHandlers.push(dojo.connect(document, 'onclick', dojo.hitch(this, function(){
            dijit.popup.close(this.menu);
        })));
		var viewManager=this.grid.managers.get('ViewManager');
		var self=this;
		this._connectHandlers.push(dojo.connect(viewManager,'onHeaderRender',dojo.hitch(self,self.onHeaderRender)));
		this._connectHandlers.push(dojo.connect(viewManager,'onHeaderMouseOver',dojo.hitch(self,self.onHeaderMouseOver)));
		this._connectHandlers.push(dojo.connect(viewManager,'onHeaderMouseOut',dojo.hitch(self,self.onHeaderMouseOut)));
	},
	
	//初始化控制器
	initControls:function(){
		var list=this.controlsNameList;
		for(var item in list){
			dojo.require(item);
			var clazz=dojo.getObject(item);
			var controler=new clazz({
				grid:this.grid,
				menuManager:this,
				args:list&&list[item]||{}
			});
			this.addMenuControl(controler);
		}
	},
	
	/**
	 * @summary：
	 * 		增加菜单控制器
	 * @description
	 * 		菜单控制器需实现以下方法
	 * 		initMenu:初始化方法
	 * 		updateMenu:更新菜单方法
	 * @example：
	 * |	dojo.declare("unieap.grid.myMenu", null, {
	 * |		constructor:function(grid){
	 * |			this.grid=grid;
	 * |			this.menuManager=grid.getManager('MenuManager');
	 * |		},
	 * |		initMenu:function(){
	 * |			var m=this.menuManager.getMenu();
	 * |			this.myMenuItem=new unieap.menu.MenuItem({label:'自定义'});
	 * |			m.addChild(this.myMenuItem);
	 * |		},
	 * |		updateMenu:function(){
	 * |			var cell=this.menuManager.getCell();
	 * |			if(cell&&cell.name=='yangzz'){
	 * |				this.myMenuItem.setDisabled(true);
	 * |			}else{
	 * |				this.myMenuItem.setDisabled(false);
	 * |			}
	 * |		},
	 * |		validateMenu:function(){
	 * |			return true;
	 * |		}
	 * |	});
	 * |	var myMenuControl=new unieap.grid.myMenu(grid);
	 * |	menuManage.addMenuControl(myMenuControl);	
	 * 		添加一个自定义的MenuControl
	 */
	addMenuControl:function(control){
		this.menuControls.push(control);
		control&&control.initMenu&&control.initMenu();
	},
	
	/**
	 * @summary:
	 * 		获取Menu对象
	 * @description：
	 * 		通过这个menu可以增加菜单项
	 * @example：
	 * |	var meneuManager=grid.getManager('MenuManager');
	 * |	var menu=meneuManager.getMenu();
	 * |	menu.addChild(new unieap.menu.MenuItem(...));
	 * 		获取Menu
	 */
	getMenu:function(){
		return this.menu;
	},
	
	//更新菜单
	updateMenu:function(){
		dojo.forEach(this.menuControls,function(control){
			control.updateMenu&&control.updateMenu();
		});
		this.menu.startup();
	},
	
	//销毁menu控制器    
	destroy:function(){
		while(this._connectHandlers.length>0) {
			dojo.disconnect(this._connectHandlers.pop());
		}
		dojo.forEach(this.menuControls,function(control){
			control.destroy&&control.destroy();
		});
		this.menu.destroy();
	},
	
	//调用controls的校验方法
	validate:function(cell){
		var result=true;
		dojo.forEach(this.menuControls,function(control){
			control.validateMenu&&(result=control.validateMenu(cell))
		})
		return result;
	},
	
	//以下两种情况不会显示菜单按钮:
	//1.当前单元格不允许出现菜单并且this.menuControls中只有一个控制器
	//2.或者当前的this.menuControls中不存在控制器并且没有配置onBeforeMenuClick
	validateMenu:function(cell){
		var condition1=!this.validate(cell)&&this.menuControls.length==1;
		var condition2=this.menuControls.length==0&&!dojo.isFunction(this.onBeforeMenuClick);
		if(condition1||condition2){
			return false;	
		}
		return true;
	},
	
/////////////////////////////////////////////////////////menu相关	
    //渲染Header
    onHeaderRender: function(node, view){
		 //确保initControls执行完毕后再执行,这样this.menuControls才正确
		  setTimeout(dojo.hitch(this,function(){
			  var layout=this.grid.managers.get("LayoutManager");
	          dojo.query(".u-grid-cell", node).forEach(function(th){
		         var menu = dojo.create('div', {'class': 'u-grid-menu'},th.childNodes[0], 'last');
				 //是否需要总是显示菜单按钮
				 if(this.alwaysShowMenu){
					 var cell= layout.getCell(Number(dojo.attr(th,"idx")));
				        if(this.validateMenu(cell)){
				             this.showMenu(menu);
				     } 
				 }
				 
		         view.connect(menu, 'onclick', dojo.hitch(this, function(e){
		             this.onMenuCick(e);
		         }));
				 
		       }, this);
			
		    if (this.menu&&this.menu.isShowingNow) {
	            dijit.popup.close(this.menu);
	        }
	
			dojo.forEach(this.menuControls,function(control){
				control.onHeaderRender&&control.onHeaderRender(node, view);
			});
			
		  }),0)
    },
    
     //鼠标移入Header,显示menu按钮
    onHeaderMouseOver: function(e){
        if (e.cell) {
			this.cell=e.cell;
            var menu = dojo.query(".u-grid-menu", e.cellNode)[0],canShow=true;
			if(!this.validateMenu(e.cell)){
				canShow=false;
			}
            if(menu&&canShow){
				this.showMenu(menu);
			};
        }
    },
    
    //鼠标移出Header,删除menu按钮
    onHeaderMouseOut: function(e){
        if (e.cell) {
            if (this.menu.isShowingNow &&this.menu.cell==e.cell) {
            }else {
                var menu = dojo.query(".u-grid-menu", e.cellNode)[0];
				if(menu){
					this.hideMenu(menu);
				}
            }
        }
    },
	
	//显示menu
	showMenu:function(node){
		node.parentNode.style.position = 'relative';
		node.style.position = 'absolute';
		node.style.visibility = 'visible';
		node.style.display = 'block';
	},
	
	//隐藏menu
    hideMenu:function(node){
	    if(this.alwaysShowMenu) return;
        node.parentNode&&(node.parentNode.style.position = 'static');
		node.style.position = 'static';
		node.style.visibility = 'hidden';
		node.style.display = 'none';
	},
	
    //弹出菜单
    onMenuCick: function(e){
		dojo.stopEvent(e)
		//判断是否重复点击表头上的过滤小三角
		if(this.menu.isShowingNow&&e.target==this.menuParent){
			return;
		}
	    dijit.popup.close(this.menu);
		
        var parent = e.target;
        var menu = this.menu;
		this.menuParent=parent;
		//执行用户自己的onBeforeMenuClick函数
		var fn=this.onBeforeMenuClick;
		if (fn&&dojo.isFunction(fn)&&!fn.call(this,this.getCell())) {
			//判断用户自定义的函数onBeforeMenuClick的返回值是否为true,否则就不弹出菜单
			return;
		}
	   this.menu.cell=this.getCell();
		
	   this.updateMenu();
		//判断菜单是否有菜单项,没有就直接返回
		if(!this.menu.hasChildren()){
			return;
		}
        dijit.popup.open({
            parent: parent,
            popup: menu,
            around: parent,
            onClose: dojo.hitch(this,function(){
				this.hideMenu(parent);
                this.menuParent = null;
            }),
			orient:{BL:'TL', BR:'TR',TL:'BL',TR:'BR'}
        });
    },
    
	
	
	/**
	 * @summary:
	 * 		获取当前Menu所在的cell
	 * @description
	 * 		在有自定义按钮时,可以通过这个方法取得所在的列
	 */
    getCell: function(){
		  return this.cell;
    }
});