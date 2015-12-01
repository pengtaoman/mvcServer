dojo.addOnLoad(function(){
				dp.SyntaxHighlighter.HighlightAll('code');
			});
			
			function newGrid() {
				//是否显示行号
				var vm = {rowNumber: true}; 
				//锁定列数据
				var fixedColumns=[
					{label: "员工编号",name: "attr_empno",width: "150px"}
				]
				//非锁定列数据
				var columns=[
			 		{label: "姓名",name: "NAME",width: "100px"},
					{label: "职位",name: "attr_job",width: "150px"},
					{label: "工资",name : "attr_sal",width : "150px"}
				]
				var fixed={noscroll: true,rows:[fixedColumns]};
				var header={rows:[columns]}
				var layout = [fixed, header];
				//数据绑定
				var binding = {store:'empDataStore'};
				var grid = new unieap.grid.Grid({
					views: vm,
					layout: {structure:layout},
					binding: binding,
					width: 700,
					height: 250
				});
				grid.placeAt('btn_newGrid','before');
				unieap.byId('btn_newGrid').setDisabled(true);
			}