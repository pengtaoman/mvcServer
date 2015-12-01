package com.neusoft.om.dao.menu;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.NullProcessUtil;
/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-10-16
 * @author ren.hui@neusoft.com
 * @version 
 */
public class MenuVO extends BaseVO {
	/**菜单编码*/
	private String menuId = ""; 
	/**菜单名称*/
	private String menuName = ""; 
	/**系统编码*/
	private String systemId = ""; 
	/**模块编码*/
	private String moduleId = ""; 
	/**菜单类型*/
	private int menuType; 
	/**打开方式*/
	private int openMethod; 
	/**页面连接*/
	private String pageLink = "";
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
	/** 角色是否有此管理权限 */
	private boolean ifSelectAdmin;
	/**角色是否有此执行权限*/
	private boolean ifSelectExec;
	//权限信息
	/** 是否有授权的权限*/
	private int adminStatus = 0;
	/** 是否有执行权限*/
	private int execStatus = 1;
	/** 容器  */
	private int container = 0;
	
	private String disabledDate;
	
	private String menuTypeName;
	
	private String operator;
	
	private String operatorName;
	
	private String operateDate; 
	
	/**
	 * added by pengtao
	 * 是否使用了不同的context path*/
	private String ifDiffContext;
	
		
	/** 获得菜单编码*/
	public String getMenuId() {
		return menuId;
	}
	
	/**获得菜单名称*/
		public String getMenuName() { 
			return (menuName);
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
		return (menuDesc);
	}
	/**获得子结点*/
	public boolean getIfChild() {
		return ifChild;
	}
	/**获得授权权限*/
	public boolean getIfSelectAdmin() {
		return ifSelectAdmin;
	}
	/**获得执行权限*/
	public boolean getIfSelectExec (){
		return ifSelectExec;
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
	public void setIfSelectAdmin (boolean select){
		ifSelectAdmin = select;
	}
	
	/**设置子结点*/
	public void setIfSelectExec (boolean select){
		ifSelectExec = select;
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
	 * @return the disAbledData
	 */
	public String getDisabledDate() {
		return disabledDate;
	}

	/**
	 * @param disAbledData the disAbledData to set
	 */
	public void setDisabledDate(String disabledDate) {
		this.disabledDate = disabledDate;
	}

	/**
	 * @return the menuTypeName
	 */
	public String getMenuTypeName() {
		return menuTypeName;
	}

	/**
	 * @param menuTypeName the menuTypeName to set
	 */
	public void setMenuTypeName(String menuTypeName) {
		this.menuTypeName = menuTypeName;
	}

	/**
	 * @return the operateDate
	 */
	public String getOperateDate() {
		return operateDate;
	}

	/**
	 * @param operateDate the operateDate to set
	 */
	public void setOperateDate(String operateDate) {
		this.operateDate = operateDate;
	}

	/**
	 * @return the operator
	 */
	public String getOperator() {
		return operator;
	}

	/**
	 * @param operator the operator to set
	 */
	public void setOperator(String operator) {
		this.operator = operator;
	}

	/**
	 * @return the operatorName
	 */
	public String getOperatorName() {
		return operatorName;
	}

	/**
	 * @param operatorName the operatorName to set
	 */
	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}

	/**
		以SQL的结果集设置数据
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
			else if(columnName.intern()=="f_container".intern())
				container = resultSet.getInt(i);
			else if(columnName.intern() == "f_disabled_date".intern()){
				if(resultSet.getString("f_disabled_date") != null && !resultSet.getString("f_disabled_date").equals("")){
					String disDate = resultSet.getString("f_disabled_date").substring(0,10);
					disabledDate = disDate;
				}
			}else if(columnName.intern() == "f_operator".intern())
				operator =resultSet.getString(i);
			else if(columnName.intern() == "f_operate_date".intern()){
				if(resultSet.getString("f_operate_date") != null && !resultSet.getString("f_operate_date").equals("")){
					String opeDate = resultSet.getString("f_operate_date").substring(0,10);
					operateDate = opeDate;
				}
			}	
		}
	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		menuId = NullProcessUtil.nvlToString(
			map.get("menuId"),"");
		menuName = NullProcessUtil.nvlToString(
			map.get("menuName"),"");
		systemId = NullProcessUtil.nvlToString(
			map.get("systemId"),"");
		moduleId = NullProcessUtil.nvlToString(
			map.get("moduleId"),"");
		menuType = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("menuType"), "-10"));
		openMethod = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("openMethod"), "-10"));
		pageLink = NullProcessUtil.nvlToString(
			map.get("pageLink"),"");
		layer = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("layer"), "-10"));
		log = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("log"), "-10"));
		order = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("order"), "-10"));
		ifMyWork = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("ifMyWork"), "-10"));
		parentMenuId = NullProcessUtil.nvlToString(
			map.get("parentMenuId"),"");
		inuse = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("inuse"), "-10"));
		menuDesc = NullProcessUtil.nvlToString(
			map.get("menuDesc"),"");
		container = Integer.parseInt(NullProcessUtil.nvlToString(
				map.get("container"), "-10"));
	}
	/**
		转化成字符串
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
		ret.append(str_tab).append("<Container>").append(container).append("</Container>\n");
		return ret.toString();
	
	}
	/**
	 * 转化成约定好的字符串
	 * "menuId","menuName","parentMenuId","pageLink"
	 * 存在空值则拼为"menuId","menuName","",""的形式
	 * @return
	 */
	public String toParameter(){
		StringBuffer result = new StringBuffer();		
		result.append("'").append(StringUtil.emptyTo(menuId,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(menuName,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(parentMenuId,"")).append("',");
		result.append("'").append(StringUtil.emptyTo(pageLink,"")).append("',");
		result.append("'").append(menuType+"").append("',");
		result.append("'").append(openMethod+"").append("',");
		result.append("'").append(StringUtil.emptyTo(systemId,"")).append("',");
		result.append("'").append(layer+"").append("'");
		return result.toString();
	}

	/**
	 * added by pengtao
	 * 是否使用了不同的context path
	 * @return the isDiffContext
	 */
	public String getIfDiffContext() {
		return ifDiffContext;
	}

	/**
	 * added by pengtao
	 * 是否使用了不同的context path
	 * @param isDiffContext the isDiffContext to set
	 */
	public void setIfDiffContext(String ifDiffContext) {
		this.ifDiffContext = ifDiffContext;
	}
	
}
