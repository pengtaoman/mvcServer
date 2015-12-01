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
	/** ����  */
	private int container = 0;
	
	private String disabledDate;
	
	private String menuTypeName;
	
	private String operator;
	
	private String operatorName;
	
	private String operateDate; 
	
	/**
	 * added by pengtao
	 * �Ƿ�ʹ���˲�ͬ��context path*/
	private String ifDiffContext;
	
		
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
	* ͨ��MAP��ʼ����Ϣ
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
		ret.append(str_tab).append("<Container>").append(container).append("</Container>\n");
		return ret.toString();
	
	}
	/**
	 * ת����Լ���õ��ַ���
	 * "menuId","menuName","parentMenuId","pageLink"
	 * ���ڿ�ֵ��ƴΪ"menuId","menuName","",""����ʽ
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
	 * �Ƿ�ʹ���˲�ͬ��context path
	 * @return the isDiffContext
	 */
	public String getIfDiffContext() {
		return ifDiffContext;
	}

	/**
	 * added by pengtao
	 * �Ƿ�ʹ���˲�ͬ��context path
	 * @param isDiffContext the isDiffContext to set
	 */
	public void setIfDiffContext(String ifDiffContext) {
		this.ifDiffContext = ifDiffContext;
	}
	
}
