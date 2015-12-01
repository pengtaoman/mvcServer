package com.neusoft.om.interfase.ebisp.data;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-11-13
 * @author zhaof@neusoft.com
 * @version
 */

public class FrameRelViewColl extends ObjectCollection { 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** 
		增加一个 FrameRelViewVO 对象 
	*/ 
	public void addFrameRelViewVO(FrameRelViewVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 FrameRelViewVO 对象 
	*/ 
	public FrameRelViewVO getFrameRelView(int index) {
		return (FrameRelViewVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 FrameRelViewVO 对象 
	*/ 
	public void addFrameRelViewResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			FrameRelViewVO vo = new FrameRelViewVO(); 
			vo.setAttribute(resultSet);
			addFrameRelViewVO (vo);
		}
	}
    /**
     * 返回row行，col列处的FrameRelViewVO
     * @param row
     * @param col
     * @return
     */
	public FrameRelViewVO getFrameRelViewVOAt(int row,int col){
		FrameRelViewVO vo = null;
		for(int i=0; i <this.getRowCount(); i++){
			FrameRelViewVO tempVO = this.getFrameRelView(i);
			int rowNum = tempVO.getRowNum();
			int colNum = tempVO.getColNum();
			if(rowNum == row && colNum == col ){
				vo = new FrameRelViewVO();
				vo = tempVO;
			}
		}
		return vo;
	}
}