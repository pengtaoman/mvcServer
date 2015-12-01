/**
 *  按照样式对数据进行格式的转换
 *  “,” (半角的豆号) 如果有的话，看豆号到小数点（如果有的话）前有几位，则按几位划分整数部分
 *  “0”（数字零） 如果该位上没有数字，就补0
 *  “#”（井号） 如果该位上有数字就输出数字，没有则不输出
 *
 *  米澄宇 micy@neusoft.com,2003.12.22
*/
	function formatNumber(num,pattern){       
		var str			= num.toString();
        if(str.indexOf("-")==0) str = str.substr(1);
        var number = str;       
		var strInt;
		var strFloat;
		var formatInt;
		var formatFloat;  
		if(/\./g.test(pattern)){
			formatInt		= pattern.split('.')[0];
			formatFloat		= pattern.split('.')[1];
		}else{
			formatInt		= pattern;
			formatFloat		= null;
		}

		if(/\./g.test(str)){
			if(formatFloat!=null){
				var tempFloat	= Math.round(parseFloat('0.'+str.split('.')[1])*Math.pow(10,formatFloat.length))/Math.pow(10,formatFloat.length);
				strInt		= (Math.floor(number)+Math.floor(tempFloat)).toString();				
				strFloat	= /\./g.test(tempFloat.toString())?tempFloat.toString().split('.')[1]:'0';			
			}else{
				strInt		= Math.round(number).toString();
				strFloat	= '0';
			}
		}else{
			strInt		= str;
			strFloat	= '0';
		}
		if(formatInt!=null){
			var outputInt	= '';
			var zero		= formatInt.match(/0*$/)[0].length;
			var comma	
				= null;
			if(/,/g.test(formatInt)){
				comma		= formatInt.match(/,[^,]*/)[0].length-1;
			}
			var newReg		= new RegExp('(\\d{'+comma+'})','g');

			if(strInt.length<zero){
				outputInt		= new Array(zero+1).join('0')+strInt;
				outputInt		= outputInt.substr(outputInt.length-zero,zero)
			}
			else{
				outputInt		= strInt;
			}

			var 
			outputInt			= outputInt.substr(0,outputInt.length%comma)+outputInt.substring(outputInt.length%comma).replace(newReg,(comma!=null?',':'')+'$1')
			outputInt			= outputInt.replace(/^,/,'');

			strInt	= outputInt;
		}

		if(formatFloat!=null){
			var outputFloat	= '';
			var zero		= formatFloat.match(/^0*/)[0].length;

			if(strFloat.length<zero){
				outputFloat		= strFloat+new Array(zero+1).join('0');
				var outputFloat1	= outputFloat.substring(0,zero);
				var outputFloat2	= outputFloat.substring(zero,formatFloat.length);
				outputFloat		= outputFloat1+outputFloat2.replace(/0*$/,'');
			}else{
				outputFloat		= strFloat.substring(0,formatFloat.length);
			}

			strFloat	= outputFloat;
		}else{
			if(pattern!='' || (pattern=='' && strFloat=='0'))
			{
				strFloat	= '';
			}
		}
        var temp = strInt+(strFloat==''?'':'.'+strFloat);      
		return num.toString().indexOf("-")==0?("-"+temp):temp;
	}