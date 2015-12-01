/*
function uptest() {
	showBox();
	setTimeout("closeBox()", 5000)
}
*/
function showBox() {
	//showWarningMsg();
	var res = showWarningMsg();
	if (res == "noMsg") {
		
	} else {
		document.getElementById("note_div").style.display = "block";
	}
	
	//showWarningMsg();
	/*
	if (o1 == undefined && o2 == undefined) {
		o1 = dojo.byId("note_div");
		o2 = dojo.byId("updiv");
	}
	o1.style.height = o1.clientHeight + 50 + "px";
	o2.style.height = o2.clientHeight + 50 + "px";
	if (o2.clientHeight < 150) {
		setTimeout(function() {
			showBox(o1, o2)
		}, 10);
	} else {
		showWarningMsg();
	}
    */	
	
}

function showOrCloseWarning() {
	if (document.getElementById("note_div").style.display == "none") {
		document.getElementById("note_div").style.display = "block";
		dojo.byId("imgWarningMsg").src = APP_PATH + "/common/dx20/images/main/button_mail.gif";
	} else {
		closeBox();
	}
}

function warnDetail(obj,objindex,workNo,pwd){
  	window.showModalDialog('/crm2/bulletinAction.do?method=getBulletinDetail&bulletinId='+obj.id+'&STAFFNO='+workNo+'&PASSWORD='+pwd, '', "status:no;dialogWidth:495px;dialogHeight:380px");
}


function showWarningMsg() {
	   
		var warningMsg;
	   
		dojo.rawXhrPost({
			url : APP_PATH + "/pRWarnMsgAction.do?method=getWarnMsg&crm6=crm6",
			sync : true,
			load : function(text, args) {
				if (text != null) {
					//alert(text);
					warningMsg = text;
					
				} else {
					return;
				}
			}
		});
		
		if (warningMsg != "noMsg") {
		    
			dojo.byId("updiv").innerHTML = warningMsg;
			/*
			 if (document.getElementById("note_div").style.display == "none") {
		        dojo.byId("imgWarningMsg").src = APP_PATH + "/common/dx20/images/main/button_mail_anime.gif";
		    }
		    */
		    return warningMsg;
		} else {
			//dojo.byId("imgWarningMsg").src = APP_PATH + "/common/dx20/images/main/button_mail.gif";
			return "noMsg";
		}
}

function closeBox() {
	document.getElementById("note_div").style.display = "none";
	clearInterval(int_value);
}

function executeWindowsCmd(command) {
    window.oldOnError   =   window.onerror;   
    window._command   =   command;   
    window.onerror   =   function   (err)   {   
    if (err.indexOf('utomation') != -1)   {   
        alert('命令'   +   window._command   +   '   已经被浏览器禁止,请调整浏览器关于ActiveX的安全级别。');     
        return true;   
    } else {
    	return false;   
    }
    };   
    var wsh = new ActiveXObject('WScript.Shell');   
    if (wsh) wsh.Run(command);   
        window.onerror   =   window.oldOnError;   
}