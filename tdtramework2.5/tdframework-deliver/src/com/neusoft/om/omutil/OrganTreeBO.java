package com.neusoft.om.omutil;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;

/**brief description
 * <p>Date       : 2006-12-01</p>
 * <p>Module     : om</p>
 * <p>Description: �ṩ�����֯�������Ľӿ�</p>
 * <p>Remark     : </p>
 * @author zhaof@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface OrganTreeBO extends BaseBO{
	/**
	 * �õ���֯������
	 * @param minLevel
	 * @param MaxLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganTree(int minLevel, int MaxLevel) throws ServiceException;
	
	/**
	 * �õ�������
	 * @param minLevel
	 * @param maxLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getAreaTree(int minLevel, int maxLevel) throws ServiceException;
	
    /**
     * �õ�����-��֯������
     * @param minAreaLevel
     * @param maxAreaLevel
     * @return
     * @throws ServiceException
     */
	public ITree getAreaOrganTree(int minAreaLevel, int maxAreaLevel) throws ServiceException;

	/**
	 * �õ�һ������-��֯����-��Ա���������򼶱�ȷ�����ݷ�Χ
	 * @param minAreaLevel
	 * @param maxAreaLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getAreaOrganEmpTree(int minAreaLevel, int maxAreaLevel) throws ServiceException;
	
	/**
	 * �õ���֯����-ְԱ���������򼶱�ȷ�����ݷ�Χ
	 * @param minAreaLevel
	 * @param maxAreaLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganEmpTree(int minAreaLevel, int maxAreaLevel) throws ServiceException;
	
	/**
	 * ���ݵ�ǰ��¼�Ĳ���Ա���õ���֯������ְԱ���ϵ���
	 * ��½�û���ʡ���û�����ʾʡ�ֵ������û��������½���û��ǵ����û�����ʾ��ǰ���������û���ʡ�ֵ������û���
	 * ������ص��û���¼�ˣ���ʾ��ǰ ���ص������û����������ڵ��������û���ʡ�ֵ������û�
	 * @param authAreaId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganEmpTree(String authAreaId) throws ServiceException;
	
	/**
	 * �õ���ǰ��¼��Ա������֯�����͸���֯����������Ա��Ϣ����
	 * @param authId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getCurrentOrganEmpTree(String authId) throws ServiceException;
	
	
	public ITree getChildOrganEmpTree(String organIds) throws ServiceException;
	
	/**
	 * �õ���֯����-ְԱ���������򼶱�ȷ�����ݷ�Χ��רΪPPMϵͳʹ��
	 * @param minAreaLevel
	 * @param maxAreaLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganEmpTree4PPM(int minAreaLevel, int maxAreaLevel) throws ServiceException;
	
	/**
	 * ���ݵ�ǰ��¼�Ĳ���Ա���õ���֯������ְԱ���ϵ�����רΪPPMϵͳʹ��
	 * ��½�û���ʡ���û�����ʾʡ�ֵ������û��������½���û��ǵ����û�����ʾ��ǰ���������û���ʡ�ֵ������û���
	 * ������ص��û���¼�ˣ���ʾ��ǰ ���ص������û����������ڵ��������û���ʡ�ֵ������û�
	 * @param authAreaId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganEmpTree4PPM(String authAreaId) throws ServiceException;
	
	/**
	 * �õ���ǰ��¼��Ա������֯�����͸���֯����������Ա��Ϣ������רΪPPMϵͳʹ��
	 * @param authId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getCurrentOrganEmpTree4PPM(String authId) throws ServiceException;
	
	/**
	 * organIds ��,�ָ���������Ҫ��ʾ�Ĳ��ű��룬רΪPPMϵͳʹ��
	 * @param organIds
	 * @return
	 * @throws ServiceException
	 */
	public ITree getChildOrganEmpTree4PPM(String organIds) throws ServiceException;
	
	/**
	 * ���ݵ��к�organ_kin��ѯ��֯����
	 * @param organKind
	 * @param areaId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganCollByKind4PPM(String organKind,String areaId) throws ServiceException;
}
