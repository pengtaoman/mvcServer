/**
 * ֻ��У�����
 * js�����ReadOnlyObj.js
 * Ӧ�����ӣ�ReadOnly.html
 * ˵����1��ֻ��������д��
 *       2���ı䱳����ɫ��
 * 
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.21
 *				hugh@neusoft.com
 */

function ReadOnlyObj(editerObj){
	//�����������
	this.edtObj = editerObj;
	//��������
	this.getParentObj = ROO_getParentObj;
	this.getBaseObj = ROO_getBaseObj;
	
	this.onvalidate = ROO_onvalidate;
	
	this.OnlyRead = ROO_OnlyRead;
	this.onReady = ROO_onContentReady;
 	this.eventBand =ROO_eventBand;
	this.setEditer = ROO_setEditer;
	
	//˽�з���
	
	//˽�ж���
    var ParObj=null;
    var BasObj=null;
}
   function ROO_setEditer(editerObj){
   	   	this.edtObj = editerObj;
	}
 	function ROO_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function ROO_getBaseObj(){
   	if(this.BasObj==null){   		
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   	return this.BasObj;
   	
   	}


	//�������һ��Ҫ��
	function ROO_onvalidate(){
		 return true;
	}    
    function ROO_OnlyRead()
    {
    
     window.event.keyCode = 0 ;
	
    } 
   
	function ROO_onContentReady(){
		//����ParentObj �ĳ�ʼ������   	 
    	this.getParentObj().onReady();
    	 
		this.edtObj.readOnly = true;
   	this.edtObj.isUniEAP = false;
	 //  this.edtObj.isUniEAP=false;      
	}   
        
   function ROO_eventBand(){
    	this.getBaseObj().eventBand("onkeypress","OnlyRead()");
    	}
