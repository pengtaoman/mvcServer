/**
 * ҳ���ʼ��
 */
var eccn=new ECCN("ec");

function init(message,dataInfo,flag,showNewDataFlag){
    //eccn.doPrep=false;//��ʹ��Ԥ��ѯ 
	//��ʹ��ajax��ҳ
	//eccn.ajaxSubmit=false;
	eccn.init();
	if(message!=''){
		alert(message);
	}	
	var allElements = document.body.getElementsByTagName("INPUT");
	if(showNewDataFlag == '1'){//�������ݿɼ����Ƚ���������ѡ�У��ٽ����ɼ�����ȥ��
		for (var i = 0; i < allElements.length; i ++) {
			var e = allElements[i];
			if (e.type == 'checkbox') {
				e.checked=true;
				if(flag=='setCheckbox'){
					e.disabled = "true";
				}
				var info = dataInfo.split("~");
				for(var j=0; j<info.length; j++){
					if(e.value == info[j]){
						e.checked = false;
						break;
					}
				}
			}
		}
	}else if(showNewDataFlag == '0'){//�������ݲ��ɼ�	���Ƚ���������ȡ��ѡ�У��ٽ��ɼ�����ѡ��
		for (var i = 0; i < allElements.length; i ++) {
			var e = allElements[i];
			if (e.type == 'checkbox') {
				e.checked=false;
				if(flag=='setCheckbox'){
					e.disabled = "true";
				}
				var info = dataInfo.split("~");
				for(var j=0; j<info.length; j++){
					if(e.value == info[j]){
						e.checked = true;
						break;
					}
				}
			}
		}

	}

	var parentObj = parent.document.queryPage.document;
	parentObj.getElementById("bDelete").disabled = '';
}


