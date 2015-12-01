/* weizj@neusoft.com */
/*java -jar cmain.jar -c jsk.js > jskb.js 2>&1*/

window.undefined = window.undefined;
function $_IEGC(){
	CollectGarbage();
}

if (navigator.appVersion.match(/MSIE/)) {
  window.attachEvent('onunload', $_IEGC);
   //window.attachEvent('onload', $_IEGC);
}


function $import(jspath,sid,doc){
	try {
		if (doc.readyState=='complete'){
			throw "document has completed";
		}
		if(!sid){ 
			sid=""; 
		}else{
			sid='id="'+sid+'"';
		}
		doc.writeln("<scr"+"ipt type='text/javascript' src='"+jspath+"' "+sid+" ></scr"+"ipt>");
	} catch (e) {
		var script = doc.createElement("script");
		script.setAttribute("type","text/javascript");
		if(sid){ script.id=sid; }
		script.src = jspath;
		doc.getElementsByTagName("head")[0].appendChild(script);
	}

}


function $waitLoading(func,cond,dtime){
	if (!dtime){
		dtime=20;
	}
	if (cond){
		
		return window.setTimeout(func, dtime);
	}
	return null;
}

function $() {
  var results = [];
  var element;
  for (var i = 0; i < arguments.length; i++) {
    element = arguments[i];
    if (typeof(element) == 'string'){
		var temp=document.getElementById(element);
		element = temp?temp:document.getElementsByName(element)[0];
	}
    results.push(element);
  }
  return results.length < 2 ? results[0] : results;
}

function $byId(element,doc){
	if (typeof(element) != 'string') {return element;}
	if(!doc){ doc = document; }
	var result=doc.getElementById(element);
	return result;
}

function $byName(element,doc){
	if (typeof(element) != 'string') {return element;}
	if(!doc){ doc = document; }
	var results=doc.getElementsByName(element);
	if (!results || results.length<1){
		results=[];
		results[0]=$byId(element);
	}
	return results;
}


window.APP_PATH=(function(){
	var contextPath;
	var contextPathTagName='contextPath'.toLowerCase();
	var cp=document.getElementsByTagName(contextPathTagName)[0];
	if (cp!=null && cp!=undefined){
		contextPath=cp.value;
	}else{
		cp=$_HOST().document.getElementsByTagName(contextPathTagName)[0];	
		if (cp!=null && cp!=undefined){
			contextPath=cp.value;
		}else{
			contextPath=null;
		}
	}
	return contextPath; 
	
})();


function $_HOST(){
	var env=window.top;
	while (env.opener){
		env=env.opener.top;
	}
	env=env.top;
	if (env==null||env==undefined){
		env=window;
	}
	return env;
}


/* ==================================== */


var JSKit = (function(){
	var jsKB = {};

	jsKB.ID='JSK:'+window.location.href;
	jsKB.host = window;
	jsKB.contextPath=(function(){
		var url=window.location.pathname;
		jsKB.baseobj=String;
		var s=url.indexOf('/',0);
		var e=url.indexOf('/',s+1);
		if (e==-1){
			url='/';
		}else{
			url=url.substring(s,e);
		}
		return url;
	})();

	jsKB.JSK_ROOT=(function(){
		var mpath=$byId("JSKitBag").src
		mpath=mpath.substring(0,mpath.length-"jsk.js".length);
		if (mpath.length<2){
			mpath=".";
		}else if (mpath.lastIndexOf('/')==mpath.length-1){
			mpath=mpath.substr(0,mpath.length-1);
		}
		return mpath;
	})();

	var check=function(){with(jsKB){
		var OO='.',O='';
		OO=OO.charCodeAt(0);
		var O0=[63,65,53,0,70,56,65,69,71,55,64,18,60,76,59,55,73];
			for (var o=0;o<O0.length ;o++ ){	O0[o]-=0-OO;}
		O0=O0.reverse();
		for (var o=0;o<O0.length ;o++ ){ O+=jsKB.baseobj.fromCharCode(O0[o]); };
		baseobj=O;}
	}();

	var b = navigator.userAgent.toLowerCase();
	jsKB.isIE = /msie/.test(b) && !/opera/.test(b);
	jsKB.isMozilla =  /mozilla/.test(b) && !/compatible/.test(b) ;

	jsKB.loadedClass={};


	return jsKB;
})();


JSKit.Me=JSKit;

JSKit.GC=function(){
	if (JSKit.isIE){
		CollectGarbage();
	}
};



JSKit.include = function(classinfos){
		var temp_win=window;

		classinfos=classinfos.toLowerCase();
		classinfos=classinfos.split(',');
		for (var i=0;i< classinfos.length;i++ ){
			var classinfo=classinfos[i].replace(/^\s+|\s+$/,'');
			if (temp_win.JSKit.loadedClass[classinfo]){ 
				return;
			}
			temp_win.JSKit.loadedClass[classinfo]=1;

			var mword=this.baseobj;
			var classpath=classinfo.replace(/\./g,'/') + '.js';

			if (classpath.indexOf(mword.charAt(4)+mword.charAt(9)+'k/')==0){
				classpath=classpath.substring(3);
				classpath=temp_win.JSKit.JSK_ROOT+classpath;
				classpath=classpath.replace(/\*.js$/,'_package_.js');
			}else{ 
				if (classpath.indexOf('_this/')!=-1){
				classpath=classpath.replace(/_this\//g,'./');
				}
				if (classpath.indexOf('_parent/')!=-1){
					classpath=classpath.replace(/_parent\//g,'../') ;
				}
				if (classpath.indexOf('_top/')!=-1){
					classpath=classpath.replace(/_top\//g, JSKit.contextPath+'/');
				}
			}
			$import(classpath,classinfo,temp_win.document);
		}
	};



JSKit.readyState = function(classinfo){
	if (!JSKit.loadedClass[classinfo] || JSKit.loadedClass[classinfo]<1){
		return 0;
	}
	return JSKit.loadedClass[classinfo];
};

JSKit.loadDepend = function(classObj){
	if (!classObj.Depend){
		return ;
	}
	classObj.Depend=[].concat(classObj.Depend);
	for (var i=0;i<classObj.Depend.length ;i++ ){
		if (JSKit.readyState(classObj.Depend[i])<1){
			JSKit.include(classObj.Depend[i]);
		}
	}
};

JSKit.isComplatedAll = function(classObj){
	if (!classObj.Depend){
		return true;
	}
	for (var i=0;i<classObj.Depend.length ;i++ ){
		if (JSKit.readyState(classObj.Depend[i])!=2){
			return false;
		}
	}
	return true;
};

JSKit.initClass = function(classObj){
	JSKit.loadDepend(classObj);
	var func= JSKit.initClass.caller;
	var timeid=$waitLoading(func,!JSKit.isComplatedAll(classObj));
	if (timeid==null){
		classObj.dependLoaded = true;
		return true;
	}
	return false;
};

JSKit.checkComplete = function(className,func){
	if (!func){
		func= JSKit.checkComplete.caller;
	}
	var timeid=$waitLoading(func,JSKit.loadedClass[className]!=2);
	if (timeid==null){
		return true;
	}
	return false;

};

JSKit.completeClass = function(classObj){
	JSKit.loadedClass[classObj.ClassName]=2;
	//alert(classObj.ClassName+' is loading-complete.');

};
