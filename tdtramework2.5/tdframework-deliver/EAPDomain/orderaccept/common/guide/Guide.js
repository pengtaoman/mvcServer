/*当前页面已经加载过导航条，可以通过调用该方法，改变导航条的显示步骤*/
function changeStep(curStep){
	if(isNaN(curStep) || curStep == ""){//传入非数字直接返回
		return;
	}
	var divAllStep = $("divAllStep");
	if(!divAllStep){//不存在导航条则返回
		return;
	}
	var objSteps = divAllStep.childNodes;
	if(!objSteps){//不存在导航则返回
		return;
	}
	for(var i = 0; i < objSteps.length; i++){//循环导航条中的每一步，更改样式
		var obj = objSteps[i];
		var step = obj.step;//第N步
		var ifLast = obj.ifLast;//是否最后一步
		var showName = obj.showName;//该步在页面title中显示的名字
		var className = "";//样式
		if(curStep > step){//当前步骤大于该步骤时，该步骤显示样式为蓝色：step_b 
			className = "step_b";
		}else if(curStep == step){//当前步骤等于该步骤时，该步骤显示样式为橙色：step_o ，同时更新title
			className = "step_o";
			$("curStepShowName").innerHTML = showName;
		}else {//当前步骤小于该步骤时，该步骤显示样式为灰色：step_g 
			className = "step_g";
		}
		if(ifLast == "true"){//当前步骤是最后一步，开关为长方形，CSS名称多个e，如step_be  step_oe  step_ge
			className += "e";
		}
		obj.className = className;
	}
}

/*页面加载导航条 */
function loadGuide(functionId, curStep, subFuncName){
	var param = "functionId=" + functionId + "&curStep=" + curStep;
	if(subFuncName){
		param = param + "&subFuncName=" + subFuncName;
	}
	param = encodeURI(encodeURI(param));
	var result = executeRequest("guideHandleAction", "loadGuide", param);
	$("divGuide").innerHTML=result;
}