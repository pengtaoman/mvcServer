/**
 * UniEAP1.7 ������������������й��ܶ���Ļ�ȡ��ҳ���ʼ������
 */
eapObjsMgr = new EAPObjsMgr();
function EAPObjsMgr(){	
	this.getEAPObj = EAPOM_getEAPObj;
	this.onReady = EAPOM_onReady;          //body��onLoad�¼�����
	this.onvalidate = EAPOM_onvalidate;    //�����У��
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
		default:		//alert("�����ļ���û�д�������Ϊ'"+objName+"'��JS����");
		}

	return obj;
}


//ģ��HTC�е�oncontentready��onDocumentReady
//�ﶨ�¼����¼�������
function EAPOM_onReady(formObj){
	var obj,eapObj;
	//formObjΪ�ռ�����ʹ��Ĭ�ϵ� EAPForm 
   var form = formObj == null ? findObj(unieap.FORM_NAME): formObj;
	for(i=0;i<form.elements.length; i++){
			obj=form[i]; 
			if( obj.JSObjName != null){
				eapObj = this.getEAPObj(obj);
				if(eapObj != null) {
					eapObj.onReady();      //��ʼ��
				//	alert(obj.JSObjName);
				//	eapObj.eventBand();    //�ﶨ�¼����¼�������
			}
		}
	}
}

//�������ݴ�����JSObj�ؼ��ĳ�ʼ��
function EAPOM_refreshDW(formObj,dw){
	var obj,eapObj;
	//formObjΪ�ռ�����ʹ��Ĭ�ϵ� EAPForm 
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
   * �޸�,ֻ�Ƕ����ݴ����е�ϸ����������г�ʼ��
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
//                    eapObj.onReady();      //��ʼ��
//               //  alert(obj.JSObjName);
//               //  eapObj.eventBand();    //�ﶨ�¼����¼�������
//            }
//        }
//    }

}
function EAPOM_onvalidate(editerObj){
	var eapObj = this.getEAPObj(editerObj);
	if(eapObj == null) return true;
	return eapObj.onvalidate();
}