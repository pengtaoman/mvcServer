/**
 * PasswordУ�����
 * js�����PasswordObj.js
 * Ӧ������:Password.html
 * ���ԣ�isNullable���Ƿ�Ϊ�ա� ��ΪNOʱ������Ϊ�գ���Ҫ�ǿ�У�飻��ΪYESʱ����Ϊ�գ�����Ҫ�ǿ�У�顣
 * ˵����1��֧������̶����ȣ���������̶����ȣ����ֹ���롣
 *       2��֧���ı����롣
 *       3����Enter ��ת��Ϊ Tab ����
 *             
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.21
 *				hugh@neusoft.com
 */
 
 function PasswordObj(editerObj){
	
	//�����������
	this.edtObj = editerObj;
    	
	
	//��������
	this.getParentObj = PAS_getParentObj;
	this.getBaseObj = PAS_getBaseObj;
	
	this.onvalidate = PAS_onvalidate;
	
	this.onReady = PAS_onDocumentReady;
	this.OnlyNumber = PAS_OnlyNumber;
 	this.eventBand =PAS_eventBand;
	
	
	//˽�з���
	
	//˽�ж���
    var ParObj=null;
    var BasObj=null;
}

	function PAS_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function PAS_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   	return this.BasObj;
   	
   	}

  
    function PAS_onvalidate() {      
     //����Base.htc�еĹ��ú���������ݺϷ���
     if(!this.getBaseObj().commonCheck())	return false;
     return true;
    }
   function PAS_onDocumentReady(){
   	//����ParentObj �ĳ�ʼ������   	 
    	 this.getParentObj().onReady();
   	};  
   function PAS_OnlyNumber(){}; 
   function PAS_eventBand(){};

