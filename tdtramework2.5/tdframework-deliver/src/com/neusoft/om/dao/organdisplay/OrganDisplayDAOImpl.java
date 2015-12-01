package com.neusoft.om.dao.organdisplay;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;

/**brief description
 * <p>Date       : 2004-10-28</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class OrganDisplayDAOImpl extends BaseDaoImpl implements OrganDisplayDAO {
	
	public OrganDisplayColl getAreaInfoToOrganDisply(String areaId) throws DataAccessException{
		OrganDisplayColl coll = new OrganDisplayColl();
		OrganDisplayVO vo;
		StringBuffer buf = new StringBuffer();
		buf.append(" SELECT LEVEL f_organ_level,f_area_id f_organ_id,f_area_name f_organ_name,");
		buf.append(" f_parent_area_id f_parent_organ_id,'area' f_organ_kind,f_area_id f_belong_area");
		buf.append(" FROM (select * from OM_AREA_T order by f_area_name ) ");
		buf.append(" START WITH f_area_id = ?");
		buf.append(" CONNECT BY PRIOR f_area_id = f_parent_area_id");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,areaId);
			rest = pstmt.executeQuery();
	
			while(rest.next()) {
				vo = new OrganDisplayVO();
				vo.setAttribute(rest);			
				coll.addOrganDisplay(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getAreaInfoToOrganDisply-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getAreaInfoToOrganDisply-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	
	public OrganDisplayColl getAreaInfoToOrganDisply(String areaId,int areaLevel) throws DataAccessException{
		OrganDisplayColl coll = new OrganDisplayColl();
		OrganDisplayVO vo;
		StringBuffer buf = new StringBuffer();
		buf.append(" SELECT LEVEL f_organ_level,f_area_id f_organ_id,f_area_name f_organ_name,");
		buf.append(" f_parent_area_id f_parent_organ_id,'area' f_organ_kind,f_area_id f_belong_area,f_area_level");
		buf.append(" FROM (select * from OM_AREA_T where f_area_level <= ?");
		buf.append(" 		order by f_area_id ) ");
		buf.append(" START WITH f_area_id = ?");
		buf.append(" CONNECT BY PRIOR f_area_id = f_parent_area_id");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1,areaLevel);
			pstmt.setString(2,areaId);
			rest = pstmt.executeQuery();
	
			while(rest.next()) {
				vo = new OrganDisplayVO();
				vo.setAttribute(rest);			
				coll.addOrganDisplay(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getAreaInfoToOrganDisply-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getAreaInfoToOrganDisply-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	
	public OrganDisplayColl getOrganInfoToOrganDisply(String areaId,int level) throws DataAccessException{
		OrganDisplayColl coll = new OrganDisplayColl();
		OrganDisplayVO vo;
		StringBuffer buf = new StringBuffer();
		buf.append("SELECT LEVEL+? f_organ_level,f_organ_id,f_organ_name,NVL(f_parent_organ_id,'') f_parent_organ_id,");
		buf.append("'organ' f_organ_kind,").append("? f_belong_area, f_organ_kind f_kind, f_order");
		buf.append(" FROM (select * from OM_ORGAN_T ) ");
		buf.append(" WHERE  f_area_id = ?");
		buf.append(" START WITH f_organ_id = (SELECT f_organ_id");
		buf.append("	 FROM OM_ORGAN_T");
		buf.append("	 WHERE f_area_id = ?");
		buf.append("	 AND f_parent_organ_id IS NULL)");
		buf.append(" CONNECT BY PRIOR f_organ_id = f_parent_organ_id ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1,level);
			pstmt.setString(2,areaId);
			pstmt.setString(3,areaId);
			pstmt.setString(4,areaId);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				vo = new OrganDisplayVO();
				vo.setAttribute(rest);			
				coll.addOrganDisplay(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getOrganInfoToOrganDisply-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getOrganInfoToOrganDisply-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}

	public OrganDisplayColl getDutyInfoToOrganDisplay(String organId, int level,String areaId,int organKind) throws DataAccessException {
		OrganDisplayColl coll = new OrganDisplayColl();
		OrganDisplayVO vo;
		System.out.println(organKind);
		StringBuffer buf = new StringBuffer();
		buf.append(" SELECT LEVEL+? f_organ_level,?||'|'||f_duty_id f_organ_id,f_duty_name f_organ_name,NVL(f_parent_duty_id,'') f_parent_organ_id,");
		buf.append(" 'duty' f_organ_kind,? f_belong_area");
		buf.append(" FROM (select * from OM_DUTY_T order by f_duty_name ) ");
		buf.append(" WHERE f_organ_kind = ?");
		buf.append(" START WITH f_duty_id = (SELECT f_duty_id");
		buf.append("						FROM OM_DUTY_T");
		buf.append("						WHERE f_organ_kind = ?");
		buf.append("						AND f_parent_duty_id IS NULL)");
		buf.append(" CONNECT BY PRIOR f_duty_id = f_parent_duty_id ");
		String sql = buf.toString();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,level);
			pstmt.setString(2,organId);
			pstmt.setString(3,areaId);
			pstmt.setInt(4,organKind);
			pstmt.setInt(5,organKind);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				vo = new OrganDisplayVO();
				vo.setAttribute(rest);			
				coll.addOrganDisplay(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getDutyInfoToOrganDisplay-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getDutyInfoToOrganDisplay-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	
	/**
	 * 得到只有区域和市场部的数据，给渠道系统使用
	 * 注意，由于是否“市场部”只能通过om_organ_kind_t中的数据判断，
	 * 因此om_organ_kind_t中f_department_kind_t字段值不能轻易变化，此处认为2表示市场部
	 * @param areaId
	 * @param level
	 * @return
	 * @throws DataAccessException
	 */
	public OrganDisplayColl getMarketOrganToDisplay(String areaId,int level)throws DataAccessException{
		OrganDisplayColl coll = new OrganDisplayColl();
		OrganDisplayVO vo;
		StringBuffer buf = new StringBuffer();
		buf.append("SELECT LEVEL+? f_organ_level,f_organ_id,f_organ_name,NVL(f_parent_organ_id,'') f_parent_organ_id,");
		buf.append("'organ' f_organ_kind,").append("? f_belong_area, f_organ_kind f_kind");
		buf.append(" FROM (select * from OM_ORGAN_T order by f_organ_name ) ");
		buf.append(" WHERE  f_area_id = ? ");
		buf.append(" AND f_organ_kind in " +
				"(SELECT f_organ_kind FROM om_organ_kind_t WHERE f_department_kind = 2 " +
				"UNION SELECT f_parent_organ_kind FROM om_organ_kind_t WHERE f_department_kind = 2)");//需要同时显示市场部的上级组织机构否则树无法构建
		buf.append(" START WITH f_organ_id = (SELECT f_organ_id");
		buf.append("	 FROM OM_ORGAN_T");
		buf.append("	 WHERE f_area_id = ?");
		buf.append("	 AND f_parent_organ_id IS NULL)");
		buf.append(" CONNECT BY PRIOR f_organ_id = f_parent_organ_id ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1,level);
			pstmt.setString(2,areaId);
			pstmt.setString(3,areaId);
			pstmt.setString(4,areaId);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				vo = new OrganDisplayVO();
				vo.setAttribute(rest);			
				coll.addOrganDisplay(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getOrganInfoToOrganDisply-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getOrganInfoToOrganDisply-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	
	/**
	 * 得到某area_id下所有市场部下的渠道集合
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganDisplayColl getDealerColl(String organId,int level)throws DataAccessException{
		OrganDisplayColl coll = new OrganDisplayColl();
		OrganDisplayVO vo;
		StringBuffer buf = new StringBuffer();
		buf.append("select LEVEL+? f_organ_level, dealer.DEALER_ID f_organ_id, dealer.DEALER_NAME f_organ_name,");
		buf.append(" dealer.BELONGS_PART ,dealer.dealer_parent f_parent_organ_id, area.F_AREA_ID f_belong_area, ");
		buf.append(" 'dealer' f_organ_kind, area.F_AREA_LEVEL ");
		buf.append(" from om_area_t area, om_organ_t organ, bd_dealer_t dealer ");
		buf.append(" where area.f_city_code = dealer.city_code ");
		buf.append(" and area.F_AREA_ID = organ.F_AREA_ID ");
		buf.append(" and organ.F_ORGAN_ID = dealer.BELONGS_PART ");
		buf.append(" START WITH organ.F_ORGAN_ID= ? ");
		buf.append(" CONNECT BY PRIOR organ.f_organ_id = organ.f_parent_organ_id ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, level);
			pstmt.setString(2,organId);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				vo = new OrganDisplayVO();
				vo.setAttribute(rest);			
				coll.addOrganDisplay(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getDealerColl-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getDealerColl-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	
	
	public OrganDisplayColl getMarketColl(String areaId, int level) throws DataAccessException{
		OrganDisplayColl coll = new OrganDisplayColl();
		OrganDisplayVO vo;
		StringBuffer buf = new StringBuffer();
		buf.append("SELECT distinct LEVEL+? f_organ_level,f_organ_id,f_organ_name,NVL(f_parent_organ_id,'') f_parent_organ_id," +
				   " 'organ' f_organ_kind,? f_belong_area, f_organ_kind f_kind " +
				   " FROM  OM_ORGAN_T WHERE  f_area_id = ?" +
				   " START WITH f_organ_id in (select belongs_part from bd_dealer_main_t) " +
				   " CONNECT BY  f_organ_id =PRIOR  f_parent_organ_id ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1,level);
			pstmt.setString(2,areaId);
			pstmt.setString(3,areaId);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				vo = new OrganDisplayVO();
				vo.setAttribute(rest);			
				coll.addOrganDisplay(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getMarketColl-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getMarketColl-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	
	public OrganDisplayColl getMarketAreaColl(String areaId, int level) throws DataAccessException{
		OrganDisplayColl coll = new OrganDisplayColl();
		OrganDisplayVO vo;
		StringBuffer buf = new StringBuffer();
		buf.append("select distinct  f_area_level f_organ_level,f_area_id f_organ_id,f_area_name f_organ_name,");
		buf.append(" f_parent_area_id f_parent_organ_id,'area' f_organ_kind,f_area_id f_belong_area,f_area_level " +
				"from " +
				"(SELECT * FROM OM_AREA_T a where f_area_level < ? start with f_area_id = ?" +
				" CONNECT BY  PRIOR f_area_id =  f_parent_area_id  ) a " +
				" start with a.f_area_id in  " +
				"	(select distinct area.f_area_id " +
				   " from om_area_t area, om_organ_t organ, bd_dealer_main_t dealer  " +
				   " where area.f_area_id = organ.f_area_id and organ.f_organ_id = dealer.belongs_part)" +
				" CONNECT BY   f_area_id = PRIOR  f_parent_area_id  ");		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1,level);
			pstmt.setString(2,areaId);
			rest = pstmt.executeQuery();	
			while(rest.next()) {
				vo = new OrganDisplayVO();
				vo.setAttribute(rest);			
				coll.addOrganDisplay(vo);
				
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getAreaInfoToOrganDisply-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDisplayDAOImpl--getAreaInfoToOrganDisply-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	
	//public OrganColl 
}                                                                                                                      