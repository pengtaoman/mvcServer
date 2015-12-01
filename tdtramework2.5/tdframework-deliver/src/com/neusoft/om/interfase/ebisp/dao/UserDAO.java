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
	 * ���ݴ��ڱ�ŵõ����ϼ����ڼ���
	 * @param windowId
	 * @return
	 * @throws DataAccessException
	 */
	public WindowColl getParentWindowByWinId(String windowId) throws DataAccessException;
	
	/**
	 * ���ݴ��ڱ�ţ��õ����¼����ڼ���
	 * @param windowId
	 * @return
	 * @throws DataAccessException
	 */
	public WindowColl getChildrenWindowByWinId(String windowId) throws DataAccessException;
	
	/**
	 * ���ݿ�ܱ�ţ��õ����ϼ����ڼ���
	 * @param frameId
	 * @return
	 * @throws DataAccessException
	 */
	public WindowColl getWindowCollByFrameId(String frameId) throws DataAccessException;
	
	/**
	 * ���ݴ��ڱ�ŵõ���������ܼ���
	 * @param windowId
	 * @return
	 * @throws DataAccessException
	 */
	public FrameColl getFrameCollByWinId(String windowId) throws DataAccessException;
	
	/**
	 * ������ͼ��ŵõ����ϼ���ܼ���
	 * @param viewId
	 * @return
	 * @throws DataAccessException
	 */
	public FrameColl getFrameCollByViewId(String viewId) throws DataAccessException;
	
	/**
	 * ���ݿ�ܱ�ŵõ�����������ͼ����
	 * @param frameId
	 * @return
	 * @throws DataAccessException
	 */
	public ViewColl getViewCollByFrameId(String frameId) throws DataAccessException;

	/**
	 * ���ݱ�ŵõ�ͼ����Ϣ
	 * @param iconId
	 * @return
	 * @throws DataAccessException
	 */
    public IconVO getIconVOById(String iconId) throws DataAccessException;
    
    /**
     * ���ݱ�ŵõ���ʽ��Ϣ
     * @param styleId
     * @return
     * @throws DataAccessException
     */
    public StyleVO getStyleVOById(String styleId) throws DataAccessException;
    
    /**
     * ����employeeId�õ����ܹ����ʵ�����windowNode����
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public WindowNodeColl getWindowNodeByEmpId(String employeeId) throws DataAccessException;
    
    /**
     * ����windowId�õ����Ӧ��windowNode
     * @param windowId
     * @return
     * @throws DataAccessException
     */
    public WindowNode getWindowNodeByWinId(String windowId) throws DataAccessException;
    
    /**
     * �ж�ĳְԱ�Ƿ���Ȩ�鿴ĳwindow
     * @param employeeId
     * @param windowId
     * @return
     */
    boolean ifHaveWinowRight(String employeeId, String windowId) throws DataAccessException;
    
    /**
     * �ж�ĳְԱ�Ƿ���Ȩ�޲鿴ĳview
     * @param employeeId
     * @param viewId
     * @return
     */
    boolean ifHaveViewRight(String employeeId, String viewId) throws DataAccessException;
    
    /**
     * ͨ��windowId�õ��������ܵĹ�ϵ����
     * @param windowId
     * @return
     */
    public WindowRelFrameColl getWindowRelFrameColl(String windowId) throws DataAccessException;
    
    /**
     * ���������frameId�õ����ڴ�frame������view��Ϣ
     * @param frameId
     * @return
     */
    public FrameRelViewColl getFrameRelViewColl(String frameId) throws DataAccessException;
    
    /**
     * �õ�����style
     * @return
     * @throws DataAccessException
     */
    public StyleColl getAllStyle() throws DataAccessException;
    
    /**
     * �õ�����icon
     * @return
     * @throws DataAccessException
     */
    public IconColl getAllIcon() throws DataAccessException;
    
}
