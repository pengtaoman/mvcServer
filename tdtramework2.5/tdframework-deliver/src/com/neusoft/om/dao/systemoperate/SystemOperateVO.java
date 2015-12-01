package com.neusoft.om.dao.systemoperate;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title: 系统信息 Description: 定义系统信息结构 Company: neusoft Date: 2004-11-24
 * 
 * @author renh
 * @version
 */
public class SystemOperateVO extends BaseVO {
	/** 系统编码 */
	private String systemId = "";

	/** 系统名称 */
	private String systemName = "";

	/** 系统类型 */
	private String systemType = "";

	/** 系统详细描述 */
	private String detailDesc = "";

	private int portalWinId;

	/**
	 * @return 返回 detailDesc。
	 */
	public String getDetailDesc() {
		return detailDesc;
	}

	/**
	 * @param detailDesc
	 *            要设置的 detailDesc。
	 */
	public void setDetailDesc(String detailDesc) {
		this.detailDesc = detailDesc;
	}

	/**
	 * @return 返回 portalWinId。
	 */
	public int getPortalWinId() {
		return portalWinId;
	}

	/**
	 * @param portalWinId
	 *            要设置的 portalWinId。
	 */
	public void setPortalWinId(int portalWinId) {
		this.portalWinId = portalWinId;
	}

	/**
	 * @return 返回 systemId。
	 */
	public String getSystemId() {
		return systemId;
	}

	/**
	 * @param systemId
	 *            要设置的 systemId。
	 */
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}

	/**
	 * @return 返回 systemName。
	 */
	public String getSystemName() {
		return systemName;
	}

	/**
	 * @param systemName
	 *            要设置的 systemName。
	 */
	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}

	/**
	 * @return 返回 systemType。
	 */
	public String getSystemType() {
		return systemType;
	}

	/**
	 * @param systemType
	 *            要设置的 systemType。
	 */
	public void setSystemType(String systemType) {
		this.systemType = systemType;
	}

	/**
	 * 以SQL的结果集设置数据
	 */
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for (int i = 1; i <= metaData.getColumnCount(); i++) {

			String columnName = metaData.getColumnName(i).toLowerCase();

			if (columnName.intern() == "f_system_id".intern())
				systemId = resultSet.getString(i);
			else if (columnName.intern() == "f_system_name".intern())
				systemName = resultSet.getString(i);
			else if (columnName.intern() == "f_system_type".intern())
				systemType = resultSet.getString(i);
			else if (columnName.intern() == "f_detail_desc".intern())
				detailDesc = resultSet.getString(i);
			else if (columnName.intern() == "f_portal_win_id".intern())
				portalWinId = resultSet.getInt(i);
		}

	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		systemId = NullProcessUtil.nvlToString(
			map.get("systemId"),"");
		systemName = NullProcessUtil.nvlToString(
			map.get("systemName"),"");
		systemType = NullProcessUtil.nvlToString(
			map.get("systemType"),"");
		detailDesc = NullProcessUtil.nvlToString(
			map.get("detailDesc"),"");
		portalWinId = Integer.parseInt(NullProcessUtil.nvlToString(
				map.get("portalWinId"),"-10"));
	}
	
	/**
	 * 空值处理
	 */
	private String nvl(String str) {
		return str == null ? "" : str;
	}

	/**
	 * 转化成字符串
	 */
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<SystemId>").append(nvl(systemId)).append("</SystemId>\n");
		ret.append(str_tab).append("<SystemName>").append(
				XMLProperties.prepareXml(nvl(systemName))).append(
				"</SystemName>\n");
		ret.append(str_tab).append("<SystemType>").append(nvl(systemType))
				.append("</SystemType>\n");
		ret.append(str_tab).append("<DetailDesc>").append(
				XMLProperties.prepareXml(nvl(detailDesc))).append(
				"</DetailDesc>\n");
		ret.append(str_tab).append("<PortalWinId>").append(
				portalWinId).append(
				"</PortalWinId>\n");
		return ret.toString();
	}
}
