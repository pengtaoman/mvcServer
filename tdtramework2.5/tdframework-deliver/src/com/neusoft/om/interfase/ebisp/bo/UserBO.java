package com.neusoft.om.interfase.ebisp.bo;

import java.util.List;

import com.neusoft.om.interfase.ebisp.data.FrameColl;
import com.neusoft.om.interfase.ebisp.data.FrameRelViewColl;
import com.neusoft.om.interfase.ebisp.data.FrameVO;
import com.neusoft.om.interfase.ebisp.data.StyleVO;
import com.neusoft.om.interfase.ebisp.data.ViewColl;
import com.neusoft.om.interfase.ebisp.data.ViewVO;
import com.neusoft.om.interfase.ebisp.data.WindowColl;
import com.neusoft.om.interfase.ebisp.data.WindowRelFrameColl;
import com.neusoft.om.interfase.ebisp.data.WindowVO;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2006-9-26</p>
 * <p>Module     : om</p>
 * <p>Description: UserBO interface</p>
 * <p>Remark     : �ṩ����Ӫ����ϵͳ��Ȩ�޽ӿ�</p>
 * @author zhaof
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface UserBO extends BaseBO {
	/**
	 * ͨ�����ڱ�ŵõ�������ϸ��Ϣ
	 * @param windowId
	 * @return
	 * @throws ServiceException
	 */
	public WindowVO getWindowVOById(String windowId) throws ServiceException;
	/**
	 * ���ݿ�ܱ�ŵõ������ϸ��Ϣ
	 * @param frameId
	 * @return
	 * @throws ServiceException
	 */
	public FrameVO getFrameVOById(String frameId) throws ServiceException;
	/**
	 * ������ͼ��ŵõ���ͼ����ϸ��Ϣ
	 * @param viewId
	 * @return
	 * @throws ServiceException
	 */
	public ViewVO getViewVOById(String viewId) throws ServiceException;
	
	/**
	 * ����ְԱ��ŵõ���Ȩ�޷�Χ�ڵĴ���
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public List getWindowListByEmployeeId(String employeeId) throws ServiceException;
	
	/**
	 * ����ְԱ��ŵõ���Ȩ�޷�Χ�ڵ���ͼ
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public List getViewListByEmployeeId(String employeeId) throws ServiceException;
	
	/**
	 * ����ְԱ��ŵõ���Ȩ�޷�Χ�ڵİ�ť
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public List getButtonListByEmployeeId(String employeeId) throws ServiceException;

	/**
	 * ���ݴ��ڱ�ŵõ����ϼ����ڼ���
	 * @param windowId
	 * @return
	 * @throws ServiceException
	 */
	public WindowColl getParentWindowByWinId(String windowId) throws ServiceException;
	
	/**
	 * ���ݴ��ڱ�ţ��õ����¼����ڼ���
	 * @param windowId
	 * @return
	 * @throws ServiceException
	 */
	public WindowColl getChildrenWindowByWinId(String windowId) throws ServiceException;
	
	/**
	 * ���ݿ�ܱ�ţ��õ����ϼ����ڼ���
	 * @param frameId
	 * @return
	 * @throws ServiceException
	 */
	public WindowColl getWindowCollByFrameId(String frameId) throws ServiceException;
	
	/**
	 * ���ݴ��ڱ�ŵõ���������ܼ���
	 * @param windowId
	 * @return
	 * @throws ServiceException
	 */
	public FrameColl getFrameCollByWinId(String windowId) throws ServiceException;
	
	/**
	 * ������ͼ��ŵõ����ϼ���ܼ���
	 * @param viewId
	 * @return
	 * @throws ServiceException
	 */
	public FrameColl getFrameCollByViewId(String viewId) throws ServiceException;
	/**
	 * ���ݿ�ܱ�ŵõ�����������ͼ����
	 * @param frameId
	 * @return
	 * @throws ServiceException
	 */
	public ViewColl getViewCollByFrameId(String frameId) throws ServiceException;
	
    public WindowRelFrameColl getWindowRelFrameColl(String windowId) throws ServiceException;

	public FrameRelViewColl getFrameRelViewColl(String frameId) throws ServiceException;
	
	public StyleVO getStyleVOById(String styleId) throws ServiceException;
	
	public boolean ifHaveWinowRight(String employeeId, String windowId) throws ServiceException;
	
	public boolean ifHaveViewRight(String employeeId, String viewId) throws ServiceException;

}
