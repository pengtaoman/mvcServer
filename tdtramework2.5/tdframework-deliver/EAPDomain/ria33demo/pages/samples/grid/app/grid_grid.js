
			dojo.addOnLoad(function(){
				dp.SyntaxHighlighter.HighlightAll('code');
			});
			
			var deptStore = new unieap.ds.DataStore('deptStore', [
				{attr_deptno:"10"},
				{attr_deptno:"30"}
			]);
			var emp1 = new unieap.ds.DataStore('emp1', [
				{attr_empno:"1",NAME:"小菊菊",master:1,married:1,attr_job:"项目经理",attr_sal:1080,attr_deptno:"10",attr_province:12,attr_city:"3"},
				{attr_empno:"2",NAME:"大菊菊",master:0,married:0,attr_job:"软件工程师",attr_hiredate:1205917947270,attr_sal:50000,attr_deptno:"10",attr_province:"12",attr_city:"1"},
				{attr_empno:"3",NAME:"开心菊菊",master:0,married:0,attr_job:"软件工程师",attr_hiredate:1205917947270,attr_sal:3200,attr_deptno:"10",attr_province:"11",attr_city:"2"},
				{attr_empno:"4",NAME:"磊点赵",master:0,married:1,attr_job:"RIA主架构师",attr_hiredate:1205917947270,attr_sal:5432,attr_deptno:"10",attr_province:"12",attr_city:"2"},
				{attr_empno:"5",NAME:"老斌斌",master:0,married:0,attr_job:"产品经理",attr_hiredate:1205917947270,attr_sal:2222,attr_deptno:"10",attr_province:"11",attr_city:"1"},
				{attr_empno:"6",NAME:"杨作种",master:1,married:1,attr_job:"项目经理",attr_sal:1080,attr_deptno:"10",attr_province:"12",attr_city:"3"},
				{attr_empno:"7",NAME:"杨仔仔",master:0,married:0,attr_job:"软件工程师",attr_hiredate:1205917947270,attr_sal:50000,attr_deptno:"10",attr_province:"12",attr_city:"1"},
				{attr_empno:"8",NAME:"杨咩咩",master:0,married:0,attr_job:"软件工程师",attr_hiredate:1205917947270,attr_sal:3200,attr_deptno:"10",attr_province:"11",attr_city:"2"},
				{attr_empno:"9",NAME:"咩咩咩",master:0,married:1,attr_job:"RIA主架构师",attr_hiredate:1205917947270,attr_sal:5432,attr_deptno:"10",attr_province:"12",attr_city:"2"},
				{attr_empno:"10",NAME:"小白杨",master:0,married:0,attr_job:"产品经理",attr_hiredate:1205917947270,attr_sal:2222,attr_deptno:"10",attr_province:"11",attr_city:"1"},
				{attr_empno:"11",NAME:"陈旭杰",master:1,married:1,attr_job:"项目经理",attr_sal:1080,attr_deptno:"10",attr_province:"12",attr_city:"3"},
				{attr_empno:"12",NAME:"赵斌",master:0,married:0,attr_job:"软件工程师",attr_hiredate:1205917947270,attr_sal:50000,attr_deptno:"10",attr_province:"12",attr_city:"1"},
				{attr_empno:"13",NAME:"张卫滨",master:0,married:1,attr_job:"RIA主架构师",attr_hiredate:1205917947270,attr_sal:5432,attr_deptno:"10",attr_province:"12",attr_city:"2"},
				{attr_empno:"14",NAME:"赵磊",master:0,married:0,attr_job:"产品经理",attr_hiredate:1205917947270,attr_sal:2222,attr_deptno:"10",attr_province:"11",attr_city:"1"}
			]);
			var emp2 = new unieap.ds.DataStore('emp2', [
				{attr_empno:"31",NAME:"张三",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"30"},
				{attr_empno:"32",NAME:"李四",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"30"},
				{attr_empno:"33",NAME:"王五",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"30"},
				{attr_empno:"34",NAME:"博六",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30"},
				{attr_empno:"35",NAME:"随便",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30"}
			]);
			dataCenter.addDataStore(deptStore);
			dataCenter.addDataStore(emp1);
			dataCenter.addDataStore(emp2);
			
			function changeStore(inRowIndex) {
				var dept = unieap.byId("deptGrid").getBinding().getRowSet().getItemValue(inRowIndex, "attr_deptno");
				if (dept=="30") {
					unieap.byId("empGrid").getBinding().setDataStore(unieap.getDataStore("emp2"));
				} else if (dept=="10") {
					unieap.byId("empGrid").getBinding().setDataStore(unieap.getDataStore("emp1"));
				}
			}