
function ch(obj){
	if(obj.value=="1"){
		tabset1_tab1.all("tab1").value="sss";
		tabset1_tab2.all("tab2").value="";
	}

	if(obj.value=="2"){
	tabset1_tab2.all("tab2").value="fff";
	tabset1_tab1.all("tab1").value="";
	}
}

function dd(){
	alert(document.myform.c1.options[document.myform.c1.selectedIndex].text);
}