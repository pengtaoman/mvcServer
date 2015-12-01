<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<html>
<head>
<script language="JAVASCRIPT"> 
<!--
function detectVersion(){
		version = parseInt(navigator.appVersion);
		return version;
}

function detectOS(){
		if(navigator.userAgent.indexOf('Win') == -1) {
		OS = 'Macintosh';
	} else {
	OS = 'Windows';
	}
	//alert(OS);
	return OS;
}

function detectBrowser(){
		//alert(navigator.appVersion);
		var v=navigator.appVersion.substring(navigator.appVersion.indexOf("MSIE ")+5,navigator.appVersion.indexOf("MSIE ")+8);
		//var temp = navigator.appVersion.indexOf("MSIE ");
		//var v=navigator.appVersion.substring(temp+"MSIE ".length,navigator.appVersion.indexOf(";",temp));
		alert(v);
		if(navigator.appName.indexOf('Netscape') == -1) {
			browser = 'IE';
		} else {
			browser = 'Netscape';
		}
		return browser;
}

function FullScreen(){
		var adjWidth;
		var adjHeight;
		if((detectOS() == 'Macintosh') && (detectBrowser() == 'Netscape')) {
				adjWidth = 20;
				adjHeight = 35;
		}
		if((detectOS() == 'Macintosh') && (detectBrowser() == 'IE')) {
				adjWidth = 20;
				adjHeight = 35;
				winOptions = 'fullscreen=yes';
		}
		if((detectOS() == 'Windows') && (detectBrowser() == 'Netscape')) {
				adjWidth = 30;
				adjHeight = 30;
		}
		if(detectVersion() < 4) {
				self.location.href = 'oldbrowser.html';
		} else {
				var winWidth = screen.availWidth - adjWidth;
				var winHeight = screen.availHeight - adjHeight;
				var winSize = 'width=' + winWidth + ',height=' + winHeight;
				var thewindow = window.open('index.jsp', 'WindowName', winSize);
				thewindow.moveTo(0,0);
		}
}

function MakeFullScreen(){
	if((detectOS() == 'Windows') && (detectBrowser() == 'IE')) {
			var winWidth = screen.availWidth-10;
			var winHeight = screen.availHeight-55;
			var winSize = 'width=' + winWidth + ',height=' + winHeight;
			window.open('<%= EAPConfigHelper.getContextPath(request)%>/login.do?method=begin','',winSize+','+'fullscreen=no,resizable=yes,status=yes,toolbar=no,scrollbars=no,menubar=no,location=no'+','+'left=0,screenX=0,top=0,screenY=0');
			window.opener=null;
			window.close();
	} else {
		//onload=FullScreen();
	}
}
// -->

</script>
</head>
<body  onload="MakeFullScreen()">
</body>
</html>