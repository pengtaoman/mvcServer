/**
* ????????????????????????????????form????OpenListForm??subclass??action????
* OpenListAction??subclass??????????????????????????????????????????????????
* ????????js??????????????????????
*/
var selectedIndex = 0;
/**
* ??????????????????????????????????????????????????????css??????????????????????
* radiobutton??????
*/

function itemSelected(index)
{
  selectedIndex = index;
  if(index==0)

    if(!document.forms[2].selectedItem.length)
    {
	document.forms[2].selectedItem.click();   //checked=true;
	// when ui modify removed by liuying 2007-1-12
	//setClass("tr0","td5");
	return true;
    }
  //??????
 // when ui modify removed by liuying 2007-1-12
 /* for(i = 0; i < document.forms[2].selectedItem.length; i++)
  {
  //  if(i==index)
    if(i==index)
	setClass("tr"+i,"td5");
    else{
		if(i%2==0){
	         setClass("tr"+i,"td2");
	    }else{
			setClass("tr"+i,"td4");
	    }
	}
  }*/

  eval("document.forms[2].selectedItem("+index+").click()");//checked=true");
}
/*
*??load????????????????click????????????????find??????????????
*/
function findSelectedItem()
{
  if(document.forms[2].selectedItem)
  {
    if(document.forms[2].selectedItem.length)
    {
	for(i=0;i<document.forms[2].selectedItem.length;i++)
	{
	  if(eval("document.forms[2].selectedItem("+i+").checked"))
	  {
	    // when ui modify removed by liuying 2007-1-12
	    //setClass("tr"+i,"td5");
	    selectedIndex = i
	    return;
	  }
	}
    }else
    {
	   // when ui modify removed by liuying 2007-1-12
	   //setClass("tr0","td5");
    }
  }
}

/*
*??????????????????item??????????????
*param name ??????????????????????????????????????????????????????
*/
function getSelectedItemValue(name)
{
  var rb;//radiobutton
  //alert(document.forms[2].selectedItem.length);

  if(document.forms[2].selectedItem.length)
  {
    for (i = 0; i < document.forms[2].selectedItem.length; i++)
    {
	rb = document.forms[2].selectedItem[i];
	if (rb.checked)
	{
	  return eval("document.forms[2]."+name+"["+i+"].value");//rb.value;
	}
    }
  }
  else
  {
    return eval("document.forms[2]."+name+".value");//document.forms[2].selectedItem.value;
  }
}

/**
* ????????????????item??id????
* @return
*/
function getSelectedItemID()
{
  return getSelectedItemValue("selectedItem");
}

/**
* ??????????????????????????????????css????
*/
historyBack_flag = false
function itemMouseOver(index)
{
  if(!historyBack_flag){
  findSelectedItem()
  historyBack_flag = true;
  }
  //alert(selectedIndex)
  // when ui modify removed by liuying 2007-1-12
  //if(selectedIndex!=index)
  //  setClass("tr"+index,"td6");
}
/**
* ??????????????????????????????????????css????
*/
function itemMouseOut(index)
{
  if(selectedIndex!=index)
	  	if(index%2==0){
	      setClass("tr"+index,"td2");
    }else{
		    setClass("tr"+index,"td4");
    }

}
function setClass(eleName,clsName)
{
	document.all(eleName).className = clsName;
}
