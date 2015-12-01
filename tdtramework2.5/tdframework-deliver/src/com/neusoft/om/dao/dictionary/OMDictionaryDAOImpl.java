/*
 * Created on 2004-12-10
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.dao.dictionary;

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

/**
 * @author chenzt
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class OMDictionaryDAOImpl extends BaseDaoImpl implements OMDictionaryDAO{
	/**
	 * 获取所有性别的参数数据，
	 * 对应表：om_gender_t
	*/
	public ParamObjectCollection getGenderColl() throws DataAccessException {

		Connection conn = null;
		PreparedStatement pstmt = null ;
		ResultSet rest = null ;

		String sql = "select * from om_gender_t";
		
		ParamObjectCollection genderColl = new ParamObjectCollection();
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
	
			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_gender"));
				paramObject.setName(rest.getString("f_gender_desc"));
				genderColl.addParamObject(paramObject);
			}
			
			return genderColl;
		} catch(SQLException e) {
			genderColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryCust--setGendColl()-1:"+e.getMessage());
			throw new DataAccessException(e);
		} catch(Exception e) {
			genderColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryCust--setGendColl()-2:"+e.getMessage());
			throw new DataAccessException(e);
		} finally{
			close(rest,pstmt,conn);
		}	
	}
	
	
	/**
	 * 设置教育程度EducateLevel
	*/
	public ParamObjectCollection getEducateLevelColl() throws DataAccessException {

		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		String sql = "select * from om_educate_level_t";
	
		ParamObjectCollection educateLevelColl = new ParamObjectCollection();
	
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_educate_level"));
				paramObject.setName(rest.getString("f_educate_level_desc"));
				educateLevelColl.addParamObject(paramObject);
			}
			
			return educateLevelColl;
		}
		catch(SQLException e) {
			educateLevelColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--setEducateLevelColl()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			educateLevelColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--setEducateLevelColl()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			close(rest,pstmt,conn);
		}	
	}

	
	/**
	* 获取职位：om_bus_duty_t
	*/
	public ParamObjectCollection getBusDutyColl() throws DataAccessException {

		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		String sql = "select * from om_bus_duty_t";
	
		ParamObjectCollection busDutyColl = new ParamObjectCollection();
	
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_bus_duty_id"));
				paramObject.setName(rest.getString("f_bus_duty_desc"));
				busDutyColl.addParamObject(paramObject);
			}
			
			return busDutyColl;
		}
		catch(SQLException e) {
			busDutyColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--setBusDutyColl()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			busDutyColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--setBusDutyColl()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			close(rest,pstmt,conn);
		}	
	}


	/**
	 * 薪资范围
	 */
	public ParamObjectCollection getIncomeColl() throws DataAccessException {
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		String sql = "select * from om_income_t";
	
		ParamObjectCollection incomeColl = new ParamObjectCollection();
	
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_income_code"));
				paramObject.setName(rest.getString("f_income_desc"));
				incomeColl.addParamObject(paramObject);
			}
			return incomeColl;	
		}
		catch(SQLException e) {
			incomeColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--setIncomeColl()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			incomeColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--setIncomeColl()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			close(rest,pstmt,conn);
		}
	}

	/**
	 * 组织机构类型
	 */
	public ParamObjectCollection getOrganKindColl() throws DataAccessException {
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		String sql = "select * from om_organ_kind_t";
	
		ParamObjectCollection organKindColl = new ParamObjectCollection();
	
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_organ_kind"));
				paramObject.setName(rest.getString("f_kind_desc"));
				organKindColl.addParamObject(paramObject);
			}
			return organKindColl;	
		}
		catch(SQLException e) {
			organKindColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--setOrganKindColl()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			organKindColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--setOrganKindColl()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			close(rest,pstmt,conn);
		}
	}

	/**
	 * 婚姻状况
	 */
	public ParamObjectCollection getMarriageStatusColl() throws DataAccessException {
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		String sql = "select * from om_marriage_status_t";
	
		ParamObjectCollection marriageStatusColl = new ParamObjectCollection();
	
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_marriage"));
				paramObject.setName(rest.getString("f_desc"));
				marriageStatusColl.addParamObject(paramObject);
			}
			return marriageStatusColl;	
		}
		catch(SQLException e) {
			marriageStatusColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--setMarriageStatusColl()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			marriageStatusColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--setMarriageStatusColl()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			close(rest,pstmt,conn);
		}
	}
	

	/**
	 * 所属组织机构人员信息
	 */
	public ParamObjectCollection getOrganEmployeeColl(String organId,String employeeId) throws DataAccessException {
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		int flag = 0;
		String sql ="";
		
		
		if ( employeeId !=null && !"".equals(employeeId )){
			sql = "select * from om_employee_t where f_organ_id = ? and f_employee_id <> ? ";
			flag = 0;
		}else{
			sql = "select * from om_employee_t where f_organ_id = ?  ";
			flag = 1;
		}
			
	
		ParamObjectCollection organEmployeeColl = new ParamObjectCollection();
	
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			if (flag == 0) {
				pstmt.setString(2,employeeId);
			}
			rest = pstmt.executeQuery();

			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_employee_id"));
				paramObject.setName(rest.getString("f_employee_name"));
				organEmployeeColl.addParamObject(paramObject);
			}
			return organEmployeeColl;	
		}
		catch(SQLException e) {
			organEmployeeColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getOrganEmployeeColl-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			organEmployeeColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getOrganEmployeeColl-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			close(rest,pstmt,conn);
		}
    }
    /**
     * 根据organId 得到 职务信息列表
     * @param organId
     * @return
     * @throws DataAccessException
     */    
    public ParamObjectCollection getDutyColl (String organId) throws DataAccessException{
        Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;
        String sql ="";           
        
        sql = " SELECT * FROM om_duty_t where f_organ_kind =";
        sql = sql +" (SELECT f_organ_kind from om_organ_t where f_organ_id = ?)";          
        ParamObjectCollection dutyColl = new ParamObjectCollection();        
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,organId);
            rest = pstmt.executeQuery();

            while(rest.next()) {
                ParamObject paramObject = new ParamObject();
                paramObject.setId(rest.getString("f_duty_id"));
                paramObject.setName(rest.getString("f_duty_name"));
                dutyColl.addParamObject(paramObject);
            }
            return dutyColl;   
        }
        catch(SQLException e) {
            dutyColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getDutyColl-1:"+e.getMessage());
            throw new DataAccessException(e);
        }
        catch(Exception e) {
            dutyColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getDutyColl-2:"+e.getMessage());
            throw new DataAccessException(e);
        }
        finally{
            close(rest,pstmt,conn);
        }
    }	
    
    public ParamObjectCollection getAreaColl () throws DataAccessException{
        Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;
        String sql = "select f_area_id,f_parent_area_id,f_area_name " +
            "from om_area_t " +
            "start with f_parent_area_id is null " +
            "connect by prior f_area_id = f_parent_area_id";
        ParamObjectCollection areaColl = new ParamObjectCollection();        
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();

            while(rest.next()) {
                ParamObject paramObject = new ParamObject();
                paramObject.setId(rest.getString("f_area_id"));
                paramObject.setName(rest.getString("f_area_name"));
                areaColl.addParamObject(paramObject);
            }
            return areaColl;   
        }
        catch(SQLException e) {
            areaColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getAreaColl-1:"+e.getMessage());
            throw new DataAccessException(e);
        }
        catch(Exception e) {
            areaColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getAreaColl-2:"+e.getMessage());
            throw new DataAccessException(e);
        }
        finally{
            close(rest,pstmt,conn);
        }
    } 
    
    public ParamObjectCollection getAreaColl(String areaId) throws DataAccessException{
        Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;
        String sql = "select f_area_id,f_area_name " +
            "from om_area_t " +
            "where f_area_id = '" + areaId +"'";
        ParamObjectCollection areaColl = new ParamObjectCollection();        
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();

            while(rest.next()) {
                ParamObject paramObject = new ParamObject();
                paramObject.setId(rest.getString("f_area_id"));
                paramObject.setName(rest.getString("f_area_name"));
                areaColl.addParamObject(paramObject);
            }
            return areaColl;   
        }
        catch(SQLException e) {
            areaColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getAreaColl-1:"+e.getMessage());
            throw new DataAccessException(e);
        }
        catch(Exception e) {
            areaColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getAreaColl-2:"+e.getMessage());
            throw new DataAccessException(e);
        }
        finally{
            close(rest,pstmt,conn);
        }
    } 
    
    public ParamObjectCollection getDutyColl () throws DataAccessException{
        Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;
        String sql ="";           
        
        sql = " SELECT * FROM om_duty_t ";         
        ParamObjectCollection dutyColl = new ParamObjectCollection();        
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();

            while(rest.next()) {
                ParamObject paramObject = new ParamObject();
                paramObject.setId(rest.getString("f_duty_id"));
                paramObject.setName(rest.getString("f_duty_name"));
                dutyColl.addParamObject(paramObject);
            }
            return dutyColl;   
        }
        catch(SQLException e) {
            dutyColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getDutyColl-1:"+e.getMessage());
            throw new DataAccessException(e);
        }
        catch(Exception e) {
            dutyColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getDutyColl-2:"+e.getMessage());
            throw new DataAccessException(e);
        }
        finally{
            close(rest,pstmt,conn);
        }
    }   
    
    public ParamObjectCollection getOrganInfoByAreaId (String areaId) throws DataAccessException{
        Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;
        
        String sql = "SELECT * FROM om_organ_t WHERE f_area_id = ? ";     
        ParamObjectCollection organColl = new ParamObjectCollection();        
        try {
            
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,areaId);
            rest = pstmt.executeQuery();

            while(rest.next()) {
                ParamObject paramObject = new ParamObject();
                paramObject.setId(rest.getString("f_organ_id"));
                paramObject.setName(rest.getString("f_organ_name"));
                organColl.addParamObject(paramObject);
            }
            return organColl;   
        }
        catch(SQLException e) {
            organColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getOrganInfoByAreaId-1:"+e.getMessage());
            throw new DataAccessException(e);
        }
        catch(Exception e) {
            organColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getOrganInfoByAreaId-2:"+e.getMessage());
            throw new DataAccessException(e);
        }
        finally{
            close(rest,pstmt,conn);
        }
    } 
     
    public ParamObjectCollection getPersonLevelColl() throws DataAccessException{
        Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;
        
        String sql = "SELECT * FROM om_person_level_t ";     
        ParamObjectCollection personLevelColl = new ParamObjectCollection();        
        try {            
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();
            while(rest.next()) {
                ParamObject paramObject = new ParamObject();
                paramObject.setId(rest.getString("f_level_code"));
                paramObject.setName(rest.getString("f_level_name"));
                personLevelColl.addParamObject(paramObject);
            }
            return personLevelColl;   
        }
        catch(SQLException e) {
            personLevelColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getPersonLevelColl-1:"+e.getMessage());
            throw new DataAccessException(e);
        }
        catch(Exception e) {
            personLevelColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getPersonLevelColl-2:"+e.getMessage());
            throw new DataAccessException(e);
        }
        finally{
            close(rest,pstmt,conn);
        }
    }
    /**
     * 获取操作级别列表
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getOperLevelColl() throws DataAccessException{
        Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;
        
        String sql = "SELECT * FROM OM_OPER_LEVEL_T order by f_oper_code";     
        ParamObjectCollection personLevelColl = new ParamObjectCollection();        
        try {            
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();
            while(rest.next()) {
                ParamObject paramObject = new ParamObject();
                paramObject.setId(rest.getString("f_oper_code"));
                paramObject.setName(rest.getString("f_oper_name"));
                personLevelColl.addParamObject(paramObject);
            }
            return personLevelColl;   
        }
        catch(SQLException e) {
            personLevelColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getOperLevelColl-1:"+e.getMessage());
            throw new DataAccessException(e);
        }
        catch(Exception e) {
            personLevelColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getOperLevelColl-2:"+e.getMessage());
            throw new DataAccessException(e);
        }
        finally{
            close(rest,pstmt,conn);
        }
    }
    /**
     * 获取操作级别列表
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getOperLevelColl(int adminLevel) throws DataAccessException{
        Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;
        
        String sql = "SELECT * FROM OM_OPER_LEVEL_T where f_oper_code <=" + adminLevel + "  order by f_oper_code";     
        ParamObjectCollection personLevelColl = new ParamObjectCollection();        
        try {            
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();
            while(rest.next()) {
                ParamObject paramObject = new ParamObject();
                paramObject.setId(rest.getString("f_oper_code"));
                paramObject.setName(rest.getString("f_oper_name"));
                personLevelColl.addParamObject(paramObject);
            }
            return personLevelColl;   
        }
        catch(SQLException e) {
            personLevelColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getOperLevelColl-1:"+e.getMessage());
            throw new DataAccessException(e);
        }
        catch(Exception e) {
            personLevelColl = null;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getOperLevelColl-2:"+e.getMessage());
            throw new DataAccessException(e);
        }
        finally{
            close(rest,pstmt,conn);
        }
    }
    /**
     * 获取所属组织机构人员信息 -- 转为渠道系统提供
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getOrganEmployeeCollForChnl(String organId,String employeeId) throws DataAccessException{
    	Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		int flag = 0;
		String sql ="";		
		if ( employeeId !=null && !"".equals(employeeId )){
			sql = "select * from om_employee_t where f_organ_id = ? and f_employee_id <> ?  and f_dealer_id is not null ";
			flag = 0;
		}else{
			sql = "select * from om_employee_t where f_organ_id = ?  and f_dealer_id is not null";
			flag = 1;
		}	
		ParamObjectCollection organEmployeeColl = new ParamObjectCollection();
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			if (flag == 0) {
				pstmt.setString(2,employeeId);
			}
			rest = pstmt.executeQuery();

			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_employee_id"));
				paramObject.setName(rest.getString("f_employee_name"));
				organEmployeeColl.addParamObject(paramObject);
			}
			return organEmployeeColl;	
		}
		catch(SQLException e) {
			organEmployeeColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getOrganEmployeeColl-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			organEmployeeColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getOrganEmployeeColl-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			close(rest,pstmt,conn);
		}
    }

    /**
     * 如果areaId是地市（level = 3）则得到areaId确定的区域。
     * 如果areaId是省份或中心（level <= 2）则得到省份下全部的地市信息 
     * 如果areaId是区域以下级别的区域，则返回空
     * @param areaId
     * @return
     * @throws DataAccessException
     */
	public ParamObjectCollection getAreaCollLevel3(String areaId) throws DataAccessException {
    	Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		int flag = 0;
		String sqlLevel ="select f_area_level from om_area_t where f_area_id = '"+areaId+"'";	
		String sql = "";
		int areaLevel = 0;
		ParamObjectCollection areaColl = new ParamObjectCollection();
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlLevel);
			rest = pstmt.executeQuery();
			while(rest.next()){
				areaLevel = rest.getInt("f_area_level");				
			}
			close(pstmt);
			if(areaLevel == 3){ //地市 
				sql = "select * from om_area_t where f_area_id = '"+areaId+"'";
			}else if(areaLevel < 3){//省份和中心
				sql = "select * from om_area_t where f_area_level = 3 order by f_area_id";
			}else{//区县
				return areaColl;
			}
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_area_id"));
				paramObject.setName(rest.getString("f_area_name"));
				areaColl.addParamObject(paramObject);
			}
		}
		catch(SQLException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getAreaCollLevel3-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getAreaCollLevel3-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			close(rest,pstmt,conn);
		}
		return areaColl;
	}
	
	public ParamObjectCollection getAreaLevel() throws DataAccessException{
    	Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		String sqlLevel ="select * from om_area_level_t ";	
		ParamObjectCollection areaLevelColl = new ParamObjectCollection();
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlLevel);
			rest = pstmt.executeQuery();
			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_area_level"));
				paramObject.setName(rest.getString("f_area_level_desc"));
				areaLevelColl.addParamObject(paramObject);
			}
		}
		catch(SQLException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getAreaLevel-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getAreaLevel-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			close(rest,pstmt,conn);
		}
		return areaLevelColl;
	}
	
	/**
     * 如果areaId是地市（level = 3）则得到areaId确定的区域。
     * 如果areaId是省份或中心（level <= 2）则得到省份下全部的地市信息 
     * 如果areaId是区域以下级别的区域，则返回空
     * @param areaId
     * @return
     * @throws DataAccessException
     */
	public ParamObjectCollection getAreaColl(String areaId,int areaLevel) 
		throws DataAccessException {
    	Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		StringBuffer strBuf = new StringBuffer();
		if(areaLevel < 3){
			strBuf.append("select f_area_id,f_area_name from om_area_t ");
			strBuf.append("where f_area_level = 3 ");
			strBuf.append("order by f_area_id ");
		}else{
			strBuf.append("select f_area_id,f_area_name from om_area_t ");
			strBuf.append("where f_area_id = '"+areaId+"' ");
		}
		
		ParamObjectCollection areaColl = new ParamObjectCollection();
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(strBuf.toString());
			rest = pstmt.executeQuery();
			
			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_area_id"));
				paramObject.setName(rest.getString("f_area_name"));
				areaColl.addParamObject(paramObject);
			}
		}
		catch(SQLException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getAreaColl(String areaId,int areaLevel)-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getAreaColl(String areaId,int areaLevel)-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			close(rest,pstmt,conn);
		}
		return areaColl;
	}
	
	public ParamObjectCollection getContainerColl() throws DataAccessException{
		ParamObjectCollection coll = new ParamObjectCollection();
    	Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		StringBuffer strBuf = new StringBuffer();
		strBuf.append("select * from om_container_t");
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(strBuf.toString());
			rest = pstmt.executeQuery();
			
			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_key"));
				paramObject.setName(rest.getString("f_container"));
				coll.addParamObject(paramObject);
			}
		}
		catch(SQLException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getContainerColl()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionaryDAOImpl--getContainerColl()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
}
