/**
 * 
 */
package com.neusoft.om.bo;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/***************************************************************
 * ������ : DataFilterBO.java.java
 * ����  : 2007-7-17
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
/**
 * @author wbsuncg
 *
 */
public interface CheckPersonBO extends BaseBO{

    
     /**
     * ����������ѯOM_EMPLOYEE_CHECK_T�����������
     * @param 
     * @return
     */
    public int getRowCount(String fWorkNo,String checkFlag)throws ServiceException;
    
    
    /**
     * ����������ѯOM_EMPLOYEE_CHECK_T�����
     * @param 
     * @return
     */
    public List getColl(String fWorkNo,String checkFlag,int beginNum,int endNum)throws ServiceException;
    /**
     * ��˷���
     * @param 
     * @return
     */
    public String check(String fWorkNO,HttpServletRequest request)throws ServiceException;
    /**
     * ��˻��˷���
     * @param 
     * @return
     */
    public String undoCheck(String fWorkNO)throws ServiceException;
    
   
    
}


