/**
 * ҳ���ʼ��
 */
var eccn=new ECCN("ec");

function init(message){

    eccn.doPrep=false;//��ʹ��Ԥ��ѯ 
	//��ʹ��ajax��ҳ
	eccn.ajaxSubmit=false;
	eccn.init();
	if(message!=''){
		alert(message);
	}
	
	parent.query.document.getElementById('bDelete').disabled=false;
	parent.detail.location.href='about:blank';
}
	
//ɾ������
function doDelete(webpath){
 	var canBeSubmit='';
 	var array=document.getElementsByName('checkboxs');
 	for (i=0;i<array.length;i++){
 		if(array[i].checked==true){
 			canBeSubmit="submit";
 			break;
 		}
 	}
 	if(canBeSubmit==''){
 		alert("��ѡ��Ҫɾ������(ѡ����ǰ��ѡ��)!");
 		return false;
 	}
 	//ˢ��EC TABLE��״̬��Ϣ
	EccnUtil.noExport('ec');
	EccnUtil.refresh('ec');
	document.getElementById('ec').action=webpath+"/om/datafilterinfo.do?method=doDelete";
	document.getElementById('ec').target='list';
	document.getElementById('ec').submit();
}

//˫��ĳ�д��޸�ҳ��
function doModify(filterId,filterInfo){		
	if(filterId=='' || filterInfo==''){
		alert("��������ʶΪ�գ����ܽ����޸Ĳ���");
	}
	var url=APP_PATH+"/om/datafilterinfo.do?method=modiInit&filterId="+filterId+"&filterInfo="+filterInfo;
    var style="status:no;dialogWidth:750px;dialogHeight:230px";
    window.showModalDialog(url,window,style);
}






