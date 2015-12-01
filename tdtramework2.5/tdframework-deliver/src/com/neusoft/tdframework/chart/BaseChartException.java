/**
 * @author mdj
 *
 * Òì³£½Ó¿Ú 
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