package com.neusoft.tdframework.common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;
import com.yahoo.platform.yui.compressor.CssCompressor;

public class UnieapLibGenerator {

	static List<Map<String, Object>> modules = new ArrayList<Map<String, Object>>();

	public static List<String> getUnieapLibList(String seedFilePath)
			throws Exception {

		File f = null;
		FileInputStream fileInputStream = null;

		try {
			f = new File(seedFilePath);
			fileInputStream = new FileInputStream(f);
			Scanner scanner = new Scanner(fileInputStream);
			List<String> fileLst = new ArrayList<String>();
			while (scanner.hasNextLine()) {
				fileLst.add(scanner.nextLine());
			}
			return fileLst;
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		} finally {
			try {
				if (fileInputStream != null) {
					fileInputStream.close();
				}

			} catch (Exception e) {
				// do nothing
			}
		}

	}

	public static void main(String[] args) throws Throwable {
//		UnieapLibGenerator
//				.yuigen("d:\\WORK\\20120711\\preLoadModulesCHE.js",
//						"d:\\unieap-comboaaa.js",
//						"D:\\apache-tomcat-6.0.29\\webapps\\tdframework-deliver\\EAPDomain");
		UnieapLibGenerator
		.yuigenCSS("D:\\apache-tomcat-6.0.29\\webapps\\tdframework-deliver\\EAPDomain\\unieap\\ria3.3\\pages\\preLoadModulesCSS.js",
				"d:\\unieap-comboaaa.css",
				"D:\\apache-tomcat-6.0.29\\webapps\\tdframework-deliver\\EAPDomain");
	}

	public static void yuigen(String seedFilePath, String resultPath,
			String moduleDir) throws Exception {

		FileOutputStream fileOutputStream = null;
		OutputStreamWriter outputStreamWriter = null;
		PrintWriter pw = null;

		try {
			List<String> paths = getUnieapLibList(seedFilePath);
			fileOutputStream = new FileOutputStream(resultPath);
			outputStreamWriter = new OutputStreamWriter(fileOutputStream,
					"UTF-8");
			pw = new PrintWriter(outputStreamWriter);

			for (String path : paths) {
				Scanner s = null;
				try {
					String modulePath = moduleDir + path;
					s = new Scanner(new InputStreamReader(
							new FileInputStream(new File(modulePath)), "UTF-8"));
					//pw.println("/*" + moduleDir + path + "*/");
					StringWriter sw = new StringWriter();

					while (s.hasNextLine()) {
						String lineStr = s.nextLine();
						sw.append(lineStr + "\n");

					}
					StringWriter compressWriter = new StringWriter();
					WebOptimization.compressJS(new StringReader(sw.toString()),
							compressWriter);
					String newLineStr = compressWriter.toString();

					if (newLineStr.length() < newLineStr.getBytes().length) {
						java.nio.CharBuffer cBuf = java.nio.CharBuffer
								.allocate(newLineStr.toString().length() * 2);
						char[] lineChar = newLineStr.toCharArray();
						for (int i = 0; i < lineChar.length; i++) {
							if (lineChar[i] > 0x80) {
								cBuf.put("\\u".toCharArray());
								cBuf.put(Integer.toHexString(lineChar[i])
										.toCharArray());
							} else {
								cBuf.put(lineChar[i]);
							}
						}
						newLineStr = new String(cBuf.array()).trim();
						cBuf = null;
					}

					pw.println(newLineStr);
					SysLog.writeLogs("om", GlobalParameters.INFO, "UnieapLibGenerator-yuigen: PATH: "+moduleDir + path+"已经添加到整合文件。");
				} catch (Exception ex) {
					SysLog.writeLogs("om", GlobalParameters.ERROR, "UnieapLibGenerator-yuigen: PATH: "+moduleDir + path+"没有找到。");
					//throw ex;
				}finally {
					if (s != null) {
						s.close();
					}
				}
			}
			pw.flush();

		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		} finally {
			try {
				if (fileOutputStream != null) {
					fileOutputStream.close();
				}

				if (outputStreamWriter != null) {
					outputStreamWriter.close();
				}

				if (pw != null) {
					pw.close();
				}

			} catch (Exception e) {
				// do nothing
			}

		}

	}
	
	
	public static void yuigenBusUTF(String seedFilePath, String resultPath,
			String moduleDir) throws Exception {

		FileOutputStream fileOutputStream = null;
		OutputStreamWriter outputStreamWriter = null;
		PrintWriter pw = null;

		try {
			List<String> paths = getUnieapLibList(seedFilePath);
			fileOutputStream = new FileOutputStream(resultPath);
			outputStreamWriter = new OutputStreamWriter(fileOutputStream,
					"UTF-8");
			pw = new PrintWriter(outputStreamWriter);

			for (String path : paths) {
				Scanner s = null;
				try {
					String modulePath = moduleDir + path;
					s = new Scanner(new InputStreamReader(
							new FileInputStream(new File(modulePath)), "UTF-8"));
					//pw.println("/*" + moduleDir + path + "*/");
					StringWriter sw = new StringWriter();

					while (s.hasNextLine()) {
						String lineStr = s.nextLine();
						sw.append(lineStr + "\n");

					}
					StringWriter compressWriter = new StringWriter();
					WebOptimization.compressJS(new StringReader(sw.toString()),
							compressWriter);
					String newLineStr = compressWriter.toString();
//
//					if (newLineStr.length() < newLineStr.getBytes().length) {
//						java.nio.CharBuffer cBuf = java.nio.CharBuffer
//								.allocate(newLineStr.toString().length() * 2);
//						char[] lineChar = newLineStr.toCharArray();
//						for (int i = 0; i < lineChar.length; i++) {
//							if (lineChar[i] > 0x80) {
//								cBuf.put("\\u".toCharArray());
//								cBuf.put(Integer.toHexString(lineChar[i])
//										.toCharArray());
//							} else {
//								cBuf.put(lineChar[i]);
//							}
//						}
//						newLineStr = new String(cBuf.array()).trim();
//						cBuf = null;
//					}

					pw.println(newLineStr);
					s.close();
					SysLog.writeLogs("om", GlobalParameters.INFO, "UnieapLibGenerator-yuigen: PATH: "+moduleDir + path+" 已经添加到整合文件。");
				} catch (Exception ex) {
					SysLog.writeLogs("om", GlobalParameters.ERROR, "UnieapLibGenerator-yuigen: PATH: "+moduleDir + path+" 没有找到。");
					//throw ex;
				}finally {
					if (s != null) {
						s.close();
					}
				}
			}
			pw.flush();

		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		} finally {
			try {
				if (fileOutputStream != null) {
					fileOutputStream.close();
				}

				if (outputStreamWriter != null) {
					outputStreamWriter.close();
				}

				if (pw != null) {
					pw.close();
				}

			} catch (Exception e) {
				// do nothing
			}

		}

	}
	
	public static void yuigenBusGBK(String seedFilePath, String resultPath,
			String moduleDir) throws Exception {

		FileOutputStream fileOutputStream = null;
		OutputStreamWriter outputStreamWriter = null;
		PrintWriter pw = null;

		try {
			List<String> paths = getUnieapLibList(seedFilePath);
			fileOutputStream = new FileOutputStream(resultPath);
			outputStreamWriter = new OutputStreamWriter(fileOutputStream,
					"GBK");
			pw = new PrintWriter(outputStreamWriter);

			for (String path : paths) {
				Scanner s = null;
				try {
					String modulePath = moduleDir + path;
					s = new Scanner(new InputStreamReader(
							new FileInputStream(new File(modulePath)), "UTF-8"));
					//pw.println("/*" + moduleDir + path + "*/");
					StringWriter sw = new StringWriter();

					while (s.hasNextLine()) {
						String lineStr = s.nextLine();
						sw.append(lineStr + "\n");

					}
					StringWriter compressWriter = new StringWriter();
					WebOptimization.compressJS(new StringReader(sw.toString()),
							compressWriter);
					String newLineStr = compressWriter.toString();
//
//					if (newLineStr.length() < newLineStr.getBytes().length) {
//						java.nio.CharBuffer cBuf = java.nio.CharBuffer
//								.allocate(newLineStr.toString().length() * 2);
//						char[] lineChar = newLineStr.toCharArray();
//						for (int i = 0; i < lineChar.length; i++) {
//							if (lineChar[i] > 0x80) {
//								cBuf.put("\\u".toCharArray());
//								cBuf.put(Integer.toHexString(lineChar[i])
//										.toCharArray());
//							} else {
//								cBuf.put(lineChar[i]);
//							}
//						}
//						newLineStr = new String(cBuf.array()).trim();
//						cBuf = null;
//					}

					pw.println(newLineStr);
					SysLog.writeLogs("om", GlobalParameters.INFO, "UnieapLibGenerator-yuigen: PATH: "+moduleDir + path+"已经添加到整合文件。");
				} catch (Exception ex) {
					SysLog.writeLogs("om", GlobalParameters.ERROR, "UnieapLibGenerator-yuigen: PATH: "+moduleDir + path+" 没有找到。");
					//throw ex;
				}finally {
					if (s != null) {
						s.close();
					}
				}
			}
			pw.flush();

		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		} finally {
			try {
				if (fileOutputStream != null) {
					fileOutputStream.close();
				}

				if (outputStreamWriter != null) {
					outputStreamWriter.close();
				}

				if (pw != null) {
					pw.close();
				}

			} catch (Exception e) {
				// do nothing
			}

		}

	}
	
	public static void yuigenCSS(String seedFilePath, String resultPath,
			String moduleDir) throws Exception  {
		
		FileOutputStream fileOutputStream = null;
		OutputStreamWriter outputStreamWriter = null;
		try {
			
			fileOutputStream = new FileOutputStream(resultPath);
			outputStreamWriter = new OutputStreamWriter(fileOutputStream,
					"UTF-8");
			
			List<String> paths = getUnieapLibList(seedFilePath);
			for (String path : paths) {
				try {
				String modulePath = moduleDir + path;
				 CssCompressor csscompressor = new CssCompressor(new InputStreamReader(
							new FileInputStream(new File(modulePath)), "UTF-8"));
				 csscompressor.compress(outputStreamWriter, -1);
				 SysLog.writeLogs("om", GlobalParameters.INFO, "UnieapLibGenerator-yuigen: PATH: "+moduleDir + path+" 已经添加到整合文件。");
				} catch (Exception ex) {
					SysLog.writeLogs("om", GlobalParameters.ERROR, "UnieapLibGenerator-yuigen: PATH: "+moduleDir + path+" 没有找到。");
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		} finally {
			try {
				if (fileOutputStream != null) {
					fileOutputStream.close();
				}

				if (outputStreamWriter != null) {
					outputStreamWriter.close();
				}
			} catch (Exception e) {
				// do nothing
			}

		}
	}

}
