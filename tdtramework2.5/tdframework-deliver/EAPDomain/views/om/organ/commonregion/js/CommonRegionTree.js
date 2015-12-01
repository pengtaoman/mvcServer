var PATH;

var mztree;

function setMzTree(t) {
	mztree = t;
}

function init(path){
	PATH=path;
}
function refreshCommonRegionTree(){
	document.mainForm.action=PATH+"/om/commonRegionAction.do?method=initCommonRegionTree";
	document.mainForm.target="_self";
    document.mainForm.submit();
}

function bSearchClick(){
    var commonRegionName = document.getElementById('commonRegionName').value;        
    var url = '';
    var afterTrim = commonRegionName.trim();
    if (afterTrim == '') {
    	alert("«Î ‰»Î≤È—Ø√˚≥∆");
    	return;
    	//url = PATH+"/om/commonRegionAction.do?method=initCommonRegionTree";
    } else {
    	url = PATH+"/om/commonRegionAction.do?method=queryResultPage&commonRegionName="+afterTrim;
    }
	//document.mainForm.action = url;							
	var returnValue = showModalDialog(url,window,'status:no;scroll:auto;DialogWidth:300px;DialogHeight:260px;');
    //document.mainForm.submit();
    if (returnValue != 'back') 
    {
    	mztree.focus(returnValue);
    }
}

function enterDown()
{
	var scode=(navigator.appname=="Nwtscape")?event.which:event.keyCode;
	if(scode == 13){
		return false;
	}
}

String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim=function(){
    return this.replace(/(^\s*)/g,"");
}
String.prototype.rtrim=function(){
    return this.replace(/(\s*$)/g,"");
}

