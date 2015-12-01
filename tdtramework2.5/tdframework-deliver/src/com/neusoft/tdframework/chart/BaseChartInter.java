/*
 * Created on 2005-1-4
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.chart;

import javax.servlet.http.HttpSession;


/**
 * @author mdj
 *
 * ≥ÈœÛª≠Õº¿‡
 */
public interface BaseChartInter {
    
 
    public ChartData drawChart(BaseChartDataSetInter dataSet,
            				BaseCoorPropsInter coorProps,
                            HttpSession session
                            ) throws BaseChartException;
	public ChartData drawLineChart(BaseChartDataSetInter dataSet,
			BaseCoorPropsInter coorProps,
            HttpSession session
            ) throws BaseChartException;    
	public ChartData drawPieChart(BaseChartDataSetInter dataSet,
			BaseCoorPropsInter coorProps,
            HttpSession session 
            ) throws BaseChartException;
	public ChartData drawCategoryChart(BaseChartDataSetInter dataSet,
				BaseCoorPropsInter coorProps,
				HttpSession session
				) throws BaseChartException;    
}
