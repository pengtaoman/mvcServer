package com.neusoft.om.bo;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.om.dao.checkPerson.CheckPersonDAO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

/***************************************************************
 * ������ : DataFilter.java.java
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
public class CheckPersonBOImpl implements CheckPersonBO{

    private CheckPersonDAO checkPersonDao;
    /**
     * @return Returns the checkPersonDao.
     */
    public CheckPersonDAO getCheckPersonDao() {
        return checkPersonDao;
    }

    /**
     * @param checkPersonDao The checkPersonDao to set.
     */
    public void setCheckPersonDao(CheckPersonDAO checkPersonDao) {
        this.checkPersonDao = checkPersonDao;
    }
    public int getRowCount(String fWorkNo, String checkFlag) throws ServiceException {
        int allRows = 0;
        try{
            allRows = checkPersonDao.getRowCount(fWorkNo,checkFlag);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"CheckPersonBOIMPL--getRowCount()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return allRows;
    }
   
    public List getColl(String fWorkNo, String  checkFlag,int beginNum,int endNum) throws ServiceException {
        List list = new ArrayList();
        
        try{
            list = checkPersonDao.getColl(fWorkNo,checkFlag,beginNum,endNum);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"CheckPersonBOIMPL--getColl()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        
        return list;
    }

  //��˷���
    public String check(String fWorkNO,HttpServletRequest request)throws ServiceException {
        String message="";
        try{
            message = checkPersonDao.check(fWorkNO,request);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"CheckPersonBOIMPL--check()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return message;
    }
    //��˻��˷���
    public String undoCheck(String fWorkNO)throws ServiceException {
        String message="";
        try{
            message = checkPersonDao.undoCheck(fWorkNO);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"CheckPersonBOIMPL--check()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return message;
    }
    
}
