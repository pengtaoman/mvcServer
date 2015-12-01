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
 * <p>Remark     : 提供给经营分析系统的权限接口</p>
 * @author zhaof
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface UserBO extends BaseBO {
	/**
	 * 通过窗口编号得到窗口详细信息
	 * @param windowId
	 * @return
	 * @throws ServiceException
	 */
	public WindowVO getWindowVOById(String windowId) throws ServiceException;
	/**
	 * 根据框架编号得到框架详细信息
	 * @param frameId
	 * @return
	 * @throws ServiceException
	 */
	public FrameVO getFrameVOById(String frameId) throws ServiceException;
	/**
	 * 根据视图编号得到视图的详细信息
	 * @param viewId
	 * @return
	 * @throws ServiceException
	 */
	public ViewVO getViewVOById(String viewId) throws ServiceException;
	
	/**
	 * 根据职员编号得到其权限范围内的窗口
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public List getWindowListByEmployeeId(String employeeId) throws ServiceException;
	
	/**
	 * 根据职员编号得到其权限范围内的视图
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public List getViewListByEmployeeId(String employeeId) throws ServiceException;
	
	/**
	 * 根据职员编号得到其权限范围内的按钮
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public List getButtonListByEmployeeId(String employeeId) throws ServiceException;

	/**
	 * 根据窗口编号得到其上级窗口集合
	 * @param windowId
	 * @return
	 * @throws ServiceException
	 */
	public WindowColl getParentWindowByWinId(String windowId) throws ServiceException;
	
	/**
	 * 根据窗口编号，得到其下级窗口集合
	 * @param windowId
	 * @return
	 * @throws ServiceException
	 */
	public WindowColl getChildrenWindowByWinId(String windowId) throws ServiceException;
	
	/**
	 * 根据框架编号，得到其上级窗口集合
	 * @param frameId
	 * @return
	 * @throws ServiceException
	 */
	public WindowColl getWindowCollByFrameId(String frameId) throws ServiceException;
	
	/**
	 * 根据窗口编号得到其下属框架集合
	 * @param windowId
	 * @return
	 * @throws ServiceException
	 */
	public FrameColl getFrameCollByWinId(String windowId) throws ServiceException;
	
	/**
	 * 根据视图编号得到其上级框架集合
	 * @param viewId
	 * @return
	 * @throws ServiceException
	 */
	public FrameColl getFrameCollByViewId(String viewId) throws ServiceException;
	/**
	 * 根据框架编号得到其下属的视图集合
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
