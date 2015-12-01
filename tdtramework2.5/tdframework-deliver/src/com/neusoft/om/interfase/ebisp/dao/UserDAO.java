package com.neusoft.om.interfase.ebisp.dao;

import java.util.List;

import com.neusoft.om.interfase.ebisp.data.FrameColl;
import com.neusoft.om.interfase.ebisp.data.FrameRelViewColl;
import com.neusoft.om.interfase.ebisp.data.FrameVO;
import com.neusoft.om.interfase.ebisp.data.IconColl;
import com.neusoft.om.interfase.ebisp.data.IconVO;
import com.neusoft.om.interfase.ebisp.data.StyleColl;
import com.neusoft.om.interfase.ebisp.data.StyleVO;
import com.neusoft.om.interfase.ebisp.data.ViewColl;
import com.neusoft.om.interfase.ebisp.data.ViewVO;
import com.neusoft.om.interfase.ebisp.data.WindowColl;
import com.neusoft.om.interfase.ebisp.data.WindowNode;
import com.neusoft.om.interfase.ebisp.data.WindowNodeColl;
import com.neusoft.om.interfase.ebisp.data.WindowRelFrameColl;
import com.neusoft.om.interfase.ebisp.data.WindowVO;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface UserDAO extends BaseDao{
	
	public WindowVO getWindowVOById(String windowId) throws DataAccessException;
	
	public FrameVO getFrameVOById(String frameId)throws DataAccessException;
	
	public ViewVO getViewVOById(String viewId)throws DataAccessException;
	
	public List getWindowListByEmployeeId(String employeeId)throws DataAccessException;
	
	public List getViewListByEmployeeId(String employeeId)throws DataAccessException;
	
	public List getButtonListByEmployeeId(String employeeId)throws DataAccessException;
	/**
	 * 根据窗口编号得到其上级窗口集合
	 * @param windowId
	 * @return
	 * @throws DataAccessException
	 */
	public WindowColl getParentWindowByWinId(String windowId) throws DataAccessException;
	
	/**
	 * 根据窗口编号，得到其下级窗口集合
	 * @param windowId
	 * @return
	 * @throws DataAccessException
	 */
	public WindowColl getChildrenWindowByWinId(String windowId) throws DataAccessException;
	
	/**
	 * 根据框架编号，得到其上级窗口集合
	 * @param frameId
	 * @return
	 * @throws DataAccessException
	 */
	public WindowColl getWindowCollByFrameId(String frameId) throws DataAccessException;
	
	/**
	 * 根据窗口编号得到其下属框架集合
	 * @param windowId
	 * @return
	 * @throws DataAccessException
	 */
	public FrameColl getFrameCollByWinId(String windowId) throws DataAccessException;
	
	/**
	 * 根据视图编号得到其上级框架集合
	 * @param viewId
	 * @return
	 * @throws DataAccessException
	 */
	public FrameColl getFrameCollByViewId(String viewId) throws DataAccessException;
	
	/**
	 * 根据框架编号得到其下属的视图集合
	 * @param frameId
	 * @return
	 * @throws DataAccessException
	 */
	public ViewColl getViewCollByFrameId(String frameId) throws DataAccessException;

	/**
	 * 根据编号得到图标信息
	 * @param iconId
	 * @return
	 * @throws DataAccessException
	 */
    public IconVO getIconVOById(String iconId) throws DataAccessException;
    
    /**
     * 根据编号得到样式信息
     * @param styleId
     * @return
     * @throws DataAccessException
     */
    public StyleVO getStyleVOById(String styleId) throws DataAccessException;
    
    /**
     * 根据employeeId得到其能够访问的所有windowNode集合
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public WindowNodeColl getWindowNodeByEmpId(String employeeId) throws DataAccessException;
    
    /**
     * 根据windowId得到其对应的windowNode
     * @param windowId
     * @return
     * @throws DataAccessException
     */
    public WindowNode getWindowNodeByWinId(String windowId) throws DataAccessException;
    
    /**
     * 判断某职员是否有权查看某window
     * @param employeeId
     * @param windowId
     * @return
     */
    boolean ifHaveWinowRight(String employeeId, String windowId) throws DataAccessException;
    
    /**
     * 判断某职员是否有权限查看某view
     * @param employeeId
     * @param viewId
     * @return
     */
    boolean ifHaveViewRight(String employeeId, String viewId) throws DataAccessException;
    
    /**
     * 通过windowId得到窗口与框架的关系集合
     * @param windowId
     * @return
     */
    public WindowRelFrameColl getWindowRelFrameColl(String windowId) throws DataAccessException;
    
    /**
     * 根据输入的frameId得到属于此frame的所有view信息
     * @param frameId
     * @return
     */
    public FrameRelViewColl getFrameRelViewColl(String frameId) throws DataAccessException;
    
    /**
     * 得到所有style
     * @return
     * @throws DataAccessException
     */
    public StyleColl getAllStyle() throws DataAccessException;
    
    /**
     * 得到所有icon
     * @return
     * @throws DataAccessException
     */
    public IconColl getAllIcon() throws DataAccessException;
    
}
