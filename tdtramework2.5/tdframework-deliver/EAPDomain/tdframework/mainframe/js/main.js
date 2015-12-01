
function init(){
	//document.getElementById('main').src=url;
}

function addToFavorite(){

		var webpath=APP_PATH;
	
		var myObj=parent.mainleft.myform;
		if (myObj.menuId.value==''){
			alert ('您不能将此项目添加入收藏!');
			return false;
		}

		var menuId,systemId,favoriteName,pageLink
		favoriteName=myObj.favoriteName.value;
		menuId=myObj.menuId.value;
		systemId=myObj.systemId.value;
		pageLink=myObj.currentLocation.value;

		try{	
			var favDiv=parent.mainleft.document.getElementById("favMenu").innerHTML;
			//alert(favDiv);
			if (favDiv.indexOf("showFavMenu('"+menuId+"'")>0 || favDiv.indexOf("'"+pageLink+"')")>0){
				alert ('此项目已经存在，不能重复收藏!');
				return false;
			}
		}catch(ex){
		}

		var isContinue=true;

		//var msg='您是否要将"'+favoriteName+'"加入收藏夹?'
		//isContinue=confirm(msg);

		if (isContinue){
			var theResponse = ''
			while (theResponse == '' )
			//theResponse = window.showModalDialog(webpath+"/views/mainframe/jsp/mainframe/inputWindow.htm",favoriteName,"dialogHeight: 50px; dialogWidth: 60px; status: no;");
			theResponse = window.showModalDialog(webpath+"/tdframework/favorite/inputWindow.htm",favoriteName,'dialogWidth:300px;DialogHeight=150px;status:no');

			if  (theResponse==null || typeof(theResponse) =='undefined' ) return false;

			favoriteName = theResponse;

			parent.mainleft.refreshFavorite(menuId,favoriteName,systemId,pageLink);


			/*
			var rowsLength=parent.mainleft.tblFavorite.rows.length;//当前的长度
			var objRow = parent.mainleft.tblFavorite.insertRow();  //增加行
			var objCell = objRow.insertCell();
			if(typeof(myObj.lastImg)!="undefined") {
				myObj.lastImg.src=webpath+"/tdframework/mainframe/images/line.gif";
				myObj.lastImg.id='';
			}
		    objRow.cells[0].innerHTML = "<IMG src='"+webpath+"/tdframework/mainframe/images/spacer.gif' width='20px' height='1'/>";
		    objRow.insertCell();
		    var myHtml="<a href='' id='"+pageLink+"' onclick='deal_click_link(this,0,\"\");return false;' title='"+favoriteName+"'><span onmouseover='DoOver();' onmouseout='DoOut();' onclick='DoClick();'><font color='black' id='"+menuId+"'>"+favoriteName+"</font></span></a>";
	 	    //var pageHtml = "<IMG src=webpath+\"/views/common/images/line1.gif\" STYLE='cursor:hand' align=\"absMiddle\"/>";
	 	    var pageHtml = "<img src=\"" +webpath+"/views/common/images/page.gif\" />";
	 	    objRow.cells[1].innerHTML = '<IMG id=\"lastImg\" src=\"'+webpath+'/views/common/images/line1.gif\" STYLE=\"cursor:hand\" align="absMiddle"/>'+ pageHtml + myHtml;
			*/
			/*
			var linkId = "/favoriteMenuAdmin.do?operType=add";
			var linkValue = "&favoriteName=" + encodeURI(favoriteName);
			linkValue = linkValue + "&menuId=" + menuId;
			linkValue = linkValue + "&systemId=" + systemId;
			linkValue = linkValue + "&pageLink=" + pageLink;
			
			linkValue= webpath + linkId + linkValue;

			top.hide_page_message.location.href =linkValue;
			*/
			var formf =	document.getElementById("favorite");
			formf.operType.value="add";
			formf.favoriteName.value=favoriteName;
			formf.menuId.value=menuId;
			formf.systemId.value=systemId;
			formf.pageLink.value=pageLink;
			formf.submit();

		}

}

function changeWinWidth(){

	var fs=document.getElementById("topframeset");
	if (fs.cols==window.defaultWidth){
		fs.cols=window.maxWidth;
	}else{
		fs.cols=window.defaultWidth;
	}
}



///////////////////////////////////



//导航信息相关类
var isNull=function(data){
	return (data == null || typeof data == "undefined")? true : false;
}
var GlobeNav=function(){
	var Me=this;
	
	Me.CurrentNav=0;
	Me.NavArr=[];
	
	Me.trimNavArr=function(){
		var temp=[];
		for (var i=0;i<Me.NavArr.length;i++){
			if(!isNull(Me.NavArr[i])){
				temp.push(Me.NavArr[i]);
			}
		}
		Me.NavArr=temp;
	}

	Me.addNav=function(navObjT){
		var navObj=new Navigation(navObjT.Name,navObjT.Method,navObjT.Level);
		var lvl=navObj.Level;
		
		if (isNull(lvl) || lvl<0 || Me.NavArr.length<=lvl ){
			Me.NavArr.push(navObj);
			Me.CurrentNav=Me.NavArr.length-1;
			navObj.Level=Me.CurrentNav;
			lvl=Me.CurrentNav;
			return;
		}
		Me.NavArr[lvl]=navObj;
		Me.CurrentNav=lvl;
		for (var i=lvl+1;i<Me.NavArr.length;i++){
			Me.NavArr[i]=null;
		}

	}

	Me.createNav=function(nameT,methodT,levelT){
		var navObj=new Navigation(nameT,methodT,levelT);
		var lvl=navObj.Level;
		
		if (isNull(lvl) || lvl<0 || Me.NavArr.length<=lvl ){
			Me.NavArr.push(navObj);
			Me.CurrentNav=Me.NavArr.length-1;
			navObj.Level=Me.CurrentNav;
			lvl=Me.CurrentNav;
			return;
		}
		Me.NavArr[lvl]=navObj;
		Me.CurrentNav=lvl;
		for (var i=lvl+1;i<Me.NavArr.length;i++){
			Me.NavArr[i]=null;
		}

	}

	Me.toHTML=function(winObj){
		//Me.trimNavArr();
		var res=""
		for (var i=0;i<Me.NavArr.length;i++){
			if (Me.NavArr[i]==null){
				continue;
			}
			if (Me.CurrentNav==Me.NavArr[i].Level){
				res+=Me.NavArr[i].toCHTML();
			}else{
				res+=Me.NavArr[i].toHTML(winObj)+" &gt; ";
			}
		}
		return res;
	
	}

}

var Navigation=function(nameT,methodT,levelT){
	var Me=this;
	Me.Name=nameT;
	Me.Method=methodT;
	Me.Level=levelT;
	
	Me.parentH="";

	Me.StyleClass="";
	Me.toHTML=function(winObj){
		if(!isNull(winObj.parent.GlobeMap)){
			Me.parentH="parent.";
		}
		var res="<a href=\"#\" onclick=\""+Me.parentH+Me.Method+";return false;\" >"+Me.Name+"</a>";
		return res;
	}

	Me.toCHTML=function(){
		var res=Me.Name;
		return res;
	}

};


