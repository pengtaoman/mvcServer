/**
 * @file treeview.js
 * @desription 只读树函数，有较高的效率，应用于角色的显示及各种资源的显示等
 * @version 1.0 2005.5.13
 */
var Icon ={
    root1 : "folderopen.gif",
    rolenode : "folderclosed.gif",
    root :	"root.gif",
	folderopen :  "folderopen.gif",
	folderclosed :  "folderclosed.gif",
	leaf	:	"leaf.gif",
    
	Rminus:	  "Rminus.gif",
	Rplus:	 "Rplus.gif",
	minusbottom:	   "Lminus.gif",
	plusbottom:	  "Lplus.gif",
	minus:	 "minus.gif",
	plus:	 "plus.gif",
	join:	 "T.gif",
	joinbottom:	 "L.gif",
	blank:	 "blank.gif",
	line:	 "I.gif"
}

window.TV = [];
function TreeView()
{
	this.id = window.TV.length;
	window.TV[this.id] = this;
	this.target = "_self";
	this.showLeaf = true;
	this.showAll = true;
	this.Nodes ={ 0 : { ID : 0, ParentID : -1, Text : null, Href : null, Image : null, childNodes: new Array() } };
}
//////////////////////////////////////////////////////////////////////////////
//用prototype属性提供TreeView对象的基本功能
//////////////////////////////////////////////////////////////////////////////
var tv = TreeView.prototype;
tv.setTarget = function(v) {
	this.target = v;
}
tv.useLeaf = function(v) {
	this.showLeaf = v;
}
//////////////////////////////////////////////////////////////////////////////
//设置图片文件路径，可采用默认的图片显示
//////////////////////////////////////////////////////////////////////////////
tv.setImagePath = function(sPath) {
	for(o in Icon){
		tmp = sPath + Icon[o];
		Icon[o] = new Image();
		Icon[o].src = tmp;
	}
}
//////////////////////////////////////////////////////////////////////////////
//设置显示的样式，true or false
//////////////////////////////////////////////////////////////////////////////
tv.setShowAll = function(v) {
    this.showAll = v;
}
//////////////////////////////////////////////////////////////////////////////
//加入一个节点
//////////////////////////////////////////////////////////////////////////////
tv.add = function(iD,ParentiD,sText,sHref,sTarget,sImage) {
	this.Nodes[iD] = { ID : iD, ParentID : ParentiD, Text : sText, Href : sHref, Target : sTarget, Image : sImage , childNodes: new Array() , open : false ,isLast : true};
	var ch = this.getNode(ParentiD).childNodes;
	ch[ch.length] = this.Nodes[iD];
	if (ch.length>1) { ch[ch.length-2].isLast = false;}
};
tv.getNode = function(sKey) {
	if (typeof this.Nodes[sKey] != "undefined")
	{
		return this.Nodes[sKey];
	}
	return null;
};
tv.getParentNode = function(ID) {
	var key = this.getNode(ID).ParentID;
	if(this.getNode(key) == null) return null;
	return this.getNode(key);
}
tv.hasChildNodes = function(sKey) {
	return this.getNode(sKey).childNodes.length > 0;
};
tv.getRoot = function(ID) {
	var par = this.getParentNode(ID);
	if (this.getNode(ID).ParentID == 0){
		return this.getNode(ID);
	}
	else{
		return this.getRoot(par.ID);
	}
}
tv.drawNode = function(ID) {
	var html = "";
	var node = this.getNode(ID);
	var rootid = this.getRoot(ID).ID;
	var hc = this.hasChildNodes(ID);
	html += '<div class="TreeNode" nowrap>'+this.drawIndent(ID)+
				'<a  target="_self" href="javascript: void window.TV['+this.id+'].openFolder('+ID+')"><img id="icon'+ID+'" src="'+( node.Image ? node.Image : (hc ? Icon.folderclosed.src : (this.useLeaf ? Icon.leaf.src : Icon.folderclosed.src)))+'" align="absmiddle"></a>'+
				'<span><a  id="node'+ID+'" class="normal" href="'+node.Href+'" target="'+(node.Target ? node.Target : this.target)+'" onclick="window.TV['+this.id+'].setSelected('+ID+')">'+ node.Text +'</a></span></div>\n'
	if (hc) {
		var io = ID ==  rootid;
		node.open = io;
		html += ('<div id="container'+ID+'" style="display:'+(io ? '' : 'none')+'">\n');
		html += this.addNode(ID);
		html += '</div>\n';
	}
	return html;
}

tv.addNode = function(ID) {
	var node = this.getNode(ID);
	var html = "";
	for(var i = 0;i<node.childNodes.length;i++)
		html += this.drawNode(node.childNodes[i].ID);
	return html;
}

tv.drawIndent = function(ID) {
	var s = ''
	var ir = this.getRoot(ID).ID == ID;
	var hc = this.hasChildNodes(ID);
	var iL = this.getNode(ID).isLast;
	if(this.getParentNode(ID) != null)
		s += ((hc ? '<a href="javascript:void window.TV['+this.id+'].openHandler('+ID+');" target="_self">':'')+'<img id="handler'+ID+'" src="'+ (this.hasChildNodes(ID) ? (ir ? Icon.Rminus.src : (iL ? Icon.plusbottom.src : Icon.plus.src)) : (ir ? Icon.blank.src : (iL ? Icon.joinbottom.src : Icon.join.src))) + '" align="absmiddle">'+(hc?'</a>':''));
	var p = this.getParentNode(ID);
	while(p != null)
	{
		if(this.getParentNode(p.ID) == null)break;
		s = ('<img src="'+(this.getNode(p.ID).isLast ? Icon.blank.src : Icon.line.src) + '" align="absmiddle">')+s;
		p = this.getParentNode(p.ID);
	}
	return s;
}
tv.setSelected = function(ID) {
	if(this.selectedID) { document.getElementById("node" + this.selectedID).className = "normal";}
	this.selectedID = ID;
	var node = document.getElementById("node" + ID);
	node.className = "selected";
	node.focus();
}
tv.openHandler = function(ID) {
	if (this.hasChildNodes(ID)) {
		if (this.getNode(ID).open) {
			this.collapse(ID);
		}
		else {
			this.expand(ID);
		}
	}
}
tv.openFolder = function(ID)
{
	if (this.hasChildNodes(ID) && !this.getNode(ID).open) {
		this.expand(ID);
	}
	this.setSelected(ID);
}
tv.expand = function(ID) {
	var handler = document.getElementById("handler"+ID);
	var container = document.getElementById("container"+ID);
	var folder = document.getElementById("icon" + ID);
	handler.src = this.getRoot(ID).ID == ID ? Icon.Rminus.src : ( this.getNode(ID).isLast ? Icon.minusbottom.src : Icon.minus.src);
	container.style.display = '';
	if (this.hasChildNodes(ID)) {
		if(this.getNode(ID).Image == null) folder.src = Icon.folderopen.src;
	}
	this.getNode(ID).open = true;
	if(this.getRoot(ID).ID != ID && this.showAll == false) {
		var ch = this.getParentNode(ID).childNodes;
		for (var i=0; i<ch.length; i++) {
			if(this.getNode(ID) != ch[i] && this.hasChildNodes(ch[i].ID)) this.collapse(ch[i].ID);
		}
	}
}
tv.collapse = function(ID) {
	var handler = document.getElementById("handler"+ID);
	var container = document.getElementById("container"+ID);
	var folder = document.getElementById("icon" + ID);
	handler.src = this.getRoot(ID).ID == ID ? Icon.Rplus.src : ( this.getNode(ID).isLast ? Icon.plusbottom.src : Icon.plus.src);
	container.style.display = 'none';
	if (this.hasChildNodes(ID)) {
		if(this.getNode(ID).Image == null) folder.src = Icon.folderclosed.src;
	}
	this.getNode(ID).open = false;
}
tv.expandAll = function() { this.All(1);}
tv.collapseAll = function() { this.All(0);}
tv.All = function(v) {
	for(var i in this.Nodes) {
		if(this.Nodes[i].ID==0)continue;
		if(this.hasChildNodes(this.Nodes[i].ID)) {
			if (v) { 
				this.expand(this.Nodes[i].ID);
			}
			else {
				this.collapse(this.Nodes[i].ID);
			}
		}
	}
}
//////////////////////////////////////////////////////////////////////////////
//建立只读树
//////////////////////////////////////////////////////////////////////////////
tv.setup = function() {
	document.write(this.addNode(0));
}