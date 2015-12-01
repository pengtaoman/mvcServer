/**
 * �ļ�˵����Ϣ
 */
package com.neusoft.om.dao.loginuserlist;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.DataAccessException;

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
public interface LoginUserListDAO {

    /**
     * ��ѯ�����б���
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param cityCode
     * @param cityLevel
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaCollection(String cityCode, int cityLevel) throws DataAccessException;
	
    /**
     * ��ȡ��¼ϵͳ��Ա��־��ѯ�������
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @return
     * @throws DataAccessException
     */
    public int getLoginUserListCount(LoginUserListVO loginUserListVO)
            throws DataAccessException;

    /**
     * ��ȡ��¼ϵͳ��Ա��־��ѯ����б�
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @return
     * @throws DataAccessException
     */
    public List getLoginUserList(LoginUserListVO loginUserListVO, int start, int end)
            throws DataAccessException;
    
    /**
     * ����ID������ѯ��¼��Ա����ϸ��Ϣ
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param vo
     * @return
     */
    public LoginUserListVO getDetailById(LoginUserListVO vo) throws DataAccessException;
    
    /**
     * ������¼��Ա����ϸ��Ϣ
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param vo
     * @return
     */
    public void exportAllLoginUserColl(Map map, OutputStream outputStream) throws DataAccessException;
}
