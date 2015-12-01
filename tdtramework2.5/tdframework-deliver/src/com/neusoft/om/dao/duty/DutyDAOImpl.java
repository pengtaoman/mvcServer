package com.neusoft.om.dao.duty;

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
 * <p>Date       : 2004-12-06</p>
 * <p>Module     : om</p>
 * <p>Description: organ maintance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class DutyDAOImpl extends BaseDaoImpl implements DutyDAO {
	
	public DutyColl getAllDutyInfo() throws DataAccessException{
		DutyColl coll = new DutyColl();
		StringBuffer buf = new StringBuffer();
		buf.append(" select * from om_duty_t ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			while(rest.next()){
				DutyVO vo = new DutyVO();
				vo.setAttribute(rest);
				coll.addDuty(vo);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getAllDutyInfo()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getAllDutyInfo()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	/**
	 * 根据主键查找唯一一条记录
	 */
	public DutyVO getDutyInfoById(int dutyId) throws DataAccessException{
		DutyVO vo = new DutyVO();
		
		String sql = "SELECT * "+
					" FROM om_duty_t " +
					" WHERE f_duty_id = ?" ;
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,dutyId);
			rest = pstmt.executeQuery();
			
			if(rest.next()){
				vo = new DutyVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getDutyInfoById-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getDutyInfoById-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}
	
	public DutyVO getDutyInfo(int organKind,String dutyName) throws DataAccessException{
		DutyVO vo = null;
		String sql = " select * from om_duty_t where f_organ_kind = ? and f_duty_name = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,organKind);
			pstmt.setString(2,dutyName);
			rest = pstmt.executeQuery();
	
			if(rest.next()){
				vo = new DutyVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getDutyInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getDutyInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}
	/**根据组织机构类型查找职务信息*/
	public DutyColl getDutyInfoByOrganKind(int organKind) throws DataAccessException{
		DutyColl coll = new DutyColl();
		DutyVO vo = null;
		
		String sql = "SELECT * "+
					" FROM om_duty_t " +
					" WHERE f_organ_kind = ?";
	
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,organKind);
			rest = pstmt.executeQuery();
		
			while(rest.next()){
				vo = new DutyVO();
				vo.setAttribute(rest);
				coll.addDuty(vo);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getDutyInfoByOrganKind-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getDutyInfoByOrganKind-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
	public DutyColl getDutyInfoByOrganId(String organId) throws DataAccessException {
		DutyColl coll = new DutyColl();
		DutyVO vo = null;
		String sql = "SELECT a.* FROM om_duty_t a,om_organ_duty_relation_t b " +
			" WHERE a.F_DUTY_ID = b.f_duty_id " +
			" AND b.f_organ_id = ?";
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				vo = new DutyVO();
				vo.setAttribute(rest);
				coll.addDuty(vo);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getDutyInfoByOrganId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getDutyInfoByOrganId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
	public DutyColl getDutyInfoByEmployeeId(String employeeId) throws DataAccessException {
		DutyColl coll = new DutyColl();
		DutyVO vo = null;
		String sql = "SELECT a.* FROM om_duty_t a,om_employee_duty_relation_t b " +
					" WHERE a.F_DUTY_ID = b.f_duty_id " +
					" AND b.f_employee_id = ?";
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				vo = new DutyVO();
				vo.setAttribute(rest);
				coll.addDuty(vo);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getDutyInfoByEmployeeId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getDutyInfoByEmployeeId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
	public DutyColl getDutyInfoByRoleId(int roleId) throws DataAccessException{
		DutyColl coll = new DutyColl();
		DutyVO vo = null;
		String sql = "SELECT a.* FROM om_duty_t a,om_duty_role_relation_t b " +
					" WHERE a.F_DUTY_ID = b.f_duty_id " +
					" AND b.f_role_id = ?";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,roleId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				vo = new DutyVO();
				vo.setAttribute(rest);
				coll.addDuty(vo);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getDutyInfoByRoleId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getDutyInfoByRoleId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;	
	}
	
	/**插入职员信息*/
	public int doAddDuty(DutyVO vo) throws DataAccessException{
		int code = 1; //成功
		String sql = " INSERT INTO om_duty_t(" +
	
						" f_duty_id, "+
						" f_parent_duty_id, "+
						" f_duty_name, "+
						" f_organ_kind, "+
						" f_duty_status, "+
						" f_inner_duty, "+
						" f_duty_desc "+
						" )values( ?, ?, ?, ?, ?, ? ,?)";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,vo.getDutyId());
			pstmt.setInt(2,vo.getParentDutyId());
			pstmt.setString(3,vo.getDutyName());
			pstmt.setInt(4,vo.getOrganKind());
			pstmt.setInt(5,vo.getDutyStatus());
			pstmt.setInt(6,vo.getInnerDuty());
			pstmt.setString(7,vo.getDutyDesc());
			
			code = pstmt.executeUpdate();
			
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--doAddDuty()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--doAddDuty()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return code;
	};
	/**根据主键更新职务信息*/
	public int doModifyDutyById(DutyVO vo) throws DataAccessException{
		int code = 1; //成功
		String sql = "update om_duty_t " +
						" set f_parent_duty_id = ?, "+
						" f_duty_name = ?,"+
						" f_organ_kind = ?,"+
						" f_duty_status = ?,"+
						" f_inner_duty = ?,"+
						" f_duty_desc = ?"+
					"where f_duty_id = ? " ;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setInt(1,vo.getParentDutyId());
			pstmt.setString(2,vo.getDutyName());
			pstmt.setInt(3,vo.getOrganKind());
			pstmt.setInt(4,vo.getDutyStatus());
			pstmt.setInt(5,vo.getInnerDuty());
			pstmt.setString(6,vo.getDutyDesc());
			pstmt.setInt(7,vo.getDutyId());
			
			code = pstmt.executeUpdate();
			
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--doModifyDutyById()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--doModifyDutyById()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return code;
	}
	/**根据主键删除组织机构信息*/
	public int doDeleteDutyById(int dutyId) throws DataAccessException{
		int code = 1; //成功
		
		String sql ="delete from om_duty_t where f_organ_id = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,dutyId);
	
			code = pstmt.executeUpdate();
	
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--doDeleteOrganById()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--doDeleteOrganById()-2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
		}  
		return code;
	}
	
	public int doDeleteDutyByOrganKind(int organKind) throws DataAccessException {
		int code = 1; //成功

		String sql ="delete from om_duty_t where f_organ_kind = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,organKind);
			code = pstmt.executeUpdate();

		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--doDeleteDutyByOrganKind()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--doDeleteDutyByOrganKind()-2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
		}  
		return code;
	}	
		
	/**得到上级信息,对于某个职务体系,会出现没有上级的时候,此时返回null*/
	public DutyVO getParentDutyInfo(int dutyId,int organKind) throws DataAccessException{
		DutyVO vo = null;
		String sql = "select * from om_duty_t " +
			"where f_organ_kind = ? " +
			"and f_duty_id = (select f_parent_duty_id from om_duty_t" +
								" where f_organ_kind = ? and f_duty_id = ?";
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,organKind);
			pstmt.setInt(2,organKind);
			pstmt.setInt(3,dutyId);
			rest = pstmt.executeQuery();
	
			if(rest.next()){
				vo = new DutyVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getParentDutyInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getParentDutyInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;								
	}


	public OrganKindDutyColl getOrganKindDuty() throws DataAccessException {
		OrganKindDutyVO vo = null;
		OrganKindDutyColl coll = new OrganKindDutyColl();
		DutyVO dutyVO = null;
		DutyColl dutyColl = new DutyColl();
		int preOrganKind = -999;
		int currentOrganKind;
		StringBuffer buf = new StringBuffer("");
		buf.append(" SELECT k.f_organ_kind f_kind,k.f_area_level f_area_level,k.f_kind_desc f_kind_desc,");
		buf.append(" k.f_parent_organ_kind f_parent_organ_kind,k.f_organ_kind_level f_organ_kind_level,k.f_order f_order,");
		buf.append(" LEVEL f_duty_level,c.*");
		buf.append(" FROM (");
		buf.append(" SELECT a.*,ROWNUM f_order");
		buf.append(" FROM om_organ_kind_t a");
		buf.append(" WHERE f_organ_kind <= 8000");
		buf.append(" START WITH f_parent_organ_kind IS NULL");
		buf.append(" CONNECT BY PRIOR f_organ_kind = f_parent_organ_kind) k,om_duty_t c");
		buf.append(" WHERE k.f_organ_kind = c.f_organ_kind");
		buf.append(" ORDER BY k.f_order");
        
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			
			while(rest.next()){
				dutyVO = new DutyVO();
				dutyVO.setAttribute(rest);
				currentOrganKind = rest.getInt("f_kind");
				if(currentOrganKind != preOrganKind && currentOrganKind != -999){
					dutyColl = new DutyColl();
					vo = new OrganKindDutyVO();
					vo.setOrganKind(rest.getInt("f_kind"));
					vo.setAreaLevel(rest.getInt("f_area_level"));
					vo.setKindDesc(rest.getString("f_kind_desc"));
					vo.setParentOrganKind(rest.getInt("f_parent_organ_kind"));
					vo.setOrganKindLevel(rest.getInt("f_organ_kind_level"));
					dutyColl.addDuty(dutyVO);
					vo.setDutyColl(dutyColl);
					coll.addOrganKindDuty(vo);
				}else{
					dutyColl.addDuty(dutyVO);
				}
				preOrganKind = rest.getInt("f_kind");
			}
			while(rest.next()){
				
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getParentDutyInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyDAOImpl--getParentDutyInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
		
	//测试方法
	public static void main(String args[]){
		DutyDAO dao = (DutyDAO)OMAppContext.getBean(DutyDAO.BEAN);
		try {
			//System.out.println(dao.getDutyInfoById(2).getDutyName());
			//System.out.println(dao.getDutyInfo(80,"workflow").getDutyId());
			for(int i=0;i<dao.getOrganKindDuty().getRowCount();i++){
				System.out.println(dao.getOrganKindDuty().getOrganKindDuty(i).getOrganKind());
				for(int j=0;j<dao.getOrganKindDuty().getOrganKindDuty(i).getDutyColl().getRowCount();j++){
					DutyVO vo = dao.getOrganKindDuty().getOrganKindDuty(i).getDutyColl().getDuty(j);
					System.out.println(vo.toString(2));
				}
			}
		} catch (DataAccessException e) {
			e.printStackTrace();
		}
	}
	
}                                                                                                                      