//days's number of every month
//var Days_in_Month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); 

//Non-Leap year Month days..
Days_in_Month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//Leap year Month days..
Days_in_Month_00 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//months
var Month_Label = new Array('\u4e00\u6708', '\u4e8c\u6708', '\u4e09\u6708', '\u56db\u6708', '\u4e94\u6708', '\u516d\u6708', '\u4e03\u6708', '\u516b\u6708', '\u4e5d\u6708', '\u5341\u6708', '\u5341\u4e00\u6708', '\u5341\u4e8c\u6708'); 


var myObj;
var popupObj;
var dateLinkObj;

function getFormCalendar(name){
    var cal = getFormObjectByName(name);   
    try{
      if(!cal){ 
    	cal = new FormCalendar(name); 
    	FORM_OBJECT_POOL.put(name,cal);
      }
    }catch(e){
      alert(e);
    } 
    return cal;

}

function FormCalendar(name){

   	this.name = name;
   	this.getCalValue = getCalValue;
   	this.setCalValue = setCalValue;
  	this.setVisible = setVisible;
  	this.isVisible = isVisible;	
  	this.setCalEditable = setCalEditable;
}
function setCalValue(newValue){
  
  var cal = document.getElementsByName(this.name)[0];

  if(newValue==null||newValue==""){
  	 cal.value="";
  	 return;
  }
  if(newValue instanceof Date){
       day = newValue.getDate();
       mon = newValue.getMonth()+1;
       year = newValue.getYear();
       
       hour = newValue.getHours();
       min = newValue.getMinutes();
       sec = newValue.getSeconds();
       
       if (day<10) day='0'+day;
       if (mon<10) mon='0'+mon;
       
       if(hour<10)  hour='0'+hour;
       if(min<10)  min='0'+min;
       if(sec<10)  sec='0'+sec;
       
       cal.value = year+"-"+mon+"-"+day+" "+hour+":"+min+":"+sec;
   }else{
   
   	if(newValue.trim().length<1){
   	 	cal.value = "";
   	}else
   	 	cal.value = newValue;
   	
   }
    	
   if(cal.onchange){
	 	cal.fireEvent("onchange");
   }
   
}
function getCalValue(){
   var cal = document.getElementsByName(this.name)[0];
   return cal.value;
}
function isVisible(){
   var cal = document.getElementsByName(this.name)[0];
   return cal.parentNode.style.visibility!="hidden";
}
function setVisible(visible){
    var cal = document.getElementsByName(this.name)[0];

    if(visible=="visible"||visible=="hidden"){
        display = visible;	
    }else
    if(visible==true){
        display = "visible" 
    }else
    if(visible ==false){
    	display = "hidden";
    } 
    cal.parentNode.style.visibility = display;
}
function setCalEditable(editable){
	var cal = document.getElementsByName(this.name)[0];
	
	cal.disabled = editable;
	//cal.nextSibling.disabled = editable;
	var diaplay="hidden";
	if(editable==true){
		display = "visible";
	}else
	if(editable==false){
		display = "hidden";
	}
	//alert(cal.outerHTML);
	cal.nextSibling.style.visibility= display;
	
}
//create calendar 
function createdCalendar()
{	
    popupObj= window.createPopup();
    var popupBodyObj = popupObj.document.body;
    popupBodyObj.style.border = "0px black ridge";
    popupBodyObj.style.overflow="auto";
    //popupBodyObj.style.filter="alpha(opacity=50)";
    //popupObj.document.bgColor="#1E90FF";
    popupBodyObj.style.paddingRight='0px'; 
    popupBodyObj.style.paddingLeft='0px'; 
    //popupBodyObj.style.fontSize='12px'; 
    popupBodyObj.style.paddingBottom='0px'; 
    popupBodyObj.style.paddingTop='0px';
    
    
	var reHtml = "";
	var today = new Date();
	
    
	//css  visibility: hidden; 
	reHtml += "<style type=\"text/css\">";
	reHtml += "<!--";
	reHtml += ".table{border-collapse: separate;}";
	reHtml += ".dateSelectDiv {border: 1px solid #9966FF;position: absolute;z-index:1000;overflow:visible ;Height: 150;width: 200;left: 2px;top: 2px;font-size: 9pt;background-color: #FFFFFF;padding : 3px 3px 3px 3px;}";
	reHtml += ".dateSelectTextSize {font-size:9pt;}";
	reHtml += ".dateSelectHeadSize {font-size:9pt;}";
	reHtml += "a.dateSelectLink:link {color: #660099;text-decoration: none;}";
	reHtml += "a.dateSelectLink:visited {color: #0000CC;text-decoration: none;}";
	reHtml += "a.dateSelectLink:hover {color: #FF0000;text-decoration: none;POSITION: relative;TOP: 1px; }";
	reHtml += "a.dateSelectLink:active {color: #660099;text-decoration: none;}";
	reHtml += ".dateSelectTextField{font-size:9pt;border: 1px solid #BBB9B9;background-color : transparent;}";
	reHtml += ".dateSelectSpan{font-size:9pt;border: 1px solid #BBB9B9;background-color : #ffffff;position:absolute;overflow:hidden;}";
	reHtml += ".dateSelectSelectField{margin:-2px;font-size: 9pt;}";
	
	reHtml += "-->";
	reHtml += "</style>";
	
	//create div start...
	reHtml += "<div  id=\"dateSelectDiv\" style='border: 1px solid #999999;position: absolute;z-index:1000;overflow:visible ;left: 0px;top: 0px;font-size: 9pt;background-color: #FFFFFF;padding : 3px 3px 3px 3px;' class=\"dateSelectDiv\">";
	
	//title
	//reHtml += "<table STYLE=\"border-collapse: separate\"; width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"1\" style='font-size:9pt;' class=\"dateSelectTextSize\"><tr><td>\u8bf7\u9009\u62e9\u65e5\u671f/\u65f6\u95f4</td>";
	//reHtml += "         <td align=\"right\"><div onclick=\"parent.closeDateSelectDiv();\"  style=\"cursor:hand;color=blue;color: #660099;text-decoration: none;\" class=\"dateSelectLink\">\u5173\u95ed</div></td></tr></table>";
	
	//year and month
	reHtml += "<table  STYLE=\"border-collapse: separate\"; width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"1\" style='font-size:9pt;' class=\"dateSelectHeadSize\">";
	reHtml += "  <tr> ";
	
	reHtml += "    <td></td><td id=\"before\"><div onclick=\"parent.changeYear('-')\" class=\"dateSelectLink\" style=\"cursor:hand;color=blue;color: #660099;text-decoration: none;\" title=\"\u524d\u4e00\u5e74\"><<</div></td>";
	reHtml += "    <td id=\"chooseYear\" valign=\"baseline\">";
	reHtml += "      <input type=\"text\" style='font-size:9pt;border: 1px solid #BBB9B9;background-color : transparent;' class=\"dateSelectTextField\" size=\"4\" maxlength=\"4\" name=\"dateSelectYear\" onFocus=\"this.select();\" "+ /*onBlur=\"parent.yearChecked(this);\" onkeypress=\"parent.onlyNumber(window,this)\"*/ ">&nbsp;Äê";
	reHtml += "        <span  style=\"width:30px;font-size:9pt;border: 1px solid #BBB9B9;background-color : #ffffff;position:absolute;overflow:hidden;\" ><select name=\"dateSelectMonth\" style='margin:-2px;font-size: 9pt;' class=\"dateSelectSelectField\" onChange=\"parent.Make_Calendar(document.all.dateSelectYear.value - 0,this.value - 0 -1);\">";
	for(var i=1;i<13;i++)	reHtml += "        <option value=\"" + (i<10?"0"+i:i+"") + "\">" + (i<10?"0"+i:i+"") + "\u6708</option>";
	reHtml += "        </select></span>";
	reHtml += "    </td>";
	reHtml += "    <td id=\"after\"><span><div onclick=\"parent.changeYear('+');\" class=\"dateSelectLink\"  style=\"cursor:hand;color=blue;color: #660099;text-decoration: none;\" title=\"\u540e\u4e00\u5e74\">&nbsp;&nbsp;&nbsp;>></div></span></td>";
	reHtml += "    <td><a href=\"#\" onclick=\"parent.okClick(this);\"><font style='font-size:10pt;font-family:Verdana;'>ok</font></a></td>";
	
	reHtml += "  </tr> ";
	reHtml += "</table>";
	
	//calendar title
	//reHtml += "<table STYLE=\"border-collapse: separate;font-size:9pt;font-family:Verdana,Arial,Helvetica,sans-serif,\u5b8b\u4f53\"; border=\"1\" cellspacing=\"0\" cellpadding=\"1\" bordercolor=\"#000000\" bordercolordark=\"#ffffff\" bordercolorlight=\"#000000\" class=\"dateSelectTextSize\">";
	//reHtml += "   <tr align=\"center\" valign=\"middle\" bgcolor=\"#EEEEEE\"> ";
    //reHtml += "     <td width=\"20\" height=\"20\"><b>S</b></td>";
    //reHtml += "     <td width=\"20\" height=\"20\"><b>M</b></td>";
    //reHtml += "     <td width=\"20\" height=\"20\"><b>T</b></td>";
    //reHtml += "     <td width=\"20\" height=\"20\"><b>W</b></td>";
    //reHtml += "     <td width=\"20\" height=\"20\"><b>T</b></td>";
    //reHtml += "     <td width=\"20\" height=\"20\"><b>F</b></td>";
    //reHtml += "     <td width=\"20\" height=\"20\"><b>S</b></td>"; 
    //reHtml += "  </tr>";
	//reHtml += "</table>";
	
	//input 
	reHtml += "<span id=\"dataSelectDaySelectList\"></span>";
	
	//current time
	reHtml += "<table STYLE=\"border-collapse: separate;font-size:9pt;font-family:Verdana,Arial,Helvetica,sans-serif,\u5b8b\u4f53\"; width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"1\" class=\"dateSelectTextSize\">";
	reHtml += "    <tr> ";
	reHtml += "      <td align=\"right\">Today£º</td><td id=\"today\" align=\"left\" ><div onclick=parent.Make_Calendar(" + today.getFullYear() + "," + today.getMonth() + ") class=\"dateSelectLink\"  style=\"cursor:hand;color: #FF0000;text-decoration: none;\">" + today.getFullYear() + "\u5e74" + (today.getMonth()<9?"0"+(today.getMonth()+1):today.getMonth()+1) + "\u6708"+(today.getDate()<9?"0"+(today.getDate()):today.getDate()) + "\u65e5</div></td>";
	reHtml += "    </tr>";
	reHtml += "</table>";
	
	//time input
	reHtml += "<table STYLE=\"border-collapse: separate;font-size:9pt;font-family:\u5b8b\u4f53\"; width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"1\" class=\"dateSelectTextSize\" id=\"dateSelectInputTime\">";
	reHtml += "    <tr> ";
	reHtml += "      <td valign=\"bottom\" align=\"right\">Time£º</td><td align=\"left\">";
	reHtml += "<span style='width:40px'><input id='dateSelectHour' size='2' style='height:18' readonly><div id='HourDiv' style='width:28px; height:18px; overflow-x:hidden; overflow-y:scroll; display:inline; padding:0px; margin:0px -14px -4px -14px;' flag=false onscroll=parent.Make_changeValue(this)><div id='hour' style='height:1000000px;'></div></div></span>";
    reHtml += "<span style='width:40px'><input id='dateSelectMinute' size='2' style='height:18' readonly><div id='MinuteDiv' style='width:28px; height:18px; overflow-x:hidden; overflow-y:scroll; display:inline; padding:0px; margin:0px -14px -4px -14px;' flag=false onscroll=parent.Make_changeValue(this)><div id='minute' style='height:1000000px;'></div></div></span>";
    reHtml += "<span style='width:40px'><input id='dateSelectSecond' size='2' style='height:18' readonly><div id='SecondDiv' style='width:28px; height:18px; overflow-x:hidden; overflow-y:scroll; display:inline; padding:0px; margin:0px -14px -4px -14px;' flag=false onscroll=parent.Make_changeValue(this)><div id='second' style='height:100000px;'></div></div></span>";
	reHtml += "      </td>";
	reHtml += "    </tr>";
	reHtml += "</table>";
	//reHtml +="<iframe src='javascript:false' style=\"position:absolute; visibility:inherit; top:-1px; left:-1px; width:200px; height:250px; z-index:-1; filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';\"></iframe>";
	reHtml += "</div>";
    
    popupBodyObj.innerHTML = reHtml;
    
	//document.writeln(reHtml);
	Make_Calendar(today.getFullYear(), today.getMonth());
	//document.all.dateSelectDiv.style.visibility = "visible";
	//document.all.dateSelectDiv.style.visibility = "hidden";
}
createdCalendar();

function Make_changeValue(obj){
	if(typeof obj.oldscrollHeight=="undefined"){
	   obj.oldscrollHeight=50000;
	   return ;
	}
	if(obj.flag+""=="false") {  obj.flag = true;  return ;}
  	if(obj.previousSibling.value.indexOf("0")==0)
  	   obj.previousSibling.value = obj.previousSibling.value.substring(1);
	if(parseInt(obj.oldscrollHeight)>parseInt(obj.scrollTop)){
		
	     if((obj.id=="HourDiv"&&parseInt(obj.previousSibling.value)==23)||parseInt(obj.previousSibling.value)==59){
	        obj.oldscrollHeight=50001;
	        obj.scrollTop = 50000;
			obj.flag =false;
			return;
	     }
	     else
	       obj.previousSibling.value = parseInt(obj.previousSibling.value)+1;
	}
	else{
	    if(parseInt(obj.previousSibling.value)!=0){
	           obj.previousSibling.value = parseInt(obj.previousSibling.value)-1;
		}
		else{
			obj.scrollTop = 50000;
		}
	   
	}
	if(obj.previousSibling.value.length<2)
		obj.previousSibling.value = "0"+obj.previousSibling.value;
	obj.oldscrollHeight = obj.scrollTop;
	obj.flag =false;
}

//\u6839\u636e\u5e74\u503c\u786e\u5b9a\u9009\u7528\u7684\u6708\u4efd\u6570\u7ec4
function MyCalendar_get_daysofmonth( _year ) {
	/* 
	Check for leap year ..
	1.Years evenly divisible by four are normally leap years, except for... 
	2.Years also evenly divisible by 100 are not leap years, except for... 
	3.Years also evenly divisible by 400 are leap years. 
	*/
	if ((_year % 4) == 0) {
		if ((_year % 100) == 0 && (_year % 400) != 0)
			return Days_in_Month;
	
		return Days_in_Month_00;
	} else
		return Days_in_Month;
}

//\u6839\u636e\u5e74\u6708\u63d2\u5165\u65e5\u5386
function Make_Calendar(Year, Month) { 

	//\u6839\u636e\u5e74\u3001\u6708\u83b7\u53d6\u8be5\u6708\u7b2c\u4e00\u5929\u7684\u65e5\u671f\u5f62\u5f0f
	var First_Date = new Date(Year, Month, 1); 	
	//var Heading = Header(Year, Month); 
		
	//\u83b7\u53d6\u661f\u671f\u51e0[1-7]
	var First_Day = First_Date.getDay() + 1; 	
  	var numOfTR = 0;
  	var today = new Date();
  	
	//\u7ec4\u5408\u65e5\u671f\u5230HTML\u4ee3\u7801
	
	//\u5f53\u524d\u661f\u671f\uff08\u6362\u884c\u6807\u8bb0\uff09
	var dayflag = First_Day;	
	//\u8fd4\u56de\u7684HTML\u4ee3\u7801
	var reHtml = "";	
	
	var daysofmonth = MyCalendar_get_daysofmonth(Year);

	for(var i=1;i<=daysofmonth[Month];i++)
	{
		if(dayflag%7==1){	
		
		//\u5982\u679c\u5f53\u524d\u4e3a\u661f\u671f\u5929\uff0c\u5219\u524d\u9762\u52a0\u8d77\u59cb\u884c\u53f7
		reHtml += "<tr align=\"center\" valign=\"middle\">"; numOfTR++;}	
		reHtml += "<td width=\"20\" height=\"20\" onMouseOver=\"parent.dateSelectOnMouseEvent(1,this)\" onMouseOut=\"parent.dateSelectOnMouseEvent(2,this)\" onClick=\"parent.dateSelectOnMouseEvent(3,this)\" style=\"cursor:Hand;";
	  	if((Year==today.getFullYear())&&(Month==today.getMonth())&&(i==today.getDate()))	
	  		reHtml += "font-weight: bolder;color: #FF0000;";
		reHtml += "\">" + i;
	  	reHtml += "</td>";
	  	
	  	//\u5982\u679c\u5f53\u524d\u4e3a\u661f\u671f\u516d\uff0c\u5219\u540e\u9762\u52a0\u7ed3\u675f\u884c\u53f7
	  	if(dayflag%7==0)	
	  		reHtml += "</tr>";	
  	
  	  	dayflag++;
  	}
  
	//\u8865\u9f50\u663e\u793a\u7684\u5929\u6570
	if(First_Day != 1)
 	{	//\u5411\u524d\u4e00\u6708\u8865
  		var tempstr = "";
  		var tempmonth = (Month - 1)>0?(Month - 1):0;
  		var tempint = daysofmonth[tempmonth] - 0;
	  	for(var j=First_Date.getDay();j>0;j--)
  		{
  			tempstr = "<td width=\"20\" height=\"20\" onMouseOver=\"parent.dateSelectOnMouseEvent(1,this)\" onMouseOut=\"parent.dateSelectOnMouseEvent(2,this)\" onClick=\"parent.dateSelectOnMouseEvent(3,this,'-')\" style=\"cursor:Hand\"><font color=\"#999999\">" + tempint + "</font></td>" + tempstr;
	  		tempint--;
  		}
  	 	reHtml = "<tr align=\"center\" valign=\"middle\">" + tempstr + reHtml;
        numOfTR++;
	}
	dayflag--;
    var supply = 1;
	if(dayflag%7 != 0)
	{	//\u5411\u4e0b\u4e00\u4e2a\u6708\u8865
 		var tempstr = "";
	  	var tempint = 7 - dayflag%7;
  		for(supply=1;supply<=tempint;supply++)
  		{
  			tempstr += "<td width=\"20\" height=\"20\" onMouseOver=\"parent.dateSelectOnMouseEvent(1,this)\" onMouseOut=\"parent.dateSelectOnMouseEvent(2,this)\" onClick=\"parent.dateSelectOnMouseEvent(3,this,'+')\" style=\"cursor:Hand\"><font color=\"#999999\">" + supply + "</font></td>";
  		}
  	 	reHtml = reHtml + tempstr + "</tr>";
	}
    if(numOfTR<6){
       reHtml+="<tr align=\"center\" valign=\"middle\">\n";
       for(var k=0;k<7;k++){
          reHtml+="<td width=\"20\" height=\"20\" onMouseOver=\"parent.dateSelectOnMouseEvent(1,this)\" onMouseOut=\"parent.dateSelectOnMouseEvent(2,this)\" onClick=\"parent.dateSelectOnMouseEvent(3,this,'+')\" style=\"cursor:Hand\"><font color=\"#999999\">" + supply + "</font></td>";
          supply++;
       }
       reHtml+="</tr>";
    }
    var temp = reHtml;
	reHtml = "<table id='dateContentTable' STYLE=\"border-collapse: separate;font-size:8pt;font-family:Verdana,Arial,Helvetica,sans-serif,\u5b8b\u4f53\"; border=\"1\" cellspacing=\"0\" cellpadding=\"1\" bordercolor=\"#000000\" bordercolordark=\"#ffffff\" bordercolorlight=\"#000000\" class=\"dateSelectTextSize\">" 
	reHtml+= "   <tr align=\"center\" valign=\"middle\" bgcolor=\"#EEEEEE\"> ";
    reHtml+= "     <td width=\"20\" height=\"20\"><b>S</b></td>";
    reHtml+= "     <td width=\"20\" height=\"20\"><b>M</b></td>";
    reHtml+= "     <td width=\"20\" height=\"20\"><b>T</b></td>";
    reHtml+= "     <td width=\"20\" height=\"20\"><b>W</b></td>";
    reHtml+= "     <td width=\"20\" height=\"20\"><b>T</b></td>";
    reHtml+= "     <td width=\"20\" height=\"20\"><b>F</b></td>";
    reHtml+= "     <td width=\"20\" height=\"20\"><b>S</b></td>"; 
    reHtml+= "  </tr>";
    reHtml+= temp + "</table>";
    
	popupObj.document.all.dataSelectDaySelectList.innerHTML = reHtml;
	popupObj.document.all.dateSelectYear.value = Year;
	popupObj.document.all.dateSelectMonth.value = (Month<9?"0"+(Month+1):(Month+1)+""); 
    /*var temp = popupObj.document.all.dateSelectDiv.style.height; 
    temp=parseInt(temp.substring(0,temp.indexOf("px")));
    temp+=parseInt(popupObj.document.all.dateContentTable.rows.length)*(temp==100?25:24) +5;
    if(dateLinkObj){
       popupObj.hide();
       popupObj.show(0,dateLinkObj.offsetHeight,202,temp,dateLinkObj);
    }*/
    //popupObj.document.all.dateSelectDiv.style.height = temp+"px";
    /*
    if(document.all("helloworld"))
       document.all("helloworld").value+=popupObj.height; 
    */
    popupObj.document.all.HourDiv.scrollTop=50000;

    popupObj.document.all.MinuteDiv.scrollTop=50000;

    popupObj.document.all.SecondDiv.scrollTop=50000;

} 

//\u65e5\u671f\u5355\u5143\u683c\u7684\u9f20\u6807\u4e8b\u4ef6\u54cd\u5e94
function dateSelectOnMouseEvent(type,ele,tp)
{ 

   var dateformat = this.myObj.getAttribute("dateformat");
   if(dateformat!=null && dateformat=="HH:mm:ss"){
   	  return;
   }
	if(type==1)
	{	//\u9f20\u6807\u60ac\u505c
		ele.style.backgroundColor = "#EEEEEE";
	}else if(type==2){	//\u9f20\u6807\u79fb\u5f00
		ele.style.backgroundColor = "";
	}else if(type==3){
		if(tp=="+")	SkipBy("+",1);
		else if(tp=="-")	SkipBy("-",1);
		else	getSelectTime(ele);
	}
}

function okClick(ele,tp){
  	if(tp=="+")	SkipBy("+",1);
	else if(tp=="-")	SkipBy("-",1);
	else	getSelectTime(ele);
}

//\u5411\u524d\u3001\u5411\u540e\u7ffb\u6307\u5b9a\u4e2a\u6708\u4efd
function SkipBy(Direction,nub) { 
	
	var Selected_Year = popupObj.document.all.dateSelectYear.value - 0;
	var Selected_Month = popupObj.document.all.dateSelectMonth.value - 0 - 1;
	
	for(var i=0;i<nub;i++)
	{
		
		if (Direction == '+') 
		{ 
			if (Selected_Month == 11) 
			{ 
				Selected_Month = 0; 
				Selected_Year++; 
			}else { 
				Selected_Month++; 
			} 
		}else { 
			if (Selected_Month == 0) 
			{ 
				Selected_Month = 11; 
				Selected_Year--; 
			}else { 
				Selected_Month--; 
			} 
		} 
	  	popupObj.document.all.dateSelectYear.value = Selected_Year;
		popupObj.document.all.dateSelectMonth.value = Selected_Month + 1;
	}
	Make_Calendar(Selected_Year, Selected_Month); 
} 

//\u6839\u636e\u8f93\u5165\u7684\u5e74\u4efd\u6539\u53d8\u663e\u793a\u7684\u65e5\u5386
function changeYear(tp) { 
	var Year = popupObj.document.all.dateSelectYear.value; 
	if(tp=="+")
	{	//\u540e\u7ffb\u4e00\u5e74
		Make_Calendar(Year - 0 + 1, popupObj.document.all.dateSelectMonth.value - 0 -1); 
	}else if(tp=="-"){
		//\u524d\u7ffb\u4e00\u5e74
		Make_Calendar(Year - 0 - 1, popupObj.document.all.dateSelectMonth.value - 0 -1); 
	}else{
		//\u6587\u672c\u6846\u8f93\u5165
		if(Year.length < 4)
		{
	  		alert("\u8bf7\u8f93\u5165\u5b8c\u6574\u7684\u5e74\u4efd\uff01");
	  		popupObj.document.all.dateSelectYear.focus();
			popupObj.document.all.dateSelectYear.select();
			return;
		}else if(Year.length == 4) {     
			Make_Calendar(Year - 0, popupObj.document.all.dateSelectMonth.value - 0 -1); 
		} 
	}
} 

// show calendar
function popFormCalendar() { 
	/*
		tp£ºflag 0=show time 1-do not show time
		obj: aimObject
		params£ºdefault Value
		dstop£ºwindow.event.y
		dsleft£ºwindow.event.x
	*/
	
	/*tp = arguments[0];
	obj = arguments[1];
	params = arguments[2];
	dstop = arguments[3];
	dsleft = arguments[4];*/
	
	name = arguments[0];
	obj = document.getElementsByName(this.name)[0];
	params = obj.value;//"";

	if(obj!=null){
		this.myObj = obj;
	}
	
	var dateformat = this.myObj.getAttribute("format");
	if(dateformat.indexOf("HH")>-1){
		tp = 0;
	}else{
		tp = 1;
	}
 
    dateLinkObj = event.srcElement;
	
	if(tp==1)
	{
        popupObj.document.all.dateSelectDiv.style.width="180px";
        popupObj.document.all.dateSelectDiv.style.height="190px";
        popupObj.show(0,dateLinkObj.offsetHeight,180,190,dateLinkObj);
		popupObj.document.all.dateSelectInputTime.style.display = "none";
     
	}else{
        popupObj.document.all.dateSelectDiv.style.width="180px";
        popupObj.document.all.dateSelectDiv.style.height="214px";
        popupObj.show(0,dateLinkObj.offsetHeight,180,214,dateLinkObj);
		popupObj.document.all.dateSelectInputTime.style.display = "";
	}
		
	setDefaultValue(params);	
} 
function afterSelectTime(obj,isChange){
	if(obj.onchange){
	 	obj.fireEvent("onchange");
   }
}
//get SelectTime
function getSelectTime(ele)
{
	var oldValue = this.myObj.value;
	setSelectTime(ele);
    popupObj.hide();
    afterSelectTime(this.myObj,oldValue!=this.myObj.value);
    
	//document.all.dateSelectDiv.style.visibility = "hidden";
}

//set Select Time
function setSelectTime(ele){
	
	var year = popupObj.document.all.dateSelectYear.value;
	var year_2 = new String(year.substr(2,2));		
	var month = popupObj.document.all.dateSelectMonth.value;
	
	//\u5224\u65ad\u70b9\u51fb\u7684\u662fok or \u8fd8\u662f\u65e5\u5386\u4e0a\u7684\u65e5\u671f
	var today=new Date();
	var day;
	var onclickInnerHtml = ele.innerHTML;
	var index = onclickInnerHtml.indexOf("ok");

	if(index<0)
	  day = (ele.innerHTML.length<2?"0"+ele.innerHTML:ele.innerHTML);
	else{
	  day = today.getDate();
	  if(day.toString().length<2)
	  	day="0"+day;
	 }
	  
	var tp = popupObj.document.getElementById("dateSelectHour");
	var hour = tp.value;
	
	tp = popupObj.document.getElementById("dateSelectMinute");
	var minute = tp.value;
	
	tp = popupObj.document.getElementById("dateSelectSecond");
	var second = tp.value;
	
    myObj = document.getElementsByName(this.name)[0];
    
    var dateformat = this.myObj.getAttribute("format");
	switch (dateformat) {
		case "yyyy-MM-dd HH:mm:ss" :
			vData =  year + "-" + month + "-" + day + " "+hour+":"+minute+":"+second;
			break;
		case "yyyy-MM-dd HH:mm" :
			vData =  year + "-" + month + "-" + day + " "+hour+":"+minute;
			break;
		case "yyyy-MM-dd HH" :
			vData =  year + "-" + month + "-" + day + " "+hour;
			break;
		case "yyyy-MM-dd HH\u65f6mm\u5206ss\u79d2" :
			vData =  year + "-" + month + "-" + day + " "+hour + "\u65f6" + minute + "\u5206" + second + "\u79d2";
			break;
		case "yyyy-MM-dd HH\u65f6mm\u5206" :
			vData =  year + "-" + month + "-" + day + " "+hour + "\u65f6" + minute + "\u5206";
			break;
		case "yyyy-MM-dd HH\u65f6" :
			vData =  year + "-" + month + "-" + day + " "+hour + "\u65f6";
			break;
		case "yyyy-MM-dd" :
			vData =  year + "-" + month + "-" + day;
			break;
			
		case "yyyy/MM/dd" :
			vData = year +"/"+ month +"/"+ day;
			break;
		case "yyyy/MM/dd HH" :
			vData = year +"/"+ month +"/"+ day+ " "+hour;
			break;
		case "yyyy/MM/dd HH:mm" :
			vData = year +"/"+ month +"/"+ day+ " "+hour+":"+minute;
			break;
		case "yyyy/MM/dd HH:mm:ss" :
			vData = year +"/"+ month +"/"+ day+ " "+hour+":"+minute+":"+second;
			break;
		case "yyyy/MM/dd HH\u65f6mm\u5206ss\u79d2" :
			vData = year +"/"+ month +"/"+ day+ " "+hour + "\u65f6" + minute + "\u5206" + second + "\u79d2";
			break;
		case "yyyy/MM/dd HH\u65f6mm\u5206" :
			vData = year +"/"+ month +"/"+ day+ " "+hour + "\u65f6" + minute + "\u5206";
			break;
		case "yyyy/MM/dd HH\u65f6" :
			vData = year +"/"+ month +"/"+ day+ " "+hour + "\u65f6";
			break;
			
		case "yyyy.MM.dd HH:mm:ss" :
			vData = year + "." + month + "." + day+ " "+hour+":"+minute+":"+second;
			break;
		case "yyyy.MM.dd HH:mm" :
			vData = year + "." + month + "." + day+ " "+hour+":"+minute;
			break;
		case "yyyy.MM.dd HH" :
			vData = year + "." + month + "." + day+ " "+hour;
			break;
		case "yyyy.MM.dd HH\u65f6mm\u5206ss\u79d2" :
			vData = year + "." + month + "." + day+ " "+hour + "\u65f6" + minute + "\u5206" + second + "\u79d2";
			break;
		case "yyyy.MM.dd HH\u65f6mm\u5206" :
			vData = year + "." + month + "." + day+ " "+hour + "\u65f6" + minute + "\u5206";
			break;
		case "yyyy.MM.dd HH\u65f6" :
			vData = year + "." + month + "." + day+ " "+hour + "\u65f6" ;
			break;
		case "yyyy.MM.dd" :
			vData = year + "." + month + "." + day;
			break;

				
		case "yyyy\u5e74MM\u6708dd\u65e5" :
			vData = year + "\u5e74" + month + "\u6708" + day + "\u65e5";
			break;	
		case "yyyy\u5e74MM\u6708dd\u65e5 HH\u65f6" :
			vData = year + "\u5e74" + month + "\u6708" + day + "\u65e5" + " " + hour + "\u65f6";
			break;
		case "yyyy\u5e74MM\u6708dd\u65e5 HH\u65f6mm\u5206ss" :
			vData = year + "\u5e74" + month + "\u6708" + day + "\u65e5" + " " + hour + "\u65f6" + minute + "\u5206" ;
			break;
		case "yyyy\u5e74MM\u6708dd\u65e5 HH\u65f6mm\u5206ss\u79d2" :
			vData = year + "\u5e74" + month + "\u6708" + day + "\u65e5" + " " + hour + "\u65f6" + minute + "\u5206" + second + "\u79d2";
			break;
		case "yyyy\u5e74MM\u6708dd\u65e5 HH:mm:ss" :
			vData = year + "\u5e74" + month + "\u6708" + day + "\u65e5" + " " + hour+":"+minute+":"+second;
			break;
		case "yyyy\u5e74MM\u6708dd\u65e5 HH:mm" :
			vData = year + "\u5e74" + month + "\u6708" + day + "\u65e5" + " " + hour+":"+minute;
			break;
		case "yyyy\u5e74MM\u6708dd\u65e5 HH" :
			vData = year + "\u5e74" + month + "\u6708" + day + "\u65e5" + " " + hour;
			break;
		
		default :
			vData =  year + "-" + month + "-" + day;
		}
		
		myObj.value=vData;
		try{
			//myObj.focus();
        }catch(e){
        }
}

function closeDateSelectDiv()
{
	popupObj.hide();
    //popupObj.document.all.dateSelectDiv.style.visibility = "hidden";
}

//verify year
function yearChecked(ele)
{
	var temp = ele.value;
	if(temp=="")
	{
		alert("\u8bf7\u8f93\u5165\u5e74\u4efd");
		ele.focus();
		ele.select();
		return;
	}
	if(temp.length!=4)
	{
		alert("\u8bf7\u8f93\u51654\u4f4d\u6570\u5b57\u7684\u5e74\u4efd");
		ele.focus();
		ele.select();
		return;
	}
	var ep = temp.match(/\D/g);
	if(ep!=null)
	{
		alert("\u8f93\u5165\u7684\u5e74\u4efd\u5e94\u4e3a\u6b63\u6574\u6570");
		ele.focus();
		ele.select();
		return;
	}
	changeYear();
}
function onlyNumber(win,obj){
   
    var key = win.event.keyCode;
    if(key< 48||key >57) 
       win.event.keyCode = 0 ;
   /* obj.focus();//\u5149\u6807\u4f4d\u7f6e\u4e0d\u53d8
    var r = popupObj.document.selection.createRange();
    var selected_text = r.text;
    if(obj.value && obj.value.length>=4 && selected_text=="")
       win.event.keyCode = 0 ; */ 
}
function setDefaultValue(params){
	
	var dateformat = this.myObj.getAttribute("format");
	var today = new Date();
	if(params==null)
	{
		popupObj.document.all.dateSelectHour.value = (today.getHours()<10?"0"+today.getHours():today.getHours()+"");
		popupObj.document.all.dateSelectMinute.value = (today.getMinutes()<10?"0"+today.getMinutes():today.getMinutes()+"");
		popupObj.document.all.dateSelectSecond.value = (today.getSeconds()<10?"0"+today.getSeconds():today.getSeconds()+"");
		
	    if(dateformat=="HH:mm:ss"){
			popupObj.document.all("before").disabled=true;
			popupObj.document.all("chooseYear").disabled=true;
			popupObj.document.all("after").disabled=true;
			popupObj.document.all("dateSelectMonth").disabled=true;
			popupObj.document.all("dataSelectDaySelectList").disabled=true;
			popupObj.document.all("today").disabled=true;
			Make_Calendar(today.getFullYear(),today.getMonth());		
        }else{
        	popupObj.document.all("before").disabled=false;
			popupObj.document.all("chooseYear").disabled=false;
			popupObj.document.all("after").disabled=false;
			popupObj.document.all("dateSelectMonth").disabled=false;
			popupObj.document.all("dataSelectDaySelectList").disabled=false;
			popupObj.document.all("today").disabled=false;
        	Make_Calendar(today.getFullYear(),today.getMonth());
        }

	}else if(params.constructor==String){
	
		var cals = params.split(" ");
		var tpa="";
		var tyear,tmonth,tdate,thour,tminute;
		
		if(cals.length>0){
			if(cals[0].indexOf("-")>-1){
				tpa = cals[0].split("-");
			}else
			if(cals[0].indexOf(".")>-1){
				tpa = cals[0].split(".");
			}else
			if(cals[0].indexOf("/")>-1){
				tpa = cals[0].split("/");
			}else
			if(cals[0].indexOf("\u5e74")>-1){
				var temp = cals[0].substring(0,cals[0].indexOf("\u5e74"));
				temp += ":" + cals[0].substring(cals[0].indexOf("\u5e74")+1,cals[0].indexOf("\u6708"));
				temp += ":" + cals[0].substring(cals[0].indexOf("\u6708")+1,cals[0].indexOf("\u65e5"));
				
				tpa = temp.split(":");
			}
			
			if(tpa.length>0)
			{
				if(tpa[0].length==4)	tyear = tpa[0] - 0;
				else	tyear = today.getFullYear();
			}else	tyear = today.getFullYear();
			if(tpa.length>1){
				if(tpa[1].length==2|tpa[1].length==1)	tmonth = tpa[1] - 0 - 1;
				else	tmonth = today.getMonth();
			}else	tmonth = today.getMonth();
			if(tpa.length>2){
				if(tpa[2].length==2|tpa[2].length==1)	tdate = tpa[2] - 0;
				else	tdate = today.getDate();
			}else	tdate = today.getDate();

			
			thour = today.getHours();
			tminute = today.getMinutes();
			tsecond = today.getSeconds();
				
		}
		if(cals.length>1){
			if(cals[1].indexOf(":")>-1){
				tpa = cals[1].split(":");
			}else
			if(cals[1].indexOf("\u65f6")>-1){
				var temp = cals[1].substring(0,cals[1].indexOf("\u65f6"));
				temp += ":" + cals[1].substring(cals[1].indexOf("\u65f6")+1,cals[1].indexOf("\u5206"));
				temp += ":" + cals[1].substring(cals[1].indexOf("\u5206")+1,cals[1].indexOf("\u79d2"));
				//alert(temp);
				tpa = temp.split(":");
			}
			if(tpa.length>0){
				if(tpa[0].length==2|tpa[0].length==1)	thour = tpa[0] - 0;
				else	thour = today.getHours();
			}else	thour = today.getHours();
			if(tpa.length>1){
				if(tpa[1].length==2|tpa[1].length==2)	tminute = tpa[1] - 0;
				else	tminute = today.getMinutes();
			}else	tminute = today.getMinutes();
			if(tpa.length>2){
				if(tpa[2].length==2|tpa[2].length==2)	tsecond = tpa[2] - 0;
				else	tsecond = today.getSeconds();
			}else	tsecond = today.getSeconds();
	
		}

			var tp = popupObj.document.getElementById("dateSelectHour");
			var ep = (thour<10?"0"+thour:thour+"");
			tp.value = ep;
			
			tp = popupObj.document.getElementById("dateSelectMinute");			
			ep = (tminute<10?"0"+tminute:tminute+"");
			tp.value = ep;
			
			tp = popupObj.document.getElementById("dateSelectSecond");
			ep = (tsecond<10?"0"+tsecond:tsecond+"");
			tp.value = ep;			
		

		
		if(dateformat=="HH:mm:ss"){
			popupObj.document.all("before").disabled=true;
			popupObj.document.all("chooseYear").disabled=true;
			popupObj.document.all("after").disabled=true;
			popupObj.document.all("dateSelectMonth").disabled=true;
			popupObj.document.all("dataSelectDaySelectList").disabled=true;
			popupObj.document.all("today").disabled=true;
			Make_Calendar(today.getFullYear(),today.getMonth());		
        }else{		
        	popupObj.document.all("before").disabled=false;
			popupObj.document.all("chooseYear").disabled=false;
			popupObj.document.all("after").disabled=false;
			popupObj.document.all("dateSelectMonth").disabled=false;
			popupObj.document.all("dataSelectDaySelectList").disabled=false;
			popupObj.document.all("today").disabled=false;	
		    Make_Calendar(tyear,tmonth);
	    }
	}
	
}
