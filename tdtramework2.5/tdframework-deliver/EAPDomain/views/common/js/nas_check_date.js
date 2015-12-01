/**
* 检验页面文本框中输入的日期是否正确
* @param obj-要检查的页面元素
* @param len-要检查的时间串的长度，通常有10位的不包括时分秒，还有19位的包括年月日和时分秒
* @param dateSeparator-年月日之间的分隔符
* @param timeSeparator-时分秒之间的分隔符
* @param dtSeparator-年月日和时分秒之间的分隔符
* @return
*/
function nas_check_date(obj,len,dateSeparator,timeSeparator,dtSeparator)
{
    if(dateSeparator==null || dateSeparator==''){
        dateSeparator = '-';
    }
    if(timeSeparator==null || timeSeparator==''){
        timeSeparator = ':';
    }
    if(dtSeparator==null || dtSeparator==''){
        dtSeparator = ' ';
    }

  var startDate = obj.value;
  
  if(startDate != "")
  {
    var flagAddr = startDate.indexOf(dateSeparator);
    if (flagAddr < 4){
      alert('年份输入不正确，请核查！');
      obj.focus();
      return false;
    }
    if (startDate != "")
    {
      var sYear = startDate.substring(0,4);
      if(!(sYear>0))
      {
        alert('年份输入不正确，请核查！');
        obj.focus();
        return false;
      }
      var yearFlag = startDate.substring(4,5);
      if(yearFlag!="-")
      {
        alert('输入的时间格式不正确，请核查！');
        obj.focus();
        return false;
      }
      var sMonth = startDate.substring(5,7)/1;
      if(sMonth>12 || !sMonth>0)
      {
        alert('输入的月份不正确，请核查！');
        obj.focus();
        return false;
      }
      var monthFlag = startDate.substring(7,8);
      if(monthFlag!="-")
      {
        alert('输入的时间格式不正确，请核查！');
        obj.focus();
        return false;
      }
      var sDay = startDate.substring(8,10)/1;
      if(!(sDay>0))
      {
        alert('日期输入有误！');
        obj.focus();
        return false;
      }
      if(sMonth==2)
      {
        if(sYear%4==0 && sDay>29)
        {
          alert('输入的日期不正确，请核查！');
          obj.focus();
          return false;
        }
        if(sYear%4!=0 && sDay>28)
        {
          alert('输入的日期不正确，请核查！');
          obj.focus();
          return false;
        }
      }
      if(sMonth==4 || sMonth==6 || sMonth==9 || sMonth==11)
      {
        if(sDay>30)
        {
          alert('输入的日期不正确，请核查！');
          obj.focus();
          return false;
        }
      }
      if(sMonth==1 || sMonth==3 || sMonth==5 || sMonth==7 || sMonth==8 || sMonth==10 || sMonth==12)
      {
        if(sDay>31)
        {
          alert('输入的日期不正确，请核查！');
          obj.focus();
          return false;
        }
      }
      if (len > 10)
      {
        if (startDate.substring(10,11) != dtSeparator)
        {
          alert('输入的时间格式不正确，请核查！');
          obj.focus();
          return false;
        }
      }
      if (len > 12)
      {
        var sHour = startDate.substring(11,13)/1;
        if((sHour < 0) || (sHour > 23))
        {
          alert('输入的小时不正确，请核查！');
          obj.focus();
          return false;
        }
        if (startDate.substring(13,14) != timeSeparator)
        {
          alert('输入的时间格式不正确，请核查！');
          obj.focus();
          return false;
        }
      }
      if (len > 14)
      {
        var sMinute = startDate.substring(14,16)/1;
        if((sMinute < 0) || (sMinute > 59))
        {
          alert('输入的分钟不正确，请核查！');
          obj.focus();
          return false;
        }
        if (startDate.substring(16,17) != timeSeparator)
        {
          alert('输入的时间格式不正确，请核查！');
          obj.focus();
          return false;
        }
      }
      if (len > 16)
      {
        var sSecond = startDate.substring(17,19)/1;
      
        if((sSecond < 0) || (sSecond > 59))
        {
          alert('输入的秒数不正确，请核查！');
          obj.focus();
          return false;
        }
      }
    }
  }//不为空
  //日期校验结束
}
