/**
 * PasswordConfirmУ�����
 * htc�����PasswordConfirm.htc
 * Ӧ������:PasswordConfirm.html
 * ���ԣ�isNullable���Ƿ�Ϊ�ա� ��ΪNOʱ������Ϊ�գ���Ҫ�ǿ�У�飻��ΪYESʱ����Ϊ�գ�����Ҫ�ǿ�У�顣
 *       prePassword: ָ��ǰһ��password��id ������ name��
 * ˵����1��֧������̶����ȣ���������̶����ȣ����ֹ���롣
 *       2��֧���ı����롣
 *       3����Enter ��ת��Ϊ Tab ����
 *             
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.21
 *				hugh@neusoft.com
 */
 
 
 function PasswordConfirmObj(editerObj){
	
	//�����������
	this.edtObj = editerObj;
    	
	
	//��������
	this.getParentObj = PCF_getParentObj;
	this.getBaseObj = PCF_getBaseObj;
	
	this.onvalidate = PCF_onvalidate;
	this.checkPassword = PCF_checkPassword;
	
	this.OnlyNumber = PCF_OnlyNumber;
	this.onReady = PCF_onDocumentReady;
 	this.eventBand =PCF_eventBand;
	
	
	//˽�з���
	
	//˽�ж���
    var ParObj=null;
    var BasObj=null;
	}
	
	
	function PCF_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function PCF_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   	return this.BasObj;
   	
   	}

  
    function PCF_onvalidate() {
    
     var inputStr = this.edtObj.value;
     var objName =this.edtObj.name;
     
     //����Base.htc�еĹ��ú���������ݺϷ���
     if(!this.getBaseObj().commonCheck())	return false;
     
     if (!this.checkPassword()){
         alert("�������벻һ�£����������룡");
	     return false; 
     }
    
     return true;

    }

  
  //У������password�Ƿ�һ��	
    function PCF_checkPassword(){
      //var pass1 = this.edtObj.document.all[prePassword].value;
      var pass1ID = this.edtObj.prePassword;
      var pass1 = document.all[pass1ID].value;
      var pass2 = this.edtObj.value;
    //  alert("pass1="+pass1+" "+"pass2="+pass2);
      if(pass1==pass2){
           return true;
     
      } else{   
           return false;   
      }
    }
    function PCF_OnlyNumber(){}
    function PCF_onDocumentReady(){
    	//����ParentObj �ĳ�ʼ������   	 
    	 this.getParentObj().onReady();
    	};  
    function PCF_eventBand(){};
    

