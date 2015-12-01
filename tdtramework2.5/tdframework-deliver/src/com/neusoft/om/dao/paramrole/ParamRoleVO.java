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
 	private	int	roleId;	//参数角色编码
	private	String	roleName;	//参数角色名称
	private	String	creater;	//创建者
	private	int	usableFlag;	//是否具有使用权 0：没有  1：有
	private	int	adminFlag;	//是否具有管理权 0：没有  1：有
	private    int ifCreater;//0：是  1;否
	
	
	/**
		空的构造方法
	*/
	public ParamRoleVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public ParamRoleVO(int roleId, String roleName, String creater){

	}
	/**
		通过一个已有对象构造一个对象
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
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置参数角色编码
	*/
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	/**
		获取参数角色编码
	*/
	public int getRoleId() {
		return (this.roleId);
	}
	/**
		设置参数角色名称
	*/
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	/**
		获取参数角色名称
	*/
	public String getRoleName() {
		return (this.roleName);
	}
	/**
		设置创建者
	*/
	public void setCreater(String creater) {
		this.creater = creater;
	}
	/**
		获取创建者
	*/
	public String getCreater() {
		return (this.creater);
	}

	/**
		以SQL的结果集设置数据
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
	* 通过MAP初始化信息
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
		转化成字符串
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
     * @return 返回 adminFlag。
     */
    public int getAdminFlag() {
        return adminFlag;
    }
    /**
     * @param adminFlag 要设置的 adminFlag。
     */
    public void setAdminFlag(int adminFlag) {
        this.adminFlag = adminFlag;
    }
    /**
     * @return 返回 ifCreater。
     */
    public int getIfCreater() {
        return ifCreater;
    }
    /**
     * @param ifCreater 要设置的 ifCreater。
     */
    public void setIfCreater(int ifCreater) {
        this.ifCreater = ifCreater;
    }
    /**
     * @return 返回 usableFlag。
     */
    public int getUsableFlag() {
        return usableFlag;
    }
    /**
     * @param usableFlag 要设置的 usableFlag。
     */
    public void setUsableFlag(int usableFlag) {
        this.usableFlag = usableFlag;
    }
}
