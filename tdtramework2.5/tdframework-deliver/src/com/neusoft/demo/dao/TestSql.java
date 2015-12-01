package com.neusoft.demo.dao;

import java.util.ArrayList;
import java.util.List;

import com.neusoft.tdframework.dao.SqlBuilder;

public class TestSql {
	
	public String useStringBuffer(IndCustDetailVO indvo,int startRow,int endRow){
		StringBuffer sql = new StringBuffer();
		ArrayList cnd = new ArrayList();
		ArrayList typ = new ArrayList();
		
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
			if(indvo.getAreaLevel()> 3 ){
				sql.append("and decode(f_use_area_id,null,f_area_id,f_use_area_id) like ? ");
				cnd.add(indvo.getAreaId()+"%");
				typ.add("string");
			}
		}else{
			sql.append("and a.f_assign_flag = 3 ");
			if(!"-200".equals(indvo.getCustMgr())){ 
				sql.append("and a.f_channel_id = ? ");
				cnd.add(indvo.getCustMgr());
				typ.add("string");
			}
		}
		if(indvo.getHcustType()!= -200){
			sql.append("and a.f_hcust_type = ? ");
			cnd.add(String.valueOf(indvo.getHcustType()));
			typ.add("int");
		}
		else{
			/**sql.append("and a.f_hcust_type in (1,2) ");modify by wangyan at 20050902*/
			sql.append("and a.f_hcust_type <> 3 ");
		}
		if(indvo.getHcustKind()!= -200){
			sql.append("and a.f_hcust_kind = ? ");
			cnd.add(String.valueOf(indvo.getHcustKind()));
			typ.add("int");
		}
		else{
			/**sql.append("and a.f_hcust_kind in (1,2,3,5,6) ");modify by wangyan at 20050902*/
			sql.append("and a.f_hcust_kind <> 4 ");
		}
		if(indvo.getHcustGrade()!=-200){
			sql.append("and a.f_hcust_grade = ? ");
			cnd.add(String.valueOf(indvo.getHcustGrade()));
			typ.add("int");
		}
		if(indvo.getHcustStatus()!=-200){
			sql.append("and a.f_hcust_status = ? ");
			cnd.add(String.valueOf(indvo.getHcustStatus()));
			typ.add("int");
		}
		if(indvo.getCareCustName()!=null&&!indvo.getCareCustName().equals("")){
			sql.append("and a.f_care_cust_name like ? ");
			cnd.add("%"+indvo.getCareCustName()+"%");
			typ.add("string");
		}
		if(indvo.getGroupName()!=null&&!indvo.getGroupName().equals("")){
			sql.append("and a.f_group_name like ? ");
			cnd.add("%"+indvo.getGroupName()+"%");
			typ.add("string");
			sql.append("and a.f_group_flag = 1 ");
		}
		if(indvo.getCareCustType() != -200){
			sql.append("and a.f_care_cust_type = ? ");
			cnd.add(String.valueOf(indvo.getCareCustType()));
			typ.add("int");
		}
		if(indvo.getCoreHigh() != -200){
			sql.append("and a.f_addi_hcust_props = ? ");
			cnd.add(String.valueOf(indvo.getCoreHigh()));
			typ.add("int");
		}
		if((indvo.getImpMon()!=null && !indvo.getImpMon().equals("")) || indvo.getImpDay()!=null && !indvo.getImpDay().equals("")) {
			sql.append("and exists ( ");
			sql.append("select '' ");
			sql.append("from cm_cust_imp_date_t c ");
			sql.append("where c.f_customer_id = a.f_care_cust_id and c.f_part_city = a.f_part_city ");
			
			if(indvo.getImpMon()!=null && !indvo.getImpMon().equals("")){
				sql.append("and c.f_imp_date_month = ? ");
				cnd.add(indvo.getImpMon());
				typ.add("string");
			}
			if(indvo.getImpDay()!=null&&!indvo.getImpDay().equals("")){
				sql.append("and c.f_imp_date_day = ? ");
				cnd.add(indvo.getImpDay());
				typ.add("string");
			}

			sql.append(")");
		}

		sql.append(" and rownum < ?) where row#num >= ? ");
		
		
//		Connection conn = null;
//		PreparedStatement pstmt = null;
//		conn = getConnection();
//		pstmt = conn.prepareStatement(sql.toString());
//			
//			for(int i=0;i<cnd.size();i++){
//				if(typ.get(i).toString().equals("string")){
//					pstmt.setString(i+1, cnd.get(i).toString());
//				}
//				else if(typ.get(i).toString().equals("int")){
//					pstmt.setInt(i+1, Integer.parseInt(cnd.get(i).toString()));
//				}
//			}
//
//			pstmt.setInt(cnd.size()+1,endRow);
//			pstmt.setInt(cnd.size()+2,startRow);
		
		return sql.toString();
	}
	
	
	public String useSqlBuilder(IndCustDetailVO indvo,int startRow,int endRow){
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

		
		if((indvo.getImpMon()!=null && !indvo.getImpMon().equals("")) || indvo.getImpDay()!=null && !indvo.getImpDay().equals("")) {
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
		System.out.println(sqlArg);
		
		return sql.getSQL();
	}
	
	

	
	public static void main(String[] args) {
		TestSql test=new TestSql();
		
		IndCustDetailVO indvo =new IndCustDetailVO();
		
		int startRow=15;
		int endRow=30;
		
		String classicSql=test.useStringBuffer(indvo, startRow, endRow);
		String newSql=test.useSqlBuilder(indvo, startRow, endRow);
		System.out.println("===============");
		System.out.println(classicSql );
		System.out.println("===============");
		System.out.println(newSql );
		System.out.println("===============");
		System.out.println(classicSql.equals(newSql));
	}
}
