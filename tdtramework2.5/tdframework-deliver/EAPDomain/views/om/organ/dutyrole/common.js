function AllBtnDisabled(){
	parent.actionbtn.document.all['bAdd'].disabled=true;
	//parent.actionbtn.document.all['bAdd'].src=myform.Path.value+'/views/om/organ/dutyrole/add_disabled.gif';
	parent.actionbtn.document.all['bDelete'].disabled=true;
	//parent.actionbtn.document.all['bDelete'].src=myform.Path.value+'/views/om/organ/dutyrole/delete_disabled.gif';
}
function SetRow(RowObj)
{
//	RowObj.ondblclick=TR_DBLClick_Handle;
}

function  TR_DBLClick_Handle()
{
	selectRow(this);
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

function contentExchange(tblS,tblD,objRow,strSetRow){
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
			myCell.innerHTML=objRow[k].cells[i].innerHTML;
		}
		tblS.deleteRow(objRow[k].rowIndex);
		eval(strSetRow);
	}
}
