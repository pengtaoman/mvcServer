package com.neusoft.om.dao.region;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class AreaCodeDAOImpl  extends BaseDaoImpl implements AreaCodeDAO {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3064362500140575084L;

	/**
	 * 获取区号信息
	 * @return
	 * @throws DataAccessException
	 */
	public AreaCodeColl getAreaCodeColl(long regionId) throws DataAccessException {
		AreaCodeColl coll=new AreaCodeColl();

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append(" SELECT area_code_id, region_id, area_nbr, area_code ");
		sqlBuffer.append(" FROM area_code WHERE region_id=?					   ");
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuffer.toString());
			pstmt.setLong(1, regionId);
			rest = pstmt.executeQuery();
			coll.addAreaCode(rest);
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"AreaCodeDAOImpl--getAreaCodeColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"AreaCodeDAOImpl--getAreaCodeColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		
		return coll;
	}
	/**
	 * 删除区号信息
	 * @param regionId
	 * @return
	 * @throws DataAccessException
	 */
	public int deleteAreaCode(long regionId) throws DataAccessException {
		int result=0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append(" DELETE FROM area_code	");
		sqlBuffer.append(" WHERE region_id=?		");
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuffer.toString());
			pstmt.setLong(1, regionId);
			result = pstmt.executeUpdate();

		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"AreaCodeDAOImpl--deleteAreaCode-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"AreaCodeDAOImpl--deleteAreaCode-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(null, pstmt, conn);
		}
		
		return result;
	}
	
	/**
	 * 新增区号信息
	 * @param regionId
	 * @return
	 * @throws DataAccessException
	 */
	public int insertAreaCode(AreaCodeVO areaCodeVO) throws DataAccessException {
		int result=0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append(" Insert into AREA_CODE(AREA_CODE_ID,	  ");
		sqlBuffer.append("	REGION_ID, AREA_NBR, AREA_CODE)		  ");
		sqlBuffer.append(" Values (NVL ((SELECT MAX(AREA_CODE_ID) ");
		sqlBuffer.append(" FROM AREA_CODE), 0) + 1, ?, ?, ?)	  ");

		
		try {
			int index=1;
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuffer.toString());
			pstmt.setLong(index++, areaCodeVO.getRegionId());
			pstmt.setString(index++, areaCodeVO.getAreaNbr());
			pstmt.setString(index++, areaCodeVO.getAreaCode());
			result = pstmt.executeUpdate();

		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"AreaCodeDAOImpl--insertAreaCode-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"AreaCodeDAOImpl--insertAreaCode-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(null, pstmt, conn);
		}
		
		return result;
	}
}
