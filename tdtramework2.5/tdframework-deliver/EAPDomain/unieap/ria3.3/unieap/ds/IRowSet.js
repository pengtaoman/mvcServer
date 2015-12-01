if(!dojo._hasResource["unieap.ds.IRowSet"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
	dojo._hasResource["unieap.ds.IRowSet"] = true;
	dojo.provide("unieap.ds.IRowSet");
	dojo.declare("unieap.ds.IRowSet",null,{
		/**
		 * @declaredClass:
 		 * 		unieap.ds.IRowSet
		 * @summary:
		 * 		IRowSet是客户端数据的容器的接口，参考实现为unieap.ds.RowSet
		 * 		为了使得UI组件能够支持自定义的数据结构，需要实现该接口中的方法
		 * @classDescription:
		 * 		它类似于关系数据库的Table，而Table内的每行类似于RowSet的每一个Row对象。
		 * 		可以通过操作RowSet来实现客户端数据的排序、过滤、缓存、分页。
		 * 		RowSet为UI控件提供数据支持。
		 * 		在RowSet内部，有三个数组Buffer，一个是primary Buffer，存储新建、更新和未更新的数据行；
		 * 		一个是deleted Buffer，存储被删除的数据行；
		 * 		一个是filter Buffer，存储页面过滤（主要是查找满足条件的数据）后得到的结果（行）。
		 * @example:
		 * |	new unieap.ds.RowSet([
		 * |			{'key':'value','key1':'value1'},
		 * |			{'key':'value','key1':'value1'}
		 * |		]);
		 *		根据一组数据创建RowSet,默认加到主缓冲区中。
		 * @example:
		 * |	new unieap.ds.RowSet({
		 * |		'primary':[],
		 * |		'delete':[],
		 * |		'filter':[]});
		 *		根据多组数据创建RowSet,分别加到各自的缓冲区中。
		 * @img：
		 * 		images/ds/rowset1.png
		 */
		
		constructor  : function(data){},
		
		/**
		 * @summary：
		 * 		判断当前IRowSet对象内数据是否被修改
		 * @description:
		 * 		遍历所有的数据直到发现有修改状态的数据
		 * @return：
		 * 		{boolean}
		 */
		isModified : function(){},
		
		/**
		 * @summary：
		 * 		提取RowSet对象内部数据
		 * @description：
		 * 		包括主缓冲区、过滤缓冲区和删除缓冲区数据的对象
		 * @return 
		 * 		{object} 
		 */
		toData: function(){},
		
		/**
		 * @summary:
		 * 		提取RowSet数据为json格式
		 * @return：
		 * 		{string}
		 */
		toJson : function(){},
		
		/**
		 * @summary:
		 * 		提取RowSet中的某个缓冲区json格式数据
		 * @example:
		 * |	${1}var name=unieap.ds.Buffer.PRIMARY;
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	                {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 * |	                {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
		 * |	                {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 * |	]);
		 * |	rowset.toBufJson(name);
		 * 		${1}取得主缓冲区的json格式string对象		
		 * @param
		 * 		{string} name
		 * 		缓冲区名称
		 * @return:
		 * 		{string}
		 * 		json格式数据
		 */
		toBufJson : function(name){},
		
		/**
		 * @summary：
		 * 		取得当前RowSet对象内某个缓冲区的数据
		 * @example：
	     * |	var rowset = new unieap.ds.RowSet([
		 * |					{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},
		 * |					{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"},
		 * |					{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}
	     * |	]);
		 * |		
	     * |	${1}var name=unieap.ds.Buffer.PRIMARY; 
	     * |	unieap.debug(rowset.getData(name));
		 *	${1}取得主缓冲区的数据对象
		 * @param：
		 * 		{number} bufferName 
		 * 		可选项，默认为主缓冲区
		 * @return：
		 * 		{array}
		 * 		指定缓冲区的数据
		 */
		getData: function(bufferName) {},
		
		/**
		 * @summary：
		 * 		取当前RowSet对象的某缓冲区的行数
		 * @param：
		 * 		{number}  bufferName
		 * 		可选项，某缓冲区，默认为主缓冲区
		 * @return：
		 * 		{number} 
		 * 		某缓冲区内的Row对象个数，即行数
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	                {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 * |	                {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
		 * |	                {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 * |	]);
		 * |	var count=rowset.getRowCount("primary");
		 * |	alert(count);
		 */
		getRowCount : function(bufferName){},
		
		/**
		 * @summary:
		 * 		取RowSet所有数据的总行数
		 * @return 
		 * 		{number}
		 * 		取得当前RowSet对象所有缓冲区内Row对象的总行数
		 * @example:
		 * 	|	var rowset = new unieap.ds.RowSet({'primary':[
		 *  |	                {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 *  |	                {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
		 *  |	                {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 *  |	],'delete':[{attr_empno:"1003",NAME:"牛牛",attr_job:"演员",attr_sal:"104"}]});
		 * 	|	alert(rowset.getTotalCount());
		 */
		getTotalCount : function(){},
		
		/**
		 * @summary:
		 * 		获取初始行数
		 * @description:
		 * 		获取主缓冲区和过滤缓冲区的初始行数
		 * @return：
		 * 		{number}
		 * @example:
		 *  |	var rowset = new unieap.ds.RowSet({'primary':[
		 *  |	                {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 *  |	                {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
		 *  |	                {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 *  |	],'delete':[{attr_empno:"1003",NAME:"牛牛",attr_job:"演员",attr_sal:"104"}]});
		 *  |	alert(rowset.getInitialCount());
		 */
		getInitialCount:function(){},
		
		/**
		 * @summary:
		 *  	重新设置初始行数
		 * @description: 
		 * 		重新设置主缓冲区和过滤缓冲区的初始行数
		 * @return:
		 * 		{number}
		 * @example:
		 *  |	var rowset = new unieap.ds.RowSet({'primary':[
		 *  |	                {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 *  |	                {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
		 *  |	                {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 *  |	],'filter':[{attr_empno:"1003",NAME:"牛牛",attr_job:"演员",attr_sal:"104"}]});
		 *  |	rowset.resetInitialCount(); 
		 *  |	unieap.debug(rowset);
		 */
		resetInitialCount:function(){},
		
		/**
		 * @summary：
		 * 		判断是否为空的RowSet
		 * @description：
		 * 		空的RowSet代表主缓冲区,过滤缓冲区,删除缓冲区内均没有数据
		 * @return
		 * 		{boolean} 
		 * @example:
		 * |	${1}var rowset1 = new unieap.ds.RowSet([]);    
		 * |	${2}alert(rowset1.isEmpty()); 
		 * ${1}  定义一个空的RowSet
		 * ${2}  本例返回true
		 */
		isEmpty: function(){},
		
		/**
		 * @summary:
		 * 		清除RowSet内所有数据
		 * @description:
		 * 		三个缓冲区数组清零,调用后，isEmpty() 返回true
		 * @example:
		 * | 	var rowset = new unieap.ds.RowSet([
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |                	 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * |	unieap.debug(rowset);
		 * |	rowset.reset();
		 * |	unieap.debug(rowset);
		 */
		reset : function(){},
		
		/**
		 * @summary:
		 * 		清除更新标志。
		 * 		row中的resetUpdate方法不支持状态更新，可用RowSet中的resetUpdate(rowIndex)替代，即传入row的index
		 * @description:
		 * 		清除删除缓冲区的数据,清除主缓冲区和过滤缓冲区的更新标志
		 * @example：
		 * |	rowset.resetUpdate(1);
		 * 		清除index为1的数据的更新标识
		 * @example：
		 * |	var rowset = new unieap.ds.RowSet([
	 	 * |			                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |			                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |			                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * |	rowset.setItemValue(0,"NAME","茜茜公主");
		 * |	rowset.deleteRow(2);
		 * |	unieap.debug(rowset);
		 * |	${1}rowset.resetUpdate();  
		 * |	unieap.debug(rowset);
		 * |	或
		 * |	${2}rowset.resetUpdate(0);     
		 * ${1}会清除删除缓冲区的数据,清除主缓冲区和过滤缓冲区的更新标志
		 * ${2}清除主缓冲区内，行索引为0的row对象的更新标志
		 */
		resetUpdate : function(rowIndex){},
		
		/**
		 * @summary:
		 * 		把数据恢复成原始值
		 * @description:
		 * 		恢复所有数据,删除新增的数据,恢复修改过滤的数据
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |		               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},        
		 * |		               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"},   
		 * |		               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500"}           
		 * |	]);
		 * |	//===================================删除=============================================
		 * |	${1}rowset.deleteRows([0,2]);     
		 * |	${2}rowset.discardUpdate()；      
		 * |	//===================================修改=============================================
		 * |	${3}var row = rowset.getRow(0);     
		 * |	${4}row.setItemValue("NAME","郭靖");  
		 * |	${5}rowset.discardUpdate(0)；
		 * |	或
		 * |	${6}rowset.discardUpdate();   
		 * |		
		 * |	//================================新增=============================================
		 * |	rowset.addRow({attr_empno:"1004",NAME:"Jack",attr_job:"演员"});
		 * |	${7}rowset.discardUpdate();   
			 * |
			 * ${1}删除行索引为0和2的行
			 * ${2}对于删除的数据，可不配置参数，即恢复所有数据
			 * ${3}获得索引行为0的Row对象
			 * ${4}修改row的NAME值
			 * ${5}对于已经修改的RowSet对象，可以指定恢复哪一行的数据，参数为行索引
			 * ${6}如果想恢复全部被修改的数据，可不配置参数
			 * ${7}对于新增的数据，使用该方法，会把该条数据从缓冲区删除，恢复原来的状态
		 * @param 
		 * 		{number} rowIndex
		 */
		discardUpdate : function(rowIndex){},
		
		/**
		 * @summary:
		 * 		增加一行数据
		 * @example:
		 * |	${1}var rowset = new unieap.ds.RowSet([
		 * |					{attr_empno:"1000",NAME:"Rose",attr_job:"演员"},
		 * |					{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监"},
		 * |					{attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星"}
		 * |	]);
		 * |	var data = {attr_empno:"1003",NAME:"张柏芝",attr_job:"演员"};
		 * |	rowset.addRow(data);
		 * |	或
		 * |	rowset.addRow(data,false,false);
		 * ${1}新建一个RowSet
		 * @param 
		 * 		{object} data 
		 * 		被增加的行数据
		 * @param 
		 * 		{boolean} clone 
		 * 		是否通过clone方式，因为data数据内可能有状态信息，如“是否被选择”、“是否是修改状态”等
		 * @param 
		 * 		{boolean} keepStatus 
		 * 		是否保留data的状态信息，如果不保留，则为新数据，即状态为NEWMODIFIED。
		 * @return 
		 * 		{unieap.ds.Row} 
		 * 		被添加的Row对象
		 */
		addRow : function (data, clone, keepStatus,setDefValue){},
		
		/**
		 * @summary:
		 * 		添加多行数据
		 * @param 
		 * 		{array} data 
		 * 		数据对象的数组
		 * @example:
		 * |	${1}var rowset = new unieap.ds.RowSet([]);
		 * |	var datas=[]
		 * |	for(var i=0;i<10;i++){
		 * |	    datas.push({attr_empno:"100"+i,NAME:"name_"+i,attr_job:"演员_"+i});
		 * |	}
		 * |	rowset.addRows(datas);
		 * ${1}新建一个空的RowSet对象
		 */
		addRows : function(data,setDefValue){},
		
		
		/**
		 * @summary:
		 * 		插入一行数据
		 * @param: 
		 * 		{object} data 
		 * 		被增加的行数据
		 * @param 
		 * 		{number} rowIndex 
		 * 		被增加行所在的索引位置,默认为最后一条
		 * @param 
		 * 		{boolean} clone 
		 * 		是否通过clone方式，因为data数据内可能有状态信息，如“是否被选择”、“是否是修改状态”等
		 * @param 
		 * 		{boolean} keepStatus
		 * 		 是否保留data的状态信息，如果不保留，则为新数据，即状态为NEWMODIFIED。
		 * @return 
		 * 		{unieap.ds.Row} 
		 * 		被插入的Row对象
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
	 	 * |			                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |			                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |			                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * | 	var data = {attr_empno:"1003",NAME:"杨康",attr_job:"木匠",attr_sal:"888"};
		 * |	rowset.insertRow(data,2);
		 * |	或
		 * |	rowset.insertRow(data,2,false,false);
		 * |	unieap.debug(rowset);
		 */
		insertRow : function(data, rowIndex, clone,keepStatus,setDefValue){},
		
		/**
		 * @summary:
		 * 		删除指定行
		 * @param 
		 * 		{number} rowIndex 
		 * 		被删除行所在的索引
		 * @return 
		 * 		{unieap.ds.Row}  
		 * 		被删除的行对象，该对象在删除缓冲区
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
	 	 * |			                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |			                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |			                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * |	 ${1} rowset.deleteRow(0); 
		 * |	unieap.debug(rowset);
		 *${1}删除行索引为0的row
		 */
		deleteRow : function (rowIndex){},
		
		/**
		 * @summary:
		 * 		批量删除行记录
		 * @param 
		 * 		{array} data
		 * 		 行下标，形如:[1,0,5,4,3];
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
	 	 * |			                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |			                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |			                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * |	${1} rowset.deleteRows([0,2]);
		 * |	unieap.debug(rowset);
		 * ${1}批量删除行索引为0和2的row 
		 */
		deleteRows : function (data){},
		
		/**
		 * @summary:
		 * 		删除所有缓冲区的所有行
		 * @description:
		 * 		包括过滤缓冲区
		 * @example:
		 * | 	var rowset = new unieap.ds.RowSet([
	 	 * |			                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |			                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |			                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * | 	rowset.deleteAllRows();
		 * |	unieap.debug(rowset);
		 */
		deleteAllRows : function(){},
		
		/**
		 * @summary：
		 * 		恢复某被删除的行
		 * @param 
		 * 		{number} rowIndex
		 * 		 被恢复的删除行所在的索引
		 * @return 
		 * 		{boolean} 
		 * 		true：恢复成功， false：恢复失败，如索引位置为负值或超出行记录数
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet({'delete':[
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]});
		 * |	unieap.debug(rowset);
		 * |	rowset.unDeleteRow(1);
		 * |	unieap.debug(rowset);
		 */
		unDeleteRow : function(rowIndex){},
		
		/**
		 * @summary：
		 * 		恢复所有被删除的行
		 * @description:
		 * 		删除缓冲区的数据恢复到主缓冲区中
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet({'delete':[
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]});
		 * |	unieap.debug(rowset);
		 * |	rowset.unDeleteAll();
		 * |	unieap.debug(rowset);
		 */
		unDeleteAll : function(){},
		
		/**
		 * @summary：
		 * 		丢弃某缓冲区中的若干行数据
		 * @description:
		 * 		丢弃数据不是把数据放到删除缓冲区,而是直接删除
		 * @param 
		 * 		{number} startIndex
		 * 		 起始行索引
		 * @param 
		 * 		{number} endIndex
		 * 		 结束行索引
		 * @param 
		 * 		{number} bufferName
		 * 		 可选项，缓冲区名称，默认为主缓冲区
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet({'primary':[
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]});
		 * | 	${1}rowset.rowsDiscard(0,2,unieap.ds.Buffer.PRIMRY); 
		 * |	unieap.debug(rowset);
		 *  ${1}丢弃主缓冲区中行索引为0至1的row对象  
		 */
		rowsDiscard : function(startIndex, endIndex, bufferName){},
		
		/**
		 * @summary：
		 * 		行拷贝
		 * @param:
		 * 		 {number} startIndex
		 * 		 源RowSet的起始行索引
		 * @param 
		 * 		{number} endIndex 
		 * 		源RowSet的结束行索引（不包含endIndex这行）
		 * @param 
		 * 		{number} fromBuffer 
		 * 		源RowSet的某缓冲区
		 * @param
		 * 		{unieap.ds.RowSet} toRs 
		 * 		目标RowSet
		 * @param
		 * 		{number} toIndex 
		 * 		目标缓冲区的索引
		 * @param
		 * 		{number} toBuffer 
		 * 		目标RowSet的目标缓冲区
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * |	
		 * |	var bufferName = unieap.ds.Buffer.PRIMRY;
		 * |	var bufferName1 = unieap.ds.Buffer.DELETE;
		 * |	${1}var rowset1 = new unieap.ds.RowSet([]);                                     
		 * |	${2}rowset.rowsCopy(0,1,bufferName,rowset1,0,bufferName1);                  
		 * |	unieap.debug(rowset1);
		 * ${1}  定义一个空的rowset
		 * ${2}  把rowset主缓冲中第0条row对象，拷贝到rowset1的delete缓冲区中
		 */
		rowsCopy: function(startIndex, endIndex, fromBuffer, toRs, toIndex, toBuffer ){},
		
		/**
		 * @summary:
		 * 		行移动
		 * @param:
		 * 		{number} startIndex 
		 * 		源RowSet的起始行索引
		 * @param
		 * 		{number} endIndex 
		 * 		源RowSet的结束行索引
		 * @param
		 * 		{number} fromBuffer 
		 * 		源RowSet的某缓冲区
		 * @param
		 * 		{unieap.ds.RowSet} toRs 
		 * 		目标RowSet
		 * @param
		 * 		{number} toIndex 
		 * 		目标缓冲区的索引
		 * @param
		 * 		{number} toBuffer 
		 * 		目标RowSet的目标缓冲区
		 * @example:
		 * |	${1}var rowset = new unieap.ds.RowSet([
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
	 	 * |	]);
		 * |	${2}var rowset1 = new unieap.ds.RowSet([]);               
		 * |	unieap.debug(rowset);
		 * |	${3}rowset.rowsMove(0,2,unieap.ds.Buffer.PRIMRY,rowset1,0,unieap.ds.Buffer.DELETE); 
		 * |	unieap.debug(rowset);
		 * |	unieap.debug(rowset1);
		 * ${1}源RowSet
		 * ${2}目标RowSet
		 * ${3} 把rowset主缓冲区中rowindex=0和1（不包括2）的记录移到rowset1的删除缓冲区中
		 */
		rowsMove : function(startIndex, endIndex, fromBuffer, toRs, toIndex, toBuffer ){},
		
		/**
		 * @summary:
		 * 		设置行是否被选中状态
		 * @description:
		 * 		将若干行标识为select参数的状态
		 * @example:
		 * |	rowset.setSelectRows(true,0,3);
		 * 		选中前四条数据
		 * @param 
		 * 		{boolean} select 
		 * 		选择状态
		 * @param:
		 * 		{number} startIndex 
		 * 		开始行索引
		 * @param
		 * 		{number} endIndex 
		 * 		结束行索引
		 * @param
		 * 		{number} bufferName 
		 * 		可选项，默认为主缓冲区
		 * @example:
		 * |		var rowset = new unieap.ds.RowSet([
		 * |    				{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |   					{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |					{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |		]);
		 * |	${1}rowset.selectRows(true,0,2);
		 * |		unieap.debug(rowset);
		 * ${1}将第0、1行设为选中状态
		 */
		selectRows : function(select, startIndex, endIndex, bufferName ){},
		
		/**
		 * @summary:
		 * 		取得某缓冲区的被选中行总数
		 * @description：
		 * 		遍历某缓冲区,返回选中行总数
		 * @param
		 * 		{number} bufferName 
		 * 		可选项，默认为主缓冲区
		 * @return
		 * 		{number} 
		 * 		被选中的行总数
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |			${1}{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},                   
		 * |			{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_s:true},
		 * |			{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}
		 * |	]);
		 * |	${2}var count = rowset.getSelectedCount("primary"); 
		 * ${1}_s=true,表示该行被选中     
		 * ${2}本例返回“2”       
		 */
		getSelectedCount : function(bufferName){},
		
		/**
		 * @summary:
		 * 		取得当前被选中的行的Row对象数组
		 * @param
		 * 		{string} bufferName
		 *		可选项，默认为主缓冲区
		 * @return
		 * 		{array} 
		 * 		被选中的行的Row对象数组
		 * @example:
		 * | 	var rowset = new unieap.ds.RowSet([
		 * |			${1}{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},                   
		 * |			{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_s:true},
		 * |			{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}
		 * |	]);
	 	 * |	${2}unieap.debug(rowset.getSelectedRows(unieap.ds.BUFFER.PRIMARY));       
		 * |	或
		 * |	${3}unieap.debug(rowset.getSelectedRows()); 
		 * ${1}_s=true,表示该行被选中                    
		 * ${2}参数为缓冲区的名称
		 * ${3}如不配置参数，默认为主缓冲区
		 */
		getSelectedRows : function(bufferName){},
		
		/**
		 * @summary:
		 * 		取得当前选中的行的行号对象数组
		 * @param:
		 * 		{string} bufferName
		 * 		 可选项，默认为主缓冲区
		 * @return 
		 * 		{array}
		 * 		 被选中的行的Row对象行号数组
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |			${1}{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},                 
		 * |			{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_s:true},
		 * |			{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}
		 * |	]);
		 * |	var indexs=rowset.getSelectedRowIndexs(unieap.ds.BUFFER.PRIMARY);
		 * |	alert(indexs);
		 * ${1} _s=true,表示该行被选中
		 */
		getSelectedRowIndexs : function(bufferName){},
		
		/**
		 * @summary：
		 * 		取得当前未被选中的行的Row对象数组
		 * @param 
		 * 		{string} bufferName
		 * 		 可选项，默认为主缓冲区
		 * @return 
		 * 		{array} 
		 * 		被选中的行的Row对象数组
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |		              {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},                     
		 * |		              ${1}{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_s:false},   
		 * |		              {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}
		 * |		]);
		 * |	${2}rowset.getUnSelectedRows(unieap.ds.BUFFER.PRIMARY);          
		 * |		或
		 * |	${3}rowset.getUnSelectedRows();    
		 *  ${1}_s=false或没有该标志位,表示该行未被选中               
		 *  ${2}参数为缓冲区的名称
		 *  ${3}如不配置参数，默认为主缓冲区
		 */
		getUnSelectedRows : function(bufferName){},
		
		/**
		 * @summary：
		 * 		取得当前未被选中的行的行号对象数组
		 * @param 
		 * 		{string} bufferName
		 * 		 可选项，默认为主缓冲区
		 * @return 
		 * 		{array}
		 *		被选中的行的Row对象数组
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	              {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},                     
		 * |	              ${1}{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_s:false},   
		 * |	              {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}
		 * |	]);
		 * |	 ${2}rowset.getUnSelectedRowIndexs(unieap.ds.BUFFER.PRIMARY);        
		 * |	或
		 * |	  ${3}rowset.getUnSelectedRowIndexs(); 
		 *  ${1}_s=false或没有该标志位,表示该行未被选中       
		 *  ${2}参数为缓冲区的名称
		 *  ${3}如不配置参数，默认为主缓冲区
		 */
		getUnSelectedRowIndexs : function(bufferName){},
		
		/**
		 * @summary：
		 * 		删除所有选中行
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               ${1}{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},         
		 * |	               ${2}{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_s:true}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500"}           
		 * |	]);
		 * |	rowset.deleteSelectedRows();
		 * |	unieap.debug(rowset);
		 * ${1}被选中的行
		 * ${2}被选中的行      
		 */
		deleteSelectedRows: function(){},
		
		/**
		 * @summary：
		 * 		通过行索引获取行对象
		 * @param
		 *		{number} rowIndex
		 *		行索引
		 * @param 
		 * 		{number} bufferName 
		 * 		可选项，默认为主缓冲区
		 * @return 
		 * 		{unieap.ds.Row} 
		 * 		返回指定行的Row对象,,没有这条数据时返回null
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500"}           
		 * |	]);
		 * |	var row=rowset.getRow(0);   
		 * |	unieap.debug(row);
		 */
		getRow : function(rowIndex, bufferName){},
		
		/**
		 * @summary：
		 * 		获取指定缓冲区中,指定索引区间的Row对象
		 * @param 
		 * 		{number} bufferName 
		 * 		可选项，默认为主缓冲区
		 * @param
		 *		{number} beginIndex
		 *		行索引
		 * @param
		 *		{number} endIndex
		 *		行索引
		 * @return
		 * 		{array} 
		 * 		被选中的行的Row对象数组
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500"}           
		 * |	]);
		 * |	var rows=rowset.getRows("primary",0,rowset.getRowCount());   
		 * |	unieap.debug(rows);
		 */
		getRows : function(bufferName,beginIndex,endIndex){},
		
		/**
		 * @summary：
		 * 		获取行内数据
		 * @param 
		 * 		{number} rowIndex
		 * 		 行索引
		 * @param 
		 * 		{number} bufferName
		 * 		 可选项，默认为主缓冲区
		 * @return 
		 * 		{object|null}
		 * 		所在行内的数据，null：当rowIndex值为负值或超出主缓冲区数组范围时
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500"}           
		 * |	]);
		 * |	${1}var data = rowset.getRowData(0,"primary");      
		 * |	${2}var colValue = data["NAME"];  
		 * |	alert(colValue);
		 * ${1}获取行内数据
		 * ${2}获取“NAME”字段的值
		 */
		getRowData : function(rowIndex, bufferName){},
		
		/**
		 * @summary：
		 * 		遍历当前的RowSet，对每个row进行操作
		 * @description：
		 * 		对当前RowSet对象缓冲区的若干行执行callback操作
		 * @example：
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500"}           
		 * |	]);
		 * |	${1}rowset.forEach(function(row){
		 * |		row.setItemValue('dept',20);
		 * |	})
		 * |	unieap.debug(rowset);
		 * 		${1}遍历RowSet中的所有Row对象的数据,对每个Row进行操作
		 * @param:
		 * 		{function} callback
		 * 		 回调函数
		 * @param 
		 * 		{number} startIndex
		 * 		 起始行索引
		 * @param 
		 * 		{number} endIndex 
		 * 		结束行索引
		 * @param 
		 * 		{number} bufferName 
		 * 		缓冲区
		 * @param 
		 * 		{object} thisObject 
		 * 		回调函数里引用的this对象
		 */
		forEach: function(callback, startIndex, endIndex, bufferName, thisObject){},
		
		/**
		 * @summary:
		 * 		遍历当前的RowSet对象，当遇到不满足的条件时终止遍历
		 * @description
		 * 		当且仅当每个Row对象都满足条件时返回true。
		 * 		当有一个Row对象不满足条件时返回false,并终止遍历。
		 * @example：
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}var isSatisfied=rowset.every(function(row){
		 * |		return row.getItemValue('deptno')==20;
		 * |	})
		 * |	alert(isSatisfied);
		 * 		${1}判断RowSet的每一个Row对象的deptno值是否都为20。
		 * @param 
		 * 		{function} callback 
		 * 		回调函数
		 * @param 
		 * 		{number} startIndex
		 * 		 起始行索引
		 * @param 
		 * 		{number} endIndex
		 * 		 结束行索引
		 * @param 
		 * 		{number} bufferName
		 * 		 缓冲区
		 * @param 
		 * 		{object} thisObject 
		 * 		回调函数里引用的this对象
		 * @return 
		 * 		{boolean}
		 */
		every: function(callback, startIndex, endIndex, bufferName,thisObject){},
		
		/**
		 * @summary:
		 * 		遍历当前的RowSet
		 * @description：
		 * 		当有一个row满足条件时返回true,并终止遍历。
		 * 		否则返回false。
		 * @example：
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}var isSatified=rowset.some(function(row){
		 * |		return row.getItemValue('deptno')==20;
		 * |	})
		 * |	alert(isSatified);
		 * ${1}判断rowset中是否存在deptno值为20的row，存在则终止遍历
		 * 		
		 * @param 
		 * 		{function} callback
		 * 		 回调函数
		 * @param 
		 * 		{number} startIndex 
		 * 		起始行索引
		 * @param
		 * 		 {number} endIndex
		 * 		 结束行索引
		 * @param
		 * 		 {number} bufferName
		 * 		 缓冲区
		 * @param 
		 * 		{object} thisObject
		 * 		 回调函数里引用的this对象
		 * @return 
		 * 		{boolean}
		 */
		some: function(callback, startIndex, endIndex, bufferName, thisObject){},
		
		/**
		 * @summary:
		 * 		遍历过滤
		 * @description：
		 * 		遍历所有的Row,返回由过滤出来的数据组成的RowSet
		 * @example：
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}var newrs=rowset.forEachFilter(function(row){
		 * |		return row.getItemValue('deptno')==20;
		 * |	})
		 * |	unieap.debug(newrs);
		 * 		${1}从RowSet中过滤出dept为20的Row。返回一个由过滤出来的数据组成的新RowSet对象。
		 * @param 
		 * 		{function} callback
		 * 		 回调函数
		 * @param 
		 * 		{number} startIndex
		 * 		 起始行索引
		 * @param 
		 * 		{number} endIndex 
		 * 		结束行索引
		 * @param 
		 * 		{number} bufferName 
		 * 		缓冲区
		 * @param 
		 * 		{object} thisObject 
		 * 		回调函数里引用的this对象
		 * @return 
		 * 		{unieap.ds.RowSet} 
		 * 		过滤操作后的RowSet对象
		 */
		forEachFilter: function(callback, startIndex, endIndex, bufferName, thisObject){},
		
		/**
		 * @summary:
		 * 		阻止事件
		 * @description
		 * 		数据操作将不触发事件
		 * @example:
		 *  |	rowset.disabledEvent();
		 */
		disabledEvent : function(){},
		
		/**
		 * @summary:
		 * 		开启事件
		 * @description
		 * 		默认开启事件
		 * @example:
		 *  |	rowset.enabledEvent();
		 */
		enabledEvent : function(){},
		
		/**
		 * @summary:
		 * 		当Row中字段值将改变时触发事件
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}dojo.connect(rowset,'onItemChanging',
		 * |		function(row,name,value,index){
		 * |			alert(row.getItemValue("attr_empno"));	
		 * |		}
		 * |	);
		 * |	rowset.setItemValue(0,"attr_empno","1003");
		 * 		${1}绑定了rowset的onItemChanging事件,参数分别为row,字段名,字段值,索引
		 * @param 
		 * 		{unieap.ds.Row} thisRow 
		 * 		RowSet的当前操作行
		 * @param 
		 * 		{string} itemName 
		 * 		Row中某字段的名称
		 * @param 
		 * 		{object} value 
		 * 		该字段的值
		 * @param 
		 * 		{number} index 
		 * 		该行所在的索引
		 * @return 
		 * 		{boolean} 
		 * 		可以根据该返回值决定下一步的操作
		 */
		onItemChanging: function(thisRow, itemName, value, index){},
		
		/**
		 * @summary:
		 * 		当Row中字段值改变后触发事件
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}dojo.connect(rowset,'onItemChanged',
		 * |		function(row,name,value,index){
		 * |			alert(row.getItemValue("attr_empno"));
		 * |		}
		 * |	);
		 * |	rowset.setItemValue(0,"attr_empno","1003");
		 * 		${1}绑定了rowset的onItemChanged事件,参数分别为row,字段名,字段值,索引
		 * @param 
		 * 		{unieap.ds.Row} thisRow
		 * 		 RowSet的当前操作行
		 * @param 
		 * 		{string} itemName
		 * 		 Row中某字段的名称
		 * @param 
		 * 		{object} value
		 * 		 该字段的值
		 * @param 
		 * 		{number} index
		 * 		 该行所在的索引
		 */
		onItemChanged: function (thisRow, itemName, value, index){},
		
		/**
		 * @summary:
		 * 		当RowSet中添加一行新的记录Row时的监听处理函数
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}dojo.connect(rowset,'onBeforeAddRow',
		 * |		function(row,rowset){
		 * |			alert('onBeforeAddRow');		
		 * |		}
		 * |	);
		 * |	var data = {attr_empno:"1003",NAME:"张柏芝",attr_job:"演员"};
		 * |		rowset.addRow(data);
		 * 		${1}绑定了rowset的onBeforeAddRow事件,参数分别为row,rowset
		 * @param:
		 * 		 {unieap.ds.Row} row
		 * 		 被添加的Row对象
		 * @param 
		 * 		{unieap.ds.RowSet} rowSet
		 * 		 当前RowSet对象
		 */
		onBeforeAddRow:function(row,rowSet){
			
		},
		
		/**
		 * @summary:
		 * 		当RowSet中添加一行新的记录Row后的监听处理函数
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}dojo.connect(rowset,'onAfterAddRow',
		 * |		function(row,rowset){
		 * |			alert('onAfterAddRow');		
		 * |		}
		 * |	);
		 * |	var data = {attr_empno:"1003",NAME:"张柏芝",attr_job:"演员"};
		 * |		rowset.addRow(data);
		 * 		${1}绑定了rowset的onAfterAddRow事件,参数分别为row,rowset
		 * @param:
		 * 		 {unieap.ds.Row} row
		 * 		 被添加的Row对象
		 * @param 
		 * 		{unieap.ds.RowSet} rowSet
		 * 		 当前RowSet对象
		 */
		onAfterAddRow:function(row,rowSet){
			
		},
		/**
		 * @summary:
		 * 		当RowSet中增加多行记录Row时的监听处理函数
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([]);
		 * |	${1}dojo.connect(rowset,'onBeforeAddRows',
		 * |		function(rows){
		 * |			alert('onBeforeAddRows');		
		 * |		}
		 * |	);
		 * |	var datas=[]
		 * |	for(var i=0;i<10;i++){
		 * |	    datas.push({attr_empno:"100"+i,NAME:"name_"+i,attr_job:"演员_"+i});
		 * |	}
		 * |	rowset.addRows(datas);
		 * 		${1}绑定了rowset的onBeforeAddRows事件,参数为row数组
		 * @param 
		 * 		{array} rows
		 * 		 被添加的Row对象数组
		 */
		onBeforeAddRows:function(rows){
			
		},
		
		/**
		 * @summary:
		 * 		当RowSet中增加多行记录Row后的监听处理函数
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([]);
		 * |	${1}dojo.connect(rowset,'onAfterAddRows',
		 * |		function(rows){
		 * |			alert('onAfterAddRows');		
		 * |		}
		 * |	);
		 * |	var datas=[]
		 * |	for(var i=0;i<10;i++){
		 * |	    datas.push({attr_empno:"100"+i,NAME:"name_"+i,attr_job:"演员_"+i});
		 * |	}
		 * |	rowset.addRows(datas);
		 * 		${1}绑定了rowset的onAfterAddRows事件,参数为row数组
		 * @param 
		 * 		{array} rows
		 * 		 被添加的Row对象数组
		 */
		onAfterAddRows:function(rows){
			
		},
		
		/**
		 * @summary：
		 * 		当RowSet中删除一行记录Row时的监听处理函数
		 * @example
		 *  |	var rowset = new unieap.ds.RowSet([
		 *  |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
	 	 *  |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 *  |	]);
		 *  |	${1}dojo.connect(rowset,'onBeforeDeleteRow',
		 *  |		function(row,rowset){
		 *  |			alert('onBeforeDeleteRow');		
		 *  |		}
		 *  |	);
		 *  |	rowset.deleteRow(0);
		 * 		${1}绑定了rowset的onBeforeDeleteRow事件,参数为row,rowset
		 * @param 
		 * 		{unieap.ds.Row} row 
		 * 		被删除的Row对象
		 * @param 
		 * 		{unieap.ds.RowSet} rowSet 
		 * 		当前RowSet对象
		 */
		onBeforeDeleteRow:function(row,rowSet){
		},
		
		/**
		 * @summary：
		 * 		当RowSet中删除一行记录Row后的监听处理函数
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}dojo.connect(rowset,'onAfterDeleteRow',
		 * |		function(row,rowset){
		 * |			alert('onAfterDeleteRow');		
		 * |		}
		 * |	);
		 * |	rowset.deleteRow(0);
		 * 		${1}绑定了rowset的onAfterDeleteRow事件,参数为row,rowset
		 * @param 
		 * 		{unieap.ds.Row} row 
		 * 		被删除的Row对象
		 * @param 
		 * 		{unieap.ds.RowSet} rowSet 
		 * 		当前RowSet对象
		 */
		onAfterDeleteRow:function(row,rowSet){			
		},
		
		/**
		 * @summary：
		 * 		当RowSet中删除多行记录Row时的监听处理函数
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}dojo.connect(rowset,'onBeforeDeleteRows',
		 * |		function(data){
		 * |			alert('onBeforeDeleteRows');		
		 * |		}
		 * |	);
		 * |	rowset.deleteRows([0,1]);
		 * 		${1}绑定了rowset的onBeforeDeleteRows事件,参数为索引组成的数组
		 * @param 
		 * 		{array} data
		 * 		 行下标，形如:[1,0,5,4,3];
		 */
		onBeforeDeleteRows:function(data){
		},
		
		/**
		 * @summary：
		 * 		当RowSet中删除多行记录Row后的监听处理函数
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}dojo.connect(rowset,'onAfterDeleteRows',
		 * |		function(data){
		 * |			alert('onAfterDeleteRows');		
		 * |		}
		 * |	);
		 * |	rowset.deleteRows([0,1]);
		 * 		${1}绑定了rowset的onAfterDeleteRows事件,参数为索引组成的数组
		 * @param 
		 * 		{array} data
		 * 		 行下标，形如:[1,0,5,4,3];
		 */
		onAfterDeleteRows:function(){
		},
		
		/**
		 * @summary：
		 * 		当RowSet中删除所有行的监听处理函数
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}dojo.connect(rowset,'onBeforeDeleteAllRows',
		 * |		function(){
		 * |			alert('onBeforeDeleteAllRows');		
		 * |		}
		 * |	);
		 * |	rowset.deleteAllRows();
		 * 		${1}绑定了rowset的onBeforeDeleteAllRows事件
		 */
		onBeforeDeleteAllRows:function(){
		},
		
		/**
		 * @summary：
		 * 		当RowSet中删除所有行后的监听处理函数
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}dojo.connect(rowset,'onAfterDeleteAllRows',
		 * |		function(){
		 * |			alert('onAfterDeleteAllRows');		
		 * |		}
		 * |	);
		 * |	rowset.deleteAllRows();
		 * 	${1}绑定了rowset的onAfterDeleteAllRows事件
		 */
		onAfterDeleteAllRows:function(){
		},
		
		
		/**
		 * @summary:
		 * 		当RowSet中删除被选中的多行记录Row时的监听处理函数
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	              ${1} {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20,_s:true},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${2}dojo.connect(rowset,'onBeforeDeleteSelectedRows',
		 * |		function(arr,rowset){
		 * |			alert('onBeforeDeleteSelectedRows');		
		 * |		}
		 * |	);
		 * |	rowset.deleteSelectedRows();
		 * 		${1}_s值为true表示此行被选中
		 * 		${2}绑定了rowset的onBeforeDeleteSelectedRows事件
		 * @param 
		 * 		{array} arr  
		 * 		被删除的Row对象的集合(array中对象类型为unieap.ds.Row)
		 * @param 
		 * 		{unieap.ds.RowSet} rowSet 
		 * 		当前RowSet对象
		 */
		onBeforeDeleteSelectedRows:function(arr,rowSet){
		},
		
		/**
		 * @summary:
		 * 		当RowSet中删除被选中的多行记录Row后的监听处理函数
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	              ${1} {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20,_s:true},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${2}dojo.connect(rowset,'onAfterDeleteSelectedRows',
		 * |		function(arr,rowset){
		 * |			alert('onAfterDeleteSelectedRows');		
		 * |		}
		 * |	);
		 * |	rowset.deleteSelectedRows();
		 * 		${1}_s值为true表示此行被选中
		 * 		${2}绑定了rowset的onAfterDeleteSelectedRows事件
		 * @param 
		 * 		{array} arr  
		 * 		被删除的Row对象的集合(array中对象类型为unieap.ds.Row)
		 * @param 
		 * 		{unieap.ds.RowSet} rowSet 
		 * 		当前RowSet对象
		 */			
		onAfterDeleteSelectedRows:function(arr,rowSet){
		},
		
		/**
		 * @summary:
		 * 		回滚RowSet中修改的数据前触发
		 * @param:
		 * 		{number} inRowIndex 要回滚的行号(如果用户直接调用discardUpdate方法不传入参数则inRowIndex不存在)
		 */
		onBeforeDiscardUpdate:function(inRowIndex){},
		
		/**
		 * @summary:
		 * 		回滚RowSet中修改的数据后触发
		 */
		onAfterDiscardUpdate:function(){},
		
		/**
		 * @summary:
		 * 		RowSet进行过滤后的监听处理函数
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20,_s:true},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}dojo.connect(rowset,'onFilter',
		 * |		function(){
		 * |			alert('onFilter');		
		 * |		}
		 * |	);
		 * | 	rowset.doFilter('NAME','like','^黄',true);
		 * 		${1}绑定了rowset的onFilter事件
		 * @param: 
		 * 		{object} unieap.ds.RowSet
		 */
		onFilter : function(rowSet){
			
		},
		
		/**
		 * @summary:
		 * 		RowSet进行排序后的监听处理函数
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"9000",deptno:20,_s:true},         
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
	 	 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
		 * |	]);
		 * |	${1}dojo.connect(rowset,'onSort',
		 * |		function(){
		 * |			alert('onSort');		
		 * |		}
		 * |	);
		 * |	rowset.sort('attr_sal',1,'number');
		 * 		${1}绑定了rowset的onSort事件
		 * @param: 
		 * 		{object} unieap.ds.RowSet
		 */
		onSort:function(rowSet){
			
		},
		
		/**
		 * @summary:
		 * 		RowSet执行resetUpdate操作后的监听处理函数
		 * @example
		 * |	var rowset = new unieap.ds.RowSet([
	 	 * |			                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |			                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |			                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * |	${1}dojo.connect(rowset,'onResetUpdate',
		 * |		function(){
		 * |			alert('onResetUpdate');		
		 * |		}
		 * |	);
		 * |	rowset.setItemValue(0,"NAME","茜茜公主");
		 * |	rowset.deleteRow(2);
		 * |	rowset.resetUpdate(); 
		 * 		${1}绑定了rowset的onResetUpdate事件
		 * @param 
		 * 		{object} unieap.ds.RowSet
		 */
		onResetUpdate:function(rowset){
			
		},
		
		/**
		 * @summary:
		 * 		多列排序
		 * @param 
		 * 		{array|object} data 
		 * 		排序条件
		 * 		形如：[{name:"id",asc:1,dataType:"number"},{name:"dept",asc:-1}]
		 * @param
		 * 		 {string} bufferName 
		 * 		缓冲区名称
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * |	${1}rowset.sorts([{name:"attr_empno",asc:1,dataType:"number"},{name:"NAME",asc:-1}],"primary");
		 * |	unieap.debug(rowset);
		 * ${1}asc:1表示升序；-1表示降序
		 */
		sorts : function(data,bufferName){},
		
		/**
		 * @summary:
		 * 		对当前RowSet对象的主缓冲区内所有行进行排序
		 * @example：
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"9700"},                
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * |	${1}rowset.sort('attr_sal',1,'number');
		 * |	unieap.debug(rowset);
		 * 	${1}	对rowset的attr_sal列以number类型进行升序排序
		 * @param 
		 * 		{string} name
		 * 		 待排序的字段名称
		 * @param 
		 * 		{number} asc 
		 * 		1：升序，-1：降序
		 * @param 
		 * 		{string} bufferName
		 * 		 缓冲区名称
		 * @param 
		 * 		{number|String} dataType
		 * 		 该字段的类型
		 */
		sort : function(name,asc,dataType,bufferName){},
		
		/**
		 * @summary:
		 * 		计算某列的合计值
		 * @description:
		 * 		注意只有数字类型的字段才可以求和
		 * @param 
		 * 		{string} name
		 * 		 列名
		 * @param 
		 * 		{string} pattern 
		 * 		格式化样式
		 * @param 
		 * 		{string|null} bufferName
		 * 		 缓冲区名称，默认为primary
		 * @return 
		 * 		{number}
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * |	${1}var count=rowset.sum("attr_sal","###,###.00","primary");
		 * |	alert(count);
		 * ${1}形如“###,###.00”
		 */
		sum : function(name,pattern,bufferName){},
		
		/**
		 * @summary:
		 * 		计算某列的最大值
		 * @param 
		 * 		{string} name 
		 * 		列名
		 * @param 
		 * 		{string|null} bufferName 
		 * 		缓冲区名称，默认为primary
		 * @return 
		 * 		{number}
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * |	${1}alert(rowset.max("attr_sal"));
		 * |	或
		 * |	alert(rowset.max("attr_sal","primary")); 
	 	 * ${1} 本例attr_sal列的最大值为：9500
		  */
		max : function(name,bufferName){},
		
		/**
		 * @summary:
		 * 		计算某列的最小值
		 * @param 
		 * 		{string} name 
		 * 		列名
		 * @param 
		 * 		{string|null} bufferName
		 * 		 缓冲区名称，默认为primary
		 * @return 
		 * 		{number}
		 * @example:
		 * | 	var rowset = new unieap.ds.RowSet([
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * |	alert(rowset.min("attr_sal"));
		 * |	或
		 * |	${1}alert(rowset.min("attr_sal","primary"));                  
		 * ${1}本例attr_sal列的最小值为：1001
		 */
		min : function(name,bufferName){},
		
		/**
		 * @summary:
		 * 		计算某列的平均值
		 * @param 
		 * 		{string} name
		 * 		 列名
		 * @param 
		 * 		{string} pattern
		 * 		 格式化样式
		 * @param 
		 * 		{string|Null} bufferName
		 * 		 缓冲区名称，默认为primary
		 * @return 
		 * 		{number}
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"},
		 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500"}
		 * |	]);
		 * |	rowset.avg("attr_sal","###.##","primary");
		 */
		avg : function(name,pattern,bufferName){},
		
		/**
		 * @summary:
		 * 		页面过滤操作
		 * @param 
		 * 		{string} name 
		 * 		列名称，如果为null则清空过滤缓冲区
		 * @param 
		 * 		{string} relation 
		 * 		比较表达式
		 * @param 
		 * 		{string|number} 
		 * 		查询值
		 * @param 
		 * 		{boolean|string} ignoreCase|dataFormat
		 * 		字符串是否区分大小写|日期的格式内容
		 * @example:
		 * | 	var filter={}
		 * |	${1}filter.pattern="${conditionA} && (${conditionB} || ${conditionC})"
		 * |	filter.condition={
		 * |		conditionA:{name : "empname",relation : "like", value:"^杨", ignoreCase:true},
		 * |		conditionB : {name : "deptno",relation : ">=", value:id},
		 * |		conditionC : {name : "hirdate",relation : "!=", value:new Date(2007,10,10),dataFormat:"yyyy-MM-dd"}
		 * |	}
		 * |	rowset.doFilter(filter);
		 * 		${1}多个条件时
		 *  @example：
		 * | 	${2}rowset.doFilter('empname','like','^杨',true);
		 * 		${2}单个条件
		 * 
		 */
		doFilter : function(name,relation,value,ignoreCase){},
		
		/**
		 * @summary:
		 * 		获取满足条件的行索引数组
		 * @description：
		 * 		参数传递用法等同于doFilter调用
		 * @param:
		 * 		{object} data
		 * @return:
		 * 		{array}
		 * @example:
		 * |	${1}var rows = rowset.getSatisfiedFilterRows({name : "NAME",relation : "like", value:'齐'});
		 * ${1}单条件
		 * @example:
		 * |	var filter={} 
		 * |	${2}filter.pattern="${conditionA} && (${conditionB} || ${conditionC})" 
		 * |	filter.condition={ 
		 * |	                   conditionA:{name : "empname",relation : "like", value:"^杨", ignoreCase:true}, 
		 * |	                   conditionB:{name : "deptno",relation : ">=", value:id}, 
		 * |	                   conditionC:{name : "hirdate",relation : "!=", value:new Date(2007,10,10),dataFormat:"yyyy-MM-dd"} 
		 * |	                 } 
		 * |	var rows = rowset.getSatisfiedFilterRows(filter);
		 * ${2}多条件
		 */
		getSatisfiedFilterRows : function(data){},
		
		/**
		 * @summary
		 * 		获取指定列的MetaData对象
		 * @param 
		 * 		{string} name
		 * 		 列名称
		 * @return 
		 * 		{object} 
		 * 		MetaData对象
		 * @example:
		 *	 |	var meta=rowset.getMetaData("NAME");
		 *	 |	unieap.debug(meta);
		 */
		getMetaData : function(name){},
		
		/**
		 * @summary：
		 * 		获取rowSetName，如果是自定义SQL则返回statementName
		 * @return 
		 * 		{string}
		 * @example:
		 * |	rowset.getName();
		 */
		getName : function(){},
		
		/**
		 * @summary:
		 * 		设置dataStore
		 * @param 
		 * 		{unieap.ds.DataStore} dataStore
		 * @example:
		 * 	|	rowset.setDataStore(dataStore);
		 */
		setDataStore : function(dataStore){},
		
		/**
		 * @summary:
		 * 		得到DataStore
		 * @return:
		 * 		{unieap.ds.DataStore} 
		 * @example:
		 * |	rowset.getDataStore();
		 */
		getDataStore : function(){},
		
		/**
		 * @summary:
		 * 		更新一行数据
		 * @param 
		 * 		{number} rowIndex  
		 * 		行索引
		 * @param  
		 * 		{unieap.ds.Row} row
		 * 		 行对象
		 * @example:
		 *  |	var rowset = new unieap.ds.RowSet([
		 *  |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},
		 *  |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_s:true},
		 *  |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}
		 *  |	]);
		 *  |	var row = rowset.getRow(0);
		 *  |	rowset.updateRow(1,row);
		 *  |	unieap.debug(rowset);
		 */
		updateRow : function(rowIndex,row){},
		
		/**
		 * @summary:
		 * 		设置指定行的某列值
		 * @param 
		 * 		{number} rowIndex 
		 * 		行下标
		 * @param 
		 * 		{string} name 
		 * 		列名
		 * @param 
		 * 		{string|Number|Null} value
		 * 		 列值
		 * @param 
		 * 		{sString} bufferName 
		 * 		缓冲区名称
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"},
		 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500"}
		 * |	]);
		 * |	rowset.setItemValue(0,"NAME","黄日华");
		 * |	unieap.debug(rowset);
		 */
		setItemValue : function(rowIndex,name, value,bufferName){},
		
		/**
		 * @summary:
		 * 		设置指定行的某列日期值
		 * @param 
		 * 		{number} rowIndex
		 * 		 行下标
		 * @param 
		 * 		{string} name
		 * 		 列名
		 * @param 
		 * 		{Date} value
		 * 		 列值
		 * @param 
		 * 		{string} bufferName
		 * 		 缓冲区名称
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"}
		 * |	]);
		 * |	var date = new Date();
		 * |	${1}rowset.setDate(0,"attr_hiredate",date); 
		 * |	unieap.debug(rowset);  
		 * ${1}设置rowset中行索引为0的row的“attr_hiredate”列的值为date
		 */
		setDate : function(rowIndex,name, value,bufferName){},
		
		/**
		 * @summary:
		 * 		获得指定行的某列值
		 * @param 
		 * 		{number} rowIndex
		 * 		 行下标
		 * @param 
		 * 		{string} name
		 * 		 列名
		 * @param 
		 * 		{string} bufferName
		 * 		缓冲区名称
		 * @return 
		 * 		{object} 
		 * 		列值
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"}
		 * |	]);
		 * |	alert(rowset.getItemValue(0,"NAME","primary"));
		 */
		getItemValue : function(rowIndex,name, bufferName){},
		
		/**
		 * @summary:
		 * 		获得指定行的某列日期值
		 * @param 
		 * 		{number} rowIndex
		 * 		 行下标
		 * @param 
		 * 		{string} name
		 * 		 列名
		 * @param 
		 * 		{string} bufferName 
		 * 		缓冲区名称
		 * @return 
		 * 		{Date|null}
		 * 		 列值
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",attr_hiredate:1260855744997}
		 * |	]);
		 * |	${1}rowset.getDate(0,"attr_hiredate","primary"); 
		 * ${1}获取 主缓冲区 行索引为0的row的“attr_hiredate”字段的日期值
		 */
		getDate : function(rowIndex,name, bufferName){},
		
		/**
		 * @summary:
		 * 		获得指定行的某列整型值
		 * @param 
		 * 		{number} rowIndex
		 * 		 行下标
		 * @param 
		 * 		{string} name 
		 * 		列名
		 * @param 
		 * 		{string} bufferName
		 * 		缓冲区名称
		 * @return 
		 * 		{int|null} 
		 * 		列值
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",attr_hiredate:1260855744997}
		 * |	]);
		 * |	alert(rowset.getInt(0,"attr_sal","primary"));
		 */
		getInt : function(rowIndex,name,bufferName){},
		
		/**
		 * @summary:
		 * 		获得指定行的某列浮点值
		 * @param 
		 * 		{number} rowIndex 
		 * 		行下标
		 * @param 
		 * 		{string} name
		 * 		 列名
		 * @param 
		 * 		{string} bufferName
		 * 		 缓冲区名称
		 * @return 	
		 * 		{float|null} 
		 * 		列值
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",attr_hiredate:1260855744997}
		 * |	]);
		 * |	alert(rowset.getFloat(0,"attr_sal","primary"));
		 */
		getFloat : function(rowIndex,name,bufferName){},
		
		/**
		 *@summary:
		 *		 获得指定行的某列原始值
		 * @param 
		 * 		{number} rowIndex 
		 * 		行下标
		 * @param 
		 * 		{string} name
		 * 		 列名
		 * @param 
		 * 		{string} bufferName
		 * 		 缓冲区名称
		 * @return 	
		 * 		{object} 
		 * 		列值
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"},
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}
		 * |	]);
		 * |	rowset.setItemValue(0,"NAME","郭靖");
		 * |	alert("原始值为:"+rowset.getItemOrigValue(0,"NAME","primary")+"\n"+"当前值为："+rowset.getItemValue(0,"NAME"));
		 */
		getItemOrigValue : function(rowIndex,name,bufferName){},
		
		/**
		 * @summary:
		 * 		获得指定行的修改状态
		 * @param 
		 * 		{number} rowIndex 
		 * 		行下标
		 * @param 
		 * 		{string} bufferName
		 * 		 缓冲区名称
		 * @return 
		 * 		{number} 
		 * 		新增、修改、未变化
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"9700",_t:1},                
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * | 	${1}alert(rowset.getRowStatus(0,"primary"));
		 *  ${1}获取主缓冲区中行索引为0的修改状态，返回1为新增、2为未修改、3为已修改
		 */
		getRowStatus : function (rowIndex,bufferName){},
		
		/**
		 * @summary:
		 *		 设置指定行的修改状态
		 * @param 
		 * 		{number} rowIndex 
		 * 		行下标
		 * @param 
		 * 		{number} status
		 * 		新增、修改、未变化
		 * @param 
		 * 		{string} bufferName
		 * 		 缓冲区名称
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"9700",_t:1},                
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * | 	${1}rowset.setRowStatus(0,3,"primary");
		 * |	unieap.debug(rowset);
		 *  ${1}修改primary缓冲区第0行为新增状态
		 */
		setRowStatus : function (rowIndex,status,bufferName){},
		
		/**
		 * @summary:
		 * 		指定行是否选中
		 * @param 
		 * 		{number} rowIndex 
		 * 		行下标
		 * @param 
		 * 		{string} bufferName
		 * 		 缓冲区名称
		 * @return 
		 * 		{boolean} 
		 * @example:
		 * | 	var rowset = new unieap.ds.RowSet([
		 * |	                ${1} {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},    
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}                     
		 * |	]);
		 * |	${2}alert(rowset.isRowSelected(0));
		 * |	或
		 * |	alert(rowset.isRowSelected(0,"primary"));   
		 * ${1}状态位_s=true，表示该row被选中
		 * ${2}本例返回true
		 */
		isRowSelected : function (rowIndex,bufferName){},
		
		/**
		 * @summary:
		 * 		设置指定行的选中状态
		 * @param 
		 * 		{number} rowIndex 
		 * 		行下标
		 * @param 
		 * 		{boolean} selected 
		 * 		true/false
		 * @param 
		 * 		{string} bufferName 
		 * 		缓冲区名称
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
	 	 * |	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
		 * |	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 * |	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
		 * |	]);
		 * |	rowset.setRowSelected(0,true);
		 * |	unieap.debug(rowset);
		 */
		setRowSelected : function (rowIndex,selected,bufferName){},
		
		/**
		 * @summary:
		 * 		清空指定行的数据
		 * @param 
		 * 		{number} rowIndex
		 * 		行下标
		 * @param 
		 * 		{string} bufferName
		 * 		缓冲区名称
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},
		 * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"},
		 * |	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500"}
		 * |	]);
		 * |	unieap.debug(rowset);
		 * |	rowset.clear(0,"primary");
		 * |	unieap.debug(rowset);
		 */
		clear : function(rowIndex,bufferName){},
		
		/**
		 * @summary：
		 * 		RowSet收集策略
		 * @param：
		 * 		 {string} pattern
		 * 		 收集表达式
		 * @return
		 * 		 {unieap.ds.RowSet}
		 * @example:
		 * |	var rowset = new unieap.ds.RowSet([
		 * |	               ${1}{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},         
		 * |	               ${2}{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:1},      
		 * |	               ${3}{attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",_t:3}           
		 * |	]);
	 	 * |	
		 * |	${4}var rowset1 = rowset.collect("select");              
		 * |	${5}var rowset2 = rowset.collect("insert");              
		 * |	${6}var rowset3 = rowset.collect("update");              
		 * |	${7}var rowset4 = rowset.collect("delete"); 
		 * |	${8}var rowset5 = rowset.collect("auto");              
		 * |	${9}var rowset6 = rowset.collect("none");              
		 * |	${10}var rowset7 = rowset.collect("all");              
		 * ${1}被选中的行(用_s:true来标识)
		 * ${2}新增的行(用_t:1来标识)
		 * ${3}更新的行(用_t:3来标识)
		 * ${4}收集选中行
		 * ${5}收集新增行
		 * ${6}收集更新行
		 * ${7}收集delete缓冲区的行
		 * ${8}收集收集改变数据
		 * ${9}不收集任何数据
		 * ${10}收集所有的数据
		 */
		collect : function(pattern){},
		
		
		append : function(rowSet,coverage){},
		
		/**
		* @summary:
		* 		克隆RowSet
		* @description：
		* 		克隆一个新的RowSet
		* @example:
		*  |	var newRowSet = oldRowSet.clone();
		*/
		clone : function(){},
		
		/**
		* @summary:
		* 		根据RowSet对象行集记录自动生成完整的树形结构	
		* @description：
		*		遍历一边循环生成树结构，结构形如：{data:{id:"rootId",label:"根节点"},children:[{...},{...}]}
		* @param：
		* 		{object} data
		* 		传入的构造树的必要条件，id树唯一标识字段名称、parent父节点字段名称、root树根节点标识
		* @return:
		*		返回树根节点
		* @example:
		* |	${1}var treeRowset = new unieap.ds.RowSet([
		* |	                  {nodeID:"1000",parentID:"", title:"黄蓉",isLeaf:false},
		* |	                  {nodeID:"1001",parentID:"1000", title:"齐衷斯",isLeaf:true},
		* |	                  {nodeID:"1002",parentID:"1000", title:"张韶涵",isLeaf:true}
		* |	]);
		* |	
		* |	unieap.debug(treeRowset.generateTreeSet({id:"nodeID",parent:"parentID",label:"title",leaf:"isLeaf",root:"1000"}));
		* ${1}定义一个RowSet对象
		*  @img：
	    * 		images/ds/rowSet/generateTreeSet.png
		*/
		generateTreeSet : function(data){}
});
}