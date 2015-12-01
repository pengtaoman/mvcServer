package com.neusoft.demo.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.neusoft.tdframework.dao.SqlBuilder;
import com.neusoft.tdframework.dao.TDBaseDAO;
import com.neusoft.tdframework.dao.jdbchandler.JdbcHandler;
import com.neusoft.tdframework.dao.jdbchandler.ResultSetHandler;


public class NewTestDAO  extends TDBaseDAO {
//	查询
	public List queryUserList(IndCustDetailVO indvo,int startRow,int endRow){

		// 拼装sql 准备参数
		final JdbcHandler jdbcHandler=createJdbcHandler();
		SqlBuilder sql=new SqlBuilder();
		sql.append("select * from ");		//分页需要
		sql.append("(");			//分页需要
		sql.append("select rownum row#num, a.f_service_id, a.f_service_kind, a.f_customer_id, ");
		sql.append("a.f_care_cust_id, a.f_cust_name cust_name, a.f_care_cust_name, ");
		sql.append("a.f_hcust_type, a.f_hcust_kind, a.f_hcust_grade, ");
		sql.append("a.f_hcust_status, a.f_group_name, a.f_retain_date,a.f_addi_hcust_props,a.f_service_no,b.f_channel_name ");
		sql.append("from cm_hcust_srv_t a , cm_channel_t b ");
		sql.append("where a.f_logout_date is null and a.f_channel_id=b.f_channel_id(+) ");

		
		//管理员根据地市编码提取客户－省份中心管理员不考虑地市
		if(indvo.getFlag()== 1 && indvo.getAreaLevel()<= 4 ){
			sql.ifGreat(indvo.getAreaLevel(), 3)
				.append("and decode(f_use_area_id,null,f_area_id,f_use_area_id) like ? ").addArg(indvo.getAreaId()+"%");
		}else{
			sql.append("and a.f_assign_flag = 3 ");
			sql.ifNotEquals(indvo.getCustMgr(), "-200").append("and a.f_channel_id = ? ").addArg(indvo.getCustMgr());
		}
		
		sql.ifNotEquals(indvo.getHcustType(), -200).append("and a.f_hcust_type = ? ").addArg(indvo.getHcustType())
			.elseC().append("and a.f_hcust_type <> 3 ").endIf();
		sql.ifNotEquals(indvo.getHcustKind(), -200)	.append("and a.f_hcust_kind = ? ").addArg(indvo.getHcustType())
			.elseC().append("and a.f_hcust_kind <> 4 ").endIf();	
		sql.ifNotEquals(indvo.getHcustGrade(), -200).append("and a.f_hcust_grade = ? ").addArg(indvo.getHcustGrade()).endIf();
		sql.ifNotEquals(indvo.getHcustStatus(), -200).append("and a.f_hcust_status = ? ").addArg(indvo.getHcustStatus()).endIf();
		sql.ifNotEmpty(indvo.getCareCustName())	.append("and a.f_care_cust_name like ? ").addArg("%"+indvo.getCareCustName()+"%").endIf();
		sql.ifNotEmpty(indvo.getGroupName()).append("and a.f_group_name like ? and a.f_group_flag = 1  ").addArg("%"+indvo.getCareCustName()+"%").endIf();
		sql.ifNotEquals(indvo.getCareCustType(), -200).append("and a.f_care_cust_type = ? ").addArg(indvo.getCareCustType()).endIf();
		sql.ifNotEquals(indvo.getCoreHigh(), -200).append("and a.f_addi_hcust_props = ? ").addArg(indvo.getCoreHigh()).endIf();

		
		if((!"".equals(indvo.getImpMon())) || (!"".equals(indvo.getImpDay()))){
			sql.append("and exists ( ");
			sql.append("select '' ");
			sql.append("from cm_cust_imp_date_t c ");
			sql.append("where c.f_customer_id = a.f_care_cust_id and c.f_part_city = a.f_part_city ");
			
			sql.ifNotEmpty(indvo.getImpMon()).append("and c.f_imp_date_month = ? ").addArg(indvo.getImpMon()).endIf();

			sql.ifNotEmpty(indvo.getImpDay()).append("and c.f_imp_date_day = ? ").addArg(indvo.getImpDay()).endIf();

			sql.append(")");
		}

		sql.append(" and rownum < ?) where row#num >= ? ").addArg(endRow).addArg(startRow);

		List sqlArg=sql.getSQLArgs();
		
		
		// 子查询相关
		final JdbcHandler subJdbcHandler=createJdbcHandler();	
		final SqlBuilder subSql = new SqlBuilder();
		subSql.append("select a.city_code, a.subscriber_id,  ");
		subSql.append("(SELECT name FROM bb_serving_status_t  ");
		subSql.append("WHERE kind=a.SERVING_STATUS) f_service_status  ");
		subSql.append("from bb_service_relation_t a, bb_customer_info_t b  ");
		subSql.append("where a.subscriber_id = b.customer_id  ");
		subSql.append(" and b.city_code = a.city_code ");
		subSql.append(" and a.service_id = ? AND a.service_kind = ?  ");
		subSql.append(" and a.if_valid = 1 ");

		
		
		//参数1 sql语句, 参数2 传入参数组成的list.
		List rslist=jdbcHandler.queryList(sql.getSQL(),sqlArg, 
			new ResultSetHandler(){
				// 创建匿名类,相当于传统的 while(rs.next){...}内部所要做的工作
				public void processRow(ResultSet rest) throws SQLException {
						// 组装记录对应的对象,recordObj可以是bean(vo) map...
						// 下面代码以vo举例.
					final IndCustDetailVO vo = new IndCustDetailVO();
					
					vo.setServiceId(rest.getString("f_service_id"));
					vo.setServiceKind(rest.getInt("f_service_kind"));
					vo.setCustomerId(rest.getLong("f_customer_id"));
					vo.setHcustType(rest.getInt("f_hcust_type"));
					vo.setHcustKind(rest.getInt("f_hcust_kind"));
					vo.setHcustGrade(rest.getInt("f_hcust_grade"));
					vo.setHcustStatus(rest.getInt("f_hcust_status"));
					vo.setCustName(rest.getString("cust_name"));
					vo.setCareCustName(rest.getString("f_care_cust_name"));
					vo.setGroupName(rest.getString("f_group_name"));
					vo.setRetainDate(rest.getString("f_retain_date"));
					vo.setCoreHigh(rest.getInt("f_addi_hcust_props"));
					vo.setServiceNo(rest.getLong("f_service_no"));
					vo.setHcustGradeStr(vo.getHcustType(),vo.getHcustKind(),vo.getHcustGrade());
					vo.setChannelName(rest.getString("f_channel_name"));

				
					// ====== 子查询 =======
					List subQueryArgs=new ArrayList();
					subQueryArgs.add(vo.getServiceId());
					subQueryArgs.add(new Integer(vo.getServiceKind()));
					
					subJdbcHandler.queryOneReocrd(subSql.getSQL(), subQueryArgs, 
						new ResultSetHandler(){
							public void processRow(ResultSet rs) throws SQLException {
								vo.setPartCity(rs.getString(1));
								vo.setSubscriberId(rs.getLong(2));
								vo.setSrvStatus(rs.getString(3));
							}
						}
					);
					
					
					addRecord(vo);
				}
			}
		);
		
		return rslist;
		
	}
}
