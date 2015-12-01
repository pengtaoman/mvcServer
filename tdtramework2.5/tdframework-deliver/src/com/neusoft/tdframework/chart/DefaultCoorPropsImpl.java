/*
 * Created on 2005-1-6
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.chart;

import java.awt.Color;
import java.awt.Font;

import org.jfree.chart.JFreeChart;

/**
 * @author mdj
 *
 * ȱʡֵ
 * 
 */
public final class DefaultCoorPropsImpl implements BaseCoorPropsInter {
    private String coorXName =null;
    private String coorYName =null;
    private Font   chartFont =null;
    private String title = null;
    private String chartName = null;
    private Color bgColor = null;
    private int width;
    private int height;
    
    public final static String  DEFAULT_TOOLTIP_FORMAT="({1}, {0}) = {2}";
    
    public DefaultCoorPropsImpl()
    {
        this.coorXName = "";
        this.coorYName = "";
        this.chartFont = JFreeChart.DEFAULT_TITLE_FONT;
        this.title="";
        this.chartName = "";
        this.bgColor = java.awt.Color.white;
        this.width = 500;
        this.height = 300;
    }

    public void setCoorXName(String coorXName)
    {
//        this.coorXName = coorXName;
    }
    public void setCoorYName(String coolYName)
    {
//        this.coorYName = coolYName;
    }
    
    public String getCoorXName()
    {
        return this.coorXName;
    }
    public String getCoorYName()
    {
        return this.coorYName;
    }
    
    public void setChartFont(Font chartFont)
    {
//        this.chartFont = chartFont;
    }
    public Font getChartFont()
    {
        return this.chartFont;
    }
    
    public void setTitle(String title)
    {
//        this.title = title;
    }
    
    public String getTitle()
    {
        return this.title;
    }
    
    public void setChartName(Comparable chartName)
    {
//        this.chartName = (String)chartName;
    }
    public Comparable getChartName()
    {
        return this.chartName;
    }
    
    public void setBgColor(Color bgColor)
    {
//     this.bgColor = bgColor;   
    }
    public Color getBgColor()
    {
        return this.bgColor;
    }
    
    public void setWidth(int width)
    {
//        this.width = width;
    }
    public int getWidth()
    {
        return this.width;
    }
    
    public void setHeight(int height)
    {
//        this.height = height;
    }
    public int getHeight()
    {
        return this.height;   
    }
}
