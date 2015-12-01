//所有按钮置灰
function AllBtnDisabled(webpath){
	parent.actionbtn.document.myform.bAdd.disabled=true;
	parent.actionbtn.document.myform.bSelect.disabled=true;
	parent.actionbtn.document.myform.bCancel.disabled=true;
	parent.actionbtn.document.myform.bDelete.disabled=true;
}
function SetRow(RowObj)
{
	RowObj.ondblclick=TR_DBLClick_Handle;
	for (var i=1;i<RowObj.cells.length ;i++ )
	{
		RowObj.cells[i].onclick=TD_OnClick_Handle;
	}
//	RowObj.onclick=TR_OnClick_Handle;
}

function  TR_DBLClick_Handle()
{
	selectRow(this);
}
function  TD_OnClick_Handle()
{
	checkTD(this.parentElement.id);
}

function TR_MouseDown()
{
	MouseDown(this);
}

function TR_MouseUp()
{
	MouseUp(this);
}


function TR_MouseOver()
{
	MouseOver(this);
}

function TR_onmouseout()
{
	MouseOut(this);
}

function MouseOver(obj) 
{ 
} 
function MouseOut(obj) 
{ 
} 
function MouseDown(obj) 
{ 
} 
function MouseUp(obj) 
{ 
}
//tblS:源
//tblD:目标
//objRow:行(array)
//strSetRow:执行的操作,形式如'parent.actionlist.SetRow(myRow)'
function contentCopy(tblS,tblD,objRow,strSetRow){
	for(var k=0;k<objRow.length;k++){
		//添加到目标的表格中.
		var myRow=tblD.insertRow();
		myRow.id=objRow[k].id;
		if ((myRow.rowIndex % 2)==1)
			myRow.className = "trList";
		else
			myRow.className = "trListDark";
		var myCell;
		for (var i=0;i<objRow[k].cells.length;i++){
			myCell=myRow.insertCell();
			myCell.innerHTML=objRow[k].cells[i].innerHTML.replace('CHECKED','');
		//	alert(myCell.innerHTML);
		}
		eval(strSetRow);
		//return;
	}
}