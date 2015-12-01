package com.neusoft.tdframework.support.favorite.dao; 

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

public class FavoriteColl extends ObjectCollection { 
	public static final String REQUEST_ATTRIBUTE = FavoriteColl.class.getName();
	
	/** 
		����һ�� FavoriteVO ���� 
	*/ 
	public void addFavoriteVO(FavoriteVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� FavoriteVO ���� 
	*/ 
	public FavoriteVO getFavorite(int index) {
		return (FavoriteVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� FavoriteVO ���� 
	*/ 
	public void addFavoriteResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			FavoriteVO vo = new FavoriteVO(); 
			vo.setAttribute(resultSet);
			addFavoriteVO (vo);
		}
	}

}