      /*
	 组织机构下拉框改变
	*/ 
	function changeOrganId()
	{
	 var selectedVal = document.myform.OrganId.value;
	 if( selectedVal == undefined ||  selectedVal == null || selectedVal == "" )
	 return;
	 changeRelationSelect3(document.myform.OrganId,document.myform.DutyId,document.myform.hDutyId,"");
	}

//下面的函数销售模块使用
//根据一个列表框的变化来决定另一个列表框显示的内容
//参数:obj1-调用该函数的列表，
//     obj2-根据obj1的变化而变化的列表，
//     obj3-存储obj2所有值的隐藏域，格式为：obj1Value:obj2Value:obj2Text`obj1Value:obj2Value:obj2Text....
function changeRelationSelect3(obj1,obj2,obj3,selectedValue){
  if (obj1.selectedIndex<=0) return;
  //先将关联的列表清空
  obj2.innerHTML = null;

  //获取变化源的值
  var srcValue = obj1[obj1.selectedIndex].title;
//  alert (srcValue);
//  获取相关的所有的值
  var allValue = obj3.value;
  //将值转换成数组，格式为obj1Value:obj2Value:obj2Text
  var allArray = new Array();
  allArray = allValue.split('`');
  var length = allArray.length;
  var obj2Array = new Array();
  for(var i=0;i<length;i++){
    obj2Array = new Array();
    obj2Array = allArray[i].split(':');
//	alert (obj2Array[0]+'\n'+srcValue);
     if(obj2Array[0]==srcValue){
        newOpt=document.createElement("OPTION")
        newOpt.value=obj2Array[1];
        newOpt.text=obj2Array[2];
        obj2.add(newOpt);
          if(selectedValue==obj2Array[1]){
            newOpt.selected = true;
          }
      }
  }
}        