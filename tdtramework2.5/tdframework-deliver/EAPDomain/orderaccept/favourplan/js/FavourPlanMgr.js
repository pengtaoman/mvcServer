//ʱ��ؼ���ʼ��
function init(){
   eapObjsMgr.onReady();
   DateUtil.addDateArea("begDate","calendarBt1");
   DateUtil.addDateArea("endDate","calendarBt2");
   document.getElementsByName("favourPlan")[0].style.width = '100%';
}

//�Żݼƻ���ѯ��ť
function onClick(){
	var pagePath = document.getElementById("webpath").value + "/ordermgr/favourPlanAction.do?method=doFavourPlanQuery";
	document.getElementById("EAPForm").action = pagePath;
	document.getElementById("EAPForm").target = "_self";
	document.getElementById("EAPForm").submit();
}


//���水ť
function favourplan_save(){

    if (document.getElementById("favourPlan").value == ""){
      alert("��ѡ���Żݼƻ�");
      document.getElementById("favourPlan").focus();
      return;
    }
    
    if (document.getElementById("begDate").value == ""){
      alert("��ѡ����ʼʱ��");
      document.getElementById("begDate").focus();
      return;
    }else{
      if (DateValid['date'](document.getElementById("begDate").value,'YYYY-MM-DD') == false) {
        confirm("��������һ����Ч�����ڣ������޸���")
        return;
      }
    }
    
    if (document.getElementById("endDate").value == ""){
      alert("��ѡ����ֹʱ��");
      document.getElementById("endDate").focus();
      return;
    }else{
       if (DateValid['date'](document.getElementById("endDate").value,'YYYY-MM-DD') == false) {
        confirm("��������һ����Ч�����ڣ������޸���")
        return;
      }
    }
    
    if (document.getElementById("begDate").value > document.getElementById("endDate").value ){
      alert("��ʼʱ�䲻�ܴ�����ֹʱ��,������ѡ��");
      document.getElementById("begDate").focus();
      return;
    }
    window.opener.document.getElementById("newFavourPlanValue").value = document.getElementById("favourPlan").value;
    window.opener.document.getElementById("newBegDate").value = document.getElementById("begDate").value;
    window.opener.document.getElementById("newEndDate").value = document.getElementById("endDate").value;
    window.opener.planfresh();
    window.close();
}

//�رհ�ť
function favourplan_close(){
     window.close();
}