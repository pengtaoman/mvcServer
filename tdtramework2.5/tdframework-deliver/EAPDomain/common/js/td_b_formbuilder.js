var FormBuilder=new function(){ 
	var core=null;
	this.useStyle=function(styleName){
		if(core==null){
			core=new FormBuilderCore();
		}
		core.useStyle(styleName);
	}

	
	this.build=function(fid){
		if(core==null){
			core=new FormBuilderCore();
		}
		core.build(fid);
		core=null;
	}
}

var FormBuilderCore=function(){ 
var Me=this;

var classMaps={};

var requestS="<span class=\"formRequested\" >*</span>";

classMaps["默认风格"]={

	"tableTitleTR" : "tableTitleTR2",
	"tableTitleLeft" : "tableTitleLeft2",
	"tableTitle" : "tableTitle2",
	"tableTitleRight" : "tableTitleRight2",
	"formLabel" : "formLabel",
	"formField" : "formField"

};

classMaps["浓重风格"]={

	"tableTitleTR" : "tableTitleTR1",
	"tableTitleLeft" : "tableTitleLeft1",
	"tableTitle" : "tableTitle1",
	"tableTitleRight" : "tableTitleRight1",
	"formLabel" : "formLabelBold",
	"formField" : "formField"

};

var classMap=classMaps["默认风格"];



Me.useStyle=function(styleName){
	if (isValid(classMaps[styleName])){
		classMap=classMaps[styleName];
	}

}

Me.build=function(fid){


	var hasTitle=true;

	var formTable=$(fid);
	formTable.cellSpacing=0;
	formTable.cellPadding=0;
	insertClass(formTable,"formTable");
	insertClass(formTable.rows[0],classMap["tableTitleTR"]);
	var titleBox=formTable.rows[0].cells[0];


	if (titleBox.childNodes[0].nodeType==1  && titleBox.childNodes[0].tagName.toLowerCase()=="table"){
		hasTitle=false;
			middleTrIdx=0;
	}



var s_tr;
var s_td;
var coreBox;
var coreTable;
if (hasTitle){

		titleBox.setAttribute("colSpan","3");

		var titletable=document.createElement("table");
		titletable.cellSpacing=0;
		titletable.cellPadding=0;
		titletable.style.width="100%";
		titletable.setAttribute("width","100%");
		titletable.setAttribute("border","0");


		var tbody = document.createElement( "TBODY" );
		titletable.appendChild( tbody );
		var thtr=document.createElement( "TR" );
		tbody.appendChild( thtr );


		var thtd=[];
		thtd[0]=document.createElement( "TD" );
		thtr.appendChild( thtd[0] );
		thtd[1]=document.createElement( "TD" );
		thtr.appendChild( thtd[1] );
		thtd[2]=document.createElement( "TD" );
		thtr.appendChild( thtd[2] );
		insertClass(thtd[0],classMap["tableTitleLeft"]);
		insertClass(thtd[1],classMap["tableTitle"]);
		insertClass(thtd[2],classMap["tableTitleRight"]);

		thtd[0].innerHTML="&#160;";
		thtd[1].innerHTML=titleBox.innerHTML;
		thtd[2].innerHTML="&#160;";


		titleBox.replaceChild(titletable,titleBox.childNodes[0]);
}else{

		s_tr=formTable.insertRow(0);
		s_td=s_tr.insertCell();
		insertClass(s_td,"formTableLT");
		s_td.innerHTML="&#160;"
		s_td=s_tr.insertCell();
		insertClass(s_td,"formTableT");
		s_td.innerHTML="&#160;"
		s_td=s_tr.insertCell();
		insertClass(s_td,"formTableRT");
		s_td.innerHTML="&#160;"
}



		s_tr=formTable.rows[1];
		coreBox=s_tr.cells[0];
		insertClass(coreBox,"formTableC");



		s_td=s_tr.insertCell(0);
		insertClass(s_td,"formTableL");
		s_td.innerHTML="&#160;"
		s_td=s_tr.insertCell();
		insertClass(s_td,"formTableR");
		s_td.innerHTML="&#160;"


		s_tr=formTable.insertRow();
		s_td=s_tr.insertCell();
		insertClass(s_td,"formTableLB");
		s_td.innerHTML="&#160;"
		s_td=s_tr.insertCell();
		insertClass(s_td,"formTableB");
		s_td.innerHTML="&#160;"
		s_td=s_tr.insertCell();
		insertClass(s_td,"formTableRB");
		s_td.innerHTML="&#160;"

	


		coreTable=coreBox.childNodes[0];
		coreTable.cellSpacing=2;
		coreTable.cellPadding=0;
		coreTable.setAttribute("width","100%");
		coreTable.setAttribute("border","0");
		coreTable.setAttribute("align","center");
		insertClass(coreTable,"formTableCore");


		var tds=coreTable.getElementsByTagName("td");
		for (var i=tds.length-1;i>=0 ;i-- ){
			var elm=tds[i];
			var fo=elm.childNodes[0];
			if (fo.nodeType==1){
				insertClass(elm,classMap["formField"]);

			}else{
				insertClass(elm,classMap["formLabel"]);
				if (elm.getAttribute("request")!=null && elm.getAttribute("request")!=""){
					elm.innerHTML+=requestS;
				}
				
			}
		}



		var inputs=coreTable.getElementsByTagName("input");
		for (var ii=inputs.length-1;ii>=0 ;ii-- ){
			var ielm=inputs[ii];
			ielm.attachEvent("onkeydown", enterJump);
			if (ielm.type=="text" && ielm.readOnly){
				insertClass(ielm,"readOnly");
			}else if (ielm.type=="radio"  ){
				insertClass(ielm,"radio");
			}else if (ielm.type=="checkbox"  ){
				insertClass(ielm,"checkbox");
			}

		}
		//formTable.refresh();
}

}
