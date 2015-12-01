/**++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*@description ������Ľ�����
*             ʹ��Ҫ�㣺1) <html xmlns:unieapNS>   ����ָ��html��xml�������ռ�
*                       2) <style>
*								unieapNS\:StateBar{behavior:url(StateBar.htc);} ����ָ�����ļ���Ϊhtc 	
*						   </style>
*                       3) ��CSS��JS(Common.js�Ǳ����)��Դ����
*	                    4) <body onLoad="findObj('StateBar').refresh();">  �������е�һ��ˢ��
*                       5) <unieapNS:StateBar id="StateBar" maxValue="100" currentValue="10" currentWork="����1..." />
*                 
*@example    ../html/StateBar.html
*@author     hugh@neusoft.com    2003/04/19
				 micy@neusoft.com    2003/07/21
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function StateBarObj(editerObj){
	
	//�����������
	this.edtObj = editerObj;
    	
	
	//��������
	this.getParentObj = SBO_getParentObj;
	this.getBaseObj = SBO_getBaseObj;
	
	this.refresh = SBO_refresh;
	
	this.onReady = SBO_DoInit;
 	this.eventBand = SBO_eventBand;
	
	
	//˽�з���
	this.calPercent = calPercent;
	this.modifyCurrentWork = modifyCurrentWork;
	this.modifyBarWidth = modifyBarWidth;
	
	//ȫ������
	var STATEBAR_TAGNAME = 'StateBar';
	var CURRENT_WORK = 'crtWork';
	var CURRENT_PERCENT = 'crtPercent';
	var STATEBAR = 'StateBar';
	var STATEBAR_CLASS = 'StateBar';
	var iMaxValue;
	var iCurrentValue;
	var isInit = false;
	
	//˽������
    var ParObj=null;
    var BasObj=null;
}




/**
*@description ˢ�º���
*@param       ��ǰ��ֵ
*@param       ��ǰ�Ĺ���
*/
function SBO_refresh(aCurrentValue,aCurrentWork)
{
	if(!isInit) 	return;
	if(aCurrentValue)	iCurrentValue = parseInt(""+aCurrentValue,10);
	this.modifyBarWidth(id+'_'+STATEBAR,this.calPercent(iCurrentValue));
	if(aCurrentWork)	this.modifyCurrentWork(id+'_'+CURRENT_WORK,this.calPercent(aCurrentWork));
		
}

function SBO_DoInit(){
    if(tagName != STATEBAR_TAGNAME) return;    	
    alert(" is "+currentValue);
    iCurrentValue = !currentValue|| currentValue == "" ? 0 : parseInt(currentValue,10);
    iMaxValue = !maxValue || maxValue == "" ? 100 : parseInt(maxValue,10);
    	
	var sHTML = '<CENTER><DIV style="width:90%">';
		sHTML += '	<TABLE width="100%"> ';		
		sHTML += ' 		<TR><TD width="80%" align="left" id="'+id+'_'+CURRENT_WORK+'">'+currentWork+'</TD><TD align="right" id="'+id+'_'+CURRENT_PERCENT+'">'+this.calPercent(currentValue)+'</TD></TR>';		
		sHTML += '      <TR><TD colspan="2"><HR color="green"/></TD></TR>';
		sHTML += '		<TR><TD colspan="2" align="left"><INPUT type="text" class="'+STATEBAR_CLASS+'" id="'+id+'_'+STATEBAR+'"></TD></TR>';		
		sHTML += '	</TABLE>';	
		sHTML += '</DIV></CENTER>';
	insertAdjacentHTML('BeforeEnd', sHTML);
	isInit = true;
}

function calPercent(aCurrentValue)
{	
	return Math.round((aCurrentValue*100)/maxValue)+"%";
}
function modifyBarWidth(id,width)
{
	findObj(id).style.width=width;	
}
function modifyCurrentWork(id,aCurrentWork)
{
	findObj(id).innerText=aCurrentWork;	
}

function SEL_eventBand(){}
