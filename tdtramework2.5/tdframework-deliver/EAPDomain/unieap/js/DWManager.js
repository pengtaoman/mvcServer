/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ 
+ �ű������� ǰ̨���ݴ��ڹ�����
+ ���������� �򿪷���Ա�ṩ���ݴ��ڵĹ���
+ ��    ���� ���⻪ hugh@neusoft.com
+ �޸������� 
+ �޸�  �ˣ� 
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

//����һ�����ݴ��ڹ�����
var dwManager = new DataWindowManager();
//����һ�������¼�
var dwEvent = new DWEvent();
/**
*@description ���캯��
*/
function DataWindowManager()
{
	this.dwArray = new Array();	
	this.activeDWName = null;               //��¼��ǰ���������ݴ�������
	this.DEFAULT_ACTION_NAME = "DataWindowMgrAction";
	
	
	this.addDW = DWM_addDW;                 //����һ�����ݴ��ڶ���
	this.getDW = DWM_getDW;                 //��ȡָ�������ݴ��ڶ���
	this.getAllDW = DWM_getAllDW;           //��ȡ�������ݴ��ڶ��� 
	this.activeDW = DWM_activeDW;           //�������ݴ���
	this.getActiveDW = DWM_getActiveDW;     //��ȡ��ǰ�����ݴ��ڶ���
	this.saveMultiDW = DWM_saveMultiDW;     //���������ݴ���
    this.refreshMultiDW = DWM_refreshMultiDW;  //ˢ�¶�����ݴ���
	this.executeRequest = DWM_executeRequest;  //���ݴ���ͳһ���������
	this.clearAllParameters = DWM_clearAllParameters; //��������֮ǰ��������е���Ӱ�����
	this.assambleDWData = DWM_assambleDWData;  //��ָ�����ݴ��ڽ�������װ��
	this.assambleDWDataForTab=DWM_assambleDWDataForTab//�ڲ�����:�����ݴ�����һ��tabҳ��ʱ��ָ�����ݴ��ڽ�������װ��
                                                     // ��ɶԽ������ݵ�У�顢װ�乤����add by wangzhb
	
}
/**
*@description ����һ�����ݴ���
*@param dataWindow ���ݴ��ڶ���
*/
function DWM_addDW(dataWindow){	
	var dwName = dataWindow.getName();	
	this.activeDWName = dwName;                   //�������ݴ���
	for(var i=0; i < this.dwArray.length; i++)	
		if(this.dwArray[i].getName() == dwName){
			this.dwArray[i] = dataWindow;
			return;
		}
    this.dwArray[this.dwArray.length] = dataWindow;	
}
/**
*@description ͨ�����ݴ������ƣ���λ����������ȡ���ݴ��ڶ���
*@param arg   ���ݴ������ƣ�String���� ���ݴ����ڹ������е�λ�ã�Number��
*/
function DWM_getDW(arg)
{				
	if(typeof(arg)=="string"){
		for(var i=0; i < this.dwArray.length; i++)	
			if(this.dwArray[i].getName() == arg){
				this.activeDWName = arg;                   			//�������ݴ���					
				return this.dwArray[i];	
			}	
		var dw = new DataWindow(arg);		
		this.addDW(dw);		
		this.activeDWName = dw.getName();                         	//�������ݴ���
	    return dw;
	}
	else if(typeof(arg)=="number"){
		if(arg >= dwArray.length || arg < 0)
			return null;
		else{
			this.activeDWName = this.dwArray[arg].getName();        //�������ݴ���
			return this.dwArray[arg];
		}
	}
}
/**
*@description ��ȡ��ǰ������ݴ��ڶ���
*/
function DWM_getActiveDW()
{			
	
	if(this.activeDWName != null)	return this.getDW(this.activeDWName);
	return null;	
}
/**
*@description �������ݴ���
*/
function DWM_activeDW(arg)
{
	if(typeof(arg) == "object")
		this.addDW(arg);
	else 
		this.getDW(arg);
}
/**
*@description ��������֮ǰ��������е���Ӱ�����
*/
function DWM_clearAllParameters(){	
	var formObj = findObj(unieap.FORM_NAME);
	if(formObj == null) return;
	
	//DW_DWFILTER_BEGIN��DW_DWQUERY_BEGIN��DWNameRule.js�ж���
    for (i=0; i<formObj.length; i++ ){
        if ( formObj(i).type == "hidden")
        	if(formObj(i).id.indexOf(DW_DWFILTER_BEGIN) == 0 ||  formObj(i).id.indexOf(DW_DWQUERY_BEGIN) == 0 )
        		formObj(i).value = "";
    }  
    if(findObj("dwNames")) findObj("dwNames").value="";
    //���������Ϣ
    if(findObj("SendMsg")) findObj("SendMsg").innerText = "";
    if(findObj("RetrieveMsg")) findObj("RetrieveMsg").innerText = "";
    
}
/**
*@description:      ���ݴ���ͳһ���������
*@param:            postParameter     ����post�������ݵĲ���
*@param:            actionMethod      action�еķ���
*@param:            boControllerName     
*@param:            boControllerMethod   
*@param:            actionName	      �����õ�action����
*
*@return:           �ӷ��������ص��ַ���
*/
function DWM_executeRequest(postParameter,actionMethod,boControllerName,boControllerMethod,actionName){
	if(postParameter == null || postParameter == ""  || actionMethod == null || actionMethod == "" ) return;
	
	//���û��ָ��action,����Ĭ�ϵ�
	var actionName = actionName==null || actionName == "" ||  actionName == "undefined" ? this.DEFAULT_ACTION_NAME : actionName;
    if(boControllerName != null && boControllerName != "" && boControllerName != "undefined" ) postParameter += "&boControllerName="+boControllerName;    
    if(boControllerMethod != null && boControllerMethod != "" && boControllerMethod != "undefined" ) postParameter += "&boControllerMethod="+boControllerMethod;        
    //����ͳһ��������   
    //alert("actionName="+actionName);
    //alert("actionMethod="+actionMethod);
    //alert("postParameter="+postParameter);
    return executeRequest(actionName,actionMethod,postParameter,false); 
}
/**
*@description:      ������ݴ����ύ
*@param:            dwNameArr         ���ݴ�����������
*@param:            boControllerName     
*@param:            boControllerMethod   
*@param:            actionName        �����õ�action����
*@param:            actionMethod	  �����õ�action����
*@param:            isCheckAll        �Ƿ�ȫ��У��(false/��:����ȫ��У��; true:ȫ��У��)

*@return:           boolean
*/
function DWM_saveMultiDW(dwNameArr,boControllerName,boControllerMethod,actionName,actionMethod,isCheckAll){	
	
	if(isCheckAll == null || isCheckAll == "undefined") isCheckAll = false;
	if(!this.assambleDWData(dwNameArr,isCheckAll)) return false;
		
	//�ռ�Form�еĲ���	
    var postParameter = getAlldata(findObj(unieap.FORM_NAME));    
    actionMethod = actionMethod == null || actionMethod == "" ? "updateDataWindows" : actionMethod;
    
	if(postParameter != ""){	
        //�������ݴ��ڵ���������
   		
    	var result = this.executeRequest(postParameter,actionMethod,boControllerName,boControllerMethod,actionName);    	    	
    	
    	//����ͳһ�Ľ��������
    	if( commDealResult(result) == "UNIEAP_ERROR") return false;
    	return true;    	
	}
	else
		return false;
}
/**
*@description:      ������ݴ��ڽ���ˢ��
*@param:            dwNameArr         ���ݴ�����������
*@param:            boControllerName     
*@param:            boControllerMethod   
*@param:            actionName        �����õ�action����
*@param:            actionMethod      �����õ�action����
*@return:           boolean
*/
function DWM_refreshMultiDW(dwNameArr,boControllerName,boControllerMethod,actionName,actionMethod){

     actionMethod = actionMethod == null || actionMethod == "" ? "refresh" : actionMethod;
     if(dwNameArr == null) return false;
     try{
         dwNameArr.length;
      }catch(e){
         alert("��������");
         return false;
      }       
      this.clearAllParameters();   
    //��Ѱ��װ�����ݴ���
    var dw,dwNames="",postParameter="";
    for(var i=0; i < dwNameArr.length; i++){        
        dw = this.getDW(dwNameArr[i]);  
        //������ݴ��������Ƿ���Ч
        try{
            findObj(dw.nameRule.getDWIDName(),findObj(unieap.FORM_NAME)).value;
        }
        catch(e){
            alert("������û������Ϊ:\""+dwNameArr[i]+"\"�����ݴ���,�뿪����Ա�޸Ĳ�����\n���ݴ������ƴ�Сд���С�֧���������ơ�");
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
*@description:      ��ָ�����ݴ��ڽ�������װ��
*                   ��ɶԽ������ݵ�У�顢װ�乤��
*@param:            dwNameArr         ���ݴ�����������
*@param:            isCheckAll        �Ƿ�ȫ��У��(false/��:����ȫ��У��; true:ȫ��У��)
*
*@return:           boolean false/true
*/
function DWM_assambleDWData(dwNameArr,isCheckAll){
	
	if(dwNameArr == null) return false;
	try{
		dwNameArr.length;
	}catch(e){
		alert("assambleDWData()�Ĳ�������");
		return false;
	}		
	//��������һ���ϴ��ύʱ�����Ĳ���(���Ǳ����)
	this.clearAllParameters();	

	//�������
	if(isCheckAll != null && isCheckAll)
		if(!checkValue()) return false;	

	
	//��Ѱ��װ�����ݴ���
    var dw,dwNames="";
	for(var i=0; i < dwNameArr.length; i++){		
		dw = this.getDW(dwNameArr[i]);	
		//������ݴ��������Ƿ���Ч
		try{
			findObj(dw.nameRule.getDWIDName(),findObj(unieap.FORM_NAME)).value;
		}
		catch(e){
			alert("������û������Ϊ:\""+dwNameArr[i]+"\"�����ݴ���,�뿪����Ա�޸Ĳ�����\n���ݴ������ƴ�Сд���С�֧���������ơ�");
			return false;
		}				
		//װ������
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
*@description:     �ڲ������� �����ݴ�����һ��tabҳ��ʱ��ָ�����ݴ��ڽ�������װ��
*                   ��ɶԽ������ݵ�У�顢װ�乤��
*@param:            dwNameArr         ���ݴ�����������
*@param:            isCheckAll        �Ƿ�ȫ��У��(false/��:����ȫ��У��; true:ȫ��У��)
*@author:           ���β�
*@return:           boolean false/true
*/




function DWM_assambleDWDataForTab(dwNameArr,isCheckAll,tabid,tabName){
   
    var tabText=parent.parent.getTextWithIframeid(tabName,tabid);
  
	if(dwNameArr == null) return false;
	try{
		dwNameArr.length;
	}catch(e){
		alert(tabText+"ҳassambleDWData()�Ĳ�������");
		return false;
	}		
	//��������һ���ϴ��ύʱ�����Ĳ���(���Ǳ����)
	this.clearAllParameters();	

	//�������
	if(isCheckAll != null && isCheckAll)
		if(!checkValue()) {
		alert("У��"+tabText+"����");
		return false;
		}	

	
	//��Ѱ��װ�����ݴ���
    var dw,dwNames="";
	for(var i=0; i < dwNameArr.length; i++){		
		dw = this.getDW(dwNameArr[i]);	
		
		//������ݴ��������Ƿ���Ч
		try{
	  
			findObj(dw.nameRule.getDWIDName(),findObj(unieap.FORM_NAME)).value;
		}
		catch(e){
			alert(tabText+"�Ľ�����û������Ϊ:\""+dwNameArr[i]+"\"�����ݴ���,�뿪����Ա�޸Ĳ�����\n���ݴ������ƴ�Сд���С�֧���������ơ�");
			return false;
		}				
		//װ������
		if(dw.getType() == "QUERY_CONDITION"){
			if(!dw.assQueryCondition(document)) {
			alert("У��"+tabText+"����"); return false;
		    }
			var filters = dw.getXMLDom().selectSingleNode("/dataWindow/filters");
			var dwquery = dw.nameRule.getQuery();
		
			dwquery.value = filters.xml;	
	    }
		else{
			if(!dw.dataFilter()) {
			alert("У��"+tabText+"����"); return false;
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
*@description:      ��ȡ�������ݴ��ڶ���
*@return:           arr (DataWindow����)
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
+ �ű������� ���ݴ����¼���ض���
+            ��������������Ʒ���
+ ��    ���� ���⻪ hugh@neusoft.com
+ �޸������� 1����������µ��¼���ţ�BEFOR_CHECK��AFTER_CHECK
+ �޸�  �ˣ� �׳��� micy@neusoft.com
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

function DWEvent(){	
	//eventID
	this.BEFOR_LOAD = 1;		  //���ݼ���֮ǰ�ļ����¼�
	this.AFTER_LOAD = 2;		  //���ݼ���֮��ļ����¼�
	this.BEFOR_QUERY = 3; 		  //��ѯ֮ǰ�ļ����¼�
	this.AFTER_QUERY = 4;		  //��ѯ֮��ļ����¼�
	this.BEFOR_ORDER = 5;		  //����֮ǰ�ļ����¼�
	this.AFTER_ORDER = 6;		  //����֮��ļ����¼�
	this.BEFOR_SAVE = 7; 		  //����֮ǰ�ļ����¼�
	this.AFTER_SAVE = 8;		  //����֮��ļ����¼�
    this.BEFOR_ROW_SELECTED = 9;  //��ѡ��֮ǰ�ļ����¼�
	this.AFTER_ROW_SELECTED = 10; //��ѡ��֮��ļ����¼�	
	this.BEFOR_CHECK = 11;		  //�����ѡ��֮ǰ�ļ����¼�
	this.AFTER_CHECK = 12;		  //�����ѡ��֮��ļ����¼�
    this.BEFOR_DELETE = 13;  	  //ɾ��֮ǰ�ļ����¼�
    this.AFTER_DELETE = 14;  	  //ɾ��֮��ļ����¼�
    this.BEFOR_OPEN_POPWIN = 15;  //��������֮ǰ�ļ����¼�
    this.AFTER_OPEN_POPWIN = 16;  //��������֮��ļ����¼�
    this.BEFOR_SAVE_POPWIN = 17;  //���浯������֮ǰ�ļ����¼�
    this.AFTER_SAVE_POPWIN = 18;  //���浯������֮��ļ����¼�
    this.BEFOR_REFRESH = 19;      //ˢ��ǰ�ļ����¼�
    this.AFTER_REFRESH = 20;      //ˢ�º�ļ����¼�
    this.BEFOR_UPDATE = 21;       //�޸�֮ǰ�ļ����¼�
    this.AFTER_UPDATE = 22;		  //�޸�֮��ļ����¼�
    this.BEFOR_ADD = 23;		  //����֮ǰ�ļ����¼�
    this.AFTER_ADD = 24;		  //����֮��ļ����¼�
	
	this.handlerMapArr = new Array();        //�����¼������ӳ��
	this.argumentMapArr = new Array();	     //���汾���¼��Ĳ���
	
	this.addListener = DWE_addListener;
	this.clearListener = DWE_clearListener;
	this.clearAllListener = DWE_clearAllListener;
	this.trigger = DWE_trigger;
	this.addArgument = DWE_addArgument;
	this.getArgument = DWE_getArgument;
	
}
/**
*@description �������ݴ����¼��ļ������������ο�����Ա���á�
*             ͬһ���¼������ظ���ӣ���Ȼֻ�������ļ�������Ч��
*@parm eventID ��鿴DWEvent������¼��Ŷ��岿��
*@parm handler һ�ο�ִ�е�js����(һ��Ϊһ������)
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
*@description ���������
*@parm eventID ��鿴DWEvent������¼��Ŷ��岿��
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
*@description ������м�����
*@return nothing
*/
function DWE_clearAllListener(){
	this.handlerMapArr = new Array();
}
/**
*@description �����¼�������ƽ̨������Ա����)
*@parm eventID ��鿴DWEvent������¼��Ŷ��岿��
*@parm params ��������
*@return false/true  ����ֵ��������һ���Ƿ�������С�
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
	this.argumentMapArr = new Array();         //��������¼�����
	return true;
}
/**
*@description �����¼��Ĳ���������ƽ̨������Ա����)
*             ͬһ�ֲ��������ظ���ӡ�
*@parm argName �������ƣ��ַ���)
*@parm argObj  ��������
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
*@description ��ȡ�¼��Ĳ���������ƽ̨������Ա����)
*@parm argName �������ƣ��ַ���)
*@return ��������
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