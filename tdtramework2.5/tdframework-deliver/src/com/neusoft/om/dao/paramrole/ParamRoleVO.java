package com.neusoft.om.dao.paramrole; 

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
 * Date: 2006-07-12
 * @author ren.hui@neusoft.com
 * @version
 */

public class ParamRoleVO extends BaseVO { 
 	private	int	roleId;	//������ɫ����
	private	String	roleName;	//������ɫ����
	private	String	creater;	//������
	private	int	usableFlag;	//�Ƿ����ʹ��Ȩ 0��û��  1����
	private	int	adminFlag;	//�Ƿ���й���Ȩ 0��û��  1����
	private    int ifCreater;//0����  1;��
	
	
	/**
		�յĹ��췽��
	*/
	public ParamRoleVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public ParamRoleVO(int roleId, String roleName, String creater){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public ParamRoleVO(ParamRoleVO other){
		if(this != other) {
			this.roleId = other.roleId;
			this.roleName = other.roleName;
			this.creater = other.creater;
            this.adminFlag=other.adminFlag;
            this.usableFlag=other.usableFlag;
            this.ifCreater=other.ifCreater;
		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���ò�����ɫ����
	*/
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	/**
		��ȡ������ɫ����
	*/
	public int getRoleId() {
		return (this.roleId);
	}
	/**
		���ò�����ɫ����
	*/
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	/**
		��ȡ������ɫ����
	*/
	public String getRoleName() {
		return (this.roleName);
	}
	/**
		���ô�����
	*/
	public void setCreater(String creater) {
		this.creater = creater;
	}
	/**
		��ȡ������
	*/
	public String getCreater() {
		return (this.creater);
	}

	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_role_id".intern())
				roleId = resultSet.getInt(i);
			else if(columnName.intern()=="f_role_name".intern())
				roleName = resultSet.getString(i);
			else if(columnName.intern()=="f_creater".intern())
				creater = resultSet.getString(i);
			else if(columnName.intern()=="f_usable_flag".intern())
				usableFlag = resultSet.getInt(i);
			else if(columnName.intern()=="f_admin_flag".intern())
				adminFlag = resultSet.getInt(i);
			else if(columnName.intern()=="f_if_creater".intern())
				ifCreater = resultSet.getInt(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		roleId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("roleId"), "-10"));
		roleName = NullProcessUtil.nvlToString(
			map.get("roleName"),"");
		creater = NullProcessUtil.nvlToString(
			map.get("creater"),"");
		
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<roleId>").append(roleId).append("</roleId>\n");
		ret.append(str_tab).append("<roleName>").append(nvl(roleName)).append("</roleName>\n");
		ret.append(str_tab).append("<creater>").append(nvl(creater)).append("</creater>\n");
		return ret.toString();
	}

    /**
     * @return ���� adminFlag��
     */
    public int getAdminFlag() {
        return adminFlag;
    }
    /**
     * @param adminFlag Ҫ���õ� adminFlag��
     */
    public void setAdminFlag(int adminFlag) {
        this.adminFlag = adminFlag;
    }
    /**
     * @return ���� ifCreater��
     */
    public int getIfCreater() {
        return ifCreater;
    }
    /**
     * @param ifCreater Ҫ���õ� ifCreater��
     */
    public void setIfCreater(int ifCreater) {
        this.ifCreater = ifCreater;
    }
    /**
     * @return ���� usableFlag��
     */
    public int getUsableFlag() {
        return usableFlag;
    }
    /**
     * @param usableFlag Ҫ���õ� usableFlag��
     */
    public void setUsableFlag(int usableFlag) {
        this.usableFlag = usableFlag;
    }
}
