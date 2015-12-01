var APP_PATH = document.getElementsByTagName("ContextPath")[0].value;

/**
 * 页面初始化
 * init
 */
function init(beginDate,endDate) {
    DateUtil.addDateArea("beginLoginTime", "beginLoginDate");
    DateUtil.addDateArea("endLoginTime", "endLoginDate");
    
   	if(beginDate!='' && endDate!=''){
    	document.getElementById("beginLoginTime").value = beginDate;
    	document.getElementById("endLoginTime").value   = endDate;
    }
}

/**
 * 查询
 * doQuery
 */
 function doQuery() {
 
 	makeUpcase();
 	
	var msg = checkValues();
	if (msg != '') {
		alert(msg);
		return;
	}
    //parent.WaitingBar.showMe();
    document.forms[0].action = APP_PATH + "/om/loginUserListAction.do?method=getList";
    document.forms[0].target = "list";
    document.forms[0].submit();
 }
 
 /**
 * 转换输入框内容为大写
 */
function makeUpcase()
{
	document.getElementById('workNo').value = document.getElementById('workNo').value.toUpperCase();
}

/**
 * 校验日期格式
 */
function checkValues()
{
	var msg = '';
	var begin_date = document.getElementById('beginLoginTime').value;
	var end_date = document.getElementById('endLoginTime').value;
	
	if (begin_date == '') {
		msg += '请选择 ';
		msg += '起始日期';
		msg += '\n';
	}
	var testDate1 = /^\d{4}-\d{2}-\d{2}$/g;
	if (begin_date != '' && !testDate1.test(begin_date)) {
		msg += '登录时间格式不正确，格式为yyyy-MM-dd，例如：2007-01-01';
		msg += '\n';
	}
	
	if (end_date != '') {
		if (begin_date > end_date) {
			msg += '终止日期不能小于开始日期';
			msg += '\n';
		}
		var testDate2 = /^\d{4}-\d{2}-\d{2}$/g;
		if (!testDate2.test(end_date)) {
			msg += '终止日期间格式不正确，格式为yyyy-MM-dd，例如：2037-01-01';
			msg += '\n';
		}
	} else {
		msg += '请选择 ';
		msg += '终止时间';
		msg += '\n';
	}
	
	if(begin_date.substring(5,7) != end_date.substring(5,7)){
	  	msg += '起始日期与终止日期应在同一个月内';
	  	document.getElementById('endLoginTime').focus();
	}

	return msg;
}
