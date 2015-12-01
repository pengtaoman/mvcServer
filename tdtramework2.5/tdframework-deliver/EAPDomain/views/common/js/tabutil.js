// weizj 2006-02-14

// 实现tab页切换效果
var CurrentTab=null;
var CurrentTabDiv=null
var changeTab=function(obj,divId){
	var tdObj=obj.parentElement;
	if (tdObj==CurrentTab) return;
	if (!isNull(CurrentTab)) {
		CurrentTab.className ="tab_bg2";
		CurrentTab.previousSibling.firstChild.src=AppPath+"/images/tab/tab_b1.gif";
		CurrentTab.nextSibling.firstChild.src=AppPath+"/images/tab/tab_b3.gif";
		if (!isNull(CurrentTabDiv)) {
			CurrentTabDiv.style.display="none";
		}
	}
	CurrentTab=tdObj;
	CurrentTabDiv=$byId(divId);
	tdObj.className ="tab_bg1";
	tdObj.previousSibling.firstChild.src=AppPath+"/images/tab/tab_w1.gif";
	tdObj.nextSibling.firstChild.src=AppPath+"/images/tab/tab_w3.gif";
	if (!isNull(CurrentTabDiv)) {
		CurrentTabDiv.style.display="block";
	}
}


//实现tab页下子条目切换效果
var CurrentTabSub=null;
var CurrentTabDivSub=null;
var changeTabSub=function(obj,divId){
	var tdObj=obj.parentElement;
	if (tdObj==CurrentTabSub) return;
	if (!isNull(CurrentTabSub)) {
		CurrentTabSub.className ="";
		CurrentTabSub.firstChild.nextSibling.disabled =false;
		if (!isNull(CurrentTabDivSub)) {
			CurrentTabDivSub.style.display="none";
		}
	}
	CurrentTabSub=tdObj;
	CurrentTabDivSub=$byId(divId);
	tdObj.className ="edit_bg_na2";
	tdObj.firstChild.nextSibling.disabled =true;
	if (!isNull(CurrentTabDivSub)) {
		CurrentTabDivSub.style.display="block";
	}
}
