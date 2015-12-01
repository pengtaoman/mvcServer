var CATALOG_TREE_WIDTH='230px';
function init(){
	document.getElementById('commonRegionDetailTD').style.width = '0px';
	document.getElementById('viewControlButtonTD').style.width = '0px';
	document.getElementById('viewControlButtonTD').style.display = '';
}
/**
	刷新事件类型树
 */
function refreshZoneItemTree(){
	try {
		commonRegionDetail.src="about:blank";
		commonRegionTree.refreshCommonRegionTree();
	} catch(e) {
		alert('页面正在初始化，请稍候再试。');
	}
}

/**
	将详细信息页面置为空白页
 */
function setDetailPageBlank(){
	commonRegionDetail.location.href = 'about:blank';
}

function closeWindow(){
	window.close();
}

/**
	显示/隐藏
 */
function showOrHide(operObjId, operButtonId){
	
	var operButtonObj = document.getElementById(operButtonId);
	var targetWidth = -1;
	if (operObjId == 'commonRegionTreeTD') {
		targetWidth = CATALOG_TREE_WIDTH;
	}
	if (targetWidth != -1) {
		var nowWidth = document.getElementById(operObjId).style.width.replace(/\D*/g, '');
		if (nowWidth == '0') {
			document.getElementById(operObjId).style.width = targetWidth;
			operButtonObj.innerHTML = '&lt;';
		} else {
			document.getElementById(operObjId).style.width = '0%';
			operButtonObj.innerHTML = '&gt;';
		}
	}
}