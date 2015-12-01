<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <title>RIA样例</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
        <SCRIPT type="text/javascript">
            var store = new unieap.ds.DataStore("empDataStore");
            store.setRowSetName("emp");
            store.addStatistic("attr_sal", "sum");
            store.addStatistic("attr_sal", "avg");
            store.addStatistic("attr_sal", "min");
            store.addStatistic("attr_sal", "max");
            unieap.Action.doQuery(store);
            store = dataCenter.getDataStore("empDataStore");
            //dataCenter.getDataStore("empDataStore").getRowSet().getRow(0).setItemValue("attr_job", "利郎");
            var dept = new unieap.ds.DataStore("dept", [{
                CODENAME: "开发部",
                CODEVALUE: "10"
            }, {
                CODENAME: "采购部",
                CODEVALUE: "20"
            }, {
                CODENAME: "咨询部",
                CODEVALUE: "30"
            }, {
                CODENAME: "外交部",
                CODEVALUE: "40"
            }]);
            dataCenter.addDataStore(dept);
            var getLockedRow = function(){
                var sal = dataCenter.getDataStore("empDataStore").getRowSet().sum("attr_sal");
                sal = "小计值:" + sal;
                return [{
                    attr_ename: '杨作仲',
                    attr_hiredate: new Date().getTime(),
                    attr_sal: sal,
                    attr_job: '不job'
                }];
            }
            function getData(){
                return '自定义数据测试快乐！';
            }
            
            var myContext = {
                testContext: '上下文测试快乐！'
            };
          
		  	function doClientExport(){
				grid.getManager("ExportManager").doClientExport();
			};
            
			function doServerExport(){
				grid.getManager("ExportManager").doServerExport();
			};
			
			function doPrint(){
				grid.getManager("PrintManager").doPrint();
			}
			
			function prevPage(){
				grid.getManager("PagingManager").prevPage();
			}
			function nextPage(){
				grid.getManager("PagingManager").nextPage();
			}
            
        </SCRIPT>
    </head>
    <body class="unieap">
    	<div dojoType='unieap.layout.TitlePane' title='没有toolbar的情况下 进行导出 打印 翻页操作'>
				<button onclick="doClientExport()">doClientExport</button>
				<button onclick="doServerExport()">doServerExport</button>
				<button onclick="doPrint()">doPrint</button>
				<button onclick="prevPage()">prevPage</button>
				<button onclick="nextPage()">nextPage</button>
		</div>
        <div id="grid" jsId="grid" dojoType="unieap.grid.Grid" width="100%" height="400px" binding="{store:'empDataStore'}" views="{rowBar:true,rowNumber:true,orderType:'server'}" filter='{}' selection="{selectType:'m'}" lockedRow="{statistics:{attr_sal:'max'}, getLockedRow:getLockedRow}">
            <fixed>
                <cell label="员工编号" width="200" name="attr_empno">
                </cell>
            </fixed>
            <header>
                <row>
                    <cell colSpan="2" isMulTitle="true" label="多标题一" headerStyles="text-align: center;color: red;" styles="text-align: center;color: red;">
                    </cell>
                    <cell colSpan="3" isMulTitle="true" label="多标题二" headerStyles="color: red;">
                    </cell>
                </row>
                <row>
                    <cell label="姓名" name="attr_ename" width="150" headerStyles="text-align: left;">
                    </cell>
                    <cell label="日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd HH:mm:ss'}">
                    </cell>
                    <cell label="工资" width="150" name="attr_sal">
                    </cell>
                    <cell label="部门" width="150" name="attr_deptno" decoder="{store:'dept2'}">
                    </cell>
                    <cell label="职务" width="30%" name="attr_job">
                    </cell>
                </row>
            </header>
        </div>
    </body>
</html>
