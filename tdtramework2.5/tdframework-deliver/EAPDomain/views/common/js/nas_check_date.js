/**
* ����ҳ���ı���������������Ƿ���ȷ
* @param obj-Ҫ����ҳ��Ԫ��
* @param len-Ҫ����ʱ�䴮�ĳ��ȣ�ͨ����10λ�Ĳ�����ʱ���룬����19λ�İ��������պ�ʱ����
* @param dateSeparator-������֮��ķָ���
* @param timeSeparator-ʱ����֮��ķָ���
* @param dtSeparator-�����պ�ʱ����֮��ķָ���
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
      alert('������벻��ȷ����˲飡');
      obj.focus();
      return false;
    }
    if (startDate != "")
    {
      var sYear = startDate.substring(0,4);
      if(!(sYear>0))
      {
        alert('������벻��ȷ����˲飡');
        obj.focus();
        return false;
      }
      var yearFlag = startDate.substring(4,5);
      if(yearFlag!="-")
      {
        alert('�����ʱ���ʽ����ȷ����˲飡');
        obj.focus();
        return false;
      }
      var sMonth = startDate.substring(5,7)/1;
      if(sMonth>12 || !sMonth>0)
      {
        alert('������·ݲ���ȷ����˲飡');
        obj.focus();
        return false;
      }
      var monthFlag = startDate.substring(7,8);
      if(monthFlag!="-")
      {
        alert('�����ʱ���ʽ����ȷ����˲飡');
        obj.focus();
        return false;
      }
      var sDay = startDate.substring(8,10)/1;
      if(!(sDay>0))
      {
        alert('������������');
        obj.focus();
        return false;
      }
      if(sMonth==2)
      {
        if(sYear%4==0 && sDay>29)
        {
          alert('��������ڲ���ȷ����˲飡');
          obj.focus();
          return false;
        }
        if(sYear%4!=0 && sDay>28)
        {
          alert('��������ڲ���ȷ����˲飡');
          obj.focus();
          return false;
        }
      }
      if(sMonth==4 || sMonth==6 || sMonth==9 || sMonth==11)
      {
        if(sDay>30)
        {
          alert('��������ڲ���ȷ����˲飡');
          obj.focus();
          return false;
        }
      }
      if(sMonth==1 || sMonth==3 || sMonth==5 || sMonth==7 || sMonth==8 || sMonth==10 || sMonth==12)
      {
        if(sDay>31)
        {
          alert('��������ڲ���ȷ����˲飡');
          obj.focus();
          return false;
        }
      }
      if (len > 10)
      {
        if (startDate.substring(10,11) != dtSeparator)
        {
          alert('�����ʱ���ʽ����ȷ����˲飡');
          obj.focus();
          return false;
        }
      }
      if (len > 12)
      {
        var sHour = startDate.substring(11,13)/1;
        if((sHour < 0) || (sHour > 23))
        {
          alert('�����Сʱ����ȷ����˲飡');
          obj.focus();
          return false;
        }
        if (startDate.substring(13,14) != timeSeparator)
        {
          alert('�����ʱ���ʽ����ȷ����˲飡');
          obj.focus();
          return false;
        }
      }
      if (len > 14)
      {
        var sMinute = startDate.substring(14,16)/1;
        if((sMinute < 0) || (sMinute > 59))
        {
          alert('����ķ��Ӳ���ȷ����˲飡');
          obj.focus();
          return false;
        }
        if (startDate.substring(16,17) != timeSeparator)
        {
          alert('�����ʱ���ʽ����ȷ����˲飡');
          obj.focus();
          return false;
        }
      }
      if (len > 16)
      {
        var sSecond = startDate.substring(17,19)/1;
      
        if((sSecond < 0) || (sSecond > 59))
        {
          alert('�������������ȷ����˲飡');
          obj.focus();
          return false;
        }
      }
    }
  }//��Ϊ��
  //����У�����
}
