
var selectedIndex = 0;

function itemSelected(index)
{
  selectedIndex = index;
  if(index==0)
    if(!document.forms[0].selectedItem.length)
    {
	document.forms[0].selectedItem.click();//checked=true;
	setClass("tr0","td3");
	return true;
    }

  for(i = 0; i < document.forms[0].selectedItem.length; i++){ 
    if(i==index)
	setClass("tr"+i,"td3");
    else
	setClass("tr"+i,"td1");
  }

  eval("document.forms[0].selectedItem("+index+").click()");//checked=true");
}

function findSelectedItem()
{
  if(document.forms[0].selectedItem)
  { 
    if(document.forms[0].selectedItem.length)
    {
	for(i=0;i<document.forms[0].selectedItem.length;i++)
	{
	  if(eval("document.forms[0].selectedItem("+i+").checked"))
	  
	  { 
	    setClass("tr"+i,"td3");
	    return;
	  }
	}
    }else
    {
	setClass("tr0","td3");
    }
  }
}


function getSelectedItemValue(name)
{
  var rb;//radiobutton
  if(document.forms[0].selectedItem.length)
  {
    for (i = 0; i < document.forms[0].selectedItem.length; i++)
    {
	    rb = document.forms[0].selectedItem[i];
	    if (rb.checked)
	    {
	       return eval("document.forms[0]."+name+"["+i+"].value");//rb.value;
	     }
    }
  }
  else
  {
    return eval("document.forms[0]."+name+".value");//document.forms[0].selectedItem.value;
  }
}


function getSelectedItemID()
{
  return getSelectedItemValue("selectedItem");
}


function itemMouseOver(index)
{
  if(selectedIndex!=index)
    setClass("tr"+index,"td2");
}

function itemMouseOut(index)
{
  if(selectedIndex!=index)
    setClass("tr"+index,"td1");
}

function gotoPage(curPage)
{
   var re = new RegExp();
   re.compile(/([^0-9])/);
   var matchArray = re.exec(curPage);
   if(matchArray) curPage = 1 ;
   if(curPage<1) curPage = 1;
   document.forms[0].requestPage.value = curPage;
   document.forms[0].submit();
}

function sort(orderby)
{
  var isAscending = document.forms[0].ascending.value;
  var oldOrderBy = document.forms[0].orderBy.value;
  if(isAscending=="true"&&oldOrderBy==orderby)
    document.forms[0].ascending.value = "false";
  else
    document.forms[0].ascending.value = "true";
  
  if(document.forms[0].operation){
    if(document.forms[0].operation.value != "")
    {
      document.forms[0].operation.value="";
    }
  }
  document.forms[0].orderBy.value = orderby;
  document.forms[0].requestPage.value = 1;
  document.forms[0].submit();
}

function delete_confirm(warning){
  return confirm(warning);
}

function setClass(eleName,clsName){
	document.all(eleName).className = clsName;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_showHideLayers() { //v3.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
 }

 function refresh(){
  var url = window.location.href;

  var index = url.indexOf("?");
  if(index!=-1)
    location.href = url.substring(0,index);
  else
    location.href = url;
}

function trim(a_strVarContent){
  var pos1, pos2, newstring;

  pos1 = 0;
  pos2 = 0;
  newstring = ""

  if ( a_strVarContent.length > 0 )
  {
    for( i=0; i<a_strVarContent.length; i++)
    {
	if ( a_strVarContent.charAt(i) == " " )
	  pos1 = pos1 + 1;
	else
	  break;
    }
    if(i!=a_strVarContent.length)
    {
	for( i=a_strVarContent.length-1; i>=0 ; i--)
	{
	  if ( a_strVarContent.charAt(i) == " " )
	    pos2 = pos2 + 1;
	  else
	    break;
	}
    }
    newstring = a_strVarContent.substring(pos1, a_strVarContent.length-pos2)
  }
  return newstring;
}
function getTrimText(textfield){
  var value = textfield.value;
  textfield.value = trim(value);

  return textfield.value;
}
function OnlyNumber(){
	var keyCode = window.event.keyCode;
	if ( !((keyCode >= 48) && (keyCode <= 57)) && keyCode != 45 && keyCode != 46)
	{
		window.event.keyCode = 0 ;
	}
}