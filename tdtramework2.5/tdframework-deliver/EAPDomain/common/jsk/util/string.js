JSKit.string={
	ClassName : 'jsk.util.string',

	trim		: function(str, wh){
				if(!str.replace){ return str; }
				if(!str.length){ return str; }
				var re = (wh > 0) ? (/^\s+/) : (wh < 0) ? (/\s+$/) : (/^\s+|\s+$/g);
				return str.replace(re, "");
			},
	escapeRegExp	: function(str) {
				return str.replace(/\\/gm, "\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm, "\\$1");
			},

	replaceAll	: function(exstr,ov,value){
				var gc=this.escapeRegExp(ov);
				if (gc==null || gc==""){
					return exstr;
				}
				var reReplaceGene="/"+gc+"/gm";
				var r=null;
				var cmd="r=exstr.replace("+reReplaceGene+",\""+value+"\")";
				eval(cmd);
				return r;
			},
	startsWith : function(str, start, ignoreCase) {
				if(ignoreCase) {
					str = str.toLowerCase();
					start = start.toLowerCase();
				}
				return str.indexOf(start) == 0;
			},
	endsWith : function(str, end, ignoreCase) {
				if(ignoreCase) {
					str = str.toLowerCase();
					end = end.toLowerCase();
				}
				if((str.length - end.length) < 0){
					return false;
				}
				return str.lastIndexOf(end) == str.length - end.length;
			},
	formatDate : function(dt){
				if(dt.length==10){
					return dt;
				}
				var ft = dt.split(/-|\/|\s/)
				if(ft[1].length==1){
					ft[1]='0'+ft[1];
				}
				if(ft[2].length==1){
					ft[2]='0'+ft[2];
				}	
				return ft[0]+'-'+ft[1]+'-'+ft[2];
			}
};


(function(){

if (!JSKit.initClass(JSKit.string)) return;

JSKit.completeClass(JSKit.string);

})();