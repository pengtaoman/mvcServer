package com.neusoft.om.dao.employeepower;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2004-12-15
 * @author ren.hui@neusoft.com
 * @version
 */

public class EmployeePowerVO extends BaseVO { 
	private	String	partCity;	// 
	private	String	menuId;	// 
	private	String	menuName;	// 
	private	String	employeeId;	// 
	private	String	systemId;	// 
	private	String	moduleId;	// 
	private	String	systemName;	// 
	private	String	moduleName;	// 
	private	int	menuType;	// 
	private	int	openMethod;	// 
	private	String	pageLink;	// 
	private	int	layer;	// 
	private	int	log;	// 
	private	int	order;	// 
	private	int	ifMyWork;	// 
	private	String	parentMenuId;	// 
	private	int	inuse;	// 
	private	String	menuDesc;	// 
	private	int	adminStatus;	// 
	private	int	execStatus;	// 
	private	int	ifAdjust;	// 

	/**
		�յĹ��췽��
	*/
	public EmployeePowerVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public EmployeePowerVO(String partCity, String menuId, String menuName, String employeeId, String systemId, String moduleId, String systemName, String moduleName, int menuType, int openMethod, String pageLink, int layer, int log, int order, int ifMyWork, String parentMenuId, int inuse, String menuDesc, int adminStatus, int execStatus, int ifAdjust){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public EmployeePowerVO(EmployeePowerVO other){
		if(this != other) {
			this.partCity = other.partCity;
			this.menuId = other.menuId;
			this.menuName = other.menuName;
			this.employeeId = other.employeeId;
			this.systemId = other.systemId;
			this.moduleId = other.moduleId;
			this.systemName = other.systemName;
			this.moduleName = other.moduleName;
			this.menuType = other.menuType;
			this.openMethod = other.openMethod;
			this.pageLink = other.pageLink;
			this.layer = other.layer;
			this.log = other.log;
			this.order = other.order;
			this.ifMyWork = other.ifMyWork;
			this.parentMenuId = other.parentMenuId;
			this.inuse = other.inuse;
			this.menuDesc = other.menuDesc;
			this.adminStatus = other.adminStatus;
			this.execStatus = other.execStatus;
			this.ifAdjust = other.ifAdjust;

		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���� 
	*/
	public void setPartCity(String partCity) {
		this.partCity = partCity;
	}
	/**
		��ȡ 
	*/
	public String getPartCity() {
		return (this.partCity);
	}
	/**
		���� 
	*/
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	/**
		��ȡ 
	*/
	public String getMenuId() {
		return (this.menuId);
	}
	/**
		���� 
	*/
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	/**
		��ȡ 
	*/
	public String getMenuName() {
		return XMLProperties.prepareXml(this.menuName);
	}
	/**
		���� 
	*/
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	/**
		��ȡ 
	*/
	public String getEmployeeId() {
		return (this.employeeId);
	}
	/**
		���� 
	*/
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}
	/**
		��ȡ 
	*/
	public String getSystemId() {
		return (this.systemId);
	}
	/**
		���� 
	*/
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}
	/**
		��ȡ 
	*/
	public String getModuleId() {
		return (this.moduleId);
	}
	/**
		���� 
	*/
	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}
	/**
		��ȡ 
	*/
	public String getSystemName() {
		return XMLProperties.prepareXml(this.systemName);
	}
	/**
		���� 
	*/
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	/**
		��ȡ 
	*/
	public String getModuleName() {
		return XMLProperties.prepareXml(this.moduleName);
	}
	/**
		���� 
	*/
	public void setMenuType(int menuType) {
		this.menuType = menuType;
	}
	/**
		��ȡ 
	*/
	public int getMenuType() {
		return (this.menuType);
	}
	/**
		���� 
	*/
	public void setOpenMethod(int openMethod) {
		this.openMethod = openMethod;
	}
	/**
		��ȡ 
	*/
	public int getOpenMethod() {
		return (this.openMethod);
	}
	/**
		���� 
	*/
	public void setPageLink(String pageLink) {
		this.pageLink = pageLink;
	}
	/**
		��ȡ 
	*/
	public String getPageLink() {
		return (this.pageLink);
	}
	/**
		���� 
	*/
	public void setLayer(int layer) {
		this.layer = layer;
	}
	/**
		��ȡ 
	*/
	public int getLayer() {
		return (this.layer);
	}
	/**
		���� 
	*/
	public void setLog(int log) {
		this.log = log;
	}
	/**
		��ȡ 
	*/
	public int getLog() {
		return (this.log);
	}
	/**
		���� 
	*/
	public void setOrder(int order) {
		this.order = order;
	}
	/**
		��ȡ 
	*/
	public int getOrder() {
		return (this.order);
	}
	/**
		���� 
	*/
	public void setIfMyWork(int ifMyWork) {
		this.ifMyWork = ifMyWork;
	}
	/**
		��ȡ 
	*/
	public int getIfMyWork() {
		return (this.ifMyWork);
	}
	/**
		���� 
	*/
	public void setParentMenuId(String parentMenuId) {
		this.parentMenuId = parentMenuId;
	}
	/**
		��ȡ 
	*/
	public String getParentMenuId() {
		return (this.parentMenuId);
	}
	/**
		���� 
	*/
	public void setInuse(int inuse) {
		this.inuse = inuse;
	}
	/**
		��ȡ 
	*/
	public int getInuse() {
		return (this.inuse);
	}
	/**
		���� 
	*/
	public void setMenuDesc(String menuDesc) {
		this.menuDesc = menuDesc;
	}
	/**
		��ȡ 
	*/
	public String getMenuDesc() {
		return (this.menuDesc);
	}
	/**
		���� 
	*/
	public void setAdminStatus(int adminStatus) {
		this.adminStatus = adminStatus;
	}
	/**
		��ȡ 
	*/
	public int getAdminStatus() {
		return (this.adminStatus);
	}
	/**
		���� 
	*/
	public void setExecStatus(int execStatus) {
		this.execStatus = execStatus;
	}
	/**
		��ȡ 
	*/
	public int getExecStatus() {
		return (this.execStatus);
	}
	/**
		���� 
	*/
	public void setIfAdjust(int ifAdjust) {
		this.ifAdjust = ifAdjust;
	}
	/**
		��ȡ 
	*/
	public int getIfAdjust() {
		return (this.ifAdjust);
	}

	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_part_city".intern())
				partCity = resultSet.getString(i);
			else if(columnName.intern()=="f_menu_id".intern())
				menuId = resultSet.getString(i);
			else if(columnName.intern()=="f_menu_name".intern())
				menuName = resultSet.getString(i);
			else if(columnName.intern()=="f_employee_id".intern())
				employeeId = resultSet.getString(i);
			else if(columnName.intern()=="f_system_id".intern())
				systemId = resultSet.getString(i);
			else if(columnName.intern()=="f_module_id".intern())
				moduleId = resultSet.getString(i);
			else if(columnName.intern()=="f_system_name".intern())
				systemName = resultSet.getString(i);
			else if(columnName.intern()=="f_module_name".intern())
				moduleName = resultSet.getString(i);
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
			else if(columnName.intern()=="f_if_adjust".intern())
				ifAdjust = resultSet.getInt(i);
		}

	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<PartCity>").append(nvl(partCity)).append("</PartCity>\n");
		ret.append(str_tab).append("<MenuId>").append(nvl(menuId)).append("</MenuId>\n");
		ret.append(str_tab).append("<MenuName>").append(XMLProperties.prepareXml(nvl(menuName))).append("</MenuName>\n");
		ret.append(str_tab).append("<EmployeeId>").append(nvl(employeeId)).append("</EmployeeId>\n");
		ret.append(str_tab).append("<SystemId>").append(nvl(systemId)).append("</SystemId>\n");
		ret.append(str_tab).append("<ModuleId>").append(nvl(moduleId)).append("</ModuleId>\n");
		ret.append(str_tab).append("<SystemName>").append(XMLProperties.prepareXml(nvl(systemName))).append("</SystemName>\n");
		ret.append(str_tab).append("<ModuleName>").append(XMLProperties.prepareXml(nvl(moduleName))).append("</ModuleName>\n");
		ret.append(str_tab).append("<MenuType>").append(menuType).append("</MenuType>\n");
		ret.append(str_tab).append("<OpenMethod>").append(openMethod).append("</OpenMethod>\n");
		ret.append(str_tab).append("<PageLink>").append(nvl(pageLink)).append("</PageLink>\n");
		ret.append(str_tab).append("<Layer>").append(layer).append("</Layer>\n");
		ret.append(str_tab).append("<Log>").append(log).append("</Log>\n");
		ret.append(str_tab).append("<Order>").append(order).append("</Order>\n");
		ret.append(str_tab).append("<IfMyWork>").append(ifMyWork).append("</IfMyWork>\n");
		ret.append(str_tab).append("<ParentMenuId>").append(nvl(parentMenuId)).append("</ParentMenuId>\n");
		ret.append(str_tab).append("<Inuse>").append(inuse).append("</Inuse>\n");
		ret.append(str_tab).append("<MenuDesc>").append(XMLProperties.prepareXml(nvl(menuDesc))).append("</MenuDesc>\n");
		ret.append(str_tab).append("<AdminStatus>").append(adminStatus).append("</AdminStatus>\n");
		ret.append(str_tab).append("<ExecStatus>").append(execStatus).append("</ExecStatus>\n");
		ret.append(str_tab).append("<IfAdjust>").append(ifAdjust).append("</IfAdjust>\n");
		return ret.toString();
	}

}