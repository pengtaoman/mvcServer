package com.neusoft.om.dao.checkPerson;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/***************************************************************
 * ������ : DataFilterDAO.java.java
 * ����  : 2007-6-1
 * ����  : sunchonggui@neusoft.com
 * ģ��  : 
 * ����  : 
 * ��ע  : 
 * ------------------------------------------------------------
 * �޸���ʷ
 * ���  ����  �޸���   �޸�ԭ��
 * 1
 * 2
 ***************************************************************/
public interface CheckPersonDAO extends BaseDao{
        
    /**
     * ����������ѯBb_Account_Info_T�����������
     * @param 
     * @return
     */
    public int getRowCount(String fWorkNo,String checkFlag) throws DataAccessException;
   
    /**
     * ����������ѯOM_DATA_FILTER_T�����
     * @param 
     * @return
     */
    public List getColl(String fWorkNo,String checkFlag,int beginNum,int endNum) throws DataAccessException;
    /**
     * ��˷���
     * @param 
     * @return
     */
    public String check(String fWorkNO,HttpServletRequest request)throws DataAccessException;
    /**
     * ��˻��˷���
     * @param 
     * @return
     */
    public String undoCheck(String fWorkNO)throws DataAccessException;
}
