dojo.require("doh.robot");
function init(){
    var city_ds = new unieap.ds.DataStore("city_ds", [{
        code: "024",
        city: "沈阳"
    }, {
        code: "0411",
        city: "大连"
    }, {
        code: "0412",
        city: "鞍山"
    }, {
        code: "0413",
        city: "抚顺"
    }, {
        code: "0414",
        city: "本溪"
    }, {
        code: "0415",
        city: "丹东"
    }, {
        code: "0416",
        city: "锦州"
    }, {
        code: "0417",
        city: "营口"
    }, {
        code: "0418",
        city: "阜新"
    }, {
        code: "0427",
        city: "盘锦"
    }, {
        code: "0410",
        city: "铁岭"
    }, {
        code: "0421",
        city: "朝阳"
    }, {
        code: "0429",
        city: "葫芦岛"
    }]);
	
	var county_ds=new unieap.ds.DataStore("county_ds",[
		{CODEVALUE:'1',CODENAME:"太原街",FILTER:"024"},
		{CODEVALUE:'11',CODENAME:"西塔",FILTER:"024"},
		{CODEVALUE:'2',CODENAME:"中山区",FILTER:"0411"},
		{CODEVALUE:'3',CODENAME:"鞍山市",FILTER:"0412"},
		{CODEVALUE:'4',CODENAME:"抚顺市",FILTER:"0413"}
	
	]);
    dataCenter.addDataStore(city_ds);
	dataCenter.addDataStore(county_ds);
    
}

init();




function test_attr(){
	
	doh.register("属性测试",[
	
		//默认选中第一条记录
		function test_hasDefault(){
			var combo=unieap.byId("combo");
			doh.is("024",combo.getValue());
			doh.is("沈阳",combo.getText());
		},

		//测试decoder
		function test_decoder(){
			var combo=unieap.byId("combo"),
				decoder=combo.getDecoder(),
				item={code:'0429',city:'葫芦岛'};
			doh.is(item.code,decoder.code(item));
			doh.is(item.city,decoder.decode(item));
		},
		
		//级联测试
		function test_cascade(){
			var combo=unieap.byId("combo"),
				cascadecombo=unieap.byId('cascadecombo');
			combo.setValue("0411");
			doh.is(2,cascadecombo.getValue());
			doh.is("中山区",cascadecombo.getText());
		}
	
	]);
	
}




function test_method(){

	doh.register("方法测试",[
		//测试setValue
		function test_setValue(){
			var combo=unieap.byId("combo"),
				multicombo=unieap.byId("multicombo");
			combo.setValue('0411');
			doh.is('0411',combo.getValue());
			doh.is('大连',combo.getText());
			multicombo.setValue('0411,024');
			doh.is('0411,024',multicombo.getValue());
			doh.is('大连,沈阳',multicombo.getText());
			
		},
		
		//测试setSelectesItems
		function test_setSelectedItems(){
			var multicombo=unieap.byId("multicombo"),
				items=multicombo.getDataProvider().getItems();
			multicombo.setSelectedItems([items[1],items[0],items[2]]);
			doh.is("0411,024,0412",multicombo.getValue());
			doh.is("大连,沈阳,鞍山",multicombo.getText());
		},
		
		//测试test_setSelectedIndex
		function test_setSelectedIndex(){
			var multicombo=unieap.byId("multicombo");
			multicombo.setSelectedIndex([2,3]);
			doh.is("0412,0413",multicombo.getValue());
			doh.is("鞍山,抚顺",multicombo.getText());
		},
		
		//测试分隔符
		function test_setSeparator(){
			var multicombo=unieap.byId("multicombo");
			multicombo.setSeparator("#");
			multicombo.setValue("0412#0413");
			doh.is("0412#0413",multicombo.getValue());
			doh.is("鞍山#抚顺",multicombo.getText());
			multicombo.setSeparator(",");
			multicombo.setValue("0412,0413");
			doh.is("0412,0413",multicombo.getValue());
			doh.is("鞍山,抚顺",multicombo.getText());
			
		},
		
		{
			name:"test_opencombobox",
			timeout:7000,
			runTest:function(){
				var d=new doh.Deferred();
				dojo.query("input",dojo.byId('combo'))[0].focus();
				doh.robot.mouseMove(400,400,100,100,true);
				doh.robot.keyPress(dojo.keys.DELETE, 100);
				doh.robot.typeKeys('04',100,500);
				doh.robot.keyPress(dojo.keys.DOWN_ARROW,200);
				doh.robot.keyPress(dojo.keys.DOWN_ARROW,200);
				doh.robot.keyPress(dojo.keys.ENTER,100);
				doh.robot.mouseClick({left:true},100);
				doh.robot.sequence(function(){
					var combo=unieap.byId('combo'),
						cascadecombo=unieap.byId('cascadecombo');
					if(combo.getValue()=='0412' && combo.getText() == '鞍山' && 
								cascadecombo.getValue() == '3' && cascadecombo.getText() == '鞍山市' ){
						d.callback(true);
					}else{
						d.callback(false);
					}
					
				},900);
				return d;
			}
			
		}
		
		
	]);
	
}


dojo.addOnLoad(function(){
	test_attr();
	test_method();
	doh.run();
	
});


