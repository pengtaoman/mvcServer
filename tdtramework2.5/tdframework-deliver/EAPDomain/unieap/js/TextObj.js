/**
 * TextУ�����
 * js  �����TextObj.js
 * Ӧ�� ����: Text.html
 * ��     ��: 1.֧��ƽ̨¼��༭��Ļ�������(�鿴BaseObj.js) 
 *             
 * @author  lixiangyu@neusoft.com,2003.04
 * �޸�����: micy@neusoft.com	2003.07.21
 *				 hugh@neusoft.com
 *
 */
 function TextObj(editerObj){
	
	//�����������
	this.edtObj = editerObj;
    	
	
	//��������
	this.getParentObj = TEX_getParentObj;
	this.getBaseObj = TEX_getBaseObj;
	
	this.onvalidate = TEX_onvalidate;
	
	this.OnlyNumber = TEX_OnlyNumber;
	this.onReady = TEX_onContentReady;
 	this.eventBand = TEX_eventBand;
	
	
	//˽�з���
	
	//˽�ж���
    var ParObj=null;
    var BasObj=null;
	}
	
 	function TEX_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function TEX_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   	return this.BasObj;
   	
   	}
  
    function TEX_onvalidate() {	
     //����Base.htc�еĹ��ú������Ϸ���
     //alert("getBaseObj");
     return this.getBaseObj().commonCheck();  
    }
    function TEX_onContentReady(){
    	 //����ParentObj �ĳ�ʼ������   	 
    	 this.getParentObj().onReady();
    	} 
   function TEX_OnlyNumber(){} 
   function TEX_eventBand(){}
  
