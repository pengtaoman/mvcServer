package com.neusoft.tdframework.authorization; 

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2004-12-14
 * @author ren.hui@neusoft.com
 * @version
 */

public class FrameWorkColl extends ObjectCollection { 
	/** 
		����һ�� WorkVO ���� 
	*/ 
	public void addWorkVO(FrameWorkVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� WorkVO ���� 
	*/ 
	public FrameWorkVO getWork(int index) {
		return (FrameWorkVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� Work ���� 
	*/ 
	public void addWork(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			FrameWorkVO vo = new FrameWorkVO(); 
			vo.setAttribute(resultSet);
			addWorkVO (vo);
		}
	}
	
	/**
	 * ��ȡXML���ݸ�ʽ
	 *
	 */
	public String getXML() {
		StringBuffer buffer = new StringBuffer();
		buffer.append("<frameWorkColl>\n");
		for(int i=0;i<getRowCount();i++) {
			buffer.append(getWork(i).getXML());
		}
		buffer.append("</frameWorkColl>\n");
		return buffer.toString();
	}
	
}