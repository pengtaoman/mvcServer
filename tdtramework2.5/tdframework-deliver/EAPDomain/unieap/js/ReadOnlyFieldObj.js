/**
 * ֻ��У�����
 * js�����ReadOnlyFieldObj.js
 * Ӧ�����ӣ�ReadOnly.html
 * ˵����1��ֻ��������д��
 *       2���ı䱳����ɫ��
 * 
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.21
 *				hugh@neusoft.com
 */
function ReadOnlyFieldObj(editerObj){
	
	//�����������
	this.edtObj = editerObj;
    	
	
	//��������
	this.getParentObj = ROF_getParentObj;
	this.getBaseObj = ROF_getBaseObj;
	
	this.onvalidate = ROF_onvalidate;
	
	this.onReady = ROF_onContentReady;
 	this.eventBand = ROF_eventBand;
	
	
	//˽�з���
	
	//˽�ж���
    var ParObj=null;
    var BasObj=null;
}

 	function ROF_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function ROF_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   	return this.BasObj;
   	
   	}

//�������һ��Ҫ��
function ROF_onvalidate(){
  return true;
}
   
function ROF_onContentReady(){ 
	//����ParentObj �ĳ�ʼ������   	 
   this.getParentObj().onReady(); 
   
   this.edtObj.readOnly = true;
   this.edtObj.isUniEAP = false;
}   
        
        
function ROF_eventBand(){}
