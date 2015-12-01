
var MenuNode=function(systemId,systemName,pid){
	var Me=this;
	Me.menuId=systemId;
	Me.menuName=systemName;
	Me.order=0;
	Me.parentId=isValid(pid)?pid:null;
	
	
	Me.getMenuNode=function(documentObj){
		
		if (!isValid(documentObj)){
			documentObj=document;
		}
		var menu=documentObj.createElement("li");
		
		menu.innerHTML="<a href=\"#\" title=\""+Me.menuName+"\"><span id=\""+Me.menuId +"\"> "+Me.menuName+"</span></a>";
		menu.menuId = Me.menuId;
		menu.attachEvent("onclick",MenuBar.selectMenu);
		//menu.attachEvent("onmouseover",MenuBar.overMenu);
		//menu.attachEvent("onmouseout",MenuBar.outMenu);
		return menu;
	}
/*
	Me.getMenuNode=function(documentObj){
		if (!isValid(documentObj)){
			documentObj=document;
		}
		var menu=documentObj.createElement("td");
		menu.id=Me.menuId;
		menu.title=Me.menuName;
		menu.innerHTML=Me.menuName;
		menu.attachEvent("onclick",MenuBar.selectMenu);
		menu.attachEvent("onmouseover",MenuBar.overMenu);
		menu.attachEvent("onmouseout",MenuBar.outMenu);
		return menu;
	}
*/
	Me.getMenuNode2=function(documentObj){
		if (!isValid(documentObj)){
			documentObj=document;
		}
		var menu=documentObj.createElement("li");
		//menu.id=Me.menuId;
		menu.title=Me.menuName;

		var re = (/^\s+|\s+$/g);
		Me.menuName=Me.menuName.replace(re, "");
		if (Me.menuName.length>0){
			menu.innerHTML="<a href=\"#\"  title=\""+ Me.menuName+"\"><span id=\""+ Me.menuId+"\">"+Me.menuName+"</span></a>";
		}else{
			menu.innerHTML=" "+Me.menuName+"";
		}
		menu.attachEvent("onclick",deal_click_link);
		//menu.attachEvent("onmouseover",onSubMouse);
		//menu.attachEvent("onmouseout",outSubMouse);

		return menu;
	}
};

function onSubMouse(){
	event.srcElement.className="onme";
}

function outSubMouse(){
	event.srcElement.className="";
}

var MenuBar=new function(){
	var Me=this;


	Me.documentObj=document;

	Me.cookieId=null;
	Me.defaultMenuNum=7;
	Me.defaultWinWidth=768;

	Me.topMenulist=[];
	Me.topMenulistIdMap={};
	Me.topMenulistMap={};
	Me.subMenulistMap={};
	Me.subMenulistIdMap={};

	Me.zip=false;

	Me.lockMenu=null;

	var currentTopMenu=null;
	var currentSubMenu=null;

	Me.getCurrentTopMenu=function(){
		return Me.lockMenu;
	}
	Me.topMenuWidthPX=null;

	Me.overMenu=function(){
		
		var mobj=currentTopMenu;
		
		if (mobj !=null){

			if ($("sub_"+mobj.id)){
				$("sub_"+mobj.id).style.display="none";
			}
		}

		mobj=Me.lockMenu;
		if (mobj !=null){

			if ($("sub_"+mobj.id)){
				$("sub_"+mobj.id).style.display="none";
			}
		}


		mobj=event.srcElement;
		mobj.style.setAttribute("filter","Alpha(opacity=65)");

		if ($("sub_"+mobj.id)){

				$("sub_"+mobj.id).style.display="block";
		}

		currentTopMenu=mobj;

	}
	/*
	Me.outMenu=function(){
		var mobj=event.srcElement;
		mobj.style.setAttribute("filter","Alpha(opacity=100)");

		if ($("sub_"+mobj.id)){
				$("sub_"+mobj.id).style.display="none";
		}

		if (Me.lockMenu!=null){
			mobj=Me.lockMenu;
		}else{
			mobj=currentTopMenu;
		}

		if (mobj !=null){
			if ($("sub_"+mobj.id)){
				$("sub_"+mobj.id).style.display="block";
			}
		}
	}
	*/

	Me.outMenu=function(){
		var mobj=event.srcElement;
		mobj.className="";
	}

	Me.selectMenu=function(){
		
		var mobj=event.srcElement;
		/*
		if (currentTopMenu!=null){
			if ($("sub_"+currentTopMenu.id)){
				$("sub_"+currentTopMenu.id).style.display="none";
			}
		}
		*/
		if (Me.lockMenu!=null){

			Me.lockMenu.style.paddingTop="9px";
			Me.lockMenu.style.borderBottom="0px solid #fefefe";//#FF7C60
			Me.lockMenu.style.backgroundColor="";
			if ($("sub_"+Me.lockMenu.id)){
				$("sub_"+Me.lockMenu.id).style.display="none";
			}
		}

		//currentTopMenu=mobj;
		Me.lockMenu=mobj;
		//Me.lockMenu.style.paddingTop="5px";
		//Me.lockMenu.style.borderBottom="4px solid #fff9f3";
		//Me.lockMenu.style.backgroundColor="#B60606";
		var tspan=document.getElementById("topMenuBar").getElementsByTagName("span");
		var ta=document.getElementById("topMenuBar").getElementsByTagName("a");
		var y=mobj.id;
		for (var x=0;x<tspan.length ;x++ )
		{
	 		tspan[x].className=tspan[x].id==y?"sss":"";
	 		tspan[x].style.color=tspan[x].id==y?"#555":"";
	 		ta[x].className=tspan[x].id==y?"aaa":"";
		}
		
		if ($("sub_"+mobj.id)){
			$("sub_"+mobj.id).style.display="block";
		}else{
			//currentTopMenu=null;
			Me.lockMenu=null;
		}
		if (!Me.subMenulistMap[mobj.id] || Me.subMenulistMap[mobj.id].length<1 ){
				var linkId = "frameLeft.do?method=init&systemId=" + mobj.id.replace("System","");
				top.currentSysNameValue=mobj.title;
				top.main.location.href = APP_PATH+"/blank.html";
				top.mainleft.location.href = linkId;
				
		}else if(Me.subMenulistMap[mobj.id].length>=1){
		
			var subid=Me.subMenulistMap[mobj.id][0].menuId;
			$(subid).fireEvent("onclick");
				
		}

		top.main.location.href = APP_PATH+"/blank.html";

	}
		
	Me.getTopMenu=function(id){
		for (var i=0;i<Me.topMenulist.length ;i++ ){
			if(Me.topMenulist[i].menuId==id){
				return Me.topMenulist[i];
			}
		}		
	}

	Me.getTopMenuNum=function (){
		return Me.topMenulist.length;
	}


	Me.getSubMenu=function(id,subid){
		var sublist=Me.subMenulistMap[id];
		for (var i=0;i<sublist.length ;i++ ){
			if(sublist[i].menuId==subid){
				return sublist[i];
			}
		}		
	}

	Me.addTopMenu=function(node){
		if (isValid(Me.subMenulistMap[node.menuId])){
			return;
		}
		
		Me.subMenulistMap[node.menuId]=[];
		//Me.topMenulistMap[node.menuId]=[];
		node.order=Me.topMenulist.length;
		Me.topMenulistIdMap[node.menuId]=node;
		//Me.topMenulistMap[node.menuId].push(node);
		Me.topMenulist.push(node);
	}
	Me.addSubMenu=function(node){
		
		if(!Me.subMenulistMap[node.parentId]){
			Me.subMenulistMap[node.parentId]=[];
		}
		node.order=Me.subMenulistMap[node.parentId].length;
		Me.subMenulistMap[node.parentId].push(node);
		Me.subMenulistIdMap[node.menuId]=node;

	}

	Me.createTopMenu=function(systemId,systemName){
		this.addTopMenu(new MenuNode(systemId,systemName,null));
	}

	Me.createSubMenu=function(systemId,systemName,parentId){
		this.addSubMenu(new MenuNode(systemId,systemName,parentId));
	}

	Me.buildTopMenu=function(){

		if (!isValid(Me.documentObj)){
		
			Me.documentObj=document;
		}

		var l2_menu1=$("l2_menu1");
		var l2_menu2=$("l2_menu2");
		var l2_menu3=$("l2_menu3");

		//for (var key in Me.topMenulistMap ){
		//	alert("key is " + key);
			var topMenulist=Me.topMenulist;
			var menu=Me.documentObj.createElement("ul");
			var menu_2=Me.documentObj.createElement("ul");
			var menu_3=Me.documentObj.createElement("ul");
			//menu.id="top_"+key;
			//menu.style.display="none";
			l2_menu1.appendChild(menu);
			l2_menu2.appendChild(menu_2);
			l2_menu3.appendChild(menu_3);
			createPRMsystem(menu_3,Me.documentObj);
			for (var i=0;i<topMenulist.length ;i++ ){
				var topMenu = topMenulist[i].getMenuNode(Me.documentObj);
				//alert(topMenu.menuId);
				if(topMenu.menuId=="System86"||topMenu.menuId=="System110"){
					menu_2.appendChild(topMenu);
					//alert("topMenu.menuId is " + topMenu.menuId);
				}else{
					menu.appendChild(topMenu);
				}
			}
			l2_menu1.style.display="block";
		//}

	}
	function createPRMsystem(menu_3,documentObj){
	
		menu_3.appendChild(getPRMTopMenu(documentObj,"ºÏ×÷»ï°é¹ÜÀí"));
		menu_3.appendChild(getPRMTopMenu(documentObj,"ºÏ×÷»ï°éÒµÎñ¹ÜÀí"));
		menu_3.appendChild(getPRMTopMenu(documentObj,"ºÏ×÷»ï°é²úÆ·¹ÜÀí"));
		menu_3.appendChild(getPRMTopMenu(documentObj,"ÅàÑµ¹ÜÀí"));
		menu_3.appendChild(getPRMTopMenu(documentObj,"ÎÊÌâ¹ÜÀí"));
		menu_3.appendChild(getPRMTopMenu(documentObj,"½áËã¹ÜÀí"));
		menu_3.appendChild(getPRMTopMenu(documentObj,"ÏµÍ³¹ÜÀí"));
					
	}
	function getPRMTopMenu(documentObj,menuName){
		if (!isValid(documentObj)){
			documentObj=document;
		}
		var menu=documentObj.createElement("li");
		
		menu.innerHTML="<a href=\"#\" title=\""+menuName+"\"><span id=\""+menuName +"\"> "+menuName+"</span></a>";
		menu.menuId = menuName;
		menu.attachEvent("onclick",MenuBar.selectMenu);
		return menu;
	
	}
	
/*	
	Me.buildTopMenu=function(){

		if (!isValid(Me.documentObj)){
			Me.documentObj=document;
		}
		var menutr=$("topMenuBar").childNodes[0].childNodes[0];

		menutr.removeNode(true);
		menutr=Me.documentObj.createElement("tr");
		$("topMenuBar").childNodes[0].appendChild(menutr);

		

		var menuNum=Me.topMenulist.length;
		menuNum=menuNum<1?1:menuNum;
		var twidth="100%";
		var dw=(Math.round(100/Me.defaultMenuNum))+"%";


		if (menuNum<=Me.defaultMenuNum){
			menuNum=Me.defaultMenuNum;
		}else {
		
			if (Me.topMenuWidthPX && Me.topMenuWidthPX.length>0){
				twidth=(parseInt(Me.topMenuWidthPX)*menuNum)+"px";
				if (parseInt(twidth)<=Me.defaultWinWidth){
						twidth="100%";
						dw=(Math.round(100/menuNum))+"%";
				}else{
					dw=Me.topMenuWidthPX+"px";
				}
				
			}else{

				Me.topMenuWidthPX=Math.round(Me.defaultWinWidth/Me.defaultMenuNum);
			
				twidth=(Me.topMenuWidthPX*menuNum)+"px";

				if (parseInt(twidth)<=Me.defaultWinWidth){
						twidth="100%";
						dw=(Math.round(100/menuNum))+"%";
				}else{
					dw=Me.topMenuWidthPX+"px";
				}

			}


		}
		
		var verticalAlign="middle";
		if (Me.zip){
			twidth="100%";
			dw=(Math.round(100/menuNum))+"%";
			dw="";
			verticalAlign="middle";
		}
		
		$("topMenuBar").style.width=twidth;
		for (var i=0;i<Me.topMenulist.length ;i++ ){
			var tdo=Me.topMenulist[i].getMenuNode(Me.documentObj);
			tdo.style.width=dw;
			tdo.style.verticalAlign=verticalAlign;
			menutr.appendChild(tdo);
		}

		for (var i=0;i<menuNum-Me.topMenulist.length ;i++ ){
			var menu=Me.documentObj.createElement("td");
			menu.id="null_temp_"+i;
			menu.style.width=dw;
			menu.style.cursor="default";
			//menu.attachEvent("onmouseover",MenuBar.overMenu);
			//menu.attachEvent("onmouseout",MenuBar.outMenu);
			menu.innerHTML="&#160;"
			menutr.appendChild(menu);
		}
		
		if (Me.lockMenu!=null){
			Me.lockMenu=document.getElementById(Me.lockMenu.id);
			Me.lockMenu.style.paddingTop="5px";
			Me.lockMenu.style.borderBottom="4px solid #fff9f3";
		}
	}
*/
	Me.buildSubMenu=function(){

	
		if (!isValid(Me.documentObj)){
			Me.documentObj=document;
		}

	var nav1=$("nav1");

	for (var key in Me.subMenulistMap ){
		var subMenulist=Me.subMenulistMap[key];
		var menu=Me.documentObj.createElement("ul");
		menu.id="sub_"+key;
		menu.style.display="none";
		nav1.appendChild(menu);
		for (var i=0;i<subMenulist.length ;i++ ){
			menu.appendChild(subMenulist[i].getMenuNode2(Me.documentObj));

		}
	}

	}
	Me.sortMenu=function(){

		Me.topMenulist=Me.topMenulist.sort(sortCore);
	}
	function sortCore(menu1,menu2){
		if (menu1.order<menu2.order){
			return -1;
		}else if (menu1.order>menu2.order){
			return 1;
		}else{
			return 0;
		}
	}

	Me.getMenuOrderList=function(){
		var cc={};
		for (var i=0;i<Me.topMenulist.length ;i++ ){
			var menu=Me.topMenulist[i];
			cc[menu.menuId]=menu.order;
		}
		return cc;
	}

	Me.setMenuOrderList=function(cc){
		for (var key in cc ){
			if (Me.getTopMenu(key)){
				Me.getTopMenu(key).order=cc[key];
			}
		}
		Me.sortMenu();

	}

	Me.saveToCookie=function(id){
		try{

			if(!isValid(id)) {
					id=Me.cookieId;
			}
			var cc=Me.getMenuOrderList();

			cc=toJSON(cc);

			CookieUtil.setCookie(id,cc);
		}catch(e){
			alert("Ê§ï¿½Ü£ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Îªï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Ê¹ï¿½ï¿½Cookieï¿½ï¿½");
		}
	}

	Me.loadFromCookie=function(id){
		try{
			if(!isValid(id)) {
					id=Me.cookieId;
			}
			var cc=CookieUtil.getCookie(id);
			if (cc){
				var tcc=buildJSONMap(cc);
				Me.setMenuOrderList(tcc);
			}
		}catch(e){
			alert("Ê§ï¿½Ü£ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Îªï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Ê¹ï¿½ï¿½Cookieï¿½ï¿½");
		}

	}

	Me.activeTopMenuByIndex=function(idx){
		if (Me.topMenulist[idx]){
			document.getElementById(Me.topMenulist[idx].menuId).fireEvent("onclick");
		}
	}

	Me.activeTopMenuById=function(id1,id2,id3,para){
		if (Me.topMenulistIdMap[id1]){
			document.getElementById(id1).fireEvent("onclick");
		}
		if (Me.subMenulistIdMap[id2]){
			var obj=document.getElementById(id2);
			var linkId= "frameLeft.do?method=init&systemId=" + id2+"&defaultMenuId="+id3+"&defaultParameter&"+para;
			top.currentSysNameValue=obj.title;
			parent.mainleft.location.href = linkId;
			top.main.location.href = APP_PATH+"/blank.html";
		}
	}
}


function scrollMenu(posx){
	var step=MenuBar.defaultWinWidth-MenuBar.defaultWinWidth/MenuBar.defaultMenuNum;

	if (MenuBar.defaultMenuNum<2){
		step=MenuBar.defaultWinWidth;
	}
	posx=posx*step;
	scrollMenuPX(posx);

}

function scrollMenuPX(posx){

	if (MenuBar.getTopMenuNum()<=MenuBar.defaultMenuNum){
		return;
	}

	var mdiv=$("topMenuDiv");
	mdiv.scrollLeft+=posx;

}

var scrollId=null;
function scrollMenuA(posx){
		posx=posx*10;
		scrollId=window.setInterval("scrollMenuPX("+posx+")",80);
}

function stopScrollMenuA(){

	if (scrollId){
		window.clearInterval(scrollId);
		scrollId=null;
	}
}

function scrollMenuW(){

	scrollMenuPX(-event.wheelDelta);

}
function scrollSubMenuW(){

	scrollSubMenuPX(-event.wheelDelta);

}
function scrollSubMenuPX(posx){
	var mdiv=$("nav1");
	mdiv.scrollLeft+=posx;

}