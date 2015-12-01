//初始化页面
    function init(strSelected){
        //alert
        var source = document.XMLDocument;
        var alertMessage = source.selectNodes("/root/alertMessage").nextNode().text;
        var dutyId = source.selectNodes("/root/dutyId").nextNode().text;
        submitForm.dutyId.value=dutyId;
        
        //数据初始化
        formExec.selectedFun.value = strSelected;
        mObj=document.all['tblGrantInfo'];
        n=document.getElementsByTagName("input");
        CheckBoxs=new Array();
        for (var i=0;i<n.length;i++){
                if (n.item(i).type=="checkbox"&&n.item(i).name.indexOf('ckb')!=-1){
                    n.item(i).getParentNode=_CheckBox_getParentNode;
                    n.item(i).hasChildChecked=_CheckBox_hasChildChecked;
                    n.item(i).checkAllChildNodes=_CheckBox_checkAllChildNodes;
                    n.item(i).onclick=function(){CheckAll(this)};
                    CheckBoxs.push(n.item(i));
                }
                if (n.item(i).type=="button"){
                    n.item(i).className="btn3_mouseout";
                    n.item(i).onmouseover=function(){this.className="btn3_mouseover"};
                    n.item(i).onmouseout=function(){this.className="btn3_mouseout"};
                    n.item(i).onmousedown=function(){this.className="btn3_mousedown"};
                    n.item(i).onmouseup=function(){this.className="btn3_mouseup"};
                }
        }
        bResetClick(strSelected);
        
        //alert infomation
        if(alertMessage!=null && alertMessage!="")
            alert(alertMessage);
        
    }
    
function bModifyClick(webPath){
alert("aaaa");
    if(!confirm("确认要修改职务的权限范围吗？")) return;
    
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
    submitForm.action=webPath + "/om/dutyPrivilege.do";
    submitForm.submit();
}
