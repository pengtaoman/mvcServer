package com.neusoft.om.dao.menuoperate;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;


/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-10-16
 * @author ren.hui@neusoft.com
 * @version 
 */
public class MenuOperateVO extends BaseVO{
	/**�˵�����*/
	private String menuId = ""; 
	/**�˵�����*/
	private String menuName = ""; 
	/**ϵͳ����*/
	private String systemId = ""; 
	/**ģ�����*/
	private String moduleId = ""; 
	/**�˵�����*/
	private int menuType; 
	/**�򿪷�ʽ*/
	private int openMethod; 
	/**ҳ������*/
	private String pageLink = "";
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
	
	private int portalWinId;
	//����Ϊ�Ǳ��ֶ�
	/**�Ƿ����ӽ��*/
	private boolean ifChild;
	/** ��ɫ�Ƿ��д˹���Ȩ�� */
	private boolean ifSelectAdmin;
	/**��ɫ�Ƿ��д�ִ��Ȩ��*/
	private boolean ifSelectExec;
	//Ȩ����Ϣ
	/** �Ƿ�����Ȩ��Ȩ��*/
	private int adminStatus = 0;
	/** �Ƿ���ִ��Ȩ��*/
	private int execStatus = 1;
	
		
	/** ��ò˵�����*/
	public String getMenuId() {
		return menuId;
	}
	
	/**��ò˵�����*/
		public String getMenuName() { 
			return (menuName);
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
		return (menuDesc);
	}
	/**����ӽ��*/
	public boolean getIfChild() {
		return ifChild;
	}
	/**�����ȨȨ��*/
	public boolean getIfSelectAdmin() {
		return ifSelectAdmin;
	}
	/**���ִ��Ȩ��*/
	public boolean getIfSelectExec (){
		return ifSelectExec;
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
	public void setIfSelectAdmin (boolean select){
		ifSelectAdmin = select;
	}
	
	/**�����ӽ��*/
	public void setIfSelectExec (boolean select){
		ifSelectExec = select;
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

	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_menu_id".intern())
				menuId = resultSet.getString(i);
			else if(columnName.intern()=="f_menu_name".intern())
				menuName = resultSet.getString(i);
			else if(columnName.intern()=="f_system_id".intern())
				systemId = resultSet.getString(i);
			else if(columnName.intern()=="f_module_id".intern())
				moduleId = resultSet.getString(i);
			else if(columnName.intern()=="f_menu_type".intern())
				menuType = resultSet.getInt(i);
			else if(columnName.intern()=="f_open_method".intern())
				openMethod = resultSet.getInt(i);
			else if(columnName.intern()=="f_page_link".intern())
				pageLink = resultSet.getString(i);
			else if(columnName.intern()=="f_layer".intern())
				layer = resultSet.getInt(i);
			else if(columnName.intern()=="f_log".intern())
				log = resultSet.getInt(i);
			else if(columnName.intern()=="f_order".intern())
				order = resultSet.getInt(i);
			else if(columnName.intern()=="f_if_my_work".intern())
				ifMyWork = resultSet.getInt(i);
			else if(columnName.intern()=="f_parent_menu_id".intern())
				parentMenuId = resultSet.getString(i);
			else if(columnName.intern()=="f_inuse".intern())
				inuse = resultSet.getInt(i);
			else if(columnName.intern()=="f_menu_desc".intern())
				menuDesc = resultSet.getString(i);
			else if(columnName.intern()=="f_admin_status".intern())
				adminStatus = resultSet.getInt(i);
			else if(columnName.intern()=="f_exec_status".intern())
				execStatus = resultSet.getInt(i);
			else if(columnName.intern()=="f_portal_win_id".intern())
				portalWinId = resultSet.getInt(i);
		}

	}

	

	/**
	 * @return ���� portalWinId��
	 */
	public int getPortalWinId() {
		return portalWinId;
	}

	/**
	 * @param portalWinId Ҫ���õ� portalWinId��
	 */
	public void setPortalWinId(int portalWinId) {
		this.portalWinId = portalWinId;
	}
	
	/**
	ת�����ַ���
*/

	public String toString(int tabs) {
	StringBuffer ret = new StringBuffer();
	String str_tab = StringUtil.tabs(tabs);
	ret.append("<MenuId>").append(NullProcessUtil.nvlToString(menuId,"")).append("</MenuId>\n");
	ret.append(str_tab).append("<MenuName>").append((NullProcessUtil.nvlToString(menuName,""))).append("</MenuName>\n");
	ret.append(str_tab).append("<SystemId>").append(NullProcessUtil.nvlToString(systemId,"")).append("</SystemId>\n");
	ret.append(str_tab).append("<ModuleId>").append(NullProcessUtil.nvlToString(moduleId,"")).append("</ModuleId>\n");
	ret.append(str_tab).append("<MenuType>").append(menuType).append("</MenuType>\n");
	ret.append(str_tab).append("<OpenMethod>").append(openMethod).append("</OpenMethod>\n");
	ret.append(str_tab).append("<PageLink>").append(NullProcessUtil.nvlToString(pageLink,"")).append("</PageLink>\n");
	ret.append(str_tab).append("<Layer>").append(openMethod).append("</Layer>\n");
	ret.append(str_tab).append("<Log>").append(log).append("</Log>\n");
	ret.append(str_tab).append("<Order>").append(order).append("</Order>\n");
	ret.append(str_tab).append("<IfMyWork>").append(ifMyWork).append("</IfMyWork>\n");
	ret.append(str_tab).append("<ParentMenuId>").append(NullProcessUtil.nvlToString(parentMenuId,"")).append("</ParentMenuId>\n");
	ret.append(str_tab).append("<Inuse>").append(inuse).append("</Inuse>\n");
	ret.append(str_tab).append("<MenuDesc>").append((NullProcessUtil.nvlToString(menuDesc,""))).append("</MenuDesc>\n");
	ret.append(str_tab).append("<PortalWinId>").append(portalWinId).append("</PortalWinId>\n");
	return ret.toString();

}
	
}
