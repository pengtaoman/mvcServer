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
	//���Է���
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
		if(paraValue.intern() == "0".intern()){//ֻ�е�����ű�ʾ����Ҫ������ֵ���߲����þ���ʾ��Ҫ
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
	 * �ӿ��ر��л���Ƿ���Ҫ��ͷ�ϵͳͬ�����ݵ�����
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
	 * �ӿ��ر��л���Ƿ�ͨ��ͳһ��֤ƽ̨����ְԱ��Ϣ
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
		if(paraValue != null && paraValue.trim().equals("1")){//Ĭ�ϲ���Ҫ
			need = true;
		}
		return need;
	}
	/**
	 * �ӿ��ر��л����ɾ��ְԱʱ�Ƿ���ù���ȡ������������
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
		if(paraValue != null && paraValue.trim().equals("1")){//Ĭ�ϲ���Ҫ
			cancel = true;
		}
		return cancel;
	}
	/**
	 * �ӿ��ر��л���������򼶱���Ϣ��Ĭ��Ϊ6
	 * @return
	 * @throws DataAccessException
	 */
	public int getMaxAreaLevel() throws DataAccessException{
		int maxLevel = 6;//Ĭ��Ϊ6
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
	 * �õ���Ӫ������ͨ�����ǵ���
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
	 * �õ���֯������ά�ȣ�organ��ʾ��֯���������������ƣ�area��ʾ��֯�����յ�areaԼ��
	 * Ĭ��Ϊarea
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
	 * �ӿ��ر��еõ��Ƿ��¼Ȩ�޵�����־�Ĳ��� 1����¼ 0������¼��Ĭ�ϲ���¼
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
	 * �ӿ��ر��еõ�"�Ƿ񾭹�ͳһ��֤"�����ã�1������true ��������:false
	 * �˲���ֻΪ�ӱ���ͨʹ�á�����ϵͳ���ɲ����û�����Ϊ����ֵ��
	 * Ĭ��Ϊfalse
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
	 * ����Ƿ���Ҫ���ŷ��鹦��
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
	 * �Ƿ�ʹ�ô洢���̼�¼��־  
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
	 * �Ƿ��Զ����ɹ��� Ĭ�ϲ��Զ�
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
	 * �Զ����ɵĹ������Ƿ����������д
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
	 * �Զ����ɵĹ������Ƿ����ְԱ����
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
	 * �Ƿ������������Ϣ,Ĭ�ϰ���
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
