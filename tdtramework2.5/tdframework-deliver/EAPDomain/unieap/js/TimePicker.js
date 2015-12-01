//每月的天数
//var Days_in_Month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); 

// Non-Leap year Month days..
Days_in_Month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Leap year Month days..
Days_in_Month_00 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//月份
var Month_Label = new Array('一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'); 

var myObj;
var popupObj;
var dateLinkObj 
//创建日历层及相关的样式
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
    
	//要用到的样式visibility: hidden; 
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
	
	//开始新建层
	reHtml += "<div  id=\"dateSelectDiv\" style='border: 1px solid #999999;position: absolute;z-index:1000;overflow:visible ;left: 0px;top: 0px;font-size: 9pt;background-color: #FFFFFF;padding : 3px 3px 3px 3px;' class=\"dateSelectDiv\">";
	
	//标题行
	//reHtml += "<table STYLE=\"border-collapse: separate\"; width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"1\" style='font-size:9pt;' class=\"dateSelectTextSize\"><tr><td>请选择日期/时间</td>";
	//reHtml += "         <td align=\"right\"><div onclick=\"parent.closeDateSelectDiv();\"  style=\"cursor:hand;color=blue;color: #660099;text-decoration: none;\" class=\"dateSelectLink\">关闭</div></td></tr></table>";
	
	//年月选择
	reHtml += "<table STYLE=\"border-collapse: separate\"; width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"1\" style='font-size:9pt;' class=\"dateSelectHeadSize\">";
	reHtml += "  <tr> ";
	reHtml += "    <td>&nbsp;&nbsp;</td><td><div onclick=\"parent.changeYear('-')\" class=\"dateSelectLink\" style=\"cursor:hand;color=blue;color: #660099;text-decoration: none;\" title=\"前一年\"><<</div></td>";
	reHtml += "    <td valign=\"baseline\">";
	reHtml += "      <input type=\"text\" style='font-size:9pt;border: 1px solid #BBB9B9;background-color : transparent;' class=\"dateSelectTextField\" size=\"4\" maxlength=\"4\" name=\"dateSelectYear\" onFocus=\"this.select();\" "+ /*onBlur=\"parent.yearChecked(this);\" onkeypress=\"parent.onlyNumber(window,this)\"*/ ">&nbsp;年";
	reHtml += "        <span  style=\"width:30px;font-size:9pt;border: 1px solid #BBB9B9;background-color : #ffffff;position:absolute;overflow:hidden;\" ><select name=\"dateSelectMonth\" style='margin:-2px;font-size: 9pt;' class=\"dateSelectSelectField\" onChange=\"parent.Make_Calendar(document.all.dateSelectYear.value - 0,this.value - 0 -1);\">";
	for(var i=1;i<13;i++)	reHtml += "        <option value=\"" + (i<10?"0"+i:i+"") + "\">" + (i<10?"0"+i:i+"") + "月</option>";
	reHtml += "        </select></span>";
	reHtml += "    </td>";
	reHtml += "    <td><span><div onclick=\"parent.changeYear('+');\" class=\"dateSelectLink\"  style=\"cursor:hand;color=blue;color: #660099;text-decoration: none;\" title=\"后一年\">&nbsp;&nbsp;&nbsp;>></div></span></td>";
	reHtml += "    <td>&nbsp;</td>";
	reHtml += "  </tr> ";
	reHtml += "</table>";
	
	//日历抬头
	//reHtml += "<table STYLE=\"border-collapse: separate;font-size:9pt;font-family:Verdana,Arial,Helvetica,sans-serif,宋体\"; border=\"1\" cellspacing=\"0\" cellpadding=\"1\" bordercolor=\"#000000\" bordercolordark=\"#ffffff\" bordercolorlight=\"#000000\" class=\"dateSelectTextSize\">";
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
	
	//插入日历的地方
	reHtml += "<span id=\"dataSelectDaySelectList\"></span>";
	
	//当前日期
	reHtml += "<table STYLE=\"border-collapse: separate;font-size:9pt;font-family:Verdana,Arial,Helvetica,sans-serif,宋体\"; width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"1\" class=\"dateSelectTextSize\">";
	reHtml += "    <tr> ";
	reHtml += "      <td align=\"right\">Today：</td><td align=\"left\" ><div onclick=parent.Make_Calendar(" + today.getFullYear() + "," + today.getMonth() + ") class=\"dateSelectLink\"  style=\"cursor:hand;color: #FF0000;text-decoration: none;\">" + today.getFullYear() + "年" + (today.getMonth()<9?"0"+(today.getMonth()+1):today.getMonth()+1) + "月"+(today.getDate()<9?"0"+(today.getDate()):today.getDate()) + "日</div></td>";
	reHtml += "    </tr>";
	reHtml += "</table>";
	
	//时间输入
	reHtml += "<table STYLE=\"border-collapse: separate;font-size:9pt;font-family:宋体\"; width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"1\" class=\"dateSelectTextSize\" id=\"dateSelectInputTime\">";
	reHtml += "    <tr> ";
	reHtml += "      <td valign=\"bottom\" align=\"right\">Time：</td><td align=\"left\">";
	reHtml += "<span style='width:37px'><input id='dateSelectHour' size='2' style='height:18' readonly><div id='HourDiv' style=' width:18px; height:18px; overflow-x:hidden; overflow-y:scroll; display:inline; padding:0px; margin:-5px 0px 0px -10px;' flag=false onscroll=parent.Make_changeValue(this)><div id='hour' style='height:1000000px;'></div></div></span>";
    reHtml += "<span style='width:37px'><input id='dateSelectMinute' size='2' style='height:18' readonly><div id='MinuteDiv' style=' width:18px; height:18px; overflow-x:hidden; overflow-y:scroll; display:inline; padding:0px; margin:-5px 0px 0px -10px;' flag=false onscroll=parent.Make_changeValue(this)><div id='minute' style='height:1000000px;'></div></div></span>";
    reHtml += "<span style='width:37px'><input id='dateSelectSecond' size='2' style='height:18' readonly><div id='SecondDiv' style=' width:18px; height:18px; overflow-x:hidden; overflow-y:scroll; display:inline; padding:0px; margin:-5px 0px 0px -10px;' flag=false onscroll=parent.Make_changeValue(this)><div id='second' style='height:100000px;'></div></div></span>";
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
	if(parseInt(obj.oldscrollHeight)<parseInt(obj.scrollTop)){
		
	     if((obj.id=="HourDiv"&&parseInt(obj.previousSibling.value)==23)||parseInt(obj.previousSibling.value)==59){
	        obj.oldscrollHeight=49999;
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

//根据年值确定选用的月份数组
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

//根据年、月插入日历
function Make_Calendar(Year, Month) { 
	var First_Date = new Date(Year, Month, 1); 	//根据年、月获取该月第一天（a）的日期形式
//	var Heading = Header(Year, Month); 	//获取抬头，及该年份2月的天数
	var First_Day = First_Date.getDay() + 1; 	//获取a是星期几：1（星期日） 到 7（星期六）
  	var numOfTR = 0;
  	var today = new Date();
  	
	//组合日期到HTML代码
	var dayflag = First_Day;	//当前星期（换行标记）  
	var reHtml = "";	//返回的HTML代码
	
	var daysofmonth = MyCalendar_get_daysofmonth(Year);

	for(var i=1;i<=daysofmonth[Month];i++)
	{
		if(dayflag%7==1){	reHtml += "<tr align=\"center\" valign=\"middle\">"; numOfTR++;}	//如果当前为星期天，则前面加起始行号
		reHtml += "<td width=\"20\" height=\"20\" onMouseOver=\"parent.dateSelectOnMouseEvent(1,this)\" onMouseOut=\"parent.dateSelectOnMouseEvent(2,this)\" onClick=\"parent.dateSelectOnMouseEvent(3,this)\" style=\"cursor:Hand;";
	  	if((Year==today.getFullYear())&&(Month==today.getMonth())&&(i==today.getDate()))	reHtml += "font-weight: bolder;color: #FF0000;";
		reHtml += "\">" + i;
	  	reHtml += "</td>";
	  	if(dayflag%7==0)	reHtml += "</tr>";	//如果当前为星期六，则后面加结束行号
  	
  	  	dayflag++;
  	}
  
	//补齐显示的天数
	if(First_Day != 1)
 	{	//向前一月补
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
	{	//向下一个月补
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
	reHtml = "<table id='dateContentTable' STYLE=\"border-collapse: separate;font-size:8pt;font-family:Verdana,Arial,Helvetica,sans-serif,宋体\"; border=\"1\" cellspacing=\"0\" cellpadding=\"1\" bordercolor=\"#000000\" bordercolordark=\"#ffffff\" bordercolorlight=\"#000000\" class=\"dateSelectTextSize\">" 
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

//日期单元格的鼠标事件响应
function dateSelectOnMouseEvent(type,ele,tp)
{ 
	if(type==1)
	{	//鼠标悬停
		ele.style.backgroundColor = "#EEEEEE";
	}else if(type==2){	//鼠标移开
		ele.style.backgroundColor = "";
	}else if(type==3){
		if(tp=="+")	SkipBy("+",1);
		else if(tp=="-")	SkipBy("-",1);
		else	getSelectTime(ele);
	}
}

//向前、向后翻指定个月份
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

//根据输入的年份改变显示的日历
function changeYear(tp) { 
	var Year = popupObj.document.all.dateSelectYear.value; 
	if(tp=="+")
	{	//后翻一年
		Make_Calendar(Year - 0 + 1, popupObj.document.all.dateSelectMonth.value - 0 -1); 
	}else if(tp=="-"){
		//前翻一年
		Make_Calendar(Year - 0 - 1, popupObj.document.all.dateSelectMonth.value - 0 -1); 
	}else{
		//文本框输入
		if(Year.length < 4)
		{
	  		alert("请输入完整的年份！");
	  		popupObj.document.all.dateSelectYear.focus();
			popupObj.document.all.dateSelectYear.select();
			return;
		}else if(Year.length == 4) {     
			Make_Calendar(Year - 0, popupObj.document.all.dateSelectMonth.value - 0 -1); 
		} 
	}
} 

//显示日历


function riliShow() { 
	/*
		tp：标志	0－显示时间	1－不显示时间
		obj: 目标对象
		params：参数，可以是数组或字符串(用于存放输入框内的信息，从而弹出窗口将显示该信息，不然显示的为当前日期)
			字符串时以 “－” 进行分割
		dstop：window.event.y
		dsleft：window.event.x
	*/
	
	tp = arguments[0];
	obj = arguments[1];
	params = arguments[2];
	dstop = arguments[3];
	dsleft = arguments[4];
	if(obj!=null){
		this.myObj = obj;
	}
	
		var today = new Date();
		var showTop,showLeft;
		//if(dstop!=null)	{  
        //    showTop = window.event.y  ;
        //    if((document.body.clientHeight - showTop)<250&&showTop>=250)
        //       showTop = showTop - 250;
        //    showTop = showTop + document.body.scrollTop ;
       // }
		//else showTop = dstop - 0;
		
		//if(dsleft!=null){            
       // 	showLeft = window.event.x ;
        //    if(document.body.clientWidth<(showLeft+200)&&showLeft>=200)
       //        showLeft = showLeft -200;
       //    showLeft=showLeft + document.body.scrollLeft;
       // }
		//else showLeft = dsleft - 0;
		//document.all.dateSelectDiv.style.left = showLeft;
		//ocument.all.dateSelectDiv.style.top = showTop; 
		//document.all.dateSelectDiv.style.visibility = "visible";
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
		
		if(params==null)
		{
			popupObj.document.all.dateSelectHour.value = (today.getHours()<10?"0"+today.getHours():today.getHours()+"");
			popupObj.document.all.dateSelectMinute.value = (today.getMinutes()<10?"0"+today.getMinutes():today.getMinutes()+"");
			popupObj.document.all.dateSelectSecond.value = (today.getSeconds()<10?"0"+today.getSeconds():today.getSeconds()+"");
			
			Make_Calendar(today.getFullYear(),today.getMonth());
		}else if(params.constructor==Array){
			//alert("Array\n"+params)
			var tyear,tmonth,tdate,thour,tminute,tsecond;
			if(params.length>0)
			{
				if(params[0].length==4)	tyear = params[0] - 0;
				else	tyear = today.getFullYear();
			}
			if(params.length>1){
				if(params[1].length==2)	tmonth = params[1] - 0 - 1;
				else	tmonth = today.getMonth();
			}
			if(params.length>2){
				if(params[2].length==2)	tdate = params[2] - 0;
				else	tdate = today.getDate();
			}
			if(params.length>3){
				if(params[3].length==2)	thour = params[3] - 0;
				else	thour = today.getHours();
			}
			if(params.length>4){
				if(params[4].length==2)	tminute = params[4] - 0;
				else	tminute = today.getMinutes();
			}
			if(params.length>5){
				if(params[5].length==2)	tsecond = params[5] - 0;
				else	tsecond = today.getSeconds();
			}
			//设置小时
			var tp = popupObj.document.getElementById("dateSelectHour");
			var ep = (thour<10?"0"+thour:thour+"");
			tp.value = ep;
			//设置分钟
			tp = popupObj.document.getElementById("dateSelectMinute");
			//tminute = (tminute - tminute%5);
			ep = (tminute<10?"0"+tminute:tminute+"");
			tp.value = ep;
			
			//设置秒
			tp = popupObj.document.getElementById("dateSelectSecond");
			//tsecond = (tsecond - tsecond%5);
			ep = (tsecond<10?"0"+tsecond:tsecond+"");
			tp.value = ep;
			
			Make_Calendar(tyear,tmonth);
		}else if(params.constructor==String){
			//alert("String\n"+params)
			var tpa = params.split("-");
			var tyear,tmonth,tdate,thour,tminute;
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
			if(tpa.length>3){
				if(tpa[3].length==2|tpa[3].length==1)	thour = tpa[3] - 0;
				else	thour = today.getHours();
			}else	thour = today.getHours();
			if(tpa.length>4){
				if(tpa[4].length==2|tpa[4].length==2)	tminute = tpa[4] - 0;
				else	tminute = today.getMinutes();
			}else	tminute = today.getMinutes();
			if(tpa.length>5){
				if(tpa[5].length==2|tpa[5].length==2)	tsecond = tpa[5] - 0;
				else	tsecond = today.getSeconds();
			}else	tsecond = today.getSeconds();
			
			var tp = popupObj.document.getElementById("dateSelectHour");
			var ep = (thour<10?"0"+thour:thour+"");
			tp.value = ep;
			
			tp = popupObj.document.getElementById("dateSelectMinute");
			//tminute = (tminute - tminute%5);
			ep = (tminute<10?"0"+tminute:tminute+"");
			tp.value = ep;
			
			tp = popupObj.document.getElementById("dateSelectSecond");
			//tsecond = (tsecond - tsecond%5);
			ep = (tsecond<10?"0"+tsecond:tsecond+"");
			tp.value = ep;
			
			Make_Calendar(tyear,tmonth);
		}
	
} 

//获取选取的时间
function getSelectTime(ele)
{

	setSelectTime(ele);
    popupObj.hide();
	//document.all.dateSelectDiv.style.visibility = "hidden";
}

//缺省的设置时间
function setSelectTime(ele){

	var year = popupObj.document.all.dateSelectYear.value;
	var year_2 = new String(year.substr(2,2));		//两位年
	var month = popupObj.document.all.dateSelectMonth.value;
	var day = (ele.innerHTML.length<2?"0"+ele.innerHTML:ele.innerHTML);
	var tp = popupObj.document.getElementById("dateSelectHour");
	var hour = tp.value;
	
	tp = popupObj.document.getElementById("dateSelectMinute");
	var minute = tp.value;
	
	tp = popupObj.document.getElementById("dateSelectSecond");
	var second = tp.value;
	
	dateformat = this.myObj.getAttribute("dateformat");

	switch (dateformat) {
		case "YYYY-MM-DD HH:MI:SS" :
			vData =  year + "-" + month + "-" + day + " "+hour+":"+minute+":"+second;
			break;
		case "YYYY-MM-DD HH:MI" :
			vData =  year + "-" + month + "-" + day + " "+hour+":"+minute;
			break;
		case "YYYY-MM-DD" :
			vData =  year + "-" + month + "-" + day;
			break;
		case "YYYY-MM" :
			vData =  year + "-" + month;
			break;
			
		case "YYYY" :
			vData =  year;
			break;
		case "YYYYMM" :
			vData = year+ month;
			break;
		case "YYYYMMDD" :
			vData = year+ month + day;
			break;
		case "YYYYMMDD HH:MI" :
			vData = year+ month + day+ " "+hour+":"+minute;
			break;
		case "YYYYMMDD HH:MI:SS" :
			vData = year+ month + day+ " "+hour+":"+minute+":"+second;
			break;
			
		case "MM-DD-YYYY HH:MI:SS" :
			vData = month + "-" + day + "-" + year+ " "+hour+":"+minute+":"+second;
			break;	
		case "MM-DD-YYYY" :
			vData = month + "-" + day + "-" + year;
			break;

		case "DD-MM-YYYY HH:MI:SS" :
			vData = day + "-" + month + "-" + year+ " "+hour+":"+minute+":"+second;
			break;
		case "DD-MM-YYYY" :
			vData = day + "-" + month + "-" + year;
			break;

		default :
			vData =  year + "-" + month + "-" + day;
		}
		myObj.value=vData;
}

function closeDateSelectDiv()
{
	popupObj.hide();
    //popupObj.document.all.dateSelectDiv.style.visibility = "hidden";
}

//校验年份
function yearChecked(ele)
{
	var temp = ele.value;
	if(temp=="")
	{
		alert("请输入年份！");
		ele.focus();
		ele.select();
		return;
	}
	if(temp.length!=4)
	{
		alert("请输入4位数字的年份！");
		ele.focus();
		ele.select();
		return;
	}
	var ep = temp.match(/\D/g);
	if(ep!=null)
	{
		alert("输入的年份应为正整数！");
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
   /* obj.focus();//光标位置不变
    var r = popupObj.document.selection.createRange();
    var selected_text = r.text;
    if(obj.value && obj.value.length>=4 && selected_text=="")
       win.event.keyCode = 0 ; */ 
}
