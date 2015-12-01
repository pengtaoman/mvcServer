/**
 * �ļ�˵����Ϣ
 */
package com.neusoft.om.bo;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import com.neusoft.om.dao.loginuserlist.LoginUserListVO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.ServiceException;

/**<p>Module: </p>
 * <p>Description: </p>
 * <p>Remark: </p>
 * <p>Date: 2010-06-12</p>
 *
 * @author liushen
 * @version
 * 
 * <p> �޸���ʷ</p>
 * <p> ��� ���� �޸��� �޸�ԭ��</p>
 * 
 */
public interface LoginUserListBO {

    /**
     * ��ѯ�����б���
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param cityCode
     * @param cityLevel
     * @return
     * @throws ServiceException
     */
    public ParamObjectCollection getAreaCollection(String cityCode, int cityLevel) throws ServiceException;
	
    /**
     * ��ȡ��¼ϵͳ��Ա��־��ѯ�������
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @return
     * @throws ServiceException
     */
    public int getLoginUserListCount(LoginUserListVO loginUserListVO)
            throws ServiceException;

    /**
     * ��ȡ��¼ϵͳ��Ա��־��ѯ����б�
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @param start
     * @param end
     * @return
     * @throws ServiceException
     */
    public List getLoginUserList(LoginUserListVO loginUserListVO, int start, int end)
            throws ServiceException;
    
    /**
     * ����ID������ѯ��¼��Ա����ϸ��Ϣ
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param vo
     * @return
     */
    public LoginUserListVO getDetailById(LoginUserListVO loginUserListVO) throws ServiceException;
    /**
     * ������¼ϵͳ��Ա��Ϣ
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @param start
     * @param end
     * @return
     * @throws ServiceException
     */
    public void exportAllLoginUserColl(Map map, OutputStream outputStream) throws ServiceException;
}
