package com.neusoft.uniflow.web.webdesign.util.parser;

/* The following code was generated by JFlex 1.3.5 on 01-10-30 ����1:05 */

/****************************************************************************
 scanner.flex
 Lexer for a express compiler. The lexer is implemented using a Java class.

 The lexer recognizes string and numeric type.
 ****************************************************************************/

import java.io.IOException;
import java.util.Hashtable;

import java_cup.runtime.Symbol;

/**
 * This class is a scanner generated by <a href="http://www.jflex.de/">JFlex</a>
 * 1.3.5 on 01-10-30 ����1:05 from the specification file
 * <tt>file:/C:/Docume~1/WangKW1/jbproject/parser/lexer.flex</tt>
 */
public class Lexer implements Sym, java_cup.runtime.Scanner {

	/** This character denotes the end of file */
	final public static int YYEOF = -1;

	/** initial size of the lookahead buffer */
	final private static int YY_BUFFERSIZE = 16384;

	/** lexical states */
	final public static int YYINITIAL = 0;

	final public static int STRING_STATE = 1;

	/**
	 * Translates characters to character classes
	 */
	final private static String yycmap_packed = "\11\12\1\7\1\6\1\0\1\7\1\5\16\12\4\0\1\7\1\34"
			+ "\1\41\1\0\1\10\2\0\1\43\1\37\1\40\1\35\1\3\1\0"
			+ "\1\4\1\14\1\36\12\1\2\0\1\33\1\32\1\31\2\0\1\15"
			+ "\1\42\1\30\1\17\1\2\1\24\2\10\1\27\2\10\1\25\1\10"
			+ "\1\16\1\20\2\10\1\21\1\26\1\22\1\23\5\10\1\0\1\13"
			+ "\2\0\1\10\1\0\1\15\1\42\1\30\1\17\1\2\1\24\2\10"
			+ "\1\27\2\10\1\25\1\10\1\16\1\20\2\10\1\21\1\26\1\22"
			+ "\1\23\5\10\3\0\1\11\41\12\2\0\4\10\4\0\1\10\12\0"
			+ "\1\10\4\0\1\10\5\0\27\10\1\0\37\10\1\0\u0128\10\2\0"
			+ "\22\10\34\0\136\10\2\0\11\10\2\0\7\10\16\0\2\10\16\0"
			+ "\5\10\11\0\1\10\21\0\117\12\21\0\3\12\27\0\1\10\13\0"
			+ "\1\10\1\0\3\10\1\0\1\10\1\0\24\10\1\0\54\10\1\0"
			+ "\10\10\2\0\32\10\14\0\202\10\1\0\4\12\5\0\71\10\2\0"
			+ "\2\10\2\0\2\10\3\0\46\10\2\0\2\10\67\0\46\10\2\0"
			+ "\1\10\7\0\47\10\11\0\21\12\1\0\27\12\1\0\3\12\1\0"
			+ "\1\12\1\0\2\12\1\0\1\12\13\0\33\10\5\0\3\10\56\0"
			+ "\32\10\5\0\13\10\13\12\12\0\12\12\6\0\1\12\143\10\1\0"
			+ "\1\10\7\12\2\0\6\12\2\10\2\12\1\0\4\12\2\0\12\12"
			+ "\3\10\22\0\1\12\1\10\1\12\33\10\3\0\33\12\65\0\46\10"
			+ "\13\12\u0150\0\3\12\1\0\65\10\2\0\1\12\1\10\20\12\2\0"
			+ "\1\10\4\12\3\0\12\10\2\12\2\0\12\12\21\0\3\12\1\0"
			+ "\10\10\2\0\2\10\2\0\26\10\1\0\7\10\1\0\1\10\3\0"
			+ "\4\10\2\0\1\12\1\0\7\12\2\0\2\12\2\0\3\12\11\0"
			+ "\1\12\4\0\2\10\1\0\3\10\2\12\2\0\12\12\4\10\16\0"
			+ "\1\12\2\0\6\10\4\0\2\10\2\0\26\10\1\0\7\10\1\0"
			+ "\2\10\1\0\2\10\1\0\2\10\2\0\1\12\1\0\5\12\4\0"
			+ "\2\12\2\0\3\12\13\0\4\10\1\0\1\10\7\0\14\12\3\10"
			+ "\14\0\3\12\1\0\7\10\1\0\1\10\1\0\3\10\1\0\26\10"
			+ "\1\0\7\10\1\0\2\10\1\0\5\10\2\0\1\12\1\10\10\12"
			+ "\1\0\3\12\1\0\3\12\2\0\1\10\17\0\1\10\5\0\12\12"
			+ "\21\0\3\12\1\0\10\10\2\0\2\10\2\0\26\10\1\0\7\10"
			+ "\1\0\2\10\2\0\4\10\2\0\1\12\1\10\6\12\3\0\2\12"
			+ "\2\0\3\12\10\0\2\12\4\0\2\10\1\0\3\10\4\0\12\12"
			+ "\22\0\2\12\1\0\6\10\3\0\3\10\1\0\4\10\3\0\2\10"
			+ "\1\0\1\10\1\0\2\10\3\0\2\10\3\0\3\10\3\0\10\10"
			+ "\1\0\3\10\4\0\5\12\3\0\3\12\1\0\4\12\11\0\1\12"
			+ "\17\0\11\12\21\0\3\12\1\0\10\10\1\0\3\10\1\0\27\10"
			+ "\1\0\12\10\1\0\5\10\4\0\7\12\1\0\3\12\1\0\4\12"
			+ "\7\0\2\12\11\0\2\10\4\0\12\12\22\0\2\12\1\0\10\10"
			+ "\1\0\3\10\1\0\27\10\1\0\12\10\1\0\5\10\4\0\7\12"
			+ "\1\0\3\12\1\0\4\12\7\0\2\12\7\0\1\10\1\0\2\10"
			+ "\4\0\12\12\22\0\2\12\1\0\10\10\1\0\3\10\1\0\27\10"
			+ "\1\0\20\10\4\0\6\12\2\0\3\12\1\0\4\12\11\0\1\12"
			+ "\10\0\2\10\4\0\12\12\22\0\2\12\1\0\22\10\3\0\30\10"
			+ "\1\0\11\10\1\0\1\10\2\0\7\10\3\0\1\12\4\0\6\12"
			+ "\1\0\1\12\1\0\10\12\22\0\2\12\15\0\60\10\1\12\2\10"
			+ "\7\12\4\0\10\10\10\12\1\0\12\12\47\0\2\10\1\0\1\10"
			+ "\2\0\2\10\1\0\1\10\2\0\1\10\6\0\4\10\1\0\7\10"
			+ "\1\0\3\10\1\0\1\10\1\0\1\10\2\0\2\10\1\0\4\10"
			+ "\1\12\2\10\6\12\1\0\2\12\1\10\2\0\5\10\1\0\1\10"
			+ "\1\0\6\12\2\0\12\12\2\0\2\10\42\0\1\10\27\0\2\12"
			+ "\6\0\12\12\13\0\1\12\1\0\1\12\1\0\1\12\4\0\2\12"
			+ "\10\10\1\0\42\10\6\0\24\12\1\0\2\12\4\10\4\0\10\12"
			+ "\1\0\44\12\11\0\1\12\71\0\42\10\1\0\5\10\1\0\2\10"
			+ "\1\0\7\12\3\0\4\12\6\0\12\12\6\0\6\10\4\12\106\0"
			+ "\46\10\12\0\47\10\11\0\132\10\5\0\104\10\5\0\122\10\6\0"
			+ "\7\10\1\0\77\10\1\0\1\10\1\0\4\10\2\0\7\10\1\0"
			+ "\1\10\1\0\4\10\2\0\47\10\1\0\1\10\1\0\4\10\2\0"
			+ "\37\10\1\0\1\10\1\0\4\10\2\0\7\10\1\0\1\10\1\0"
			+ "\4\10\2\0\7\10\1\0\7\10\1\0\27\10\1\0\37\10\1\0"
			+ "\1\10\1\0\4\10\2\0\7\10\1\0\47\10\1\0\23\10\16\0"
			+ "\11\12\56\0\125\10\14\0\u026c\10\2\0\10\10\12\0\32\10\5\0"
			+ "\113\10\225\0\64\10\40\12\7\0\1\10\4\0\12\12\41\0\4\12"
			+ "\1\0\12\12\6\0\130\10\10\0\51\10\1\12\u0556\0\234\10\4\0"
			+ "\132\10\6\0\26\10\2\0\6\10\2\0\46\10\2\0\6\10\2\0"
			+ "\10\10\1\0\1\10\1\0\1\10\1\0\1\10\1\0\37\10\2\0"
			+ "\65\10\1\0\7\10\1\0\1\10\3\0\3\10\1\0\7\10\3\0"
			+ "\4\10\2\0\6\10\4\0\15\10\5\0\3\10\1\0\7\10\17\0"
			+ "\4\12\32\0\5\12\20\0\2\10\51\0\6\12\17\0\1\10\40\0"
			+ "\20\10\40\0\15\12\4\0\1\12\40\0\1\10\4\0\1\10\2\0"
			+ "\12\10\1\0\1\10\3\0\5\10\6\0\1\10\1\0\1\10\1\0"
			+ "\1\10\1\0\4\10\1\0\3\10\1\0\7\10\46\0\44\10\u0e81\0"
			+ "\3\10\31\0\11\10\6\12\1\0\5\10\2\0\3\10\6\0\124\10"
			+ "\4\0\2\12\2\0\2\10\2\0\136\10\6\0\50\10\4\0\136\10"
			+ "\21\0\30\10\u0248\0\u19b6\10\112\0\u51a6\10\132\0\u048d\10\u0773\0\u2ba4\10"
			+ "\u215c\0\u012e\10\322\0\7\10\14\0\5\10\5\0\1\10\1\12\12\10"
			+ "\1\0\15\10\1\0\5\10\1\0\1\10\1\0\2\10\1\0\2\10"
			+ "\1\0\154\10\41\0\u016b\10\22\0\100\10\2\0\66\10\50\0\14\10"
			+ "\44\0\4\12\17\0\2\10\30\0\3\10\31\0\1\10\6\0\3\10"
			+ "\1\0\1\10\1\0\207\10\2\0\1\12\4\0\1\10\13\0\12\12"
			+ "\7\0\32\10\4\0\1\10\1\0\32\10\12\0\132\10\3\0\6\10"
			+ "\2\0\6\10\2\0\6\10\2\0\3\10\3\0\2\10\3\0\2\10"
			+ "\22\0\3\12\4\0";

	/**
	 * Translates characters to character classes
	 */
	final private static char[] yycmap = yy_unpack_cmap(yycmap_packed);

	/**
	 * Translates a state to a row index in the transition table
	 */
	final private static int yy_rowMap[] = { 0, 36, 72, 108, 144, 72, 72, 180,
			72, 216, 252, 288, 324, 360, 396, 432, 468, 72, 504, 540, 72, 72,
			72, 72, 72, 576, 612, 72, 648, 72, 684, 720, 756, 792, 144, 828,
			864, 900, 72, 72, 72, 72, 72, 72, 72, 72, 72, 72, 72, 72, 936, 936,
			144, 144, 972, 1008, 1044, 144, 1080, 1116, 144, 1152, 1188, 144 };

	/**
	 * The packed transition table of the DFA (part 0)
	 */
	final private static String yy_packed0 = "\1\3\1\4\1\5\1\6\1\7\1\10\2\11\2\5"
			+ "\2\3\1\12\1\13\1\14\1\5\1\15\1\5\1\16"
			+ "\1\5\1\17\2\5\1\20\1\5\1\21\1\22\1\23"
			+ "\1\24\1\25\1\26\1\27\1\30\1\31\1\5\1\3"
			+ "\5\32\1\33\1\34\4\32\1\35\25\32\1\36\2\32"
			+ "\45\0\1\4\1\37\11\0\1\40\30\0\2\5\5\0"
			+ "\1\5\1\0\1\5\2\0\14\5\11\0\1\5\7\0"
			+ "\1\11\36\0\1\40\43\0\2\5\5\0\1\5\1\0"
			+ "\1\5\2\0\1\5\1\41\12\5\11\0\1\5\2\0"
			+ "\2\5\5\0\1\5\1\0\1\5\2\0\3\5\1\42"
			+ "\10\5\11\0\1\5\2\0\2\5\5\0\1\5\1\0"
			+ "\1\5\2\0\4\5\1\43\7\5\11\0\1\5\2\0"
			+ "\2\5\5\0\1\5\1\0\1\5\2\0\4\5\1\44"
			+ "\7\5\11\0\1\5\2\0\2\5\5\0\1\5\1\0"
			+ "\1\5\2\0\1\45\13\5\11\0\1\5\2\0\2\5"
			+ "\5\0\1\5\1\0\1\5\2\0\1\5\1\46\12\5"
			+ "\11\0\1\5\33\0\1\47\43\0\1\50\43\0\1\51"
			+ "\11\0\5\32\2\0\4\32\1\0\25\32\1\0\2\32"
			+ "\6\0\1\34\35\0\6\52\1\0\4\52\1\53\2\52"
			+ "\1\54\2\52\1\55\1\56\1\52\1\57\14\52\1\60"
			+ "\1\61\1\62\1\0\1\63\1\0\2\64\40\0\1\40"
			+ "\1\37\42\0\2\5\5\0\1\5\1\0\1\5\2\0"
			+ "\2\5\1\65\11\5\11\0\1\5\2\0\2\5\5\0"
			+ "\1\5\1\0\1\5\2\0\5\5\1\66\6\5\11\0"
			+ "\1\5\2\0\2\5\5\0\1\5\1\0\1\5\2\0"
			+ "\6\5\1\67\5\5\11\0\1\5\2\0\2\5\5\0"
			+ "\1\5\1\0\1\5\2\0\10\5\1\70\3\5\11\0"
			+ "\1\5\2\0\2\5\5\0\1\5\1\0\1\5\2\0"
			+ "\13\5\1\71\11\0\1\5\2\0\1\63\43\0\1\5"
			+ "\1\72\5\0\1\5\1\0\1\5\2\0\14\5\11\0"
			+ "\1\5\2\0\2\5\5\0\1\5\1\0\1\5\2\0"
			+ "\11\5\1\73\2\5\11\0\1\5\2\0\2\5\5\0"
			+ "\1\5\1\0\1\5\2\0\10\5\1\74\3\5\11\0"
			+ "\1\5\2\0\1\5\1\75\5\0\1\5\1\0\1\5"
			+ "\2\0\14\5\11\0\1\5\2\0\2\5\5\0\1\5"
			+ "\1\0\1\5\2\0\6\5\1\76\5\5\11\0\1\5"
			+ "\2\0\2\5\5\0\1\5\1\0\1\5\2\0\2\5"
			+ "\1\77\11\5\11\0\1\5\2\0\1\5\1\100\5\0"
			+ "\1\5\1\0\1\5\2\0\14\5\11\0\1\5\1\0";

	/**
	 * The transition table of the DFA
	 */
	final private static int yytrans[] = yy_unpack();

	/* error codes */
	final private static int YY_UNKNOWN_ERROR = 0;

	// final private static int YY_ILLEGAL_STATE = 1;
	final private static int YY_NO_MATCH = 2;

	final private static int YY_PUSHBACK_2BIG = 3;

	/* error messages for the codes above */
	final private static String YY_ERROR_MSG[] = {
			"Unkown internal scanner error", "Internal error: unknown state",
			"Error: could not match input",
			"Error: pushback value was too large" };

	/**
	 * YY_ATTRIBUTE[aState] contains the attributes of state <code>aState</code>
	 */
	private final static byte YY_ATTRIBUTE[] = { 0, 0, 9, 1, 1, 9, 9, 1, 9, 1,
			1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 9, 9, 9, 9, 9, 1, 1, 9, 1, 9, 0, 1,
			1, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 0, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1 };

	/** the input device */
	private java.io.Reader yy_reader;

	/** the current state of the DFA */
	private int yy_state;

	/** the current lexical state */
	private int yy_lexical_state = YYINITIAL;

	/**
	 * this buffer contains the current text to be matched and is the source of
	 * the yytext() string
	 */
	private char yy_buffer[] = new char[YY_BUFFERSIZE];

	/** the textposition at the last accepting state */
	private int yy_markedPos;

	/** the textposition at the last state to be included in yytext */
	private int yy_pushbackPos;

	/** the current text position in the buffer */
	private int yy_currentPos;

	/** startRead marks the beginning of the yytext() string in the buffer */
	private int yy_startRead;

	/**
	 * endRead marks the last character in the buffer, that has been read from
	 * input
	 */
	private int yy_endRead;

	/** number of newlines encountered up to the start of the matched text */
	private int yyline;

	/** the number of characters up to the start of the matched text */
	private int yychar;

	/**
	 * the number of characters from the last newline up to the start of the
	 * matched text
	 */
	private int yycolumn;

	/**
	 * yy_atBOL == true <=> the scanner is currently at the beginning of a line
	 */
	private boolean yy_atBOL = true;

	/** yy_atEOF == true <=> the scanner is at the EOF */
	private boolean yy_atEOF;

	/** denotes if the user-EOF-code has already been executed */
	private boolean yy_eof_done;

	/* user code: */

	Hashtable tokens;

	StringBuffer string = new StringBuffer();

	private Symbol symbol(int type) {
		Symbol sym = new Symbol(type, yyline, yycolumn);
		return sym;
	}

	private Symbol symbol(int type, Object value) {
		Symbol sym = new Symbol(type, yyline, yycolumn, value);
		return sym;
	}

	public Lexer(java.io.Reader in, Hashtable tokens) {
		this.yy_reader = in;
		this.tokens = tokens;
	}

	/**
	 * Creates a new scanner There is also a java.io.InputStream version of this
	 * constructor.
	 * 
	 * @param in
	 *            the java.io.Reader to read input from.
	 */
	public Lexer(java.io.Reader in) {
		this.yy_reader = in;
	}

	/**
	 * Creates a new scanner. There is also java.io.Reader version of this
	 * constructor.
	 * 
	 * @param in
	 *            the java.io.Inputstream to read input from.
	 */
	public Lexer(java.io.InputStream in) {
		this(new java.io.InputStreamReader(in));
	}

	/**
	 * Unpacks the split, compressed DFA transition table.
	 * 
	 * @return the unpacked transition table
	 */
	private static int[] yy_unpack() {
		int[] trans = new int[1224];
		int offset = 0;
		offset = yy_unpack(yy_packed0, offset, trans);
		return trans;
	}

	/**
	 * Unpacks the compressed DFA transition table.
	 * 
	 * @param packed
	 *            the packed transition table
	 * @return the index of the last entry
	 */
	private static int yy_unpack(String packed, int offset, int[] trans) {
		int i = 0; /* index in packed string */
		int j = offset; /* index in unpacked array */
		int l = packed.length();
		while (i < l) {
			int count = packed.charAt(i++);
			int value = packed.charAt(i++);
			value--;
			do
				trans[j++] = value;
			while (--count > 0);
		}
		return j;
	}

	/**
	 * Unpacks the compressed character translation table.
	 * 
	 * @param packed
	 *            the packed character translation table
	 * @return the unpacked character translation table
	 */
	private static char[] yy_unpack_cmap(String packed) {
		char[] map = new char[0x10000];
		int i = 0; /* index in packed string */
		int j = 0; /* index in unpacked array */
		while (i < 1646) {
			int count = packed.charAt(i++);
			char value = packed.charAt(i++);
			do
				map[j++] = value;
			while (--count > 0);
		}
		return map;
	}

	/**
	 * Refills the input buffer.
	 * 
	 * @return <code>false</code>, iff there was new input.
	 * 
	 * @exception IOException
	 *                if any I/O-Error occurs
	 */
	private boolean yy_refill() throws java.io.IOException {

		/* first: make room (if you can) */
		if (yy_startRead > 0) {
			System.arraycopy(yy_buffer, yy_startRead, yy_buffer, 0, yy_endRead
					- yy_startRead);

			/* translate stored positions */
			yy_endRead -= yy_startRead;
			yy_currentPos -= yy_startRead;
			yy_markedPos -= yy_startRead;
			yy_pushbackPos -= yy_startRead;
			yy_startRead = 0;
		}

		/* is the buffer big enough? */
		if (yy_currentPos >= yy_buffer.length) {
			/* if not: blow it up */
			char newBuffer[] = new char[yy_currentPos * 2];
			System.arraycopy(yy_buffer, 0, newBuffer, 0, yy_buffer.length);
			yy_buffer = newBuffer;
		}

		/* finally: fill the buffer with new input */
		int numRead = yy_reader.read(yy_buffer, yy_endRead, yy_buffer.length
				- yy_endRead);

		if (numRead < 0) {
			return true;
		} else {
			yy_endRead += numRead;
			return false;
		}
	}

	/**
	 * Closes the input stream.
	 */
	final public void yyclose() throws java.io.IOException {
		yy_atEOF = true; /* indicate end of file */
		yy_endRead = yy_startRead; /* invalidate buffer */

		if (yy_reader != null)
			yy_reader.close();
	}

	/**
	 * Closes the current stream, and resets the scanner to read from a new
	 * input stream.
	 * 
	 * All internal variables are reset, the old input stream <b>cannot</b> be
	 * reused (internal buffer is discarded and lost). Lexical state is set to
	 * <tt>YY_INITIAL</tt>.
	 * 
	 * @param reader
	 *            the new input stream
	 */
	final public void yyreset(java.io.Reader reader) throws java.io.IOException {
		yyclose();
		yy_reader = reader;
		yy_atBOL = true;
		yy_atEOF = false;
		yy_endRead = yy_startRead = 0;
		yy_currentPos = yy_markedPos = yy_pushbackPos = 0;
		yyline = yychar = yycolumn = 0;
		yy_lexical_state = YYINITIAL;
	}

	/**
	 * Returns the current lexical state.
	 */
	final public int yystate() {
		return yy_lexical_state;
	}

	/**
	 * Enters a new lexical state
	 * 
	 * @param newState
	 *            the new lexical state
	 */
	final public void yybegin(int newState) {
		yy_lexical_state = newState;
	}

	/**
	 * Returns the text matched by the current regular expression.
	 */
	final public String yytext() {
		return new String(yy_buffer, yy_startRead, yy_markedPos - yy_startRead);
	}

	/**
	 * Returns the character at position <tt>pos</tt> from the matched text.
	 * 
	 * It is equivalent to yytext().charAt(pos), but faster
	 * 
	 * @param pos
	 *            the position of the character to fetch. A value from 0 to
	 *            yylength()-1.
	 * 
	 * @return the character at position pos
	 */
	final public char yycharat(int pos) {
		return yy_buffer[yy_startRead + pos];
	}

	/**
	 * Returns the length of the matched text region.
	 */
	final public int yylength() {
		return yy_markedPos - yy_startRead;
	}

	/**
	 * Reports an error that occured while scanning.
	 * 
	 * In a wellformed scanner (no or only correct usage of yypushback(int) and
	 * a match-all fallback rule) this method will only be called with things
	 * that "Can't Possibly Happen". If this method is called, something is
	 * seriously wrong (e.g. a JFlex bug producing a faulty scanner etc.).
	 * 
	 * Usual syntax/scanner level error handling should be done in error
	 * fallback rules.
	 * 
	 * @param errorCode
	 *            the code of the errormessage to display
	 */
	private void yy_ScanError(int errorCode) {
		String message;
		try {
			message = YY_ERROR_MSG[errorCode];
		} catch (ArrayIndexOutOfBoundsException e) {
			message = YY_ERROR_MSG[YY_UNKNOWN_ERROR];
		}

		throw new Error(message);
	}

	/**
	 * Pushes the specified amount of characters back into the input stream.
	 * 
	 * They will be read again by then next call of the scanning method
	 * 
	 * @param number
	 *            the number of characters to be read again. This number must
	 *            not be greater than yylength()!
	 */
	// private void yypushback(int number) {
	// if ( number > yylength() )
	// yy_ScanError(YY_PUSHBACK_2BIG);
	//
	// yy_markedPos -= number;
	// }

	/**
	 * Contains user EOF-code, which will be executed exactly once, when the end
	 * of file is reached
	 */
	private void yy_do_eof() throws java.io.IOException {
		if (!yy_eof_done) {
			yy_eof_done = true;
			yyclose();
		}
	}

	/**
	 * Resumes scanning until the next regular expression is matched, the end of
	 * input is encountered or an I/O-Error occurs.
	 * 
	 * @return the next token
	 * @exception IOException
	 *                if any I/O-Error occurs
	 */
	public java_cup.runtime.Symbol next_token() throws java.io.IOException {
		int yy_input;
		int yy_action;

		// cached fields:
		int yy_currentPos_l;
		int yy_startRead_l;
		int yy_markedPos_l;
		int yy_endRead_l = yy_endRead;
		char[] yy_buffer_l = yy_buffer;
		char[] yycmap_l = yycmap;

		int[] yytrans_l = yytrans;
		int[] yy_rowMap_l = yy_rowMap;
		byte[] yy_attr_l = YY_ATTRIBUTE;

		while (true) {
			yy_markedPos_l = yy_markedPos;

			yychar += yy_markedPos_l - yy_startRead;

			boolean yy_r = false;
			for (yy_currentPos_l = yy_startRead; yy_currentPos_l < yy_markedPos_l; yy_currentPos_l++) {
				switch (yy_buffer_l[yy_currentPos_l]) {
				case '\u000B':
				case '\u000C':
				case '\u0085':
				case '\u2028':
				case '\u2029':
					yyline++;
					yycolumn = 0;
					yy_r = false;
					break;
				case '\r':
					yyline++;
					yycolumn = 0;
					yy_r = true;
					break;
				case '\n':
					if (yy_r)
						yy_r = false;
					else {
						yyline++;
						yycolumn = 0;
					}
					break;
				default:
					yy_r = false;
					yycolumn++;
				}
			}

			if (yy_r) {
				// peek one character ahead if it is \n (if we have counted one
				// line too much)
				boolean yy_peek;
				if (yy_markedPos_l < yy_endRead_l)
					yy_peek = yy_buffer_l[yy_markedPos_l] == '\n';
				else if (yy_atEOF)
					yy_peek = false;
				else {
					boolean eof = yy_refill();
					yy_markedPos_l = yy_markedPos;
					yy_buffer_l = yy_buffer;
					if (eof)
						yy_peek = false;
					else
						yy_peek = yy_buffer_l[yy_markedPos_l] == '\n';
				}
				if (yy_peek)
					yyline--;
			}
			yy_action = -1;

			yy_startRead_l = yy_currentPos_l = yy_currentPos = yy_startRead = yy_markedPos_l;

			yy_state = yy_lexical_state;

			yy_forAction: {
				while (true) {

					if (yy_currentPos_l < yy_endRead_l)
						yy_input = yy_buffer_l[yy_currentPos_l++];
					else if (yy_atEOF) {
						yy_input = YYEOF;
						break yy_forAction;
					} else {
						// store back cached positions
						yy_currentPos = yy_currentPos_l;
						yy_markedPos = yy_markedPos_l;
						boolean eof = yy_refill();
						// get translated positions and possibly new buffer
						yy_currentPos_l = yy_currentPos;
						yy_markedPos_l = yy_markedPos;
						yy_buffer_l = yy_buffer;
						yy_endRead_l = yy_endRead;
						if (eof) {
							yy_input = YYEOF;
							break yy_forAction;
						} else {
							yy_input = yy_buffer_l[yy_currentPos_l++];
						}
					}
					int yy_next = yytrans_l[yy_rowMap_l[yy_state]
							+ yycmap_l[yy_input]];
					if (yy_next == -1)
						break yy_forAction;
					yy_state = yy_next;

					int yy_attributes = yy_attr_l[yy_state];
					if ((yy_attributes & 1) == 1) {
						yy_action = yy_state;
						yy_markedPos_l = yy_currentPos_l;
						if ((yy_attributes & 8) == 8)
							break yy_forAction;
					}

				}
			}

			// store back cached position
			yy_markedPos = yy_markedPos_l;

			switch (yy_action) {

			case 24: {
				yybegin(STRING_STATE);
				string.setLength(0);
			}
			case 65:
				break;
			case 63: {
				return symbol(OP_INCLUDE);
			}
			case 66:
				break;
			case 25: {
				string.append(yytext());
			}
			case 67:
				break;
			case 41: {
				throw new RuntimeException("Illegal escape sequence \""
						+ yytext() + "\"");
			}
			case 68:
				break;
			case 57: {
				return symbol(TRUE, new Boolean(true));
			}
			case 69:
				break;
			case 60: {
				return symbol(FALSE, new Boolean(false));
			}
			case 70:
				break;
			case 7:
			case 8: { /* do nothing */
			}
			case 71:
				break;
			case 23: {
				return symbol(RPAREN);
			}
			case 72:
				break;
			case 22: {
				return symbol(LPAREN);
			}
			case 73:
				break;
			case 21: {
				return symbol(DIVIDE);
			}
			case 74:
				break;
			case 3:
			case 31:
			case 50: {
				return symbol(NUMBER, new Double(yytext()));
			}
			case 75:
				break;
			case 42: {
				string.append('\\');
			}
			case 76:
				break;
			case 43: {
				string.append('\n');
			}
			case 77:
				break;
			case 44: {
				string.append('\r');
			}
			case 78:
				break;
			case 45: {
				string.append('\t');
			}
			case 79:
				break;
			case 46: {
				string.append('\f');
			}
			case 80:
				break;
			case 47: {
				string.append('\"');
			}
			case 81:
				break;
			case 48: {
				string.append('\b');
			}
			case 82:
				break;
			case 49: {
				string.append('\'');
			}
			case 83:
				break;
			case 34: {
				return symbol(OR);
			}
			case 84:
				break;
			case 52: {
				return symbol(AND);
			}
			case 85:
				break;
			case 53: {
				return symbol(NOT);
			}
			case 86:
				break;
			case 2:
			case 9:
			case 19:
			case 28: {
				throw new Error("Illegal character <" + yytext() + ">");
			}
			case 87:
				break;
			case 26:
			case 27: {
				throw new Error("Unterminated string at end of line");
			}
			case 88:
				break;
			case 29: {
				yybegin(YYINITIAL);
				return symbol(STRING, string.toString());
			}
			case 89:
				break;
			case 20: {
				return symbol(TIMES);
			}
			case 90:
				break;
			case 18: {
				return symbol(OP_LT);
			}
			case 91:
				break;
			case 5: {
				return symbol(PLUS);
			}
			case 92:
				break;
			case 6: {
				return symbol(MINUS);
			}
			case 93:
				break;
			case 16: {
				return symbol(OP_GT);
			}
			case 94:
				break;
			case 17: {
				return symbol(OP_EQ);
			}
			case 95:
				break;
			case 37: {
				return symbol(OP_IN);
			}
			case 96:
				break;
			case 38: {
				return symbol(OP_GE);
			}
			case 97:
				break;
			case 39: {
				return symbol(OP_LE);
			}
			case 98:
				break;
			case 40: {
				return symbol(OP_NE);
			}
			case 99:
				break;
			case 4:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 32:
			case 33:
			case 35:
			case 36:
			case 54:
			case 55:
			case 56:
			case 58:
			case 59:
			case 61:
			case 62: {
				String type = (String) tokens.get(yytext());
				if (type.equalsIgnoreCase("number"))
					return symbol(NUMBER, new Double(0.0));
				else if (type.equalsIgnoreCase("string"))
					return symbol(STRING, new String(""));
			}
			case 100:
				break;
			default:
				if (yy_input == YYEOF && yy_startRead == yy_currentPos) {
					yy_atEOF = true;
					yy_do_eof();
					{
						return new java_cup.runtime.Symbol(Sym.EOF);
					}
				} else {
					yy_ScanError(YY_NO_MATCH);
				}
			}
		}
	}

}
