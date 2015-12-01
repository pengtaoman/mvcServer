/**
 * �ļ�˵����Ϣ
 */
package com.neusoft.om.bo;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.loginuserlist.LoginUserListDAO;
import com.neusoft.om.dao.loginuserlist.LoginUserListVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

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
public class LoginUserListBOImpl implements LoginUserListBO {
    private LoginUserListDAO loginUserListDao;
    private EmployeeDAO employeeDAO;

    /**<p>Description:  </p>
     * @param loginUserListDao 
     */
    public void setLoginUserListDao(LoginUserListDAO loginUserListDao) {
        this.loginUserListDao = loginUserListDao;
    }
    
    public void setEmployeeDAO(EmployeeDAO employeeDAO) {
		this.employeeDAO = employeeDAO;
	}

	/**
     * ��ѯ�����б���
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param cityCode
     * @param cityLevel
     * @return
     * @throws ServiceException
     */
    public ParamObjectCollection getAreaCollection(String cityCode, int cityLevel) throws ServiceException {
        ParamObjectCollection areaCollection = null;//�������򼯺�
        try {
            areaCollection = loginUserListDao.getAreaCollection(cityCode, cityLevel);
        }
        catch (DataAccessException e) {
            SysLog.writeLogs("loginUserList", GlobalParameters.ERROR,
                            "LoginUserListBOImpl--getAreaCollection-1:"
                                    + e.getMessage());
            throw new ServiceException(e);
        }
        return areaCollection;
    }
    
    /**
     * ��ȡ��¼ϵͳ��Ա��־��ѯ�������
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @return
     * @throws ServiceException
     */
    public int getLoginUserListCount(LoginUserListVO loginUserListVO)
            throws ServiceException {
        int totalCount = 0;
        try {
            totalCount = loginUserListDao.getLoginUserListCount(loginUserListVO);
        }
        catch (DataAccessException e) {
            SysLog.writeLogs("loginUserList", GlobalParameters.ERROR,
                    "LoginUserListBoImpl--getLoginUserListCount-1:"
                            + e.getMessage());
            throw new ServiceException(e);
        }
        return totalCount;
    }

    /**
     * ��ȡ��¼ϵͳ��Ա��־��ѯ����б�
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @return
     * @throws ServiceException
     */
    public List getLoginUserList(LoginUserListVO loginUserListVO, int start, int end)
            throws ServiceException {
        List loginUserList = null;
        try {
        	loginUserList = loginUserListDao.getLoginUserList(loginUserListVO,
                    start, end);
        	for(int i=0;i<loginUserList.size(); i++){
        		LoginUserListVO vo = (LoginUserListVO)loginUserList.get(i);
        		String workNO = vo.getPersonId();
        		String empName = employeeDAO.getEmployeeInfoByWorkNo(workNO).getEmployeeName();
        		vo.setEmpName(empName);
        	}
        }
        catch (DataAccessException e) {
            SysLog.writeLogs("loginUserList", GlobalParameters.ERROR,
                    "LoginUserListBoImpl--getLoginUserList-1:" + e.getMessage());
            throw new ServiceException(e);
        }
        return loginUserList;
    }
    
    /**
     * ����ID������ѯ��¼��Ա����ϸ��Ϣ
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param vo
     * @return
     */
    public LoginUserListVO getDetailById(LoginUserListVO vo)
            throws ServiceException {
    	LoginUserListVO loginUserListVO = null;
        try {
        	loginUserListVO = loginUserListDao.getDetailById(vo);
        }
        catch (DataAccessException e) {
            SysLog.writeLogs("loginUserList", GlobalParameters.ERROR,
                    "LoginUserListBOImpl--getDetailById-1:"
                            + e.getMessage());
            throw new ServiceException(e);
        }
        return loginUserListVO;
    }

    /**
     * ������¼��Ա����ϸ��Ϣ
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param vo
     * @return
     */
    public void exportAllLoginUserColl(Map map, OutputStream outputStream){
    	loginUserListDao.exportAllLoginUserColl(map, outputStream);
    }
}
