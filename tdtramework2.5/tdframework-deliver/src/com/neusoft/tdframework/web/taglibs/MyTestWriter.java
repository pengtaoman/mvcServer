/*
 * Created on 2005-3-4
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.web.taglibs;

import java.io.IOException;
import java.io.Writer;

/**
 * @author chenzt
 *
 * 应用于TAGLIB自测试
 */
public class MyTestWriter extends Writer{

	/* (non-Javadoc)
	 * @see java.io.Writer#close()
	 */
	public void close() throws IOException {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see java.io.Writer#flush()
	 */
	public void flush() throws IOException {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see java.io.Writer#write(char[], int, int)
	 */
	public void write(char[] cbuf, int off, int len) throws IOException {
		// TODO Auto-generated method stub
		
	}
	/* (non-Javadoc)
	 * @see java.io.Writer#write(java.lang.String)
	 */
	public void write(String str) throws IOException {
		System.out.print(str);
	}
	
	/* (non-Javadoc)
	 * @see java.io.Writer#write(int)
	 */
	public void write(int c) throws IOException {
		System.out.print(c);
	}

}
