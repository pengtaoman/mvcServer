<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>drm实现</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
         <script type="text/javascript" src="<%=appPath%>/pages/samples/server/drm/drmCommon.js"></script>
		 <script type="text/javascript">
		 	function onPM(store,binding){
				if(confirm("保存修改？")){
					binding.save({url:'/drmTest.do?method=save'});
				}
			}
		 
		 </script>
	</head>
    <body class="unieap">
    		<div dojoType="unieap.layout.TitlePane" title="后台代码说明"  >
	     	  <div dojoType="unieap.layout.TabContainer" style='height:400px' >
	     	  	<div dojoType="unieap.layout.ContentPane" title="统计查询">
				      	Action:
						<div dojoType="unieap.form.FieldSet"   title="Action端代码">
						      	// 获取业务对象
								<br>IEmpInteraction empInteraction = (IEmpInteraction) InteractionObjectFactory
								<br>		.getInstance().getInteractionObject("empInteraction",
												getAppContext(request));
								<br>// 调用业务处理方法
								<br>localObject = empInteraction.query(dc);
						</div>
						Interaction:
						<div dojoType="unieap.form.FieldSet"   title="Interaction端代码">
						     //调用业务逻辑方法
							<br>IDataStore store = getEmpApplogic().query(paramDC.getDataStore("empDataStore")) ;
							<br>//将DataStore装入DataCenter
							<br>IDataCenter dc = new DataCenter();
							<br>dc.addDataStore(store);
							<br>return dc;
						</div>
						Applogic:
						<div dojoType="unieap.form.FieldSet"   title="Applogic端代码">
							//调用DAO执行数据库查询操作
							<br>DataCenterDrmDAO drmDao = new DataCenterDrmDAO();
							<br>store = drmDao.doDrmQuery(store);
							<br>//查询记录数
							<br>store = drmDao.doDrmCount(store);
							<br>return store;
						</div>
	     	  	</div>
				<div dojoType="unieap.layout.ContentPane" title="持久化 ">
				      	Action:
						<div dojoType="unieap.form.FieldSet" title="Action端代码">
						    //获取业务对象
							<br>IEmpInteraction empInteraction = (IEmpInteraction) InteractionObjectFactory
							<br>			.getInstance().getInteractionObject("empInteraction",
							<br>					getAppContext(request));
							<br>//调用业务对象进行持久化
							<br>empInteraction.save(localObject);
						</div>
						Interaction:
						<div dojoType="unieap.form.FieldSet"  title="Interaction端代码">
						      	//定义业务逻辑对象
								<br>EmpApplogic empApplogic = new EmpApplogic();
								<br>//得到DataStore进行后续处理
								<br>IDataStore localIDataStore = paramIDataCenter.getDataStore("empDataStore");
								<br>if (localIDataStore.getRowSetName() != null)
								<br>	empApplogic.save(localIDataStore);
						</div>
						Applogic:
						<div dojoType="unieap.form.FieldSet"   title="Applogic端代码">
						      	pm = super.getPersitenceManager(store.getRowSetName());
								<br>DataSet dataSet = statusMgr.getDataSet(store);
								<br>MetaDataImpl md = (MetaDataImpl) MetaDataManager.getInstance()
								<br>		.getDataSetMetaData(dataSet.getDataSetName());
								<br>//设置数据助手
								<br>if ((md != null) && (md.getEAPCallBackName() != null))
								<br>	((DataSetPersistenceManagerImpl) pm).setCallbackParas(
								<br>			dataSet.getDataSetName(), md.getEAPCallBackName(),
								<br>			md.getEAPCallbackParas());
				
								<br>if (dataSet == null)
								<br>	throw new AppException("数据为空，持久化出错");
								<br>//设置DRM上下文
								<br>DrmSysManager
								<br>		.setUserObject(AppContextContainer.getAppContext());
								<br>pm.makePersistent(dataSet);
						</div>
	     	  	</div>
	     	  </div>
			 </div>

		<div dojoType="unieap.layout.TitlePane" title="人员信息">
			  <div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
				binding="{store:'empDataStore'}" views="{rowNumber:false,rowBar:true,orderType:'client'}"
				edit="{editType:'rowEdit',singleClickEdit:false}"
				selection="{selectType:'s'}">
				<header> 
					<cell width="20%" label="编号" width="25%" name="attr_empno" editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{textAlign:'left'}}"></cell>
					<cell width="15%" label="姓名" width="25%" name="attr_ename" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" ></cell>
					<cell width="15%" label="职位" width="25%" name="attr_job" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
					<cell width="20%" label="工资" width="25%" name="attr_sal" editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{textAlign:'left'}}"></cell>
					<cell width="15%" label="入职日期" width="25%" name="attr_hiredate" editor="{editorClass:'unieap.form.DateTextBox',editorProps:{displayFormatter:{dataFormat:'yyyy-MM-dd'}}}" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}" ></cell>
					<cell width="15%" label="部门" width="25%" name="attr_deptno" 
						decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}" 
						editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'DEPT'},decoder:{valueAttr:'CODEVALUE',displayAttr:'CODENAME'}}}"></cell>
				</header>
				<toolbar paging="{url:'/drmTest.do?method=query',onPagingModified:onPM}"></toolbar>   
			</div>
			<div align="right">
				<div dojoType="unieap.form.Button" label="统计查询" onClick="query"></div>
				<div dojoType="unieap.form.Button" label="增加" onClick="add"></div>
				<div dojoType="unieap.form.Button" label="删除" onClick="del"></div>
				<div dojoType="unieap.form.Button" label="持久化" onClick="save"></div>
			</div>
		</div>

    </body>
</html>