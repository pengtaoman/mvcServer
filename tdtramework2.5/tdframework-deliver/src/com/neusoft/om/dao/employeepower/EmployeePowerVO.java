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
		空的构造方法
	*/
	public EmployeePowerVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public EmployeePowerVO(String partCity, String menuId, String menuName, String employeeId, String systemId, String moduleId, String systemName, String moduleName, int menuType, int openMethod, String pageLink, int layer, int log, int order, int ifMyWork, String parentMenuId, int inuse, String menuDesc, int adminStatus, int execStatus, int ifAdjust){

	}
	/**
		通过一个已有对象构造一个对象
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
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置 
	*/
	public void setPartCity(String partCity) {
		this.partCity = partCity;
	}
	/**
		获取 
	*/
	public String getPartCity() {
		return (this.partCity);
	}
	/**
		设置 
	*/
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	/**
		获取 
	*/
	public String getMenuId() {
		return (this.menuId);
	}
	/**
		设置 
	*/
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	/**
		获取 
	*/
	public String getMenuName() {
		return XMLProperties.prepareXml(this.menuName);
	}
	/**
		设置 
	*/
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	/**
		获取 
	*/
	public String getEmployeeId() {
		return (this.employeeId);
	}
	/**
		设置 
	*/
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}
	/**
		获取 
	*/
	public String getSystemId() {
		return (this.systemId);
	}
	/**
		设置 
	*/
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}
	/**
		获取 
	*/
	public String getModuleId() {
		return (this.moduleId);
	}
	/**
		设置 
	*/
	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}
	/**
		获取 
	*/
	public String getSystemName() {
		return XMLProperties.prepareXml(this.systemName);
	}
	/**
		设置 
	*/
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	/**
		获取 
	*/
	public String getModuleName() {
		return XMLProperties.prepareXml(this.moduleName);
	}
	/**
		设置 
	*/
	public void setMenuType(int menuType) {
		this.menuType = menuType;
	}
	/**
		获取 
	*/
	public int getMenuType() {
		return (this.menuType);
	}
	/**
		设置 
	*/
	public void setOpenMethod(int openMethod) {
		this.openMethod = openMethod;
	}
	/**
		获取 
	*/
	public int getOpenMethod() {
		return (this.openMethod);
	}
	/**
		设置 
	*/
	public void setPageLink(String pageLink) {
		this.pageLink = pageLink;
	}
	/**
		获取 
	*/
	public String getPageLink() {
		return (this.pageLink);
	}
	/**
		设置 
	*/
	public void setLayer(int layer) {
		this.layer = layer;
	}
	/**
		获取 
	*/
	public int getLayer() {
		return (this.layer);
	}
	/**
		设置 
	*/
	public void setLog(int log) {
		this.log = log;
	}
	/**
		获取 
	*/
	public int getLog() {
		return (this.log);
	}
	/**
		设置 
	*/
	public void setOrder(int order) {
		this.order = order;
	}
	/**
		获取 
	*/
	public int getOrder() {
		return (this.order);
	}
	/**
		设置 
	*/
	public void setIfMyWork(int ifMyWork) {
		this.ifMyWork = ifMyWork;
	}
	/**
		获取 
	*/
	public int getIfMyWork() {
		return (this.ifMyWork);
	}
	/**
		设置 
	*/
	public void setParentMenuId(String parentMenuId) {
		this.parentMenuId = parentMenuId;
	}
	/**
		获取 
	*/
	public String getParentMenuId() {
		return (this.parentMenuId);
	}
	/**
		设置 
	*/
	public void setInuse(int inuse) {
		this.inuse = inuse;
	}
	/**
		获取 
	*/
	public int getInuse() {
		return (this.inuse);
	}
	/**
		设置 
	*/
	public void setMenuDesc(String menuDesc) {
		this.menuDesc = menuDesc;
	}
	/**
		获取 
	*/
	public String getMenuDesc() {
		return (this.menuDesc);
	}
	/**
		设置 
	*/
	public void setAdminStatus(int adminStatus) {
		this.adminStatus = adminStatus;
	}
	/**
		获取 
	*/
	public int getAdminStatus() {
		return (this.adminStatus);
	}
	/**
		设置 
	*/
	public void setExecStatus(int execStatus) {
		this.execStatus = execStatus;
	}
	/**
		获取 
	*/
	public int getExecStatus() {
		return (this.execStatus);
	}
	/**
		设置 
	*/
	public void setIfAdjust(int ifAdjust) {
		this.ifAdjust = ifAdjust;
	}
	/**
		获取 
	*/
	public int getIfAdjust() {
		return (this.ifAdjust);
	}

	/**
		以SQL的结果集设置数据
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
		转化成字符串
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