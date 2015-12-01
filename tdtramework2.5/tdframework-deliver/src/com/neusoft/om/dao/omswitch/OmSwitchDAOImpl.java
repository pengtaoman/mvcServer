package com.neusoft.om.dao.omswitch;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import com.neusoft.om.OMAppContext;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class OmSwitchDAOImpl extends BaseDaoImpl implements OmSwitchDAO {
	public OmSwitchVO getOmSwitchMessagePeriod() throws DataAccessException{
		OmSwitchVO vo = null;
		String sql = "SELECT * FROM om_switch_t " +
			" WHERE upper(f_para_name) = 'F_MESSAGE_PERIOD' " +
			" AND f_para_control = 1";
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				vo = new OmSwitchVO();
				vo.setAttribute(rest);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOmSwitchMessagePeriod-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOmSwitchMessagePeriod-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return vo;
	}
	public OmSwitchVO getOmSwitchPwdEffect() throws DataAccessException{
		OmSwitchVO vo = null;
		String sql = "SELECT * FROM om_switch_t " +
			" WHERE upper(f_para_name) = 'F_PWD_EFFECT' " +
			" AND f_para_control = 1";
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				vo = new OmSwitchVO();
				vo.setAttribute(rest);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOmSwitchPwdEffect-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOmSwitchPwdEffect-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return vo;
	}
	
	public OmSwitchVO getOmSwitchDifferentiate() throws DataAccessException {
		OmSwitchVO vo = null;
		String sql = "SELECT * FROM om_switch_t " +
			" WHERE upper(f_para_name) = 'F_DIFFERENTIATE' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				vo = new OmSwitchVO();
				vo.setAttribute(rest);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOmSwitchDifferentiate-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOmSwitchDifferentiate-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return vo;
	}
	public boolean getIfMatchCase() throws DataAccessException{
		boolean matchCase = true;
		String paraValue = "";
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t " +
			" WHERE upper(f_para_name) = 'F_DIFFERENTIATE' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				paraValue = rest.getString("F_PARA_VALUE");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfMatchCase-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfMatchCase-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		if(paraValue.intern() != "1".intern()){
			matchCase = false;
		}
		return matchCase;
	
	}
	public boolean getIfNeedProductCheck() throws DataAccessException{
		boolean matchCase = true;
		String paraValue = "";
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t " +
			" WHERE upper(f_para_name) = 'F_PRODUCTCHECK' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				paraValue = rest.getString("F_PARA_VALUE");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfNeedProductCheck-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfNeedProductCheck-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		if(paraValue.intern() != "1".intern()){
			matchCase = false;
		}
		return matchCase;
	
	}
	
	public boolean getIfCheckapp() throws DataAccessException{
		boolean matchCase = true;
		String paraValue = "";
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t " +
			" WHERE upper(f_para_name) = 'F_CHECKAPP' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				paraValue = rest.getString("F_PARA_VALUE");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfCheckapp-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfCheckapp-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		if(paraValue.intern() != "1".intern()){
			matchCase = false;
		}
		return matchCase;
	}
	public String getPopedomVersion() throws DataAccessException{
		String paraValue = "";
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t " +
			" WHERE UPPER(f_para_name) = 'POPEDOM_VERSION' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				paraValue = rest.getString("F_PARA_VALUE");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getPopedomVerson-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getPopedomVerson-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return paraValue;
	}
	//测试方法
	public static void main(String args[]){
		OmSwitchDAO dao = (OmSwitchDAO)OMAppContext.getBean(OmSwitchDAO.BEAN);
		try {
			OmSwitchVO vo = dao.getOmSwitchMessagePeriod();
			System.out.println(vo.getParaValue());
			System.out.println(dao.getOmSwitchPwdEffect().getParaValue());
			System.out.println(dao.getOmSwitchDifferentiate().getParaValue());
			System.out.println(dao.getIfMatchCase());
		} catch (DataAccessException e) {
			e.printStackTrace();
		}
	}
	public boolean getIfNeedDealer() throws DataAccessException {
		boolean needDealer = true;
		String paraValue = "";
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t " +
			" WHERE UPPER(f_para_name) = 'F_NEED_DEALER' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				paraValue = rest.getString("F_PARA_VALUE");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfNeedDealer-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfNeedDealer-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		if(paraValue.intern() == "0".intern()){//只有等于零才表示不需要，其他值或者不配置均表示需要
			needDealer = false;
		}
		return needDealer;
	}
	
	
	public boolean getIfShowBusiLog() throws DataAccessException {
		boolean showBusiLog = true;
		String paraValue = "";
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t " +
			" WHERE UPPER(f_para_name) = 'F_SHOW_BUSI_LOG' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				paraValue = rest.getString("F_PARA_VALUE");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfShowBusiLog-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfShowBusiLog-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		if(paraValue.intern() == "0".intern()){
			showBusiLog = false;
		}
		return showBusiLog;
	}
	public String getOmSystemId() throws DataAccessException {
		String paraValue = "";
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t " +
			" WHERE UPPER(f_para_name) = 'F_OM_SYSTEM_ID' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				paraValue = rest.getString("F_PARA_VALUE");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOmSystemId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOmSystemId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return paraValue;
	}
	/**
	 * 从开关表中获得是否需要与客服系统同步数据的配置
	 * @return
	 * @throws DataAccessException
	 */	
	public boolean getIfSynchronize() throws DataAccessException{
		String paraValue = "";
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t " +
			" WHERE UPPER(f_para_name) = 'F_SYNCHRONIZE' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				paraValue = rest.getString("F_PARA_VALUE");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOmSystemId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOmSystemId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		boolean need = false;
		if(paraValue != null && paraValue.trim().equals("1")){
			need = true;
		}
		return need;
	}
	
	/**
	 * 从开关表中获得是否通过统一认证平台管理职员信息
	 * @return
	 * @throws DataAccessException
	 */	
	public boolean getUniauth() throws DataAccessException{
		String paraValue = "";
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t " +
			" WHERE UPPER(f_para_name) = 'F_UNIAUTH' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				paraValue = rest.getString("F_PARA_VALUE");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOmSystemId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOmSystemId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		boolean need = false;
		if(paraValue != null && paraValue.trim().equals("1")){//默认不需要
			need = true;
		}
		return need;
	}
	/**
	 * 从开关表中获得在删除职员时是否调用过程取消其分配的任务
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfCancel() throws DataAccessException{
		boolean cancel = false;
		String paraValue = "";
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t " +
			" WHERE UPPER(f_para_name) = 'F_IF_CANCEL' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				paraValue = rest.getString("F_PARA_VALUE");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--gerIfCancel-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--gerIfCancel-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		if(paraValue != null && paraValue.trim().equals("1")){//默认不需要
			cancel = true;
		}
		return cancel;
	}
	/**
	 * 从开关表中获得最大的区域级别信息，默认为6
	 * @return
	 * @throws DataAccessException
	 */
	public int getMaxAreaLevel() throws DataAccessException{
		int maxLevel = 6;//默认为6
		String paraValue = "";
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t " +
			" WHERE UPPER(f_para_name) = 'MAX_AREA_LEVEL' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				paraValue = rest.getString("F_PARA_VALUE");
			}
			if(paraValue != null && !paraValue.trim().equals("")){
				maxLevel = Integer.parseInt(paraValue);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--gerIfCancel-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--gerIfCancel-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return maxLevel;
	}
	
	/**
	 * 得到运营商是联通，还是电信
	 * @return
	 */
	public String getUser() throws DataAccessException{
		String user = "DIANXIN";
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t " +
			" WHERE UPPER(f_para_name) = 'F_USER' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				user = rest.getString("F_PARA_VALUE");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getUser-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getUser-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return user;
	}
	/**
	 * 得到组织机构的维度，organ表示组织机构不受区域限制，area表示组织机构收到area约束
	 * 默认为area
	 * @return
	 */
	public String getOrganDim() throws DataAccessException{
		String dim = "area";
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t " +
			" WHERE UPPER(f_para_name) = 'F_ORGAN_DIM' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				dim = rest.getString("F_PARA_VALUE");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOrganDim-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getOrganDim-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return dim;
	}
	
	/**
	 * 从开关表中得到是否记录权限调整日志的参数 1：记录 0：不记录。默认不记录
	 * @return
	 * @throws DataAccessException
	 */
	public int getPowerLog() throws DataAccessException{
		int powerLog = 0;
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t WHERE UPPER(f_para_name) = 'F_POWER_LOG' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				powerLog = rest.getInt("F_PARA_VALUE");
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getPowerLog-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getPowerLog-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return powerLog;
	}
	
	/**
	 * 从开关表中得到"是否经过统一认证"的配置，1：返回true 其他返回:false
	 * 此参数只为河北联通使用。其余系统均可不配置或配置为其他值。
	 * 默认为false
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfUlp() throws DataAccessException{
		boolean ulp = false;
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t WHERE UPPER(f_para_name) = 'F_ULP' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				String sUlp = rest.getString("F_PARA_VALUE");
				if(sUlp != null && sUlp.equals("1")){
					ulp = true;
				}
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfUlp-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfUlp-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return ulp;
	}
	
	/**
	 * 获得是否需要工号分组功能
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getGroup() throws DataAccessException{
		boolean group = false;
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t WHERE UPPER(f_para_name) = 'F_GROUP' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				String sUlp = rest.getString("F_PARA_VALUE");
				if(sUlp != null && sUlp.equals("1")){
					group = true;
				}
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getGroup-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getGroup-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return group;
	}
	
	/**
	 * 是否使用存储过程记录日志  
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getLogProc() throws DataAccessException{
		boolean proc = true;
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t WHERE UPPER(f_para_name) = 'F_LOG_PROC' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				String sUlp = rest.getString("F_PARA_VALUE");
				if(sUlp != null && sUlp.equals("0")){
					proc = false;
				}
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getGroup-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getGroup-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return proc;
	}
	/**
	 * 是否自动生成工号 默认不自动
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfAutoWorkNo() throws DataAccessException{
		boolean auto = false;
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t WHERE UPPER(f_para_name) = 'F_AUTO_WORKNO' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				String autoWorkNo = rest.getString("F_PARA_VALUE");
				if(autoWorkNo != null && autoWorkNo.equals("1")){
					auto = true;
				}
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfAutoWorkNo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfAutoWorkNo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return auto;
	}
	
	/**
	 * 自动生成的工号中是否包含地市缩写
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfNeedCityShortName() throws DataAccessException{
		boolean need = false;
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t WHERE UPPER(f_para_name) = 'F_WORKNO_CITYSN' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				String autoWorkNo = rest.getString("F_PARA_VALUE");
				if(autoWorkNo != null && autoWorkNo.equals("1")){
					need = true;
				}
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfNeedCityShortName-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfNeedCityShortName-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return need;
	}
	
	/**
	 * 自动生成的工号中是否包含职员姓名
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfNeedEmpName() throws DataAccessException{
		boolean need = false;
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t WHERE UPPER(f_para_name) = 'F_WORKNO_NAME' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				String autoWorkNo = rest.getString("F_PARA_VALUE");
				if(autoWorkNo != null && autoWorkNo.equals("1")){
					need = true;
				}
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfAutoWorkNo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfAutoWorkNo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return need;
	}
	
	public Map getSwitchMap() throws DataAccessException{
		Map map = new HashMap();
		String sql = "select * from om_switch_t ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();			
			while (rest.next()) {
				OmSwitchVO vo = new OmSwitchVO();
				vo.setAttribute(rest);
				String id = rest.getString("f_para_name");
				String value = rest.getString("f_para_value");
				vo.setParaName(id.toUpperCase());
				map.put(id.toUpperCase(), value);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmSwitchDAOImpl--getSwitchMap()-1:"+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmSwitchDAOImpl--getSwitchMap()-2:"+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return map;
	}
	/**
	 * 是否包含参与人信息,默认包括
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfHaveParty() throws DataAccessException{
		boolean need = true;
		String sql = "SELECT F_PARA_VALUE FROM om_switch_t WHERE UPPER(f_para_name) = 'F_HAVE_PARTY' " ;
		Connection conn = null;
		PreparedStatement	pstmt = null;
		ResultSet			rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				String haveParty = rest.getString("F_PARA_VALUE");
				if(haveParty != null && haveParty.equals("0")){
					need = false;
				}
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfHaveParty-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmSwitchDAOImpl--getIfHaveParty-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return need;
	}
}
