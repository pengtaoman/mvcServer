var test1 = {
    id: "attribute",
    title: '属性',
    init: test1init,
    test: [{
        title: "dataProvider-store",
        summary: "配置Combobox的store属性",
        fun: setStore,
        args: ['city_store']
    }, {
        title: "dataProvider-customItem",
        summary: "增加自定义项",
        fun: setCustomItem
    },{
        title: "hasDefault",
        summary: "默认显示第一条数据",
        fun: setHasDefault
    }, {
        title: "staticData",
        summary: '是否使用静态数据',
        fun: setStaticData
    }, {
        title: "separator='#'",
        summary: '多选分隔符',
        fun: setSeparator
    }, {
        title: 'dataFilter-searchAttr',
        summary: '下拉框模糊匹配指定的搜索列',
        fun: setSearchAttr
    }, {
        title: 'dataFilter-filter',
        summary: '下拉框显示过滤',
        fun: setFilter
    }, {
        title: 'dataFilter-relation',
        summary: '过滤条件的关系',
        fun: setRelation
    }, {
        title: 'dataFilter-filterMode',
        summary: '过滤的模式',
        fun: setFilterMode
    }, {
        title: 'dataFilter-spellAttr',
        fun: setSpellAttr,
        summary: '动态创建显示列的拼音列'
    }, {
        title: 'dataFilter-order',
        fun: function(){
            alert('未完成')
        },
        summary: '下拉列表排序 未完成'
    }, {
        title: 'decoder',
        fun: setDecoder,
        summary: "设置显示列列名"
    }, {
        title: 'cascade',
        fun: setCascade,
        summary: '级联'
    }, {
		title:'CascadeStore',
		fun:setCascadeStore,
		summary:'切换store级联'
		
	},{
        title: 'popup-width,height',
        fun: setPopWH,
        summary: '下拉框的大小'
    }, {
        title: 'popup-displayStyle',
        fun: setDisplayStyle,
        summary: '下拉框的显示样式'
    }, {
        title: 'popup-structure',
        fun: setStructure,
        summary: '下拉框显示的结构'
    }]
}
test = [];
test.push(test1);

function test1init(){
    var c = new unieap.form.ComboBox({});
    dojo.place(c.domNode, dojo.byId('attributeWidget'), 'first')
    
}

function test1clear(){
    dojo.forEach(dijit.findWidgets(dojo.byId('attributeWidget')), function(w){
        w.destroy && w.destroy();
    })
    dojo.empty(dojo.byId('attributeWidget'));
}

function setStore(name){
    var c = new unieap.form.ComboBox({
        dataProvider: {
            store: name
        }
    });
    test1clear();
    dojo.place(c.domNode, dojo.byId('attributeWidget'), 'first')
    var re = "1.查看数据中心的city_store与下拉框对比,数据是否一致";
    return re;
}

function setCustomItem(){
    test1clear();
    var c = new unieap.form.ComboBox({
        dataProvider: {
            store: 'city_store',
            customItem: {
                CODEVALUE: '自定义项',
                CODENAME: '自定义项'
            }
        }
    });
    dojo.place(c.domNode, dojo.byId('attributeWidget'), 'first');
    var re = "1.查看下拉框中是否有一'自定义项'<br>2.查看数据中心的city_store确认无'自定义项'<br>";
    return re;
}
function setHasDefault(){
	test1clear();
	  var c = new unieap.form.ComboBox({
        dataProvider: {
            store: 'city_store'
        },
		hasDefault:true
    });
    dojo.place(c.domNode, dojo.byId('attributeWidget'), 'first');
    var re = "1.查看下拉框中是否显示第一条数据";
    return re;
}
function setStaticData(){
    test1clear();
    var inner = "<select dojoType=\"unieap.form.ComboBox\" dataProvider=\"{staticData:true}\" ><option value=\"1\">男</option><option  value=\"0\">女</option></select>";
    dojo.byId('attributeWidget').innerHTML = inner;
    var inner2 = "普通下拉框<select><option value=\"1\">男</option><option  value=\"0\">女</option></select>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('attributeWidget'));
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "1.查看下拉框中是否与普通下拉框一致有男女两条数据";
}

function setSeparator(){
    test1clear();
    var inner = "<select dojoType=\"unieap.form.ComboBox\" id=\"separatorCombo\" separator=\"#\" popup=\"{displayStyle:'multi'}\" dataProvider=\"{store:'city_store'}\"></select>";
    dojo.byId('attributeWidget').innerHTML = inner;
    var inner2 = "<button onclick=\"alert(dijit.byId('separatorCombo').getValue())\">getValue</button>";
    dojo.create('div', {
        innerHTML: inner2
    }, dojo.byId('attributeWidget'));
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "1.选中下拉框的节点<br>2.查看显示值是否以'#'分隔<br>2.点击getValue按钮,查看弹出值是否以'#'分隔";
}

function setSearchAttr(){
    test1clear();
    var inner = "默认情况: <div dojoType=\"unieap.form.ComboBox\"   popup=\"{displayStyle:'table'}\" dataProvider=\"{store:'city_store'}\"></div>";
    inner += "代码值     : <div dataFilter=\"{searchAttr:'CODEVALUE'}\" dojoType=\"unieap.form.ComboBox\"   popup=\"{displayStyle:'table'}\" dataProvider=\"{store:'city_store'}\"></div>";
    inner += "代码标题: <div dataFilter=\"{searchAttr:'CODENAME'}\"  dojoType=\"unieap.form.ComboBox\"   popup=\"{displayStyle:'table'}\" dataProvider=\"{store:'city_store'}\"></div>";
    inner += "无               : <div dataFilter=\"{searchAttr:[]}\"  dojoType=\"unieap.form.ComboBox\"   popup=\"{displayStyle:'table'}\" dataProvider=\"{store:'city_store'}\"></div>";
    dojo.byId('attributeWidget').innerHTML = inner;
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "在下拉框中输入数据,如'1'或者'宁'<br>1.默认情况下,根据输入值匹配 '代码值'与'代码标题'两列<br>2.代码值情况下,根据输入值匹配 '代码值'列<br> " +
    "3.代码标题情况下,根据输入值匹配 '代码标题'列<br> 4.无值情况下,不会根据输入值匹配列,显示所有的列";
}

function setFilter(){
    test1clear();
    var inner = "代码值为11或者12：<div dataFilter=\"{filter:{CODEVALUE:/1[12]/}}\" dojoType=\"unieap.form.ComboBox\"   popup=\"{displayStyle:'table'}\" dataProvider=\"{store:'region_store'}\"></div>"
    inner += "代码值小于16:<div dataFilter=\"{filter:{CODEVALUE:function(v){return v<16}}}\" dojoType=\"unieap.form.ComboBox\"   popup=\"{displayStyle:'table'}\" dataProvider=\"{store:'region_store'}\"></div>"
    dojo.byId('attributeWidget').innerHTML = inner;
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "1.点击第一个下拉框是否满足过滤条件,代码值为11或者12<br>2.点击下一个下拉框是否满足过滤条件,代码值为小于16<br>"
}

function setRelation(){
    test1clear();
    var inner = "默认或关系         1.代码值为11或者12,2.代码标题为浙江：<div dataFilter=\"{filter:{CODEVALUE:/1[12]/,CODENAME:'浙江'}}\" dojoType=\"unieap.form.ComboBox\"   popup=\"{displayStyle:'table'}\" dataProvider=\"{store:'region_store'}\"></div>"
    inner += "    且关系        1.代码值为11或者12,2.代码标题为浙江：<div dataFilter=\"{relation:'&&',filter:{CODEVALUE:/1[12]/,CODENAME:'浙江'}}\" dojoType=\"unieap.form.ComboBox\"   popup=\"{displayStyle:'table'}\" dataProvider=\"{store:'region_store'}\"></div>"
    dojo.byId('attributeWidget').innerHTML = inner;
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "1.点击第一个下拉框是否满足过滤条件,显示'浙江'和'辽宁'<br>2.点击下一个下拉框是否满足过滤条件,只显示'浙江'<br>"
}

function setFilterMode(){
    test1clear();
    var inner = "默认     代码值为11或者12：<div dataFilter=\"{filter:{CODEVALUE:/1[12]/}}\" dojoType=\"unieap.form.ComboBox\"   popup=\"{displayStyle:'table'}\" dataProvider=\"{store:'region_store'}\"></div>"
    inner += "排除    代码值为11或者12：<div dataFilter=\"{filterMode:'exclude',filter:{CODEVALUE:/1[12]/}}\" dojoType=\"unieap.form.ComboBox\"   popup=\"{displayStyle:'table'}\" dataProvider=\"{store:'region_store'}\"></div>"
    dojo.byId('attributeWidget').innerHTML = inner;
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "1.默认情况显示 代码值为11或12的数据<br>2.排除模式 显示除11 12以外的数据"
}

function setSpellAttr(){
    test1clear();
    var inner = "spellAttr:'PY' <div dataFilter=\"{spellAttr:'PY'}\" popup=\"{displayStyle:'table',structure:{rows:[{title:'CODENAME',field:'CODENAME'},{width:'50%',title:'PY',field:'PY'}]}}\"  dojoType=\"unieap.form.ComboBox\"    dataProvider=\"{store:'region_store'}\"></div>"
    dojo.byId('attributeWidget').innerHTML = inner;
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "1.下拉框中增加一PY列<br>2.查看数据中心的region_store并无此列<br>3.输入地名字母,能按字母进行模糊匹配";
}

function setDecoder(){
    test1clear();
    var inner = "交换displayAttr和valueAttr <div  decoder=\"{displayAttr:'CODEVALUE',valueAttr:'CODENAME'}\"  id=\"decoderCombo\" dojoType=\"unieap.form.ComboBox\"    dataProvider=\"{store:'region_store'}\"></div>"
    dojo.byId('attributeWidget').innerHTML = inner;
    dojo.create('div', {
        innerHTML: "<button onclick=\"alert(dijit.byId('decoderCombo').getValue())\">getValue</button>"
    }, dojo.byId('attributeWidget'));
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "1.下拉框中显示值为数字<br>2.getValue返回的是地名";
}

function setCascade(){
    test1clear();
    var inner = "city:<div cascade=\"{primary:'p_combobox',filterAttr:'filter'}\" dojoType=\"unieap.form.ComboBox\" id='c_combobox' popup=\"{displayStyle:'table'}\" dataProvider=\"{'store':'city_store'}\" ></div>";
    inner += "province:<div  dojoType=\"unieap.form.ComboBox\" id='p_combobox' popup=\"{displayStyle:'table'}\" dataProvider=\"{'store':'province_store'}\" ></div>"
    dojo.byId('attributeWidget').innerHTML = inner;
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "1.选择省份 2.查看市是否发生变化<br> 3.如果省份ComboBox清空，城市ComboBox可以下拉出所有城市";
}

function setCascadeStore(){
    test1clear();
    var inner = "city:<div cascade=\"{primary:'p_combobox',filterAttr:'filter',getCascadeStore:getCascadeStore}\" dojoType=\"unieap.form.ComboBox\" id='c_combobox' popup=\"{displayStyle:'table'}\" dataProvider=\"{'store':'city_store'}\" ></div>";
    inner += "province:<div  dojoType=\"unieap.form.ComboBox\" id='p_combobox' popup=\"{displayStyle:'table'}\" dataProvider=\"{'store':'province_store'}\" ></div>"
    dojo.byId('attributeWidget').innerHTML = inner;
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "1.选择省份 2.查看市是否发生变化";
}

function getCascadeStore(value){
	if(value==11){
		return 'city_store1'
	}else if(value==12){
		return 'city_store2'
	}
}

function setPopWH(){
    test1clear();
    var inner = "<div  dojoType=\"unieap.form.ComboBox\" id='c_combobox' popup=\"{width:'400px',height:'100px'}\" dataProvider=\"{'store':'city_store'}\" ></div>";
    dojo.byId('attributeWidget').innerHTML = inner;
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "1.显示下拉框 宽400px 高100px";
}

function setPageSize(){
    test1clear();
    var inner = "pageSize:2 <div  dojoType=\"unieap.form.ComboBox\"  popup=\"{pageSize:2}\" dataProvider=\"{'store':'city_store'}\" ></div>";
    dojo.byId('attributeWidget').innerHTML = inner;
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "1.显示下拉框,只显示两条数据";
}

function setDisplayStyle(){
    test1clear();
    var inner = "默认list <div  dojoType=\"unieap.form.ComboBox\"   dataProvider=\"{'store':'city_store'}\" ></div>";
    inner += "table <div popup=\"{displayStyle:'table'}\"    dojoType=\"unieap.form.ComboBox\"   dataProvider=\"{'store':'city_store'}\" ></div>";
    inner += "multi <div popup=\"{displayStyle:'multi'}\"    dojoType=\"unieap.form.ComboBox\"   dataProvider=\"{'store':'city_store'}\" ></div>"
    dojo.byId('attributeWidget').innerHTML = inner;
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "1.默认,普通下拉框<br>2.table 有表头 默认显示两列<br> 3.multi 可以多选的combobox";
}

function setStructure(){
    test1clear();
    var inner = "structure <div  dojoType=\"unieap.form.ComboBox\"  popup=\"{structure:{rows:[{title:'<strong>地点</strong>',field:'CODENAME'},{title:'代码',field:'CODEVALUE'}]}}\" dataProvider=\"{'store':'city_store'}\" ></div>";
    dojo.byId('attributeWidget').innerHTML = inner;
    dojo.parser.parse(dojo.byId('attributeWidget'));
    return "1.显示待表头的下拉框  分别为 显示为 '代码'和  '地点'<br>2.'地点'显示为strong";
}




var test2 = {
    id: "fun",
    title: '属性',
    init: test2init,
    test: [{
        title: 'setValue',
        fun: setSetValue,
        summary: '设置值'
    }, {
        title: 'getValue',
        fun: setGetValue,
        summary: '取得值'
    }, {
        title: 'setText',
        fun: setSetText,
        summary: '设置文本值'
    }, {
        title: 'getText',
        fun: setGetText,
        summary: '取得文本值'
    }, {
        title: 'setSeparator',
        fun: setSetSeparator,
        summary: '设置多选分隔符'
    }, {
        title: 'setDataStore',
        fun: setSetDataStore,
        summary: '设置DataStore'
    }, {
        title: 'open',
        fun: setOpen,
        summary: '显示下拉框'
    }, {
        title: 'close',
        fun: setClose,
        summary: '关闭下拉框'
    }, {
        title: 'setStructure',
        fun: setSetStructure,
        summary: '设置下拉框的结构'
    },{
		title:'setFilter',
		fun:setSetFilter,
		summary:'设置过滤条件'
	},{
		title:'setRequired',
		fun:setSetRequired,
		summary:'设置必填项'
	}]
}
test.push(test2);




function test2init(){
    var c = new unieap.form.ComboBox({
        id: 'funWidgetCombo',
        popup: {
            displayStyle: 'table'
        },
        dataProvider: {
            store: 'region_store'
        }
    });
    dojo.place(c.domNode, dojo.byId('funWidget'), 'first')
}

function setSetValue(){
    dijit.byId('funWidgetCombo').setValue('11');
    var t = dijit.byId('funWidgetCombo').inputNode.value;
    return "1.查看combobox是否显示" + t + "<br>2.显示下拉框,查看( " + 11 + " : " + t + " )是否对应"
}

function setGetValue(){
    var v = dijit.byId('funWidgetCombo').getValue();
    var t = dijit.byId('funWidgetCombo').inputNode.value;
    return "1.查看combobox是否显示" + t + "<br>2.显示下拉框,查看( " + v + " : " + t + " )是否对应"
}

function setGetText(){
    var t = dijit.byId('funWidgetCombo').getText();
    return "1.查看combobox是否显示 '" + t + "'";
}

function setSetText(){
    dijit.byId('funWidgetCombo').setText('浙江');
    return "1.查看combobox是否显示'浙江'"
}

function setSetSeparator(){
    dijit.byId('funWidgetCombo').setSeparator('%');
    dijit.byId('funWidgetCombo').setValue('11%12');
    return "1.查看combobox是否显示以'%'为分隔符的两条数据";
}

function setSetDataStore(){
    var c = dijit.byId('funWidgetCombo');
    c.getDataProvider().setDataStore('city_store');
    setTimeout(function(){
        c.getDataProvider().setDataStore('region_store');
    }, 5000)
    return '1.查看combobox中下拉数据与数据中心对比 是否为city_store <br>2.  5秒后恢复为region_store'
}

function setOpen(){
    var c = dijit.byId('funWidgetCombo');
    c.getPopup().open();
    return '1.打开下拉框了吗?'
}

function setClose(){
    var c = dijit.byId('funWidgetCombo');
    c.getPopup().open();
    setTimeout(function(){
        c.getPopup().close();
    }, 5000)
    return "1.5s后自动关闭下拉框";
}

function setSetStructure(){
    var c = dijit.byId('funWidgetCombo');
    c.getPopup().setStructure({
        rows: [{
            title: '自定义name',
            field: 'CODENAME'
        }, {
            title: '自定义value',
            field: 'CODEVALUE'
        
        }]
    });
	 setTimeout(function(){
        c.getPopup().setStructure(null);
    }, 5000)
    return "1.下拉框显示 自定义name,自定义value<br>2.5s后恢复";
}


function setSetFilter(){
	 var c = dijit.byId('funWidgetCombo');
	 c.getDataFilter().setFilter(function(item){
	 	return item.CODEVALUE=='11'
	 })
	  setTimeout(function(){
        c.getDataFilter().setFilter(null);
    }, 5000)
	 return "1.只显示CODEVALUE为11的数据<br> 2.5s后恢复";
}

function setSetRequired(){
	var c = dijit.byId('funWidgetCombo');
	c.setRequired(true);
	return "1.combobox必填,<br>2.右上角出现红星";
}
