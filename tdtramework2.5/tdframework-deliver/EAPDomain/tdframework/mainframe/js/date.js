// JavaScript Document
var timerID = null
var timerRunning = false
function MakeArray(size) 
{
this.length = size;
for(var i = 1; i <= size; i++)
{
this[i] = "";
}
return this;
}
function stopclock (){
if(timerRunning)
clearTimeout(timerID);
timerRunning = false
}
function showtime () {
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var date = now.getDate();
var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds();
var day = now.getDay();
Day = new MakeArray(7);
Day[0]="日";
Day[1]="一";
Day[2]="二";
Day[3]="三";
Day[4]="四";
Day[5]="五";
Day[6]="六";
var timeValue = "";
timeValue +=  + year + "-";
timeValue += ((month < 10) ? "0" : " ") + month + "-" + ((date < 10) ? "0" : " ") + date + " ";
timeValue += (Day[day]) + " ";
timeValue += ((hours <= 12) ? hours : hours - 12);
timeValue += ((minutes < 10) ? ":0" : ":") + minutes;
timeValue += ((seconds < 10) ? ":0" : ":") + seconds;
timeValue += (hours < 12) ? " AM" : " PM";
//alert(timeValue);
document.jsfrm.face.value = timeValue;
timerID = setTimeout("showtime()",1000);
timerRunning = true;
}
function startclock () {
stopclock();
showtime()
}