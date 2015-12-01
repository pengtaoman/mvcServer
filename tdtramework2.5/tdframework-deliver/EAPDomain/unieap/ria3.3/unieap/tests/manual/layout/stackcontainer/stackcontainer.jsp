<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>StackContainer控件测试</title>
		<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
	</head>
		
    <script type="text/javascript">
    	dojo.require("unieap.layout.StackContainer");
		dojo.require("unieap.layout.ContentPane");
		dojo.require("unieap.form.Button");
		dojo.require("unieap.layout.TitlePane");
		dojo.require("unieap.grid.Grid");
		
		function back(){
			unieap.byId('st').back();
			var selected=unieap.byId('st').getSelectedChild();
			if(!selected) return;
			if(selected.isFirstChild){
				unieap.byId('backBtn').setDisabled(true);
				!selected.isLastChild&&unieap.byId('forwardBtn').setDisabled(false);
			}else{
				unieap.byId('backBtn').setDisabled(false);
				unieap.byId('forwardBtn').setDisabled(false);
			}
			
		}
		
		function forward(){
			unieap.byId('st').forward({name:'非常好',age:22});
			var selected=unieap.byId('st').getSelectedChild();
			if(!selected) return;
			if(selected.isLastChild){
				unieap.byId('forwardBtn').setDisabled(true);
				!selected.isFirstChild&&unieap.byId('backBtn').setDisabled(false);
			}else{
				unieap.byId('backBtn').setDisabled(false);
				unieap.byId('forwardBtn').setDisabled(false);
			}
		}
		
		
		function addChild(){
			var id=new Date().getTime()+'';
			unieap.byId('st').addChild(new unieap.layout.ContentPane({id:id}));
			unieap.byId(id).setContent("哈哈"+id);
			
		}
		
		function delChild(){
			var selected=unieap.byId('st').getSelectedChild();
			selected&&unieap.byId('st').removeChild(selected);
			unieap.byId('forwardBtn').setDisabled(false);
		}
		
		
		dojo.addOnLoad(function(){
			unieap.byId('st').selectChild('zl',{name:'hello',age:333})
		})
		
    </script>
		

    <body class="unieap">
		
		<div dojoType="unieap.form.Button" onClick="back" id='backBtn'  label="上一页" style="margin:5px 5px 2px 10px" ></div>
		<div dojoType="unieap.form.Button" onClick="forward" id='forwardBtn' style='margin:5px 5px 2px 0px' label="下一页" ></div>
		<div dojoType="unieap.form.Button" onClick="addChild" id='addBtn' style='margin:5px 5px 2px 0px' label="增加一页" ></div>
		<div dojoType="unieap.form.Button" onClick="delChild" id='delBtn' style='margin:5px 5px 2px 0px' label="删除当前显示页" ></div>
    	<div dojoType="unieap.layout.StackContainer" id='st' style="border:1px solid #9b9b9b;margin-left:10px" width="60%" height="400px">
    		<div dojoType="unieap.layout.ContentPane">
    			<div dojoType="unieap.grid.Grid" width="auto" >
    				<header>
    					<cell label="姓名" width="50%"></cell>
						<cell label="年龄" width="50%"></cell>
    				</header>
    			</div>
    		</div>
			
			<div dojoType="unieap.layout.ContentPane"   id='zl' href="hello.jsp"></div>
			<div dojoType="unieap.layout.ContentPane"   id='zlx' href="hello.jsp"></div>
			<div dojoType="unieap.layout.ContentPane"   >
				<div dojoType="unieap.layout.TitlePane" title="第二页">
	    			<div dojoType="unieap.grid.Grid" width="auto" >
	    				<header>
	    					<cell label="姓名" width="50%"></cell>
							<cell label="年龄" width="50%"></cell>
	    				</header>
	    			</div>
				</div>
			</div>
			
			<div dojoType="unieap.layout.ContentPane">
				Ok
			</div>
			
			<div dojoType="unieap.layout.ContentPane">
				Oh..No
			</div>
    	</div>
    </body>
</html>