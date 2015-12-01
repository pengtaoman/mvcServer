dojo.require("unieap.global");
dojo.require("unieap.util.util");
/**
 * @summary:
 *     各种信息提示框的实现
 * @classDescription:
 *     扩展unieap.dialog.MessageBox，用法与unieap.dialog.MessageBox相同。
 *     扩展功能点如下
 *     1 如果填写了id，可根据id在BS_PROMPT_INFO_T查询提示信息，替换提示的message和type参数
 *     2 如果填写了infoList，可根据infoList将BS_PROMPT_INFO_T.message自动提示message，并将message中的$替换为infoList中的相应值，如果$多于infoList中的数目，则多出的$替换为半角空格
 * 	     其中infoList可以是一个嵌套的list，如[[a,b][c,d]]，则提示信息可循环拼成一个完整信息
 * 	   3 BS_PROMPT_INFO_T是缓存字典表，启动时全量加载，如果id在缓存中无法找到则会从数据库中先查询一次，并放入缓存(适用于添加新的配置数据而不需刷新缓存)
 * @declaredClass:
 *		orderaccept.common.MessageBox
 * @example:
 * |	orderaccept.common.dialog.MessageBox.alert({
 * 			id:1,infoList:[121]
 * |	},node);
 * 		一个确认对话框,根据id在BS_PROMPT_INFO_T查询提示信息
 */
defineModule("orderaccept.common.dialog.MessageBox", [ "unieap.dialog.MessageBox" ], function(messageBox) {
	
	orderaccept.common.dialog.MessageBox.oldGetHeight=messageBox._getHeight;
	orderaccept.common.dialog.MessageBox.getHeight=function(){
		return 0;
	};

	orderaccept.common.dialog.MessageBox.alert = function(args, node) {
		
		orderaccept.common.dialog.MessageBox.handlePrompt(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.getHeight;
		MessageBox.alert(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.oldGetHeight;
		
	};
	orderaccept.common.dialog.MessageBox.autoCloseAlert = function(args, node) {
		
		orderaccept.common.dialog.MessageBox.handlePrompt(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.getHeight;
		MessageBox.autoCloseAlert(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.oldGetHeight;
		
	};
	orderaccept.common.dialog.MessageBox.cancelConfirm = function(args, node) {
		
		orderaccept.common.dialog.MessageBox.handlePrompt(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.getHeight;
		MessageBox.cancelConfirm(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.oldGetHeight;
		
	};
	orderaccept.common.dialog.MessageBox.confirm = function(args, node) {
		
		orderaccept.common.dialog.MessageBox.handlePrompt(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.getHeight;
		MessageBox.confirm(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.oldGetHeight;
		
	};
	orderaccept.common.dialog.MessageBox.customerButtonConfirm = function(args, node) {
		
		orderaccept.common.dialog.MessageBox.handlePrompt(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.getHeight;
		MessageBox.customerButtonConfirm(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.oldGetHeight;
		
	};
	orderaccept.common.dialog.MessageBox.multiPrompt = function(args, node) {
		
		orderaccept.common.dialog.MessageBox.handlePrompt(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.getHeight;
		MessageBox.multiPrompt(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.oldGetHeight;
		
	};
	orderaccept.common.dialog.MessageBox.prompt = function(args, node) {
		
		orderaccept.common.dialog.MessageBox.handlePrompt(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.getHeight;
		MessageBox.prompt(args, node);
		MessageBox._getHeight=orderaccept.common.dialog.MessageBox.oldGetHeight;
		
	};
	orderaccept.common.dialog.MessageBox.handlePrompt = function(args, node) {
		
		//检查是否存在unieap的样式，不存在则赋值
		var regex= /unieap/i; 
		if(document.body){
				if(!regex.test(document.body.className)){
					document.body.className=document.body.className+" unieap";
				}
		}
		
		if (args && (args.busiCode)) {
			var argArray=[];
			var webAppName=orderaccept.common.dialog.MessageBox.getWebAppName();
			argArray.push(webAppName);
			argArray.push("/");
			argArray.push("promptInfoAction.do?method=getPromptInfo");
			
			if(args.busiCode){
				argArray.push("&busiCode="+args.busiCode);
			}
			var promptInfo = orderaccept.common.dialog.MessageBox.getAjaxJson(argArray.join(""));
			if(promptInfo.type){
				args.type = promptInfo.type;
			}

			if(promptInfo.title){
				args.title = promptInfo.title;
			}
			if(promptInfo.message){
				args.message = promptInfo.message;
			}
		}
		if (args && args.infoList) {
			if (args.message) {
				var messageList = args.message.split("$");
				var tagert = "";
				var infoListArray = [];
				//跨window，args.infoList instanceof window.Array =false
				if (args.infoList.length) {
					if (args.infoList[0]&&(args.infoList[0]instanceof Array)) {
						for ( var index = 0, length = args.infoList[0].length; index < length; index++) {
							infoListArray.push(args.infoList[0][index]);
						}
					} else {
						infoListArray.push(args.infoList);
					}
				}
				for ( var outIndex = 0, outLength = infoListArray.length; outIndex < outLength; outIndex++) {
					for ( var index = 0, length = messageList.length; index < length; index++) {
						tagert += messageList[index];
						if (infoListArray[outIndex] && infoListArray[outIndex][index]) {
							tagert += infoListArray[outIndex][index];
						} else if (index > messageList.length - 1) {
							tagert += ' ';
						}
					}
				}
				args.message = tagert;
			}
		}
	};
	orderaccept.common.dialog.MessageBox.getWebAppName = function() {
		var webAppName = unieap.WEB_APP_NAME;
		if (!webAppName) {
			var pathName = document.location.pathname;
			var index = pathName.substr(1).indexOf("/");
			webAppName = pathName.substr(0, index + 1);
		}
		return webAppName;
	};
	orderaccept.common.dialog.MessageBox.getAjaxJson = function(uri, fail_ok) {
		return (new Function("return " + orderaccept.common.dialog.MessageBox.getAjaxText(uri, fail_ok))).apply(null,
				[]);
	};
	orderaccept.common.dialog.MessageBox.getAjaxText = function(uri, fail_ok) {
		return dojo._getText(uri, fail_ok);
	};
});
