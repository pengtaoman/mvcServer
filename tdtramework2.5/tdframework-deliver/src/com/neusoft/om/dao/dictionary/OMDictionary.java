package com.neusoft.om.dao.dictionary;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.StaticDatasourceAccessor;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**brief description
 * <p>Date       : 2004-12-04</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */

public class OMDictionary {
	
	static DataSource dataSource = null;

	/**
	 * description: 
	 * @param source
	 */
	public void setDataSource(DataSource source) {
		dataSource = source;
	}
	
	private static ParamObjectCollection genderColl = null;				//性别
	private static ParamObjectCollection educateLevelColl = null;		//教育程度
	private static ParamObjectCollection busDutyColl = null;				//职位
	//private static ParamObjectCollection 
	//private static ParamObjectCollection dutyColl = null;				//职务
	//private static ParamObjectCollection areaColl = null;				//区域(不缓存)
	
	/**
	 * 设置性别
	*/
	public synchronized static void setGenderColl() throws DataAccessException {

		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		String sql = "select * from om_gender_t";
		
		genderColl = new ParamObjectCollection();
		
		try {
			conn = StaticDatasourceAccessor.getConnection(dataSource);
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
	
			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_gender"));
				paramObject.setName(rest.getString("f_gender_desc"));
				genderColl.addParamObject(paramObject);
			}
		}
		catch(SQLException e) {
			genderColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionary--setGendColl()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			genderColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionary--setGendColl()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			StaticDatasourceAccessor.close(rest,pstmt,conn);
		}	
	}

	/**
	 * 获取性别
	*/
	public static ParamObjectCollection getGenderColl() {
		
		if(genderColl==null){
			try {
				setGenderColl();
			} catch (DataAccessException e) {
				SysLog.writeExceptionLogs("om",GlobalParameters.ERROR,"OMDictionary--setGenderColl()-1:",e);
			} 
		}
		
		return (genderColl); 
	}
	/**
	 * 设置教育程度EducateLevel
	*/
	public synchronized static void setEducateLevelColl() throws DataAccessException {

		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		String sql = "select * from om_educate_level_t";
	
		educateLevelColl = new ParamObjectCollection();
	
		try {
			conn = StaticDatasourceAccessor.getConnection(dataSource);
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_educate_level"));
				paramObject.setName(rest.getString("f_educate_level_desc"));
				educateLevelColl.addParamObject(paramObject);
			}
		}
		catch(SQLException e) {
			educateLevelColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionary--setEducateLevelColl()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			educateLevelColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionary--setEducateLevelColl()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			StaticDatasourceAccessor.close(rest,pstmt,conn);
		}	
	}

	/**
	 * 获取教育程度
	*/
	public static ParamObjectCollection getEducateLevelColl() {
	
		if(educateLevelColl==null){
			try {
				setEducateLevelColl();
			} catch (DataAccessException e) {
				SysLog.writeExceptionLogs("om",GlobalParameters.ERROR,"OMDictionary--setEducateLevelColl()-1:",e);
			} 
		}
	
		return (educateLevelColl); 
	}
	
	/**
	* 设置职位
	*/
	public synchronized static void setBusDutyColl() throws DataAccessException {

		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		String sql = "select * from om_bus_duty_t";
	
		busDutyColl = new ParamObjectCollection();
	
		try {
			conn = StaticDatasourceAccessor.getConnection(dataSource);
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_bus_duty_id"));
				paramObject.setName(rest.getString("f_bus_duty_desc"));
				busDutyColl.addParamObject(paramObject);
			}
		}
		catch(SQLException e) {
			busDutyColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionary--setBusDutyColl()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			busDutyColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionary--setBusDutyColl()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			StaticDatasourceAccessor.close(rest,pstmt,conn);
		}	
	}

	/**
	 * 获取职位
	*/
	public static ParamObjectCollection getBusDutyColl() {
	
		if(busDutyColl==null){
			try {
				setBusDutyColl();
			} catch (DataAccessException e) {
				SysLog.writeExceptionLogs("om",GlobalParameters.ERROR,"OMDictionary--getBusDutyColl()-1:",e);
			} 
		}
	
		return (busDutyColl); 
	}
	
	
	/**
	 * 设置区域
	*/
	/*
	public synchronized static void setAreaColl() throws DataAccessException {

		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		String sql = "select * from om_area_t";

		areaColl = new ParamObjectCollection();

		try {
			conn = StaticDatasourceAccessor.getConnection(dataSource);
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
			areaColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionary--setAreaColl()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		catch(Exception e) {
			areaColl = null;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OMDictionary--setAreaColl()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}
		finally{
			StaticDatasourceAccessor.close(rest,pstmt,conn);
		}	
	}*/

	/**
	 * 获取区域(不缓存)
	*/
	/*
	public static ParamObjectCollection getAreaColl() {

		try{
			setAreaColl();
		}catch (DataAccessException e) {
			SysLog.writeExceptionLogs("om",GlobalParameters.ERROR,"OMDictionary--setAreaColl()-1:",e);
		} 
		return (areaColl); 
	}*/
}
