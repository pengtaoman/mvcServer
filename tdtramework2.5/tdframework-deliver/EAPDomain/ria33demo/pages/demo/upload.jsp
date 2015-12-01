<%@ page contentType="text/html;charset=utf-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-cn" lang="zh-cn"> 
  <head>
    <title>RIA文件上传测试</title>
  </head>
  <script type="text/javascript">

    var store = new unieap.ds.DataStore("demo");
    store.setRowSetName("emp-withblob");
    unieap.Action.doQuery(store);
   	store = dataCenter.getDataStore("demo");
   	

    //持久化到数据库
  	function persist(){
  		dataCenter.addParameter("empno",unieap.byId("empno").getValue());
  		unieap.Action.upload({
  			url:unieap.WEB_APP_NAME+"/testFileInput.do?method=uploadWithBlob",
  			form:'blob_form',
  			parameters:{
  				dc:dataCenter.toJson()
  			},
  			load:function(res){
  				if(res.result=='上传文件成功'){
  					var form=unieap.byId('blob_form');
  					if(form.isModified()){
  						dojo.forEach(form.getDescendants(),function(widget){
  							widget.setModified(false);
  						});
  					}
  				}
  				alert(res.result);
  			},
  			error:function(res){
  				unieap.debug(res.result);
  			}
  		});
  	}
  	
  	//上传文件到指定文件夹
  	
  	function common_upload(){
  		unieap.Action.upload({
  			url:unieap.WEB_APP_NAME+"/testFileInput.do?method=commonUpLoad",
  			form:'common_form',
  			load:function(res){
  				animate('<b>您输入的字符为</b>:'+res.info+',<b>上传文件状态</b>:'+res.result);
  			},
  			error:function(res){
  				alert('发生错误,开始显示错误信息');
  				unieap.debug(res);
  			}
  		});
  	}
  	
  	function show_uploaded(){
  		window.open(unieap.WEB_APP_NAME+'/unieap/ria3.3/unieap/tests/manual/form/FileInput/upload',"",'height=500,width=700,resizable=yes,status=yes,titlebar=yes');
  	}
  	
	 function animate(str){
		dojo.animateProperty({
			node:'info',
			properties:{
				backgroundColor:{
					start:'yellow',
					end:'white'
				}
			},
			duration:2000
		}).play();
		
		dojo.byId('info').innerHTML=str;
	}
  	
  
  
  		
  </script>
  <body class="unieap">
 
	<div dojoType="unieap.layout.TitlePane" title="普通文件上传测试">
		<form dojoType="unieap.form.Form" id="common_form" enctype="multipart/form-data">
			<div dojoType="unieap.form.FieldSet" title="信息">
				<div dojoType="unieap.form.TextBox" name="info" width="500" prompt="{promptMsg:'随便输入字符'}"></div>
				<br />
				<div dojoType="unieap.form.FileInput" width="500px" name="file_demo"></div>
				<br />
				<div dojoType="unieap.form.FileInput" width="500px" name="file_demo"></div>
				<br />
				<div dojoType="unieap.form.Button" label="文件上传" onClick="common_upload" style="margin-right:5px"></div>
				<div dojoType="unieap.form.Button" label="查看已经上传的文件" onClick="show_uploaded"></div>
				<div style="margin-top:5px;font-size:13px" id="info"></div>
			</div>
		</form>
	</div>
	
	<p></p>
	<div dojoType="unieap.layout.TitlePane" title="持久化文件到数据库">
		<form dojoType="unieap.form.Form" id="blob_form" binding="{store:'demo'}" enctype="multipart/form-data">
			<div dojoType="unieap.form.FieldSet" title="信息">
				<div dojoType="unieap.form.TextBox" binding="{name:'attr_empno'}" width="500" id="empno" style="display:none"></div>
				<br />
				<div dojoType="unieap.form.TextBox" binding="{name:'attr_ename'}" width="500"></div>
				<br />
				<div dojoType="unieap.form.TextBox" binding="{name:'attr_job'}" width="500px" ></div>
				<br />
				<div dojoType="unieap.form.FileInput" width="500px" ></div>
				<br />
				<div dojoType="unieap.form.Button" label="持久化数据" onClick="persist" required="true"></div>
			</div>
		</form>
	</div>
	
	
	
  </body>
</html>
