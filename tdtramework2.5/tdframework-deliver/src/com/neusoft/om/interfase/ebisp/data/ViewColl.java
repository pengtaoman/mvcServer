package com.neusoft.om.interfase.ebisp.data;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-09-26
 * @author zhaof@neusoft.com
 * @version
 */

public class ViewColl extends ObjectCollection { 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** 
		增加一个 ViewVO 对象 
	*/ 
	public void addViewVO(ViewVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 ViewVO 对象 
	*/ 
	public ViewVO getView(int index) {
		return (ViewVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 ViewVO 对象 
	*/ 
	public void addViewResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			ViewVO vo = new ViewVO(); 
			vo.setAttribute(resultSet);
			addViewVO (vo);
		}
	}
	/**
	 * 根据viewId得到ViewVO
	 * @param viewId
	 * @return
	 */
	public ViewVO getViewById(int viewId){
		ViewVO vo = new ViewVO();
		for(int i = 0; i < this.getRowCount(); i++){
			ViewVO viewVo = this.getView(i);
			if(viewId == viewVo.getViewId()){
				vo = viewVo;
			}			
		}
		return vo;
	}

}