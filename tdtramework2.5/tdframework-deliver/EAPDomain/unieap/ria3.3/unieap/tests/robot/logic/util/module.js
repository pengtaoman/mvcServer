dojo.provide("unieap.tests.robot.logic.util.module");

dojo.require("unieap.util.util");

doh.register("工具类",[
	function test_startWith(){
		var string="hello world",
			prefix="hello";
		doh.t(string.startWith(prefix));
		string="你好";
		prefix="你";
		doh.t(string.startWith(prefix));
		prefix="我";
		doh.f(string.startWith(prefix));
	},
	
	//字符串左侧补齐
	function test_padLeft(){
		var str="12345",
			size=8;
		doh.is(str.padLeft(size,'0'),'00012345');
		size=5;
		doh.is(str.padLeft(size,'0'),'12345');
		size=4;
		doh.is(str.padLeft(size,'0'),'12345');
	},
	
	//字符串右侧补齐
	function test_padRight(){
		var str="12345",
			size=8;
		doh.is(str.padRight(size,'0'),'12345000');
		size=5;
		doh.is(str.padRight(size,'0'),'12345');
		size=4;
		doh.is(str.padRight(size,'0'),'12345');
	}
]);
