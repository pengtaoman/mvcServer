package com.neusoft.uniflow.web.util;

/**
 * <p>Title: uniflow API</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author xing tj
 * @version 1.0
 */

import java.io.PrintStream;
import java.io.PrintWriter;

import javax.servlet.jsp.PageContext;

public class UniException extends Throwable {
	private static final long serialVersionUID = 1234567001;
	private static final String NEWLINE = "\n<br>";


	private java.lang.Throwable cause;

	private String key;// Exception对应消息的key，有助于实现本地化。


	public UniException(String key) {
		init(null, key, null);
	}

	public UniException(String key, Object param) {
		init(null, key, new Object[] { param });
	}

	public UniException(String key, Object param1, Object param2) {
		init(null, key, new Object[] { param1, param2 });
	}

	public UniException(String key, Object[] params) {
		init(null, key, params);
	}

	public UniException(Throwable cause, String key) {
		init(cause, key, null);
	}

	public UniException(Throwable cause, String key, Object param) {
		init(cause, key, new Object[] { param });
	}

	public UniException(Throwable cause, String key, Object param1,
			Object param2) {
		init(cause, key, new Object[] { param1, param2 });
	}

	public UniException(Throwable cause, String key, Object[] args) {
		init(cause, key, args);
	}

	public UniException(Throwable cause) {
		init(cause, "", null);
	}

	private void init(Throwable cause, String key, Object[] args) {
		if (cause != null && (!(cause instanceof UniException))
				&& (!(cause instanceof Throwable))) {
			// System.out.println("UniException constructor failue!");
		}
		this.cause = cause;
		this.key = key;
	}

	/*
	 * 取得错误码
	 */
	public String getkey() {
		return this.key;
	}

	public Throwable getCause() {
		return cause;
	}

	private String getSelfMessage(PageContext pageContext) {
		String message;
		if (key == null || key.equals(""))
			return "";
		try {
			message = MessageUtil.getString(key,pageContext.getSession());// MessageUtil.getMessage(key,
													// pageContext, msgArgs);
		} catch (Exception e) {
			// message = "cannot find error message, key = " + key + ".";
			message = key;
		}
		if (message.equals("#-1"))
			message = key;
		return message;
	}

	public String getMessage(PageContext pageContext) {
		String message = getSelfMessage(pageContext);
		if (cause != null) {
			if (cause instanceof UniException) {
				message = message + NEWLINE
						+ ((UniException) cause).getMessage(pageContext);
			} else {
				message = message + NEWLINE + ((Throwable) cause).getMessage();
			}
		}
		return message;
	}

	public void setCause(Throwable cause) {
		if (cause != null && (!(cause instanceof UniException))
				&& (!(cause instanceof Throwable))) {
			// System.out.println("UniException constructor failue!");
		}
		this.cause = cause;
	}

	public void printStackTrace(PageContext pageContext) {
		// System.out.println(getSelfMessage(pageContext));
		if (cause != null) {
			// System.err.println("\nCaused by:\n");
			if (cause instanceof UniException)
				((UniException) cause).printStackTrace(pageContext);
			else
				((Throwable) cause).printStackTrace();
		}
	}

	public void printStackTrace(PrintStream ps, PageContext pageContext) {
		ps.println(getSelfMessage(pageContext));
		if (cause != null) {
			//ps.println("\nCaused by:\n");
			if (cause instanceof UniException)
				((UniException) cause).printStackTrace(ps, pageContext);
			else
				((Throwable) cause).printStackTrace(ps);
		}
	}

	public void printStackTrace(PrintWriter pw, PageContext pageContext) {
		pw.println(getSelfMessage(pageContext));
		if (cause != null) {
			//pw.println("\nCaused by:\n");
			if (cause instanceof UniException)
				((UniException) cause).printStackTrace(pw, pageContext);
			else
				((Throwable) cause).printStackTrace(pw);
		}
	}
}
