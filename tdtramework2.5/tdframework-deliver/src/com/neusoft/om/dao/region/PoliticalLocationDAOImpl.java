package com.neusoft.om.dao.region;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.SqlBuilder;
import com.neusoft.tdframework.dao.TDBaseDAO;
import com.neusoft.tdframework.dao.jdbchandler.JdbcHandler;
import com.neusoft.tdframework.dao.jdbchandler.ResultSetHandler;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class PoliticalLocationDAOImpl  extends TDBaseDAO implements PoliticalLocationDAO {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8458958231027825429L;
	
	/**
	 * 根据公用管理区域编号，获取所包含的行政区域信息
	 * @param commonRegionId
	 * @return
	 */
	public PoliticalLocationColl getPoliticalLocationColl(long commonRegionId) throws DataAccessException {
		PoliticalLocationColl politicalLocationColl= new PoliticalLocationColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("SELECT a.location_id, location_code, location_name, 			");
		sqlBuffer.append("    location_desc, location_type, location_abbr,         		");
		sqlBuffer.append(" (SELECT location_type_name FROM political_location_type d	");
		sqlBuffer.append(" WHERE d.location_type=a.location_type) location_type_name,	");
		sqlBuffer.append("    (SELECT location_name FROM political_location c			");
		sqlBuffer.append(" WHERE c.location_id=a.up_location_id)  up_location_name, 	");  
		sqlBuffer.append("    up_location_id, region_relation_id, common_region_id  	");
		sqlBuffer.append("  FROM political_location a, region_relation b           	 	");
		sqlBuffer.append(" 	WHERE b.location_id = a.location_id                      	");
		sqlBuffer.append(" 		AND b.COMMON_REGION_ID=?                                ");

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuffer.toString());
			pstmt.setLong(1, commonRegionId);
			rest = pstmt.executeQuery();
			politicalLocationColl.addPoliticalLocation(rest);
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"PoliticalLocationDAOImpl--getPoliticalLocationColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"PoliticalLocationDAOImpl--getPoliticalLocationColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return politicalLocationColl;
	}
	
	/**
	 * 删除公用管理区域与行政区域的关联关系
	 * @param commonRegionId
	 * @return
	 */
	public int deletePoliticalLocation(long commonRegionId) throws DataAccessException  {
		int result=0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append(" DELETE FROM region_relation	");
		sqlBuffer.append(" WHERE common_region_id=?		");
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuffer.toString());
			pstmt.setLong(1, commonRegionId);
			result = pstmt.executeUpdate();

		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"PoliticalLocationDAOImpl--deletePoliticalLocation-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"PoliticalLocationDAOImpl--deletePoliticalLocation-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(null, pstmt, conn);
		}
		
		return result;
	}
	
	/**
	 * 获得行政区域树形集合
	 * @param politicalLocationRoot
	 * @return
	 */
	public PoliticalLocationColl getPoliticalLocationTreeColl(PoliticalLocationColl politicalLocationRoot) throws DataAccessException  {
		
		PoliticalLocationColl politicalLocationColl= new PoliticalLocationColl();
		
		SqlBuilder bsql = new SqlBuilder();

		bsql.append("select LOCATION_ID,LOCATION_CODE,LOCATION_NAME, ");    
		bsql.append("LOCATION_DESC,LOCATION_TYPE,LOCATION_ABBR,	   	 ");    
		bsql.append("UP_LOCATION_ID,level from POLITICAL_LOCATION	 ");    
		bsql.append("where level<=3						     	  	 ");    
		if(politicalLocationRoot.getRowCount()>0){
			for(int i=0;i<politicalLocationRoot.getRowCount();i++){
				PoliticalLocationVO vo = politicalLocationRoot.getPoliticalLocationVO(i);
				if(i==0){
					bsql.append(" START WITH location_id =	? ");  
					bsql.addArg(vo.getLocationId());
				}else{
					bsql.append(" or location_id =	? ");  
					bsql.addArg(vo.getLocationId());
				}
			}
		}else{
			bsql.append(" START WITH up_location_id is null ");  
		}
		
		bsql.append("CONNECT BY PRIOR location_id = up_location_id   ");   	
		
		final JdbcHandler jdbcHandler = createJdbcHandler();
		List dataList = jdbcHandler.queryList(bsql.getSQL(), bsql
				.getSQLArgs(), new ResultSetHandler() {
			public void processRow(ResultSet rs) throws SQLException {
				PoliticalLocationVO tmpVO = new PoliticalLocationVO();
				tmpVO.setAttribute(rs);
				addRecord(tmpVO);
			}
		});	
		
		politicalLocationColl.setList(dataList);
		
		return politicalLocationColl;
	}

	/**
	 * 新增公用管理区域与行政区域的关联关系
	 * @param commonRegionId
	 * @return
	 */
	public int insertPoliticalLocation(PoliticalLocationVO vo) throws DataAccessException  {
		int result=0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append(" Insert into REGION_RELATION(REGION_RELATION_ID, ");
		sqlBuffer.append(" 				LOCATION_ID, COMMON_REGION_ID)     ");
		sqlBuffer.append(" Values (nvl((SELECT MAX(REGION_RELATION_ID)     ");
		sqlBuffer.append(" FROM REGION_RELATION),0)+1, ?, ?)			   ");
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuffer.toString());
			pstmt.setLong(1, vo.getLocationId());
			pstmt.setLong(2, vo.getCommonRegionId());
			result = pstmt.executeUpdate();

		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"PoliticalLocationDAOImpl--insertPoliticalLocation-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"PoliticalLocationDAOImpl--insertPoliticalLocation-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(null, pstmt, conn);
		}
		
		return result;
	}

}
