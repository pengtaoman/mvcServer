<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>pojo实现</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
         <script type="text/javascript" src="<%=appPath%>/pages/samples/server/pojo/empQuery.js"></script>
	</head>
    <body class="unieap">
    		<div dojoType="unieap.layout.TitlePane" title="后台代码说明" open=false >
				      Applogic:</br>
						<div dojoType="unieap.form.FieldSet"   title="Applogic端代码">
						      		Map map = ds.getParameters();
									<br>IMetaData metaData = empPojoDao.getMetaData(ds.getRowSetName());
									<br>ds.setMetaData(metaData);
									<br>StringBuffer sb = new StringBuffer("");
									<br>/**
									 <br>* 翻页时直接用store中的condition，不需再拼条件。<br>
									 <br>* 因为在前台每次查询都将condition情况，所以判断condition是不是为空就只是不是翻页了
									 <br>*/
									<br>if(null==ds.getCondition()||"".equals(ds.getCondition())){
									<br>	if (null != map ) {
									<br>		Iterator iter = map.entrySet().iterator();
									<br>		Entry entry;
									<br>		JSONArray value;
									<br>		String key;
									<br>		MetaDataColumn col;
									<br>		int i = 0;
									<br>		while (iter.hasNext()) {
									<br>			entry = (Entry) iter.next();
									<br>			key = entry.getKey().toString();
									<br>			if (i != 0) {
									<br>				sb.append(" and ");
									<br>			}
									<br>			sb.append(key+" ");
									<br>			value = (JSONArray) entry.getValue();
									<br>			sb.append(value.get(0).toString() + " ? ");
									<br>			col = metaData.getColumn(key);
									<br>			ds.insertConditionValue(i, value.get(1).toString(), String
									<br>					.valueOf(col.getDataType()));
									<br>			i++;
									<br>		}
									<br>	}
									<br>}
									<br>if (!"".equals(sb.toString())) {
										<br>ds.setCondition(sb.toString());
									<br>}
									<br>List list = empPojoDao.query(ds);
									<br>if (null != list) {
									<br>	// 转换pojo数据为JSONObject
									<br>	HibernateHelper.transformPojo(ds, list);
									<br>}
									<br>// 执行统计查询
									<br>empPojoDao.count(ds);
						</div>
			 </div>
	 	<div dojoType="unieap.layout.TitlePane" title="查询条件" >
		      <form id="formQuery" dojoType="unieap.form.Form">
		        <div dojoType="unieap.form.FieldSet" title="FieldSet控件">
		          <legend>查询条件</legend>
		          <table style="width:100%;tab-layout:fixed;position:relative">
		          	<tr>
			              <td class="td">
			                <label for="empno" style="width:40px;">编号:</label>
			              </td>
						   <td class="td">
							   	<select  id="noCom" dojoType="unieap.form.ComboBox"  readonly=true width="60px" dataProvider="{staticData:true}" hasDefault="true">
								    <option  value="=">等于</option>
			                        <option  value="&gt">大于</option>
			                        <option value="&lt">小于</option>
								</select>
			              </td>
						  <td><div name="empno" id="empno" maxlength="4"  dojoType="unieap.form.NumberTextBox" displayFormat="######"></div>  
						  </td>
						  <td class="td">                           
			                <label for="ename" style="width:40px;">姓名:</label>
			              </td>
						   <td class="td">   
						   		<select  id="nameCom" dojoType="unieap.form.ComboBox"  readonly=true width="60px" dataProvider="{staticData:true}" hasDefault="true">
								    <option  value="=" selected=true >等于</option>
			                        <option  value="like">匹配</option>
								</select>                        
			              </td>
						   <td><div name="ename" id="ename" maxlength="32"  dojoType="unieap.form.TextBox" ></div>
						  </td>
		            </tr>
		            <tr>
		            	 <td class="td">
			                <label for="job" style="width:40px;">职位:</label>
			              </td>
					     <td class="td">    
							     <select  id="jobCom" dojoType="unieap.form.ComboBox"  readonly=true width="60px" dataProvider="{staticData:true}" hasDefault="true">
								    <option  value="=" selected=true >等于</option>
			                        <option  value="like">匹配</option>
								</select>                    
			              </td>
						  <td>
						   	<div name="job" id="job" maxlength="9"   dojoType="unieap.form.TextBox" ></div>
						  </td>
			              <td class="td">
			                <label for="sal" style="width:40px;">工资:</label>
			 			  </td>
					     <td class="td">  
							 <select  id="salCom" dojoType="unieap.form.ComboBox"  readonly=true width="60px" dataProvider="{staticData:true}" hasDefault="true">
								    <option  value="=" selected=true >等于</option>
			                        <option  value="&gt">大于</option>
			                        <option value="&lt">小于</option>
								</select>                          
			              </td>
						  <td>
						   	<div name="sal" id="sal" maxlength="7"  dojoType="unieap.form.NumberTextBox" value=""  displayFormat="######"></div>
						  </td>
		             
		            </tr>
					<tr>
						 <td class="td">
		                 	<label for="hiredate" style="width:40px;">入司日期:</label>
			              </td>
					     <td class="td">  
							  <select  id="dateCom" dojoType="unieap.form.ComboBox"  readonly=true width="60px" dataProvider="{staticData:true}" hasDefault="true">
								    <option  value="=" selected=true >等于</option>
			                        <option  value="&gt">大于</option>
			                        <option value="&lt">小于</option>
								</select>                           
			              </td>
			              <td>
			              	<div type="text" id="hiredate" name="hiredate"  dojoType="unieap.form.DateTextBox"></div>
						  </td>
						  <td class="td">
			                 <label for="deptno" style="width:40px;">部门:</label>
			              </td>
						   <td class="td">  <label style="width:40px;"> 等于 </label>                   
			              </td>
			              <td>
			              	<div type="text" id="deptno" name="deptno"  dojoType="unieap.form.ComboBox" dataProvider="{'store':'DEPT'}" hasDefault="true"></div>
						  </td>
					</tr>
		          </table>
		        </div>
		        <div style="text-align: right">
		        	<div dojoType="unieap.form.Button" label="查询" class="formfield" onClick="query"> </div>
		        	<div dojoType="unieap.form.Button" label="重置" class="formfield" onClick="reset"></div>
		        </div>
			</form>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="人员信息">
			  <div id="grid" dojoType="unieap.grid.Grid" binding="{store:'empDS'}" width="100%" height="300px"
				views="{rowNumber:true,rowBar:true,orderType:'client'}"	>
				<header>
					<cell label="编号" name="empno" width="10%" ></cell>
					<cell label="姓名" name="ename" width="20%" >	</cell>
					<cell label="职位" name="job" width="20%" ></cell>
					<cell label="工资" name="sal" width="20%" ></cell>
					<cell label="入职时间" name="hiredate" width="20%" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
					<cell label="部门" name="deptno" width="10%" decoder="{store:'DEPT'}"></cell>
				</header>
				<toolbar paging="{url:'/pojoTest.do?method=empQuery'}"></toolbar>   
			</div>
		</div>
    </body>
</html>