package com.neusoft.om.dao.dealer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

	public class DealerDAOImpl extends BaseDaoImpl implements DealerDAO{
		
		/**
		 * 根据id得到dealer信息
		 * @param dealerId
		 * @return
		 * @throws DataAccessException
		 */
		public DealerVO getDealerById(String dealerId) throws DataAccessException{
			DealerVO dealerVO = new DealerVO();
			StringBuffer buf = new StringBuffer();
	        buf.append(" SELECT dealer_id, dealer_name,dealer_type,region_code, dealer_parent");
			buf.append(" FROM bd_dealer_t WHERE dealer_id = ? and valid_status =  1");				
			String sql = buf.toString();				
			Connection conn = null;
			PreparedStatement pstmt = null;
			ResultSet rest = null;
			try{
				conn = getConnection();
				pstmt = conn.prepareStatement(sql);
				pstmt.setString(1,dealerId);
				rest = pstmt.executeQuery();					
				if(rest.next()){
					dealerVO.setAttribute(rest);
				}       
			}catch(SQLException e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getDealerById-1:"+e.getMessage());
				throw new DataAccessException(e);
			}catch(Exception e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getDealerById-2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
			}  		
			return dealerVO;
		}
		
		/**
		 * 得到属于某组织机构的dealer集合
		 * @param organId
		 * @return
		 * @throws DataAccessException
		 */
		public DealerColl getDealerCollByOrganId(String organId) throws DataAccessException{
			DealerColl dealerColl = new DealerColl();
			StringBuffer buf = new StringBuffer();			
	        buf.append(" SELECT * ");
			buf.append(" FROM bd_dealer_t WHERE belongs_part = ?");
			buf.append(" and valid_status =  1 ");
			buf.append(" start with dealer_parent = '0' connect by PRIOR dealer_id = dealer_parent ");
			buf.append(" order SIBLINGS by dealer_name ");
			String sql = buf.toString();				
			Connection conn = null;
			PreparedStatement pstmt = null;
			ResultSet rest = null;
			try{
				conn = getConnection();
				pstmt = conn.prepareStatement(sql);
				pstmt.setString(1,organId);
				rest = pstmt.executeQuery();					
				while(rest.next()){
					DealerVO dealerVO = new DealerVO();
					dealerVO.setAttribute(rest);
					dealerColl.addDealerVO(dealerVO);
				}       
			}catch(SQLException e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getDealerCollByOrganId-1:"+e.getMessage());
				throw new DataAccessException(e);
			}catch(Exception e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getDealerCollByOrganId-2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
			}  
			return dealerColl;
			
		}
		
		public DealerTypeVO getDealerTypeById(int id) throws DataAccessException{
			DealerTypeVO vo = new DealerTypeVO();
			StringBuffer buf = new StringBuffer();
	        buf.append(" SELECT * ");
			buf.append(" FROM bd_dealer_type_t WHERE dealer_type = ?");				
			String sql = buf.toString();				
			Connection conn = null;
			PreparedStatement pstmt = null;
			ResultSet rest = null;
			try{
				conn = getConnection();
				pstmt = conn.prepareStatement(sql);
				pstmt.setInt(1,id);
				rest = pstmt.executeQuery();					
				if(rest.next()){
					vo.setAttribute(rest);
				}       
			}catch(SQLException e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getDealerTypeById-1:"+e.getMessage());
				throw new DataAccessException(e);
			}catch(Exception e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getDealerTypeById-2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
			}  
			return vo;
		}
		
		public DealerTypeColl getAllDealerType() throws DataAccessException{
			DealerTypeColl coll = new DealerTypeColl();
			StringBuffer buf = new StringBuffer();
	        buf.append(" SELECT * ");
			buf.append(" FROM bd_dealer_type_t ");				
			String sql = buf.toString();				
			Connection conn = null;
			PreparedStatement pstmt = null;
			ResultSet rest = null;
			try{
				conn = getConnection();
				pstmt = conn.prepareStatement(sql);
				rest = pstmt.executeQuery();					
				while(rest.next()){
					DealerTypeVO vo = new DealerTypeVO();
					vo.setAttribute(rest);
					coll.addDealerTypeVO(vo);
				}       
			}catch(SQLException e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getAllDealerType-1:"+e.getMessage());
				throw new DataAccessException(e);
			}catch(Exception e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getAllDealerType-2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
			}  
			return coll;
		}
		public DealerStructureColl getDealerStructureColl() throws DataAccessException{
			DealerStructureColl structColl = new DealerStructureColl();
			String sql = "select * from bd_dealer_structure_t where layer in (1,2) " +
					" start with layer = 1 connect by prior struct_id = parent_struct_id";
			Connection conn = null;
			PreparedStatement pstmt = null;
			ResultSet rest = null;
			try{
				conn = getConnection();
				pstmt = conn.prepareStatement(sql);
				rest = pstmt.executeQuery();					
				while(rest.next()){
					DealerStructureVO vo = new DealerStructureVO();
					vo.setAttribute(rest);
					structColl.addDealerStructureVO(vo);
				}       
			}catch(SQLException e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getDealerStructureColl-1:"+e.getMessage());
				throw new DataAccessException(e);
			}catch(Exception e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getDealerStructureColl-2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
			}  
			return structColl;
		}
		
		public DealerColl getDealerCollByStruct(String structId, String organId, String dealerName) throws DataAccessException{
			DealerColl coll = new DealerColl();
			StringBuffer buf = new StringBuffer();
	        buf.append(" select dealer_id, dealer_name,dealer_parent,region_code from bd_dealer_t where 1=1 ");   
	        buf.append(" and struct_id in (" );
	        buf.append(" select struct_id from bd_dealer_structure_t where layer > 2 ");
	        buf.append(" start with struct_id = ? connect by prior struct_id = parent_struct_id) ") ;
	        if(dealerName != null && !dealerName.trim().equals("")){
	        	buf.append(" and dealer_name like ? " );
	        }
	        buf.append(" and dealer_status =  1 ");
	        buf.append(" and belongs_part = ? order by dealer_name ");
			String sql = buf.toString();				
			Connection conn = null;
			PreparedStatement pstmt = null;
			ResultSet rest = null;
			try{
				conn = getConnection();
				pstmt = conn.prepareStatement(sql);
				int i = 1;				
				pstmt.setString(i++, structId);
				if(dealerName != null && !dealerName.trim().equals("")){
					pstmt.setString(i++, "%"+dealerName+"%");
		        }
				pstmt.setString(i++, organId);
				rest = pstmt.executeQuery();					
				while(rest.next()){
					DealerVO vo = new DealerVO();
					vo.setAttribute(rest);
					coll.addDealerVO(vo);
				}       
			}catch(SQLException e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getDealerCollByStruct-1:"+e.getMessage());
				throw new DataAccessException(e);
			}catch(Exception e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getDealerCollByStruct-2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
			}  
			return coll;
		}
		
		public DealerColl getDealerCollByOrganIdDealerName(String organId, String dealerName) throws DataAccessException{
			DealerColl coll = new DealerColl();
			StringBuffer buf = new StringBuffer();
	        buf.append(" SELECT dealer_id, dealer_name,dealer_type,dealer_parent,region_code ");
			buf.append(" FROM bd_dealer_t WHERE belongs_part = ? " );
			if(dealerName != null && !dealerName.trim().equals("") && !dealerName.equals("null")){
				buf.append(" and dealer_name like ? ");
			}				
			buf.append(" and valid_status =  1 ");
			buf.append(" start with dealer_parent = '0' connect by PRIOR dealer_id = dealer_parent ");
			buf.append(" order SIBLINGS by dealer_name ");
			String sql = buf.toString();				
			Connection conn = null;
			PreparedStatement pstmt = null;
			ResultSet rest = null;
			try{
				conn = getConnection();
				pstmt = conn.prepareStatement(sql);
				pstmt.setString(1, organId);
				if(dealerName != null && !dealerName.trim().equals("") && !dealerName.equals("null")){
					pstmt.setString(2, "%"+dealerName+"%");
				}
				
				rest = pstmt.executeQuery();					
				while(rest.next()){
					DealerVO vo = new DealerVO();
					vo.setAttribute(rest);
					coll.addDealerVO(vo);
				}       
			}catch(SQLException e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getDealerCollByOrganIdDealerName-1:"+e.getMessage());
				throw new DataAccessException(e);
			}catch(Exception e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DealerDAOImpl--getDealerCollByOrganIdDealerName-2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
			}  
			return coll;
		}
}
