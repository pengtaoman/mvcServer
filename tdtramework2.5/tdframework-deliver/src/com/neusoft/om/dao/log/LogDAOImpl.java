package com.neusoft.om.dao.log;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;

/**brief description
 * <p>Date       : 2004-12-20</p>
 * <p>Module     : om</p>
 * <p>Description: log maintance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class LogDAOImpl extends BaseDaoImpl implements LogDAO{

	public LogColl getLogInfo(String partCity, String systemId, String menuId, String partMonth, String begOperatorDate, String endOperatorDate) throws DataAccessException {
		LogColl coll = new LogColl();
		LogVO vo =  null;
		StringBuffer buf = new StringBuffer();
		buf.append("SELECT ");
		buf.append("f_part_city  ,");
		buf.append("f_part_mm ,");
		buf.append("f_sequence_id ,");
		buf.append("f_area_id     ,");
		buf.append("f_employee_id ,");
		buf.append("f_work_no     ,");
		buf.append("f_system_id   ,");
		buf.append("f_module_id   ,");
		buf.append("f_menu_id     ,");
		buf.append("f_menu_name   ,");
		buf.append("f_bottom_id   ,");
		buf.append("f_bottom_name ,");
		buf.append("f_operate_date,");
		buf.append("f_login_host  ,");
		buf.append("f_mac         ,");
		buf.append("f_operate_desc ");
		buf.append(" FROM om_write_log_t");
		buf.append(" WHERE ");
		buf.append(" f_operate_date >=").append("to_date('").append(begOperatorDate).append("','yyyy-mm-dd')");
		buf.append(" and f_operate_date <=").append("to_date('").append(endOperatorDate).append("','yyyy-mm-dd')");
		buf.append(" and f_part_city = '").append(partCity).append("'");
		buf.append(" and f_part_mm = '").append(partMonth).append("'");
		buf.append(" and f_system_id = '").append(systemId).append("'");
		if(menuId != null && !menuId.equals("")){
			buf.append(" and f_menu_id = '").append(menuId).append("'");
		}
		
		String sql = buf.toString();
		
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				vo = new LogVO();
				vo.setAttribute(rest);
				coll.addLog(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getLogInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getLogInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
	
	public int doAddLogInfo(LogVO vo) throws DataAccessException {
		int code = 1;
		StringBuffer sbf=new StringBuffer();
		sbf.append("Insert into OM_WRITE_LOG_T(");
		sbf.append("	F_PART_CITY, F_PART_MM, F_SEQUENCE_ID,F_AREA_ID,	");
		sbf.append("	F_EMPLOYEE_ID, F_WORK_NO,F_SYSTEM_ID,F_MODULE_ID,	");
		sbf.append("	F_MENU_ID, F_MENU_NAME, F_BOTTOM_ID,F_BOTTOM_NAME,	");
		sbf.append("	F_OPERATE_DATE, F_LOGIN_HOST, F_MAC, F_OPERATE_DESC	");
		sbf.append(")Values(?,?,om_write_log_s.NEXTVAL,	");
		sbf.append("  ?,?,?,?,?,?,?,?,?,TO_DATE(?,'YYYY-MM-DD HH24:MI:SS'),?,?,?)				");

		Connection conn = null;
		PreparedStatement  pstmt = null;
		int index=1;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sbf.toString());
			pstmt.setString(index++,vo.getPartCity());
			pstmt.setInt(index++,vo.getPartMM());
			//pstmt.setLong(index++,vo.getSequenceId());
			pstmt.setString(index++,vo.getAreaId());
			pstmt.setString(index++,vo.getEmployeeId());
			pstmt.setString(index++,vo.getWorkNo());
			pstmt.setString(index++,vo.getSystemId());
			pstmt.setString(index++,vo.getModuleId());
			pstmt.setString(index++,vo.getMenuId());
			pstmt.setString(index++,vo.getMenuName());
			pstmt.setString(index++,vo.getBottomId());
			pstmt.setString(index++,vo.getBottomName());
			pstmt.setString(index++,vo.getOperateDate());
			pstmt.setString(index++,vo.getLoginHost());
			pstmt.setString(index++,vo.getMac());
			pstmt.setString(index++,vo.getOperateDesc());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--doAddLogInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--doAddLogInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	 /**
     * 得到日志信息集合总行数
     * @param map
     * @return
     * @throws DataAccessException
     */
	public int getLogRowCount(HashMap map) throws DataAccessException {
        String employeeWorkNo = (String)map.get("employeeWorkNo");
        //String systemId = (String)map.get("systemId");
        String menuId = (String)map.get("menuId");
        String description = (String)map.get("description");
        String startDate = (String)map.get("startDate");
        String endDate = (String)map.get("endDate");
        //String areaId = (String)map.get("areaId");
        String partMonth = (String)map.get("month");
        String cityCode = (String)map.get("cityCode");
        String loginHost = (String)map.get("loginHost");
        String employeeName = (String)map.get("employeeName");

        
        int allRows = 0;
        
        StringBuffer buf = new StringBuffer();
        buf.append("select count(*) from (");
	    buf.append(" select rownum rowcound,t.* from ( select a.*, d.f_employee_name, e.f_system_name ");
	    buf.append(" FROM om_write_log_t a, om_employee_t d , om_system_t e");
        buf.append(" WHERE a.f_employee_id = d.f_employee_id");
        buf.append(" AND a.f_system_id = e.f_system_id ");
        buf.append(" AND a.f_operate_date >=").append("TO_DATE('").append(startDate).append("','yyyy-MM-dd hh24:mi:ss')");
        buf.append(" AND a.f_operate_date <=").append("TO_DATE('").append(endDate).append("','yyyy-MM-dd hh24:mi:ss')");
        buf.append(" AND a.f_part_city = '").append(cityCode).append("'");
        buf.append(" AND a.f_part_mm = '").append(partMonth).append("'");
        if(menuId!=null && !menuId.equals("")){
            buf.append(" AND a.f_menu_id like '").append(menuId).append("%'");
        }
        if(employeeWorkNo != null && !employeeWorkNo.trim().equals("")){
            buf.append(" AND a.f_work_no = '").append(employeeWorkNo).append("'");
        }
        if(description != null && !description.trim().equals("")){
            buf.append(" AND a.f_operate_desc LIKE '%").append(description).append("%'");
        }
        if(employeeName != null && !employeeName.trim().equals("")) {
        	buf.append(" AND d.f_employee_name LIKE '%").append(employeeName).append("%'");
        }
        if(loginHost != null && !loginHost.trim().equals("")) {
        	buf.append(" AND a.f_login_host LIKE '%").append(loginHost).append("%'");
        }
        buf.append(" order by a.f_operate_date )t ) ");
        
        String sql = buf.toString();
     // System.out.println(sql);
        Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;

        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();

            if(rest.next()) {
                allRows = rest.getInt(1);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getLogRowCount-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getLogRowCount-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
        return allRows;
    }
	 /**
     * 得到日志信息集合
     * @param map
     * @return
     * @throws DataAccessException
     */
    public LogColl getLogInfo(HashMap map,int startRow,int endRow) throws DataAccessException {
        String employeeWorkNo = (String)map.get("employeeWorkNo");
        
        //String systemId = (String)map.get("systemId");
        String menuId = (String)map.get("menuId");
        
        String description = (String)map.get("description");
        String startDate = (String)map.get("startDate");
        String endDate = (String)map.get("endDate");
        //String areaId = (String)map.get("areaId");
        String partMonth = (String)map.get("month");
        String cityCode = (String)map.get("cityCode");
        String loginHost = (String) map.get("loginHost");
        String employeeName = (String) map.get("employeeName");
     
        LogColl coll = new LogColl();
        LogVO vo =  null;
        StringBuffer buf = new StringBuffer();
        buf.append("select * from (");
	    buf.append(" select rownum rowcound,t.* from ( select a.*,d.f_employee_name, e.f_system_name");
	    buf.append(" FROM om_write_log_t a, om_employee_t d , om_system_t e");
        buf.append(" WHERE a.f_employee_id = d.f_employee_id");
        buf.append(" ANd a.f_system_id = e.f_system_id ");
        buf.append(" AND a.f_operate_date >=").append("TO_DATE('").append(startDate).append("','yyyy-MM-dd hh24:mi:ss')");
        buf.append(" AND a.f_operate_date <=").append("TO_DATE('").append(endDate).append("','yyyy-MM-dd hh24:mi:ss')");
        buf.append(" AND a.f_part_city = '").append(cityCode).append("'");
        buf.append(" AND a.f_part_mm = '").append(partMonth).append("'");
        if(menuId!=null && !menuId.equals("")){
            buf.append(" AND a.f_menu_id like '").append(menuId).append("%'");
        }
        if(employeeWorkNo != null && !employeeWorkNo.trim().equals("")){
            buf.append(" AND a.f_work_no = '").append(employeeWorkNo).append("'");
        }
        if(description != null && !description.trim().equals("")){
            buf.append(" AND a.f_operate_desc LIKE '%").append(description).append("%'");
        }
        if(employeeName != null && !employeeName.trim().equals("")) {
        	buf.append(" AND d.f_employee_name LIKE '%").append(employeeName).append("%'");
        }
        if(loginHost != null && !loginHost.trim().equals("")) {
        	buf.append(" AND a.f_login_host LIKE '%").append(loginHost).append("%'");
        }
        buf.append(" order by a.f_operate_date )t ) ");
        buf.append(" where  rowcound < ").append(endRow);
	    buf.append(" and rowcound >= ").append(startRow);
	    
        String sql = buf.toString();
      
        Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;

        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();

            while(rest.next()) {
                vo = new LogVO();
                vo.setAttribute(rest);
                coll.addLog(vo);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getLogInfo-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getLogInfo-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
        return coll;
    }
    public LogColl getLogInfo(HashMap map) throws DataAccessException {
        String employeeWorkNo = (String)map.get("employeeWorkNo");        
        //String systemId = (String)map.get("systemId");
        String menuId = (String)map.get("menuId");        
        String description = (String)map.get("description");
        String startDate = (String)map.get("startDate");
        String endDate = (String)map.get("endDate");
        String partMonth = (String)map.get("month");
        String cityCode = (String)map.get("cityCode");
        String loginHost = (String) map.get("loginHost");
        String employeeName = (String) map.get("employeeName");
    
        LogColl coll = new LogColl();
        LogVO vo =  null;
        StringBuffer buf = new StringBuffer();

        buf.append("select * from (");
	    buf.append(" select rownum rowcound,t.* from ( select a.*, d.f_employee_name, e.f_system_name, f.f_organ_name  ");
	    buf.append(" FROM om_write_log_t a, om_employee_t d , om_system_t e, om_organ_t f");
        buf.append(" WHERE a.f_employee_id = d.f_employee_id");
        buf.append(" AND a.f_system_id = e.f_system_id ");
        buf.append(" AND d.f_organ_id = f.f_organ_id ");
        buf.append(" AND a.f_operate_date >=").append("TO_DATE('").append(startDate).append("','yyyy-MM-dd hh24:mi:ss')");
        buf.append(" AND a.f_operate_date <=").append("TO_DATE('").append(endDate).append("','yyyy-MM-dd hh24:mi:ss')");
        buf.append(" AND a.f_part_city = '").append(cityCode).append("'");
        buf.append(" AND a.f_part_mm = '").append(partMonth).append("'");
        if(menuId!=null && !menuId.equals("")){
            buf.append(" AND a.f_menu_id like '").append(menuId).append("%'");
        }
        if(employeeWorkNo != null && !employeeWorkNo.trim().equals("")){
            buf.append(" AND a.f_work_no = '").append(employeeWorkNo).append("'");
        }
        if(description != null && !description.trim().equals("")){
            buf.append(" AND a.f_operate_desc LIKE '%").append(description).append("%'");
        }
        if(employeeName != null && !employeeName.trim().equals("")) {
        	buf.append(" AND d.f_employee_name LIKE '%").append(employeeName).append("%'");
        }
        if(loginHost != null && !loginHost.trim().equals("")) {
        	buf.append(" AND a.f_login_host LIKE '%").append(loginHost).append("%'");
        }
        buf.append(" order by a.f_operate_date )t ) ");
       
        String sql = buf.toString();
      
        Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;

        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();

            while(rest.next()) {
                vo = new LogVO();
                vo.setAttribute(rest);
                coll.addLog(vo);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getLogInfo-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getLogInfo-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
        return coll;
    }
    
    public LogVO getLogInfoBySequence(int no) throws DataAccessException {
        LogVO vo = new LogVO();
        StringBuffer buf = new StringBuffer();
        buf.append("SELECT * ");
        buf.append(" FROM om_write_log_t");
        buf.append(" WHERE f_sequence_id = "+ no);        
        String sql = buf.toString();        
        Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();
            while(rest.next()) {
                vo.setAttribute(rest);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getLogInfoByLogSequence-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getLogInfoByLogSequence-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
        return vo;
    }
    /**
     * 根据 登录帐号 和 操作时间 获取日志详细信息
     * @param map
     * @return
     * @throws DataAccessException
     */
    public LogVO getDetailLogInfo(String partCity,int partMM,String workNo,
        	String operTime) throws DataAccessException {
        LogVO vo = new LogVO();
        StringBuffer buf = new StringBuffer();
        buf.append(" SELECT a.F_PART_CITY ,a.F_PART_MM ,a.F_AREA_ID , ");
        buf.append(" 		a.F_SYSTEM_ID ,a.F_MODULE_ID ,a.F_MENU_ID , ");
        buf.append(" 		a.F_BOTTOM_ID ,a.F_BOTTOM_NAME ,a.F_OPERATE_DATE , ");
        buf.append(" 		a.F_LOGIN_HOST ,a.F_MAC ,a.F_OPERATE_DESC , ");
        buf.append(" 		a.F_EMPLOYEE_ID ,a.F_WORK_NO ,a.F_MENU_NAME , ");
        buf.append(" 	    b.f_area_name ,c.f_employee_name ,d.f_system_name");
        buf.append("   FROM om_write_log_t a,");
        buf.append("   		om_area_t b,");
        buf.append("   		om_employee_t c,");
        buf.append("   		om_system_t d");
        buf.append("  WHERE a.f_part_city = ? ");
        buf.append("    AND a.f_part_mm = ? ");
        buf.append("    AND a.f_work_no = ? ");
        buf.append("    AND a.f_operate_date = to_date(?,'yyyy-MM-dd hh24:mi:ss') ");
        buf.append("    AND a.f_area_id = b.f_area_id ");
        buf.append("    AND a.f_employee_id = c.f_employee_id ");
        buf.append("    AND a.f_system_id = d.f_system_id");
        
        String sql = buf.toString();        
        Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;
        
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,partCity);
            pstmt.setInt(2,partMM);
            pstmt.setString(3,workNo);
            pstmt.setString(4,operTime);
            rest = pstmt.executeQuery();
            while(rest.next()) {
                vo.setAttribute(rest);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getDetailLogInfo()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getDetailLogInfo()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
        return vo;
    }
    
    /**
     * 根据menu_id获取权限信息，返回信息包括
     * 		bottomId		
     * 		bottomName		
     * 		menuId	
     * 		menuName		
     * 		systemId
     * 		log		日志类型，是否记录日志。1，记录日志；0，不记录日志		
     * @param menuId
     * @return
     * @throws DataAccessException
     */
    public Map<String,String> getPrivilegeInfoByMenuId(String bottomId,String systemId){
    	Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;
        Map<String,String> resultMap=new HashMap<String,String>();
        
    	StringBuffer sqlBuf=new StringBuffer();
//    	sqlBuf.append("SELECT a.privilege_id bottom_id, a.privilege_name bottom_name,");
//    	sqlBuf.append(" 		a.parent_privilegeid menu_id,						 ");
//    	sqlBuf.append("		(SELECT privilege_name  FROM PRIVILEGE c				 ");
//    	sqlBuf.append("		WHERE c.privilege_id = a.parent_privilegeid) menu_name,  ");
//    	sqlBuf.append("		b.privilege_id system_id, NVL (a.LOG, 0) log			 ");
//    	sqlBuf.append(" FROM PRIVILEGE a, PRIVILEGE b								 ");
//    	sqlBuf.append(" WHERE a.menu_id = ?   AND b.menu_id = ?    					 ");
    	
    	sqlBuf.append(" select a.f_menu_id bottom_id, a.f_menu_name bottom_name,");
    	sqlBuf.append(" a.f_parent_menu_id menu_id,                         ");
    	sqlBuf.append("    (SELECT f_menu_name  FROM om_menu_t c            ");     
    	sqlBuf.append("    WHERE c.f_menu_id = a.f_parent_menu_id) menu_name,");  
    	sqlBuf.append(" c.f_system_id system_id, NVL (a.f_LOG, 0) log  ");
    	sqlBuf.append(" from om_menu_t a, om_menu_t b , om_system_t c");
    	sqlBuf.append(" where a.f_parent_menu_id = b.f_menu_id and a.f_system_id = c.f_system_id");
    	sqlBuf.append(" and a.f_menu_id = ?");
        	
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            pstmt.setString(1, bottomId);
            //pstmt.setString(2, systemId);
            rest = pstmt.executeQuery();

            if(rest.next()) {
            	resultMap.put("bottomId", rest.getString("bottom_id"));
            	resultMap.put("bottomName", rest.getString("bottom_name"));
            	resultMap.put("menuId", rest.getString("menu_id"));
            	resultMap.put("menuName", rest.getString("menu_name"));
            	resultMap.put("systemId", rest.getString("system_id"));
            	resultMap.put("log", rest.getString("log"));
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getPrivilegeInfoByMenuId-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getPrivilegeInfoByMenuId-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return resultMap;
    }


	public String getEmployeeIdByWorkNo(String workNo) throws DataAccessException {
		Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;
       	String employeeId=null;
        
    	StringBuffer sqlBuf=new StringBuffer();
    	sqlBuf.append("SELECT f_employee_id  FROM om_employee_t WHERE f_work_no = ?	");
        	
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            pstmt.setString(1, workNo);

            rest = pstmt.executeQuery();

            if(rest.next()) {
            	employeeId=rest.getString("f_employee_id");
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getEmployeeIdByWorkNo-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getEmployeeIdByWorkNo-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return employeeId;
	}
	public int doAddLogInfoByProc(HashMap map)  throws DataAccessException{        
        String workNo = (String)map.get("workNo");
        String systemId = (String) map.get("systemId");
        //String menuId = (String)map.get("menuId");
        String buttonId = (String)map.get("buttonId");
        String loginHost = (String)map.get("loginHost");
        String operDesc = (String)map.get("operDesc");
		int code = 0;
        String msg = "";
        Connection conn = null;
        CallableStatement pst = null;
        
        try {
            conn = getConnection();
            pst = conn.prepareCall("{call om_write_log_p(?,?,?,?,?,?,?)}");
            
            pst.setString(1,workNo);
            pst.setString(2,systemId);
            //pst.setString(3,menuId); 
            pst.setString(3,buttonId);  
            pst.setString(4, loginHost);  
            pst.setString(5, operDesc);  
            pst.registerOutParameter(6, java.sql.Types.NUMERIC);
            pst.registerOutParameter(7, java.sql.Types.VARCHAR);
            pst.execute();
            code = pst.getInt(6);                                 
            msg = pst.getString(7);    
        } catch (SQLException sqle) {
            msg = sqle.getMessage();
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--addLogInfoByProc:"+sqle.getMessage());
            throw new DataAccessException(sqle);
        } catch (Exception alle) {
            msg = alle.getMessage();
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--addLogInfoByProc:"+alle.getMessage());
            throw new DataAccessException(alle);
        } finally {
            close(pst, conn);
        }
		return code;
	}

    /**
     * 根据登录账号得到其对应的区域编号
     * @param workNo
     * @return
     * @throws DataAccessException
     */
    public String getAreaIdByWorkNo(String workNo) throws DataAccessException{
    	String areaId = "";
		Connection conn = null;
        PreparedStatement pstmt       = null ;
        ResultSet         rest        = null ;
        
    	StringBuffer sqlBuf=new StringBuffer();
    	sqlBuf.append("SELECT f_area_id  FROM om_employee_t WHERE f_work_no = ? ");
        	
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            pstmt.setString(1, workNo.toUpperCase());
            rest = pstmt.executeQuery();
            if(rest.next()) {
            	areaId=rest.getString("f_area_id");
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getAreaIdByWorkNo-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getAreaIdByWorkNo-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
    	return areaId;
    }
    
    public String getPartCityByAreaId(String areaId) throws DataAccessException{
    	String partCity = "";
    	if(areaId != null && !areaId.equals("")){
    		Connection conn = null;
            PreparedStatement pstmt       = null ;
            ResultSet         rest        = null ;
            
        	StringBuffer sqlBuf=new StringBuffer();
        	sqlBuf.append("SELECT f_city_code  FROM om_area_t WHERE f_area_id = ? ");
            	
            try{
                conn = getConnection();
                pstmt = conn.prepareStatement(sqlBuf.toString());
                pstmt.setString(1, areaId);
                rest = pstmt.executeQuery();
                if(rest.next()) {
                	partCity=rest.getString("f_city_code");
                }
            }catch(SQLException e){
                SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getPartCityByAreaId-1:"+e.getMessage());
                throw new DataAccessException(e);
            }catch(Exception e){
                SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--getPartCityByAreaId-2:"+e.getMessage());
                throw new DataAccessException(e);
            }finally{
                close(rest,pstmt,conn);
            }
    	}
    	return partCity;
    }

    /**
     * 根据隐藏域中所绑定的按钮值，该值对应OM_MENU_T表中的主键F_MENU_ID值
     * @param btnID
     * @return
     * @throws DataAccessException
     */
    public LogVO isWriteLogs(String btnID) throws DataAccessException {
    	LogVO vo = null;
    	String sql = "SELECT F_SYSTEM_ID FROM OM_MENU_T WHERE F_LOG='1' AND F_MENU_ID=?";
        Connection conn = null;
        PreparedStatement pst = null ;
        ResultSet rs = null ;
        try{
        	vo = new LogVO();
            conn = getConnection();
            pst = conn.prepareStatement(sql);
            pst.setString(1,btnID);
            rs = pst.executeQuery();
            while(rs.next()) {
                vo.setAttribute(rs);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--isWriteLogs()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogDAOImpl--isWriteLogs()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rs,pst,conn);
        }
        return vo;
    }

}