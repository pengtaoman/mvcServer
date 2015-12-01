var CATALOG_TREE_WIDTH='230px';
function init(){
	document.getElementById('commonRegionDetailTD').style.width = '0px';
	document.getElementById('viewControlButtonTD').style.width = '0px';
	document.getElementById('viewControlButtonTD').style.display = '';
}
/**
	ˢ���¼�������
 */
function refreshZoneItemTree(){
	try {
		commonRegionDetail.src="about:blank";
		commonRegionTree.refreshCommonRegionTree();
	} catch(e) {
		alert('ҳ�����ڳ�ʼ�������Ժ����ԡ�');
	}
}

/**
	����ϸ��Ϣҳ����Ϊ�հ�ҳ
 */
function setDetailPageBlank(){
	commonRegionDetail.location.href = 'about:blank';
}

function closeWindow(){
	window.close();
}

/**
	��ʾ/����
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