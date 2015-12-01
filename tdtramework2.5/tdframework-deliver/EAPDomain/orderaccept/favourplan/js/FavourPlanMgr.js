//时间控件初始化
function init(){
   eapObjsMgr.onReady();
   DateUtil.addDateArea("begDate","calendarBt1");
   DateUtil.addDateArea("endDate","calendarBt2");
   document.getElementsByName("favourPlan")[0].style.width = '100%';
}

//优惠计划查询按钮
function onClick(){
	var pagePath = document.getElementById("webpath").value + "/ordermgr/favourPlanAction.do?method=doFavourPlanQuery";
	document.getElementById("EAPForm").action = pagePath;
	document.getElementById("EAPForm").target = "_self";
	document.getElementById("EAPForm").submit();
}


//保存按钮
function favourplan_save(){

    if (document.getElementById("favourPlan").value == ""){
      alert("请选择优惠计划");
      document.getElementById("favourPlan").focus();
      return;
    }
    
    if (document.getElementById("begDate").value == ""){
      alert("请选择起始时间");
      document.getElementById("begDate").focus();
      return;
    }else{
      if (DateValid['date'](document.getElementById("begDate").value,'YYYY-MM-DD') == false) {
        confirm("您输入了一个无效的日期！现在修改吗？")
        return;
      }
    }
    
    if (document.getElementById("endDate").value == ""){
      alert("请选择终止时间");
      document.getElementById("endDate").focus();
      return;
    }else{
       if (DateValid['date'](document.getElementById("endDate").value,'YYYY-MM-DD') == false) {
        confirm("您输入了一个无效的日期！现在修改吗？")
        return;
      }
    }
    
    if (document.getElementById("begDate").value > document.getElementById("endDate").value ){
      alert("起始时间不能大于终止时间,请重新选择");
      document.getElementById("begDate").focus();
      return;
    }
    window.opener.document.getElementById("newFavourPlanValue").value = document.getElementById("favourPlan").value;
    window.opener.document.getElementById("newBegDate").value = document.getElementById("begDate").value;
    window.opener.document.getElementById("newEndDate").value = document.getElementById("endDate").value;
    window.opener.planfresh();
    window.close();
}

//关闭按钮
function favourplan_close(){
     window.close();
}