/**
 * UniEAP1.7 对象管理器，负责所有功能对象的获取、页面初始化工作
 */
eapObjsMgr = new EAPObjsMgr();
function EAPObjsMgr(){	
	this.getEAPObj = EAPOM_getEAPObj;
	this.onReady = EAPOM_onReady;          //body的onLoad事件调用
	this.onvalidate = EAPOM_onvalidate;    //单入口校验
	this.refreshDW = EAPOM_refreshDW;
}
function EAPOM_getEAPObj(editerObj){
	var objName = editerObj.JSObjName;  
	switch(objName){
		
		case "Text": var obj = new TextObj(editerObj); 
			break;
		case "Number": var obj = new NumberObj(editerObj); 
			break;
		case "Integer": var obj = new IntegerObj(editerObj); 
			break;
		case "PosInteger": var obj = new PosIntegerObj(editerObj); 
			break;
		case "Double": var obj = new DoubleObj(editerObj); 
			break;
		case "Money": var obj = new MoneyObj(editerObj); 
			break;	
		case "Date": var obj = new DateObj(editerObj); 
			break;	
		case "IDCard": var obj = new IDCardObj(editerObj); 
			break;	
		case "Password": var obj = new PasswordObj(editerObj); 
			break;	
		case "PasswordConfirm": var obj = new PasswordConfirmObj(editerObj); 
			break;
		//case "Select": var obj = new SelectObj(editerObj); 
		//	break;
		case "TextArea": var obj = new TextAreaObj(editerObj); 
			break;	
		case "ReadOnly": var obj = new ReadOnlyObj(editerObj); 
			break;		
		case "QuickSelect": var obj = new QuickSelectObj(editerObj); 
			break;	
		case "Select": var obj = new SelectObj(editerObj);
			break;
        case "Email": var obj = new EmailObj(editerObj);
            break;
		default:		//alert("配置文件中没有此种类型为'"+objName+"'的JS对象！");
		}

	return obj;
}


//模拟HTC中的oncontentready、onDocumentReady
//帮定事件和事件处理函数
function EAPOM_onReady(formObj){
	var obj,eapObj;
	//formObj为空即代表使用默认的 EAPForm 
   var form = formObj == null ? findObj(unieap.FORM_NAME): formObj;
	for(i=0;i<form.elements.length; i++){
			obj=form[i]; 
			if( obj.JSObjName != null){
				eapObj = this.getEAPObj(obj);
				if(eapObj != null) {
					eapObj.onReady();      //初始化
				//	alert(obj.JSObjName);
				//	eapObj.eventBand();    //帮定事件和事件处理函数
			}
		}
	}
}

//处理数据窗体中JSObj控件的初始化
function EAPOM_refreshDW(formObj,dw){
	var obj,eapObj;
	//formObj为空即代表使用默认的 EAPForm 
   var form = formObj == null ? findObj(unieap.FORM_NAME): formObj;
   
   var dwObj = null;
   if(typeof(dw) == "object"){	 
   	dwObj = dw;
   }
	else{
		dwObj = dwManager.getDW(dw);
	}

   //var hiddenEditerBegin = dwObj.nameRule.getHiddenEditerBegin();
   var displayEditerBegin = dwObj.nameRule.getDisplayEditerBegin();
   var queryEditerBegin = dwObj.nameRule.getQueryConditionEditerBegin();  
   //alert(displayEditerBegin);
   /**
   * 修改,只是对数据窗口中的细粒度组件进行初始化
   */
    var dwName = dwObj.getName();
    if(dwObj.getType()!="QUERY_CONDITION"){
        var attr = dwObj.getXMLDom().selectNodes("/dataWindow/attributes/attribute");      
        for(var i =0;i<attr.length;i++){
            eapObj = document.all(displayEditerBegin+attr[i].attributes.getNamedItem("index").value);                   
            if(eapObj&&eapObj.JSObjName){                      
               eapObj = this.getEAPObj(eapObj);
               eapObj.onReady();
            }
        }
    }
    else{
        var attr = dwObj.getXMLDom().selectNodes("/dataWindow/filters/filter"); 
        if(!attr) return;
        for(var i =0;i<attr.length;i++){
            eapObj = document.all(queryEditerBegin+attr[i].attributes.getNamedItem("index").value);           
            if(eapObj&&eapObj.JSObjName){
               eapObj = this.getEAPObj(eapObj);
               eapObj.onReady();
            }
        } 
    }    
//    for(i=0;i<form.elements.length; i++){
//            obj=form[i]; 
//        //  if( obj.JSObjName != null && (obj.id.indexOf(hiddenEditerBegin) >= 0 || obj.id.indexOf(displayEditerBegin) >= 0)){
//        if( obj.JSObjName != null && (obj.id.indexOf(displayEditerBegin) >= 0 || obj.id.indexOf(queryEditerBegin) >= 0)){
//                eapObj = this.getEAPObj(obj);
//                if(eapObj != null) {
//                    eapObj.onReady();      //初始化
//               //  alert(obj.JSObjName);
//               //  eapObj.eventBand();    //帮定事件和事件处理函数
//            }
//        }
//    }

}
function EAPOM_onvalidate(editerObj){
	var eapObj = this.getEAPObj(editerObj);
	if(eapObj == null) return true;
	return eapObj.onvalidate();
}