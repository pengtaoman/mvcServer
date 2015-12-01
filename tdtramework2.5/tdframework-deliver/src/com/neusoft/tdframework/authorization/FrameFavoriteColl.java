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

public class FrameFavoriteColl extends ObjectCollection { 
	/** 
		增加一个 FavoriteVO 对象 
	*/ 
	public void addFavoriteVO(FrameFavoriteVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 FavoriteVO 对象 
	*/ 
	public FrameFavoriteVO getFavorite(int index) {
		return (FrameFavoriteVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 FavoriteVO 对象 
	*/ 
	public void addFavoriteResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			FrameFavoriteVO vo = new FrameFavoriteVO(); 
			vo.setAttribute(resultSet);
			addFavoriteVO (vo);
		}
	}
	
	/**
	 * 获取XML数据信息
	 * @return
	 */
	public String getXML () {
		
		StringBuffer buffer = new StringBuffer();
		
		buffer.append("<frameFavoriteColl>\n");
		for(int i=0;i<getRowCount();i++) {
			buffer.append(getFavorite(i).getXML());
		}
		buffer.append("</frameFavoriteColl>\n");
		
		return buffer.toString();
	}
	
}