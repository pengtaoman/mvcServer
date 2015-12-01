function selectMenu(webPath,dutyId){
alert("test")
  // parent.right.location.href = webPath + "/om/dutyPrivilege.do?operType=menuQuery&dutyId="+dutyId;
   parent.right.location.href = webPath + "/om/TestTreeAction.do?method=begin&dutyId="+dutyId;
}