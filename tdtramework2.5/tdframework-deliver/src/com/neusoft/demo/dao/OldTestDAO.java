package com.neusoft.demo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataAccessException;

import com.neusoft.tdframework.dao.TDBaseDAO;

public class OldTestDAO  extends TDBaseDAO {

	
	public List getCustInfoByConditions(IndCustDetailVO indvo,int startRow,int endRow)
	throws DataAccessException {

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
	if(!"".equals(indvo.getCareCustName())){
		sql.append("and a.f_care_cust_name like ? ");
		cnd.add("%"+indvo.getCareCustName()+"%");
		typ.add("string");
	}
	if(!"".equals(indvo.getGroupName())){
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
	if((!"".equals(indvo.getImpMon())) || (!"".equals(indvo.getImpDay()))){
		sql.append("and exists ( ");
		sql.append("select '' ");
		sql.append("from cm_cust_imp_date_t c ");
		sql.append("where c.f_customer_id = a.f_care_cust_id and c.f_part_city = a.f_part_city ");
		
		if(!"".equals(indvo.getImpMon())){
			sql.append("and c.f_imp_date_month = ? ");
			cnd.add(indvo.getImpMon());
			typ.add("string");
		}
		if(!"".equals(indvo.getImpDay())){
			sql.append("and c.f_imp_date_day = ? ");
			cnd.add(indvo.getImpDay());
			typ.add("string");
		}

		sql.append(")");
	}

	sql.append(" and rownum < ?) where row#num >= ? ");
	
	
	
	
	StringBuffer bufSql = new StringBuffer();
	bufSql.append("select a.city_code, a.subscriber_id,  ");
	bufSql.append("(SELECT name FROM bb_serving_status_t  ");
	bufSql.append("WHERE kind=a.SERVING_STATUS) f_service_status  ");
	bufSql.append("from bb_service_relation_t a, bb_customer_info_t b  ");
	bufSql.append("where a.subscriber_id = b.customer_id  ");
	bufSql.append(" and b.city_code = a.city_code ");
	bufSql.append(" and a.service_id = ? AND a.service_kind = ?  ");
	bufSql.append(" and a.if_valid = 1 ");
	
	Connection conn = null;
	PreparedStatement pstmt = null;
	ResultSet rest = null;
    PreparedStatement pmt = null;
    ResultSet rt = null;

	List objColl = new ArrayList();
	IndCustDetailVO vo = null;
	try {
		conn = getConnection();
		pstmt = conn.prepareStatement(sql.toString());
		
		for(int i=0;i<cnd.size();i++){
			if(typ.get(i).toString().equals("string")){
				pstmt.setString(i+1, cnd.get(i).toString());
			}
			else if(typ.get(i).toString().equals("int")){
				pstmt.setInt(i+1, Integer.parseInt(cnd.get(i).toString()));
			}
		}

		pstmt.setInt(cnd.size()+1,endRow);
		pstmt.setInt(cnd.size()+2,startRow);
		
		rest = pstmt.executeQuery();	
		while (rest.next()) {
			vo = new IndCustDetailVO();
		
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

			pmt = conn.prepareStatement(bufSql.toString());
			pmt.setString(1, vo.getServiceId());
			pmt.setInt(2, vo.getServiceKind());
			rt  = pmt.executeQuery();
			while(rt.next()){
				vo.setPartCity(rt.getString(1));
				vo.setSubscriberId(rt.getLong(2));
				vo.setSrvStatus(rt.getString(3));
			}
			close(rt, pmt,null);
			objColl.add(vo);
		}
		
	} catch (SQLException e) {
		e.printStackTrace();
	} catch (Exception e) {
		e.printStackTrace();
	} finally {
		close(rest, pstmt, conn);
        close(rt, pmt, conn);
	}

	return objColl;
}

}
