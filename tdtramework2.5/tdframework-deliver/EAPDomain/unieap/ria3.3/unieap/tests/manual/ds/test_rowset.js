 dojo.require("unieap.ds");
 var rowset = new unieap.ds.RowSet({
        'primary': [{
            'primary': 'primary1'
        },{
			'primary': 'primary2'
		},{
            'primary': 'primary3'
        },{
            'primary': 'primary4'
        },{
            'primary': 'primary5'
        },{
            'primary': 'primary6'
        }],
        'filter': [{
            'filter': 'filter1'
        }]
    });
	function test(){
		unieap.debug(rowset);
	}
	function test1(){
		rowset.rowsCopy(0,1,unieap.ds.Buffer.PRIMARY,rowset,1,unieap.ds.Buffer.PRIMARY);
		unieap.debug(rowset);
	}
	function test2(){
		var rowset2 = new unieap.ds.RowSet({'primary':[],'filter':[]});
		rowset.rowsCopy(1,2,unieap.ds.Buffer.PRIMARY,rowset2,0,unieap.ds.Buffer.FILTER);
		unieap.debug(rowset2);
	}
		var rsData = [
 					 {id:'1',label:"节点",parentID:"",index:"8"},
 					 {id:'2',label:"10011",parentID:"1",index:"0"},
 					 {id:'3',label:"1002",parentID:"",index:"1"},
 					 {id:'4',label:"10012",parentID:"3",index:"1"},
 					 {id:'5',label:"10013",parentID:"3",index:"3"},
 					 {id:'6',label:"10014",parentID:"3",index:"2"},
 					 {id:'7',label:"100141",parentID:"6",index:"1"},
 					 {id:'8',label:"100142",parentID:"4",index:"0"},
 					 {id:'9',label:"10015",parentID:"3",index:"0"},
 					 {id:'1006',label:"节点6",parentID:"",index:"2"},
 					 {id:'1007',label:"节点7",parentID:"",index:"3"}
				   ];
		var rs = new unieap.ds.RowSet(rsData);
	function treetest(){
		unieap.debug(rs);
	}
	function generateTreeSet(){
	
		var root=rs.generateTreeSet({id:"id",parent:"parentID",root:"3"});	
		unieap.debug(root);	   
	}
	function test_getTotalCount(){
		var rowset = new unieap.ds.RowSet({'primary':[
			 	                {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
			 	                {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
			 	                {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
			 	],'filter':[{attr_empno:"1003",NAME:"牛牛",attr_job:"演员",attr_sal:"104"}]});
//		rowset.resetInitialCount(); 
//		unieap.debug(rowset);
		alert(rowset.getTotalCount());
	}
	function test_reset(){
			var rowset = new unieap.ds.RowSet([
			 	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
			                 	 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
			 	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
			 	]);
			 	unieap.debug(rowset);
			 	rowset.reset();
			 	unieap.debug(rowset);
	}
	function test_insertRow(){
			var rowset = new unieap.ds.RowSet([
		 	 			                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
			 			                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
			 			                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
			 	]);
			  	var data = {attr_empno:"1003",NAME:"杨康",attr_job:"木匠",attr_sal:"888"};
			 	rowset.insertRow(data,2);
			 	unieap.debug(rowset);
	}
	function test_deleteRow(){
			var rowset = new unieap.ds.RowSet([
		 	 			                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
			 			                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
			 			                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
			 	]);
			 	rowset.deleteRow(0); 
			 	unieap.debug(rowset);
	}
	function test_deleteRows(){
			var rowset = new unieap.ds.RowSet([
		 	 			                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
			 			                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
			 			                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
			 	]);
			 	 rowset.deleteRows([0,2]);
			 	unieap.debug(rowset);
	}
	function test_deleteAllRows(){
		var rowset = new unieap.ds.RowSet([
		 	 			                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
			 			                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
			 			                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
			 	]);
			  	rowset.deleteAllRows();
			 	unieap.debug(rowset);
	}
	function test_unDeleteRow(){
		var rowset = new unieap.ds.RowSet({'delete':[
			 	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
			 	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
			 	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
			 	]});
			 	unieap.debug(rowset);
			 	rowset.unDeleteRow(1);
			 	unieap.debug(rowset);
		
	}
	function test_unDeleteAll(){
		var rowset = new unieap.ds.RowSet({'delete':[
			 	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
			 	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
			 	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
			 	]});
			 	unieap.debug(rowset);
			 	rowset.unDeleteAll();
			 	unieap.debug(rowset);
	}
	function test_rowDiscard(){
			var rowset = new unieap.ds.RowSet({'primary':[
			 	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
			 	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
			 	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
			 	]});
				rowset.rowsDiscard(0,2,unieap.ds.Buffer.PRIMRY); 
				unieap.debug(rowset);
	}
	function test_selectRows(){
		var rowset = new unieap.ds.RowSet([
			     				{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
			    					{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
			 					{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
			 		]);
			 		rowset.selectRows(true,0,2);
			 		unieap.debug(rowset);
	}
	function test_getSelectedRowIndexs(){
		var rowset = new unieap.ds.RowSet([
			 			{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},                 
			 			{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_s:true},
			 			{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}
			 	]);
			 	var indexs=rowset.getSelectedRowIndexs("primary");
			 	alert(indexs);
	}
	function test_foreach(){
		var rowset = new unieap.ds.RowSet([
			 	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},         
			 	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
		 	 	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500"}           
			 	]);
			 	rowset.forEach(function(row){
			 		row.setItemValue('dept',20);
			 	})
			 	unieap.debug(rowset);
	}
	function test_every(){
		var rowset = new unieap.ds.RowSet([
			 	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
			 	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
		 	 	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
			 	]);
			 	var isSatisfied=rowset.every(function(row){
			 		return row.getItemValue('deptno')==20;
			 	})
			 	alert(isSatisfied);
	}
	function test_some(){
			var rowset = new unieap.ds.RowSet([
			 	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
			 	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
		 	 	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
			 	]);
			 	var isSatisied=rowset.some(function(row){
			 		return row.getItemValue('deptno')==20;
			 	})
			 	alert(isSatisied);
	}
	function test_forEachFilter(){
		var rowset = new unieap.ds.RowSet([
			 	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
			 	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
		 	 	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
			 	]);
			 	var newrs=rowset.forEachFilter(function(row){
			 		return row.getItemValue('deptno')==20;
			 	})
				unieap.debug(newrs);
	}
	function test_onItemChanging(){
			var rowset = new unieap.ds.RowSet([
			 	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
			 	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
		 	 	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
			 	]);
			 	dojo.connect(rowset,'onItemChanging',
			 		function(row,name,value,index){
						alert(row.getItemValue("attr_empno"));
			 			alert('onItemChanging');		
			 		}
			 	);
			 	rowset.setItemValue(0,"attr_empno","1003");
	}
	function test_onBeforeAddRow(){
		var rowset = new unieap.ds.RowSet([
				               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
		 		               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
				]);
				dojo.connect(rowset,'onBeforeAddRow',
					function(row,rowset){
						alert('onBeforeAddRow');		
					}
				);
				var data = {attr_empno:"1003",NAME:"张柏芝",attr_job:"演员"};
					rowset.addRow(data);
	}
	function test_onBeforeAddRows(){
			var rowset = new unieap.ds.RowSet([]);
			 	dojo.connect(rowset,'onBeforeAddRows',
			 		function(rows){
			 			alert('onBeforeAddRows');		
			 		}
			 	);
			 	var datas=[]
			 	for(var i=0;i<10;i++){
			 	    datas.push({attr_empno:"100"+i,NAME:"name_"+i,attr_job:"演员_"+i});
			 	}
			 	rowset.addRows(datas);
	}
	function test_onAfterAddRows(){
			var rowset = new unieap.ds.RowSet([]);
			 	dojo.connect(rowset,'onAfterAddRows',
			 		function(rows){
			 			alert('onAfterAddRows');		
			 		}
			 	);
			 	var datas=[]
			 	for(var i=0;i<10;i++){
			 	    datas.push({attr_empno:"100"+i,NAME:"name_"+i,attr_job:"演员_"+i});
			 	}
			 	rowset.addRows(datas);
	}
	function test_onBeforeDeleteRow(){
		var rowset = new unieap.ds.RowSet([
			 	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
		 	 	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
			 	]);
			 dojo.connect(rowset,'onBeforeDeleteRow',
			 		function(row,rowset){
			 			alert('onBeforeDeleteRow');		
			 		}
			 	);
			 	rowset.deleteRow(0);
	}
	function test_onBeforeDeleteRows(){
		var rowset = new unieap.ds.RowSet([
			 	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20},         
			 	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
		 	 	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
			 	]);
			 	dojo.connect(rowset,'onBeforeDeleteRows',
			 		function(data){
						
			 			alert('onBeforeDeleteRows');	
							
			 		}
			 	);
			 	rowset.deleteRows([0,1]);
				
	}
	function test_onFilter(){
		var rowset = new unieap.ds.RowSet([
			 	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",deptno:20,_s:true},         
			 	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
		 	 	               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
			 	]);
			 	dojo.connect(rowset,'onFilter',
			 		function(){
			 			alert('onFilter');		
			 		}
			 	);
			  	rowset.doFilter('NAME','like','^黄',true);
	}
	function test_onSort(){
			var rowset = new unieap.ds.RowSet([
				               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"9000",deptno:20,_s:true},         
				               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",deptno:10}, 
		 		               {attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",attr_sal:"9500",deptno:20}           
				]);
				dojo.connect(rowset,'onSort',
					function(){
						alert('onSort');		
					}
				);
				rowset.sort('attr_sal',1,'number');
	}
	function test_onResetUpdate(){
			var rowset = new unieap.ds.RowSet([
		 	 			                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"},                
			 			                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
			 			                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
			 	]);
			 	dojo.connect(rowset,'onResetUpdate',
			 		function(){
			 			alert('onResetUpdate');		
			 		}
			 	);
			 	rowset.setItemValue(0,"NAME","茜茜公主");
			 	rowset.deleteRow(2);
			 	rowset.resetUpdate(); 
	}
	function test_sort(){
		var rowset = new unieap.ds.RowSet([
			 	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"9700"},                
			 	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
			 	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
			 	]);
			 	rowset.sort('attr_sal',1,'number');
			 	unieap.debug(rowset);
	}
	function test_setItemValue(){
			var rowset = new unieap.ds.RowSet([
			 	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001"}
			 	]);
			 	var date = new Date();
			 	rowset.setDate(0,"attr_hiredate",date); 
			 	unieap.debug(rowset);  
	}
	function test_getItemValue(){
		var rowset = new unieap.ds.RowSet([
			 	               {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",attr_hiredate:1260855744997}
			 	]);
			 alert(rowset.getItemValue(0,"NAME"));
	}
	function test_setRowStatus(){
		var rowset = new unieap.ds.RowSet([
			 	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"9700",_t:1},                
			 	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
			 	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
			 	]);
			  	rowset.setRowStatus(0,3,"primary");
			 	unieap.debug(rowset);
	}
function test_colneRow(){
	var ds = new unieap.ds.DataStore("name");
		var data = {name:"d",b:2,_t:3,_o:{b:1}};
		ds.getRowSet().addRow(data,true,true);
		unieap.debug(ds);
}
//test_colneRow();
function getRowSetName(){
	var ds = new unieap.ds.DataStore("name");
	ds.setRowSetName("emp");
	alert(ds.getRowSet().getName());
}
function test_generateTree(){
	var rowset = new unieap.ds.RowSet([
	 	                 {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"9700",_t:1},                
	 	                 {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800"}, 
	 	                 {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500"}   
	 	]);
	 	
	var result = 	rowset.generateTreeSet({
		id:"attr_empno",parent:"parentID",root:null
	});
		unieap.debug(result);
}
test_generateTree();