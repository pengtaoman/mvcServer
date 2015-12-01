
var MenuTree=new function(){
	var Me=this;
	
	Me.ROOT_ID=null;
	Me.allMenuNodes={};


	Me.createMenu=function(menuId,menuName,parentMenuId,systemId,openMethod,pageLink,layer,projectNo,projectName,licenseNo,expiredDate,expireStatus){
		Me.ROOT_ID=systemId;
		if (parentMenuId=="" ){
			parentMenuId=Me.ROOT_ID;
		}
		var menu={};
		menu.menuId=menuId;
		menu.menuName=menuName;
		menu.parentMenuId=parentMenuId;
		menu.systemId=systemId;
		menu.openMethod=openMethod;
		menu.pageLink=pageLink;
		menu.layer=layer;
		menu.projectNo=projectNo;
		menu.projectName=projectName;
		menu.licenseNo=licenseNo;
		menu.expiredDate=expiredDate;
		menu.expireStatus=expireStatus;
		menu.Depth=1;
		menu.SubNum=0;
		menu.childrenMap={};

		Me.allMenuNodes[menuId]=menu;
	}

	Me.addChild=function(parent,child){

		child.Depth=parent.Depth+1;
		parent.SubNum++;
		parent.childrenMap[child.menuId]=child;


	}

	Me.buildMenu=function(){
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
		}

	}

	Me.showMenu=function(menu,documentObj){
	
		var hasChildClass="";
		var hasChildEvent="dealNode";

		var startDiv="<div class=\"menuNode\" style=\"display:block\" id=\"sub_"+menu.menuId+"\">";

		if (menu.SubNum==0){
			hasChildClass="c";
			hasChildEvent="dealLeaf";
			startDiv="";
		}else{
			hasChildClass="open";
		}
		hasChildClass=menu.Depth + hasChildClass;

		var htmlCode="<span onclick=\""+hasChildEvent+"(this);\" id=\""+menu.menuId+"\" class=\"mLevel"+hasChildClass+"\" >";
		htmlCode+="<a href=\"#\" class=\"lv"+menu.Depth+"\" onclick=\"ignore();\">"+menu.menuName+"</a></span><br />\n";
		htmlCode+=startDiv;
		documentObj.writeln(htmlCode);
	}
	
	Me.showEndMenu=function(menu,documentObj){
			var endDiv="</div>";
			if (menu.SubNum==0){
				endDiv="";
			}
			documentObj.writeln(endDiv);
	}

	Me.showAllMenu=function(menu,documentObj){
			Me.showMenu(menu,documentObj);
			for (var mid in menu.childrenMap ){
				Me.showAllMenu(menu.childrenMap[mid],documentObj);
			}
			Me.showEndMenu(menu,documentObj);
	}

	Me.showMenuTree=function(){
		var root=Me.allMenuNodes[Me.ROOT_ID];
		for (var mid in root.childrenMap ){
			Me.showAllMenu(root.childrenMap[mid],document);
		}
		
	}

	Me.getFirstChildNode=function(node){
		if (!node){
			node=Me.allMenuNodes[Me.ROOT_ID];
		}
		for (var mid in node.childrenMap ){
			return node.childrenMap[mid];
		}
	}

	Me.getFirstLeaf=function(node){
		if (!node){
			node=Me.allMenuNodes[Me.ROOT_ID];
		}
		for (var mid in node.childrenMap ){
				var obj= node.childrenMap[mid];
				if (obj==null || obj==undefined){
					continue;
				}
				if ( obj.SubNum>0 ){
					return Me.getFirstLeaf(obj);
				}
				if (obj.SubNum==0){
					return obj;				
				}
		}
	}

	Me.getAllParentNodes=function(node){
		var nodes=[node.menuName];
		var cn=node;

		while(cn && cn.parentMenuId!=Me.ROOT_ID){
			cn=Me.allMenuNodes[cn.parentMenuId];
			nodes.push(cn.menuName);
		}
		return nodes;
	}

	Me.showNode=function(menuId){
		var menuIds=[];
		var temp_menuId=menuId;
		var idx=0;
		menuIds[idx]=temp_menuId;
		while ( !true) {
	
			var tmenu=Me.allMenuNodes[temp_menuId];
			if (!isValid(tmenu)){ break;}
			temp_menuId=tmenu.parentMenuId;
			if (!isValid(temp_menuId) || temp_menuId==Me.ROOT_ID){
				break;
			}
			idx++;
			menuIds[idx]=temp_menuId;
		}
		
		for (var i=menuIds.length-1;i>=0 ;i-- ){
			var mObj=document.getElementById(menuIds[i]);
			if ( isValid(mObj) ) {
				mObj.fireEvent("onclick");
			}
		}	

	}
}
