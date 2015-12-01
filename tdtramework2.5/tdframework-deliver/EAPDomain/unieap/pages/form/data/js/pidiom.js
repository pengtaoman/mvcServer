var pos = '/mydomain/businessConsole/idiomdouse.do';


var datafield;


var win = window;


function setDataField(obj){
  win = window;
  datafield = obj;
}

function setObjectWin(winObj){
  win = winObj;
}

function setDataContent(content){
  try{
    if (win != null)
    win.setIdiom(content);
  }
  catch(e){};
}

function setIdiom(content){
  if(datafield )
  {
	if(datafield.style.visibility =="hidden")
		return;
	if(datafield.readonly||datafield.disabled)
		return;
	if(datafield.value)
	    datafield.value= datafield.value+ content;
	else
	    datafield.value =  content;
  }
}

function openIdiomWin()
{
  window.showModelessDialog(pos,window,"dialogWidth:305px;dialogHeight:425px;scroll:0;status:0;help:0;resizable:0");
}
