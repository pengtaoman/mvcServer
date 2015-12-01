//根据一个列表框的变化来决定另一个列表框显示的内容
//参数：obj1-调用该函数的列表，
//     obj2-根据obj1的变化而变化的列表，
//     obj3-存储obj2所有值的隐藏域，格式为：obj1Value:obj2Value:obj2Text`obj1Value:obj2Value:obj2Text....
//     ifAll:增加选项标识，0-不添加任何额外选项
//                         1-添加全部选项: value = all. option = 全部
//                         2-添加空选项: value = -200. caption = ""
function changeRelationSelect(obj1,obj2,obj3,selectedValue,ifAll){
  //先将关联的列表清空
  obj2.innerHTML = null;
  
  if(ifAll == null || ifAll =='')
    ifAll ='0';
  if(ifAll != '0'){
	newOpt=document.createElement("OPTION")
    if(ifAll == '1'){
	   newOpt.value="全部";
	   newOpt.text="all";
    }
    if(ifAll == '2'){
       newOpt.value="-200";
       newOpt.text="";
    }
	obj2.add(newOpt);
  }

  //获取变化源的值
  var srcValue = obj1.value;
  //获取相关的所有的值
  var allValue = obj3.value;
  //将值转换成数组，格式为obj1Value:obj2Value:obj2Text
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

//根据一个列表框的变化和一个相关数据来决定另一个列表框显示的内容
//参数：obj1-调用该函数的列表，
//     obj2-根据obj1的变化而变化的列表，
//     obj3-存储obj2所有值的隐藏域，格式为：obj2Value:obj2Text`obj2Value:obj2Text....
//     obj4-存储obj1与obj2相关的信息，格式为：obj1Value:obj2Value`obj1Value:obj2Value...
//     ifAll:增加选项标识，0-不添加任何额外选项
//                         1-添加全部选项: value = all. option = 全部
//                         2-添加空选项: value = -200. caption = ""
function changeRelationSelect1(obj1,obj2,obj3,obj4,selectedValue,ifAll){
  //先将关联的列表清空
  obj2.innerHTML = null;
  
  if(ifAll == null || ifAll =='')
    ifAll ='0';
  if(ifAll != '0'){
    newOpt=document.createElement("OPTION")
    if(ifAll == '1'){
       newOpt.value="全部";
       newOpt.text="all";
    }
    if(ifAll == '2'){
       newOpt.value="-200";
       newOpt.text="";
    }
    obj2.add(newOpt);
  }

  //获取变化源的值
  var srcValue = obj1.value;
  //获取相关的所有的值
  var allValue = obj3.value;
  //将值转换成数组，单元格式为obj2Value:obj2Text
  var allArray = new Array();
  allArray = allValue.split('`');
  var length = allArray.length;

  //获取关联信息
  var relValue = obj4.value;
  //转换城数组，单元格式为obj1Value:obj2Value
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



//根据一个列表框的变化和另一个列表框的值来决定某一个列表框显示的内容
//参数:obj1-调用该函数的列表，
//     obj2-另一个相关列表框
//     obj3-需要关联显示值的列表框
//     obj4-存储关联数据的隐藏域，格式为：obj1Value:obj2Value:obj3Value:obj3Text`obj1Value:obj2Value:obj3Value:obj3Text...
//     selectedValue-obj需要默认选中的值
//     ifAll:增加选项标识，0-不添加任何额外选项
//                         1-添加全部选项: value = all. option = 全部
//                         2-添加空选项: value = -200. caption = ""
function changeRelation(obj1,obj2,obj3,obj4,selectedValue,ifAll){
    //先将关联的列表清空
    obj3.innerHTML = null;
  
    if(ifAll == null || ifAll =='')
        ifAll ='0';
    if(ifAll != '0'){
        newOpt=document.createElement("OPTION")
        if(ifAll == '1'){
            newOpt.value="全部";
            newOpt.text="all";
        }
        if(ifAll == '2'){
            newOpt.value="-200";
            newOpt.text="";
        }
        obj3.add(newOpt);
    }

    //获取变化列表框的值
    var srcValue = obj1.value;
    //获取相关列表框的值
    var relValue = obj2.value;
    //获取需要的数据
    var allValue = obj4.value;
    //将值转换成数组，格式为obj1Value:obj2Value:obj3Value:obj3Text
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

//下面的函数销售模块使用
//根据一个列表框的变化来决定另一个列表框显示的内容
//参数:obj1-调用该函数的列表，
//     obj2-根据obj1的变化而变化的列表，
//     obj3-存储obj2所有值的隐藏域，格式为：obj1Value:obj2Value:obj2Text`obj1Value:obj2Value:obj2Text....
function changeRelationSelect2(obj1,obj2,obj3,selectedValue){
  //先将关联的列表清空
  obj2.innerHTML = null;

  //获取变化源的值
  var srcValue = obj1.value;
  //获取相关的所有的值
  var allValue = obj3.value;
  //将值转换成数组，格式为obj1Value:obj2Value:obj2Text
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

//根据一个列表框的变化来决定另一个列表框显示的内容
//参数：obj1-调用该函数的列表，
//     obj2-根据obj1的变化而变化的列表，
//     obj3-存储obj2所有值的隐藏域，格式为：obj1Value:obj2Value:obj2Text`obj1Value:obj2Value:obj2Text....
//     ifAll:增加选项标识，0-不添加任何额外选项
//                         1-添加全部选项: value = all. option = 全部
//                         2-添加空选项: value = -200. caption = ""
function changeRelationSelect3(obj1,obj2,obj3,selectedValue,ifAll){
  //先将关联的列表清空
  obj2.innerHTML = null;
  
  if(ifAll == null || ifAll =='')
    ifAll ='0';
  if(ifAll != '0'){
	newOpt=document.createElement("OPTION")
    if(ifAll == '1'){
	   newOpt.value="全部";
	   newOpt.text="all";
    }
    if(ifAll == '2'){
       newOpt.value="-200";
       newOpt.text="";
    }
	obj2.add(newOpt);
  }

  //获取变化源的值
  var srcValue = obj1.value;
  //获取相关的所有的值
  var allValue = obj3.value;
  //将值转换成数组，格式为obj1Value:obj2Value:obj2Text
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