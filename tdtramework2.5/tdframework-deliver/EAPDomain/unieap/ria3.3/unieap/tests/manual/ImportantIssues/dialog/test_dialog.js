function popWidthDialog(){

		DialogUtil.showDialog({url:"unieap/ria3.3/unieap/tests/manual/ImportantIssues/dialog/test_grid_width.jsp",title:"自适应宽度"},
				test_wd.domNode);
	
}

function popHeightDialog(){
	DialogUtil.showDialog({url:"unieap/ria3.3/unieap/tests/manual/ImportantIssues/dialog/test_grid_height.jsp",title:"自适应高度"},
			test_hd.domNode);
}

function popDialog(){
	DialogUtil.showDialog({url:"unieap/ria3.3/unieap/tests/manual/ImportantIssues/dialog/test_grid_inner.jsp",title:"自适应对话框"},
			test_d.domNode);
}

function popTestDialog(){
	DialogUtil.showDialog({url:"unieap/ria3.3/unieap/tests/manual/ImportantIssues/dialog/test_dialog_height.jsp",title:"设置高度"},
			test_d.domNode);
}

function newDialog(){
	var dialog = new unieap.dialog.Dialog({
		title:"新建对话框",
		url:"newDialog.jsp",
		height:"200",
		width:"250px"
		});
	dialog.show();

}