package com.neusoft.tdframework.common.util;

import java.io.Reader;
import java.io.Writer;

import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;

import com.yahoo.platform.yui.compressor.JavaScriptCompressor;

public class WebOptimization {
	
	/**
	 * 使用yuicopressor对js进行压缩
	 * @param reader
	 * @param write
	 * @throws Exception
	 */
	public static void compressJS(Reader reader, Writer write) throws Exception {

		JavaScriptCompressor jc = new JavaScriptCompressor(reader, new ErrorReporter() {
			
			public void warning(
				String message, String sourceName, int line, String lineSource, int lineOffset) {

				if (line < 0) {
					// System.err.println("\n[WARNING] " + message);
				} else {
					// System.err.println("\n[WARNING] " + line + ':' + lineOffset + ':' + message);
				} 
			}
			
			public void error(
				String message, String sourceName, int line, String lineSource, int lineOffset) {

				if (line < 0) {
					System.err.println("\n[ERROR] " + message);
				} else {
					System.err.println("\n[ERROR] " + line + ':' + lineOffset + ':' + message);
				}
			}
			
			public EvaluatorException runtimeError(
				String message, String sourceName, int line, String lineSource, int lineOffset) {

				error(message, sourceName, line, lineSource, lineOffset);
				return new EvaluatorException(message);
			}
		});
		
		jc.compress(write, 200, true, true, true, false);
		
	}
	
}