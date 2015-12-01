var NSFTMenuConstants =
{
 mainTableTdWidth:16, 
 mainTableBorder:0, 
 mainTableCellspacing:0, 
 mainTableCellpadding:1, 
 mainTableBgcolor:"gray", 
 mainTableBordercolor:"gray", 
 hrefClassName:"link", 
 mainTableTdBgcolor:"#eeedea", 

 subTableBorder:0, 
 subTableCellspacing:0, 
 subTableCellpadding:1,
 subTableBgcolor:"gray",
 subTableBordercolor:"gray", 
 subTableTdBgcolor:"#eeedea", 
 layerMax:5,
 length:0,
 n:0,
 menuHandler:null, 
 getMenuHandler: function() { getMenuHandler()}
};
function getMenuHandler(){

 	if(!NSFTMenuConstants.menuHandler) 
	 	NSFTMenuConstants.menuHandler = new NSFTMenuHandler(); 
 	return NSFTMenuConstants.menuHandler;

}
function NSFTMenuHandler()  
{
  this.mainMenu = new Array();
  this.subMenu = new Array();
  this.turnMenu = new Array();
  this.addMenuItem = addMenuItem;
  this.addMainMenu = addMainMenu;
  this.addTurnMenu = addTurnMenu;
  this.createMainMenu = createMainMenu;
  this.createTopCmdDiv = createTopCmdDiv;
  this.createLeftCmdDiv = createLeftCmdDiv;
  this.createSubMenu = createSubMenu;
  this.createTurnMenu = createTurnMenu;
  this.layervib = layervib;
}
function addMenuItem(name,privilege,icon,text,action,width,height)
{
  var item = new NSMenuItem(name,privilege,icon,text,action,width,height);
  this.subMenu[this.subMenu.length] = item;	
}
function addTurnMenu(name,privilege,icon,text,action,width,height)
{
  var item = new NSMenuItem(name,privilege,icon,text,action,width,height);
  this.turnMenu[this.turnMenu.length] = item;	  
}
function NSMainMenu(icon,text)
{
  this.icon =icon;
  this.text = text;
}
function addMainMenu(icon,text)
{
  var item = new NSMainMenu(icon,text);
  this.mainMenu[this.mainMenu.length] = item;
  NSFTMenuConstants.length = this.mainMenu.length;
}

function NSMenuItem(name,privilege,icon,text,action,width,height)
{
  this.name = name;
  this.privilege = privilege;
  this.icon = icon;
  this.text = text;
  this.action = action;
  this.width = width;
  this.height = height;
  
}

function createMainMenu(top,left){
//*** Default page style ****//

var s = '';
 

 s += "<table width="
		+ NSFTMenuConstants.mainTableTdWidth+" border='"+NSFTMenuConstants.mainTableBorder+"' cellspacing='"
		+ NSFTMenuConstants.mainTableCellpadding+"' cellpadding='"+NSFTMenuConstants.mainTableCellpadding
		+"' bgcolor='"+NSFTMenuConstants.mainTableBgcolor
		+ "' bordercolor='"+NSFTMenuConstants.mainTableBordercolor+"'><tr>";
 for(i=0;i<NSFTMenuConstants.length;i++){
  s += "<td valign='bottom' class=cmd-menu style='cursor:hand;background-image:url("+this.mainMenu[0].icon+");' width='"
		+ NSFTMenuConstants.mainTableTdWidth+"' height='18px' bgcolor='"
		+ NSFTMenuConstants.mainTableTdBgcolor + "' onclick=layervib('visible','"+i+"')>";
		
 }

 s += "</td></tr></table>";


for(j=0;j<this.mainMenu.length;j++){
 this.createSubMenu(j);
}

return s;
}

function createTopCmdDiv(top,left,pageheight){ 


// ***** pageStyle_1  start *****
//** top menu

var s = '';

 s += "<table width="
		+ NSFTMenuConstants.mainTableTdWidth+" cellspacing='5' cellpadding='0'><tr>";
for(h=0;h<this.subMenu.length;h++){ 

 s += "<td class=menu-item-level title="+this.subMenu[h].text+" style='cursor:hand;background-image:url("+this.subMenu[h].icon
		+ ");' width='"+this.subMenu[h].width+"' height='"+this.subMenu[h].height+"';'";
if(this.subMenu[h].privilege !=null && this.subMenu[h].privilege!= true)
{
 s += " onclick = ''";
}
else{
 s += " onclick='"+this.subMenu[h].action+"'";
}
 s += "'></td>";		

}

 s += "</tr></table>";
 //s += "</div>";
	
 return s;
// ***** pageStyle_1  end *****

 
 
}
function createLeftCmdDiv(top,left){

//** page style 2 start ***
 var s = '';
 
 s += "<table cellspacing='2' cellspadding='0'>"		
 for(h=0;h<this.subMenu.length;h++){ 
 
 s += "<tr><td class=menu-item-level title="+this.subMenu[h].text+" width='2' height='"+(this.subMenu[h].height+5)+"' style='cursor:hand;background-image:url("+this.subMenu[h].icon
		+ ");'";
 if(this.subMenu[h].privilege !=null && this.subMenu[h].privilege!= true)
 {
 s += " onclick = ''";
 }
 else{
 s += " onclick='"+this.subMenu[h].action+"'";
 }
 s += "></td></tr>";		

}

 s += "</table>";

//alert(s);
 return s;

//** page style 2 end ***

}


function createSubMenu(num){

var subLayerLeft=(NSFTMenuConstants.mainTableTdWidth*num)+NSFTMenuConstants.mainTableCellpadding+NSFTMenuConstants.mainTableBorder;

document.write("<div id='index" + num + "' style='position:absolute; left:0px; top:40px; z-index:2; visibility: hidden' >");
//onmouseout=layervib('visible','"+NSFTMenuConstants.layerMax+"') onmouseover=layervib('visible','"	+ num + "')
if(this.subMenu.length!=0){

document.write("<table width='88px' border='"+NSFTMenuConstants.subTableBorder+"' cellspacing='"+NSFTMenuConstants.subTableCellpadding
 		+ "' cellpadding='"+NSFTMenuConstants.subTableCellpadding+"' bgcolor='"+NSFTMenuConstants.subTableBgcolor+"' bordercolor='"
 		+ NSFTMenuConstants.subTableBordercolor+"'>");
 		
for(h=0;h<this.subMenu.length;h++){ 

document.write("<tr><td class=menu-item style='cursor:hand;background-image:url("+this.subMenu[h].icon
		+ ");' bgcolor='"+NSFTMenuConstants.subTableTdBgcolor+"'  width='100%' height='"+this.subMenu[h].height+"' onmouseover='this.className=\"menu-checked\";'"
		+" onmouseout='this.className=\"menu-item \";'");
if(this.subMenu[h].privilege !=null && this.subMenu[h].privilege!= true)
{
document.write(" onclick = ''");
}
else{
document.write(" onclick='"+this.subMenu[h].action+"'");
}
document.write("'>"+this.subMenu[h].text+"</td></tr>");		

}

document.write("</table>");
}
document.write("</div>"); 
}


function layervib(type,num){
	var H=type;
	var temp=(H='visible'?'hidden':'visible')
	var M = eval('document.all.f_cmd_div_default');
	M = M.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
	for(var i=0;i<NSFTMenuConstants.length;i++){
	    var E=eval('document.all.index'+i+'');
	    if(NSFTMenuConstants.n%2==0){
	    	E.style.visibility=type;
	    	M.style.backgroundImage='url(unieap/pages/form/data/images/up1.gif)';//
		}else{
			E.style.visibility=temp;
			M.style.backgroundImage='url(unieap/pages/form/data/images/down1.gif)';
		} 
	}
	
	NSFTMenuConstants.n++;	
}

function createTurnMenu(){ 

// ***** pageStyle_1  start *****
//** top menu
 var s ='';
 s += "<table width="
		+ NSFTMenuConstants.mainTableTdWidth+" cellspacing='2' cellspadding='2'><tr>";
for(h=0;h<this.turnMenu.length;h++){ 
	
	if(h == this.turnMenu.length/2){

		s += '<td><span class="page_number" id="pageNo_div" >'+(NSFTHandler.f_current_tab+2)+'/'+NSFTHandler.idCounterTab+'</span></td>';

		//continue;
	}

 s += "<td class=menu-item-level height='16px' style='cursor:hand;background-image:url("+this.turnMenu[h].icon
		+ ");' width='100%' ;'";

 s += " onclick='"+this.turnMenu[h].action+"'";
 s += "'></td>";		

}

 //s += '<td ><input id="tabnum" onblur="checkNum()" type="text" maxlength="2" style="width:20px;height:16px;font:10px;"></td>';
 //s += '<td>1/2</td>';
 s += "</tr></table>";

 return s;

// ***** pageStyle_1  end *****
}
function checkNum(){
  var num = document.getElementById("tabnum").value;
  if(num<0||num>NSFTHandler.idCounterTab){
  	alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u9875\u503c\uff081-"+NSFTHandler.idCounterTab+"\uff09");
  }
}
function MoveLayer(layerName) {
 if(document.getElementById('f_cmd_div_left').style.display == 'none'){
    return;
 }
 var x = 0;
 var y = 40;
 var diff = (document.body.scrollTop + y - document.all.f_cmd_div_left.style.posTop)*0.40;
 var y = document.body.scrollTop + y - diff;
 eval("document.all." + layerName + ".style.posTop = y");
 eval("document.all." + layerName + ".style.posLeft = x");
 setTimeout("MoveLayer('f_cmd_div_left');", 20);
}