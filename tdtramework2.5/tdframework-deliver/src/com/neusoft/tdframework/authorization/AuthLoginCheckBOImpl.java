/**
 * 
 */
package com.neusoft.tdframework.authorization;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.log.SysLog;

/**
 * @projectName tdframework
 * @packageName com.neusoft.tdframework.authorization
 * @fileName AuthCheck.java
 * @Description 
 * @author likj 2010-6-23 上午11:17:32
 * @email li.kj@neusoft.com
 * @copyright NeuSoft
 */
public class AuthLoginCheckBOImpl extends BaseDaoImpl implements AuthLoginCheckBO {
	
	/**
	 * 验证账户是否被锁
	 * @param id
	 * @return
	 */
	public boolean isLock(String id) {
		Connection conn = null;
		PreparedStatement ps = null ;
		ResultSet rs = null ;
		String result = null;
		boolean isLock = false; //默认解锁
		String sql = "select F_FLAG from OM_LOGIN_FAIL_COUNT_T where F_LOGIN_ID='"+id+"'";
		try{
		    conn = getConnection();
		    ps = conn.prepareStatement(sql);
		    rs = ps.executeQuery();
		    while(rs.next()){
		    	result = rs.getString("F_FLAG");
		    }   
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--isLoginCount-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--isLoginCount-2:"+e.getMessage());
		}finally{
			close(rs, ps, conn);
		}
		if(null != result && !"".equals(result)) {
			if("1".equals(result)) {
				isLock = true;  //被锁
			}
		}
		return isLock;
	}
	

	/**
	 * 删除登录失败日志
	 * @param id
	 * @return
	 */
	public boolean delLoginLog(String id) {
		Connection conn = null;
		PreparedStatement ps = null ;
		boolean isDel = false;
		String sql = "delete from OM_LOGIN_FAIL_LOG_T where F_LOGIN_ID='"+id+"'";
		try{
			conn = getConnection();
			ps = conn.prepareStatement(sql);
			isDel = ps.execute();
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--delLoginLog-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--delLoginLog-2:"+e.getMessage());
		}finally{
			close(ps, conn);
		}
		return isDel;
	}
	
	/**
	 * 对登录失败日志做删除标记
	 * @param id 
	 * @return
	 */
	public boolean updateLoginLog(String id) {  //1:表示删除  0：表示未删除
		Connection conn = null;
		PreparedStatement ps = null ;
		boolean isUpdate = false;
		String sql = "update OM_LOGIN_FAIL_LOG_T set F_DEL_FLAG = '1'  where F_LOGIN_ID='"+id+"'";
		try{
			conn = getConnection();
			ps = conn.prepareStatement(sql);
			isUpdate = ps.execute();
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--delLoginLog-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--delLoginLog-2:"+e.getMessage());
		}finally{
			close(ps, conn);
		}
		return isUpdate;
	}
	/**
	 * 删除登录失败统计
	 * @param id
	 * @return
	 */
	public boolean delLoginCount(String id) {
		Connection conn = null;
		PreparedStatement ps = null ;
		boolean isDel = false;
		String sql = "delete from OM_LOGIN_FAIL_COUNT_T where F_LOGIN_ID='"+id+"'";
		try{
			conn = getConnection();
			ps = conn.prepareStatement(sql);
			isDel = ps.execute();
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--delLoginCount-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--delLoginCount-2:"+e.getMessage());
		}finally{
			close(ps, conn);
		}
		return isDel;
	}
	
	/**
	 * 添加登录失败日志
	 * @param vo
	 * @return
	 */
	public boolean addLoginLog(LoginFailLogVO vo) {
		Connection conn = null;
		PreparedStatement ps = null ;
		boolean isAdd = false;
		String sql = "insert into OM_LOGIN_FAIL_LOG_T (F_LOG_ID, F_PART_MM, F_LOGIN_ID, F_IP_ADDR, F_LOGIN_DATE, F_DNSNAME, F_MAC_ADDR, F_DEL_FLAG) values ('"+
		vo.getF_LOG_ID()+"','"+vo.getF_PART_MM()+"','"+vo.getF_LOGIN_ID()+"', '"+vo.getF_IP_ADDR()+"', '"+vo.getF_LOGIN_DATE()
		+"', '"+vo.getF_DNSNAME()+"', '"+vo.getF_MAC_ADDR()+"', '"+vo.getF_DEL_FLAG()+"')";
		try{
			conn = getConnection();
			ps = conn.prepareStatement(sql);
			isAdd = ps.execute();
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--addLoginLog-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--addLoginLog-2:"+e.getMessage());
		}finally{
			close(ps, conn);
		}
		return isAdd;
	}
	
	/**
	 * 添加登录失败计数
	 * @param vo
	 * @return
	 */
	public boolean addLoginCount(LoginFailCountVO vo) {
		Connection conn = null;
		PreparedStatement ps = null ;
		boolean isAdd = false;
		String sql = "insert into OM_LOGIN_FAIL_COUNT_T (F_COUNT_ID, F_LOGIN_ID, F_COUNT, F_TOTAL_COUNT, F_FLAG, F_BEG_MINUTES) values ('"+
		vo.getF_COUNT_ID()+"', '"+vo.getF_LOGIN_ID()+"', '"+vo.getF_COUNT()+"', '"+vo.getF_TOTAL_COUNT()+"', '"+vo.getF_FLAG()+"', '"+
		vo.getF_BEG_MINUTES()+"')";
		try{
			conn = getConnection();
			ps = conn.prepareStatement(sql);
			isAdd = ps.execute();
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--addLoginCount-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--addLoginCount-2:"+e.getMessage());
		}finally{
			close(ps, conn);
		}
		return isAdd;
	}
	
	/**
	 * 修改登录失败计数
	 * @param vo
	 * @return
	 */
	public int updateLoginCount(LoginFailCountVO vo) {
		Connection conn = null;
		PreparedStatement ps = null ;
		int result = 0;
		String sql = "update OM_LOGIN_FAIL_COUNT_T set F_COUNT='"+vo.getF_COUNT()+"', F_TOTAL_COUNT='"+vo.getF_TOTAL_COUNT()+"', F_FLAG='"
		+vo.getF_FLAG()+"', F_BEG_MINUTES='"+vo.getF_BEG_MINUTES()+"' where F_LOGIN_ID='"+vo.getF_LOGIN_ID()+"'";
		try{
			conn = getConnection();
			ps = conn.prepareStatement(sql);
			result = ps.executeUpdate();
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--updateLoginCount-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--updateLoginCount-2:"+e.getMessage());
		}finally{
			close(ps, conn);
		}
		return result;
	}
	
	/**
	 * 查询登录失败日志
	 * @param id
	 * @return
	 */
	public List<LoginFailLogVO> getLoginLogList(String id) {
		List<LoginFailLogVO> rList = new ArrayList<LoginFailLogVO>();
		Connection conn = null;
		PreparedStatement ps = null ;
		ResultSet rs = null ;
		String sql = "select * from OM_LOGIN_FAIL_LOG_T where F_LOGIN_ID='"+id+"'";
		try{
			conn = getConnection();
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			LoginFailLogVO vo = null;
			while(rs.next()) {
			   vo = new LoginFailLogVO();
			   vo.setF_LOG_ID(rs.getString("F_LOG_ID"));
			   vo.setF_LOGIN_ID(rs.getString("F_LOGIN_ID"));
			   vo.setF_REAL_NAME(rs.getString("F_REAL_NAME"));
			   vo.setF_IP_ADDR(rs.getString("F_IP_ADDR"));
			   vo.setF_LOGIN_DATE(rs.getString("F_LOGIN_DATE"));
			   vo.setF_DESC(rs.getString("F_DESC"));
			}
			rList.add(vo);;
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--getLoginLogList-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--getLoginLogList-2:"+e.getMessage());
		}finally{
			close(rs, ps, conn);
		}
		return rList;
	} 
	
	/**
	 * 查询登录失败计数
	 * @param id
	 * @return
	 */
	public List<LoginFailCountVO> getLoginCountList(String id) {
		List<LoginFailCountVO> rList = new ArrayList<LoginFailCountVO>();
		Connection conn = null;
		PreparedStatement ps = null ;
		ResultSet rs = null ;
		String sql = "select * from OM_LOGIN_FAIL_COUNT_T where F_LOGIN_ID='"+id+"'";
		try{
			conn = getConnection();
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			LoginFailCountVO vo = null;
			while(rs.next()) {
			   vo = new LoginFailCountVO();
			   vo.setF_COUNT_ID(rs.getString("F_COUNT_ID"));
			   vo.setF_LOGIN_ID(rs.getString("F_LOGIN_ID"));
			   vo.setF_COUNT(rs.getInt("F_COUNT"));
			   vo.setF_TOTAL_COUNT(rs.getInt("F_TOTAL_COUNT"));
			   vo.setF_FLAG(rs.getString("F_FLAG"));
			   vo.setF_BEG_MINUTES(rs.getString("F_BEG_MINUTES"));
			   vo.setF_BEG_HOURS(rs.getString("F_BEG_HOURS"));
			   vo.setF_DESC(rs.getString("F_DESC"));
			}
			if(null != vo) {
				rList.add(vo);
			} else {
				rList = null;
			}
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--getLoginCountList-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--getLoginCountList-2:"+e.getMessage());
		}finally{
			close(rs, ps, conn);
		}
		return rList;
	}
	
    /**
     * 是否存在登录失败日志
     * @param id
     * @return
     */
	public boolean isLoginLog(String id) {
		Connection conn = null;
		PreparedStatement ps = null ;
		ResultSet rs = null ;
		int result = 0;
		boolean isExist = false; //默认不存在
		String sql = "select count(*) as Num from OM_LOGIN_FAIL_LOG_T where F_LOGIN_ID='"+id+"'";
		try{
		    conn = getConnection();
		    ps = conn.prepareStatement(sql);
		    rs = ps.executeQuery();
		    while(rs.next()){
		    	result = rs.getInt("Num");
		    }   
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--isLoginLog-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--isLoginLog-2:"+e.getMessage());
		}finally{
			close(rs, ps, conn);
		}
		if(result > 0) {
			isExist = true;
		}
		return isExist;
	}
	
	/**
	 * 是否存在登录失败统计数
	 * @param id
	 * @return
	 */
	public boolean isLoginCount(String id) {
		Connection conn = null;
		PreparedStatement ps = null ;
		ResultSet rs = null ;
		int result = 0;
		boolean isExist = false; //默认不存在
		String sql = "select count(*) as Num from OM_LOGIN_FAIL_COUNT_T where F_LOGIN_ID='"+id+"'";
		try{
		    conn = getConnection();
		    ps = conn.prepareStatement(sql);
		    rs = ps.executeQuery();
		    while(rs.next()){
		    	result = rs.getInt("Num");
		    }   
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--isLoginCount-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--isLoginCount-2:"+e.getMessage());
		}finally{
			close(rs, ps, conn);
		}
		if(result > 0) {
			isExist = true;
		}
		return isExist;
	}
	
	/**
	 * 统计同一账户登录次数是否大于等于6次
	 * @param id
	 * @return
	 */
	public boolean countLogin(String id, int count) {
		Connection conn = null;
		PreparedStatement ps = null ;
		ResultSet rs = null ;
		int result = 0;
		boolean isOver = false; //默认次数未超过
		String sql = "select F_COUNT as Num from OM_LOGIN_FAIL_COUNT_T where F_LOGIN_ID='"+id+"'";
		try{
		    conn = getConnection();
		    ps = conn.prepareStatement(sql);
		    rs = ps.executeQuery();
		    while(rs.next()){
		    	result = rs.getInt("Num");
		    }   
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--isLoginCount-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--isLoginCount-2:"+e.getMessage());
		}finally{
			close(rs, ps, conn);
		}
	    if(result >= count) {
		    isOver = true;
		}	
		return isOver;
	}
	
	/**
	 * 统计同一账户登录次数是否大于15次
	 * @param id
	 * @return
	 */
	public boolean countTotalLogin(String id, int count) {
		Connection conn = null;
		PreparedStatement ps = null ;
		ResultSet rs = null ;
		int result = 0;
		boolean isOver = false; //默认次数未超过
		String sql = "select F_TOTAL_COUNT as Num from OM_LOGIN_FAIL_COUNT_T where F_LOGIN_ID='"+id+"'";
		try{
		    conn = getConnection();
		    ps = conn.prepareStatement(sql);
		    rs = ps.executeQuery();
		    while(rs.next()){
		    	result = rs.getInt("Num");
		    }   
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--isLoginCount-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--isLoginCount-2:"+e.getMessage());
		}finally{
			close(rs, ps, conn);
		}
	    if(result >= count) {
		    isOver = true;
		}	
		return isOver;
	}
		
	/**
	 * 解锁
	 * @param vo
	 * @return
	 */
	public void unLock(LoginFailCountVO vo) {
		Connection conn = null;
		PreparedStatement ps = null ;
		String sql = "update OM_LOGIN_FAIL_COUNT_T set F_COUNT='"+vo.getF_COUNT()+"', F_FLAG='"
		+vo.getF_FLAG()+"', F_BEG_MINUTES='"+vo.getF_BEG_MINUTES()+"' where F_LOGIN_ID='"+vo.getF_LOGIN_ID()+"'";
		try{
			conn = getConnection();
			ps = conn.prepareStatement(sql);
			ps.executeUpdate();
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--updateLoginCount-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--updateLoginCount-2:"+e.getMessage());
		}finally{
			close(ps, conn);
		}
	}
	
	/**
	 * 加锁
	 * @param vo
	 * @return
	 */
	public void lock(LoginFailCountVO vo) {
		Connection conn = null;
		PreparedStatement ps = null ;
		String sql = "update OM_LOGIN_FAIL_COUNT_T set F_FLAG='"+vo.getF_FLAG()
		+"', F_BEG_HOURS='"+vo.getF_BEG_HOURS()+"' where F_LOGIN_ID='"+vo.getF_LOGIN_ID()+"'";
		try{
			conn = getConnection();
			ps = conn.prepareStatement(sql);
			ps.executeUpdate();
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--updateLoginCount-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--updateLoginCount-2:"+e.getMessage());
		}finally{
			close(ps, conn);
		}
	}

	/**
	 * 验证账户是否存在
	 * @param id
	 * @return
	 */
	public boolean isExistUser(String id) {
		Connection conn = null;
		PreparedStatement ps = null ;
		ResultSet rs = null ;
		int result = 0;
		boolean isExist = false; //默认不存在当前登录账户
		String sql = "select count(*) as Num from OM_EMPLOYEE_T where F_WORK_NO='"+id+"'";
		try{
		    conn = getConnection();
		    ps = conn.prepareStatement(sql);
		    rs = ps.executeQuery();
		    while(rs.next()){
		    	result = rs.getInt("Num");
		    }   
		}catch(SQLException e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--isLoginCount-1:"+e.getMessage());
		}catch(Exception e){
			SysLog.writeLogs("AuthCheck",GlobalParameters.ERROR,"AuthCheck--isLoginCount-2:"+e.getMessage());
		}finally{
			close(rs, ps, conn);
		}
	    if(result > 0) {
	    	isExist = true;  
		}	
		return isExist;
	}
	

}
