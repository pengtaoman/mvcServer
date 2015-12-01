package com.neusoft.om.omutil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.om.OMAppContext;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

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

public class OmUtilDAOImpl extends BaseDaoImpl implements OmUtilDAO {
	
	//判断传入的日期与当前系统时间的差值
	public int getEffectDays(String compareDate)throws DataAccessException{
		int effctDays = -9999;
		String sql = "SELECT TO_DATE(SUBSTR(?,1,8),'yyyymmdd')- TO_DATE(TO_CHAR(SYSDATE,'yyyymmdd'),'yyyymmdd') effctDays FROM dual";
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,compareDate);
			rest = pstmt.executeQuery();
			if(rest.next()){
				effctDays = rest.getInt("effctDays");
			}
		}catch(SQLException e){
		SysLog.writeLogs("om",GlobalParameters.ERROR,"OmUtilDAOImpl--getEffectDays-1:"+e.getMessage());
		throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmUtilDAOImpl--getEffectDays-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
			return  effctDays;
	}

	public String getDays(int numDays) throws DataAccessException {
		String inactiveDate = "";
		String sql = "SELECT TO_CHAR(SYSDATE + ?,'yyyymmdd') f_inactive_date FROM dual";
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,numDays);
			rest = pstmt.executeQuery();
			if(rest.next()){
				inactiveDate = rest.getString("f_inactive_date");
			}
		}catch(SQLException e){
		SysLog.writeLogs("om",GlobalParameters.ERROR,"OmUtilDAOImpl--getDays-1:"+e.getMessage());
		throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmUtilDAOImpl--getDays-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return inactiveDate ;
	}
	
	public String getPartCity(String areaId) throws DataAccessException {
		
		return null;
	}
	
	/**
     * 查询所属渠道名称信息
     * @param name
     * @return
     * @throws DataAccessException
     */
     public String getDealerNameById(String dealerId) throws DataAccessException{
             String dealerName= "";
             StringBuffer buf = new StringBuffer();
             buf.append("select DEALER_NAME from BD_DEALER_T where DEALER_ID = '"+dealerId+"'");            
             String sql = buf.toString();            
             Connection conn = null;
             PreparedStatement pstmt = null;
             ResultSet rest = null;
             try{
                 conn = getConnection();
                 pstmt = conn.prepareStatement(sql);
                 rest = pstmt.executeQuery();  
                 if(rest.next()){
               	  dealerName = rest.getString(1);
                 }
             }catch(SQLException e){
                 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getDealerNameById()-1:"+e.getMessage());
                 throw new DataAccessException(e);
             }catch(Exception e){
                 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getDealerNameById()-2:"+e.getMessage());
                 throw new DataAccessException(e);
             }finally{
                 close(rest,pstmt,conn);
             }  
             return dealerName;
     }
     /**
      * 查询渠道所属部门信息
      * @param name
      * @return
      * @throws DataAccessException
      */
      public String getRegionCodeById(String dealerId) throws DataAccessException{
              String dealerName= "";
              
              StringBuffer buf = new StringBuffer();
              buf.append(" select a.belongs_part from bd_dealer_t a,om_organ_t b ");            
              buf.append(" where  a.belongs_part = b.f_organ_id and a.dealer_id = '"+dealerId+"'");
              String sql = buf.toString();            
              
              Connection conn = null;
              PreparedStatement pstmt = null;
              ResultSet rest = null;
              
              try{
                  conn = getConnection();
                  pstmt = conn.prepareStatement(sql);
                  rest = pstmt.executeQuery(); 
                  
                  if(rest.next()){
                	  dealerName = rest.getString(1);
                  }
              }catch(SQLException e){
                  SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getRegionCodeById()-1:"+e.getMessage());
                  throw new DataAccessException(e);
              }catch(Exception e){
                  SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getRegionCodeById()-2:"+e.getMessage());
                  throw new DataAccessException(e);
              }finally{
                  close(rest,pstmt,conn);
              }  
              return dealerName;
      }
	
	//测试方法
	public static void main(String args[]){
		OmUtilDAO dao = (OmUtilDAO)OMAppContext.getBean(OmUtilDAO.BEAN);
		try {
			System.out.println("1:"+dao.getEffectDays("20050101"));
			System.out.println("2:"+dao.getDays(10) );
		}catch(DataAccessException e){
			e.printStackTrace();
		}
	}
}
