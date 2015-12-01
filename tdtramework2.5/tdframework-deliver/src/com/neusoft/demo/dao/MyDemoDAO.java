package com.neusoft.demo.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.dao.DataAccessExceptionWrapper;
import com.neusoft.tdframework.dao.SqlBuilder;
import com.neusoft.tdframework.dao.TDBaseDAO;
import com.neusoft.tdframework.dao.jdbchandler.JdbcHandler;
import com.neusoft.tdframework.dao.jdbchandler.ResultSetHandler;

public class MyDemoDAO extends TDBaseDAO {

	
//	查询
	public List queryUserList(Map param){

		// 拼装sql 准备参数
		SqlBuilder bsql=new SqlBuilder();
		
		bsql.append("select * from user_info where userid <= ? order by userid ");
		bsql.addArg(Integer.valueOf((String)param.get("max_userid")) );

		// 取得jdbc工具类
		final JdbcHandler jdbcHandler=createJdbcHandler();
		
		//参数1 sql语句, 参数2 传入参数组成的list.
		List rslist=jdbcHandler.queryList(bsql.getSQL(),bsql.getSQLArgs(), 
			new ResultSetHandler(){
				// 创建匿名类,相当于传统的 while(rs.next){...}内部所要做的工作
				public void processRow(ResultSet rs) throws SQLException {
						// 组装记录对应的对象,recordObj可以是bean(vo) map...
						// 下面代码以vo举例.
					UserInfoVO recordObj=new UserInfoVO();
					recordObj.setUserId(new Integer(rs.getInt("USERID")));
					recordObj.setUserName(rs.getString("USERNAME"));
					recordObj.setPassword(rs.getString("PASSWD"));
					recordObj.setUserRole(rs.getString("USERROLE"));
					recordObj.setRegdate(rs.getString("REGDATE"));
					recordObj.setEmail(rs.getString("EMAIL"));
					recordObj.setGender(rs.getString("GENDER"));
					recordObj.setMemo(rs.getString("MEMO"));
						// 将记录放入集合
						addRecord(recordObj);
				}
			}
		);
		
		return rslist;
		
	}

//	嵌套查询
	public List queryNsubQueryUserList(Map param){

		// 拼装sql 准备参数
		SqlBuilder bsql=new SqlBuilder();

		bsql.append("select * from user_info where userid <= ? order by userid");
		bsql.addArg(Integer.valueOf((String)param.get("max_userid")) );

		// 取得jdbc工具类
		final JdbcHandler jdbcHandler=createJdbcHandler();
		
		
		// 子查询相关
		final String subSql="select REGDATE,MEMO from user_info where userid = ?";
		final JdbcHandler subJdbcHandler=createJdbcHandler();
		
		// 内层子查询如果要和外部查询使用同一个链接那么请只用下面的方法
		subJdbcHandler.setStaticConnection(jdbcHandler.getStaticConnection());
		// 内层子查询如果要使用唯一链接,但是和外部查询不使用同一个链接 那么请只用下面的方法:
		// subJdbcHandler.setUseOneConnection(true);
		
		List rslist=jdbcHandler.queryList(bsql.getSQL(),bsql.getSQLArgs(), 
			new ResultSetHandler(){
				public void processRow(ResultSet rs) throws SQLException {
					final UserInfoVO recordObj=new UserInfoVO();
					recordObj.setUserId(new Integer(rs.getInt("USERID")));

					// ======= 子查询相关 subQueryArgs为子查询所需参数列表 =========
					List subQueryArgs=new ArrayList();
					subQueryArgs.add(recordObj.getUserId());
					subJdbcHandler.queryOneReocrd(subSql, subQueryArgs, 
						new ResultSetHandler(){
							public void processRow(ResultSet rs) throws SQLException {
								recordObj.setRegdate(rs.getString("REGDATE"));
								recordObj.setMemo(rs.getString("MEMO"));
							}
						}
					);
					// ============================================	
					
						recordObj.setUserName(rs.getString("USERNAME"));
						recordObj.setPassword(rs.getString("PASSWD"));
						recordObj.setUserRole(rs.getString("USERROLE"));
						recordObj.setEmail(rs.getString("EMAIL"));
						recordObj.setGender(rs.getString("GENDER"));
						
						// 将记录放入集合
						addRecord(recordObj);
				}
			}
		);
		subJdbcHandler.releaseConnection();
		jdbcHandler.releaseConnection();
		
		return rslist;
		
	}
	
	public int updateUserEmail(Map param){
		// update insert delete方法类似,都是调用jdbcHandler.update()方法.
		// 只举此一例.
		
		// 拼装sql 准备参数
		SqlBuilder bsql=new SqlBuilder();
		
		bsql.append("update user_info set email=? where userid = ? ");
		bsql.addArg((String)param.get("email") );
		bsql.addArg(Integer.valueOf((String)param.get("userid")) );
		
		// 取得jdbc工具类
		final JdbcHandler jdbcHandler=createJdbcHandler();
		
		int rscode=jdbcHandler.update(bsql.getSQL(),bsql.getSQLArgs());

		return rscode;
	}

	public int insertUser(Map param){
		
		// 拼装sql 准备参数
		SqlBuilder bsql=new SqlBuilder();
		
//		USER_INFO_SEQ.NEXTVAL
		
		bsql.append("INSERT INTO USER_INFO (USERID,USERNAME,PASSWD,USERROLE,REGDATE,EMAIL,GENDER,MEMO) ");
		bsql.append(" VALUES(USER_INFO_SEQ.NEXTVAL ,?,?,?,SYSDATE,?,?,?)");
		bsql.addArg((String)param.get("username") );
		bsql.addArg((String)param.get("password") );
		bsql.addArg((String)param.get("userrole") );
		bsql.addArg((String)param.get("email") );
		bsql.addArg((String)param.get("gender") );
		bsql.addArg((String)param.get("memo") );
		
		// 取得jdbc工具类
		final JdbcHandler jdbcHandler=createJdbcHandler();
		
		int rscode=0;
		
		try{
			rscode=jdbcHandler.update(bsql.getSQL(),bsql.getSQLArgs());
		}catch(DataAccessExceptionWrapper dae){
			dae.printStackTrace();
//			System.out.println(dae.getMessage());
//			rscode=0;
		}
		
		return rscode;
	}
	
	
	public int insertUser(UserInfoVO vo){
		
		// 拼装sql 准备参数
		SqlBuilder bsql=new SqlBuilder();
		
//		USER_INFO_SEQ.NEXTVAL
		
		bsql.append("INSERT INTO USER_INFO (USERID,USERNAME,PASSWD,USERROLE,REGDATE,EMAIL,GENDER,MEMO) ");
		bsql.append(" VALUES(USER_INFO_SEQ.NEXTVAL ,?,?,?,SYSDATE,?,?,?)");
		bsql.addArg(vo.getUserName());
		bsql.addArg(vo.getPassword() );
		bsql.addArg(vo.getUserRole());
		bsql.addArg(vo.getEmail() );
		bsql.addArg(vo.getGender() );
		bsql.addArg(vo.getMemo() );
		
		// 取得jdbc工具类
		final JdbcHandler jdbcHandler=createJdbcHandler();
		
		int rscode=jdbcHandler.update(bsql.getSQL(),bsql.getSQLArgs());
	
		return rscode;
	}
	
	
	public int deleteUser(Map param){
		
		// 拼装sql 准备参数
		SqlBuilder bsql=new SqlBuilder();
		
		bsql.append("delete  from user_info t where t.username like ? ");
		bsql.addArg((String)param.get("username") );
		
		// 取得jdbc工具类
		final JdbcHandler jdbcHandler=createJdbcHandler();
		
		int rscode=jdbcHandler.update(bsql.getSQL(),bsql.getSQLArgs());
		
		return rscode;
	}
	
	public int[] insertSomeUser(Map param){
		// update insert delete方法类似,都是调用jdbcHandler.update()方法.
		// 在这里只举批量插入这一例.
		
		// 拼装sql 准备参数 ,以及参数类型
		SqlBuilder bsql=new SqlBuilder();
		// sqlArg为批量插入的每条数据, sqlArgList为所有数据的集合
		List sqlArgList=new ArrayList();
		List sqlArg=null;
		
		bsql.append("INSERT INTO USER_INFO (USERID,USERNAME,PASSWD,USERROLE,REGDATE,EMAIL,GENDER,MEMO) ");
		bsql.append(" VALUES(USER_INFO_SEQ.NEXTVAL ,?,?,?,SYSDATE,?,?,?)");
		
		//批量更新考虑到效率等因素,spring需要我们提前定义好各个参数的类型.
		// 此处6个参数都是varchar类型.
		int[] types=new int[]{				
			Types.VARCHAR, Types.VARCHAR, Types.VARCHAR,
			Types.VARCHAR, Types.VARCHAR, Types.VARCHAR
		};
;
		//在这里仅以批量插入num条数据为例.
		int num=Integer.valueOf((String)param.get("user_num")).intValue();
		for (int i=0;i<num;i++){
				sqlArg=new ArrayList();
				sqlArg.add((String)param.get("username")+"_"+i );
				sqlArg.add((String)param.get("password")+"_"+i );
				sqlArg.add((String)param.get("userrole") );
				sqlArg.add((String)param.get("email")+"_"+i );
				sqlArg.add((String)param.get("gender") );
				sqlArg.add((String)param.get("memo")+"_"+i );
				sqlArgList.add(sqlArg);
		}		

		
		// 取得jdbc工具类
		final JdbcHandler jdbcHandler=createBatchUpdateHandler();
		
		int[] rscodes= jdbcHandler.updateBatch(bsql.getSQL(),sqlArgList,types );
		
		return rscodes;
	}
	
	
	public Map callProcedure(Map param){
		final JdbcHandler jdbcHandler=createProcedureHandler();
		// 过程名
		jdbcHandler.setProcedureName("get_userinfo_p");
		// 定义过程的传入 传出参数(顺序敏感)
		jdbcHandler.setInParamInteger("userid", Integer.valueOf((String)param.get("userid")) );
		jdbcHandler.setOutParamVarchar("username");
		jdbcHandler.setOutParamVarchar("usermemo");
		
		// 以上语句中的 "userid","username","usermemo"只是一个key,可以为任意值.
		
		// 返回一个map,通过定义的传出参数的key取得相应的数值.
		return jdbcHandler.call();
	}
	
	public Map callFunction(Map param){
		final JdbcHandler jdbcHandler=createProcedureHandler();
		// 调用函数 和过程的不同:
		// 1 要 setFunction(true);
		// 2 要先定义输出参数 ,后定义输入参数
		jdbcHandler.setProcedureName("get_userinfo_fun");
		jdbcHandler.setFunction(true);
		jdbcHandler.setOutParamVarchar("username");
		jdbcHandler.setInParamInteger("userid", Integer.valueOf((String)param.get("userid")) );
		
		return jdbcHandler.call();
	}
	

	
	

}
