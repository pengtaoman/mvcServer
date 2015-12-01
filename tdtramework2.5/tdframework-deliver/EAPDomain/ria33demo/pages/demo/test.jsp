<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <title>RIA样例</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
        <SCRIPT type="text/javascript">
            var store = new unieap.ds.DataStore("empDataStore");
            store.setOrder("[attr_deptno] asc,[attr_job]");
            store.setRowSetName("emp");
            store.addStatistic("attr_sal", "sum");
            store.addStatistic("attr_sal", "avg");
            store.addStatistic("attr_sal", "min");
            store.addStatistic("attr_sal", "max");
            unieap.Action.doQuery(store);
            store = dataCenter.getDataStore("empDataStore");
            //dataCenter.getDataStore("empDataStore").getRowSet().getRow(0).setItemValue("attr_job", "利郎");
            //var dept = new unieap.ds.DataStore("dept",[{CODENAME:"开发部",CODEVALUE:"10"},{CODENAME:"采购部",CODEVALUE:"20"},{CODENAME:"咨询部",CODEVALUE:"30"},{CODENAME:"外交部",CODEVALUE:"40"}]);
            //dataCenter.addDataStore(dept);
            var getLockedRow = function(){
            	var sal = dataCenter.getDataStore("empDataStore").getRowSet().sum("attr_sal");
            	sal= "小计值: "+sal;
                return [{attr_ename:'杨作仲',attr_hiredate:new Date().getTime(),attr_sal:sal,attr_job:'不job'}];
            }
            function getData(){
				return '自定义数据测试快乐！';
			}
			var myContext={
				testContext:'上下文测试快乐！'
			};
            function doSumbit(){
            	grid.getBinding().save({
					load:function(){
						alert('保存成功!');
					},
					error:function(){
						alert('保存失败!');
					}
				});
            }
            function doDelete(){
            	var rowIndex = grid.getManager("RowManager").getCurrentRowIndex();
            	if(rowIndex<0) return ;
            	grid.getManager("EditManager").deleteRow(rowIndex);
            	//dataCenter.getDataStore("empDataStore").getRowSet().deleteRows([0,1,2,3,4,5]);
            }
            function doInsert(){
            	grid.getManager("EditManager").insertRow({attr_hiredate:new Date().getTime()},0);
            }
            function openDialog(){
            	var dialog = new unieap.dialog.Dialog({inner:"<div style=\"height:100%;width:100%;background-color:#dfe8f6;\">hello World!</div>"});
			   	dialog.show(btn.domNode); 
            }
            function init(id){
           		unieap.parse(dojo.byId("grid"+id));            	
            }
            function getMasterDetail(inRowIndex){
            	var result = ["<div style=\"width:auto;border-top:1px solid #dddddd;height:120px\">"];
            
            	result.push("<img  border=0 src=\"");
            	result.push(unieap.appPath +"/pages/demo/images/" );
            	result.push(inRowIndex % 4);
            	result.push(".bmp\"></img>");
            
            	result.push("</div>");
            
            	return result.join("");
            }
            dojo.addOnLoad(function(){
            	dojo.connect(grid.getViewManager(),"onRowClick",function(rowIndex){
            		form.getBinding().setDataStore(dataCenter.getDataStore("empDataStore"),rowIndex);
            	});
            	
            });
         
        </SCRIPT>
    </head>
    <body class="unieap">
	    <div dojoType="unieap.layout.TitlePane"   title="职工信息" style="width:100%;margin-bottom:3px;'">
	    	<div type='buttons'><button dojoType="unieap.form.Button" label=" 弹出窗口 " jsId="btn" onClick="openDialog()"></button></div>
	   		<div style="background-color:#dfe8f6;padding:5px;overflow:hidden;">
	   		<fieldset dojoType="unieap.form.FieldSet" title="编辑信息">
		   		<form id='form' jsId="form" dojoType="unieap.form.Form" style="margin:0px;">		   			
			   		<table style="table-layout:fixed;font-size:12px;height:68px;">
			   			<tr>
			   				<td width="50">编号：</td><td width="240"><div dojoType="unieap.form.NumberTextBox" binding="{name:'attr_empno'}"></div></td>
			   				<td width="50">姓名：</td><td width="240"><div dojoType="unieap.form.TextBox" binding="{name:'attr_ename'}"></div></td>
			   			</tr>
			   			<tr>
			   				<td width="50">日期：</td><td width="240"><div dojoType="unieap.form.DateTextBox" binding="{name:'attr_hiredate'}" displayFormatter="{dataFormat:'yyyy-MM-dd HH:mm:ss'}"></div></td>
			   				<td width="50">部门：</td><td width="240"><div dojoType="unieap.form.ComboBox" dataProvider="{store:'DEPT'}" binding="{name:'attr_deptno'}"></div></td>
			   			</tr>
			   			<tr>
			   				<td width="50">工资：</td><td width="240"><div dojoType="unieap.form.NumberTextBox" binding="{name:'attr_sal'}"></div></td>
			   				<td width="50">职务：</td><td width="240"><div dojoType="unieap.form.TextBox" binding="{name:'attr_job'}"></div></td>
			   			</tr>
			   		</table>
		   		</form>
		   		</fieldset>
	   		</div>
	    </div>
    
    <div dojoType="unieap.layout.TabContainer"  jsId="tabcontainer" style="height:450px">
    	<div dojoType="unieap.layout.ContentPane"   title="基本表格">
        <div id="grid" jsId="grid" dojoType="unieap.grid.Grid" 
	        width="auto" 
	        height="400px" 
			binding="{store:'empDataStore'}" 
			views="{rowBar:true,rowNumber:true,orderType:'server'}" 
			selection="{selectType:'m'}" 
			lockedRow="{statistics:[{attr_sal:'max'},{attr_sal:'sum'}], getLockedRow:getLockedRow}"	>
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
                    <cell label="工资" width="150" name="attr_sal" styles="text-align:right;">
                    </cell>
                     <cell label="部门" width="150" name="attr_deptno" decoder="{store:'DEPT'}">
                    </cell>
                    <cell label="职务" width="30%" name="attr_job">
                    </cell>
                </row>
            </header>
            <toolbar export="true" paging="{pageCache:true}" print="true">
            	<button dojoType="unieap.form.Button" label=" 新增 " onClick="doInsert()"></button>&nbsp;
            	<button dojoType="unieap.form.Button" label=" 删除 " onClick="doDelete()"></button>&nbsp;
            	<button dojoType="unieap.form.Button" label=" 保存 " onClick="doSumbit()"></button>
            </toolbar>
            <foot style="text-align:center;">
                    最大薪资：<span style="color: #2748c2" express="max(attr_sal)"></span>；
                    最小薪资：<span style="color: #2748c2" express="min(attr_sal)"></span>；
                    行数：<span style="color: #2748c2" express="getRowCount()"></span>；
                    自定义数据：<span style="color: #2748c2" express="getData()"></span>；
                    测试上下文：<span style="color: #2748c2" express="${testContext}" context="myContext"></span>
                </foot>
        </div>
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="高级表格"  onInit="init(2)">
        <div id="grid2" jsId="grid2" dojoType2="unieap.grid.Grid" 
	        width="auto" 
	        height="400px" 
			binding="{store:'empDataStore'}" 
			views="{rowBar:true,rowNumber:false,orderType:'client'}" 
			filter='{}' 
			selection="{selectType:'m'}" 
			>
            <fixed>
                <cell label="员工编号" width="200" name="attr_empno">
                </cell>
            </fixed>
            <header>
                    <cell label="姓名" name="attr_ename" width="150" headerStyles="text-align: left;">
                    </cell>
                    <cell label="日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd HH:mm:ss'}">
                    </cell>
                    <cell label="工资" width="150" name="attr_sal">
                    </cell>
                     <cell label="部门" width="150" name="attr_deptno" decoder="{store:'DEPT'}">
                    </cell>
                    <cell label="职务" width="150" name="attr_job">
                    </cell>
            </header>
            <toolbar export="true"  individual="true"></toolbar>
        </div>
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="列分组" onInit="init(3)">
        	<div id="grid3" jsId="grid3" dojoType2="unieap.grid.Grid" 
	        width="auto" 
	        height="380px" 
			binding="{store:'empDataStore'}" 
			views="{rowBar:true,rowNumber:true,orderType:'client'}" 
			group="{autoApply:true,groupBar:true}"
			>
            <header>
                	<cell label="员工编号" width="200" name="attr_empno"></cell>
                    <cell label="姓名" name="attr_ename" width="150" headerStyles="text-align: left;">
                    </cell>
                    <cell label="日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd HH:mm:ss'}">
                    </cell>
                    <cell label="工资" width="150" name="attr_sal">
                    </cell>
                     <cell label="部门" width="150" name="attr_deptno" decoder="{store:'DEPT'}">
                    </cell>
                    <cell label="职务" width="150" name="attr_job">
                    </cell>
            </header>
            <toolbar export="true"  individual="true">	
            </toolbar>
        </div>
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="合并单元格" onInit="init(4)">
        <div id="grid4" jsId="grid4" dojoType2="unieap.grid.Grid" 
	        width="auto" 
	        height="400px" 
			binding="{store:'empDataStore'}" 
			views="{rowBar:true,rowNumber:false,orderType:'client'}" 
			unitedCell="{unite:['attr_deptno','attr_job']}"
			>
              <header>
             		<cell label="部门" width="100" name="attr_deptno" decoder="{store:'DEPT'}">
                    </cell>
                    <cell label="职务" width="100" name="attr_job">
                    </cell>
                    <cell label="姓名" name="attr_ename" width="100" headerStyles="text-align: left;">
                    </cell>
                    <cell label="日期" width="100"  name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd HH:mm:ss'}">
                    </cell>
            </header>
            <toolbar export="true"  individual="true" print="true">	
            </toolbar>
        </div>
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="master detail" onInit="init(5)">
        <div id="grid5" jsId="grid5" dojoType2="unieap.grid.Grid" 
	        width="auto" 
	        height="400px" 
			binding="{store:'empDataStore'}" 
			views="{rowBar:true,orderType:'client'}" 
			detail='{expandAll:false,getMasterDetail:getMasterDetail}'
			>
            <fixed>
                	<cell label="员工编号" width="200" name="attr_empno"></cell>
                    <cell label="姓名" name="attr_ename" width="150" headerStyles="text-align: left;">
                    </cell>
                    <cell label="日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd HH:mm:ss'}">
                    </cell>
                    <cell label="工资" width="150" name="attr_sal">
                    </cell>
                     <cell label="部门" width="150" name="attr_deptno" decoder="{store:'DEPT'}">
                    </cell>
                    <cell label="职务" width="150" name="attr_job">
                    </cell>
            </header>
           
        </div>
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="懒加载树" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="自适应容器">
        	<div dojoType="unieap.layout.AdaptiveContainer">
        		<div dojoType="unieap.layout.AdaptivePane">
        			<div  dojoType="unieap.layout.TitlePane"   title="伸缩容器">
        				<div>固定内容</div>
        				<div>固定内容</div>
        			</div>
        		</div>
        		<div dojoType="unieap.layout.AdaptivePane" autoHeight="true">
        			<table style="height:100%;width:100%;" cellspacing=0 cellpadding=0>
        				<tr>
        					<td align="center" style="border:1px solid red;">
        						伸缩内容
        					</td>
        				</tr>
        			</table>
        		</div>
        		<div dojoType="unieap.layout.AdaptivePane">
        			<div  dojoType="unieap.layout.TitlePane"   title="伸缩容器">
        				<div>固定内容</div>
        				<div>固定内容</div>
        			</div>
        		</div>
        	</div>
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页一" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页二" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页三" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页四" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页五" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页六" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页七" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页八" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页九" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页十" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页十一" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页十二" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页十三" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页十四" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页十五" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页十六" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页十七" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页十八" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页十九" >
        </div>
        <div dojoType="unieap.layout.ContentPane"  title="空页二十" >
        </div>
        
        </div>
    </body>
</html>
