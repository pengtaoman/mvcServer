
var NSFTHandler =
{
 idCounterWidget: 0,
 idCounterTab : 0,
 idPrefixWidget : "tab_cnr",
 idPrefixTab : "tab_",
 f_page_height : new Array,
 f_page_width : new Array,
 f_current_tab : -1,
 
 f_tabs_start : 0,
 f_tabs_end : 0,

 getId : function(type)
 {
  if (type == "prefixwidget")
  {
   return this.idPrefixWidget
  }
  else if (type == "tab_")
  {
   return this.idPrefixTab + this.idCounterTab++
  }  
 },
 f_activate_tab : function(tab) { f_activate_tab(tab) },
 MyScroll_Change2 : function(no){ MyScroll_Change2(no)},
 MyScroll_Change2 : function(no){ MyScroll_Change2(no)},
 MyScroll_first : function(){MyScroll_first()},
 MyScroll_last : function(){MyScroll_last()},
 MyScroll_goto : function(tab){MyScroll_goto(tab)},
 calctabinfo : function(tab) {calctabinfo(tab)},
 initTabs: function(){initTabs()}
};

function initTabs(){
  NSFTHandler.idCounterWidget= 0
  NSFTHandler.idCounterTab = 0
  NSFTHandler.idPrefixWidget = "tab_cnr"
  NSFTHandler.idPrefixTab = "tab_"
  NSFTHandler.f_page_height = new Array
  NSFTHandler.f_page_width = new Array 
  NSFTHandler.f_tabs_start = 0
  NSFTHandler.f_tabs_end = 0
  NSFTHandler.f_current_tab = -1
  FORM_OBJECT_POOL.clear();
  
}
function NSFormPages()
{
 this._show_tabs = [];
 this._tabs = [];
 this._pages = [];

 this.id = NSFTHandler.getId("prefixwidget");
 this.f_activate_tab = f_activate_tab;
 
 this.topMargin = 40;

};

NSFormPages.prototype.addTab = function(tab,page,width,height)
{

  this._tabs[this._tabs.length] = tab;
  this._pages[this._tabs.length-1] = document.getElementById(page);
  
  NSFTHandler.f_page_height[this._tabs.length-1]=height;
  NSFTHandler.f_page_width[this._tabs.length-1]=width;
  
};


NSFormPages.prototype.toString = function() {
  s = '';  
  s += '<div class=NSFT-tab id=' + this.id + ' style="position: ' + this.pos + '; display:block">';
  s += '<table border="0" cellpadding="0" cellspacing="0"><tr>';
  s += '<td valign="top">';
  
  // form cmd div at the left of the page
  s += '<div id="f_cmd_div_left" style="position: relative; top: '+this.topMargin+'px; text-align: center; display:block;">';
  s += getMenuHandler().createLeftCmdDiv(2,2);  
  s += '</div>';
  s += '</td><td>';

  s += "<table border='0' cellpadding='0'  cellspacing='0' >"; 
  s += "<tr height='"+this.topMargin+"px'><td>";
  
  s += "<div id='f_top_div' style='position:relative;display:block;'>";
  
  s += "<table cellpadding='0'  cellspacing='0' width='100%' ><tr>";
 
  s += "<td  align='left'><table cellpadding='0'  cellspacing='0'  height='"+this.topMargin+"px'><tr>"; //main_tab_table_head  for unieap3.1
  
  //form cmd menu at the top of the page
  s += '<td valign="bottom" align ="left" >';
  s += '<label  style="height:20px;"></label>';
  s += '<div id="f_cmd_div_default" >';
  //s += getMenuHandler().createMainMenu(2,2);
  s += '</div>'; 
   
  s += '</td>';
  
  // form cmd div at the top of the page
  s += '<td valign="bottom" align ="left" >';
  s += '<div id="f_cmd_div_top" style="padding-right:2px; padding-left:2px;">';
  //s += getMenuHandler().createTopCmdDiv(2,2);
  s += '</div></td>';

  
  s += '<td><div id="f_top_tab_div" ><table cellpadding="0" cellspacing="0" class="main_tab_table_head_my" height="'+this.topMargin+'px"><tr>';
  for (i = 0; i < this._tabs.length; i++) {
    sTab = this._tabs[i];
    s += sTab;
  } 
  s += '</tr></table>' ;	
  
  s += '</div>';
  s += '</td>';
  
  s += '</tr></table></td>' ;
  
  s += '<td align="right" valign="bottom">';
  s += "<div id='f_turn_div_top' style='display:none;'>"
  s += getMenuHandler().createTurnMenu();
  s += '</div></td>'; 

  s += '</tr></table>'
  
  s += ' </div>'
  
  s += '</td>';
     
  s += '</tr><tr ><td>';        
//////////////////
  s += "<table cellpadding='0' cellspacing='0'><tr><td>"; 

  for (i = 0; i < this._tabs.length; i++) {
    s += '<div class="main_page_div_border" id="form_page_'+i+'" style="position:relative;width:'+NSFTHandler.f_page_width[i]+'; height:'+NSFTHandler.f_page_height[i]+';">'
    sPage = this._pages[i];
    s += sPage.innerHTML;
    s += '</div>';
  }
  s += '</td></tr></table>'
  s += '</td>';
  s += '</tr>';
  
  // the bottom tr of the page
  s += '<tr><td valign="top" nowrap>';
  
  s += "<div id='f_bottom_div' style='position:relative;display:block;'>";

  s += "<table cellpadding='0'  cellspacing='0' width='100%'><tr>";
 
  s += "<td  align='left'><table cellpadding='0'  cellspacing='0'><tr>"; //main_tab_table_head  for unieap3.1
  
  // form cmd div at the bottom of the page
  s += '<td valign="top" align ="left" >';
  s += '<div id="f_cmd_div_bottom" style="padding-right:2px; padding-left:2px;">';
  //s += getMenuHandler().createTopCmdDiv(2,2);
  s += '</div></td>';  
  s += '<td valign="top" >';
  s += '<div id="f_bottom_tab_div">';
  s += '<table border="0" cellpadding="0"  cellspacing="0" class="main_tab_table_head2_my"><tr>';
  for (i = 0; i < this._tabs.length; i++) {
  
    s += '<td valign="top" align="left" nowrap >'
       + '<div id="bottom_' + this._tabs[i].id + '" onmouseup="NSFTHandler.f_activate_tab(' + this._tabs[i].id.split('_')[1] + ')" style="cursor:hand;">'
       + '<table height="27" border="0" cellpadding="0" cellspacing="0" class="table_base"><tr>'
       + '<td width="5"><img src="unieap/pages/form/images/tab_botton/main_unchecked_left.gif" width="20" height="27"></td>'
       + '<td align="center" nowrap class="main_tab_unchecked_center2">'+this._tabs[i].text+'</td>'
       + '<td width="5" align="right"><img src="unieap/pages/form/images/tab_botton/main_unchecked_right.gif" width="20" height="27"></td>'
       + '</table></div></td>';
  }

  s += '</tr></table>';
  s += '</div></td>';
 
  s += '</tr></table>';
  
  //s += '</td></tr></table>';
  
  s += '</td>'; 
  s += '<td align="right" valign="top">';
  s += "<div id='f_turn_div_bottom' style='display:none;'>"
  s += getMenuHandler().createTurnMenu();
  s += '</div></td>';  
  
  s += '</tr></table>';
  s += '</div>';
  s += '</td></tr></table>';
  
  s += '</td></tr></table>';
  s += '</div>';
  return s;
};

function NSFormTab(text,icon) {
  this.text = text;
  this.icon = icon;
  this.id = NSFTHandler.getId("tab_");
};

NSFormTab.prototype.toString = function(){
  s = '';
  s += "<td align='left' valign='bottom' nowrap>";
  s += "<div id= 'top_" + this.id + "' onmouseup='NSFTHandler.f_activate_tab(" + this.id.split('_')[1] + ")' style='cursor:hand;'>";
  s += "<table height='27' border='0' cellpadding='0' cellspacing='0' class='table_base'>"
    + "<tr><td width='5'><img src='unieap/pages/form/images/tab/main_unchecked_left.gif' width='20' height='27'></td>"
    + "<td align='center' nowrap class='main_tab_unchecked_center' no="+i+">"+ this.text + "</td>"
    + "<td width='5' align='right'><img src='unieap/pages/form/images/tab/main_unchecked_right.gif' width='20' height='27'></td>"
    + "</tr></table>"
  s += "</div>";
  s += "</td>";
  return s;
};

function f_activate_tab(tab){
  
  if(NSFTHandler.f_current_tab==tab){
  	return;
  }
  if(NSFTHandler.f_current_tab==-1){
  	 NSFTHandler.f_tabs_end = this._tabs.length;
  }
  hiddenFocusRect();
  hiddenValidateRect();
  
  total_tabs = NSFTHandler.idCounterTab;
  if(total_tabs==1){
  	document.getElementById('f_top_tab_div').style.display = 'none';
  	document.getElementById('f_bottom_tab_div').style.display = 'none';
  }
  var f_temp_tab; 
  var f_temp_width_top = 0;
  var f_temp_width_bottom = 0;
  var f_cur_width = NSFTHandler.f_page_width[tab];
  var f_temp_tab_div;
  var f_page_div;
  var f_top_cmd_div_length = document.getElementById("f_cmd_div_top").offsetWidth;
  var f_bottom_cmd_div_length = document.getElementById("f_cmd_div_bottom").offsetWidth;
  
  if(f_top_cmd_div_length == 0 ){
  	 	f_top_cmd_div_length = document.getElementById("f_cmd_div_default").offsetWidth;
  }
  var f_temp_top_tab_div ;
  var f_temp_bottom_tab_div;
  var f_page_div; 
  
  if(tab==0){	
    NSFTHandler.f_current_tab = tab; 
  	NSFTHandler.f_tabs_end  = total_tabs;
  	//calctabinfo();
  } else{  
  for(i=0;i<total_tabs;i++){
  	if(i!=tab){
	  	f_temp_top_tab_div = document.getElementById("top_tab_"+i);
	  	f_temp_bottom_tab_div = document.getElementById("bottom_tab_"+i);
	  	f_page_div = document.getElementById("form_page_"+i);
	  
	 	f_page_div.style.display = "none";
	  	//ert(f_temp_top_tab_div)
	  	f_temp_top_tab_div = f_temp_top_tab_div.childNodes[0].childNodes[0].childNodes[0]
	  	//top tab
	  	f_temp_top_tab_div.childNodes[0].childNodes[0].src = "unieap/pages/form/images/tab/main_unchecked_left.gif";
	  	f_temp_top_tab_div.childNodes[1].className = "main_tab_unchecked_center";
	  	f_temp_top_tab_div.childNodes[2].childNodes[0].src = "unieap/pages/form/images/tab/main_unchecked_right.gif";  
	  	//botton tab
	  	f_temp_bottom_tab_div = f_temp_bottom_tab_div.childNodes[0].childNodes[0].childNodes[0];
	  	f_temp_bottom_tab_div.childNodes[0].childNodes[0].src = "unieap/pages/form/images/tab_botton/main_unchecked_left.gif";
	  	f_temp_bottom_tab_div.childNodes[1].className = "main_tab_unchecked_center2";
	  	f_temp_bottom_tab_div.childNodes[2].childNodes[0].src = "unieap/pages/form/images/tab_botton/main_unchecked_right.gif";     	
  	}else{
  		f_temp_top_tab_div = document.getElementById("top_tab_"+tab);
  		f_temp_bottom_tab_div = document.getElementById("bottom_tab_"+tab);
  		f_page_div = document.getElementById("form_page_"+tab);

  		f_page_div.style.display = "block";
  		f_temp_top_tab_div = f_temp_top_tab_div.childNodes[0].childNodes[0].childNodes[0]
  
  		f_temp_top_tab_div.childNodes[0].childNodes[0].src = "unieap/pages/form/images/tab/main_checked_left.gif";
  		f_temp_top_tab_div.childNodes[1].className = "main_tab_checked_center";
  		f_temp_top_tab_div.childNodes[2].childNodes[0].src = "unieap/pages/form/images/tab/main_checked_right.gif";

    
  		f_temp_bottom_tab_div = f_temp_bottom_tab_div.childNodes[0].childNodes[0].childNodes[0];
  		f_temp_bottom_tab_div.childNodes[0].childNodes[0].src = "unieap/pages/form/images/tab_botton/main_checked_left.gif";
  		f_temp_bottom_tab_div.childNodes[1].className = "main_tab_checked_center2";
  		f_temp_bottom_tab_div.childNodes[2].childNodes[0].src = "unieap/pages/form/images/tab_botton/main_checked_right.gif";    	
  	} 	
  }
  NSFTHandler.f_current_tab = tab; 
 }
 calctabinfo();
 initDataTables();  

};

function MyScroll_Change2(no)
{
  var startDisNo  = NSFTHandler.f_tabs_start
  var endDisNo    = NSFTHandler.f_tabs_end
  total_tabs = NSFTHandler.idCounterTab ;
  if(no==1)
    {  
      if(endDisNo==total_tabs-1)
      {
        return;
      }
      else
      {
         NSFTHandler.f_tabs_end = endDisNo + 1
         

         document.getElementById("top_tab_"+startDisNo).style.display="none"
         document.getElementById("bottom_tab_"+startDisNo).style.display="none" 
         
         startDisNo = startDisNo+1;
         NSFTHandler.f_tabs_start = startDisNo;
         calctabinfo();
      }
    }
  if(no==-1)
    {
      if(startDisNo==0)
       {
         return;
       }
       else
       {              

            NSFTHandler.f_tabs_end = endDisNo-1          
            document.getElementById("top_tab_"+(startDisNo-1)).style.display="block"
            document.getElementById("bottom_tab_"+(startDisNo-1)).style.display="block"
            startDisNo = startDisNo-1;
            NSFTHandler.f_tabs_start = startDisNo;
            calctabinfo();
       }
    }
};
function MyScroll_first(){
	NSFTHandler.f_tabs_start = 0;
	calctabinfo();
	NSFTHandler.f_activate_tab(0);
}
function MyScroll_last(){

  	var startDisNo  = NSFTHandler.f_tabs_start
	total_tabs = NSFTHandler.idCounterTab;

	for(var i=NSFTHandler.f_tabs_end+1;i<=total_tabs;i++){
		NSFTHandler.f_tabs_end = i;
		document.getElementById("top_tab_"+ (startDisNo)).style.display="none";
		document.getElementById("bottom_tab_"+(startDisNo)).style.display="none";
		startDisNo = startDisNo+1;
        NSFTHandler.f_tabs_start = startDisNo;
	}

	NSFTHandler.f_activate_tab(total_tabs-1);

}

function calctabinfo(){
 	var f_temp_width_top = 0;
	var f_temp_width_bottom = 0;
  	var f_cur_width = NSFTHandler.f_page_width[NSFTHandler.f_current_tab];
  	var f_top_cmd_div_length = document.getElementById("f_cmd_div_top").offsetWidth;
  	var f_bottom_cmd_div_length = document.getElementById("f_cmd_div_bottom").offsetWidth;
    
  	if(f_top_cmd_div_length == 0 ){
  	 	f_top_cmd_div_length = document.getElementById("f_cmd_div_default").offsetWidth;
  	}  	
	for(i=NSFTHandler.f_tabs_start;i<total_tabs;i++){

  	  	f_temp_top_tab_div = document.getElementById("top_tab_"+i);
	  	f_temp_bottom_tab_div = document.getElementById("bottom_tab_"+i);
	  	f_page_div = document.getElementById("form_page_"+i);

      	f_temp_top_tab_div.style.display = "block";
      	f_temp_bottom_tab_div.style.display = "block";
      	f_page_div.style.display = "block";
  
      	f_temp_width_top += f_temp_top_tab_div.offsetWidth;
      	f_temp_width_bottom += f_temp_bottom_tab_div.offsetWidth;
       
      	var f_temp_width = f_temp_width_top > f_temp_width_bottom ? f_temp_width_top:f_temp_width_bottom;	

      	if(f_temp_width > f_cur_width - 100 - f_top_cmd_div_length){
      	    
       		if(document.getElementById("f_top_tab_div").style.display!="none"){
	      		document.getElementById("f_turn_div_top").style.visibility = "visible";
			}
	   		if(document.getElementById("f_bottom_tab_div").style.display!="none"){
          		document.getElementById("f_turn_div_bottom").style.visibility = "visible";
       		}  
       		for(j=total_tabs-1;j>=i;j--){
       	 		document.getElementById("top_tab_"+j).style.display = "none";
         		document.getElementById("bottom_tab_"+j).style.display = "none";
         		document.getElementById("form_page_"+j).style.display = "none";
         		NSFTHandler.f_tabs_end = i-1;  
       		}    
       		break;        		
      	} 

	 }
	 for(i=0;i<total_tabs;i++){
      	//alert(i+":"+NSFTHandler.f_current_tab);
      	if(i!=NSFTHandler.f_current_tab){
	  		f_temp_top_tab_div = document.getElementById("top_tab_"+i);
	  		f_temp_bottom_tab_div = document.getElementById("bottom_tab_"+i);
	  		f_page_div = document.getElementById("form_page_"+i);
	  
	 		f_page_div.style.display = "none";
	  		//ert(f_temp_top_tab_div)
	  		f_temp_top_tab_div = f_temp_top_tab_div.childNodes[0].childNodes[0].childNodes[0]
	  		//top tab
	  		f_temp_top_tab_div.childNodes[0].childNodes[0].src = "unieap/pages/form/images/tab/main_unchecked_left.gif";
	  		f_temp_top_tab_div.childNodes[1].className = "main_tab_unchecked_center";
	  		f_temp_top_tab_div.childNodes[2].childNodes[0].src = "unieap/pages/form/images/tab/main_unchecked_right.gif";  
	  		//botton tab
	  		f_temp_bottom_tab_div = f_temp_bottom_tab_div.childNodes[0].childNodes[0].childNodes[0];
	  		f_temp_bottom_tab_div.childNodes[0].childNodes[0].src = "unieap/pages/form/images/tab_botton/main_unchecked_left.gif";
	  		f_temp_bottom_tab_div.childNodes[1].className = "main_tab_unchecked_center2";
	  		f_temp_bottom_tab_div.childNodes[2].childNodes[0].src = "unieap/pages/form/images/tab_botton/main_unchecked_right.gif";        	
      	}else{//alert();
  			f_temp_top_tab_div = document.getElementById("top_tab_"+NSFTHandler.f_current_tab);
  			f_temp_bottom_tab_div = document.getElementById("bottom_tab_"+NSFTHandler.f_current_tab);
  			f_page_div = document.getElementById("form_page_"+NSFTHandler.f_current_tab);

  			f_page_div.style.display = "block";
  			f_temp_top_tab_div = f_temp_top_tab_div.childNodes[0].childNodes[0].childNodes[0]
  
  			f_temp_top_tab_div.childNodes[0].childNodes[0].src = "unieap/pages/form/images/tab/main_checked_left.gif";
  			f_temp_top_tab_div.childNodes[1].className = "main_tab_checked_center";
  			f_temp_top_tab_div.childNodes[2].childNodes[0].src = "unieap/pages/form/images/tab/main_checked_right.gif";
    
  			f_temp_bottom_tab_div = f_temp_bottom_tab_div.childNodes[0].childNodes[0].childNodes[0];
 			f_temp_bottom_tab_div.childNodes[0].childNodes[0].src = "unieap/pages/form/images/tab_botton/main_checked_left.gif";
 			f_temp_bottom_tab_div.childNodes[1].className = "main_tab_checked_center2";
  			f_temp_bottom_tab_div.childNodes[2].childNodes[0].src = "unieap/pages/form/images/tab_botton/main_checked_right.gif";       	
      	}	 
	 }	
}

