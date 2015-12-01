package com.neusoft.om.dao.address;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.om.OMAppContext;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.NullProcessUtil;

/**brief description
 * <p>Date       : 2004-12-15</p>
 * <p>Module     : om</p>
 * <p>Description: employee maintance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class AddressDAOImpl extends BaseDaoImpl implements AddressDAO {

	public AddressVO getAddressInfoByAddressId(int addressId) throws DataAccessException {
		AddressVO vo = null;
		String sql = "select * from om_address_t where f_address_id = ?";

		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,addressId);
			rest = pstmt.executeQuery();

			if(rest.next()) {
				vo = new AddressVO();
				vo.setAttribute(rest);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AddressDAOImpl--getAddressInfoByAddressId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AddressDAOImpl--getAddressInfoByAddressId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return vo;
	}

	public AddressColl getAddressInfoByOrganId(String organId) throws DataAccessException {
		AddressVO vo = null;
		AddressColl coll = new AddressColl();
		String sql = "select * from om_address_t where f_organ_id = ?";

		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				vo = new AddressVO();
				vo.setAttribute(rest);
				coll.addAddress(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AddressDAOImpl--getAddressInfoByAddressId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AddressDAOImpl--getAddressInfoByAddressId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}

	public int doAddAddressInfo(AddressVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_address_t " +
			"(f_address_id,f_postalcode,f_cust_address_detail,f_link_man,f_telephone,f_mobile,f_email,f_organ_id )" +
			" values (?,?,?,?,?,?,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,vo.getAddressId());
			pstmt.setString(2,NullProcessUtil.nvlToString(vo.getPostalcode(),""));
			pstmt.setString(3,NullProcessUtil.nvlToString(vo.getCustAddressDetail(),""));
			pstmt.setString(4,vo.getLinkMan());;
			pstmt.setString(5,NullProcessUtil.nvlToString(vo.getTelephone(),""));
			pstmt.setString(6,NullProcessUtil.nvlToString(vo.getMobile(),""));
			pstmt.setString(7,NullProcessUtil.nvlToString(vo.getEmail(),""));
			pstmt.setString(8,NullProcessUtil.nvlToString(vo.getOrganId(),""));
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AddressDAOImpl--doAddAddressInfo-1:"+e.getMessage());
			e.printStackTrace();
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			e.printStackTrace();
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AddressDAOImpl--doAddAddressInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public int doModifyAddressInfo(AddressVO vo) throws DataAccessException {
		int code = 1;
		String sql ="update om_address_t set f_address_id = ?,f_postalcode = ?,f_cust_address_detail = ?," +
			"f_link_man = ?,f_telephone = ?,f_mobile = ?,f_email = ?,f_organ_id = ?" +
			" where f_address_id = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,vo.getAddressId());
			pstmt.setString(2,vo.getPostalcode());
			pstmt.setString(3,vo.getCustAddressDetail());
			pstmt.setString(4,vo.getLinkMan());
			pstmt.setString(5,vo.getTelephone());
			pstmt.setString(6,vo.getMobile());
			pstmt.setString(7,vo.getEmail());
			pstmt.setString(8,vo.getOrganId());
			pstmt.setInt(9,vo.getAddressId());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AddressDAOImpl--doModifyAddressInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AddressDAOImpl--doModifyAddressInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteAddressInfoByOrganId(String organId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_address_t where f_organ_id = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AddressDAOImpl--doDeleteAddressInfoByOrganId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AddressDAOImpl--doDeleteAddressInfoByOrganId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public int doDeleteAddressInfoById(int addressId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_address_t where f_address_id = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,addressId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AddressDAOImpl--doDeleteAddressInfoById-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AddressDAOImpl--doDeleteAddressInfoById-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
//	测试方法
	public static void main(String args[]){
		AddressDAO dao = (AddressDAO)OMAppContext.getBean(AddressDAO.BEAN);
		try {
			  AddressVO vo = dao.getAddressInfoByAddressId(1);
			  AddressVO vo1 = new AddressVO();
			  if (vo!=null){
				  System.out.println(vo.toString(3));
				  vo1.setAddressId(5);
				  vo1.setPostalcode("3");
				  vo1.setEmail("test@aaa.com");
			   int code = dao.doAddAddressInfo(vo1);
			   System.out.println(code);
			  }
		} catch (DataAccessException e) {
			e.printStackTrace();
		}
	}	  

}