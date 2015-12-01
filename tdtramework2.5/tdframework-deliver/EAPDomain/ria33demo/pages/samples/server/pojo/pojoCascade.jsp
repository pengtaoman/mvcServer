<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>pojo实现</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
         <script type="text/javascript" src="<%=appPath%>/pages/samples/server/pojo/pojoCascade.js"></script>
	</head>
    <body class="unieap">
    		<div dojoType="unieap.layout.TitlePane" title="后台代码说明" open=false >
	     	  <div dojoType="unieap.layout.TabContainer" style='height:400px' >
	     	  	<div dojoType="unieap.layout.ContentPane" title="统计查询">
				      	Action:</br>
						<div dojoType="unieap.form.FieldSet"   title="Action端代码">
						      	// 获取业务对象
								<br>LogFactory.getLog(SystemConfig.logCatagroy).info("查询开始...");
								<br>DataCenter dc = new DataCenter();
								<br>IPractiseInteraction pracIT = getIPracInteraction(request);
								<br>// 调用业务处理方法
								<br>dc = (DataCenter) pracIT.query(dc);
						</div></br>
						Interaction:</br>
						<div dojoType="unieap.form.FieldSet"   title="Interaction端代码">
								<br>pracApplogic.query(dc);
						</div></br>
						Applogic:</br>
						<div dojoType="unieap.form.FieldSet"   title="Applogic端代码">
						      	DataStore 	queryDS=(DataStore) dc.getDataStore("unionDS");
								<br>DataStore pracDS = new DataStore("pracDS");
								<br>pracDS.setPageNo(queryDS.getPageNo());
								<br>pracDS.setPageSize(queryDS.getPageSize());
								<br>pracDS.setRowSetName("com.neusoft.unieap.ria33demo.pojo.entities.Practise");
								<br>/**
								<br> * 查询Practise业务表
								<br> */
								<br>List list1=practiseDao.query(pracDS);
								<br>DataStore compDS = new DataStore("compDS");
								<br>compDS.setRowSetName("com.neusoft.unieap.ria33demo.pojo.entities.Company");
								<br>/**
								<br> * 查询Company业务表
								<br> */
								<br>List list2=companyDao.query(compDS);
								<br>/**
								 <br>* 将两个表数据根据no组装成一个DataStore
								 <br>*/
								<br>DataStore unionDS = unionStores(list1,list2,queryDS.getPageNo(),queryDS.getPageSize());
								<br>/**
								<br> * 设置统计信息
								<br> */
								<br>practiseDao.count(pracDS);
								<br>unionDS.setRecordCount(pracDS.getRecordCount());
								<br>dc.addDataStore(unionDS);
						</div>
	     	  	</div>
				<div dojoType="unieap.layout.ContentPane" title="持久化 ">
				      	Action:
						<div dojoType="unieap.form.FieldSet" title="Action端代码">
						    
							<br>IDataCenter dc = DataCenterIOManager.createReader(
							<br>			request.getInputStream()).parse();
							<br>//取得业务对象
							<br>	IPractiseInteraction pracIT = getIPracInteraction(request);
							<br>//业务对象持久化
							<br>	pracIT.update(dc);
							<br>//将成功信息返回到前台
							<br>	DataCenterWriter writer = DataCenterIOManager.createWriter(response
							<br>			.getOutputStream());
							<br>	DataCenter dataCenter = new DataCenter();
							<br>	dataCenter.setCode(1);
							<br>	dataCenter.setDetail("保存成功");
							<br>	writer.write(dataCenter);
						</div>
						Interaction:
						<div dojoType="unieap.form.FieldSet"  title="Interaction端代码">
						      	<br>DataStore ds = (DataStore) dc.getDataStore("unionDS");
								<br>//调用Applogic层进行持久化
								<br>pracApplogic.update(ds);
						</div>
						Applogic:
						<div dojoType="unieap.form.FieldSet"   title="Applogic端代码">
						      	ds.setRowSetName("com.neusoft.unieap.ria33demo.pojo.entities.Practise");
								<br>/**
								<br> * 持久化Practise业务表
								 <br>*/
								<br>try{
								<br>	PojoList list=HibernateHelper.createPojoList(ds);
								<br>	practiseDao.update(list);
								<br>}catch(Exception e){
								<br>//将异常信息封装成AppException
								<br>	throw new AppException(-1,"","持久化Practise业务表失败",e);
								<br>}
								<br>ds.setRowSetName("com.neusoft.unieap.ria33demo.pojo.entities.Company");
								<br>/**
								 <br>* 持久化Company业务表
								 <br>*/
								<br>try{
								<br>	PojoList list1=HibernateHelper.createPojoList(ds);
								<br>	companyDao.update(list1);
								<br>}catch(Exception e){
								<br>	throw new AppException(-1,"","持久化Company业务表失败",e);
								<br>}
						</div>
	     	  	</div>
	     	  </div>
			 </div>

		<div dojoType="unieap.layout.TitlePane" title="人员信息">
			  <div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
				views="{rowNumber:false,rowBar:true,orderType:'client'}"
				edit="{editType:'rowEdit',singleClickEdit:false}"
				selection="{selectType:'s'}">
				<header> 
					<cell  label="编号" width="10%" name="no" editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{textAlign:'left'}}"></cell>
					<cell  label="单位名称" width="15%" name="name" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
					<cell label="缴费方式" width="10%" name="method" decoder="{store:'method'}" 
						editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'method'}}}"></cell>
					<cell  label="银行" width="10%" name="bank" decoder="{store:'bank'}" 
						editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'bank'}}}"></cell>
					<cell label="人员数"  width="10%" name="personnumber" editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{textAlign:'left'}}"></cell>
					<cell label="总价"  width="10%" name="amount" editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{textAlign:'left'}}" ></cell>
					<cell label="开始日期" width="15%" name="startdate" editor="{editorClass:'unieap.form.DateTextBox',editorProps:{displayFormatter:{dataFormat:'yyyy-MM-dd'}}}" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}" ></cell>
					<cell label="状态" width="10%" name="state" 
						decoder="{store:'state',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}" 
						editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'state'},decoder:{valueAttr:'CODEVALUE',displayAttr:'CODENAME'}}}"></cell>
				</header>
				<toolbar paging="{url:'/pojoCascadeTest.do?method=query',onPagingModified:onPM}"></toolbar>   
			</div>
			<div align="right">
				<div dojoType="unieap.form.Button" label="增加" onClick="add"></div>
				<div dojoType="unieap.form.Button" label="删除" onClick="del"></div>
				<div dojoType="unieap.form.Button" label="持久化" onClick="save"></div>
			</div>
		</div>
    </body>
</html>