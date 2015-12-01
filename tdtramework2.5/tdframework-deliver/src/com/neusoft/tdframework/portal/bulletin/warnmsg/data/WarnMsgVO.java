package com.neusoft.tdframework.portal.bulletin.warnmsg.data;

import com.neusoft.tdframework.common.data.BaseVO;

public class WarnMsgVO extends BaseVO{
    private String bulletinID;    //公告编号
    private String bulletinTitle; //公告标题
    private String bulletinType;  //公告类型
    private String bulletinTypeId;  //公告类型Id
    public String getBulletinID() {
        return bulletinID;
    }

    public String getBulletinTitle() {
        return bulletinTitle;
    }

    public String getBulletinType() {
        return bulletinType;
    }

    public void setBulletinID(String bulletinID) {
        this.bulletinID = bulletinID;
    }

    public void setBulletinTitle(String bulletinTitle) {
        this.bulletinTitle = bulletinTitle;
    }

    public void setBulletinType(String bulletinType) {
        this.bulletinType = bulletinType;
    }

	/**
	 * @return the bulletinTypeId
	 */
	public String getBulletinTypeId() {
		return bulletinTypeId;
	}

	/**
	 * @param bulletinTypeId the bulletinTypeId to set
	 */
	public void setBulletinTypeId(String bulletinTypeId) {
		this.bulletinTypeId = bulletinTypeId;
	}

}
