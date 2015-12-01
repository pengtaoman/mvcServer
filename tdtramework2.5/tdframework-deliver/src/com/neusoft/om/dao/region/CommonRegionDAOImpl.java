package com.neusoft.om.dao.region;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class CommonRegionDAOImpl extends BaseDaoImpl implements CommonRegionDAO {
	/**
	 * 
	 */
	private static final long serialVersionUID = 592051698348925942L;

	/**
	 * 获取电信公共管理区域结果集
	 * @param commonRegionId
	 * @return
	 */
	public CommonRegionColl getCommonRegionColl(long commonRegionId)  throws DataAccessException{
		
		CommonRegionColl commonRegionColl = new CommonRegionColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("SELECT common_region_id, up_region_id, region_name, region_code, ");
		sqlBuffer.append("       region_type, region_desc, region_level, city_code         ");
		sqlBuffer.append("FROM common_region START WITH common_region_id = ?               ");
		sqlBuffer.append("CONNECT BY PRIOR common_region_id = up_region_id                 ");
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuffer.toString());
			pstmt.setLong(1, commonRegionId);
			rest = pstmt.executeQuery();
			commonRegionColl.addCommonRegion(rest);
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--getCommonRegionColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--getCommonRegionColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return commonRegionColl;
	}
	
	/**
	 * 根据名称获取电信公共管理区域结果集
	 * @param commonRegionId
	 * @return
	 */
	public CommonRegionColl getCommonRegionCollByName(long commonRegionId, String commonRegionName)  throws DataAccessException{
		
		CommonRegionColl commonRegionColl = new CommonRegionColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append(" SELECT common_region_id, up_region_id, region_name, region_code,    ");
		sqlBuffer.append("       region_type, region_desc, region_level, city_code             ");
		sqlBuffer.append(" FROM common_region                                                  ");
		sqlBuffer.append(" WHERE region_name LIKE '%" + commonRegionName + "%'");
		sqlBuffer.append(" AND common_region_id IN(select common_region_id                     ");
		sqlBuffer.append(" FROM common_region connect by prior common_region_id = up_region_id ");
		sqlBuffer.append(" start with common_region_id = ?)                                   ");
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuffer.toString());
			pstmt.setLong(1, commonRegionId);
			rest = pstmt.executeQuery();
			commonRegionColl.addCommonRegion(rest);
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--getCommonRegionCollByName-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--getCommonRegionCollByName-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return commonRegionColl;
	}

	/**
	 * 按照公共管理区域标识，来获取公共管理区域标识
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	public CommonRegionVO getCommonRegionVO(long commonRegionId) throws DataAccessException {
		CommonRegionVO vo = new CommonRegionVO();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append(" SELECT common_region_id,region_code, region_type,  		  ");
		sqlBuffer.append(" up_region_id, (SELECT region_name  FROM common_region b	  ");
		sqlBuffer.append(" WHERE a.up_region_id = b.common_region_id) up_region_name, ");
		sqlBuffer.append(" (select region_type_name FROM common_region_type c		  ");
		sqlBuffer.append("  where a.region_type=c.region_type) region_type_name,	  ");
		sqlBuffer.append(" region_name, region_desc, region_level, city_code		  ");
		sqlBuffer.append(" FROM common_region a WHERE common_region_id = ?			  ");
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuffer.toString());
			pstmt.setLong(1, commonRegionId);
			rest = pstmt.executeQuery();
			if(rest.next()){
				vo.setAttribute(rest);
			}

		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--getCommonRegionVO-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--getCommonRegionVO-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return vo;
	}
	
	/**
	 * 判断是否为最低级区域类型
	 * @param regionType
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfViewButton(String regionType) throws DataAccessException {
		StringBuffer sqlBuffer = new StringBuffer();
		int count=0;
		sqlBuffer.append(" SELECT count(*) FROM common_region_type where parent_region_type=?	");

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuffer.toString());
            pstmt.setString(1, regionType);
            rest = pstmt.executeQuery();
            if (rest.next()){
            	count=rest.getInt(1);
            }
        }catch (SQLException e){
        	SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--getIfViewButton-1:" + e.getMessage());
			throw new DataAccessException(e);
        }finally{
            close(rest, pstmt, conn);
        }
        
        return count==0?false:true;
	}
	
	/**
	 * 根据公用管理区域标识，删除公用管理区域的信息
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	public int deleteCommonRegion(long commonRegionId) throws DataAccessException {
		int result=0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append(" DELETE FROM common_region	");
		sqlBuffer.append(" WHERE common_region_id = ?	");
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuffer.toString());
			pstmt.setLong(1, commonRegionId);
			result=pstmt.executeUpdate();
			
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--deleteCommonRegion-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--deleteCommonRegion-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(null, pstmt, conn);
		}
		return result;
	}
	
	/**
	 * 获取公用管理区域类型列表
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getRegionTypeColl(long commonRegionId) throws DataAccessException {
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append(" SELECT region_type, region_type_name		");
		sqlBuffer.append(" FROM common_region_type					");
		sqlBuffer.append(" WHERE NVL (parent_region_type, -100) =	");
		sqlBuffer.append(" (SELECT NVL (region_type, -100)			");
		sqlBuffer.append(" FROM common_region 						");
		sqlBuffer.append(" WHERE common_region_id = ?)				");
		
		ParamObjectCollection coll = new ParamObjectCollection();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuffer.toString());
            pstmt.setLong(1, commonRegionId);
            rest = pstmt.executeQuery();
            while (rest.next()){
                ParamObject obj = new ParamObject();
                obj.setId(rest.getString("region_type"));
                obj.setName(rest.getString("region_type_name"));
                coll.addParamObject(obj);
            }
        }catch (SQLException e){
        	SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--getRegionTypeColl-1:" + e.getMessage());
			throw new DataAccessException(e);
        }finally{
            close(rest, pstmt, conn);
        }
        return coll;
	}
	
	/**
	 * 获取当前公用管理区域的区域类型
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getCurrentRegionTypeColl(long commonRegionId) throws DataAccessException {
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append(" SELECT region_type, region_type_name	");
		sqlBuffer.append(" FROM common_region_type				");
		sqlBuffer.append(" WHERE NVL (region_type, -100) =		");
		sqlBuffer.append(" (SELECT NVL (region_type, -100)		");
		sqlBuffer.append(" FROM common_region 					");
		sqlBuffer.append(" WHERE common_region_id = ?)			");
		
		ParamObjectCollection coll = new ParamObjectCollection();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuffer.toString());
            pstmt.setLong(1, commonRegionId);
            rest = pstmt.executeQuery();
            while (rest.next()){
                ParamObject obj = new ParamObject();
                obj.setId(rest.getString("region_type"));
                obj.setName(rest.getString("region_type_name"));
                coll.addParamObject(obj);
            }
        }catch (SQLException e){
        	SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--getRegionTypeColl-1:" + e.getMessage());
			throw new DataAccessException(e);
        }finally{
            close(rest, pstmt, conn);
        }
        return coll;
	}
	
	/**
	 * 新增公用管理区域
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	public int insertCommonRegion(CommonRegionVO vo) throws DataAccessException {
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append(" INSERT INTO common_region(			");
		sqlBuffer.append("		common_region_id, up_region_id,	");
		sqlBuffer.append("		region_name,region_code, 		");
		sqlBuffer.append(" 		region_type, region_desc,		");
		sqlBuffer.append("		region_level, city_code)		");
		sqlBuffer.append(" 	VALUES (?, ?, ?,?, ?, ?, ?, ?)		");
		
        Connection conn = null;
        PreparedStatement pstmt = null;
        int result=0;
        
        try{
        	int index=1;
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuffer.toString());
            pstmt.setLong(index++, vo.getCommonRegionId());
            pstmt.setLong(index++, vo.getUpRegionId());
            pstmt.setString(index++, vo.getRegionName());
            pstmt.setString(index++, vo.getRegionCode());
            pstmt.setString(index++, vo.getRegionType());
            pstmt.setString(index++, vo.getRegionDesc());
            pstmt.setInt(index++, vo.getRegionLevel());
            pstmt.setString(index++, vo.getCityCode());
            result = pstmt.executeUpdate();
        }catch (SQLException e){
        	SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--insertCommonRegion-1:" + e.getMessage());
			throw new DataAccessException(e);
        }finally{
            close(null, pstmt, conn);
        }
        return result;
	}
	
	/**
	 * 获取新的公用管理区域编号
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	public long getRegionCode(long upCommonRegionId) throws DataAccessException {
		StringBuffer sqlBuffer = new StringBuffer();
		long regionCode=0;
		sqlBuffer.append(" SELECT MAX(region_code) FROM common_region where up_region_id=?	");

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuffer.toString());
            pstmt.setLong(1, upCommonRegionId);
            rest = pstmt.executeQuery();
            if (rest.next()){
            	regionCode=rest.getLong(1);
            }else{
            	regionCode=-1;
            }
        }catch (SQLException e){
        	SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--getRegionCode-1:" + e.getMessage());
			throw new DataAccessException(e);
        }finally{
            close(rest, pstmt, conn);
        }
        return regionCode;
	}
	
	/**
	 * 获取区域级别
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	public int getRegionLevel(String regionType) throws DataAccessException {
		StringBuffer sqlBuffer = new StringBuffer();
		int regionLevel=0;
		sqlBuffer.append(" SELECT region_level from common_region_type where region_type=?	");

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuffer.toString());
            pstmt.setString(1, regionType);
            rest = pstmt.executeQuery();
            if (rest.next()){
            	regionLevel=rest.getInt(1);
            }
        }catch (SQLException e){
        	SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--getRegionLevel-1:" + e.getMessage());
			throw new DataAccessException(e);
        }finally{
            close(rest, pstmt, conn);
        }
        return regionLevel;
	}

	public int updateCommonRegion(CommonRegionVO vo) throws DataAccessException {
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append(" update COMMON_REGION 			");
		sqlBuffer.append(" set REGION_NAME=?,REGION_DESC=?	");
		sqlBuffer.append(" where COMMON_REGION_ID=?			");

		int result=0;
        Connection conn = null;
        PreparedStatement pstmt = null;
        
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuffer.toString());
            pstmt.setString(1, vo.getRegionName());
            pstmt.setString(2, vo.getRegionDesc());
            pstmt.setLong(3, vo.getCommonRegionId());
            result=pstmt.executeUpdate();
        }catch (SQLException e){
        	SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--updateCommonRegion-1:" + e.getMessage());
			throw new DataAccessException(e);
        }finally{
            close(null, pstmt, conn);
        }
        return result;
	}

	public boolean ifCanBeDelete(long commonRegionId) throws DataAccessException {
		StringBuffer sqlBuffer = new StringBuffer();
		long count=0;
		sqlBuffer.append(" SELECT count(*) FROM common_region where up_region_id=?	");

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuffer.toString());
            pstmt.setLong(1, commonRegionId);
            rest = pstmt.executeQuery();
            if (rest.next()){
            	count=rest.getInt(1);
            }
        }catch (SQLException e){
        	SysLog.writeLogs("om", GlobalParameters.ERROR,"CommonRegionDAOImpl--getRegionCode-1:" + e.getMessage());
			throw new DataAccessException(e);
        }finally{
            close(rest, pstmt, conn);
        }
        
        return count==0?true:false;
	}
}
