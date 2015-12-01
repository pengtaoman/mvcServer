//******************************************************************************//
//             Neusoft Form System v2.0 JAVAScript Library(NFSJL)               //
//                                      2004-04-07                              //
//******************************************************************************//
var gdCtrl = new Object();
//var gdCtrl2 = new Object();
//var goSelectTag = new Array();
var gcGray = "#808080";
var gcToggle = "#ffff00";
var gcBG = "#cccccc";
var gcWhite = "#ffffff";
var gcOver = "#9DBAE1";
var gcActive = "#3C75C4";
var gcDarkBG = "#D3D3D3";
var gcNormal = "#F7F9F6";
var cbOver = "#990099";

var gdCurDate = new Date();
var giYear = gdCurDate.getFullYear();
var giMonth = gdCurDate.getMonth()+1;
var giDay = gdCurDate.getDate();

var giHour = gdCurDate.getHours();
var giMinute = gdCurDate.getMinutes();
var giSecond = gdCurDate.getSeconds();
var editable = true;

var curDay = giDay;
var curYear = giYear;
var curMonth = giMonth;

var DYear = giYear;
var DMonth = giMonth;
var DDay = giDay;

var DValue = "";
var daysPerMonth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);


var theTimmer ;

/*lincx 2009-02-17 
 * format date data to chinese
 */
function formatNumToCH(data,isYear)
{
  var result = ""; 
   if(isYear)
   {
     result = changeDataToCh(data);   
   }
   else 
   {
     //月分,日数,小时,分钟,秒处理方式
     if(data.indexOf("0") === 0)
     {
       
        //0开始不用转换
        data = data.substring(1);
        result = changeDataToCh(data);
        
     }
     else
     {
        result = changeDataToCh(data);
        
        if(result.charAt(0) == "一")
        {
           if(result.charAt(result.length-1) == "零")
           {
              result = "十";
           }
           else
           {
           		result = "十"+ result.charAt(1);
           }
        }
        else
        {
           if(result.charAt(result.length-1) == "零")
           {
             result = result.charAt(0)+"十";
           }
           else
           {
        		result = result.charAt(0)+"十"+ result.charAt(1);
        	}
        }
     }
   }
   return result;
}
/*lincx 2009-02-17 
 * format date chinese data to digital
 */
function formatChNumToDigital(data,isYear)
{
  var result = ""; 
   if(isYear)
   {
     result = changeChToDigital(data);   
   }
   else 
   {
     //月分,日数,小时,分钟,秒处理方式
     if(data.length == 1)
     {
        if(data != "十")
        {
        	result = "0"+ changeChToDigital(data); 
        }
        else
        {
            result = "10";
        } 
     }
     else
     {
       if(data.length == 2)
       {
          if(data.charAt(0) == "十")
          {
             result = "1"+ changeChToDigital(data.substring(0)); 
          }
          else
          {
             result = changeChToDigital(data.substring(0))+"0"; 
          }
       }
       else
       {
           result = changeChToDigital(data.charAt(0))+changeChToDigital(data.charAt(data.length-1));  
       }
     }
   }
   return result;
}
/**
 *lincx 2009-02-17
 *把输入的data转换成中文
 */
function changeDataToCh(data)
{
   
   var result = "";
   var numArray = ['0','1','2','3','4','5','6','7','8','9'];
   var chArray = ['零','一','二','三','四','五','六','七','八','九']; 
   for( i = 0; i < data.length;i++)
   {
        for(j = 0; j < numArray.length;j++)
        {
          if(data.charAt(i) == numArray[j])
          {
            result += chArray[j];
            break;
          }
        }
     }
  return result; 
}
/*
 * 把输入的汉字转为数字
 */
function changeChToDigital(data)
{
    var result = "";
   var numArray = ['0','1','2','3','4','5','6','7','8','9'];
   var chArray = ['零','一','二','三','四','五','六','七','八','九']; 
   for( i = 0; i < data.length;i++)
   {
        for(j = 0; j < chArray.length;j++)
        {
          if(data.charAt(i) == chArray[j])
          {
            result += numArray[j];
            break;
          }
        }
     }
  return result;
}

/**
  * 判断输入的数据是否是数字
  */
function isDigital(data)
{
    var patrn=/^[0-9]*$/; 
	if (!patrn.exec(data)) return false 
	return true 
}


var dateFormatType  = {
	                F1: "yyyy\u5e74MM\u6708dd\u65e5",
	                F2: "yyyy-MM-dd",
	                F3: "yyyy.MM.dd",
	                F4: "yyyy/MM/dd",
	                F5: "yyyy\u5e74MM\u6708dd\u65e5  HH\u65f6mm\u5206ss\u79d2",
	                F6: "yyyy\u5e74MM\u6708dd\u65e5  HH\u65f6mm\u5206",
	                F7: "yyyy\u5e74MM\u6708dd\u65e5  HH\u65f6",
	                F8: "yyyy\u5e74MM\u6708dd\u65e5  HH\uff1amm\uff1ass",
	                F9: "yyyy\u5e74MM\u6708dd\u65e5  HH\uff1amm",
	                F10: "yyyy\u5e74MM\u6708dd\u65e5  HH",
	                F11: "yyyy-MM-dd  HH\uff1amm\uff1ass",
	                F12: "yyyy-MM-dd  HH\uff1amm",
	                F13: "yyyy-MM-dd  HH",
	                F11: "yyyy.MM.dd  HH\uff1amm\uff1ass",
	                F12: "yyyy.MM.dd  HH\uff1amm",
	                F13: "yyyy.MM.dd  HH",
	                F14: "yyyy/MM/dd  HH\uff1amm\uff1ass",
	                F15: "yyyy/MM/dd  HH\uff1amm",
	                F16: "yyyy/MM/dd  HH",	                	                	                
	                size:16
	              }

function getFormCalendar(name){
    var cal = getFormObjectByName(name);
    try{
      if(!cal){
    	cal = new FormCalendar(name); 
    	FORM_OBJECT_POOL.put(name,cal);
      }
    }
    catch(e){
      alert(e);
    } 
    return cal;

}
function FormCalendar(name){
   this.name = name;
   this.getValue = getValue;
   this.setValue = setValue;
   this.show = show;
   this.isVisible = isVisible;
}

function getValue(){
   var cal = getElementsByName(this.name);//document.getElementsByName(this.name)[0];
   return cal.value;
}
function setValue(newValue){
  var cal = getElementsByName(this.name);//document.getElementsByName(this.name)[0];
  
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
   if(cal.required=="true")
    	showRequiredDiv(cal); 
    	
   if(cal.onchange){
	 	cal.fireEvent("onchange");
   }
   
}

function fSetTimes(){
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  
  if(hour<10) hour = '0'+hour;
  if(minute<10) minute = '0'+minute;
  if(second<10) second = '0'+second;
  tbHour.value = hour;
  giHour = hour;
  tbMinute.value = minute;
  giMinute = minute;
  tbSecond.value = second;
  giSecond = second;
  if(editable)
  	theTimmer = setTimeout("fSetTimes()",1000);
}

function setEditable(edi){
  editable = edi;
  clearTimeout(theTimmer);
}
function show(visible){
    var cal = getElementsByName(this.name);//document.getElementsByName(this.name)[0];
    var img = cal.nextSibling;
    var display = cal.style.visibility;
    if(visible=="visible"||visible=="hidden"){
        display = visible;	
    }else
    if(visible==true){
        display = "visible" 
    }else
    if(visible ==false){
    	display = "hidden";
    } 	    
    cal.style.visibility =  display;
    img.style.visibility =  display;
    
}
function isVisible(){
   var cal = getElementsByName(this.name);
   return cal.style.visibility!="hidden";
}
var flag=0;
function popFormCalendar(pp, dt){
  event.cancelBubble=true;
  fHideCalendar();
  ////////////////////////////////////////
  gdCtrl = document.getElementById(dt);
  popCtrl = document.getElementById(pp);
  ////////////////////////////////////////
  
  var point = fGetXY(popCtrl);
  //if(popCtrl.parentNode.style.position!="absolute")
  //		point.y -= popCtrl.offsetParent.offsetTop;
		
  with (VicPopCal.style) {
        width = VicPopCal.offsetWidth;
        height = VicPopCal.offsetHeight;

        left = point.x;//point.x + popCtrl.offsetWidth + 20;//

        /*		    
		    top = point.y - parseInt(VicPopCal.offsetHeight);
		*/
		
		top = point.y+popCtrl.offsetHeight+1;
        //fToggleTags(point);
        visibility = 'visible';
  }
  DValue = gdCtrl.value;
 
  if(DValue==""){
    
    fSetYearMon(giYear, giMonth);
   
    setSelectedDate(giYear,giMonth,giDay);
  
    setEditable(true);
   
    fSetTimes();
     
   
  }else{ 
    //根据格式把汉字转成数字 
    setDefaultValue(gdCtrl.format,DValue);
  }
  var timeTR = VicPopCal.childNodes[0].childNodes[0].childNodes[2];
  if(timeTR){
      //lincx 2009-02-17 chang for display chinese
      if(gdCtrl.format.indexOf("HH")==-1 && gdCtrl.format.indexOf("某时") == -1 ){
        timeTR.style.display="none";
        VicPopCal.style.height = VicPopCal.offsetHeight - 24;
     }else{
        timeTR.style.display="block";
      }
  }
  VicPopCal.focus();


}
function judgeLeapYear(yearStr){ 
  if(!(isNaN(yearStr)) && yearStr.toString().length==4 && (yearStr%100==0?yearStr%400==0:yearStr%4==0)) 
       return true; 
   return false; 
} 

function setSelectedDate(year, month, day){

  var isCurMonth = 0;
  var i=0;
  var fday = day.toString().charAt(0);
  var sday = day.toString().charAt(1);
  var curDayIsOk = false;
  var giDayIsOk = false;
  //alert(month); 
  if(judgeLeapYear(year)){
     daysPerMonth[1] = 29;
  }else{
     daysPerMonth[1] = 28;
  }
  if(day>daysPerMonth[month-1]){
     day = daysPerMonth[month-1];
  }

  var offnum = 0;

  if(cellText[0].innerText!="1"){
     if(month==1){
       offnum = daysPerMonth[11] - cellText[0].innerText + 1;
     }
     else offnum = daysPerMonth[month-2]-cellText[0].innerText + 1;
  }
  
  if(year==giYear&&month==giMonth){
     if(fday=="0"){
        if(sday==giDay){ 
           cellText[parseInt(sday)-1+offnum].color = gcWhite;
           calCell[parseInt(sday)-1+offnum].style.font=" bold 12  \u5b8b\u4f53";
           //calCell[parseInt(sday)-1+offnum].background="form/data/images/active-bg.gif";
           calCell[parseInt(sday)-1+offnum].style.backgroundColor = gcActive;
           curDay = sday;
        }else {
           cellText[parseInt(sday)-1+offnum].color = gcWhite;
           calCell[parseInt(sday)-1+offnum].style.font=" 12  \u5b8b\u4f53";
           //calCell[parseInt(sday)-1+offnum].background="form/data/images/active-bg.gif";
           calCell[parseInt(sday)-1+offnum].style.backgroundColor = gcActive;
           curDay = sday;
           
           calCell[parseInt(giDay)-1+offnum].style.font ="bold 12  \u5b8b\u4f53";          
        }
     }else{
        if(day==giDay){ 
           cellText[parseInt(day)-1+offnum].color = gcWhite;
           calCell[parseInt(day)-1+offnum].style.font=" bold 12  \u5b8b\u4f53";
           //calCell[parseInt(day)-1+offnum].background="form/data/images/active-bg.gif";
           calCell[parseInt(day)-1+offnum].style.backgroundColor = gcActive;
           curDay = day;
        }else {
           cellText[parseInt(day)-1+offnum].color = gcWhite;
           calCell[parseInt(day)-1+offnum].style.font=" 12  \u5b8b\u4f53";
           //calCell[parseInt(day)-1+offnum].background="form/data/images/active-bg.gif";
           calCell[parseInt(day)-1+offnum].style.backgroundColor = gcActive;
           curDay = day;
           
           calCell[parseInt(giDay)-1+offnum].style.font ="bold 12  \u5b8b\u4f53";          
        }     
     }
   
  }else{
     if(fday=="0"){ 
           cellText[parseInt(sday)-1+offnum].color = gcWhite;
           calCell[parseInt(sday)-1+offnum].style.font=" 12  \u5b8b\u4f53";
           //calCell[parseInt(sday)-1+offnum].background="form/data/images/active-bg.gif";
           calCell[parseInt(sday)-1+offnum].style.backgroundColor = gcActive;
           curDay = sday;
     }else{ 
           cellText[parseInt(day)-1+offnum].color = gcWhite;
           calCell[parseInt(day)-1+offnum].style.font=" 12  \u5b8b\u4f53";
           //calCell[parseInt(day)-1+offnum].background="form/data/images/active-bg.gif";
           calCell[parseInt(day)-1+offnum].style.backgroundColor = gcActive;
           curDay = day;

     }   
  }
 
  fSetDate(year,month,day);
}
function setDefaultValue(format, value){
  var nowformat="";
  if(value.indexOf("\u5e74")>0){
     if(value.indexOf("\u65f6")){
        nowformat = "yyyy\u5e74MM\u6708dd\u65e5 HH\u65f6mm\u5206ss\u79d2";
     }
     else if(value.indexOf(":")){
       nowformat = "yyyy\u5e74MM\u6708dd\u65e5 HH:mm:ss";
     }
  }else if(value.indexOf(".")>0){
     if(value.indexOf("\u65f6")){
        nowformat = "yyyy.MM.dd HH\u65f6mm\u5206ss\u79d2";
     }
     else if(value.indexOf(":")){
       nowformat = "yyyy.MM.dd HH:mm:ss";
     }  
  }else if(value.indexOf("/")>0){
     if(value.indexOf("\u65f6")){
        nowformat = "yyyy/MM/dd HH\u65f6mm\u5206ss\u79d2";
     }
     else if(value.indexOf(":")){
       nowformat = "yyyy/MM/dd HH:mm:ss";
     }  
  }else{
     if(value.indexOf("\u65f6")){
        nowformat = "yyyy-MM-dd HH\u65f6mm\u5206ss\u79d2";
     }
     else if(value.indexOf(":")){
       nowformat = "yyyy-MM-dd HH:mm:ss";
     }   
  }

  var hYear = nowformat.indexOf("yyyy");
  DYear = value.substring(hYear,hYear+4);
  /**
   * [LRSYS MODIFY]
   * Description:???????????????????????????2007-5-5??????????
   * Author:???(sun.xy@neusoft.com)
   * Date:2007-05-05
   * History:
   * his1:
   */
  /*?????
  var hMonth = nowformat.indexOf("MM");
  DMonth = value.substring(hMonth,hMonth+2);
  var sMonth = value.substring(hMonth+1,hMonth+2);
 
  var hDay = nowformat.indexOf("dd");
  DDay = value.substring(hDay,hDay+2); 
  */
  var DMonth;
  var DDay; 
  if(value.indexOf("\u5e74")>0){
    DMonth = value.substring(value.indexOf("\u5e74")+1,value.indexOf("\u6708"));
    DDay = value.substring(value.indexOf("\u6708")+1,value.indexOf("\u65e5"));
  }else if(value.indexOf(".")>0){
    DMonth = value.substring(value.indexOf(".")+1,value.lastIndexOf("."));
    DDay = value.substring(value.lastIndexOf(".")+1,value.indexOf(" ")!=-1? value.lastIndexOf(" ") : value.length);
  }else if(value.indexOf("/")>0){
    DMonth = value.substring(value.indexOf("/")+1,value.lastIndexOf("/"));
    DDay = value.substring(value.lastIndexOf("/")+1,value.indexOf(" ")!=-1? value.lastIndexOf(" ") : value.length);
  }else{
    DMonth = value.substring(value.indexOf("-")+1,value.lastIndexOf("-"));
    DDay = value.substring(value.lastIndexOf("-")+1,value.indexOf(" ")!=-1 ? value.lastIndexOf(" ") : value.length);
  } 
 /**
   * ????????????????????
   * Description:???????????????????????????2007-5-5 5:5:5??????????
   * Author:??(ly_liuy@neusoft.com)
   * Date:2007-05-08
   * History:
   * his1:
   */
  
  var DHour = "00";
  if(format.indexOf("HH")!=-1 ||format.indexOf("某时")!=-1 ){ 
     
      //???
      //var hHour = nowformat.indexOf("HH");
      //DHour  = value.substring(hHour,hHour+2);
      
      //???? ---start---
      if(value.indexOf("\u65f6")>0){
	    DHour = value.substring(value.indexOf(" ")+1,value.indexOf("\u65f6"));
	  }else if(value.indexOf(":")>0){
	    DHour = value.substring(value.indexOf(" ")+1,value.indexOf(":"));
	  }
	  //???? ---end---
  }
  
  //var hMinute = format.indexOf("mm"); 
  var DMinute="00";
  if(format.indexOf("mm")!=-1 || format.indexOf("某分")!=-1){ 
      
      //???
      //var hMinute = nowformat.indexOf("mm");
      //DMinute  = value.substring(hMinute,hMinute+2);
      
      //???? ---start---
      if(value.indexOf("\u5206")>0){
	    DMinute = value.substring(value.indexOf("\u65f6")+1,value.indexOf("\u5206"));
	  }else if(value.indexOf(":")>0){
	    if(value.indexOf(":") == value.lastIndexOf(":"))
	    {
	       //2009-02-20 lincx deal with HH:MM
	       DMinute = value.substring(value.indexOf(":")+1);
	    }
	    else
	    {
	    	DMinute = value.substring(value.indexOf(":")+1,value.lastIndexOf(":"));
	    }
	  }
	  //???? ---end---
  }
  //var hSecond = format.indexOf("ss");
  var DSecond="00";
  if(format.indexOf("ss")!=-1 || format.indexOf("某秒")!=-1){
      
      //???
      //var hSecond = nowformat.indexOf("ss");
      //DSecond= value.substring(hSecond,hSecond+2); 
      
      //???? ---start---
      if(value.indexOf("\u79d2")>0){
	    DSecond = value.substring(value.indexOf("\u5206")+1,value.indexOf("\u79d2"));
	  }else if(value.indexOf(":")>0){
	    DSecond = value.substring(value.lastIndexOf(":")+1,value.length)
	  }
	  //???? ---end---
  }
  //2009-02-17 lincx change for chinese
  if(DHour==""||DHour==null){
     DHour = "00";
  }
  if(DMinute==""||DMinute==null){
     DMinute = "00";
  }  
  if(DSecond==""||DSecond==null){
     DSecond = "00";
  } 
  
  //引入中文转为数字
  if(!isDigital(DYear))
  {
    DYear = formatChNumToDigital(DYear,true);
    DMonth = formatChNumToDigital(DMonth,false);
    DDay = formatChNumToDigital(DDay,false); 
    if(!isDigital(DHour))
    {
    	DHour = formatChNumToDigital(DHour,false);
    	if(!isDigital(DMinute))
    	{
    		DMinute = formatChNumToDigital(DMinute,false);
    	}
    	if(!isDigital(DSecond))
    	{
    		DSecond = formatChNumToDigital(DSecond,false);
    	}
    	
    } 
  }
  else if(!isDigital(DHour))
  {
    
  	DHour = formatChNumToDigital(DHour,false);	
    if(!isDigital(DMinute))
    {
    		DMinute = formatChNumToDigital(DMinute,false);
    }
    if(!isDigital(DSecond))
    {
    		DSecond = formatChNumToDigital(DSecond,false);
    }
  }
  fSetYearMon(DYear, DMonth);  
  setEditable(false); 
  
  tbHour.value = DHour;
  tbMinute.value = DMinute;
  tbSecond.value = DSecond;
  setSelectedDate(DYear,DMonth,DDay);
  
}

function resetDefaultValue(){

  if(DValue!=""){
  	setDefaultValue(gdCtrl.format,DValue);
  }
  else{
    fUpdateCal(curYear, curMonth);
    setSelectedDate(giYear,giMonth,giDay);
    setEditable(true);
    fSetTimes();
  }
}
  

function mouseOverHandler(cell){
  //alert(curYear+":"+curMonth+":"+DDay);
  var fDDay = curDay.toString().charAt(0);
  var sDDay = curDay.toString().charAt(1);
  //alert(fDDay+":"+sDDay+":"+cell.innerText);
  if(curYear==DYear&&curMonth==DMonth){
    if(fDDay=="0"){ 
       if(sDDay!=cell.innerText){
          //cell.background="form/data/images/hover-bg.gif";
          cell.style.backgroundColor = gcOver;
       }
    }
    else if(cell.innerText!=curDay){ 
       //cell.background="form/data/images/hover-bg.gif";
       cell.style.backgroundColor = gcOver;
    }
  }else{
    //cell.background="form/data/images/hover-bg.gif";
    cell.style.backgroundColor = gcOver;
  }
}
function mouseOutHandler(cell){

  var fDDay = curDay.toString().charAt(0);
  var sDDay = curDay.toString().charAt(1);
  //alert(fDDay+":"+sDDay+":"+cell.innerText);
  if(curYear==DYear&&curMonth==DMonth){
    if(fDDay=="0"){ 
       if(sDDay!=cell.innerText){
          //cell.background="form/data/images/normal-bg.gif";
          cell.style.backgroundColor = gcNormal;
       }
    }
    else if(cell.innerText!=curDay){ 
       //cell.background="form/data/images/normal-bg.gif";
       cell.style.backgroundColor = gcNormal;
    }
  }else{
    //cell.background="form/data/images/normal-bg.gif";
    cell.style.backgroundColor = gcNormal;
  }
}
//****************************************************************************
// Param: popCtrl is the widget beyond which you want this calendar to appear;
//        dateCtrl is the widget into which you want to put the selected date.
// i.e.: <input type="text" name="dc" style="text-align:center" readonly>
//<INPUT type="button" value="V" onclick="fPopCalendar(dc,dc);return false">
//****************************************************************************
function fPopCalendar(popCtrl, dateCtrl){
  event.cancelBubble=true;
  gdCtrl = document.getElementById(dateCtrl);  
  fSetYearMon(giYear, giMonth);
  var point = fGetXY(popCtrl);
  with (VicPopCal.style) {
        left = point.x;
        top  = point.y+popCtrl.offsetHeight+1;
        width = VicPopCal.offsetWidth;
        height = VicPopCal.offsetHeight;
        //fToggleTags(point);
        visibility = 'visible';
         
  }
  VicPopCal.focus();
  
}
function checkHours(hour){

  var firstchar = hour.charAt(0);
  var secondchar = hour.charAt(1);
  hour = hour.trim();
  if(hour.length==1){
    if(firstchar!=parseInt(firstchar)){
      return false;
    }
  }
  else if(firstchar==parseInt(firstchar)){
    if(secondchar!="" && secondchar!=parseInt(secondchar)){
       return false;
    }else{
       if(firstchar==2){
          if(secondchar>3){
             return false;
          }
       }else if(firstchar>2){
             return false;
       }
    }
  }else{
         return false;   
  }
  return true;
}
function checkTimes(time){
  var firstchar = time.charAt(0);
  var secondchar = time.charAt(1);
  time = time.trim();
  if(time.length==1){
    if(firstchar!=parseInt(firstchar)){
      return false;
    }
  }
  else if(firstchar==parseInt(firstchar)){
    if(firstchar<6){
      if(secondchar!="" && secondchar!=parseInt(secondchar)){
         return false;
      }
    }else{
         return false;
    }
  }else{
         return false;   
  }
  return true;
}
function setToDay(){

  setEditable(true);
  fSetTimes();
  fSetDate(giYear,giMonth,giDay); 
  fUpdateCal(giYear,giMonth);
  setSelectedDate(giYear,giMonth,giDay);
}
function fSetDate(iYear, iMonth, iDay){
  
  //alert(dateFormatType.size)
  //if (iDay<10) iDay='0'+iDay;
  var fMonth = iMonth.toString().charAt(0);
  if(fMonth!="0")
     if (iMonth<10) iMonth='0'+iMonth;
     
     
  var fDay = iDay.toString().charAt(0);
  
  if(fDay!="0")
     if (iDay<10) iDay='0'+iDay; 
  
  var iHour = tbHour.value; 
  
  var fHour = iHour.substring(0,1); 
   
  if(iHour==""||iHour==null){
     iHour = "00";
  }
  else
  if (iHour<10){ 
  	if(fHour!="0"){
  		iHour='0'+iHour;
  	}	
  	else if(!iHour.substring(1,2)){
  	  	iHour = "00";
  	}	 
  }
  
  var iMinute = tbMinute.value;
  var fMinute = iMinute.substring(0,1); 
  
  if(iMinute==""||iMinute==null){
     iMinute = "00";
  }else
  if (iMinute<10){ 
  	if(fMinute!="0"){
  		iMinute='0'+iMinute;
  	}	
  	else if(!iMinute.substring(1,2)){
  	  	iMinute = "00";
  	}	 
  }		
     
  var iSecond = tbSecond.value;
  var fSecond = iSecond.substring(0,1);
  
  if(iSecond==""||iSecond==null){
     iSecond = "00";
  }
  else    
  if (iSecond<10){ 
  	if(fSecond!="0"){
  		iSecond='0'+iSecond;
  	}	
  	else if(!iSecond.substring(1,2)){
  	  	iSecond = "00";
  	}	 
  }  
  if(!checkHours(iHour)){
    alert("[\u5c0f\u65f6]\u683c\u5f0f\u4e0d\u6b63\u786e");
    tbHour.focus();
    return false;
  }
  if(!checkTimes(iMinute)){
     alert("[\u5206\u949f]\u683c\u5f0f\u4e0d\u6b63\u786e");
     tbMinute.focus();
     return false;
  }
  if(!checkTimes(iSecond)){
     alert("[\u79d2]\u683c\u5f0f\u4e0d\u6b63\u786e");
     tbSecond.focus();
     return false;
  }    
  
  
  var dateType = ""
  
  
  
  if(!gdCtrl.format){
        gdCtrl.value = iYear+"-"+iMonth+"-"+iDay; //Here, you could modify the locale as you need !!!!
  }
  else
  {    
       //按照格式,显示值 
       if(gdCtrl.format.indexOf("yyyy") == -1)
       {  	
         	var iYearCh = formatNumToCH(new String(iYear),true);	
         	var iMonthCh = formatNumToCH(new String(iMonth),false);  	
         	var iDayCh = formatNumToCH(new String(iDay),false);
         	var iHourCh = formatNumToCH(new String(iHour),false);
         	var iMinuteCh = formatNumToCH(new String(iMinute),false);
         	var iSecondCh = formatNumToCH(new String(iSecond),false);
         	if(gdCtrl.format.indexOf("某时") == -1)
         	{
         	    //时间部分不是汉字
         		gdCtrl.value = gdCtrl.format.replace("某年",iYearCh+"年").replace("某月",iMonthCh+"月").replace("某日",iDayCh+"日").replace("HH",iHour).replace("mm",iMinute).replace("ss",iSecond);  
         	}
         	else
         	{
         	    //时间部分是汉字
         	    gdCtrl.value = gdCtrl.format.replace("某年",iYearCh+"年").replace("某月",iMonthCh+"月").replace("某日",iDayCh+"日").replace("某时",iHourCh+"时").replace("某分",iMinuteCh+"分").replace("某秒",iSecondCh+"秒");
         	}
         	  	
       }
       else
       { 
       		
            if(gdCtrl.format.indexOf("某时") > 0)
            {
                //2009-02-19 lincx 日期是数字，时间是汉字
	            var iHourCh = formatNumToCH(new String(iHour),false);
	         	var iMinuteCh = formatNumToCH(new String(iMinute),false);
	         	var iSecondCh = formatNumToCH(new String(iSecond),false);
            	gdCtrl.value = gdCtrl.format.replace("yyyy",iYear).replace("MM",iMonth).replace("dd",iDay).replace("某时",iHourCh+"时").replace("某分",iMinuteCh+"分").replace("某秒",iSecondCh+"秒");
            }
            else
            {      
       			gdCtrl.value = gdCtrl.format.replace("yyyy",iYear).replace("MM",iMonth).replace("dd",iDay).replace("HH",iHour).replace("mm",iMinute).replace("ss",iSecond);
       		}
       }
  }
     //end
  //fHideCalendar();
 
  if(gdCtrl.required=="true")
      showRequiredDiv(gdCtrl);
  return true;
}
function fClearValue(){
   gdCtrl.value = "";	 
   fHideCalendar();
   if(gdCtrl.required=="true")
      showRequiredDiv(gdCtrl);
}
function fHideCalendar(){
  if(!VicPopCal)
     return;
  
  if(VicPopCal.style.visibility=="visible")
  {
     //fSetDate(curYear, curMonth, curDay);
     VicPopCal.style.visibility = "hidden";
     
     try
     {
      if(gdCtrl){
        gdCtrl.fireEvent("onchange");
        //gdCtrl.fireEvent("onclick");        
      }
     }catch(e)
     {}
     
  }
  /*for (i in goSelectTag){
	  if(goSelectTag[i].style)
        goSelectTag[i].style.visibility = "visible";
  }
  goSelectTag.length = 0;
  */
}
function fSetSelected(aCell){
  var iOffset = 0;

  var iYear = parseInt(tbSelYear.value);
  var iMonth = parseInt(tbSelMonth.value);
  
  fUpdateCal(iYear,iMonth);
  with (aCell.children["cellText"]){
        var iDay = parseInt(innerText);
        if (color==gcGray)
                iOffset = (Victor<10)?-1:1;
        iMonth += iOffset;
        if (iMonth<1) {
                iYear--;
                iMonth = 12;
        }else if (iMonth>12){
                iYear++;
                iMonth = 1;
        }
  }
  //aCell.background="form/data/images/active-bg.gif" ; 
  aCell.style.backgroundColor = gcActive;
  aCell.children["cellText"].color = "#FFFFFF";
  //alert(iMonth);
  curDay = iDay;
  curYear = iYear;
  curMonth = iMonth;
  fSetDate(iYear, iMonth, iDay);
  setDefaultValue(gdCtrl.format,gdCtrl.value);
  //setSelectedDate(iYear,iMonth,iDay);
  
}
//useless
function Point(iX, iY){
        this.x = iX;
        this.y = iY;
}
function fBuildCal(iYear, iMonth) {
  var aMonth=new Array();
  for(i=1;i<7;i++)
        aMonth[i]=new Array(i);

  var dCalDate=new Date(iYear, iMonth-1, 1);
  var iDayOfFirst=dCalDate.getDay();
  var iDaysInMonth=new Date(iYear, iMonth, 0).getDate();
  var iOffsetLast=new Date(iYear, iMonth-1, 0).getDate()-iDayOfFirst+1;
  var iDate = 1;
  var iNext = 1;

  for (d = 0; d < 7; d++)
        aMonth[1][d] = (d<iDayOfFirst)?-(iOffsetLast+d):iDate++;
  for (w = 2; w < 7; w++)
        for (d = 0; d < 7; d++)
                aMonth[w][d] = (iDate<=iDaysInMonth)?iDate++:-(iNext++);
  return aMonth;
}
function fDrawCal(iYear, iMonth, iCellHeight, iDateTextSize) {
  var WeekDay = new Array("\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d");
  var styleTD = " valign='middle' align='center' height='"+iCellHeight+"' style='font: "+iDateTextSize+" \u5b8b\u4f53;";
  with (document) {
        write("<tr>");
        for(i=0; i<7; i++)
         write("<td  "+styleTD+"color:#990099;' >" + WeekDay[i] + "</td>");//background='form/data/images/dark-bg.gif'
        write("</tr>");
        for (w = 1; w < 7; w++) {
         write("<tr>");
          for (d = 0; d < 7; d++) {
           write("<td id=calCell  "+styleTD+"cursor:hand;' onMouseOver='mouseOverHandler(this)' onMouseOut='mouseOutHandler(this)' onclick='fSetSelected(this);' onmousedown='window.event.cancelBubble = true'>");//background='form/data/images/normal-bg.gif'
           write("<font id=cellText Victor='Liming Weng'> </font>");
           write("</td>")
          }
         write("</tr>");
        }
  }
}
function fUpdateCal(iYear, iMonth) {
  myMonth = fBuildCal(iYear, iMonth);
  var i = 0;
  //alert(iMonth+":"+giMonth+":"+curMonth)
  for (w = 0; w < 6; w++)
        for (d = 0; d < 7; d++){
          var cell = calCell[w*7+d];
          //cell.background='form/data/images/normal-bg.gif'; 
          cell.style.backgroundColor = gcNormal;
          cell.style.font = '12 \u5b8b\u4f53';
          with (cellText[(7*w)+d]) {
            Victor = i++;
            if (myMonth[w+1][d]<0) {
               color = gcGray;
               innerText = -myMonth[w+1][d];
            }else{
               color = ((d==0)||(d==6))?"red":"black";
               innerText = myMonth[w+1][d];
            }
          }
        }
    curYear = iYear;
    curMonth = iMonth; 
    DYear = iYear;
    DMonth = iMonth; 
  
}
function fSetYearMon(iYear, iMon){ 
  curYear = iYear;
  curMonth = iMon;
  tbSelMonth.options[iMon-1].selected = true;
  for (i = 0; i < tbSelYear.length; i++)
        if (tbSelYear.options[i].value == iYear)
          tbSelYear.options[i].selected = true;
          
 
  fUpdateCal(iYear, iMon);
}
function fPrevMonth(){
  var iMon = tbSelMonth.value;
  var iYear = tbSelYear.value;

  if (--iMon<1) {
          iMon = 12;
          iYear--;
  }
  fSetYearMon(iYear, iMon);
}
function fNextMonth(){
  var iMon = tbSelMonth.value;
  var iYear = tbSelYear.value;
  if (++iMon>12) {
          iMon = 1;
          iYear++;
  }
  fSetYearMon(iYear, iMon);
}
/*function fToggleTags(){
	
  with (document.all.tags("SELECT")){
        for (i=0; i<length; i++)
          if ((item(i).Victor!="Won")&&fTagInBound(item(i))){
             item(i).style.visibility = "hidden";
             goSelectTag[goSelectTag.length] = item(i);
			 
          }
  }
}*/
function fTagInBound(aTag){
  with (VicPopCal.style){
        var l = parseInt(left);
        var t = parseInt(top);
        var r = l+parseInt(width);
        var b = t+parseInt(height);
        var ptLT = fGetXY(aTag);
        return !((ptLT.x>r)||(ptLT.x+aTag.offsetWidth<l)||(ptLT.y>b)||(ptLT.y+aTag.offsetHeight<t));
  }
}



  var gMonths = new Array("&nbsp;\u4e00\u6708","&nbsp;\u4e8c\u6708","&nbsp;\u4e09\u6708","&nbsp;\u56db\u6708","&nbsp;\u4e94\u6708","&nbsp;\u516d\u6708","&nbsp;\u4e03\u6708","&nbsp;\u516b\u6708","&nbsp;\u4e5d\u6708","&nbsp;\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708");
  with (document) {
	write("<Div id='VicPopCal'  onmousedown='window.event.cancelBubble = true' onclick='event.cancelBubble=true' style='POSITION:absolute;visibility:hidden;border:1px ridge;width:10;z-index:100;'>");
	write("<table border='0' style='background-color:#F7F9F6' bordercolor='#797979' bordercolordark='#FFFFFF'>");//#6699cc//#0066FF
	write("<TR>");
	write("<td valign='middle' align='center'><input type='button' name='PrevMonth' value='<' style='height:20;width:20;FONT:bold' onClick='fPrevMonth();setSelectedDate(tbSelYear.value,tbSelMonth.value,curDay);'>");
	write("&nbsp;<SELECT name='tbSelYear' onChange='fUpdateCal(tbSelYear.value, tbSelMonth.value);setSelectedDate(tbSelYear.value,tbSelMonth.value,curDay) ; ' Victor='Won'>");
	for(i=1900;i<2101;i++)
  		write("<OPTION value='"+i+"'>"+i+"\u5e74</OPTION>");
	write("</SELECT>");
	write("&nbsp;<select id='tbSelMonth' onChange='fUpdateCal(tbSelYear.value, tbSelMonth.value);setSelectedDate(tbSelYear.value,tbSelMonth.value,curDay); ' Victor='Won'>");

	for (i=0; i<12; i++)
  		write("<option value='"+(i+1)+"'>"+gMonths[i]+"</option>");
	write("</SELECT>");
	write("&nbsp;<input type='button' name='PrevMonth' value='>' style='height:20;width:20;FONT:bold' onclick='fNextMonth();setSelectedDate(tbSelYear.value,tbSelMonth.value,curDay);'>");
	write("</td>");
	write("</TR><TR>");
	write("<td align='center'>");
	write("<DIV id='monthDiv' style='background-color:#D3D3D3'><table width='100%' border='0' cellspacing='0' cellpadding='2'>");
	fDrawCal(giYear, giMonth, 12, 12);
	write("</table></DIV>");
	write("</td>");
	write("</TR><TR><TD align='center' >");
	write("<B onmousedown='window.event.cancelBubble = true' style='font: 12 \u5b8b\u4f53'>\u65f6\u95f4\uff1a </B>");
	
	write("<input name='tbHour' maxlength='2' onblur='checkHours(this.value)' onmousedown='window.event.cancelBubble = true' style='width:20;height:18;cursor:hand; font: 12 \u5b8b\u4f53' value='' onclick='setEditable(false)' onMouseOver='this.style.backgroundColor=gcOver' onMouseOut='this.style.backgroundColor=gcWhite'></input>");	
	write("<B onmousedown='window.event.cancelBubble = true' style='font:  12 \u5b8b\u4f53'>\uff1a</B>");	
	write("<input name='tbMinute' maxlength='2' onblur='checkTimes(this.value)' onmousedown='window.event.cancelBubble = true' style='width:20;height:18;cursor:hand; font: 12 \u5b8b\u4f53' value=''onclick='setEditable(false)' onMouseOver='this.style.backgroundColor=gcOver' onMouseOut='this.style.backgroundColor=gcWhite'></input>");	
	write("<B onmousedown='window.event.cancelBubble = true' style='font:  12 \u5b8b\u4f53'>\uff1a</B>");	
	write("<input name='tbSecond' maxlength='2' onblur='checkTimes(this.value)' onmousedown='window.event.cancelBubble = true' style='width:20;height:18;cursor:hand; font: 12 \u5b8b\u4f53' value='' onclick='setEditable(false)' onMouseOver='this.style.backgroundColor=gcOver' onMouseOut='this.style.backgroundColor=gcWhite'></input>");	

	write("</TD></TR><TR><TD align='center' style='background-color:#D3D3D3'>");//background='form/data/images/dark-bg.gif'
	//write("<B onmousedown='window.event.cancelBubble = true' style='cursor:hand; font: bold 14 \u5b8b\u4f53' onclick='fSetDate(giYear,giMonth,giDay)' onMouseOver='this.style.color=gcToggle' onMouseOut='this.style.color=0'>\u4eca\u5929\uff1a"+giYear+"\u5e74"+giMonth+"\u6708"+giDay+"\u65e5</B>");
	write("<B onmousedown='window.event.cancelBubble = true' style='cursor:hand; font: 12 \u5b8b\u4f53' onclick='setToDay()' onMouseOver='this.style.color=cbOver' onMouseOut='this.style.color=0'>\u5f53\u524d\u65e5\u671f </B>");	
	write("<B onmousedown='window.event.cancelBubble = true' style='cursor:hand; font: 12 \u5b8b\u4f53' onclick='resetDefaultValue()' onMouseOver='this.style.color=cbOver' onMouseOut='this.style.color=0'>  \u6062\u590d </B>");	

	write("<B onmousedown='window.event.cancelBubble = true' style='cursor:hand; font: 12 \u5b8b\u4f53' onclick='fClearValue()' onMouseOver='this.style.color=cbOver' onMouseOut='this.style.color=0'> \u6e05\u7a7a </B>");	
	write("<B onmousedown='window.event.cancelBubble = true' style='cursor:hand; font: 12 \u5b8b\u4f53' onclick='if(fSetDate(curYear, curMonth, curDay)){fHideCalendar();}' onMouseOver='this.style.color=cbOver' onMouseOut='this.style.color=0'>  \u786e\u5b9a </B>");	
	write("</TD></TR>");
	write("</TABLE>");
	write('<iframe frameborder=0 border=1 style="position:absolute; visibility:inherit; top:0px; left:0px; width:100%; height:100%;z-index:-1;border:ridge 1px"></iframe>');
	//fSetTimes(true);
//write('<select style="width:100%">')
//for(var i=1;i<=dateFormatType.size;i++)
//  {
//    write('<option>'+eval("dateFormatType"+".F"+i)+'</option>')  	
//  }
//write('</select>')
	write("</Div>");
	write("<SCRIPT event=onmousedown() for=document>hiddeDataGrid();</SCRIPT>");
	write("<SCRIPT event=onclick() for=document>fHideCalendar();fHidePopupTree();hiddeSaveIcon();hiddenTreeTitle();</SCRIPT>");
}

