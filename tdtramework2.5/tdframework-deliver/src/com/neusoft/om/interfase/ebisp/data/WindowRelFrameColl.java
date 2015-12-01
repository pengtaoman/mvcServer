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

public class WindowRelFrameColl extends ObjectCollection { 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** 
		增加一个 WindowRelFrameVO 对象 
	*/ 
	public void addWindowRelFrameVO(WindowRelFrameVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 WindowRelFrameVO 对象 
	*/ 
	public WindowRelFrameVO getWindowRelFrame(int index) {
		return (WindowRelFrameVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 WindowRelFrameVO 对象 
	*/ 
	public void addWindowRelFrameResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			WindowRelFrameVO vo = new WindowRelFrameVO(); 
			vo.setAttribute(resultSet);
			addWindowRelFrameVO (vo);
		}
	}

    /**
     * 判断行rowNum列colNum处是否是框架组
     * @param windowRelFrameColl
     * @param rowNum
     * @param colNum
     * @return
     */
	public boolean isFrameGroupAt(int rowNum, int colNum) {
		boolean isGroup = false;		
		for(int i=0; i <this.getRowCount(); i++){
			WindowRelFrameVO vo = this.getWindowRelFrame(i);
			int voColNum = vo.getColNum();
			int voRowNum = vo.getRowNum();
			if(voColNum == colNum && voRowNum == rowNum){
				String group = vo.getFrameGroup();
				if(group != null && !group.trim().equals("")){
					isGroup = true;
				}
			}			
		}
		return isGroup;
	}
    /**
     * 返回行rowNum列colNum处的框架组的WindowRelFrameVO的数组
     * @param windowRelFrameColl
     * @param rowNum
     * @param colNum
     * @return
     */
	public WindowRelFrameVO[] getWindowRelFrameVOsAt(int rowNum, int colNum) {
		int arryLength = 0;
		int j = 0;
		for(int i=0; i < this.getRowCount(); i++){
			WindowRelFrameVO vo = this.getWindowRelFrame(i); 
			int voColNum = vo.getColNum();
			int voRowNum = vo.getRowNum();
			if(voColNum == colNum && voRowNum == rowNum){
				String group = vo.getFrameGroup();
				if(group != null && !group.trim().equals("")){
					//winRelFramArry[arryLength] = vo;
					arryLength++;
				}
			}			
		}
		WindowRelFrameVO[] winRelFramArry = new WindowRelFrameVO[arryLength];
		for(int i=0; i < this.getRowCount(); i++){
			WindowRelFrameVO vo = this.getWindowRelFrame(i); 
			int voColNum = vo.getColNum();
			int voRowNum = vo.getRowNum();
			if(voColNum == colNum && voRowNum == rowNum){
				String group = vo.getFrameGroup();
				if(group != null && !group.trim().equals("")){
					winRelFramArry[j] = vo;
					j++;
				}
			}			
		}
		
		return winRelFramArry;
	}
    /**
     * 返回行rowNum列colNum处的框架的WindowRelFrameVO
     * @param windowRelFrameColl
     * @param rowNum
     * @param colNum
     * @return
     */
	public WindowRelFrameVO getWindowRelFrameVOAt(int rowNum, int colNum) {
		WindowRelFrameVO windowRelFrameVO = null;
		for(int i=0; i < this.getRowCount(); i++){
			WindowRelFrameVO vo = this.getWindowRelFrame(i); 
			int voColNum = vo.getColNum();
			int voRowNum = vo.getRowNum();
			if(voColNum == colNum && voRowNum == rowNum){
				String group = vo.getFrameGroup();
				if(group == null || group.trim().equals("")){
					windowRelFrameVO = new WindowRelFrameVO();
					windowRelFrameVO = vo;
				}
			}
		}
		return windowRelFrameVO;
	}

}