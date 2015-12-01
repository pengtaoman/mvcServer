var webpath = document.getElementsByTagName("contextPath")[0].value;

var eccn = new ECCN("ec");

function init() {
	eccn.init();
	if (null == document.getElementById('dsCityCode')
			|| null == document.getElementById('chooseType')
			|| null == document.getElementById('dsCharacter')) {
		return;
	}
	var dsCityCode = document.getElementById('dsCityCode').value;
	var chooseType = document.getElementById('chooseType').value;
	var character = document.getElementById('dsCharacter').value;
	if (chooseType != "") {
		var failPrompt = "";
		var strPhoneNumber = document.getElementById('strPhoneNumber').value;
		failPrompt = strPhoneNumber == "" ? "�Բ���û�з��������ĺ��롣" : "";
		var nextPage = "";
		var ec_t = parseInt(document.getElementById('ec_totalpages').value);
		var ec_p = parseInt(document.getElementById('ec_p').value);
		if (isNaN(ec_t)) {
			ec_t = 0;
		}
		if (isNaN(ec_p)) {
			ec_p = 0;
		}
		if (ec_t > ec_p) {
			nextPage = "��һҳ";
		}
		var pageStr = "&chooseType=" + chooseType + "&character=" + character
				+ "&failPrompt=" + failPrompt + "&nextPage=" + nextPage
				+ "&strPhoneNumber=" + strPhoneNumber;
		showServicePrompt(dsCityCode, '1', '-5', '2', '0', '1', '', '', pageStr);
	}
}
function insertPreSelect(obj1, obj2, obj3, obj4, obj5) {
	var defaultCount = document.forms[1].defaultCount.value;
	if (parseInt(parent.parent.F_BodyFraChar.F_HeadFraSel.document.forms[0].countFlag.value) >= parseInt(defaultCount)) {
		alert("���Ѿ��ﵽ���Ԥѡ�����������ƣ�������Ԥѡ!");
		return;
	}
	document.forms[1].serviceIdH.value = obj1;
	document.forms[1].consumeH.value = obj2;
	document.forms[1].productH.value = obj3;
	document.forms[1].firstMoneyH.value = obj4;

	parent.F_HeadFra.BQuery_OnClick();
	document.forms[1].target = "F_HeadFraSel";
	document.forms[1].action = webpath
			+ "/preSelectPhoneAction.do?method=getSelectedHead&flag=insert&serviceKind="
			+ parent.F_HeadFra.document.all.s_service_kind.value;
	document.forms[1].submit();
}
function Query_One(Id, cityCode, customerId) {
	var level = document.forms[0].serviceLevel.value;
	document.forms[0].action = document.forms[0].WebPath.value
			+ "/favourPlanAction.do?method=getServiceInfo&Id=" + Id
			+ "&cityCode=" + cityCode + "&serviceLevel=" + level 
			+ "&customerId=" + customerId ;
	document.forms[0].target = "F_BodyFra";
	document.forms[0].submit();
}
