package com.neusoft.om.dao.region;

import java.sql.ResultSet;
import java.sql.SQLException;
import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-11-01
 * @author renh
 * @version 
 */
public class CommonRegionColl extends ObjectCollection {

	public void addCommonRegionVO(CommonRegionVO vo){
		addElement(vo);
	}
	
	public void addCommonRegionVO(int index,CommonRegionVO vo){
		addElement(index,vo);
	}
	/**
	 * 根据行号获取area
	 * @param index
	 */
	public CommonRegionVO getCommonRegionVO(int index) {
		return (CommonRegionVO)getElement(index);
	}
	
	/**
	 * 用户ResultSet对象增加多个OrganPersonVO 对象
	 */
	public void addCommonRegion(ResultSet resultSet) throws SQLException {
		while (resultSet.next()) {
			CommonRegionVO vo = new CommonRegionVO();
			vo.setAttribute(resultSet);
			addCommonRegionVO(vo);
		}
	}
	
	public boolean existRegion(long regionId){
		boolean exist = false;
		if(this != null ){
			for(int i=0; i <this.getRowCount();i++){
				CommonRegionVO vo = this.getCommonRegionVO(i);
				if(vo.getCommonRegionId() ==  regionId){
					exist = true;
				}
			}
		}
		return exist;
	}
	
}
