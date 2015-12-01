/**
 * 
 */
package com.neusoft.tdframework.authorization;

import java.util.List;

import com.neusoft.tdframework.core.BaseBO;

/**
 * @projectName tdframework
 * @Description 
 * @author likj 2010-6-27 ����12:13:01
 * @email li.kj@neusoft.com
 * @copyright NeuSoft
 */
public interface AuthLoginCheckBO extends BaseBO {
	
	/**
	 * ɾ����¼ʧ����־
	 * @param id
	 * @return
	 */
	public boolean delLoginLog(String id);
	
	/**
	 * �Ե�¼ʧ����־��ɾ�����
	 * @param id
	 * @return
	 */
	public boolean updateLoginLog(String id);
	
	/**
	 * ɾ����¼ʧ��ͳ��
	 * @param id
	 * @return
	 */
	public boolean delLoginCount(String id);
	
	/**
	 * ��ӵ�¼ʧ����־
	 * @param vo
	 * @return
	 */
	public boolean addLoginLog(LoginFailLogVO vo);
	
	/**
	 * ��ӵ�¼ʧ�ܼ���
	 * @param vo
	 * @return
	 */
	public boolean addLoginCount(LoginFailCountVO vo);
	
	/**
	 * �޸ĵ�¼ʧ�ܼ���
	 * @param vo
	 * @return
	 */
	public int updateLoginCount(LoginFailCountVO vo);
	
	/**
	 * ��ѯ��¼ʧ����־
	 * @param id
	 * @return
	 */
	public List<LoginFailLogVO> getLoginLogList(String id);
	
	/**
	 * ��ѯ��¼ʧ�ܼ���
	 * @param id
	 * @return
	 */
	public List<LoginFailCountVO> getLoginCountList(String id);
	
	/**
     * �Ƿ���ڵ�¼ʧ����־
     * @param id
     * @return
     */
	public boolean isLoginLog(String id);
	
	/**
	 * �Ƿ���ڵ�¼ʧ��ͳ����
	 * @param id
	 * @return
	 */
	public boolean isLoginCount(String id);
	
	
	/**
	 * ͳ��ͬһ�˻���¼�����Ƿ���ڵ���6��
	 * @param id
	 * @param count
	 * @return
	 */
	public boolean countLogin(String id, int count);
	
	/**
	 * ͳ��ͬһ�˻���¼�����Ƿ����15��
	 * @param id
	 * @param count
	 * @return
	 */
	public boolean countTotalLogin(String id, int count);
	
	/**
	 * ����
	 * @param vo
	 * @return
	 */
	public void unLock(LoginFailCountVO vo);
	
	/**
	 * ����
	 * @param vo
	 * @return
	 */
	public void lock(LoginFailCountVO vo);
	
	/**
	 * ��֤�˻��Ƿ���
	 * @param id
	 * @return
	 */
	public boolean isLock(String id);
	
	/**
	 * ��֤�˻��Ƿ����
	 * @param id
	 * @return
	 */
	public boolean isExistUser(String id);
	

}
