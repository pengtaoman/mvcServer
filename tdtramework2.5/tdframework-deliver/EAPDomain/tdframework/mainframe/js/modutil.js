// ========================================================================================
//	可定制页面相关类
// ========================================================================================
var ModuleUtil=new function(){
	this.findPosX=function(obj) {
		var curleft = 0;
		if (obj.offsetParent) {
			while (obj.offsetParent) {
				curleft += obj.offsetLeft;
				obj = obj.offsetParent;
			}
		} else if (obj.x) curleft += obj.x;
		
		return curleft;
	}

	this.findPosY=function(obj) {
		var curtop = 0;
		if (obj.offsetParent) {
			while (obj.offsetParent) {
				curtop += obj.offsetTop;
				obj = obj.offsetParent;
			}
		} else if (obj.y) curtop += obj.y;
		return curtop;
	}

	this.getModuleArr=function(column) {
		var arr = [];
		var ln = column.childNodes.length;
		for (var z=0; z<ln; z++) {
			if (!column.childNodes[z].isDragging)  {
				arr.push(column.childNodes[z]);
			}
		}
		return arr;
	}

	this.getGhostPos=function(arr,mGhostObj) {
		var ln = arr.length;
		for (var z=0; z<ln; z++) {
			if (arr[z]==mGhostObj) return z;
		}
	}


}

// ========================================================================================


var ModuleManager=function(id){
	
	var Me = this;
	Me.Id=id;
	var managerId=id;

	var ColumnX=[];
	var ColumnList=[];
	var ModuleGhost = null;

	var ModuleBodyList=[];
	var ModuleHeadList=[];
	var MoudleMap={};

	this.Menu=null;

	
	this.alpha=false;

	this.setMenu=function(menuObj){
		Me.Menu	= menuObj;
	}

	this.getModulesOrder=function(){
		var cc={};
		for (var i=0;i<ColumnList.length ;i++ ){
			var col=ColumnList[i];
			cc[col.id]=[];
			for (var z=0; z<col.childNodes.length; z++) {
				cc[col.id].push(col.childNodes[z].id);
			}
		}
		return cc;
	}

	this.getModulesMenuState=function(){
		var mm=[];
		for (var key in MoudleMap){
			if (MoudleMap[key].isOnMenu()){
				mm.push(key);
			}
		}
		return mm;
	}

	this.putModules=function(pMap){
		for (var colId in pMap){
			var colm=pMap[colId];
			for (var z=0; z<colm.length; z++) {
				
				Me.moveModuleToColumnById(colm[z],colId);
				
			}
		}
	}
	
	this.putModulesToMenu=function(pList){
		for (var i=0;i<pList.length;i++){
			var mid=pList[i];
			MoudleMap[mid].moveToMenu();
		}
	}

	this.moveModuleToColumnById=function(moduleBodyId,colId,idx){
		Me.moveModuleToColumn(document.getElementById(moduleBodyId),document.getElementById(colId),idx);
	}
	this.moveModuleToColumn=function(moduleBodyObj,colObj,idx){
		if (moduleBodyObj==null || colObj==null) return;
		var colN=colObj.childNodes.length;
		if(idx == null || idx<0 || colN==0 || idx>=colN ){
			colObj.appendChild(moduleBodyObj);
			return;
		}
		colObj.insertBefore(moduleBodyObj, colObj.childNodes[idx]);
	}



	this.addModuleToColumn=function(moduleBodyObj,moduleHeadObj,colObj){
		alert(" --- 开发中...");
	}
	this.removeModule=function(){
		alert(" --- 开发中...");
	}
	this.saveModules=function(){
		alert(" --- 开发中...");
	}

	this.initModuleGhost=function(){
		if (ModuleGhost==null){
			ModuleGhost = document.createElement("div");
			ModuleGhost.className= "moduleGhost";
		}
		ModuleGhost.id = "moduleGhost_"+managerId;
	}

	this.setModuleGhost=function(modGhostObj){
		ModuleGhost = modGhostObj;
	}

	this.createModule=function(moduleBodyObj,moduleHeadObj){
		ModuleBodyList.push(moduleBodyObj);
		ModuleHeadList.push(moduleHeadObj);
	}

	this.addModule=function(moduleObj){
		ModuleBodyList.push(moduleObj.Body);
		ModuleHeadList.push(moduleObj.Title);
		moduleObj.Menu=Me.Menu;
		MoudleMap[moduleObj.Id]=moduleObj;
	}

	this.addColumn=function(colObj){
		ColumnList.push(colObj);
	}

	this.build=function(){

		this.initModuleGhost();
		for (var i=0;i<ColumnList.length ;i++ ){
			ColumnX.push(ModuleUtil.findPosX(ColumnList[i]));
		}

		for (var i=0;i<ModuleHeadList.length ;i++ ){
			var moduleBody=ModuleBodyList[i];
			var moduleHead=ModuleHeadList[i];

			ModuleDrag.init(moduleHead,moduleBody);

			moduleBody.onDragStart = function(x,y,mousex, mousey) {
				for (var i=0;i<ColumnList.length ;i++ ){
					ColumnList[i].style.backgroundColor ="transparent";
					ColumnList[i].style.backgroundImage ="url(./images/mbg.gif)";
				}
				var left = ModuleUtil.findPosX(this);
				var top = ModuleUtil.findPosY(this);
				var w = this.offsetWidth;
				this.style.width = (w-4)+"px";
				this.style.left = (left-5)+"px";
				this.style.top = (top-5)+"px";
				ModuleGhost.style.height = (this.offsetHeight+1-0)+"px";
				this.parentNode.insertBefore(ModuleGhost, this);
				this.style.position = "absolute";
				this.isDragging = true;

				ModuleGhost.col=this.parentNode;

			}

			moduleBody.onDrag = function(x,y, mousex, mousey) {
				col=ModuleGhost.col;
				
				for (var i=0;i<ColumnList.length ;i++ ){
					if ((x+this.offsetWidth/2)>=ColumnX[i]) col=ColumnList[i];
				}

				if (ModuleGhost.col!=col) {
					ModuleGhost.removeNode();
					ModuleGhost.col = col;

					col.appendChild(ModuleGhost);
				}

				var elems = ModuleUtil.getModuleArr(col);
				var myPos = ModuleUtil.getGhostPos(elems,ModuleGhost);

				if (myPos!=0 && y<=ModuleUtil.findPosY(elems[myPos-1])) {
					ModuleGhost.removeNode();
					col.insertBefore(ModuleGhost, elems[myPos-1]);
				}
				if (myPos!=(elems.length-1) && y>=ModuleUtil.findPosY(elems[myPos+1])) {
					if (elems[myPos+2]) {
						col.insertBefore(ModuleGhost, elems[myPos+2]);
					} else {
						col.appendChild(ModuleGhost);
					}
				}

				//this.style.filter ="Alpha(opacity=50)";
				if (Me.alpha){
					this.style.setAttribute("filter","Alpha(opacity=50)");
					this.style.setAttribute("-moz-opacity","0.5");
				}


			}

			moduleBody.onDragEnd = function(x,y) {
				for (var i=0;i<ColumnList.length ;i++ ){
					ColumnList[i].style.backgroundColor ="transparent";
					ColumnList[i].style.backgroundImage ="";
				}
				var col = ModuleGhost.col;
				this.isDragging = false;
				col.replaceChild(this, ModuleGhost);
				this.style.position = "static";
				this.style.width = "auto";
			}

		}
	}
	
}

//===============================================================


var ModuleDrag={
    "obj":null,
	"init":function(a, aRoot){
			a.onmousedown=ModuleDrag.start;
			a.root = aRoot;
			if(isNaN(parseInt(a.root.style.left)))a.root.style.left="0px";
			if(isNaN(parseInt(a.root.style.top)))a.root.style.top="0px";
			a.root.onDragStart=new Function();
			a.root.onDragEnd=new Function();
			a.root.onDrag=new Function();
		},
	"start":function(a){	
			var b=ModuleDrag.obj=this;
			a=ModuleDrag.fixE(a);
			var c=parseInt(b.root.style.top);
			var d=parseInt(b.root.style.left);
			b.root.onDragStart(d,c,a.clientX,a.clientY);
			b.lastMouseX=a.clientX;
			b.lastMouseY=a.clientY;
			document.onmousemove=ModuleDrag.drag;
			document.onmouseup=ModuleDrag.end;
			return false;
		},	
	"drag":function(a){
			a=ModuleDrag.fixE(a);
			var b=ModuleDrag.obj;
			var c=a.clientY;
			var d=a.clientX;
			var e=parseInt(b.root.style.top);
			var f=parseInt(b.root.style.left);
			var h,g;
			h=f+d-b.lastMouseX;
			g=e+c-b.lastMouseY;
			b.root.style.left=h+"px";
			b.root.style.top=g+"px";			
			b.lastMouseX=d;
			b.lastMouseY=c;
			b.root.onDrag(h,g,a.clientX,a.clientY);
			return false;
		},
	"end":function(){			
			document.onmousemove=null;
			document.onmouseup=null;
			ModuleDrag.obj.root.onDragEnd(parseInt(ModuleDrag.obj.root.style.left),parseInt(ModuleDrag.obj.root.style.top));
			ModuleDrag.obj=null;
		},
	"fixE":function(a){
			if (typeof a=="undefined") a=window.event;
			if (typeof a.layerX=="undefined") a.layerX=a.offsetX;
			if (typeof a.layerY=="undefined") a.layerY=a.offsetY;
			return a;
		}

};

var Module=function(id){
	var ME=this;
	ME.Id=id;
	ME.Body=null;
	ME.Head=null;
	ME.Title=null;
	ME.Content=null;

	ME.Info={
		"title":null,
		"minButton": false,
		"closeButton": false,
		"url":null,
		"col":null,
		"order":null,
		"bodyClass":null,
		"head":null,
		"bodyContent":null,
		"show":null
	}

	ME.closeMe=function() {
		ME.Body.style.display="none";
		ME.Content.style.display="block";
	}

	ME.minMe=function() {
		if (ME.Content.style.display=="block"){
			ME.Content.style.display="none";
		}else if (ME.Content.style.display=="none"){
			ME.Content.style.display="block";
		}else{
			ME.Content.style.display="none";
		}
	}
	
	ME.build=function(templateBodyObj,headId,contentId){


		ME.Title = document.createElement("div");
		ME.Title.className = "title";
		ME.Title.innerHTML=ME.Info["title"];

		var minButton=document.createElement("div");
		minButton.innerHTML="<img src=\"./images/mb.gif\" />";
		minButton.className="close"
		minButton.onclick=ME.minMe;

		var closeButton=document.createElement("div");
		closeButton.innerHTML="<img src=\"./images/cb.gif\" />";
		closeButton.className="close";
		//closeButton.onclick=ME.closeMe;
		closeButton.onclick=ME.moveToMenu;



		ME.Body=templateBodyObj.cloneNode(true);
		ME.Body.id=ME.Id+"_body";
		//alert(headId);
		ME.Head=ME.Body.children(headId);
		ME.Head.id=ME.Id+"_head";



		if (ME.Info["closeButton"]!=null ){
			if (ME.Info["closeButton"]==true){
				ME.Head.appendChild(closeButton);
			}else{
				//ME.Info["closeButton"].onclick=ME.closeMe;
				//ME.Info["closeButton"].onclick=ME.moveToMenu;
				//ME.Head.appendChild(ME.Info["closeButton"]);	
			}
		}

		if (ME.Info["minButton"]!=null ){
			if (ME.Info["minButton"]==true){
				ME.Head.appendChild(minButton);
			}else{
				//ME.Info["minButton"].onclick=ME.minMe;
				//ME.Head.appendChild(ME.Info["minButton"]);
			}
		}

		ME.Head.appendChild(ME.Title);




		ME.Content=ME.Body.children(contentId);
		ME.Content.id=ME.Id+"_content";

		if (ME.Info["bodyContent"]!=null){
			ME.Content.innerHTML=ME.Info["bodyContent"];
		}
		if (ME.Info["col"] && ME.Info["col"]!=null ){
			ME.Info["col"].appendChild(ME.Body);
		}else {
			document.body.appendChild(ME.Body);
		}
		//alert(ME.Body.outerHTML);
	}

	ME.Menu=null;
	ME.isOnMenu=function(){
		if (ME.Body.style.display=="none") return true;
		return false;
	}
	ME.moveToMenu=function(){
		ME.Menu.appendModule(ME);
		ME.Body.style.display="none";
		ME.Content.style.display="block";
	}

}

//===============================================================


var ModuleMenu=function(id){
	var ME=this;
	ME.Id=id;
	ME.Body=null;
	ME.Head=null;
	
	var ModuleBodyList=[];

	ME.showMenu=function(){
		ME.Body.style.display="block";
	}
	ME.hideMenu=function(){
		ME.Body.style.display="none";
	}

//**********************************

	ME.init=function(templateBodyObj,headId){
		ME.Body=templateBodyObj.cloneNode(true);
		ME.Head=ME.Body.children(headId).cloneNode(true);
		ME.Body.removeChild(ME.Body.children(headId));
		ME.hideMenu();
		document.body.appendChild(ME.Body);
	}
	ME.appendModule=function(modObj){
		//ModuleBodyList.push(modObj);
			var itemTemp=ME.Head.cloneNode(true);
			itemTemp.innerHTML=modObj.Info["title"];
			itemTemp.id="modmenu_"+modObj.Id;
			itemTemp.modId=modObj.Id;
			itemTemp.modBodyId=modObj.Body.id;
			itemTemp.modContentId=modObj.Content.id;
			itemTemp.onclick=ME.activeMenuItem;
			ME.Body.appendChild(itemTemp);
	}
	ME.activeMenuItem=function(){
		$(this.modBodyId).style.display="block";
		$(this.modContentId).style.display="block";
		ME.Body.removeChild(this);
	}


//**********************************
	ME.clickMenuItem=function(){
			$(this.modBodyId).style.display="block";
			$(this.modContentId).style.display="block";
	}
	ME.addModule=function(mObj){
		ModuleBodyList.push(mObj);
	}
	ME.buildMenu=function(templateBodyObj,headId){
		ME.Body=templateBodyObj.cloneNode(true);
		var itemT=ME.Body.children(headId).cloneNode(true);
		ME.Body.removeChild(ME.Body.children(headId));
		//ME.Body.innerHTML="";
		for (var i=0;i<ModuleBodyList.length ;i++ ){
			var mod=ModuleBodyList[i];
			var itemTemp=itemT.cloneNode(true);
			itemTemp.innerHTML=mod.Info["title"];
			itemTemp.id="modmenu_"+mod.Id;

			itemTemp.modId=mod.Id;
			itemTemp.modBodyId=mod.Body.id;
			itemTemp.modContentId=mod.Content.id;

			itemTemp.onclick=ME.clickMenuItem;
			ME.Body.appendChild(itemTemp);
		}
		ME.hideMenu();
		document.body.appendChild(ME.Body);
		//alert(ME.Body.outerHTML);
	}

}


//===============================================================

function saveMeToCookie(myMgr){
	var cc=toJSON(myMgr.getModulesOrder());
	var mm=toJSON(myMgr.getModulesMenuState());
	CookieUtil.setCookie(myMgr.Id,cc);
	CookieUtil.setCookie(myMgr.Id+"_menu",mm);
}
function loadMeFromCookie(myMgr){
	var cc=CookieUtil.getCookie(myMgr.Id);
	var mm=CookieUtil.getCookie(myMgr.Id+"_menu");
	var tcc=buildJSONMap(cc);
	var tmm=buildJSONMap(mm);
	myMgr.putModules(tcc);
	myMgr.putModulesToMenu(tmm);
}
