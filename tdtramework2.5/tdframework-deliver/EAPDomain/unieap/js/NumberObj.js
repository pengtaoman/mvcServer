/**
 * NumberУ�����
 * js�����NumberObj.js
 * Ӧ�����ӣ�Number.html
 * ���ԣ�isNullable���Ƿ�Ϊ�ա� ��ΪNOʱ������Ϊ�գ���Ҫ�ǿ�У�飻��ΪYESʱ����Ϊ�գ�����Ҫ�ǿ�У�顣
 *       fixLength: �̶����ȡ��������û�дﵽfixlength�������ʾ��
 * ˵����1���������Ҫ��У����������0��9 ��
 *       2��֧������̶����ȣ���������̶����ȣ����ֹ���롣
 *       3����Enter ��ת��Ϊ Tab ����
 * 
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.19
 *				hugh@neusoft.com
 */

function NumberObj(editerObj){
	
	//�����������
	this.edtObj = editerObj;
    	
	
	//��������
	this.getParentObj = NUM_getParentObj;
	this.getBaseObj = NUM_getBaseObj;
	
	this.onvalidate = NUM_onvalidate;
	this.checkInput = NUM_checkInput;
	
	this.OnlyNumber = NUM_OnlyNumber;
	this.onReady = NUM_onDocumentReady;
 	this.eventBand = NUM_eventBand;
	
	
	//˽�з���
	
	//˽�ж���
    var ParObj=null;
    var BasObj=null;
}

	function NUM_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function NUM_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   		return this.BasObj;
   	
   	}


    function NUM_onvalidate() {
        var fixLength = this.edtObj.fixLength;
        var checkStr = this.edtObj.value;
        var objName = this.edtObj.name;
        
       //����Base.htc�еĹ��ú���������ݺϷ���
     	if(!this.getBaseObj().commonCheck())	return false;
     
      if(!this.checkInput()){
		    alert(this.edtObj.prompt + "���벻�Ϸ���");
		   return false;
		 }     
	
	return true;

    }
    
  function NUM_checkInput(){
      var inputStr = this.edtObj.value;

      for (var i = 0; i < inputStr.length; i++) {
           var oneChar = inputStr.charAt(i)
           
           if (oneChar < "0" || oneChar > "9") {
             event.returnValue = false;
             return false;
           }
       }
  
           return true;   
    
    }

    function NUM_OnlyNumber()
    {
       //�������볤�ȣ�������ֹ����
        var fixLength = this.edtObj.getAttribute("fixLength");
        var inputLen = this.edtObj.value.length;
        if(!isNaN(fixLength)){
	         fixLength = parseInt(fixLength);
	         if(inputLen < fixLength)
	             event.returnValue = true;
	         else if(inputLen > fixLength-1)
	             event.returnValue = false;
	 }
	
       //ֻ������������
	if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13)))
	{
		window.event.keyCode = 0 ;
	}

	
    } 
  
  function NUM_onDocumentReady(){
  		 //����ParentObj �ĳ�ʼ������   	 
    	 this.getParentObj().onReady();
  	};
  function NUM_eventBand(){
  	
  	this.getBaseObj().eventband("onkeypress","OnlyNumber()");
  	
  	}