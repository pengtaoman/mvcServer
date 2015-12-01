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

	
//	��ѯ
	public List queryUserList(Map param){

		// ƴװsql ׼������
		SqlBuilder bsql=new SqlBuilder();
		
		bsql.append("select * from user_info where userid <= ? order by userid ");
		bsql.addArg(Integer.valueOf((String)param.get("max_userid")) );

		// ȡ��jdbc������
		final JdbcHandler jdbcHandler=createJdbcHandler();
		
		//����1 sql���, ����2 ���������ɵ�list.
		List rslist=jdbcHandler.queryList(bsql.getSQL(),bsql.getSQLArgs(), 
			new ResultSetHandler(){
				// ����������,�൱�ڴ�ͳ�� while(rs.next){...}�ڲ���Ҫ���Ĺ���
				public void processRow(ResultSet rs) throws SQLException {
						// ��װ��¼��Ӧ�Ķ���,recordObj������bean(vo) map...
						// ���������vo����.
					UserInfoVO recordObj=new UserInfoVO();
					recordObj.setUserId(new Integer(rs.getInt("USERID")));
					recordObj.setUserName(rs.getString("USERNAME"));
					recordObj.setPassword(rs.getString("PASSWD"));
					recordObj.setUserRole(rs.getString("USERROLE"));
					recordObj.setRegdate(rs.getString("REGDATE"));
					recordObj.setEmail(rs.getString("EMAIL"));
					recordObj.setGender(rs.getString("GENDER"));
					recordObj.setMemo(rs.getString("MEMO"));
						// ����¼���뼯��
						addRecord(recordObj);
				}
			}
		);
		
		return rslist;
		
	}

//	Ƕ�ײ�ѯ
	public List queryNsubQueryUserList(Map param){

		// ƴװsql ׼������
		SqlBuilder bsql=new SqlBuilder();

		bsql.append("select * from user_info where userid <= ? order by userid");
		bsql.addArg(Integer.valueOf((String)param.get("max_userid")) );

		// ȡ��jdbc������
		final JdbcHandler jdbcHandler=createJdbcHandler();
		
		
		// �Ӳ�ѯ���
		final String subSql="select REGDATE,MEMO from user_info where userid = ?";
		final JdbcHandler subJdbcHandler=createJdbcHandler();
		
		// �ڲ��Ӳ�ѯ���Ҫ���ⲿ��ѯʹ��ͬһ��������ô��ֻ������ķ���
		subJdbcHandler.setStaticConnection(jdbcHandler.getStaticConnection());
		// �ڲ��Ӳ�ѯ���Ҫʹ��Ψһ����,���Ǻ��ⲿ��ѯ��ʹ��ͬһ������ ��ô��ֻ������ķ���:
		// subJdbcHandler.setUseOneConnection(true);
		
		List rslist=jdbcHandler.queryList(bsql.getSQL(),bsql.getSQLArgs(), 
			new ResultSetHandler(){
				public void processRow(ResultSet rs) throws SQLException {
					final UserInfoVO recordObj=new UserInfoVO();
					recordObj.setUserId(new Integer(rs.getInt("USERID")));

					// ======= �Ӳ�ѯ��� subQueryArgsΪ�Ӳ�ѯ��������б� =========
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
						
						// ����¼���뼯��
						addRecord(recordObj);
				}
			}
		);
		subJdbcHandler.releaseConnection();
		jdbcHandler.releaseConnection();
		
		return rslist;
		
	}
	
	public int updateUserEmail(Map param){
		// update insert delete��������,���ǵ���jdbcHandler.update()����.
		// ֻ�ٴ�һ��.
		
		// ƴװsql ׼������
		SqlBuilder bsql=new SqlBuilder();
		
		bsql.append("update user_info set email=? where userid = ? ");
		bsql.addArg((String)param.get("email") );
		bsql.addArg(Integer.valueOf((String)param.get("userid")) );
		
		// ȡ��jdbc������
		final JdbcHandler jdbcHandler=createJdbcHandler();
		
		int rscode=jdbcHandler.update(bsql.getSQL(),bsql.getSQLArgs());

		return rscode;
	}

	public int insertUser(Map param){
		
		// ƴװsql ׼������
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
		
		// ȡ��jdbc������
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
		
		// ƴװsql ׼������
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
		
		// ȡ��jdbc������
		final JdbcHandler jdbcHandler=createJdbcHandler();
		
		int rscode=jdbcHandler.update(bsql.getSQL(),bsql.getSQLArgs());
	
		return rscode;
	}
	
	
	public int deleteUser(Map param){
		
		// ƴװsql ׼������
		SqlBuilder bsql=new SqlBuilder();
		
		bsql.append("delete  from user_info t where t.username like ? ");
		bsql.addArg((String)param.get("username") );
		
		// ȡ��jdbc������
		final JdbcHandler jdbcHandler=createJdbcHandler();
		
		int rscode=jdbcHandler.update(bsql.getSQL(),bsql.getSQLArgs());
		
		return rscode;
	}
	
	public int[] insertSomeUser(Map param){
		// update insert delete��������,���ǵ���jdbcHandler.update()����.
		// ������ֻ������������һ��.
		
		// ƴװsql ׼������ ,�Լ���������
		SqlBuilder bsql=new SqlBuilder();
		// sqlArgΪ���������ÿ������, sqlArgListΪ�������ݵļ���
		List sqlArgList=new ArrayList();
		List sqlArg=null;
		
		bsql.append("INSERT INTO USER_INFO (USERID,USERNAME,PASSWD,USERROLE,REGDATE,EMAIL,GENDER,MEMO) ");
		bsql.append(" VALUES(USER_INFO_SEQ.NEXTVAL ,?,?,?,SYSDATE,?,?,?)");
		
		//�������¿��ǵ�Ч�ʵ�����,spring��Ҫ������ǰ����ø�������������.
		// �˴�6����������varchar����.
		int[] types=new int[]{				
			Types.VARCHAR, Types.VARCHAR, Types.VARCHAR,
			Types.VARCHAR, Types.VARCHAR, Types.VARCHAR
		};
;
		//�����������������num������Ϊ��.
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

		
		// ȡ��jdbc������
		final JdbcHandler jdbcHandler=createBatchUpdateHandler();
		
		int[] rscodes= jdbcHandler.updateBatch(bsql.getSQL(),sqlArgList,types );
		
		return rscodes;
	}
	
	
	public Map callProcedure(Map param){
		final JdbcHandler jdbcHandler=createProcedureHandler();
		// ������
		jdbcHandler.setProcedureName("get_userinfo_p");
		// ������̵Ĵ��� ��������(˳������)
		jdbcHandler.setInParamInteger("userid", Integer.valueOf((String)param.get("userid")) );
		jdbcHandler.setOutParamVarchar("username");
		jdbcHandler.setOutParamVarchar("usermemo");
		
		// ��������е� "userid","username","usermemo"ֻ��һ��key,����Ϊ����ֵ.
		
		// ����һ��map,ͨ������Ĵ���������keyȡ����Ӧ����ֵ.
		return jdbcHandler.call();
	}
	
	public Map callFunction(Map param){
		final JdbcHandler jdbcHandler=createProcedureHandler();
		// ���ú��� �͹��̵Ĳ�ͬ:
		// 1 Ҫ setFunction(true);
		// 2 Ҫ�ȶ���������� ,�����������
		jdbcHandler.setProcedureName("get_userinfo_fun");
		jdbcHandler.setFunction(true);
		jdbcHandler.setOutParamVarchar("username");
		jdbcHandler.setInParamInteger("userid", Integer.valueOf((String)param.get("userid")) );
		
		return jdbcHandler.call();
	}
	

	
	

}
