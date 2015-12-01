var ModTreeClass=function(){
	var Me=this;
	
	Me.ROOT_ID="_ROOT_";
	Me.WEB_ROOT_PATH=null;

	try{
		Me.WEB_ROOT_PATH=APP_PATH;
	}catch(e){
		Me.WEB_ROOT_PATH="..";
	}
	Me.allMenuNodes={};

	Me.modMap={};
	Me.subMod={};


// modType=   11 普通ec列表 12带日期ec列表  13 普通页面  默认是 11

	Me.createMod=function(menuId,menuName,parentMenuId,pageLink,modType,openMethod,systemId,layer,pageLinkPara){
		//Me.ROOT_ID=systemId;
		var menu={};

		if ( menuId==systemId){
			menuId=Me.ROOT_ID;
		}

		if (parentMenuId=="" ||  parentMenuId==null ){
			parentMenuId=Me.ROOT_ID;
			Me.modMap[menuId]=menu;
		}
		if (pageLink && pageLink.length>0){
			if (pageLink.indexOf("?")<0){
				pageLink=pageLink+'?';
			}
			if (pageLinkPara && pageLinkPara.length>2){
				pageLink=pageLink+"&"+pageLinkPara;
			}
		}


		menu.menuId=menuId;
		menu.menuName=menuName;
		menu.parentMenuId=parentMenuId;
		menu.systemId=systemId;
		menu.openMethod=openMethod;
		menu.pageLink=pageLink;
		menu.layer=layer;
		menu.Depth=1;
		menu.SubNum=0;
		menu.childrenMap={};
		menu.childrenNum=0;
		menu.loadedSubModNum=0;
		if (!modType){
			modType=11;
		}
		menu.modType=modType; 

		if (pageLink && parentMenuId){
			Me.subMod[menuId]=new SubMod(menuId,menuName,parentMenuId,pageLink,modType);
		}

		Me.allMenuNodes[menuId]=menu;
	};
	

	Me.showNav=function(documentObj){
		for (var menuId in Me.modMap ){
			if (menuId==Me.ROOT_ID){
				continue;
			}
			documentObj.writeln("<a href=\"#"+menuId+"_an\" onclick=\"hideMenu();\">"+Me.modMap[menuId].menuName+"</a><br />");
		}
	};

	Me.buildMod=function(){
		for (var menuId in Me.allMenuNodes ){
			if (menuId==Me.ROOT_ID){
				continue;
			}
			var mObj=Me.allMenuNodes[menuId];
			if (mObj==null || typeof(mObj)=="undefined"){ 
				continue;
			}
			var parent=Me.allMenuNodes[mObj.parentMenuId];
			if (parent==null || typeof(parent)=="undefined"){ 
				continue;
			}
			mObj.Depth=parent.Depth+1;
			parent.SubNum++;
			parent.childrenMap[mObj.menuId]=mObj;
			parent.childrenNum++;
		}

	};

	Me.showStartMod=function(menu,documentObj){
		var htmlCode=replaceAll(ModTemplate[0],"#{mod_id}",menu.menuId);
		htmlCode=replaceAll(htmlCode,"#{mod_name}",menu.menuName);
		documentObj.writeln(htmlCode);
	};

	Me.showEndMod=function(menu,documentObj){
			documentObj.writeln(ModTemplate[2]);
	};
	
	Me.getDateSelect=function(mid){
		return replaceAll(DateSelectTemplate,"#{submod_id}",mid);
	};

	Me.showSubMod=function(subMod,documentObj){
		var htmlCode=null;
			htmlCode=replaceAll(SubModTemplate[0],"#{submod_id}",subMod.menuId);
			htmlCode=replaceAll(htmlCode,"#{submod_name}",subMod.menuName);
	
			var ts="<!-- -->";
			if (subMod.modType==12){
				ts=Me.getDateSelect(subMod.menuId);
			}

			htmlCode=replaceAll(htmlCode,"#{date_select}",ts );

			documentObj.writeln(htmlCode);
			if (subMod.pageLink && subMod.pageLink!="" ){
				documentObj.writeln(SubModTemplate[1]);
			}	
			documentObj.writeln(SubModTemplate[2]);
	};

	Me.showAllMod=function(menu,documentObj){
		Me.showStartMod(menu,documentObj);
		for (var mid in menu.childrenMap ){
			Me.showSubMod(menu.childrenMap[mid],documentObj);
		}
		Me.showEndMod(menu,documentObj);
	};


	Me.showModTree=function(){
		var root=Me.allMenuNodes[Me.ROOT_ID];
		for (var mid in root.childrenMap ){
			Me.showAllMod(root.childrenMap[mid],document);
		}
	};

	Me.loadSubMod=function(){

			for (var mid in Me.subMod ){
				var smod=Me.subMod[mid];
				smod.loadMe();
			}
	};

};


var CutText=function(mid,text){

       eval("var rex= /<"+"fo"+"rm"+".+id=\"?"+mid+"_form\"?[^>]*>/im ;");
		var mtext=text.match(rex);
		if (mtext==null){ return "";}
		text=text.substr(mtext.index);
		var end=text.indexOf("</form>")+"</form>".length;
		return text.substring(0,end);
/*
var	AJAX_ZONE_BEGIN : "_begin_ ";
var	AJAX_ZONE_END : " _end_";
var	AJAX_ZONE_PREFIX : "<!-- ECS_AJAX_ZONE_PREFIX_";
var AJAX_ZONE_SUFFIX : "_ECS_AJAX_ZONE_SUFFIX -->";

		if (text.responseText){
			text=text.responseText;
		}

		var begin=AJAX_ZONE_PREFIX + AJAX_ZONE_BEGIN+ mid +AJAX_ZONE_SUFFIX;
		var end=AJAX_ZONE_PREFIX + AJAX_ZONE_END+ mid +AJAX_ZONE_SUFFIX;

        var p1 = text.indexOf(begin);
        if (p1 != -1) {
            p1+=begin.length;
            var p2 = text.indexOf(end, p1);
            if (p2!=-1){
                return text.substring(p1, p2);
            }
        }
		return text;
*/
/*
       eval("var rex= /<"+"fo"+"rm"+".+id=\"?"+mid+"_form\"?[^>]*>/im ;");
		var mtext=text.match(rex);
		if (mtext==null){ return "";}
		text=text.substr(mtext.index);
		var end=text.indexOf("</form>")+"</form>".length;
		return text.substring(0,end);
	*/
};



var SubMod=function(mid,mname,pmid,murl,mtype){
	var Me=this;
	Me.WEB_ROOT_PATH=null;
	try{
		Me.WEB_ROOT_PATH=APP_PATH;
	}catch(e){
		Me.WEB_ROOT_PATH="..";
	}
	Me.modId=mid;
	Me.modName=mname;
	Me.parentMenuId=pmid;
	//Me.modURL=Me.WEB_ROOT_PATH+murl;
	Me.modURL=murl;
	Me.modType=mtype; // 1 普通页面 2 ec列表
	Me.loadState=0;	// 0 未载入 1 载入中 2 载入完成 3 载入异常
	Me.eccn=null;
	if (Me.modType==11 ||  Me.modType==12 ){
		
		if (Me.modURL.indexOf("?")<0){
			Me.modURL=Me.modURL+"?";
		}
		Me.modURL=Me.modURL+"&ecid="+mid+"_form";
		Me.eccn=new ECCN(mid+"_form");
	}

	Me.loadMe=function(para){
		try {

		if (!para){
			para='';
		}

		 var myAjax = new Ajax.Request( Me.modURL ,{ parameters:para, onComplete: Me.fillMod } );
		 
		}catch (e) {
			alert("无法载入指定的子模块。");
		}
	};
	
	Me.fillMod=function(originalRequest){
		var newhtml=originalRequest.responseText;
			
		if (Me.eccn){
			newhtml = CutText(Me.modId,originalRequest.responseText);
		}



		$(Me.modId+"_body").innerHTML=newhtml;
		
		if (Me.eccn){
			Me.eccn.isDebug=!true;
			Me.eccn.doPrep=false;
			Me.eccn.init();
			var tr=$(Me.modId+"_form"+"_totalrows");
			if (tr){
				$(Me.modId+"_total").innerHTML="共"+$(Me.modId+"_form"+"_totalrows").value+"条记录";
			}
		}
		if (newhtml==""){	
			newhtml = "[ 发生异常 ]";
		}
		Me.loadState=2;
	};
	
};


/* ==================================== */

function reloadSubMod(mid,para){
	try{
		ModTree.subMod[mid].loadMe(para);
	}catch(e){
		alert("无法刷新指定的子模块。");
	}

}

function reloadSubModByDate(mid,selectObj){
	reloadSubMod(mid,selectObj.value);
}


function showOrHideSubMod(obj,flag){
	showOrHideMod(obj,flag,"2");
}

function showOrHideMod(obj,flag,classp){
	obj=$(obj);
	if (obj==null){
		return;
	}
	var id=obj.id;
	did=id+"_body";
	did=$(did);
	if (did==null){
		return;
	}
	if (isValid(flag)){
		if (flag){
			Element.show(did);
		}else{
			Element.hide(did);
		}
	}else{
		Element.toggle(did); 
	}
	
	if(!classp){
		classp="";
	}
	if (did.style.display=="none"){
		obj.className="collapseImgButtonC"+classp;
	}else{
		obj.className="collapseImgButtonS"+classp;
	}

	obj.blur();

}




function showOrHideAll(){

for (var m in ModTree.allMenuNodes ) {
	var mod=ModTree.allMenuNodes[m];
	if (mod.parentMenuId == ModTree.ROOT_ID && mod.menuId!=ModTree.ROOT_ID ){
		showOrHideMod(m,hideAll);
	}

}

	hideAll=!hideAll;
}



function showOrHideMenu(){
	var menuobj=$("menu");
	if (menuobj.style.display!="block"){
		showMenu();
	}else{
		hideMenu();
	}
}

function showMenu(){
	var menuobj=$("menu");
	menuobj.style.display="block";
	var left="50px";
	menuobj.style.left=left;
}

function hideMenu(){
	var menuobj=$("menu");
	menuobj.style.display="none";
}
