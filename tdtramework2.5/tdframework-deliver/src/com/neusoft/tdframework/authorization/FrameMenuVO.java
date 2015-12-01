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
	public static final int BUTTON_MENU_TYPE=0;		//��ť
	public static final int WINDOW_MENU_TYPE=1;		//���ڲ˵�
	public static final int MENU_MENU_TYPE=2;		//�˵�
	
	public static final int OPEN_IN_FRAME = 0;		//�ڿ���д�
	public static final int OPEN_NEW_WINDOW = 1;	//���´���
	
	/**�˵�����*/
	private String menuId = null; 
	/**�˵�����*/
	private String menuName = null; 
	/**ϵͳ����*/
	private String systemId = null; 
	/**ģ�����*/
	private String moduleId = null; 
	/**�˵�����*/
	private int menuType; 
	/**�򿪷�ʽ*/
	private int openMethod; 
	/**ҳ������*/
	private String pageLink = null;
	/**���*/
	private int layer; 
	/**��¼��־*/
	private int log; 
	/**˳��*/
	private int order; 
	/**��������ʾ*/
	private int ifMyWork; 
	/**�ϼ��˵�����*/
	private String parentMenuId= ""; 
	/**ʹ��״̬*/
	private int inuse; 
	/**�˵�����*/
	private String menuDesc = "";  
	//����Ϊ�Ǳ��ֶ�
	/**�Ƿ����ӽ��*/
	private boolean ifChild;
	/** ��ɫ�Ƿ��д�Ȩ�� */
	private boolean ifSelect;
	//Ȩ����Ϣ
	/** �Ƿ�����Ȩ��Ȩ��*/
	private int adminStatus = 0;
	/** �Ƿ���ִ��Ȩ��*/
	private int execStatus = 1;
	/** ���� */
	private int container = 0;
		
	/** ��ò˵�����*/
	public String getMenuId() {
		return menuId;
	}
	
	/**��ò˵�����*/
		public String getMenuName() { 
			return menuName;
		}
	/**���ϵͳ����*/
	public String getSystemId() { 
		return systemId;
	}
	/**���ģ�����*/
	public String getModuleId(){
		return moduleId;
	}
	/**��ò˵�����*/
	public int getMenuType(){
		return menuType;
	}
	/**��ô򿪷�ʽ*/
	public int getOpenMethod() { 
		return openMethod;
	}
	/**���ҳ������*/
	public String getPageLink() {
		return pageLink;
	}
	
	/**��ò��*/
	public int getLayer(){
		return layer;
	}
	/**��ü�¼��־*/
	public int getLog (){
		return log;
	}
	/**���˳��*/
	public int getOrder(){
		return order;
	}
	/**��ù�������ʾ*/
	public int getIfMyWork(){
		return ifMyWork;
	}
	/**����ϼ��˵�����*/
	public String getParentMenuId() { 
		return parentMenuId;
	}
	/**���ʹ��״̬*/
	public int getInuse(){
		return inuse;
	}
	/**��ò˵�����*/
	public String getMenuDesc () { 
		return menuDesc;
	}
	/**����ӽ��*/
	public boolean getIfChild() {
		return ifChild;
	}
	/**����ӽ��*/
	public boolean getIfSelect() {
		return ifSelect;
	}
	/**�Ƿ�����Ȩ��Ȩ��*/
	public int getAdminStatus() {
		return (this.adminStatus);
	}
	
	/**�Ƿ���ִ��Ȩ��*/
	public int getExecStatus() {
		return (this.execStatus);
	}

	
	/** ���ò˵�����*/
	public void setMenuId(String string) {
		menuId = string;
	}

	/**���ò˵�����*/
	public void setMenuName(String string) { 
		menuName = string;
	}
	/**����ϵͳ����*/
	public void setSystemId(String string) { 
		systemId = string;
	}
	/**����ģ�����*/
	public void setModuleId(String string){ 
		moduleId = string;
	}
	/**���ò˵�����*/
	public void setMenuType(int id){
		menuType = id;
	}
	/**���ô򿪷�ʽ*/
	public void setOpenMethod(int id) { 
		openMethod = id;
	}
	/**����ҳ������*/
	public void setPageLink(String string) {
		pageLink = string;
	}

	/**���ò��*/
	public void setLayer(int id){
		layer = id;
	}
	/**���ü�¼��־*/
	public void setLog (int id){
		log = id;
	}
	/**����˳��*/
	public void setOrder(int id){
		order = id;
	}
	/**���ù�������ʾ*/
	public void setIfMyWork(int id){ 
		ifMyWork = id;
	}
	/**�����ϼ��˵�����*/
	public void setParentMenuId(String string) { 
		parentMenuId = string;
	}
	/**����ʹ��״̬*/
	public void setInuse(int id){
		inuse = id;
	}
	/**���ò˵�����*/
	public void setMenuDesc (String string) { 
		menuDesc = string;
	}
	/**�����ӽ��*/
	public void setIfChild (boolean child){
		ifChild = child;
	}
	/**�����ӽ��*/
	public void setIfSelect (boolean select){
		ifSelect = select;
	}
	
	/**
		����1.��0.��
	*/
	public void setAdminStatus(int adminStatus) {
		this.adminStatus = adminStatus;
	}
		
	/**
		����1.��0.��
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
		ת�����ַ���
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
