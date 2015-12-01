//����һ���б��ı仯��������һ���б����ʾ������
//������obj1-���øú������б�
//     obj2-����obj1�ı仯���仯���б�
//     obj3-�洢obj2����ֵ�������򣬸�ʽΪ��obj1Value:obj2Value:obj2Text`obj1Value:obj2Value:obj2Text....
//     ifAll:����ѡ���ʶ��0-������κζ���ѡ��
//                         1-���ȫ��ѡ��: value = all. option = ȫ��
//                         2-��ӿ�ѡ��: value = -200. caption = ""
function changeRelationSelect(obj1,obj2,obj3,selectedValue,ifAll){
  //�Ƚ��������б����
  obj2.innerHTML = null;
  
  if(ifAll == null || ifAll =='')
    ifAll ='0';
  if(ifAll != '0'){
	newOpt=document.createElement("OPTION")
    if(ifAll == '1'){
	   newOpt.value="ȫ��";
	   newOpt.text="all";
    }
    if(ifAll == '2'){
       newOpt.value="-200";
       newOpt.text="";
    }
	obj2.add(newOpt);
  }

  //��ȡ�仯Դ��ֵ
  var srcValue = obj1.value;
  //��ȡ��ص����е�ֵ
  var allValue = obj3.value;
  //��ֵת�������飬��ʽΪobj1Value:obj2Value:obj2Text
  var allArray = new Array();
  allArray = allValue.split('`');
  
  var length = allArray.length;

  var obj2Array = new Array();
  for(var i=0;i<length;i++){
    obj2Array = new Array();
    obj2Array = allArray[i].split(':');
      
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

//����һ���б��ı仯��һ�����������������һ���б����ʾ������
//������obj1-���øú������б�
//     obj2-����obj1�ı仯���仯���б�
//     obj3-�洢obj2����ֵ�������򣬸�ʽΪ��obj2Value:obj2Text`obj2Value:obj2Text....
//     obj4-�洢obj1��obj2��ص���Ϣ����ʽΪ��obj1Value:obj2Value`obj1Value:obj2Value...
//     ifAll:����ѡ���ʶ��0-������κζ���ѡ��
//                         1-���ȫ��ѡ��: value = all. option = ȫ��
//                         2-��ӿ�ѡ��: value = -200. caption = ""
function changeRelationSelect1(obj1,obj2,obj3,obj4,selectedValue,ifAll){
  //�Ƚ��������б����
  obj2.innerHTML = null;
  
  if(ifAll == null || ifAll =='')
    ifAll ='0';
  if(ifAll != '0'){
    newOpt=document.createElement("OPTION")
    if(ifAll == '1'){
       newOpt.value="ȫ��";
       newOpt.text="all";
    }
    if(ifAll == '2'){
       newOpt.value="-200";
       newOpt.text="";
    }
    obj2.add(newOpt);
  }

  //��ȡ�仯Դ��ֵ
  var srcValue = obj1.value;
  //��ȡ��ص����е�ֵ
  var allValue = obj3.value;
  //��ֵת�������飬��Ԫ��ʽΪobj2Value:obj2Text
  var allArray = new Array();
  allArray = allValue.split('`');
  var length = allArray.length;

  //��ȡ������Ϣ
  var relValue = obj4.value;
  //ת�������飬��Ԫ��ʽΪobj1Value:obj2Value
  var relArray = new Array();
  relArray = relValue.split('`');
  var relLength = relArray.length;

  var obj2Array ;
  var obj4Array ;

  obj4Array = new Array();
  for(var j=0;j<relLength;j++)
  {
    obj4Array = relArray[j].split(':');

	if(obj4Array[0]==srcValue)
	{
	  for(var i=0;i<length;i++)
	  {
	obj2Array = new Array();
	obj2Array = allArray[i].split(':');

	if(obj4Array[1]==obj2Array[0])
	    {
//		  alert(obj4Array[0]+" "+srcValue+" "+obj4Array[1]+" "+obj2Array[0])
		  newOpt=document.createElement("OPTION")
		  newOpt.value=obj2Array[0];
		  newOpt.text=obj2Array[1];
		  obj2.add(newOpt);
		  if(selectedValue==obj2Array[0]){
		    newOpt.selected = true;
		  }
	    }
	  }
	}
  }
}



//����һ���б��ı仯����һ���б���ֵ������ĳһ���б����ʾ������
//����:obj1-���øú������б�
//     obj2-��һ������б��
//     obj3-��Ҫ������ʾֵ���б��
//     obj4-�洢�������ݵ������򣬸�ʽΪ��obj1Value:obj2Value:obj3Value:obj3Text`obj1Value:obj2Value:obj3Value:obj3Text...
//     selectedValue-obj��ҪĬ��ѡ�е�ֵ
//     ifAll:����ѡ���ʶ��0-������κζ���ѡ��
//                         1-���ȫ��ѡ��: value = all. option = ȫ��
//                         2-��ӿ�ѡ��: value = -200. caption = ""
function changeRelation(obj1,obj2,obj3,obj4,selectedValue,ifAll){
    //�Ƚ��������б����
    obj3.innerHTML = null;
  
    if(ifAll == null || ifAll =='')
        ifAll ='0';
    if(ifAll != '0'){
        newOpt=document.createElement("OPTION")
        if(ifAll == '1'){
            newOpt.value="ȫ��";
            newOpt.text="all";
        }
        if(ifAll == '2'){
            newOpt.value="-200";
            newOpt.text="";
        }
        obj3.add(newOpt);
    }

    //��ȡ�仯�б���ֵ
    var srcValue = obj1.value;
    //��ȡ����б���ֵ
    var relValue = obj2.value;
    //��ȡ��Ҫ������
    var allValue = obj4.value;
    //��ֵת�������飬��ʽΪobj1Value:obj2Value:obj3Value:obj3Text
    var allArray = new Array();
    allArray = allValue.split('`');
  
    var allLength = allArray.length;

    var obj3Array = new Array();
    for(var i=0;i<allLength;i++){
        obj3Array = new Array();
        obj3Array = allArray[i].split(':');
        if(obj3Array[0]==srcValue && obj3Array[1]==relValue){
	        newOpt=document.createElement("OPTION")
		    newOpt.value=obj3Array[2];
		    newOpt.text=obj3Array[3];
		    obj3.add(newOpt);
		    if(selectedValue==obj3Array[2]){
		        newOpt.selected = true;
	        }
        }
    }
}

//����ĺ�������ģ��ʹ��
//����һ���б��ı仯��������һ���б����ʾ������
//����:obj1-���øú������б�
//     obj2-����obj1�ı仯���仯���б�
//     obj3-�洢obj2����ֵ�������򣬸�ʽΪ��obj1Value:obj2Value:obj2Text`obj1Value:obj2Value:obj2Text....
function changeRelationSelect2(obj1,obj2,obj3,selectedValue){
  //�Ƚ��������б����
  obj2.innerHTML = null;

  //��ȡ�仯Դ��ֵ
  var srcValue = obj1.value;
  //��ȡ��ص����е�ֵ
  var allValue = obj3.value;
  //��ֵת�������飬��ʽΪobj1Value:obj2Value:obj2Text
  var allArray = new Array();
  allArray = allValue.split('`');
  var length = allArray.length;

  var obj2Array = new Array();
  for(var i=0;i<length;i++){
    obj2Array = new Array();
    obj2Array = allArray[i].split(':');
     if( obj2Array.length == 1 )continue;//xiesy 20050520 modified
     if(obj2Array[0]==srcValue  ){
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

//����һ���б��ı仯��������һ���б����ʾ������
//������obj1-���øú������б�
//     obj2-����obj1�ı仯���仯���б�
//     obj3-�洢obj2����ֵ�������򣬸�ʽΪ��obj1Value:obj2Value:obj2Text`obj1Value:obj2Value:obj2Text....
//     ifAll:����ѡ���ʶ��0-������κζ���ѡ��
//                         1-���ȫ��ѡ��: value = all. option = ȫ��
//                         2-��ӿ�ѡ��: value = -200. caption = ""
function changeRelationSelect3(obj1,obj2,obj3,selectedValue,ifAll){
  //�Ƚ��������б����
  obj2.innerHTML = null;
  
  if(ifAll == null || ifAll =='')
    ifAll ='0';
  if(ifAll != '0'){
	newOpt=document.createElement("OPTION")
    if(ifAll == '1'){
	   newOpt.value="ȫ��";
	   newOpt.text="all";
    }
    if(ifAll == '2'){
       newOpt.value="-200";
       newOpt.text="";
    }
	obj2.add(newOpt);
  }

  //��ȡ�仯Դ��ֵ
  var srcValue = obj1.value;
  //��ȡ��ص����е�ֵ
  var allValue = obj3.value;
  //��ֵת�������飬��ʽΪobj1Value:obj2Value:obj2Text
  var allArray = new Array();
  allArray = allValue.split('`');
  
  var length = allArray.length;

  var obj2Array = new Array();
  for(var i=0;i<length;i++){
    obj2Array = new Array();
    obj2Array = allArray[i].split(':');
      if((srcValue!='')&&(srcValue!='-200')){
	      if(obj2Array[0]==srcValue){
			newOpt=document.createElement("OPTION")
			newOpt.value=obj2Array[1];
			newOpt.text=obj2Array[2];
			obj2.add(newOpt);
			  if(selectedValue==obj2Array[1]){
			    newOpt.selected = true;
			  }
		  }
	  }else{
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