package com.neusoft.om.dao.employeedutyrelation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.om.OMAppContext;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;

/**brief description
 * <p>Date       : 2004-12-07</p>
 * <p>Module     : om</p>
 * <p>Description: employeedutyrelation maintance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class EmployeeDutyRelationDAOImpl extends BaseDaoImpl implements EmployeeDutyRelationDAO{
	/**
	* 根据操作员登陆的账号,获得职员编号
	*/
	public String getEmployeeEmployeeIdByWorkNo(String workNo) throws DataAccessException{
		String employeeId = null;
		       employeeId = workNo;
		String sql = "SELECT f_employee_id " +
						" FROM om_employee_t a " +
						" WHERE a.f_work_no = ? " ;
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,workNo);
			rest = pstmt.executeQuery();
			
			if(rest.next()){
				employeeId=rest.getString(1);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfoByWorkNo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfoByWorkNo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return employeeId;
	}
	/**
	* 根据操作员登陆的账号,获得操作员所担任职务信息集合(流程)
	*/
	public EmployeeDutyRelationColl getEmployeeDutyRelationInfoByWorkNo(String workNo) throws DataAccessException{
		EmployeeDutyRelationVO vo = null;
		EmployeeDutyRelationColl coll = new EmployeeDutyRelationColl();
		
		String sql = "SELECT * " +
						" FROM om_employee_t a,om_employee_duty_relation_t b " +
						" WHERE a.f_work_no = ? " +
						" AND a.f_employee_id = b.f_employee_id ";
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,workNo);
			rest = pstmt.executeQuery();
			
			while(rest.next()){
				vo = new EmployeeDutyRelationVO();
				vo.setAttribute(rest);
				coll.addElement(vo);
				
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfoByWorkNo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfoByWorkNo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	public EmployeeDutyRelationColl getEmployeeDutyRelationInfoByEmployeeId(String employeeId) throws DataAccessException{
		EmployeeDutyRelationVO vo = null;
		EmployeeDutyRelationColl coll = new EmployeeDutyRelationColl();
		String sql = "SELECT * " +
						" FROM om_employee_duty_relation_t" +
						" WHERE f_employee_id = ? ORDER BY f_kind ASC";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			rest = pstmt.executeQuery();
	
			while(rest.next()){
				vo = new EmployeeDutyRelationVO();
				vo.setAttribute(rest);
				coll.addElement(vo);
		
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfoByEmployeeId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfoByEmployeeId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
	public EmployeeDutyRelationVO getEmployeeByOrganIdDutyId(String organId,int dutyId) throws DataAccessException{
		EmployeeDutyRelationVO vo = null;
		String sql = "SELECT * " +
						" FROM om_employee_duty_relation_t" +
						" WHERE f_organ_id = ?" +
						" AND f_duty_id = ?";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			pstmt.setInt(2,dutyId);
			rest = pstmt.executeQuery();

			if(rest.next()){
				vo = new EmployeeDutyRelationVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfoByEmployeeId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfoByEmployeeId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return vo;
	}
	public EmployeeDutyRelationColl getEmployeeDutyRelationInfoByDutyId(int dutyId) throws DataAccessException{
		EmployeeDutyRelationColl coll = new EmployeeDutyRelationColl();
		EmployeeDutyRelationVO vo = null;
		String sql = "SELECT * FROM om_employee_duty_relation_t WHERE f_duty_id = ?";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,dutyId);
			rest = pstmt.executeQuery();

			while(rest.next()){
				vo = new EmployeeDutyRelationVO();
				vo.setAttribute(rest);
				coll.addEmployeeDutyRelation(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfoByDutyId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfoByDutyId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
	public int doAddEmployeeDutyRelationInfo(EmployeeDutyRelationVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_employee_duty_relation_t (f_duty_id,f_employee_id,f_organ_id,f_kind) values(?,?,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,vo.getDutyId());
			pstmt.setString(2,vo.getEmployeeId());
			pstmt.setString(3,vo.getOrganId());
			pstmt.setInt(4,vo.getKind());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--doAddEmployeeDutyRelationInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--doAddEmployeeDutyRelationInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public int[] doAddEmployeeDutyRelationInfo(EmployeeDutyRelationColl coll) throws DataAccessException {
		int[] code = null;//成功
		StringBuffer buf = new StringBuffer();
		buf.append("insert into om_employee_duty_relation_t ");
		buf.append(" (f_duty_id,f_employee_id,f_organ_id,f_kind ) ");
		buf.append(" values(?,?,?,?)");
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			if(conn !=null){
				for(int i=0;i<coll.getRowCount();i++){
					pstmt.setInt(1,coll.getEmployeeDutyRelation(i).getDutyId());
					pstmt.setString(2,coll.getEmployeeDutyRelation(i).getEmployeeId());
					pstmt.setString(3,coll.getEmployeeDutyRelation(i).getOrganId());
					pstmt.setInt(4,coll.getEmployeeDutyRelation(i).getKind());
					pstmt.addBatch();
				}
				code = pstmt.executeBatch();
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--doAddEmployeeDutyRelationInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--doAddEmployeeDutyRelationInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public int doModifyEmployeeDutyRelationInfo(EmployeeDutyRelationVO employeeDutyRelationVO, String oldOrganId, int oldDutyId) throws DataAccessException {
		int code = 1;
		StringBuffer buf = new StringBuffer();
		buf.append("update om_employee_duty_relation_t ");
		buf.append(" set f_duty_id = ?,f_organ_id = ?,f_kind = ?");
		buf.append(" where f_duty_id = ? and f_employee_id = ? and f_organ_id = ?");
		Connection conn = null;
		PreparedStatement  pstmt = null;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1,employeeDutyRelationVO.getDutyId());
			pstmt.setString(2,employeeDutyRelationVO.getOrganId());
			pstmt.setInt(3,employeeDutyRelationVO.getKind());
			
			pstmt.setInt(4,oldDutyId);
			pstmt.setString(5,employeeDutyRelationVO.getEmployeeId());
			pstmt.setString(6,oldOrganId);
			
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--doModifyEmployeeDutyRelationInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--doModifyEmployeeDutyRelationInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
		
	public int doDeleteEmployeeDutyRelationInfoByEmployeeId(String employeeId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_employee_duty_relation_t where f_employee_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--doDeleteEmployeeDutyRelationInfoByEmployeeId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--doDeleteEmployeeDutyRelationInfoByEmployeeId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public int doDeleteEmployeeDutyRelationInfoByOrganId(String organId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_employee_duty_relation_t where f_organ_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--doDeleteEmployeeDutyRelationInfoByOrganId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--doDeleteEmployeeDutyRelationInfoByOrganId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	public int doDeleteEmployeeDutyRelationInfo(String organId, int dutyId, String employeeId) throws DataAccessException {
		int code = 1;
		StringBuffer bufDel = new StringBuffer("");
		bufDel.append(" delete from om_employee_duty_relation_t ");
		bufDel.append(" where f_organ_id = ? and f_duty_id = ? and f_employee_id = ? ");
		
		String sql = bufDel.toString();
		Connection conn = null;
		PreparedStatement  pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			pstmt.setInt(2,dutyId);
			pstmt.setString(3,employeeId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--doDeleteEmployeeDutyRelationInfoByOrganId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--doDeleteEmployeeDutyRelationInfoByOrganId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public EmployeeDutyRelationVO getEmployeeDutyRelationInfo(String organId, int dutyId, String employeeId) throws DataAccessException {
		EmployeeDutyRelationVO vo = null;
		StringBuffer buf = new StringBuffer("");
		buf.append("SELECT * FROM om_employee_duty_relation_t");
		buf.append(" where f_organ_id = ? and f_duty_id = ? and f_employee_id = ? ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		String sql = buf.toString();
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,organId);
			pstmt.setInt(2,dutyId);
			pstmt.setString(3,employeeId);
			rest = pstmt.executeQuery();

			while(rest.next()){
				vo = new EmployeeDutyRelationVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return vo;
	}
	
    
    public EmployeeDutyRelationColl getEmployeeDutyRelationByOrganId(String organId) throws DataAccessException {
        EmployeeDutyRelationColl coll = new EmployeeDutyRelationColl();
        StringBuffer buf = new StringBuffer("");
        buf.append("SELECT a.*,b.f_work_no,b.f_area_id,b.f_owner FROM om_employee_duty_relation_t a,om_employee_t b");
        buf.append(" where a.f_organ_id = ? and a.f_employee_id=b.f_employee_id");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        String sql = buf.toString();
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(buf.toString());
            pstmt.setString(1,organId);
            rest = pstmt.executeQuery();

            while(rest.next()){
                EmployeeDutyRelationVO vo = new EmployeeDutyRelationVO();
                vo.setAttribute(rest);
                coll.addEmployeeDutyRelation(vo);
            }            
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfo-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDutyRelationDAOImpl--getEmployeeDutyRelationInfo-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
        return coll;
    }
    
	//测试方法
	
	public static void main(String args[]){
		EmployeeDutyRelationDAO dao = (EmployeeDutyRelationDAO)OMAppContext.getBean(EmployeeDutyRelationDAO.BEAN);
		try {
			   EmployeeDutyRelationColl coll = null;
			   coll=dao.getEmployeeDutyRelationInfoByEmployeeId("999");
			
			   if(coll != null && coll.getRowCount()!=0 ){
			   	System.out.println(coll.getEmployeeDutyRelation(0).getEmployeeId());
			   }
		 }catch (DataAccessException e) {
			e.printStackTrace();
		}
	}
	
}