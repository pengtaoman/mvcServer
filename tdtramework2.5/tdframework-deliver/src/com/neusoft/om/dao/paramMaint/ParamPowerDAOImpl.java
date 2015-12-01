/*
 * 创建日期 2006-7-12
 *
 * TODO 要更改此生成的文件的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
package com.neusoft.om.dao.paramMaint;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.popedom.ParamPowerInfo;
import com.neusoft.popedom.ParamPowerInfoCollection;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;


public  class ParamPowerDAOImpl extends BaseDaoImpl implements ParamPowerDAO{
 
   
    public ParamPowerInfoCollection getParamPowerInfoColl(String executeSql,String [] params) throws DataAccessException{
    	Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		ParamPowerInfoCollection col = new ParamPowerInfoCollection();
		try 
		{
            conn = getConnection();
            pstmt = conn.prepareStatement(executeSql);
            int i = 1;
            if(params != null){
                for(int j=0;j<params.length;j++){
                    pstmt.setString(i++,params[j]);
                }
            }
            
            rest = pstmt.executeQuery();
            while (rest.next()){
            	ParamPowerInfo pi = new ParamPowerInfo();
    			pi.setAttribute(rest);
    			col.addParamPowerInfo(pi);
            }
          } 
		catch (SQLException se) 
		{
		   
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"ParamPowerDAOImpl--doAddParampower-1:" + se.getMessage());
			throw new DataAccessException(se);
        }
		catch (Exception e) 
		{
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"ParamPowerDAOImpl-- doAddParamRole-2:" + e.getMessage());
			throw new DataAccessException(e); 
	    }
		finally {
			close(rest, pstmt, conn);
		}
    	
    	return col;
    }
    
    public int executeUpdate(String executeSql) throws DataAccessException{
    	Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		int code = 1;
		try 
		{
            conn = getConnection();
            pstmt = conn.prepareStatement(executeSql);
            code = pstmt.executeUpdate();
          } 
		catch (SQLException se) 
		{
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"ParamPowerDAOImpl--executeUpdate-1:" + se.getMessage());
			throw new DataAccessException(se);
        }
		catch (Exception e) 
		{
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"ParamPowerDAOImpl-- executeUpdate-2:" + e.getMessage());
			throw new DataAccessException(e); 
	    }
		finally {
			close(rest, pstmt, conn);
		}
    	return code;
    	
    }
    
}
