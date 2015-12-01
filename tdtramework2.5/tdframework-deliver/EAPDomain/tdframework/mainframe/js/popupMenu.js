
function GetPopupCssText(){
    var styles = document.styleSheets;
    var csstext = "";
    for(i=0; i<styles.length; i++)
    {
        if (styles[i].id == "popupmanager")
            csstext += styles[i].cssText;
    }
    return csstext;
}


var oPopup = window.createPopup();
var oPopupDocument=oPopup.document;
var oPopupBody = oPopup.document.body;
var oPopupStyle=oPopup.document.createStyleSheet("style/crm/popupMenu.css");
//var oPopupStyle=oPopup.document.createStyleSheet("f.css");

var oPopup2 = window.createPopup();
var oPopupDocument2=oPopup2.document;
var oPopupBody2 = oPopup2.document.body;
var oPopupStyle2=oPopup2.document.createStyleSheet("style/crm/popupMenu.css");

function hidePop(){
    if (oPopup) oPopup.hide();
}

function showPop(){
    
//oPopupStyle.cssText=GetPopupCssText();
oPopupBody.innerHTML = document.all['popbody'].outerHTML;

    var toastWidth = document.all['popbody'].offsetWidth;
    var toastHeight = document.all['popbody'].offsetHeight;
    var toastVerticalMargin = 28;
    var toastHorizontalMargin = 16;
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
	
	oPopupDocument.getElementById("popupWin_CloseButton").onclick=hidePop;
    oPopup.show(screenWidth - toastWidth - toastHorizontalMargin, screenHeight - toastHeight - toastVerticalMargin,
                    toastWidth, toastHeight);
}

function hidePop2(){
    if (oPopup2) oPopup2.hide();
}
function showPop2(aObj){
	oPopupBody2.innerHTML = document.all['popbody2'].outerHTML;
	tdObj=aObj.parentElement;
	var x=fetch_object_posleft(tdObj);
	var y=fetch_object_postop(tdObj)+tdObj.offsetHeight+window.screenTop;
    var toastWidth = document.all['popbody2'].offsetWidth;
    var toastHeight = document.all['popbody2'].offsetHeight;
	
    oPopup2.show(x,y ,toastWidth, toastHeight); 
}

function fetch_object_posleft(elm)
{
	var left = elm.offsetLeft;
	while((elm = elm.offsetParent) != null)
	{
		left += elm.offsetLeft;
	}
	return left;
}

function fetch_object_postop(elm)
{
	var top = elm.offsetTop;
	while((elm = elm.offsetParent) != null)
	{
		top += elm.offsetTop;
	}
	return top;
}
oPopupBody2.onclick=hidePop2;
