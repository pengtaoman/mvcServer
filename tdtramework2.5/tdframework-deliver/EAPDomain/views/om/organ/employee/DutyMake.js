      /*
	 ��֯����������ı�
	*/ 
	function changeOrganId()
	{
	 var selectedVal = document.myform.OrganId.value;
	 if( selectedVal == undefined ||  selectedVal == null || selectedVal == "" )
	 return;
	 changeRelationSelect3(document.myform.OrganId,document.myform.DutyId,document.myform.hDutyId,"");
	}

//����ĺ�������ģ��ʹ��
//����һ���б��ı仯��������һ���б����ʾ������
//����:obj1-���øú������б�
//     obj2-����obj1�ı仯���仯���б�
//     obj3-�洢obj2����ֵ�������򣬸�ʽΪ��obj1Value:obj2Value:obj2Text`obj1Value:obj2Value:obj2Text....
function changeRelationSelect3(obj1,obj2,obj3,selectedValue){
  if (obj1.selectedIndex<=0) return;
  //�Ƚ��������б����
  obj2.innerHTML = null;

  //��ȡ�仯Դ��ֵ
  var srcValue = obj1[obj1.selectedIndex].title;
//  alert (srcValue);
//  ��ȡ��ص����е�ֵ
  var allValue = obj3.value;
  //��ֵת�������飬��ʽΪobj1Value:obj2Value:obj2Text
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