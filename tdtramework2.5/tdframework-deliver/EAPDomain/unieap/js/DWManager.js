/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ 
+ 脚本描述： 前台数据窗口管理器
+ 功能描述： 向开发人员提供数据窗口的管理
+ 创    建： 胡光华 hugh@neusoft.com
+ 修改履历： 
+ 修改  人： 
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

//申明一个数据窗口管理器
var dwManager = new DataWindowManager();
//声明一个公用事件
var dwEvent = new DWEvent();
/**
*@description 构造函数
*/
function DataWindowManager()
{
	this.dwArray = new Array();	
	this.activeDWName = null;               //记录当前操作的数据窗口名称
	this.DEFAULT_ACTION_NAME = "DataWindowMgrAction";
	
	
	this.addDW = DWM_addDW;                 //增加一个数据窗口对象
	this.getDW = DWM_getDW;                 //获取指定的数据窗口对象
	this.getAllDW = DWM_getAllDW;           //获取所有数据窗口对象 
	this.activeDW = DWM_activeDW;           //激活数据窗口
	this.getActiveDW = DWM_getActiveDW;     //获取当前的数据窗口对象
	this.saveMultiDW = DWM_saveMultiDW;     //保存多个数据窗口
    this.refreshMultiDW = DWM_refreshMultiDW;  //刷新多个数据窗口
	this.executeRequest = DWM_executeRequest;  //数据窗口统一的请求入口
	this.clearAllParameters = DWM_clearAllParameters; //本次请求之前，清除所有的有影响参数
	this.assambleDWData = DWM_assambleDWData;  //对指定数据窗口进行数据装配
	this.assambleDWDataForTab=DWM_assambleDWDataForTab//内部方法:在数据窗口在一般tab页上时对指定数据窗口进行数据装配
                                                     // 完成对界面数据的校验、装配工作。add by wangzhb
	
}
/**
*@description 增加一个数据窗口
*@param dataWindow 数据窗口对象
*/
function DWM_addDW(dataWindow){	
	var dwName = dataWindow.getName();	
	this.activeDWName = dwName;                   //激活数据窗口
	for(var i=0; i < this.dwArray.length; i++)	
		if(this.dwArray[i].getName() == dwName){
			this.dwArray[i] = dataWindow;
			return;
		}
    this.dwArray[this.dwArray.length] = dataWindow;	
}
/**
*@description 通过数据窗口名称（或位置索引）获取数据窗口对象
*@param arg   数据窗口名称（String）或 数据窗口在管理器中的位置（Number）
*/
function DWM_getDW(arg)
{				
	if(typeof(arg)=="string"){
		for(var i=0; i < this.dwArray.length; i++)	
			if(this.dwArray[i].getName() == arg){
				this.activeDWName = arg;                   			//激活数据窗口					
				return this.dwArray[i];	
			}	
		var dw = new DataWindow(arg);		
		this.addDW(dw);		
		this.activeDWName = dw.getName();                         	//激活数据窗口
	    return dw;
	}
	else if(typeof(arg)=="number"){
		if(arg >= dwArray.length || arg < 0)
			return null;
		else{
			this.activeDWName = this.dwArray[arg].getName();        //激活数据窗口
			return this.dwArray[arg];
		}
	}
}
/**
*@description 获取当前活动的数据窗口对象
*/
function DWM_getActiveDW()
{			
	
	if(this.activeDWName != null)	return this.getDW(this.activeDWName);
	return null;	
}
/**
*@description 激活数据窗口
*/
function DWM_activeDW(arg)
{
	if(typeof(arg) == "object")
		this.addDW(arg);
	else 
		this.getDW(arg);
}
/**
*@description 本次请求之前，清除所有的有影响参数
*/
function DWM_clearAllParameters(){	
	var formObj = findObj(unieap.FORM_NAME);
	if(formObj == null) return;
	
	//DW_DWFILTER_BEGIN、DW_DWQUERY_BEGIN在DWNameRule.js中定义
    for (i=0; i<formObj.length; i++ ){
        if ( formObj(i).type == "hidden")
        	if(formObj(i).id.indexOf(DW_DWFILTER_BEGIN) == 0 ||  formObj(i).id.indexOf(DW_DWQUERY_BEGIN) == 0 )
        		formObj(i).value = "";
    }  
    if(findObj("dwNames")) findObj("dwNames").value="";
    //清理调试信息
    if(findObj("SendMsg")) findObj("SendMsg").innerText = "";
    if(findObj("RetrieveMsg")) findObj("RetrieveMsg").innerText = "";
    
}
/**
*@description:      数据窗口统一的请求入口
*@param:            postParameter     利用post方法传递的参数
*@param:            actionMethod      action中的方法
*@param:            boControllerName     
*@param:            boControllerMethod   
*@param:            actionName	      已配置的action名称
*
*@return:           从服务器返回的字符串
*/
function DWM_executeRequest(postParameter,actionMethod,boControllerName,boControllerMethod,actionName){
	if(postParameter == null || postParameter == ""  || actionMethod == null || actionMethod == "" ) return;
	
	//如果没有指明action,采用默认的
	var actionName = actionName==null || actionName == "" ||  actionName == "undefined" ? this.DEFAULT_ACTION_NAME : actionName;
    if(boControllerName != null && boControllerName != "" && boControllerName != "undefined" ) postParameter += "&boControllerName="+boControllerName;    
    if(boControllerMethod != null && boControllerMethod != "" && boControllerMethod != "undefined" ) postParameter += "&boControllerMethod="+boControllerMethod;        
    //调用统一的请求处理   
    //alert("actionName="+actionName);
    //alert("actionMethod="+actionMethod);
    //alert("postParameter="+postParameter);
    return executeRequest(actionName,actionMethod,postParameter,false); 
}
/**
*@description:      多个数据窗口提交
*@param:            dwNameArr         数据窗口名称数组
*@param:            boControllerName     
*@param:            boControllerMethod   
*@param:            actionName        已配置的action名称
*@param:            actionMethod	  已配置的action方法
*@param:            isCheckAll        是否全部校验(false/空:不用全部校验; true:全部校验)

*@return:           boolean
*/
function DWM_saveMultiDW(dwNameArr,boControllerName,boControllerMethod,actionName,actionMethod,isCheckAll){	
	
	if(isCheckAll == null || isCheckAll == "undefined") isCheckAll = false;
	if(!this.assambleDWData(dwNameArr,isCheckAll)) return false;
		
	//收集Form中的参数	
    var postParameter = getAlldata(findObj(unieap.FORM_NAME));    
    actionMethod = actionMethod == null || actionMethod == "" ? "updateDataWindows" : actionMethod;
    
	if(postParameter != ""){	
        //调用数据窗口的请求处理器
   		
    	var result = this.executeRequest(postParameter,actionMethod,boControllerName,boControllerMethod,actionName);    	    	
    	
    	//调用统一的结果处理函数
    	if( commDealResult(result) == "UNIEAP_ERROR") return false;
    	return true;    	
	}
	else
		return false;
}
/**
*@description:      多个数据窗口进行刷新
*@param:            dwNameArr         数据窗口名称数组
*@param:            boControllerName     
*@param:            boControllerMethod   
*@param:            actionName        已配置的action名称
*@param:            actionMethod      已配置的action方法
*@return:           boolean
*/
function DWM_refreshMultiDW(dwNameArr,boControllerName,boControllerMethod,actionName,actionMethod){

     actionMethod = actionMethod == null || actionMethod == "" ? "refresh" : actionMethod;
     if(dwNameArr == null) return false;
     try{
         dwNameArr.length;
      }catch(e){
         alert("参数有误！");
         return false;
      }       
      this.clearAllParameters();   
    //轮寻地装配数据窗口
    var dw,dwNames="",postParameter="";
    for(var i=0; i < dwNameArr.length; i++){        
        dw = this.getDW(dwNameArr[i]);  
        //检查数据窗口名称是否有效
        try{
            findObj(dw.nameRule.getDWIDName(),findObj(unieap.FORM_NAME)).value;
        }
        catch(e){
            alert("界面上没有名称为:\""+dwNameArr[i]+"\"的数据窗口,请开发人员修改参数。\n数据窗口名称大小写敏感、支持完整名称。");
            return false;
        }
        postParameter+="&dwName="+dw.getName();
        postParameter+= "&dwid_"+dw.getName()+"="+dw.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("dwid").value;
     }           
     
     if(postParameter!=""){
        postParameter = postParameter.substring(1);
        var result = this.executeRequest(postParameter,actionMethod,boControllerName,boControllerMethod,actionName); 
        if( commDealResult(result) == "UNIEAP_ERROR") return false;
        return true;        
     }
     else
         return false;
}

/**
*@description:      对指定数据窗口进行数据装配
*                   完成对界面数据的校验、装配工作
*@param:            dwNameArr         数据窗口名称数组
*@param:            isCheckAll        是否全部校验(false/空:不用全部校验; true:全部校验)
*
*@return:           boolean false/true
*/
function DWM_assambleDWData(dwNameArr,isCheckAll){
	
	if(dwNameArr == null) return false;
	try{
		dwNameArr.length;
	}catch(e){
		alert("assambleDWData()的参数有误！");
		return false;
	}		
	//首先清理一下上次提交时产生的参数(这是必须的)
	this.clearAllParameters();	

	//检查数据
	if(isCheckAll != null && isCheckAll)
		if(!checkValue()) return false;	

	
	//轮寻地装配数据窗口
    var dw,dwNames="";
	for(var i=0; i < dwNameArr.length; i++){		
		dw = this.getDW(dwNameArr[i]);	
		//检查数据窗口名称是否有效
		try{
			findObj(dw.nameRule.getDWIDName(),findObj(unieap.FORM_NAME)).value;
		}
		catch(e){
			alert("界面上没有名称为:\""+dwNameArr[i]+"\"的数据窗口,请开发人员修改参数。\n数据窗口名称大小写敏感、支持完整名称。");
			return false;
		}				
		//装配数据
		if(dw.getType() == "QUERY_CONDITION"){
			if(!dw.assQueryCondition(document)) return false;
			var filters = dw.getXMLDom().selectSingleNode("/dataWindow/filters");
			var dwquery = dw.nameRule.getQuery();
			dwquery.value = filters.xml;	
	    }
		else{
			if(!dw.dataFilter()) return false;
		}
		if(i==0)	
			dwNames +=dwNameArr[i];
		else
			dwNames +=","+dwNameArr[i];		
	}		
	if(findObj("dwNames")) findObj("dwNames").value=dwNames;	
	return true;
}




/**
*@description:     内部方法： 在数据窗口在一般tab页上时对指定数据窗口进行数据装配
*                   完成对界面数据的校验、装配工作
*@param:            dwNameArr         数据窗口名称数组
*@param:            isCheckAll        是否全部校验(false/空:不用全部校验; true:全部校验)
*@author:           王治博
*@return:           boolean false/true
*/




function DWM_assambleDWDataForTab(dwNameArr,isCheckAll,tabid,tabName){
   
    var tabText=parent.parent.getTextWithIframeid(tabName,tabid);
  
	if(dwNameArr == null) return false;
	try{
		dwNameArr.length;
	}catch(e){
		alert(tabText+"页assambleDWData()的参数有误！");
		return false;
	}		
	//首先清理一下上次提交时产生的参数(这是必须的)
	this.clearAllParameters();	

	//检查数据
	if(isCheckAll != null && isCheckAll)
		if(!checkValue()) {
		alert("校验"+tabText+"出错！");
		return false;
		}	

	
	//轮寻地装配数据窗口
    var dw,dwNames="";
	for(var i=0; i < dwNameArr.length; i++){		
		dw = this.getDW(dwNameArr[i]);	
		
		//检查数据窗口名称是否有效
		try{
	  
			findObj(dw.nameRule.getDWIDName(),findObj(unieap.FORM_NAME)).value;
		}
		catch(e){
			alert(tabText+"的界面上没有名称为:\""+dwNameArr[i]+"\"的数据窗口,请开发人员修改参数。\n数据窗口名称大小写敏感、支持完整名称。");
			return false;
		}				
		//装配数据
		if(dw.getType() == "QUERY_CONDITION"){
			if(!dw.assQueryCondition(document)) {
			alert("校验"+tabText+"出错！"); return false;
		    }
			var filters = dw.getXMLDom().selectSingleNode("/dataWindow/filters");
			var dwquery = dw.nameRule.getQuery();
		
			dwquery.value = filters.xml;	
	    }
		else{
			if(!dw.dataFilter()) {
			alert("校验"+tabText+"出错！"); return false;
		    }
		}
		if(i==0)	
			dwNames +=tabid+':'+dwNameArr[i];
		else
			dwNames +=","+tabid+':'+dwNameArr[i];		
	}		

	if(findObj("dwNames")) findObj("dwNames").value=dwNames;	
	return true;
}





/**
*@description:      获取所有数据窗口对象
*@return:           arr (DataWindow对象)
*/
function DWM_getAllDW(){
	var arr = new Array();	
	var formObj = findObj(unieap.FORM_NAME);
	if(formObj == null) return arr;	
	for (var i=0; i<formObj.length; i++ ){
        var obj=formObj(i);
        if(obj.type != "hidden") continue;        
        var pos = obj.name.indexOf(DW_DWFILTER_BEGIN);
        if(pos != 0) continue;        
        arr[arr.length] = this.getDW(obj.name.substring(DW_DWFILTER_BEGIN.length));       
    }    
    return arr;
}
////////////////////////////////////////////////////////////////////////
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+
+ 脚本描述： 数据窗口事件相关对象
+            采用面向对象的设计方法
+ 创    建： 胡光华 hugh@neusoft.com
+ 修改履历： 1、添加两个新的事件编号－BEFOR_CHECK和AFTER_CHECK
+ 修改  人： 米澄宇 micy@neusoft.com
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

function DWEvent(){	
	//eventID
	this.BEFOR_LOAD = 1;		  //数据加载之前的监听事件
	this.AFTER_LOAD = 2;		  //数据加载之后的监听事件
	this.BEFOR_QUERY = 3; 		  //查询之前的监听事件
	this.AFTER_QUERY = 4;		  //查询之后的监听事件
	this.BEFOR_ORDER = 5;		  //排序之前的监听事件
	this.AFTER_ORDER = 6;		  //排序之后的监听事件
	this.BEFOR_SAVE = 7; 		  //保存之前的监听事件
	this.AFTER_SAVE = 8;		  //保存之后的监听事件
    this.BEFOR_ROW_SELECTED = 9;  //行选择之前的监听事件
	this.AFTER_ROW_SELECTED = 10; //行选择之后的监听事件	
	this.BEFOR_CHECK = 11;		  //点击复选框之前的监听事件
	this.AFTER_CHECK = 12;		  //点击复选框之后的监听事件
    this.BEFOR_DELETE = 13;  	  //删除之前的监听事件
    this.AFTER_DELETE = 14;  	  //删除之后的监听事件
    this.BEFOR_OPEN_POPWIN = 15;  //弹出窗口之前的监听事件
    this.AFTER_OPEN_POPWIN = 16;  //弹出窗口之后的监听事件
    this.BEFOR_SAVE_POPWIN = 17;  //保存弹出窗口之前的监听事件
    this.AFTER_SAVE_POPWIN = 18;  //保存弹出窗口之后的监听事件
    this.BEFOR_REFRESH = 19;      //刷新前的监听事件
    this.AFTER_REFRESH = 20;      //刷新后的监听事件
    this.BEFOR_UPDATE = 21;       //修改之前的监听事件
    this.AFTER_UPDATE = 22;		  //修改之后的监听事件
    this.BEFOR_ADD = 23;		  //增加之前的监听事件
    this.AFTER_ADD = 24;		  //增加之后的监听事件
	
	this.handlerMapArr = new Array();        //保存事件与监听映射
	this.argumentMapArr = new Array();	     //保存本次事件的参数
	
	this.addListener = DWE_addListener;
	this.clearListener = DWE_clearListener;
	this.clearAllListener = DWE_clearAllListener;
	this.trigger = DWE_trigger;
	this.addArgument = DWE_addArgument;
	this.getArgument = DWE_getArgument;
	
}
/**
*@description 增加数据窗口事件的监听器，供二次开发人员调用。
*             同一种事件不能重复添加，不然只有最后定义的监听器有效。
*@parm eventID 请查看DWEvent对象的事件号定义部分
*@parm handler 一段可执行的js代码(一般为一个函数)
*@return nothing
*/
function DWE_addListener(eventID,handler){	
	for(var i=0; i < this.handlerMapArr.length; i++){
		if(eventID == this.handlerMapArr[i].getEventID()){
			this.handlerMapArr[i] = new DWEventMap(eventID,handler);
			return;
		}
	}
	this.handlerMapArr[this.handlerMapArr.length] = new DWEventMap(eventID,handler);	
}
/**
*@description 清除监听器
*@parm eventID 请查看DWEvent对象的事件号定义部分
*@return nothing
*/
function DWE_clearListener(eventID){
	var newArr = new Array();
	for(var i=0; i < this.handlerMapArr.length; i++){
		if(eventID != this.handlerMapArr[i].getEventID()){
			newArr[newArr.length] = this.handlerMapArr[i];			
		}
	}
	this.handlerMapArr = newArr; 
}
/**
*@description 清除所有监听器
*@return nothing
*/
function DWE_clearAllListener(){
	this.handlerMapArr = new Array();
}
/**
*@description 触发事件（仅供平台开发人员调用)
*@parm eventID 请查看DWEvent对象的事件号定义部分
*@parm params 其他参数
*@return false/true  返回值将决定下一步是否继续进行。
*/
function DWE_trigger(eventID,params){			
	for(var i=0; i < this.handlerMapArr.length; i++){
		if(eventID == this.handlerMapArr[i].getEventID()){
			try{
				eval(this.handlerMapArr[i].getHandler());
				return true;
			}catch(e){return false;}
		}		
	}
	this.argumentMapArr = new Array();         //清除本次事件参数
	return true;
}
/**
*@description 增加事件的参数（仅供平台开发人员调用)
*             同一种参数不能重复添加。
*@parm argName 参数名称（字符串)
*@parm argObj  参数对象
*@return nothing
*/
function DWE_addArgument(argName,argObj){	
	for(var i=0; i < this.argumentMapArr.length; i++){
		if(argName == this.argumentMapArr[i].getArgName()){
			this.argumentMapArr[i] = new DWArgumentMap(argName,argObj);
			return;
		}
	}
	this.argumentMapArr[this.argumentMapArr.length] = new DWArgumentMap(argName,argObj);	
}
/**
*@description 获取事件的参数（仅供平台开发人员调用)
*@parm argName 参数名称（字符串)
*@return 参数对象
*/
function DWE_getArgument(argName){	
	for(var i=0; i < this.argumentMapArr.length; i++){
		if(argName == this.argumentMapArr[i].getArgName()){			
			return this.argumentMapArr[i].getArgObj();
		}
	}
	return null;
}

function DWEventMap(eventID,handler){
	this.arr = new Array();
	this.arr[0] = eventID; 	this.arr[1] = handler;	
	this.getEventID = function(){return this.arr[0];}
	this.getHandler = function(){return this.arr[1];}		
}
function DWArgumentMap(argName,argObj){
	this.arr = new Array();
	this.arr[0] = argName; 	this.arr[1] = argObj;	
	this.getArgName = function(){return this.arr[0];}
	this.getArgObj = function(){return this.arr[1];}		
}