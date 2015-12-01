package com.neusoft.tdframework.common.util;

import javax.servlet.http.HttpServletRequest;

import org.ecside.util.RequestUtil;

/**
 * Title: GridUtil
 * Description: 获取翻页时的起始行数和结束行数工具类
 * Company: neusoft
 * Date: 
 * @author yang-lm
 * @version 1.0
 */
public class GridUtil {
	/**
	**获取翻页时的起始行数和结束行数,从1开始
	*/
	
	
	
    public static int[] getStartEnd(HttpServletRequest request, int totalRows,int defaultPageSize) {
    	
    	return RequestUtil.getRowStartEnd(request, totalRows, defaultPageSize);
	}
    /**
	**获取翻页时的起始行数和结束行数,自定义开始行号
	*/
	public static int[] getStartEnd(HttpServletRequest request, int totalRows,int defaultPageSize,int offSet) {
		
		return RequestUtil.getRowStartEnd(request, totalRows, defaultPageSize,offSet);
	} 
	
	public static int getPageNo(HttpServletRequest request) {
		
		return RequestUtil.getPageNo(request);
	}
	/**
	**获取总行数
	*/
	public static int getTotalRowsFromRequest(HttpServletRequest request){
		
		return RequestUtil.getTotalRowsFromRequest(request);
		
    }
}
