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
		����һ�� WindowRelFrameVO ���� 
	*/ 
	public void addWindowRelFrameVO(WindowRelFrameVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� WindowRelFrameVO ���� 
	*/ 
	public WindowRelFrameVO getWindowRelFrame(int index) {
		return (WindowRelFrameVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� WindowRelFrameVO ���� 
	*/ 
	public void addWindowRelFrameResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			WindowRelFrameVO vo = new WindowRelFrameVO(); 
			vo.setAttribute(resultSet);
			addWindowRelFrameVO (vo);
		}
	}

    /**
     * �ж���rowNum��colNum���Ƿ��ǿ����
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
     * ������rowNum��colNum���Ŀ�����WindowRelFrameVO������
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
     * ������rowNum��colNum���Ŀ�ܵ�WindowRelFrameVO
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