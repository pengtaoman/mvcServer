/*
 * Created on 2005-1-4
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.chart;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Locale;

import javax.servlet.http.HttpSession;
  
import org.jfree.chart.ChartRenderingInfo;
import org.jfree.chart.ChartUtilities;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.CategoryAxis;
import org.jfree.chart.axis.DateAxis;
import org.jfree.chart.axis.NumberAxis;
import org.jfree.chart.axis.ValueAxis;
import org.jfree.chart.entity.StandardEntityCollection;
import org.jfree.chart.labels.StandardCategoryToolTipGenerator;
import org.jfree.chart.labels.StandardXYToolTipGenerator;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.Plot;
import org.jfree.chart.plot.XYPlot;
import org.jfree.chart.renderer.category.BarRenderer;
import org.jfree.chart.renderer.xy.StandardXYItemRenderer;
import org.jfree.chart.servlet.ServletUtilities;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;

/**
 * @author mdj
 *
 * 画柱形图
 *  
 */
public final class BaseChartImpl implements BaseChartInter {
	
	private final int length = 30;
    public ChartData drawChart(BaseChartDataSetInter dataSet,
			BaseCoorPropsInter coorProps,
            HttpSession session
            ) throws BaseChartException
            {
				String filename = null;
				ChartData chartData = null;
				try {
					if (dataSet.getBaseDataSet() == null || dataSet.getBaseDataSet().size() == 0) {
						throw new BaseChartException("数据为空!");
					}
					/*提供缺省值*/
					if( coorProps == null )coorProps = new DefaultCoorPropsImpl();
					/*创建default dataSet*/
					Iterator iter = dataSet.getBaseDataSet().listIterator();
		            DefaultCategoryDataset dataset = new DefaultCategoryDataset();
					while (iter.hasNext()) {
					    BaseChartDataInter baseData = (BaseChartDataInter)iter.next();
		                dataset.addValue(baseData.getColCount(), coorProps.getChartName(),baseData.getRowName());
					}
					// 创建Chart Object
					CategoryAxis categoryAxis = new CategoryAxis(coorProps.getCoorXName());
					ValueAxis valueAxis = new NumberAxis(coorProps.getCoorYName());
					BarRenderer renderer = new BarRenderer();
					renderer.setItemURLGenerator(null);
		            renderer.setToolTipGenerator(new StandardCategoryToolTipGenerator(DefaultCoorPropsImpl.DEFAULT_TOOLTIP_FORMAT,NumberFormat.getInstance()));
					setBarWidth(renderer,coorProps.getWidth(),dataSet.getBaseDataSet().size());
					Plot plot = new CategoryPlot(dataset, categoryAxis, valueAxis, renderer);
					JFreeChart chart = new JFreeChart(coorProps.getTitle(), coorProps.getChartFont()==null?JFreeChart.DEFAULT_TITLE_FONT:coorProps.getChartFont(), plot, false);
					chart.setBackgroundPaint(coorProps.getBgColor()==null?java.awt.Color.white:coorProps.getBgColor());
		
					// 写文件到临时文件夹
					ChartRenderingInfo info = new ChartRenderingInfo(new StandardEntityCollection());
					filename = ServletUtilities.saveChartAsPNG(chart, coorProps.getWidth(),coorProps.getHeight(), info, session);
		
					// 生成返回chart数据
					chartData = new ChartData(filename,ChartUtilities.getImageMap(filename,info) );
		
				} catch (Exception e) {
				    throw new BaseChartException(e);
				}
				return chartData;        
            }
	public  ChartData drawLineChart(BaseChartDataSetInter dataSet,
			BaseCoorPropsInter coorProps,
            HttpSession session 
            ) throws BaseChartException{
		String filename = null;
		ChartData chartData = null;
		try {

			// 空数据检测
			if (dataSet.getBaseDataSet().size() == 0) {
				throw new BaseChartException("数据为空!");
			}
			/*提供缺省值*/
			if( coorProps == null )coorProps = new DefaultCoorPropsImpl();
			//  创建一个XY序列
			XYSeries dataSeries = new XYSeries((String)coorProps.getChartName());
			Iterator iter = dataSet.getBaseDataSet().listIterator();
			while (iter.hasNext()) {
			    BaseChartDataInter baseData = (BaseChartDataInter)iter.next();
			    if( baseData.getRowName() instanceof Number )
			        dataSeries.add(((Number)baseData.getRowName()).longValue(),baseData.getColCount());
			    else if( baseData.getRowName() instanceof Date )
			        dataSeries.add(((Date)baseData.getRowName()).getTime(),baseData.getColCount());
			    else throw new BaseChartException("输入的图形的X坐标的类型目前不支持!");
			}
			XYSeriesCollection xyDataset = new XYSeriesCollection(dataSeries);
			//创建一个提示对象
			StandardXYToolTipGenerator ttg = null;

			//  创建chart对象
			ValueAxis xAxis = null;
		    if( ((BaseChartDataInter)dataSet.getBaseDataSet().get(0)).getRowName() instanceof Number )
		    {
		        xAxis = new NumberAxis(coorProps.getCoorXName());
		    	ttg = new StandardXYToolTipGenerator();
		    }
		    else if( ((BaseChartDataInter)dataSet.getBaseDataSet().get(0)).getRowName() instanceof Date )
		    {
		        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.PRC);
		        xAxis = new DateAxis(coorProps.getCoorXName());
		        ((DateAxis)xAxis).setDateFormatOverride(sdf);
		        ttg = new StandardXYToolTipGenerator(
						StandardXYToolTipGenerator.DEFAULT_TOOL_TIP_FORMAT,
	                    sdf, NumberFormat.getInstance());
		    }
		    else throw new BaseChartException("输入的图形的X坐标的类型目前不支持!");
			
			NumberAxis valueAxis = new NumberAxis(coorProps.getCoorYName());
			valueAxis.setAutoRangeIncludesZero(false);  // override default
            StandardXYItemRenderer renderer = new StandardXYItemRenderer(
                    StandardXYItemRenderer.LINES + StandardXYItemRenderer.SHAPES,
                    ttg, null);
            renderer.setShapesFilled(true);
			XYPlot plot = new XYPlot(xyDataset, xAxis, valueAxis, renderer);
			JFreeChart chart = new JFreeChart(coorProps.getTitle(), coorProps.getChartFont()==null?JFreeChart.DEFAULT_TITLE_FONT:coorProps.getChartFont(), plot, false);
			chart.setBackgroundPaint(coorProps.getBgColor()==null?java.awt.Color.white:coorProps.getBgColor());

			//  写文件到临时文件夹中
			ChartRenderingInfo info = new ChartRenderingInfo(new StandardEntityCollection());
			filename = ServletUtilities.saveChartAsPNG(chart, coorProps.getWidth(),coorProps.getHeight(), info, session);

			// 生成返回chart数据
			chartData = new ChartData(filename,ChartUtilities.getImageMap(filename,info) );

		} catch (Exception e) {
			throw new BaseChartException(e);
		}
		return chartData;
	}
	public ChartData drawPieChart(BaseChartDataSetInter dataSet,
			BaseCoorPropsInter coorProps,
            HttpSession session
            ) throws BaseChartException
	{
	    return null;
	}
	
	public ChartData drawCategoryChart(BaseChartDataSetInter dataSet,
					BaseCoorPropsInter coorProps,
					HttpSession session
					) throws BaseChartException{
			String filename = null;
			ChartData chartData = null;
		try {
				if (dataSet.getBaseDataSet() == null || dataSet.getBaseDataSet().size() == 0) {
						throw new BaseChartException("数据为空!");
				}
				/*提供缺省值*/
				if( coorProps == null )coorProps = new DefaultCoorPropsImpl();
				/*创建default dataSet*/
				Iterator iter = dataSet.getBaseDataSet().listIterator();
				DefaultCategoryDataset dataset = new DefaultCategoryDataset();
				while (iter.hasNext()) {
					BaseChartDataInter baseData = (BaseChartDataInter)iter.next();
					dataset.addValue(baseData.getColCount(),baseData.getCategoryName(),baseData.getRowName());
				}
					// 创建Chart Object
					CategoryAxis categoryAxis = new CategoryAxis(coorProps.getCoorXName());
					ValueAxis valueAxis = new NumberAxis(coorProps.getCoorYName());
					BarRenderer renderer = new BarRenderer();
					renderer.setItemURLGenerator(null);
					renderer.setToolTipGenerator(new StandardCategoryToolTipGenerator(DefaultCoorPropsImpl.DEFAULT_TOOLTIP_FORMAT,NumberFormat.getInstance()));
		            
					Plot plot = new CategoryPlot(dataset, categoryAxis, valueAxis, renderer);
					JFreeChart chart = new JFreeChart(coorProps.getTitle(), coorProps.getChartFont()==null?JFreeChart.DEFAULT_TITLE_FONT:coorProps.getChartFont(), plot, true);
					chart.setBackgroundPaint(coorProps.getBgColor()==null?java.awt.Color.white:coorProps.getBgColor());
		
					// 写文件到临时文件夹
					ChartRenderingInfo info = new ChartRenderingInfo(new StandardEntityCollection());
					filename = ServletUtilities.saveChartAsPNG(chart, coorProps.getWidth(),coorProps.getHeight(), info, session);
		
					// 生成返回chart数据
					chartData = new ChartData(filename,ChartUtilities.getImageMap(filename,info) );
		
				} catch (Exception e) {
						throw new BaseChartException(e);
				}
			return chartData; 		
	}
	
	private void setBarWidth(BarRenderer render, int width, int sum)
	{
		if( sum == 0 ) return;
		if( width/sum > length )
				render.setMaximumBarWidth((double)(length/((double)width/(double)sum)));
		        //render.setMaximumBarWidth((double)(length/((double)width/(double)sum)));
	}
	
}
