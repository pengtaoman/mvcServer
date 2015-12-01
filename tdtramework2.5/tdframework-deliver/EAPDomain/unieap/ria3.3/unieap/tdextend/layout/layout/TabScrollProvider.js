dojo.provide('unieap.layout.TabScrollProvider');
/*
 * 为Tab容器提供滚动条按钮和菜单按钮
 */
dojo.declare('unieap.layout.TabScrollProvider',null,{
	
	isShowing: false,
	
	constructor: function(params) {
		dojo.mixin(this,params);
		this.connects = [];
	},
	
	//计算是否出现滚动按钮和菜单按钮
	calculateScroll : function() {
		if(this.widget.tabPosition == "top" || this.widget.tabPosition == "bottom"){
			//横向滚动条
			var contentWidth = this.widget.containerNode.offsetWidth;
			var tabsWidth = this.widget._getTabWidth();
			if (contentWidth<tabsWidth||contentWidth==0) {
				this.showScroll();
			} else {
				this.hideScroll();
			}
		}else{
			//纵向滚动条
			var contentHeight = this.widget.containerNode.offsetHeight;
			var tabsHeight = this.widget._getTabHeight();
			if (contentHeight<tabsHeight||contentHeight==0) {
				this.showScroll();
			} else {
				this.hideScroll();
			}
		}
	},
	
	showScroll: function() {
		var pos = this.widget.tabPosition.charAt(0).toUpperCase() + this.widget.tabPosition.substr(1).replace(/-.*/, "");
		if(this.widget.tabPosition == "top" || this.widget.tabPosition == "bottom"){
			if (!this.leftNode) {
				this.leftNode=dojo.create('div',{'class':'tabward'},this.widget.tablistContainer,'first');
				dojo.addClass(this.leftNode,'eapLeft'+pos);
				this.connects.push(dojo.connect(this.leftNode,'onclick',this,'leftward'));
			}
			if(!this.rightNode){
				this.rightNode=dojo.create('div',{'class':'tabward'},this.widget.tablistContainer,'first');
				dojo.addClass(this.rightNode,'eapRight'+pos);
				this.connects.push(dojo.connect(this.rightNode,'onclick',this,'rightward'));
			}
			dojo.style(this.leftNode,'display','block');
			dojo.style(this.rightNode,'display','block');
			var l=dojo.style(this.widget.scrollingNode,'left');
			if(l==0){
				this.widget.scrollingNode.style.left="19px";
			}
		}else{
			if (!this.upNode) {
				this.upNode=dojo.create('div',{'class':'tabward'},this.widget.tablistContainer,'first');
				dojo.addClass(this.upNode,'eapUp'+pos);
				this.connects.push(dojo.connect(this.upNode,'onclick',this,'upward'));
			}
			if(!this.downNode){
				this.downNode=dojo.create('div',{'class':'tabward'},this.widget.tablistContainer,'first');
				dojo.addClass(this.downNode,'eapDown'+pos);
				this.connects.push(dojo.connect(this.downNode,'onclick',this,'downward'));
			}
			dojo.style(this.upNode,'display','block');
			dojo.style(this.downNode,'display','block');
			var t=dojo.style(this.widget.scrollingNode,'top');
			if(t==0){
				this.widget.scrollingNode.style.top="19px"
			}
		}
		if(!this.menuNode){
			this.menuNode=dojo.create('div',{'class':'tabward'},this.widget.tablistContainer,'first');
			dojo.addClass(this.menuNode,'eapMenu'+pos);
			this.connects.push(dojo.connect(this.menuNode,'onclick',this,'menuward'));
		}
		dojo.style(this.menuNode,'display','block');
		
		this.isShowing=true;
	},
	
	hideScroll: function() {
		if(this.leftNode){
			dojo.style(this.leftNode,'display','none');
		}
		if(this.rightNode){
			dojo.style(this.rightNode,'display','none');
		}
		if(this.upNode){
			dojo.style(this.upNode,'display','none');
		}
		if(this.downNode){
			dojo.style(this.downNode,'display','none');
		}
		if(this.menuNode){
			dojo.style(this.menuNode,'display','none');
		}
		this.widget.scrollingNode.style.left="0px";
		this.widget.scrollingNode.style.top="0px";
		this.isShowing=false;
	},
	
	//向左滚动
	leftward:function(){
		var l=dojo.style(this.widget.scrollingNode,'left');
		l=l+100;
		if(l>0){
			l=19;
		}
		this.scrollLeft(l);
	},
	
	//向右滚动
	rightward:function(){
		var l=dojo.style(this.widget.scrollingNode,'left');
		l=(l-100);
		var t=this.widget._getTabWidth();
		if((l+t)<=0){
			l=19;
		}
		this.scrollLeft(l);
	},
	
	//向上滚动
	upward : function(){
		var t=dojo.style(this.widget.scrollingNode,'top');
		t=t+100;
		if(t>0){
			t=19;
		}
		this.scrollTop(t);
		
	},
	//向下滚动
	downward : function(){
		var t=dojo.style(this.widget.scrollingNode,'top');
		t=(t-100);
		var h=this.widget._getTabHeight();
		if((h+t)<=0){
			t=19;
		}
		this.scrollTop(t);
	},

	needScroll:function(tab){
		if(this.widget.tabPosition == "top" || this.widget.tabPosition == "bottom"){
			var width=0,_tabwidth,tabwidth_,l=dojo.style(this.widget.scrollingNode,'left'),contentWidth = this.widget.containerNode.offsetWidth;
			dojo.some(this.widget.tablist.getChildren(), function(p) {
				if(tab.controlButton==p){
					_tabwidth=width;
				}
				width += p.getWidth();
				if(tab.controlButton==p){
					tabwidth_=width;
					return true;
				}
				return false;
			}, this);
			if( (_tabwidth+l) < 0 || (tabwidth_+l+37) > contentWidth ){
				this.scrollLeft((19 - _tabwidth));
			}
		}else{
			var height=0,_tabheight,tabheight_,t=dojo.style(this.widget.scrollingNode,'top'),contentHeight = this.widget.containerNode.offsetHeight;
			dojo.some(this.widget.tablist.getChildren(), function(p) {
				if(tab.controlButton==p){
					_tabheight=height;
				}
				height += p.getHeight();
				if(tab.controlButton==p){
					tabheight_=height;
					return true;
				}
				return false;
			}, this);
			if( (_tabheight+t) < 0 || (tabheight_+t+37) > contentHeight ){
				this.scrollTop((19 - _tabheight));
			}	
		}
	},
	
	
	scrollLeft : function(left) {
		var anim =  dojo.animateProperty({
				node: this.widget.scrollingNode,
				duration: 700,
				properties: {
					left: left,
					unit: "px"
				}
			});
		anim.play();
	},
	
	scrollTop : function(top) {
		var anim =  dojo.animateProperty({
			node: this.widget.scrollingNode,
			duration: 700,
			properties: {
				top: top,
				unit: "px"
			}
		});
		anim.play();
	},
	//============================弹出菜单=============================
	menuward:function(e){
		dojo.require("unieap.menu.Menu");
	
		this.updateMenu();
		this.menu._openMyself(e);	
	},
	
	updateMenu:function(){
		if(!this.menu){
			this.menu=new unieap.menu.Menu({});
		}
		this.menu.destroy();
		this.menu=new unieap.menu.Menu({});
		var children=this.widget.getChildrenNotHidden();
		var widget=this.widget;
		var getFun=function (child){
			return function(){
				widget.selectChild(child);
			}	
		}
		
		var item,childMenu;
		for(var l=children.length,i=0;i<l;i++){
			if((i)%5==0){
				var itemLabel="Items "+(i+1)+"--"+(i+5);
				if(i+5>=l){
					itemLabel="Items "+(i+1)+"--"+(l)
				}
				childMenu=new unieap.menu.Menu();
				item=new  unieap.menu.PopupMenuItem({
					popup:childMenu,
					label:itemLabel
				});
				this.menu.addChild(item);
			}
			var child=children[i];
			var t=child.title;
			var f=getFun(child);
			childMenu.addChild(new unieap.menu.MenuItem({
				label:t,
				onClick:f
			}));
		}
		this.menu.startup();
	},
	
	destory: function() {
		if(this.menu){
			this.menu.destroy();
		}
		while(this.connects.length){
			dojo.disconnect(this.connects.pop());
		}
	}
});