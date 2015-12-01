package com.neusoft.tdframework.authorization;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.license.LicenseUtil;
import com.neusoft.tdframework.license.LicenseVO;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-10-16
 * @author ren.hui@neusoft.com
 * @version 
 */
public class FrameMenuVO extends BaseVO {
	public static final int BUTTON_MENU_TYPE=0;		//按钮
	public static final int WINDOW_MENU_TYPE=1;		//窗口菜单
	public static final int MENU_MENU_TYPE=2;		//菜单
	
	public static final int OPEN_IN_FRAME = 0;		//在框架中打开
	public static final int OPEN_NEW_WINDOW = 1;	//打开新窗口
	
	/**菜单编码*/
	private String menuId = null; 
	/**菜单名称*/
	private String menuName = null; 
	/**系统编码*/
	private String systemId = null; 
	/**模块编码*/
	private String moduleId = null; 
	/**菜单类型*/
	private int menuType; 
	/**打开方式*/
	private int openMethod; 
	/**页面连接*/
	private String pageLink = null;
	/**层次*/
	private int layer; 
	/**记录日志*/
	private int log; 
	/**顺序*/
	private int order; 
	/**工作区显示*/
	private int ifMyWork; 
	/**上级菜单编码*/
	private String parentMenuId= ""; 
	/**使用状态*/
	private int inuse; 
	/**菜单描述*/
	private String menuDesc = "";  
	//以下为非表字段
	/**是否有子结点*/
	private boolean ifChild;
	/** 角色是否有此权限 */
	private boolean ifSelect;
	//权限信息
	/** 是否有授权的权限*/
	private int adminStatus = 0;
	/** 是否有执行权限*/
	private int execStatus = 1;
	/** 容器 */
	private int container = 0;
		
	/** 获得菜单编码*/
	public String getMenuId() {
		return menuId;
	}
	
	/**获得菜单名称*/
		public String getMenuName() { 
			return menuName;
		}
	/**获得系统编码*/
	public String getSystemId() { 
		return systemId;
	}
	/**获得模块编码*/
	public String getModuleId(){
		return moduleId;
	}
	/**获得菜单类型*/
	public int getMenuType(){
		return menuType;
	}
	/**获得打开方式*/
	public int getOpenMethod() { 
		return openMethod;
	}
	/**获得页面连接*/
	public String getPageLink() {
		return pageLink;
	}
	
	/**获得层次*/
	public int getLayer(){
		return layer;
	}
	/**获得记录日志*/
	public int getLog (){
		return log;
	}
	/**获得顺序*/
	public int getOrder(){
		return order;
	}
	/**获得工作区显示*/
	public int getIfMyWork(){
		return ifMyWork;
	}
	/**获得上级菜单编码*/
	public String getParentMenuId() { 
		return parentMenuId;
	}
	/**获得使用状态*/
	public int getInuse(){
		return inuse;
	}
	/**获得菜单描述*/
	public String getMenuDesc () { 
		return menuDesc;
	}
	/**获得子结点*/
	public boolean getIfChild() {
		return ifChild;
	}
	/**获得子结点*/
	public boolean getIfSelect() {
		return ifSelect;
	}
	/**是否有授权的权限*/
	public int getAdminStatus() {
		return (this.adminStatus);
	}
	
	/**是否有执行权限*/
	public int getExecStatus() {
		return (this.execStatus);
	}

	
	/** 设置菜单编码*/
	public void setMenuId(String string) {
		menuId = string;
	}

	/**设置菜单名称*/
	public void setMenuName(String string) { 
		menuName = string;
	}
	/**设置系统编码*/
	public void setSystemId(String string) { 
		systemId = string;
	}
	/**设置模块编码*/
	public void setModuleId(String string){ 
		moduleId = string;
	}
	/**设置菜单类型*/
	public void setMenuType(int id){
		menuType = id;
	}
	/**设置打开方式*/
	public void setOpenMethod(int id) { 
		openMethod = id;
	}
	/**设置页面连接*/
	public void setPageLink(String string) {
		pageLink = string;
	}

	/**设置层次*/
	public void setLayer(int id){
		layer = id;
	}
	/**设置记录日志*/
	public void setLog (int id){
		log = id;
	}
	/**设置顺序*/
	public void setOrder(int id){
		order = id;
	}
	/**设置工作区显示*/
	public void setIfMyWork(int id){ 
		ifMyWork = id;
	}
	/**设置上级菜单编码*/
	public void setParentMenuId(String string) { 
		parentMenuId = string;
	}
	/**设置使用状态*/
	public void setInuse(int id){
		inuse = id;
	}
	/**设置菜单描述*/
	public void setMenuDesc (String string) { 
		menuDesc = string;
	}
	/**设置子结点*/
	public void setIfChild (boolean child){
		ifChild = child;
	}
	/**设置子结点*/
	public void setIfSelect (boolean select){
		ifSelect = select;
	}
	
	/**
		设置1.是0.否
	*/
	public void setAdminStatus(int adminStatus) {
		this.adminStatus = adminStatus;
	}
		
	/**
		设置1.是0.否
	*/
	public void setExecStatus(int execStatus) {
		this.execStatus = execStatus;
	}


	public int getContainer() {
		return container;
	}

	public void setContainer(int container) {
		this.container = container;
	}

	/**
		转化成字符串
	*/
	
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append(tabs).append("<MenuId>").append(NullProcessUtil.nvlToString(menuId,"")).append("</MenuId>\n");
		ret.append(tabs).append("<MenuName>").append(NullProcessUtil.nvlToString(menuName,"")).append("</MenuName>\n");
		ret.append(tabs).append("<SystemId>").append(NullProcessUtil.nvlToString(systemId,"")).append("</SystemId>\n");
		ret.append(tabs).append("<ModuleId>").append(NullProcessUtil.nvlToString(moduleId,"")).append("</ModuleId>\n");
		ret.append(tabs).append("<MenuType>").append(menuType).append("</MenuType>\n");
		ret.append(tabs).append("<OpenMethod>").append(openMethod).append("</OpenMethod>\n");
		ret.append(tabs).append("<PageLink>").append(NullProcessUtil.nvlToString(pageLink,"")).append("</PageLink>\n");
		ret.append(tabs).append("<Layer>").append(openMethod).append("</Layer>\n");
		ret.append(tabs).append("<Log>").append(log).append("</Log>\n");
		ret.append(tabs).append("<Order>").append(order).append("</Order>\n");
		ret.append(tabs).append("<IfMyWork>").append(ifMyWork).append("</IfMyWork>\n");
		ret.append(tabs).append("<ParentMenuId>").append(NullProcessUtil.nvlToString(parentMenuId,"")).append("</ParentMenuId>\n");
		ret.append(tabs).append("<Inuse>").append(inuse).append("</Inuse>\n");
		ret.append(tabs).append("<MenuDesc>").append(NullProcessUtil.nvlToString(menuDesc,"")).append("</MenuDesc>\n");
		ret.append(tabs).append("<Container>").append(container).append("</Container>\n");
		return ret.toString();
	
	}
	
	public String toParameter(){
		StringBuffer result = new StringBuffer();
		result.append("'").append(StringUtil.emptyTo(menuId,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(menuName,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(parentMenuId,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(systemId,"")).append("',");
		result.append("'").append(openMethod).append("',");
		result.append("'").append(StringUtil.emptyTo(pageLink,"")).append("',");
		result.append("'").append(layer).append("'");
		return result.toString();
	}

/*	public String toParameter(String channelParameter){
		String pLink = StringUtil.emptyTo(pageLink,"");
		if(pLink.trim().endsWith("/")){
			pLink = "";
		}
		else if(pLink.indexOf("?")>0){
			pLink = pLink + "&" + channelParameter;
		}else{
			if(pLink.trim().length()>0&&(!pLink.trim().endsWith("/")))
				pLink = pLink + "?" +  channelParameter;
		}
		StringBuffer result = new StringBuffer();
		result.append("'").append(StringUtil.emptyTo(menuId,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(menuName,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(parentMenuId,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(systemId,"")).append("',");
		result.append("'").append(openMethod).append("',");
		result.append("'").append(pLink).append("',");
		result.append("'").append(layer).append("'");
		LicenseVO vo = getLicenseVO(menuId);
		if(vo!=null&&!vo.getExpireStatus().equals("normal")){
			result.append(",'").append(vo.getProjectNo()).append("','");
			result.append(vo.getProjectName()).append("','");
			result.append(vo.getLicenseNo()).append("','");
			result.append(vo.getExpiredDate()).append("','");
			result.append(vo.getExpireStatus()).append("'");
		}
		
		return result.toString();
	}
*/
	private LicenseVO getLicenseVO(String menuId){
		List licenseNames = LicenseUtil.getLicenseNames();
		LicenseVO vo = null;
		if(licenseNames.contains(menuId)){
			vo = LicenseUtil.getLicenseVO(menuId);
		}
		return vo;
	}
	
	public String toParameter(String channelParameter){
		String pLink = StringUtil.emptyTo(pageLink,"");
		if(pLink.trim().endsWith("/")){
			pLink = "";
		}
		else if(pLink.indexOf("?")>0){
			pLink = pLink + "&" + channelParameter;
		}else{
			if(pLink.trim().length()>0&&(!pLink.trim().endsWith("/")))
				pLink = pLink + "?" +  channelParameter;
		}
		StringBuffer result = new StringBuffer();
		result.append("'").append(StringUtil.emptyTo(menuId,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(menuName,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(parentMenuId,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(systemId,"")).append("',");
		result.append("'").append(openMethod).append("',");
		result.append("'").append(pLink).append("',");
		result.append("'").append(layer).append("'");
		return result.toString();
	}

	public String toBASParameter(String channelParameter){
		String pLink = StringUtil.emptyTo(pageLink,"");
		if(pLink.trim().endsWith("/")){
			pLink = "";
		}
		else if(pLink.indexOf("?")>0){
			pLink = pLink + "&" + channelParameter;
		}else{
			if(pLink.trim().length()>0&&(!pLink.trim().endsWith("/")))
				pLink = pLink + "?" +  channelParameter;
		}
		StringBuffer result = new StringBuffer();
		result.append("'").append(StringUtil.emptyTo(menuId,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(menuName,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(parentMenuId,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(systemId,"")).append("',");
		result.append("'").append(openMethod).append("',");
		try {
			result.append("'").append(java.net.URLEncoder.encode(pLink, "UTF8")).append("',");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		result.append("'").append(layer).append("'");
		return result.toString();
	}
	
}
