//下拉框&树
Ext.form.TreeField = function(config){
	config.readOnly=true;
    Ext.form.TreeField.superclass.constructor.call(this, config);
};
Ext.extend(Ext.form.TreeField, Ext.form.TriggerField, {
    //triggerClass : 'x-form-trigger',
    getValue : function(){
        var val = Ext.form.TreeField.superclass.getValue.call(this) || '';
        val = this.getPath() + '@' + val;
        return val;
    },
    setValue : function(val){
    	val = val.split('@');
		this.setPath(val[0]);
    	Ext.form.TreeField.superclass.setValue.call(this, val[1]);
    },
    getPath : function(){
        return this.el.dom.path || '';
    },
    setPath : function(p){
        this.el.dom.path = p;
    },
    menuListeners : {
    	select:function(item,picker,node){
    		var v = node.text;
    		var p = node.getPath();
    		this.focus();
    		this.setValue(p + '@' + v);
    	},
       	hide : function(){
            this.focus();
            var ml = this.menuListeners;
            this.menu.un("select", ml.select,  this);
            this.menu.un("hide", ml.hide,  this);
       	}
    },
        hideAllField:function(){
		var inputDiv=this.el.dom;
		var parent=inputDiv.parentNode.parentNode;
		if(parent&&parent.tagName=="DIV"){
			parent.style.display="none";
		}
	},
	
	hideLabel:function(){
		
	var inputDiv=this.el.dom;
		var label=inputDiv.parentNode.parentNode.previousSibling;
		if(label&&label.tagName=="LABEL"){
			label.style.display="none";
		}
	},
	
	  showAllField:function(){
		var inputDiv=this.el.dom;
		var parent=inputDiv.parentNode.parentNode;
		if(parent&&parent.tagName=="DIV"){
			parent.style.display="inline";
		}
	},
	
	showLabel:function(){	
	    var inputDiv=this.el.dom;
		var label=inputDiv.parentNode.parentNode.previousSibling;
		if(label&&label.tagName=="LABEL"){
			label.style.display="inline";
		}
	} ,
	
	setLable:function(value){
		var inputDiv=this.el.dom;
		var label=inputDiv.parentNode.parentNode.previousSibling;
		if(label&&label.tagName=="LABEL"){
			label.innerHTML=value;
			label.style.display="inline";
		}
	},
	setToolTip:function(text){
		 if(Ext.QuickTips && Ext.QuickTips.isEnabled()){
            this.getEl().dom.qtip = text;
            this.getEl().dom.removeAttribute('title');
        }else{
            this.getEl().dom.title = text;
        }
	},
	
    isExpanded : function(){
        if(!this.menu || !this.menu.el){
        	return false;
        }
        else{
        	return this.menu.el.isVisible();
        }
    },
    collapse : function(){
        if(!this.isExpanded()) return;
		Ext.get(document).un('mousedown', this.collapseIf, this);
        this.menu.hide();
        this.el.focus();
        this.fireEvent('collapse', this);
    },
    collapseIf : function(e){
        if(!e.within(this.wrap) && !e.within(this.menu.el)){
            this.collapse();
            Ext.get(document).un('mousedown', this.collapseIf, this);
        }
    },
    expand : function(){
        if(this.isExpanded() || !this.hasFocus){
            return;
        }
		Ext.menu.MenuMgr.unregister(this.menu);
        this.menu.show(this.el, 'tl-bl?');
        this.menu.picker.tree.selectPath(this.getPath(), null, this.scrollChildIntoView.createDelegate(this));
        this.el.focus();
        Ext.get(document).on('mousedown', this.collapseIf, this);
        this.fireEvent('expand', this);
    },
    scrollChildIntoView : function(exp, selNode){
        if(selNode){
        	var elY = selNode.ui.getDDRepairXY()[1];
        	var h = this.treeConfig.height;
        	var r = elY - h*2 + 26;
        	this.menu.el.scroll(r<0 ? 'top' : 'b', Math.abs(r));
        }
    },
    onTriggerClick : function(){
        if(this.disabled) return;
        if(this.menu == null){
            var menu = this.menu = new Ext.menu.TreeMenu({minWidth: this.width, maxHeight: this.treeConfig.height, handler: this.treeConfig.beforeSelect});//
	        Ext.apply(this.menu.picker, {treeConfig:this.treeConfig});
	    }
	    this.menu.on(Ext.apply({}, this.menuListeners, {scope:this}));
        this.menu.picker.setValue(this.getValue());

        if(this.isExpanded()){
            this.hasFocus = false;
            this.collapse();
        }else{
            this.hasFocus = true;
            this.expand();
        }
    },
    validateBlur : function(){
        return !this.menu || !this.menu.isVisible();
    }
});

Ext.menu.TreeMenu = function(config){
    Ext.menu.TreeMenu.superclass.constructor.call(this, config);
    var di = new Ext.menu.TreeItem(config);
    this.add(di);
    this.picker = di.picker;
    this.relayEvents(di, ['select']);
};
Ext.extend(Ext.menu.TreeMenu, Ext.menu.Menu, {
    render : function(){
        if(this.el) return;
        var el = new Ext.Layer({
            cls: 'x-menu',
            shadow:this.shadow,
            constrain: false,
            parentEl: this.parentEl || document.body,
            zindex:15000
        });
        el.setStyle('background', '#fff');
        el.setStyle('overflow-y', 'auto');
        el.setHeight(this.maxHeight);
        el.addKeyListener(27, this.hide, this);//esc
        this.el = el;
        this.focusEl = el.createChild({tag: 'a', cls: 'x-menu-focus', href: '#', onclick: 'return false;', tabIndex:'-1'});
        var ul = el.createChild({tag: 'ul', cls: 'x-menu-list', style:'margin-top: -10px;'});
        this.items.each(function(item){
            var li = document.createElement('li');
            li.className = 'x-menu-list-item';
            ul.dom.appendChild(li);
            item.render(li, this);
        }, this);
        this.ul = ul;
        this.autoWidth();
		this.picker.on('expand', this.autoWidth, this);
		this.picker.on('collapse', this.autoWidth, this);
    },
    autoWidth : function(){
        if(!this.el) return;
        if(Ext.isIE){
            this.el.setWidth(this.minWidth);//var t = this.el.dom.offsetWidth; // force recalc
            var w = this.el.dom.scrollHeight > this.maxHeight ? 17 : 0;
            this.el.setWidth(this.ul.getWidth() + this.el.getFrameWidth("lr") + w);
        }
    }
});

//下拉框&树
Ext.menu.TreeItem = function(config){
    Ext.menu.TreeItem.superclass.constructor.call(this, new Ext.TreePicker(config), config);
    this.picker = this.component;
    this.addEvents({select: true});
    this.picker.on('render', function(picker){
        picker.getEl().swallowEvent('click');
    });
    this.picker.on('select', this.onSelect, this);
};

Ext.extend(Ext.menu.TreeItem, Ext.menu.Adapter, {
    onSelect : function(picker, node){
		if(node.id == '0') return false;
        this.fireEvent('select', this, picker, node);//menuListeners.select
        Ext.menu.TreeItem.superclass.handleClick.call(this);
    }
});
Ext.TreePicker = function(config){
    Ext.TreePicker.superclass.constructor.call(this, config);
    this.addEvents({select: true});
    if(this.handler){
        this.on('select', this.handler,  this.scope || this);
    }
};
Ext.extend(Ext.TreePicker, Ext.Component, {
    setValue : function(value){
    	this.value=value;//if(this.tree) this.tree.selectPath(value,'text');
    },
    getValue : function(){
        return this.value;
    },
    createTree : function(id){
         //在此返回一个树
	    var Tree = Ext.tree;
	    var tree = new Tree.TreePanel(id, {//id
	        animate:true, 
	        loader: new Tree.TreeLoader({
	        //dataUrl:'http://extjs.com/deploy/ext-1.1/examples/tree/get-nodes.php'
	        dataUrl:unieap.WEB_APP_NAME+'/org_station.do?method=getManagedStations' 
	        }),//c.dataTag
	        enableDD:true,
	        containerScroll: true
	    });
	    // set the root node
	    var root = new Tree.AsyncTreeNode({
	        text: 'Ext JS',//c.title
	        draggable:false,
	        nodeType:'root',
	        id:'source'//c.rootId
	    });

	    tree.loader.on("beforeload", function(treeLoader, node) { 
	        if(node.attributes.nodeType=="root"){
	        	treeLoader.baseParams.nodeType = 'root';
	        }
	        else if (node.attributes.nodeType=="unit"){
	        	treeLoader.baseParams.nodeType = 'unit';
	        	treeLoader.baseParams.unitID = node.attributes.id;
	        }
	        else{//nodeType为station
	        	treeLoader.baseParams.nodeType = 'station';
	        	treeLoader.baseParams.stationID =node.attributes.id;
	        	//treeLoader.baseParams.parentID = parentID;
	        }
	    });
	    
	    tree.setRootNode(root);
	    // render the tree
	    tree.render();
	    root.expand();

	    tree.on("checkchange",function(node,checked){
	    	if (checked)
	    		alert("checked");
	    	else
	    		alert("unchecked");
	    });
	    	    
	    return tree;
    },
    
    onRender : function(container){
    	var me=this;
        container.setStyle('display', 'inline');
        this.el = container;
        this.tree = this.createTree(container.dom.id);
		this.tree.on('click',function(node,e){me.fireEvent('select', me, node)});
		this.tree.on('expand', function(){me.fireEvent('expand')});
		this.tree.on('collapse', function(){me.fireEvent('collapse')})
    }
}
);