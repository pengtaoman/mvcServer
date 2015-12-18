if (top.location != self.location)
	top.location = self.location;
function focusUsername() {
	try {
		document.getElementById("j_username").focus();
	} catch (e) {
	}
}

///window.onfocus=focusUsername;
function init() {
	//document.getElementById("j_username").focus();
	var showAlert = document.all("showAlert").value;
	if (showAlert != "null") {
		document.getElementById("alertMessage").style.display = "block";
	}
	//window.open(APP_PATH+'/tdframework/common/jsp/message.jsp');
}

function reload() {
	logonform.j_username.value = '';
	logonform.j_password.value = '';
	return;
}
function setClass(eleName, clsName) {
	document.all(eleName).className = clsName;
}

function doSubmit() {
	document.getElementById("sub").focus();

	if (document.getElementById("j_username").value == '') {
		alert("用户名不能为空!");
	} else if (document.getElementById("j_password").value == '') {
		alert("登录口令不能为空!");
	} else {
		var urla;
		//if (isMobileText == 1) {
			urla = APP_PATH + "/login.do?method=beforeSubmitLogin&rnd="
					+ Math.random() + "&j_username="
					+ dojo.byId("j_username").value + "&j_password="
					+ dojo.byId("j_password").value;
			try {
				dojo
						.xhrGet( {
							url : urla,
							sync : true,
							preventCache : true,
							handleAs : "text",
							load : function(text, args) {
								ttext = text;
								try {
									if (text == 3) {
										dojo.cookie("USER_LOG_TEMP_VALUE", "");
										alert("用户名错误，请正确填写。");
										dojo.byId("j_username").value = "";
										dojo.byId("j_username").focus();
									} else if (text == 4) {
										dojo.cookie("USER_LOG_TEMP_PSW_VALUE",
												"");
										alert("密码错误，请正确填写。");
										dojo.byId("j_password").value = "";
										dojo.byId("j_password").focus();
									} else if (text == 5) {
										//alert(document.getElementById("j_password").value);
										dojo.cookie("USER_LOG_TEMP_PSW_VALUE", dojo.byId("j_password").value);
										document.getElementById("logonform")
												.submit();
									}
								} catch (e) {
									alert("获取用户信息失败。" + e);
									return false;
								}
							}
						});

			} catch (e) {
				alert("获取用户信息失败。");
			}
		//} else {
			//document.getElementById("j_password").value = password;
		//	alert(document.getElementById("j_password").value);
		//	document.getElementById("logonform").submit();
		//}

	}
}

function enterToTab() {
	var event1 = arguments[0] || window.event;
	var eventSource = event1.srcElement || event1.target;
	if (eventSource.type != 'button' && eventSource.type != 'textarea'
			&& event1.keyCode == 13) {
		event1.keyCode = 9;
	}
}

function enterToSubmit() {
	//alert(arguments[0]);
	var event1 = arguments[0] || window.event;
	var currentKey = event1.charCode || event1.keyCode;
	if (currentKey == 13) {
		//doSubmit(event1);
		document.getElementById("sub").onclick(event1);
	}

}

function inputTextFocus() {
	var event1 = arguments[0] || window.event;
	var eventSource = event1.srcElement || event1.target;
	eventSource.className = "focus";
}

var isMobileText = 5;
function inputTextBlur() {

	var event1 = arguments[0] || window.event;
	var obj = event1.srcElement || event1.target;
	obj.className = "default";
	var currentKey = event1.charCode || event1.keyCode;

	if ((obj.type == "password" && document.activeElement.id != "j_username")) {
        //do nothing
	} else if (obj.id == "j_username") {
       /**/
		var urla = APP_PATH + "/login.do?method=getValidateForEmp&rnd="
				+ Math.random() + "&j_username="
				+ dojo.byId("j_username").value;

		try {
			dojo
					.xhrGet( {
						url : urla,
						sync : true,
						preventCache : true,
						handleAs : "text",
						load : function(text, args) {
							//var str01 = '<input class="proving" type="text" tabIndex="3" name="jcaptcha_response" id="jcaptcha_response" onKeyDown="enterToSubmit(event)">';
						var str02 = '<input class="proving" type="text" tabIndex="4" name="mobile_code" id="mobile_code" onKeyDown="enterToSubmit(event)">';
						var str03 = '<input type="button" title="获取手机验证码" class="button_mobile" border="10" id="mobileCodeBtn" value="手机验证码" onclick="genMobileCode(this)" />';
						//var str04 = '<img width="77" height="30" border="0" id="jcaptcha" title="刷新验证码"  onclick="fetchJcap()"/>';
						//alert("inputTextBlur  " + text);
						try {
							if (text == 1) {
								dojo.byId("vCodeDiv").innerHTML = str02;
									dojo.byId("vCodeDivImg").innerHTML = str03;
									dojo.byId("vCodeDiv").style.visibility = 'visible';
									dojo.byId("vCodeDivImg").style.visibility = 'visible';
									dojo.byId("logonform").action = APP_PATH
											+ "/j_unieap_security_check.do?isMobile=10012";
									dojo.byId("j_password").focus();
							} else if (text == 0) {
								dojo.byId("vCodeDiv").innerHTML = "";
								dojo.byId("vCodeDivImg").innerHTML = "";
								dojo.byId("vCodeDiv").style.visibility = 'hidden';
								dojo.byId("vCodeDivImg").style.visibility = 'hidden';
								dojo.byId("j_password").focus();
								dojo.byId("logonform").action = APP_PATH
										+ "/j_unieap_security_check.do";
								isMobileText = 0;
								return false;
							} else if (dojo.byId("j_username").value != "" && text == 3) {
								/**/
								//MessageBox.alert( {title:"提示信息",message:'用户名错误，请正确填写。'} );
								alert('用户名错误，请正确填写。');
								dojo.cookie("USER_LOG_TEMP_VALUE", "");
								dojo.byId("j_username").value = "";
								dojo.byId("j_username").focus();
								return false;
								//
								
							}
						} catch (e) {
							alert("获取地市信息失败。" + e);
							return false;
						}
					}
					});
		} catch (e) {
			alert("获取地市信息失败。");
			return false;
		}
		dojo.cookie("USER_LOG_TEMP_VALUE", dojo.byId("j_username").value);
		return false;
		
	}
	//}
	
}
