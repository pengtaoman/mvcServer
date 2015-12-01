package com.neusoft.om.dao.omswitch;
import java.util.Map;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface OmSwitchDAO extends BaseDao{
	public static final String BEAN = "omSwitchDAO";
	/**
	 * �ӿ��ؿ��Ʊ��л������ʧЧǰN��������Ϣ
	 * ���ر��еĲ�����: F_MESSAGE_PERIOD
	 * @return OmSwitchVO
	 * @throws DataAccessException
	 */
	public OmSwitchVO getOmSwitchMessagePeriod() throws DataAccessException;
	/**
	 * �ӿ��ؿ��Ʊ��л��������趨��ʼ,N���ʧЧ����Ϣ
	 * @return
	 * @throws DataAccessException
	 */
	public OmSwitchVO getOmSwitchPwdEffect() throws DataAccessException;
	/**
	 * �ӿ��ؿ��Ʊ��еõ�����Ա��½�˺��Ƿ����ִ�Сд��Ϣ
	 * @return
	 * @throws DataAccessException
	 */
	public OmSwitchVO getOmSwitchDifferentiate() throws DataAccessException;
	/**
	 * �ӿ��ز����л�õ�½�˺��Ƿ����ִ�Сд
	 * ture:���֣�false:������
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfMatchCase() throws DataAccessException;
	/**
	 * �ӿ��ر��л��ɾ����֯������ְԱʱ�Ƿ���Ҫ��Ʒ������У��
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfNeedProductCheck() throws DataAccessException;
	/**
	 * �ӿ��ر��л�õ�¼ʱ�Ƿ���Ҫ����Ӧ��
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfCheckapp() throws DataAccessException;
	
	/**
	 * �õ�Ȩ�ް汾
	 * @return
	 * @throws DataAccessException
	 */
	public String getPopedomVersion() throws DataAccessException;
	
	/**
	 * �ӿ��ر��л�� ��־��ѯʱ�Ƿ���Ҫ��ʾҵ��ϵͳ�˵�������
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfShowBusiLog() throws DataAccessException;
	
	/**
	 * �ӿ��ر��л��Ȩ����ϵͳ��ϵͳ���롣om_switch_t��f_show_busi_log����Ϊ0ʱ��������Ҫ��ʾҵ��ϵͳ�˵�ʱ��Ҫ���ô�����
	 * @return
	 * @throws DataAccessException
	 */
	public String getOmSystemId() throws DataAccessException;
	
	/**
	 * �ӿ��ر��л�õ�¼ʱ�Ƿ���Ҫ������Ϣ������
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfNeedDealer() throws DataAccessException;
	
	/**
	 * �ӿ��ر��л���Ƿ���Ҫ��ͷ�ϵͳͬ�����ݵ�����
	 * @return
	 * @throws DataAccessException
	 */	
	public boolean getIfSynchronize() throws DataAccessException;
	
	/**
	 * �ӿ��ر��л���Ƿ�ͨ��ͳһ��֤ƽ̨����ְԱ��Ϣ
	 * @return
	 * @throws DataAccessException
	 */	
	public boolean getUniauth() throws DataAccessException;
	
	/**
	 * �ӿ��ر��л����ɾ��ְԱʱ�Ƿ���ù���ȡ������������
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfCancel() throws DataAccessException;
	
	/**
	 * �ӿ��ر��л���������򼶱���Ϣ��Ĭ��Ϊ6
	 * @return
	 * @throws DataAccessException
	 */
	public int getMaxAreaLevel() throws DataAccessException;
	
	/**
	 * �õ���Ӫ������ͨ�����ǵ���,Ĭ���ǵ���
	 * @return
	 */
	public String getUser() throws DataAccessException;
	
	/**
	 * �õ���֯������ά�ȣ�organ��ʾ��֯���������������ƣ�area��ʾ��֯�����յ�areaԼ��
	 * Ĭ��Ϊarea
	 * @return
	 */
	public String getOrganDim() throws DataAccessException;
	
	/**
	 * �ӿ��ر��еõ��Ƿ��¼Ȩ�޵�����־�Ĳ��� 1����¼ 0������¼��Ĭ�ϲ���¼
	 * @return
	 * @throws DataAccessException
	 */
	public int getPowerLog() throws DataAccessException;
	
	/**
	 * �ӿ��ر��еõ�"�Ƿ񾭹�ͳһ��֤"�����ã�1������true ��������:false
	 * �˲���ֻΪ�ӱ���ͨʹ�á�������½��еĸ��졣����ϵͳ���ɲ����û�����Ϊ����ֵ��
	 * Ĭ��Ϊfalse
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfUlp() throws DataAccessException;
	
	/**
	 * ����Ƿ���Ҫ���ŷ��鹦��
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getGroup() throws DataAccessException;
	
	/**
	 * �Ƿ�ʹ�ô洢���̼�¼��־  
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getLogProc() throws DataAccessException;
	/**
	 * �Ƿ��Զ����ɹ��� Ĭ�ϲ��Զ�
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfAutoWorkNo() throws DataAccessException;
	
	/**
	 * �Զ����ɵĹ������Ƿ����������д
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfNeedCityShortName() throws DataAccessException;
	
	/**
	 * �Զ����ɵĹ������Ƿ����ְԱ����
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfNeedEmpName() throws DataAccessException;
	
	public Map getSwitchMap() throws DataAccessException;
	
	/**
	 * �Ƿ������������Ϣ��Ĭ�ϰ���
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfHaveParty() throws DataAccessException;
	
}
