
function bModifyClick(webPath){
    
    if(!confirm("确认要重新设置职务得权限范围吗？")) return;
    
    var allNewFuncStr=getFuncStr();
    var oldFuncStr=formExec.selectedFun.value;
    var myArray,oldArray,addFuncStr='',reduceFuncStr='';

    //开始比较
    //1. 去掉新旧两个串当中的重复数据
    myArray=allNewFuncStr.split(';');
    for (var i=0;i<myArray.length;i++){
        if (oldFuncStr.indexOf(myArray[i])==-1)
            addFuncStr=addFuncStr+myArray[i]+';';//新增的数据
    }
    
    oldArray = oldFuncStr.split(';');
    for (var i=0;i<oldArray.length;i++){
        if (allNewFuncStr.indexOf(oldArray[i])==-1)
            reduceFuncStr=reduceFuncStr+oldArray[i]+';'; //去除的数据
    }

    submitForm.selectedMenuList.value=allNewFuncStr;
    submitForm.addMenuList.value=addFuncStr;
    submitForm.delMenuList.value=reduceFuncStr;
    submitForm.operType.value="privilegeSubmit";
    submitForm.action=webPath + "/om/funcRoleAdmin.do";
    submitForm.submit();
}
