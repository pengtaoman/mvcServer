package com.neusoft.om.interfase.ebisp.data;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-09-26
 * @author zhaof@neusoft.com
 * @version
 */

public class FrameColl extends ObjectCollection { 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** 
		����һ�� FrameVO ���� 
	*/ 
	public void addFrameVO(FrameVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� FrameVO ���� 
	*/ 
	public FrameVO getFrame(int index) {
		return (FrameVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� FrameVO ���� 
	*/ 
	public void addFrameResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			FrameVO vo = new FrameVO(); 
			vo.setAttribute(resultSet);
			addFrameVO (vo);
		}
	}
	/**
	 * ����frameId�õ�FrameVO
	 * @param frameId
	 * @return
	 */
	public FrameVO getFrameById(int frameId){	
		List list = this.getList();		
		FrameVO vo  = new FrameVO();
		for(int i =0; i < list.size(); i++){
			FrameVO frameVO = this.getFrame(i);
			int frameVOId = frameVO.getFrameId();
			if(frameVOId == frameId){
				vo = frameVO;
			}
		}
		return vo;
	}

}