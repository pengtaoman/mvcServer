dojo.provide('unieap.grid._grid.cell');

dojo.declare("unieap.grid.Cell", null, {
	/**
	 * @declaredClass:
	 * 		unieap.grid.Cell
	 * @summary:
	 * 		单元格定义对象
	 * @description:
	 * 		可认为是表格单元格的模型，记录单元格定义和一些数据处理/显示的方法。
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" id="grid" binding="{store:'empDataStore'}">
	 * |	<header>
	 * |		<cell name="attr_empno" label="编号" width="200"></cell>
	 * |		<cell name="attr_deptno" label="部门" width="300" decoder="{store:"deptStore"}></cell>
	 * |	</header>
	 * |</div>
	 * @example:
	 * |var layoutMan=unieap.byId("grid").getManager("LayoutManager");
	 * |var empnoCell=layoutMan.getCell("attr_empno");
	 * |//也可以简单得写成: var empnoCell=unieap.byId("grid").getCell("attr_empno");
	 * |var empnoName=empnoCell.name; //获得列绑定名为"attr_empno"
	 * |var empnoLabel=empnoCell.label; //获得列标题名为"编号"
	 * |
	 */
	
	
	width: 200,
	
	/*
	 * @summary:
	 * 		排序方式，1：升序，-1：降序
	 * @type:
	 * 		{1|-1}
	 * @default:
	 * 		1
	 */
	asc: 1,
	
	
	//编辑属性
	_cellProps: {
		/**
		* @summary:
		*	指定列是或否可调整宽度
		* @type:
		* 	{boolean}
		* @default:
		*	false
		* @example:
		* | <cell label="姓名" name="attr_name" width="200" noresize="true"></cell>
		*/
		noresize: "boolean",
		
		/**
		 * @summary:
		 * 		列绑定名
		 * @description:
		 * 		用于指定单元格绑定datastore中的哪个字段
		 * 		注意:如果多列绑定了同一字段，请给这些列分别设置唯一的id值
		 * @type:
		 * 		{string}
		 * @default:
		 * 		""
		 * @example:
		 * |var ds=new unieap.ds.DataStore("demo",[
		 * |	{attr_name:'基础软件',attr_address:'黄浦路901号'}
		 * |]);
		 * |dataCenter.addDataStore(ds);
		 * |<div dojoType="unieap.grid.Grid" binding="{store:'demo'}">
		 * |	<header>
		 * |		<cell label="姓名" name="attr_name"></cell>
		 * |		<cell label="姓名" name="attr_address"></cell>
		 * |	</header>
		 * |</div>
		 */
		name: 'string',
		 
		 
		/**
		 * @summary:
		 * 		列跨越,类似于HTML中table的colspan属性
		 * @description:
		 * 		一般用于多标题和复杂表头
		 * @type:
		 * 		{number}
		 * @default:
		 * 		1
		 * @example:
		 * |<div dojoType="unieap.grid.Grid" binding="{store:'empDataStore'}">
		 * |	<header>
		 * |		<row>
		 * |			<cell colSpan="2" label="标题一" isMulTitle="true"></cell>
		 * |		</row>
		 * |		<row>
		 * |			<cell label="工资" name="attr_sal"></cell>
		 * |			<cell label="职位" name="attr_job"></cell>
		 * |		</row>
		 * |	</header>
		 * |</div>
		 * @img:
		 * 		images/grid/grid-cell-colSpan.jpg
		 */
		colSpan: "number",
		  
		/**
		 * @summary:
		 * 		行跨越,类似于HTML中table的rowspan属性
		 * @type:
		 * 		{number}
		 * @description:
		 * 		一般用于多标题和复杂表头
		 * @default:
		 * 		1
		 * @example:
		 * |<div dojoType="unieap.grid.Grid" binding="{store:'empDataStore'}">
		 * |	<header>
		 * |		<row>
		 * |			<cell rowSpan="2" label="编号"></cell>
		 * |			<cell colSpan="2" label="标题一" isMulTitle="true"></cell>
		 * |		</row>
		 * |		<row>
		 * |			<cell label="工资" name="attr_sal"></cell>
		 * |			<cell label="职位" name="attr_job"></cell>
		 * |		</row>
		 * |	</header>
		 * |</div>
		 * @img:
		 * 		images/grid/grid-cell-rowSpan.jpg
		 */
		rowSpan: "number",
		
		
		/**
		 * @summary:
		 * 		标识列,表示该列是唯一的
		 * @type:
		 * 		{string}
		 * @default:
		 * 		""
		 * @example:
		 * |<div dojoType="unieap.grid.Grid" id="grid" binding="{store:'empDataStore'}">
		 * |	<header>
		 * |		<cell id="salary" name="attr_sal" label="工资"></cell>
		 * |		<cell id="job" name="attr_job" label="职位"></cell>
		 * |	</header>
		 * |</div>
		 * |<script type="text/javascript">
		 * |	var layoutMan=unieap.byId("grid").getManager("LayoutManager");
		 * |	layoutMan.hideCell(["salary"]); //隐藏工资列
		 * |</script>
		 */
		id:'string',
		
		
		/**
		 * @summary:
		 * 		列数据类型
		 * @type:
		 * 		{string}
		 * @enum:
		 * 		{"number"|"string"|"date"}
		 * @default:
		 * 		"string"
		 * @example:
		 * |//设置此列排序方式为客户端排序，并且按数字类型排序。
		 * |<cell label="工资" name="attr_salary" width="150px"  dataType="number"></cell>
		 */
		dataType: "string",
		
		/**
		 * @summary:
		 * 		设置列是否能排序
		 * @type:
		 * 		{boolean}
		 * @default:
		 * 		true
		 * @example:
		 * |//工资列不可排序 
		 * |<cell label="工资" name="attr_salary" width="20%" canSort="false"></cell>
		 */
		canSort: "boolean",
		
		/**
		 * @summary:
		 * 		列格式化方法
		 * @type:
		 * 		{function}
		 * @default:
		 * 		null
		 * @example:
		 * |//formatter指定的方法拥有两个参数，单元格数据值和行号。
		 * |<cell label="操作"  width="40px" formatter="fn"></cell>
		 * |function fn(inValue,inRowIndex){
		 * |	if ((inRowIndex-1)%2==0){
		 * |		inValue = "<label style='color:red'>" + inValue + "</label>";
		 * |	}
		 * |	return inValue;
		 * |} 
		 * @img:
		 * 		images/grid/grid-cell-formatter.jpg
		 */
		formatter: "object",
		
		/**
		 * @summary:
		 * 		列取值方法
		 * @type:
		 * 		{function}
		 * @default:
		 * 		null
		 * @example:
		 * |//设置cell标签的get属性,get属性指定生成列值方法，参数为行号。
		 * |<cell name="操作" width="40px" get="fn"></cell>
		 * |function fn(inRowIndex){
		 * |	return "第"+ (inRowIndex+1) + "行"; 
		 * |}
		 * @img:
		 * 		images/grid/grid-cell-get.jpg
		 */
		get: "object",
		
		/**
		 * @summary:
		 * 		列头样式
		 * @type:
		 * 		{string}
		 * @default:
		 * 		""
		 * @example:
		 *|<div id="grid" id="grid" dojoType="unieap.grid.Grid" width="80%" height="180px" binding="{store:'empDataStore'}" views="{rowNumber:true}">
    	 *|	<header>
         *|		<cell name="attr_empno" label="员工编号(红色字体)" width="10%"  headerStyles="color:red;"></cell>
       	 *|		<cell name="NAME" label="姓名(居左)" width="20%" headerStyles="text-align:left;"></cell>
         *|		<cell name="NAME" label="姓名(居中)" width="20%" headerStyles="text-align:center;"></cell>
         *|		<cell name="NAME" label="姓名(居右)" width="20%" headerStyles="text-align:right;"></cell>
         *|		<cell name="attr_job" label="职位" width="20%"></cell>
         *|		<cell name="attr_sal" label="工资(正常列)" width="10%"></cell>
    	 *|	</header>
		 *|</div>
		 * @img:
		 * 		images/grid/headerstyle.png
		 */
		headerStyles: "string",
		
		/**
		 * @summary:
		 * 		列样式
		 * @type:
		 * 		{string}
		 * @default:
		 * 		""
		 * @example:
		 *|<div id="grid" id="grid" dojoType="unieap.grid.Grid" width="80%" height="180px" binding="{store:'empDataStore'}" views="{rowNumber:true}">
    	 *|		<header>
         *|			<cell name="attr_empno" label="员工编号" width="10%" 1styles="color:red;" ></cell>
         *|			<cell name="NAME" label="姓名" width="20%" styles="text-align:left;" ></cell>
         *|   		<cell name="NAME" label="姓名" width="20%" styles="text-align:center;" ></cell>
         *|			<cell name="NAME" label="姓名" width="20%" styles="text-align:right;" ></cell>
         *|			<cell name="attr_job" label="职位(黄色背景)" width="20%" styles="background-color:yellow;"></cell>
         *|			<cell name="attr_sal" label="工资(正常列)" width="10%"></cell>
    	 *|		</header>
		 *|</div>
		 * @img:
		 * 		images/grid/styles.png
		 */
		styles: "string",
		
		
		/**
		 * @summary:
		 * 		是否为多标题列
		 * @description:
		 * 		设置isMulTitle="true"的列不可绑定字段
		 * @default:
		 * 		false
		 * @type:
		 * 		{boolean}
		 * @example:
		 *|<row>
         *|   <cell rowSpan="2" name="attr_empno" width="20%" label="编号"></cell>
         *|   <cell label="标题一" isMulTitle="true" width="40%" colSpan="2"></cell>
         *|</row>
         *|<row>
         *|   <cell name="attr_sal" label="工资" width="20%"></cell>
         *|   <cell name="attr_job" label="职位" width="20%"></cell>
	     *|</row>
	     * 设置多标题
	     * @img:
	 	 *	images/grid/views/multitle.png
		 */
		isMulTitle: "boolean",
		
		/**
		 * @summary:
		 * 		列标题名
		 * @type:
		 * 		{string}
		 * @default:
		 * 		""
		 * @example:
		 * |<cell label="测试" name="attr_job"></cell>
		 */
		label: "string",
		
		/**
		 * @summary:
		 * 		权限id,用于页面权限
		 * @type:
		 * 		{string}
		 * @default:
		 * 		""
		 * @example:
		 * |<cell label="测试" name="attr_job" securityId="attr_job"></cell>
		 */
		securityId: "string",
		
		/**
		 * @summary:
		 * 		设置单元格的宽度
		 * @description:
		 * 		单元格的宽度也可以设置成百分比
		 * 		注意:锁定列单元格宽度不支持百分比，如果设置了百分比，它们的宽度会变为"200px"
		 * @type:
		 * 		{number|string}
		 * @default:
		 * 		200
		 * @example:
		 * |<div dojoType="unieap.grid.Grid" width="800" binding="{store:'empDs'}">
		 * |	<header>
		 * |		<cell name="attr_empno" label="编号" width="200" ></cell>
		 * |		<cell name="attr_sal" label="工资" ${1}width="20%"></cell>
		 * |		<cell name="attr_deptno" label="部门" width="80%"></cell>
		 * |	</header>
		 * |</div>
		 * 		${1}由于"工资"列和"部门"列的宽度为百分比,它们的实际宽度为:
		 * 			工资列宽:(20%/(20%+80%))*(800-200)=120
		 * 			部门列宽:(80%/(20%+80%))*(800-200)=480
		 */
		width: "string",
		
		/**
		 * @summary:
		 * 		定义值转义的依据
		 * @type:
		 * 		{object}
		 * @default:
		 * 		null
		 * @example:
		 * |//设置转义
		 * |<cell label="姓名" name="attr_name" decoder="{store:'ds',valueAttr:'value',displayAttr:'display'}"></cell>
		 */
		decoder: "object",
		
		/**
		 * @summary:
		 * 		处理级联值转义
		 * @type:
		 * 		{object}
		 * @default:
		 * 		null
		 * @example:
		 * |<script type="text/javascript">
		 * |	var ds1=new unieap.ds.DataStore('ds1',[
		 * |		{province:1,city:11},
		 * |		{province:2,city:12}
		 * |	]);
		 * |	dataCenter.addDataStore(ds1);
		 * |	var provinceDs=new unieap.ds.DataStore("province",[
		 * |		{CODEVALUE:1,CODENAME:'湖北'},
		 * |		{CODEVALUE:2,CODENAME:'辽宁'}
		 * |	]);
		 * |	dataCenter.addDataStore(provinceDs);
		 * |	var city1=new unieap.ds.DataStore("city1",[
		 * |		{CODEVALUE:11,CODENAME:'仙桃'},
		 * |		{CODEVALUE:12,CODENAME:'荆州'}
		 * |	])
		 * |	dataCenter.addDataStore(city1);
		 * |	var city2=new unieap.ds.DataStore('city2',[
		 * |		{CODEVALUE:11,CODENAME:'大连'},
		 * |		{CODEVALUE:12,CODENAME:'锦州'}
		 * |	]);
		 * |	dataCenter.addDataStore(city2);
		 * |	function fn(value){
		 * |		if(value=="1"){
		 * |			return "city1";
		 * |		}else if(value=="2"){
		 * |			return "city2";
		 * |		}
		 * |}
		 * |</script>
		 * |<div dojoType="unieap.grid.Grid" binding="{store:'ds1'}" edit="{editType:'rowEdit'}" >
		 * |	<header>
		 * |		<cell label="省份" name="province" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'province',dataProvider:{store:'province'}}}"></cell>
		 * |		<cell label="城市" name="city" decoder="{}" cascade="{primary:'province',getCascadeStore:fn}" ></cell>
		 * |	</header>
		 * |</div>
		 */
		cascade: "object",
		
		/**
		 * @summary:
		 * 		值格式化属性
		 * @type:
		 * 		{object}
		 * @default:
		 * 		null
		 * @example:
		 * |假设单元格绑定的值为2009/01/01,要显示成2009年01月01日,需要先设置valueFormatter属性
		 * |<cell label="日期" name="attr_hiredate" valueFormatter="{declaredClass:'unieap.form.DateValueFormatter',dataFormat:'yyyy/MM/dd'}"></cell>
		 */
		valueFormatter: "object",
		
		/**
		 * @summary:
		 * 		显示格式化方法
		 * @description:
		 * 		如果用户自定义一个格式化类,格式化类的format方法会接受到两个参数,一个是要格式化的值,另外一个是当前单元格所在的索引号(rowIndex)
		 * @type:
		 * 		{object}
		 * @default:
		 * 		null
		 * @example:
		 *|<div id="grid" id="grid" dojoType="unieap.grid.Grid" width="80%" height="200px" binding="{store:'empDataStore'}" views="{rowNumber:true,orderType:'client'}">
    	 *|		<header>
         *|			<cell width="150px" label="部门(真实值)" name="attr_deptno" headerStyles="color:red;" width="15%"></cell>
         *|			<cell width="150px" label="部门(转义值)" name="attr_deptno" headerStyles="color:red;" width="15%" 
         *|     			decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
         *|			<cell width="150px" label="入职日期(未格式化的列)" name="attr_hiredate" headerStyles="color:green;" width="20%"></cell>
         *|			<cell width="150px" label="入职日期(已格式化的列)" name="attr_hiredate" headerStyles="color:green;" width="20%"
         *|				     displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell> //日期格式化
         *|			<cell width="150px" label="工资(未格式化的列)" name="attr_sal" headerStyles="color:red;" width="15%"></cell>
         *|			<cell width="150px" label="工资(已格式化的列)" name="attr_sal" headerStyles="color:red;" width="15%" 
         *|				     displayFormatter="{declaredClass:'unieap.form.NumberDisplayFormatter',dataFormat:'###,###'}"></cell>  //数字格式化
    	 *|		</header>
         *|</div>
         * @img:
         * 		images/grid/displayformatter.png	
		 */
		displayFormatter: "object",
		
		/**
		 * @summary:
		 * 		编辑器配置
		 * @description:
		 * 		editor中必须配置editorClass，用来指定编辑器类型；
		 * 		可选的配置为editorProps，相当于一般在普通editor标签上配置的各个属性，事件及方法等。
		 * 		editorClass和editorProps之外，editor不可以配置其他属性。
		 * @type:
		 * 		{object}
		 * @default:
		 * 		null
		 * @example:
		 * |<cell name="attr_job" width="150px" label="职位" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
		 * @example:
		 * |<cell name="attr_deptno" width="150px" label="部门" 
		 * |	editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'DEPT'},decoder:{valueAttr:'CODEVALUE',displayAttr:'CODENAME'}}}"></cell>
		 */
		editor: "object",
		
		/**
		 * @type:
		 * 		{boolean}
		 * @summary:
		 * 		编辑器可用标志
		 * @default:
		 * 		true
		 * @example:
		 * |<div dojoType="unieap.grid.Grid" edit="{editType:'rowEdit'}">
		 * |	<header>
		 * |		${1}<cell name="attr_ename" editor="{editorClass:'unieap.form.TextBox'}" enable="false"></cell>
		 * |	</header>
		 * |</div>
		 * ${1}虽然该列配置了editor属性，但是enable为false,该列依然不可编辑
		 */
		enable: "boolean",
		
		/**
		 * @summary:
		 * 		cell编辑前事件
		 * @description:
		 * 		编辑前事件，此事件指定的方法返回false时，此列的编辑器将不会被打开。
		 * 		接受事件的方法提供两个入参：inRowIndex，inCell
		 * @type:
		 * 		{function}
		 * @default:
		 * 		null
		 * @example:
		 * |<div dojoType="unieap.grid.Grid" edit="{editType:'rowEdit'}">
		 * |	<header>
		 * |		<cell name="attr_ename" label="姓名" editor="{editorClass:'unieap.form.TextBox'}" onBeforeEdit="fn"></cell>
		 * |	</header>
		 * |</div>
		 * |function fn(inRowIndex, inCell){
		 * |	return false;
		 * |}
		 * |
		 */
		onBeforeEdit: "object"
		
	},
	
	classes: null,
	
	constructor: function(param) {
		this.enable = true;
		dojo.mixin(this, param);

		this.setWidth(this.width);
		unieap.setLabelFormatProps(this);
		this.classes = ['u-grid-cell'];
		this._isNumberStyle()&&this.classes.push('u-grid-text2-number');
		
	},
	// 判断当前cell否应用数字类型样式
	_isNumberStyle: function(){
		if(this.dataType=="number") return true;
		if(this.dataType) return false;
		var ds= this.grid.getBinding().getDataStore();
		var datatype;
		if(this.name&&ds.getMetaData(this.name)){
			datatype=ds.getMetaData(this.name).dataType;
		} else {
			return false;
		}
		if(unieap.getDataType(datatype)=="number"){
			return true;
		}
		return false;
	},
	
	//对日期进行格式化用得到
	getValueFormatter:function(){
		return unieap.getModuleInstance(this,"valueFormatter","unieap.form.SimpleFormatter");
	},
	//用户可以自己定义自己的formatter,例如
	//displayFormatter="{declaredClass:'unieap.form.NumberDisplayFormatter',dataFormat:'###,###.00'}"
	getDisplayFormatter:function(){
		return unieap.getModuleInstance(this,"displayFormatter","unieap.form.SimpleFormatter");
	},
	
	
	get: function(inRowIndex) {
//		this._defaultCell=true;
		var value= this.value || this.grid.getBinding().getDatum(inRowIndex, this.name);
		return value;
	},
	
	//isUnitedCell 是否是合并单元格调用
	//合并单元格调用是,合并的单元格不需要line-height样式，不然会出现bug #U_EAP00008691 
	format: function(inRowIndex,data,isUnitedCell) {
		if(data){
			//如果有数据 则不需要通过inRowIndex去取,用于锁定行
			value=(this.name in data)?data[this.name]:'';
		}else{
			var value = this.get(inRowIndex);
		}
		value = this._format(value, inRowIndex);		
		var gclass="";
        if(value.cls){
		   gclass=value.cls;
		}
		if(value.value){
		   value=value.value;
		}
		
		//value值为空时，ie下单元格显示没有边框
		value===""?(value="&nbsp;"):value;
		var lineHeight=this.grid.managers.get('RowManager').defaultRowHeight,
			css="";
		lineHeight=lineHeight-1;
		!isUnitedCell&&(css="line-height:"+lineHeight+"px");
		if(gclass){
			value = "<div  class='"+gclass+"' style='" +css+"'>" + value + "</div>";
		}  
		else{
			value = "<div  class=' u-grid-text' style='"+css+"'><div class='u-grid-text2'>" + value + "</div></div>";
		}
	    return value;
	},
	
	_format: function(inValue, inRowIndex) {
		var value = inValue;
		
		if (this.decoder) {
			//处理级联
			if (!this.cascade && this.editor && this.editor.editorProps.cascade) {
				this.cascade = this.editor.editorProps.cascade;
			}
			if(this.cascade && this.cascade.getCascadeStore){
				this.decoder.store = this._getCascadeStore(this.cascade, inRowIndex);
			}
			if (this.decoder.store) {
				//如果没有找到value对应的值,应该返回原始的value值
				value = unieap.transcode(value,this.decoder)||value;
			}
		}else{
			//value值格式化操作
			if (this.valueFormatter) {
				value = this.getValueFormatter().format(value,inRowIndex);
			}			
			//显示值格式化操作
			if (this.displayFormatter) {				
				value = this.getDisplayFormatter().format(value,inRowIndex);
			}	
		}
		if(dojo.isFunction(this.formatter)) {
			value = this.formatter.call(this, value, inRowIndex);
//			this._userDefinedCell=true;
		}
		value = this.extraFormat(inRowIndex, value);
		return value;
	},
	
	extraFormat: function(inRowIndex, inValue) {
		return inValue;
	},
	
	_getCascadeStore: function(cascade, inRowIndex) {
		if (isNaN(inRowIndex)) {
			return null;
		}
		if(!cascade.primaryCell){
			this.grid.managers.get("LayoutManager").forEachCell(function(cell, index) {
				if ((cell.editor && cell.editor.editorProps 
					&& cell.editor.editorProps.id==cascade.primary)
					||(cell.name==cascade.primary)) {
					cascade.primaryCell = cell;
				}
			});
		}
		return cascade.getCascadeStore(cascade.primaryCell.get(inRowIndex));
	},
	
	isPercent : function() {
		return this.percent == true;
	},
	setWidth : function(width) {
		width = String(width || 200);
		this.width = parseInt(width,10);		
		if (width.indexOf("%")>0) {
			this.percent = true;
		}
		else{
			this.percent = false;
		}
	},
	
	/**
	 * @summary:
	 * 		获得单元格的列宽
	 * @return:
	 * 		{string}
	 * @example:
	 * |var cell=grid.getCell("attr_name");
	 * |var cellWidth=cell.getWidth(); 
	 */
	getWidth: function() {
		return this.isPercent() ? String(this.width).concat("%") : String(this.width -1).concat("px");	
	},
	
	getPixelWidth : function() {
		return this.width;
	},
	
	getRealWidth :function(){
		var viewmanager = this.grid.managers.get("ViewManager");
		var view = viewmanager.getViewByCell(this);
		var node = view?view.getCellNode(0, this.index):null;
		if (node) {
			return node.offsetWidth;
		} else {
			return this.getPixelWidth();
		}
	},
	
	getEdit: function() {
		if (!this.edit) {
			dojo.require("unieap.grid._grid.cellEdit");
			this.edit = new unieap.grid.cellEdit(this);
		}
		return this.edit;
	},
	
	/**
	 * @summary:
	 * 		设置单元格上的编辑器
	 * @param:
	 * 		{string}editorClass
	 * @param:
	 * 		{object} editorProps
	 * @example:
	 * |<cell editor="{editorClass:'unieap.form.TextBox'}" label="姓名" name="attr_sal"></cell>
	 * |//将姓名列的编辑器改为NumberTextBox,并设置编辑器能输入的最大长度为10
	 * |var cell=grid.getCell("attr_sal").setEditor("unieap.form.NumberTextBox",{maxLength:10});
	 */
	setEditor: function(editorClass, editorProps) {
		this.getEdit().setEditor(editorClass, editorProps);
	},
	
	/**
	 * @summary:
	 * 		获得Cell上配置的编辑器
	 * @return:
	 * 		{unieap.form.FormWidget}
	 * @example:
	 * |<cell editor="{editorClass:'unieap.form.TextBox'}" name="attr_sal"></cell>
	 * |var editor=unieap.byId("grid").getCell("attr_sal").getEditor();
	 * |alert(editor.declaredClass); //弹出unieap.form.TextBox
	 */
	getEditor: function(which) {
		return this.getEdit().getEditor(which);
	},
	
	
	isValid: function(inRow) {
		if (!this.name) return true;
		var value = inRow.getItemValue(this.name),
			editor = this.getEditor();
			
		//首先校验编辑器
		if (editor) {
			editor.getBinding().bind(inRow);
			editor.setValue(value);
			result=editor.getValidator().validate();
			editor.getBinding().unbind(inRow);
			if(!result){
				this._canEdit=true;
				this._errorMsg=editor.getValidator().getErrorMsg();
				return false;
			}
		}
		
		//元数据校验
		var meta = inRow.getRowSet().getMetaData(this.name),
			isnullable = meta ?  meta.isNullable() : true ;
		
		if (!isnullable && (value==null || value==="")){
			this._errorMsg="该列的值不能为空";
			this._canEdit=false;
			return false;
		}
		
		return true;
	},
	
	//获得校验错误提示信息
	getErrorMsg:function(){
		return this._errorMsg;
	},
	
	//判断单元格是否可编辑
	isEditable:function(){
		return !!this._canEdit;
	},
	
	//设置是否可编辑
	setEditable:function(canEdit){
		this._canEdit=!!canEdit;
	},
	
	
	
	destroy: function() {
		if (this.edit) {
			this.edit.destroy();
		}
	}
	
});