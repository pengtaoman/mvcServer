if (!dojo._hasResource["unieap.patch.number"]) {
	dojo._hasResource["unieap.patch.number"] = true;
	dojo.provide("unieap.patch.number");
	
	dojo.require("dojo.number");
	dojo.number._applyPattern = function(/*Number*/value, /*String*/pattern, /*dojo.number.__FormatOptions?*/options){
		// summary:
		//		Apply pattern to format value as a string using options. Gives no
		//		consideration to local customs.
		// value:
		//		the number to be formatted.
		// pattern:
		//		a pattern string as described by
		//		[unicode.org TR35](http://www.unicode.org/reports/tr35/#Number_Format_Patterns)
		// options: dojo.number.__FormatOptions?
		//		_applyPattern is usually called via `dojo.number.format()` which
		//		populates an extra property in the options parameter, "customs".
		//		The customs object specifies group and decimal parameters if set.
	
		//TODO: support escapes
		options = options || {};
		var group = options.customs.group;
		var decimal = options.customs.decimal;
	
		var patternList = pattern.split(';');
		var positivePattern = patternList[0];
		pattern = patternList[(value < 0) ? 1 : 0] || ("-" + positivePattern);
	
		//TODO: only test against unescaped
		if(pattern.indexOf('%') != -1){
//			value *= 100;
			value = value.toString().movePoint(2);
		}else if(pattern.indexOf('\u2030') != -1){
//			value *= 1000; // per mille
			value = value.toString().movePoint(3);
		}else if(pattern.indexOf('\u00a4') != -1){
			group = options.customs.currencyGroup || group;//mixins instead?
			decimal = options.customs.currencyDecimal || decimal;// Should these be mixins instead?
			pattern = pattern.replace(/\u00a4{1,3}/, function(match){
				var prop = ["symbol", "currency", "displayName"][match.length-1];
				return options[prop] || options.currency || "";
			});
		}else if(pattern.indexOf('E') != -1){
			throw new Error("exponential notation not supported");
		}
		
		//TODO: support @ sig figs?
		var numberPatternRE = dojo.number._numberPatternRE;
		var numberPattern = positivePattern.match(numberPatternRE);
		if(!numberPattern){
			throw new Error("unable to find a number expression in pattern: "+pattern);
		}
		if(options.fractional === false){ options.places = 0; }
		return pattern.replace(numberPatternRE,
			dojo.number._formatAbsolute(value, numberPattern[0], {decimal: decimal, group: group, places: options.places, round: options.round}));
	}
}
