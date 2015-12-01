<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
<title><bean:message bundle="uniflow" key = "title.preference.calender"/></title>
</head>
<body class="open_body" text="#000000" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<center>
<table border="0" cellpadding="0" cellspacing="0" width="180">
<tr><td id="cc"></td></tr>
</table>
</center>
</body>
<script language="JavaScript">
var opener = window.dialogArguments;
function RunNian(The_Year)
{
 if ((The_Year%400==0) || ((The_Year%4==0) && (The_Year%100!=0)))
  return true;
 else
  return false;
}
function GetWeekday(The_Year,The_Month)
{

 var Allday;
 Allday = 0;
 if (The_Year>2000)
 {

  for (i=2000 ;i<The_Year; i++)
   if (RunNian(i))
    Allday += 366;
   else
    Allday += 365;
  for (i=1; i<The_Month; i++)
  {
  switch (i)
  {
    case 1:Allday += 31; break;
    case 2 :
    if (RunNian(The_Year))
	Allday += 29;
    else
	Allday += 28;
    break;
    case 3 : Allday += 31; break;
    case 4 : Allday += 30; break;
    case 5 : Allday += 31; break;
    case 6 : Allday += 30; break;
    case 7 : Allday += 31; break;
    case 8 : Allday += 31; break;
    case 9 : Allday += 30; break;
    case 10 : Allday += 31; break;
    case 11 : Allday += 30; break;
    case 12 :  Allday += 31; break;

   }

  }
 }

 return (Allday+6)%7;


}

function chooseday(The_Year,The_Month,The_Day)
{
 var Firstday;
 var completely_date;
 var time_name = "";
 if (The_Day!=0)
  completely_date = The_Year + "-" + The_Month + "-" + The_Day;
 else
  completely_date = "No Choose";
 if (completely_date!="No Choose"){
  time_name = "<%=request.getParameter("time_name")%>";
  if(time_name=="startTime"){
  opener.preferenceForm.startTime.value = completely_date;
  opener.preferenceForm.startTime_show.value = completely_date;
 }else if (time_name=="endTime"){
  opener.preferenceForm.endTime.value = completely_date;
  opener.preferenceForm.endTime_show.value = completely_date;
 }
  self.close();
}
  Firstday = GetWeekday(The_Year,The_Month);
  ShowCalender(The_Year,The_Month,The_Day,Firstday);
}

function nextmonth(The_Year,The_Month)
{
 if (The_Month==12)
  chooseday(The_Year+1,1,0);
 else
  chooseday(The_Year,The_Month+1,0);
}

function prevmonth(The_Year,The_Month)
{
 if (The_Month==1)
  chooseday(The_Year-1,12,0);
 else
  chooseday(The_Year,The_Month-1,0);
}

function prevyear(The_Year,The_Month)
{
 chooseday(The_Year-1,The_Month,0);
}

function nextyear(The_Year,The_Month)
{
 chooseday(The_Year+1,The_Month,0);
}





function ShowCalender(The_Year,The_Month,The_Day,Firstday)
{

 var showstr;
 var Month_Day;
 var ShowMonth;
 var today;
 today = new Date();



 switch (The_Month)
 {
  case 1 : ShowMonth = "January"; Month_Day = 31; break;
  case 2 :
   ShowMonth = "February";
   if (RunNian(The_Year))
    Month_Day = 29;
   else
    Month_Day = 28;
   break;
  case 3 : ShowMonth = "March"; Month_Day = 31; break;
  case 4 : ShowMonth = "April"; Month_Day = 30; break;
  case 5 : ShowMonth = "May"; Month_Day = 31; break;
  case 6 : ShowMonth = "June"; Month_Day = 30; break;
  case 7 : ShowMonth = "July"; Month_Day = 31; break;
  case 8 : ShowMonth = "August"; Month_Day = 31; break;
  case 9 : ShowMonth = "September"; Month_Day = 30; break;
  case 10 : ShowMonth = "October"; Month_Day = 31; break;
  case 11 : ShowMonth = "November"; Month_Day = 30; break;
  case 12 : ShowMonth = "December"; Month_Day = 31; break;

 }


 showstr = "";
 showstr = "<table cellpadding=0 cellspacing=0 border=1 bordercolor=#999999 width=95% align=center valign=top>";
 showstr +=  "<tr><td width=0 style='cursor:hand' onclick=prevyear("+The_Year+"," + The_Month + ")><img src='"+WorkflowManager.getWorkflowStylePath()+"/style1/calender_img/left2.gif' border='0'></td><td width=0>&nbsp;" + The_Year + "&nbsp;</td><td width=0 onclick=nextyear("+The_Year+","+The_Month+")  style='cursor:hand'><img src='stylesheet/images/calender/right2.gif' border='0'></td><td width=0 style='cursor:hand' onclick=prevmonth("+The_Year+","+The_Month+")><img src='"+WorkflowManager.getWorkflowStylePath()+"/style1/calender_img/left2.gif' border='0'></td><td width=100 align=center>" + ShowMonth + "</td><td width=0 onclick=nextmonth("+The_Year+","+The_Month+")  style='cursor:hand'><img src='"+WorkflowManager.getWorkflowStylePath()+"/style1/calender_img/right2.gif' border='0'></td></tr>";
 showstr +=  "<tr><td align=center width=100% colspan=6>";
 showstr +=  "<table cellpadding=0 cellspacing=0 border=1 bordercolor=#999999 width=100%>";
 showstr += "<tr align=center bgcolor=#999999> ";
    showstr += "<td><strong><font color=#0000CC>\u65e5</font></strong></td>";
    showstr += "<td><strong><font color=#0000CC>\u4e00</font></strong></td>";
    showstr += "<td><strong><font color=#0000CC>\u4e8c</font></strong></td>";
    showstr += "<td><strong><font color=#0000CC>\u4e09</font></strong></td>";
    showstr += "<td><strong><font color=#0000CC>\u56db</font></strong></td>";
    showstr += "<td><strong><font color=#0000CC>\u4e94</font></strong></td>";
    showstr += "<td><strong><font color=#0000CC>\u516d</font></strong></td>";
 showstr += "</tr><tr>";

 for (i=1; i<=Firstday; i++)
  showstr += "<td align=center bgcolor=#CCCCCC>&nbsp;</td>";

 for (i=1; i<=Month_Day; i++)
 {
  if ((The_Year==today.getYear()) && (The_Month==today.getMonth()+1) && (i==today.getDate()))
   bgColor = "#FFCCCC";
  else
   bgColor = "#CCCCCC";

  if (The_Day==i) bgColor = "#FFFFCC";
  showstr += "<td align=center bgcolor=" + bgColor + " style='cursor:hand' onclick=chooseday(" + The_Year + "," + The_Month + "," + i + ")>" + i + "</td>";
  Firstday = (Firstday + 1)%7;
  if ((Firstday==0) && (i!=Month_Day)) showstr += "</tr><tr>";
 }
 if (Firstday!=0)
 {
  for (i=Firstday; i<7; i++)
   showstr += "<td align=center bgcolor=#CCCCCC>&nbsp;</td>";
  showstr += "</tr>";
 }

 showstr += "</tr></table></td></tr></table>";
 cc.innerHTML = showstr;


}


</script>

<script language="JavaScript">

 var The_Year,The_Day,The_Month;
 var today;
 var Firstday;
 today = new Date();
 The_Year = today.getYear();
 The_Month = today.getMonth() + 1;
 The_Day = today.getDate();
 Firstday = GetWeekday(The_Year,The_Month);
 ShowCalender(The_Year,The_Month,The_Day,Firstday);
</script>
</html:html>