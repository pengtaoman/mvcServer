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
		增加一个 WorkVO 对象 
	*/ 
	public void addWorkVO(FrameWorkVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 WorkVO 对象 
	*/ 
	public FrameWorkVO getWork(int index) {
		return (FrameWorkVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 Work 对象 
	*/ 
	public void addWork(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			FrameWorkVO vo = new FrameWorkVO(); 
			vo.setAttribute(resultSet);
			addWorkVO (vo);
		}
	}
	
	/**
	 * 获取XML数据格式
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