/**
 * @author mdj
 *
 * �쳣�ӿ� 
 */
package com.neusoft.tdframework.chart;

public class BaseChartException extends Exception {
	public BaseChartException(String msg) {
		  super(msg);
		}

		public BaseChartException(Exception e){
		  this(e.getMessage());
		}
}