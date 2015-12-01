function init(){
	document.getElementById('filterSelId').value=document.getElementById('filterSelIdHid').value;
	document.getElementById('filterSelValue').value=document.getElementById('filterSelValueHid').value;
}
//ÐÞ¸Ä·½·¨
function modify(webpath){
	document.EAPForm.action=webpath+"/om/datafilterinfo.do?method=modify";
	document.EAPForm.target='list';
	document.EAPForm.submit();
	window.close();
}

