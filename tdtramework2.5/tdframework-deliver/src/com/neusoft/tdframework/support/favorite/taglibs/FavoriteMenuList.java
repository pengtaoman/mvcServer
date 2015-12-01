/*
 * Created on 2005-2-24
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.support.favorite.taglibs;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.tdframework.support.favorite.dao.FavoriteColl;
import com.neusoft.tdframework.support.favorite.dao.FavoriteVO;
import com.neusoft.tdframework.web.taglibs.BaseXMLTagLib;

/**
 * @author chenzt
 *
 * 收藏信息清单
 * 
 */
public class FavoriteMenuList extends BaseXMLTagLib {
	
	FavoriteColl coll = null;
	
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.taglibs.BaseXMLTagLib#init(javax.servlet.http.HttpServletRequest)
	 */
	protected void init(HttpServletRequest request) {
		coll = (FavoriteColl)request.getAttribute(FavoriteColl.REQUEST_ATTRIBUTE);		
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.taglibs.BaseXMLTagLib#createTagBody()
	 */
	protected void createTagBody() throws IOException {
		
		if(isDebug()) { 
			test();return;
		}
		
		if(coll==null || coll.getRowCount()==0) return;
		
		write("<frameFavoriteColl>\n");
		for(int i=0,j=coll.getRowCount();i<j;i++) {
			write("<frameFavorite>\n");
			FavoriteVO vo = coll.getFavorite(i);
			writeXMLTag("menuId",vo.getMenuId());
			writeXMLTag("systemId",vo.getSystemId());
			writeXMLTag("favoriteName",vo.getFavoriteName());
			//writeXMLTag("pageLink",vo.getPageLink());
			writeXMLTag("favoriteOrder",String.valueOf(vo.getFavoriteOrder()));
			write("</frameFavorite>\n");
		}
		write("</frameFavoriteColl>\n");
	}
	
	private void test() throws IOException {
		StringBuffer buffer = new StringBuffer();
		buffer.append("<frameFavoriteColl>						\n");
		buffer.append("	<frameFavorite>                         \n");
		buffer.append("		<menuId>01</menuId>                 \n");
		buffer.append("		<employeeId>001</employeeId>        \n");
		buffer.append("		<systemId>16</systemId>             \n");
		buffer.append("		<favoriteName>收藏1</favoriteName>  \n");
		buffer.append("		<favoriteOrder>1</favoriteOrder>    \n");
		buffer.append("		<pageLink>aqaaa</pageLink>          \n");
		buffer.append("	</frameFavorite>                        \n");
		buffer.append("	<frameFavorite>                         \n");
		buffer.append("		<menuId>02</menuId>                 \n");
		buffer.append("		<employeeId>001</employeeId>        \n");
		buffer.append("		<systemId>16</systemId>             \n");
		buffer.append("		<favoriteName>收藏2</favoriteName>  \n");
		buffer.append("		<favoriteOrder>1</favoriteOrder>    \n");
		buffer.append("		<pageLink>bbbb</pageLink>           \n");
		buffer.append("	</frameFavorite>                        \n");
		buffer.append("</frameFavoriteColl>                     \n");
		write(buffer.toString());
	}
	
	public static void main(String args[]) {
		
		printTagConfig("favorateMenuList",FavoriteMenuList.class);
	}
}
