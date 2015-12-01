package com.neusoft.tdframework.common.util;

import javax.servlet.http.HttpServletRequest;

import org.ecside.util.RequestUtil;

/**
 * Title: GridUtil
 * Description: ��ȡ��ҳʱ����ʼ�����ͽ�������������
 * Company: neusoft
 * Date: 
 * @author yang-lm
 * @version 1.0
 */
public class GridUtil {
	/**
	**��ȡ��ҳʱ����ʼ�����ͽ�������,��1��ʼ
	*/
	
	
	
    public static int[] getStartEnd(HttpServletRequest request, int totalRows,int defaultPageSize) {
    	
    	return RequestUtil.getRowStartEnd(request, totalRows, defaultPageSize);
	}
    /**
	**��ȡ��ҳʱ����ʼ�����ͽ�������,�Զ��忪ʼ�к�
	*/
	public static int[] getStartEnd(HttpServletRequest request, int totalRows,int defaultPageSize,int offSet) {
		
		return RequestUtil.getRowStartEnd(request, totalRows, defaultPageSize,offSet);
	} 
	
	public static int getPageNo(HttpServletRequest request) {
		
		return RequestUtil.getPageNo(request);
	}
	/**
	**��ȡ������
	*/
	public static int getTotalRowsFromRequest(HttpServletRequest request){
		
		return RequestUtil.getTotalRowsFromRequest(request);
		
    }
}
