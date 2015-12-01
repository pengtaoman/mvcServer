// button control
function disableButton(buttonID)
{
  var element=document.getElementsByName(buttonID)[0];
  if(element!=null)
  	eval("document.forms[0]."+buttonID+".disabled = true");
/*
  var label;
  var innerStr = eval("t1.rows[0].cells[" + post + "].innerHTML");
  var index = innerStr.indexOf(">");
  innerStr = innerStr.substring(index+1, innerStr.length);
  var i = innerStr.indexOf("<");
  label = innerStr.substring(0,i);

  innerStr = "<span class = 'button_disable'>" + label + "</span>";
  eval("document.all('" + buttonID + "').className='button1'");
  eval("t1.rows[0].cells[" + post + "].innerHTML=\"" + innerStr +"\"");
*/
}

function enableButton(buttonID)
{
  var element=document.getElementsByName(buttonID)[0];
  if(element!=null)
   eval("document.forms[0]."+buttonID+".disabled = false");
/*
  var label;
  var innerStr = eval("t1.rows[0].cells[" + post + "].innerHTML");
  var index = innerStr.indexOf(">");
  var index = innerStr.indexOf(">");
  innerStr = innerStr.substring(index+1, innerStr.length);
  var i = innerStr.indexOf("<");
  label = innerStr.substring(0,i);

  innerStr = "<a onMouseOver=\\\"setClass('"
		+ buttonID +
		"','button2')\\\" onMouseOut=\\\"setClass('"
		+ buttonID +
		"','button1')\\\" href = \\\"javascript:"
		+ onclickMethod +
		"\\\" class = \\\"button\\\">"
		+ innerStr +
		"</a>";


  eval("document.all('" + buttonID + "').className='button1'");
  eval("t1.rows[0].cells[" + post + "].innerHTML= \"" + innerStr +"\"");
*/
}
