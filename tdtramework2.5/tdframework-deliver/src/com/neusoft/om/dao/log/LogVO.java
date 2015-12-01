package com.neusoft.om.dao.log;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.DateUtil;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title: ��־
 * Description:
 * Company: neusoft
 * Date: 2004-12-20
 * @author ren.hui@neusoft.com
 * @version
 */

public class LogVO extends BaseVO { 
//	Column Name	ID	Pk	Null?	Data Type	Default	Comments	Histogram
//
//			F_PART_CITY	1		Y	VARCHAR2 (8 Byte)			Yes
//			F_PART_MM	2		Y	NUMBER (2)			Yes
//			F_SEQUENCE_ID	3		Y	NUMBER (14)			Yes
//			F_AREA_ID	4		Y	VARCHAR2 (32 Byte)			Yes
//			F_EMPLOYEE_ID	5		Y	VARCHAR2 (16 Byte)			Yes
//			F_WORK_NO	6		Y	VARCHAR2 (18 Byte)			Yes
//			F_SYSTEM_ID	7		Y	VARCHAR2 (4 Byte)			Yes
//			F_MODULE_ID	8		Y	VARCHAR2 (4 Byte)			Yes
//			F_MENU_ID	9		Y	VARCHAR2 (12 Byte)			Yes
//			F_MENU_NAME	10		Y	VARCHAR2 (64 Byte)			Yes
//			F_BOTTOM_ID	11		Y	VARCHAR2 (12 Byte)			Yes
//			F_BOTTOM_NAME	12		Y	VARCHAR2 (64 Byte)			Yes
//			F_OPERATE_DATE	13		Y	DATE			Yes
//			F_LOGIN_HOST	14		Y	VARCHAR2 (32 Byte)			Yes
//			F_MAC	15		Y	VARCHAR2 (32 Byte)			Yes
//			F_OPERATE_DESC	16		Y	VARCHAR2 (512 Byte)			Yes

			
	private	String	partCity;	//���б���(����)
	private	int	partMM;	//����(����)��Դ���������
	private	long	sequenceId;	//���к�
	private	String	areaId;	//�������
	private	String	employeeId;	//ְԱ����
	private	String	workNo;	//��½�˺�
	private	String	systemId;	//ϵͳ���
	private	String	moduleId;	//ģ����
	private	String	menuId;	//�����˵�
	private	String	menuName;	//�����˵�����
	private	String	bottomId;	//�����ײ㹦�ܶ���
	private	String	bottomName;	//�����ײ㹦�ܶ�������
	private	String	operateDate;	//��������
	private	String	loginHost;	//��½����
	private	String	mac;	//Mac��ַ
	private	String	operateDesc;	//��ϸ����
    private String employeeName;
    private String systemName;
    private String areaName;
    private String organId;
    private String organName;
    private String staffName;
    

	/**
		�յĹ��췽��
	*/
	public LogVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public LogVO(String partCity, String partYyyymm, long sequenceId, 
            String areaId, String employeeId, String workNo, String systemId, 
            String moduleId, String menuId, String menuName, String bottomId,
            String bottomName, String operateDate, String loginHost, String mac,
            String operateDesc, String areaName, String systemName, String employeeName){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public LogVO(LogVO other){
		if(this != other) {
			this.partCity = other.partCity;
			this.partMM = other.partMM;
			this.sequenceId = other.sequenceId;
			this.areaId = other.areaId;
			this.employeeId = other.employeeId;
			this.workNo = other.workNo;
			this.systemId = other.systemId;
			this.moduleId = other.moduleId;
			this.menuId = other.menuId;
			this.menuName = other.menuName;
			this.bottomId = other.bottomId;
			this.bottomName = other.bottomName;
			this.operateDate = other.operateDate;
			this.loginHost = other.loginHost;
			this.mac = other.mac;
			this.operateDesc = other.operateDesc;
			this.areaName = other.areaName;
            this.employeeName = other.employeeName;
            this.systemName = other.systemName;
		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���õ��б���(����)
	*/
	public void setPartCity(String partCity) {
		this.partCity = partCity;
	}
	/**
		��ȡ���б���(����)
	*/
	public String getPartCity() {
		return (this.partCity);
	}
	/**
		��������(����)��Դ���������
	*/
	public void setPartMM(int partMM) {
		this.partMM = partMM;
	}
	/**
		��ȡ����(����)��Դ���������
	*/
	public int getPartMM() {
		return (this.partMM);
	}
	/**
		�������к�
	*/
	public void setSequenceId(long sequenceId) {
		this.sequenceId = sequenceId;
	}
	/**
		��ȡ���к�
	*/
	public long getSequenceId() {
		return (this.sequenceId);
	}
	/**
		�����������
	*/
	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}
	/**
		��ȡ�������
	*/
	public String getAreaId() {
		return (this.areaId);
	}
	/**
		����ְԱ����
	*/
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	/**
		��ȡְԱ����
	*/
	public String getEmployeeId() {
		return (this.employeeId);
	}
	/**
		���õ�½�˺�
	*/
	public void setWorkNo(String workNo) {
		this.workNo = workNo;
	}
	/**
		��ȡ��½�˺�
	*/
	public String getWorkNo() {
		return (this.workNo);
	}
	/**
		����ϵͳ���
	*/
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}
	/**
		��ȡϵͳ���
	*/
	public String getSystemId() {
		return (this.systemId);
	}
	/**
		����ģ����
	*/
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}
	/**
		��ȡģ����
	*/
	public String getModuleId() {
		return (this.moduleId);
	}
	/**
		���ò����˵�
	*/
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	/**
		��ȡ�����˵�
	*/
	public String getMenuId() {
		return (this.menuId);
	}
	/**
		���ò����˵�����
	*/
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	/**
		��ȡ�����˵�����
	*/
	public String getMenuName() {
		return XMLProperties.prepareXml(this.menuName);
	}
	/**
		���ò����ײ㹦�ܶ���
	*/
	public void setBottomId(String bottomId) {
		this.bottomId = bottomId;
	}
	/**
		��ȡ�����ײ㹦�ܶ���
	*/
	public String getBottomId() {
		return (this.bottomId);
	}
	/**
		���ò����ײ㹦�ܶ�������
	*/
	public void setBottomName(String bottomName) {
		this.bottomName = bottomName;
	}
	/**
		��ȡ�����ײ㹦�ܶ�������
	*/
	public String getBottomName() {
		return XMLProperties.prepareXml(this.bottomName);
	}
	/**
		���ò�������
	*/
	public void setOperateDate(String operateDate) {
		this.operateDate = operateDate;
	}
	/**
		��ȡ��������
	*/
	public String getOperateDate() {
		return (this.operateDate);
	}
	/**
		���õ�½����
	*/
	public void setLoginHost(String loginHost) {
		this.loginHost = loginHost;
	}
	/**
		��ȡ��½����
	*/
	public String getLoginHost() {
		return (this.loginHost);
	}
	/**
		����Mac��ַ
	*/
	public void setMac(String mac) {
		this.mac = mac;
	}
	/**
		��ȡMac��ַ
	*/
	public String getMac() {
		return (this.mac);
	}
    
	/**
		������ϸ����
	*/
	public void setOperateDesc(String operateDesc) {
		this.operateDesc = operateDesc;
	}
	/**
		��ȡ��ϸ����
	*/
	public String getOperateDesc() {
		return XMLProperties.prepareXml(this.operateDesc);
	}

	public String getAreaName()
    {
        return areaName;
    }
    public void setAreaName(String areaName)
    {
        this.areaName = areaName;
    }
    public String getEmployeeName()
    {
        return employeeName;
    }
    public void setEmployeeName(String employeeName)
    {
        this.employeeName = employeeName;
    }
    public String getSystemName()
    {
        return systemName;
    }
    public void setSystemName(String systemName)
    {
        this.systemName = systemName;
    }
    
    
    public String getOrganId() {
		return organId;
	}
	public void setOrganId(String organId) {
		this.organId = organId;
	}
	public String getOrganName() {
		return organName;
	}
	public void setOrganName(String organName) {
		this.organName = organName;
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
			else if(columnName.intern()=="f_part_yyyymm".intern())
				partMM = resultSet.getInt(i);
			else if(columnName.intern()=="f_sequence_id".intern())
				sequenceId = resultSet.getLong(i);
			else if(columnName.intern()=="f_area_id".intern())
				areaId = resultSet.getString(i);
			else if(columnName.intern()=="f_area_name".intern())
				areaName = resultSet.getString(i);
			else if(columnName.intern()=="f_employee_id".intern())
				employeeId = resultSet.getString(i);
			else if(columnName.intern()=="f_work_no".intern())
				workNo = resultSet.getString(i);
			else if(columnName.intern()=="f_system_id".intern())
				systemId = resultSet.getString(i);
			else if(columnName.intern()=="f_system_name".intern())
				systemName = resultSet.getString(i);
			else if(columnName.intern()=="f_module_id".intern())
				moduleId = resultSet.getString(i);
			else if(columnName.intern()=="f_menu_id".intern())
				menuId = resultSet.getString(i);
			else if(columnName.intern()=="f_menu_name".intern())
				menuName = resultSet.getString(i);
			else if(columnName.intern()=="f_bottom_id".intern())
				bottomId = resultSet.getString(i);
			else if(columnName.intern()=="f_bottom_name".intern())
				bottomName = resultSet.getString(i);
			else if(columnName.intern()=="f_operate_date".intern())
				operateDate = DateUtil.stringDateTime(resultSet.getObject(i));
			else if(columnName.intern()=="f_login_host".intern())
				loginHost = resultSet.getString(i);
			else if(columnName.intern()=="f_mac".intern())
				mac = resultSet.getString(i);
			else if(columnName.intern()=="f_operate_desc".intern())
				operateDesc = resultSet.getString(i);
			else if(columnName.intern()=="f_employee_name".intern())
				employeeName = resultSet.getString(i);
			else if(columnName.intern()=="f_organ_id".intern())
				organId = resultSet.getString(i);
			else if(columnName.intern()=="f_organ_name".intern())
				organName = resultSet.getString(i);
			else if(columnName.intern()=="staff_name".intern())
				staffName = resultSet.getString(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		partCity = NullProcessUtil.nvlToString(
			map.get("partCity"),"");
		partMM = Integer.parseInt(NullProcessUtil.nvlToString(
				map.get("partMM"),"0"));
		sequenceId = Long.parseLong(NullProcessUtil.nvlToString(
			map.get("sequenceId"), "-10"));
		areaId = NullProcessUtil.nvlToString(
			map.get("areaId"),"");
		employeeId = NullProcessUtil.nvlToString(
			map.get("employeeId"),"");
		workNo = NullProcessUtil.nvlToString(
			map.get("workNo"),"");
		systemId = NullProcessUtil.nvlToString(
			map.get("systemId"),"");
		moduleId = NullProcessUtil.nvlToString(
			map.get("moduleId"),"");
		menuId = NullProcessUtil.nvlToString(
			map.get("menuId"),"");
		menuName = NullProcessUtil.nvlToString(
			map.get("menuName"),"");
		bottomId = NullProcessUtil.nvlToString(
			map.get("bottomId"),"");
		bottomName = NullProcessUtil.nvlToString(
			map.get("bottomName"),"");
		operateDate = NullProcessUtil.nvlToString(
			map.get("operateDate"),"");
		loginHost = NullProcessUtil.nvlToString(
			map.get("loginHost"),"");
		mac = NullProcessUtil.nvlToString(
			map.get("mac"),"");
		operateDesc = NullProcessUtil.nvlToString(
			map.get("operateDesc"),"");
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<PartCity>").append(nvl(partCity)).append("</PartCity>\n");
		ret.append(str_tab).append("<PartYyyymm>").append(partMM).append("</PartYyyymm>\n");
		ret.append(str_tab).append("<SequenceId>").append(sequenceId).append("</SequenceId>\n");
		ret.append(str_tab).append("<AreaId>").append(nvl(areaId)).append("</AreaId>\n");
		ret.append(str_tab).append("<EmployeeId>").append(nvl(employeeId)).append("</EmployeeId>\n");
		ret.append(str_tab).append("<WorkNo>").append(nvl(workNo)).append("</WorkNo>\n");
		ret.append(str_tab).append("<SystemId>").append(nvl(systemId)).append("</SystemId>\n");
		ret.append(str_tab).append("<ModuleId>").append(nvl(moduleId)).append("</ModuleId>\n");
		ret.append(str_tab).append("<MenuId>").append(nvl(menuId)).append("</MenuId>\n");
		ret.append(str_tab).append("<MenuName>").append(XMLProperties.prepareXml(nvl(menuName))).append("</MenuName>\n");
		ret.append(str_tab).append("<BottomId>").append(nvl(bottomId)).append("</BottomId>\n");
		ret.append(str_tab).append("<BottomName>").append(XMLProperties.prepareXml(nvl(bottomName))).append("</BottomName>\n");
		ret.append(str_tab).append("<OperateDate>").append(nvl(operateDate)).append("</OperateDate>\n");
		ret.append(str_tab).append("<LoginHost>").append(nvl(loginHost)).append("</LoginHost>\n");
		ret.append(str_tab).append("<Mac>").append(nvl(mac)).append("</Mac>\n");
		ret.append(str_tab).append("<OperateDesc>").append(XMLProperties.prepareXml(nvl(operateDesc))).append("</OperateDesc>\n");
        ret.append(str_tab).append("<AreaName>").append(nvl(areaName)).append("</AreaName>\n");
        ret.append(str_tab).append("<EmployeeName>").append(nvl(employeeName)).append("</EmployeeName>\n");
        ret.append(str_tab).append("<SystemName>").append(nvl(systemName)).append("</SystemName>\n");
        return ret.toString();
	}
	public String getStaffName() {
		return staffName;
	}
	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}

}
		
		
		
		
		