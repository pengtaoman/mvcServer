/*
 * @(#)DES.java	1.0 2005/06/14
 *
 */

package com.neusoft.tdframework.common.util;

/**
 * DES加密解密工具类
 *
 * @author  aizy
 * @version 1.0, 2005/06/14
 */
public class DES
{
	private static final int ENCRYPT = 0;
	private static final int DECRYPT = 1;

	private static final byte Df_Key[] = {
       (byte)0x01, (byte)0x23, (byte)0x45, (byte)0x67, (byte)0x89, (byte)0xab, (byte)0xcd, (byte)0xef,
       (byte)0xfe, (byte)0xdc, (byte)0xba, (byte)0x98, (byte)0x76, (byte)0x54, (byte)0x32, (byte)0x10,
       (byte)0x89, (byte)0xab, (byte)0xcd, (byte)0xef, (byte)0x01, (byte)0x23, (byte)0x45, (byte)0x67 };
	private static final short bytebit[] =
		{0200, 0100, 040, 020, 010, 04, 02, 01 };
	private static final int bigbyte[] = {
       0x800000, 0x400000, 0x200000, 0x100000,
       0x80000,  0x40000,  0x20000,  0x10000,
       0x8000,   0x4000,   0x2000,   0x1000,
       0x800,    0x400,    0x200,    0x100,
       0x80,     0x40,     0x20,     0x10,
       0x8,      0x4,      0x2,      0x1        };
	private static final byte pc1[] = {
       56, 48, 40, 32, 24, 16,  8,  0, 57, 49, 41, 33, 25, 17,
        9,  1, 58, 50, 42, 34, 26, 18, 10,  2, 59, 51, 43, 35,
       62, 54, 46, 38, 30, 22, 14,  6, 61, 53, 45, 37, 29, 21,
       13,  5, 60, 52, 44, 36, 28, 20, 12,  4, 27, 19, 11, 3   };
	private static final byte totrot[] =
       {1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28 };
	private static final byte pc2[] = {
       13, 16, 10, 23,  0,  4,      2, 27, 14,  5, 20,  9,
       22, 18, 11,  3, 25,  7,     15,  6, 26, 19, 12,  1,
       40, 51, 30, 36, 46, 54,     29, 39, 50, 44, 32, 47,
       43, 48, 38, 55, 33, 52,     45, 41, 49, 35, 28, 31   };
	private static final int SP1[] = {
       0x01010400, 0x00000000, 0x00010000, 0x01010404,
       0x01010004, 0x00010404, 0x00000004, 0x00010000,
       0x00000400, 0x01010400, 0x01010404, 0x00000400,
       0x01000404, 0x01010004, 0x01000000, 0x00000004,
       0x00000404, 0x01000400, 0x01000400, 0x00010400,
       0x00010400, 0x01010000, 0x01010000, 0x01000404,
       0x00010004, 0x01000004, 0x01000004, 0x00010004,
       0x00000000, 0x00000404, 0x00010404, 0x01000000,
       0x00010000, 0x01010404, 0x00000004, 0x01010000,
       0x01010400, 0x01000000, 0x01000000, 0x00000400,
       0x01010004, 0x00010000, 0x00010400, 0x01000004,
       0x00000400, 0x00000004, 0x01000404, 0x00010404,
       0x01010404, 0x00010004, 0x01010000, 0x01000404,
       0x01000004, 0x00000404, 0x00010404, 0x01010400,
       0x00000404, 0x01000400, 0x01000400, 0x00000000,
       0x00010004, 0x00010400, 0x00000000, 0x01010004  };
	private static final int SP2[] = {
       0x80108020, 0x80008000, 0x00008000, 0x00108020,
       0x00100000, 0x00000020, 0x80100020, 0x80008020,
       0x80000020, 0x80108020, 0x80108000, 0x80000000,
       0x80008000, 0x00100000, 0x00000020, 0x80100020,
       0x00108000, 0x00100020, 0x80008020, 0x00000000,
       0x80000000, 0x00008000, 0x00108020, 0x80100000,
       0x00100020, 0x80000020, 0x00000000, 0x00108000,
       0x00008020, 0x80108000, 0x80100000, 0x00008020,
       0x00000000, 0x00108020, 0x80100020, 0x00100000,
       0x80008020, 0x80100000, 0x80108000, 0x00008000,
       0x80100000, 0x80008000, 0x00000020, 0x80108020,
       0x00108020, 0x00000020, 0x00008000, 0x80000000,
       0x00008020, 0x80108000, 0x00100000, 0x80000020,
       0x00100020, 0x80008020, 0x80000020, 0x00100020,
       0x00108000, 0x00000000, 0x80008000, 0x00008020,
       0x80000000, 0x80100020, 0x80108020, 0x00108000  }; 
	private static final int SP3[] = {
       0x00000208, 0x08020200, 0x00000000, 0x08020008,
       0x08000200, 0x00000000, 0x00020208, 0x08000200,
       0x00020008, 0x08000008, 0x08000008, 0x00020000,
       0x08020208, 0x00020008, 0x08020000, 0x00000208,
       0x08000000, 0x00000008, 0x08020200, 0x00000200,
       0x00020200, 0x08020000, 0x08020008, 0x00020208,
       0x08000208, 0x00020200, 0x00020000, 0x08000208,
       0x00000008, 0x08020208, 0x00000200, 0x08000000,
       0x08020200, 0x08000000, 0x00020008, 0x00000208,
       0x00020000, 0x08020200, 0x08000200, 0x00000000,
       0x00000200, 0x00020008, 0x08020208, 0x08000200,
       0x08000008, 0x00000200, 0x00000000, 0x08020008,
       0x08000208, 0x00020000, 0x08000000, 0x08020208,
       0x00000008, 0x00020208, 0x00020200, 0x08000008,
       0x08020000, 0x08000208, 0x00000208, 0x08020000,
       0x00020208, 0x00000008, 0x08020008, 0x00020200  };
	private static final int SP4[] = {
       0x00802001, 0x00002081, 0x00002081, 0x00000080,
       0x00802080, 0x00800081, 0x00800001, 0x00002001,
       0x00000000, 0x00802000, 0x00802000, 0x00802081,
       0x00000081, 0x00000000, 0x00800080, 0x00800001,
       0x00000001, 0x00002000, 0x00800000, 0x00802001,
       0x00000080, 0x00800000, 0x00002001, 0x00002080,
       0x00800081, 0x00000001, 0x00002080, 0x00800080,
       0x00002000, 0x00802080, 0x00802081, 0x00000081,
       0x00800080, 0x00800001, 0x00802000, 0x00802081,
       0x00000081, 0x00000000, 0x00000000, 0x00802000,
       0x00002080, 0x00800080, 0x00800081, 0x00000001,
       0x00802001, 0x00002081, 0x00002081, 0x00000080,
       0x00802081, 0x00000081, 0x00000001, 0x00002000,
       0x00800001, 0x00002001, 0x00802080, 0x00800081,
       0x00002001, 0x00002080, 0x00800000, 0x00802001,
       0x00000080, 0x00800000, 0x00002000, 0x00802080  };
	private static final int SP5[] = {
       0x00000100, 0x02080100, 0x02080000, 0x42000100,
       0x00080000, 0x00000100, 0x40000000, 0x02080000,
       0x40080100, 0x00080000, 0x02000100, 0x40080100,
       0x42000100, 0x42080000, 0x00080100, 0x40000000,
       0x02000000, 0x40080000, 0x40080000, 0x00000000,
       0x40000100, 0x42080100, 0x42080100, 0x02000100,
       0x42080000, 0x40000100, 0x00000000, 0x42000000,
       0x02080100, 0x02000000, 0x42000000, 0x00080100,
       0x00080000, 0x42000100, 0x00000100, 0x02000000,
       0x40000000, 0x02080000, 0x42000100, 0x40080100,
       0x02000100, 0x40000000, 0x42080000, 0x02080100,
       0x40080100, 0x00000100, 0x02000000, 0x42080000,
       0x42080100, 0x00080100, 0x42000000, 0x42080100,
       0x02080000, 0x00000000, 0x40080000, 0x42000000,
       0x00080100, 0x02000100, 0x40000100, 0x00080000,
       0x00000000, 0x40080000, 0x02080100, 0x40000100  };
	private static final int SP6[] = {
       0x20000010, 0x20400000, 0x00004000, 0x20404010,
       0x20400000, 0x00000010, 0x20404010, 0x00400000,
       0x20004000, 0x00404010, 0x00400000, 0x20000010,
       0x00400010, 0x20004000, 0x20000000, 0x00004010,
       0x00000000, 0x00400010, 0x20004010, 0x00004000,
       0x00404000, 0x20004010, 0x00000010, 0x20400010,
       0x20400010, 0x00000000, 0x00404010, 0x20404000,
       0x00004010, 0x00404000, 0x20404000, 0x20000000,
       0x20004000, 0x00000010, 0x20400010, 0x00404000,
       0x20404010, 0x00400000, 0x00004010, 0x20000010,
       0x00400000, 0x20004000, 0x20000000, 0x00004010,
       0x20000010, 0x20404010, 0x00404000, 0x20400000,
       0x00404010, 0x20404000, 0x00000000, 0x20400010,
       0x00000010, 0x00004000, 0x20400000, 0x00404010,
       0x00004000, 0x00400010, 0x20004010, 0x00000000,
       0x20404000, 0x20000000, 0x00400010, 0x20004010  };
	private static final int SP7[] = {
       0x00200000, 0x04200002, 0x04000802, 0x00000000,
       0x00000800, 0x04000802, 0x00200802, 0x04200800,
       0x04200802, 0x00200000, 0x00000000, 0x04000002,
       0x00000002, 0x04000000, 0x04200002, 0x00000802,
       0x04000800, 0x00200802, 0x00200002, 0x04000800,
       0x04000002, 0x04200000, 0x04200800, 0x00200002,
       0x04200000, 0x00000800, 0x00000802, 0x04200802,
       0x00200800, 0x00000002, 0x04000000, 0x00200800,
       0x04000000, 0x00200800, 0x00200000, 0x04000802,
       0x04000802, 0x04200002, 0x04200002, 0x00000002,
       0x00200002, 0x04000000, 0x04000800, 0x00200000,
       0x04200800, 0x00000802, 0x00200802, 0x04200800,
       0x00000802, 0x04000002, 0x04200802, 0x04200000,
       0x00200800, 0x00000000, 0x00000002, 0x04200802,
       0x00000000, 0x00200802, 0x04200000, 0x00000800,
       0x04000002, 0x04000800, 0x00000800, 0x00200002  };
	private static final int SP8[] = {
       0x10001040, 0x00001000, 0x00040000, 0x10041040,
       0x10000000, 0x10001040, 0x00000040, 0x10000000,
       0x00040040, 0x10040000, 0x10041040, 0x00041000,
       0x10041000, 0x00041040, 0x00001000, 0x00000040,
       0x10040000, 0x10000040, 0x10001000, 0x00001040,
       0x00041000, 0x00040040, 0x10040040, 0x10041000,
       0x00001040, 0x00000000, 0x00000000, 0x10040040,
       0x10000040, 0x10001000, 0x00041040, 0x00040000,
       0x00041040, 0x00040000, 0x10041000, 0x00001000,
       0x00000040, 0x10040040, 0x00001000, 0x00041040,
       0x10001000, 0x00000040, 0x10000040, 0x10040000,
       0x10040040, 0x10000000, 0x00040000, 0x10001040,
       0x00000000, 0x10041040, 0x00040040, 0x10000040,
       0x10040000, 0x10001000, 0x10001040, 0x00000000,
       0x10041040, 0x00041000, 0x00041000, 0x00001040,
       0x00001040, 0x00040040, 0x10000000, 0x10041000  };

	private byte key[] = new byte[8];
	private int blocks;
	private int KnL[] = new int[32];
	
	public DES()
	{
		blocks = 8;
		byte[] defaultKey = "_s*@x~?".getBytes();
		System.arraycopy(defaultKey, 0, key, 0, defaultKey.length);
	}

	public DES(byte[] cKey, int nBlocks)
	{
		if( cKey.length > 8 ) {
			System.arraycopy(cKey, 0, key, 0, 8);
		} else {
			System.arraycopy(cKey, 0, key, 0, cKey.length);
		}
		
		if(nBlocks < 1 || nBlocks > 8) {
			blocks = 8;
		} else {
			blocks = nBlocks;
		}
	}
	
	public byte[] encrypt ( byte[] data )
	{
		if(data == null || blocks < 1)
			throw new IllegalArgumentException();

	   deskey ( ENCRYPT );

	   return des (data);
	}

	public byte[] decrypt ( byte[] data )
	{
		if(data == null || blocks < 1)
			throw new IllegalArgumentException();

		deskey (  DECRYPT );
		return des (data);
	};

	/**
	 * Sets the internal key register (KnR) according to the hexadecimal
	 * key contained in the 8 bytes of hexkey, according to the DES,
	 * for encryption or decrytion according to MODE
	 */
	private void deskey( int md)
	{
		int i, j, l, m, n;
		byte pc1m[] = new byte[56];
		byte pcr[] = new byte[56];
		int kn[] = new int[32];

		for (j = 0; j < 56; j++) {
			l = pc1[j];
			m = l & 07;
			pc1m[j] = ((key[l >>> 3] & bytebit[m]) != 0 ) ? (byte)1 : (byte)0;
		}

		for (i = 0; i < 16; i++) {
			if (md == DECRYPT) m = (15 - i) << 1;
			else m = i << 1;
			n = m + 1;
			kn[m] = kn[n] = 0;
			for (j = 0; j < 28; j++) {
				l = j + totrot[i];
				if (l < 28) pcr[j] = pc1m[l];
				else pcr[j] = pc1m[l - 28];
			}
			for (j = 28; j < 56; j++) {
				l = j + totrot[i];
				if (l < 56) pcr[j] = pc1m[l];
				else pcr[j] = pc1m[l - 28];
			}
			for (j = 0; j < 24; j++) {
				if (pcr[ pc2[j] ] != 0) kn[m] |= bigbyte[j];
				if (pcr[ pc2[j+24] ] != 0) kn[n] |= bigbyte[j];
			}
		}
		cookey(kn);
		return;
	}
	
	/**
	 * Only called by deskey.
	 */
	private void cookey(int []raw)
	{
		int raw0, raw1;
		int dough[] = new int[32];
		int dough0, dough1;
		
		for (int i = 0; i < 32; i+=2) {
			raw0 = raw[i];
			raw1 = raw[i + 1];
			
			dough0 = (raw0 & 0x00fc0000) << 6;
			dough0 |= (raw0 & 0x00000fc0) << 10;
			dough0 |= (raw1 & 0x00fc0000) >>> 10;
			dough0 |= (raw1 & 0x00000fc0) >>> 6;
			dough[i] = dough0;
			
			dough1 = (raw0 & 0x0003f000) << 12;
			dough1 |= (raw0 & 0x0000003f) << 16;
			dough1 |= (raw1 & 0x0003f000) >>> 4;
			dough1 |= (raw1 & 0x0000003f);
			dough[i + 1] = dough1;
		}
		usekey(dough);
		return;
	}
	
	/**
	 * Loads the interal key register with the data in cookedkey.
	 * Only called by cookey.
	 */
	private void usekey(int[] from)
	{
	  System.arraycopy(from, 0, KnL, 0, 32);
	}

	/**
	 * Encrpts/Decrypts(according to the key currently loaded int the
	 * internal key register) SOME blocks of eight bytes at 'data' array.
	 */
	private byte[] des ( byte[] data )
	{
		byte[] result = new byte[blocks * 8];
		for (int i = 0; i < blocks; ++i)
		{
			byte[] buffer = new byte[8];
			
			if ( data.length > (i + 1)*8) {
				System.arraycopy(data, i*8, buffer, 0, 8);
			} else if ( data.length > i*8) {
				System.arraycopy(data, i*8, buffer, 0, data.length - i*8);
			}

			des_block(buffer,buffer);
			System.arraycopy(buffer, 0, result, i*8, 8);
		}
		return result;
	}

	/**
	 * Encrpts/Decrypts(according to the key currently loaded int the
	 * internal key register) one block of eight bytes at address 'in'
	 * into the block at address 'out'. They can be the same.
	 */
	private void des_block(byte[] in, byte[] out)
	{
		int work[] = new int[2];
		
		scrunch(in, work);
		desfunc(work, KnL);
		unscrun(work, out);
	}

	private void scrunch(byte[] outof, int[] into )
	{
	  into[0] = (outof[0] & 0xff) << 24;
	  into[0] |= (outof[1] & 0xff) << 16;
	  into[0] |= (outof[2] & 0xff) << 8;
	  into[0] |= (outof[3] & 0xff);
	  into[1] = (outof[4] & 0xff) << 24;
	  into[1] |= (outof[5] & 0xff) << 16;
	  into[1] |= (outof[6] & 0xff) << 8;
	  into[1] |= (outof[7] & 0xff);
	  return;
	}

	private void desfunc(int[] block, int[] keys)
	{
		int fval, work, right, leftt;
		int round;

		leftt = block[0];
		right = block[1];
		work = ((leftt >>> 4) ^ right) & 0x0f0f0f0f;
		right ^= work;
		leftt ^= (work << 4);
		work = ((leftt >>> 16) ^ right) & 0x0000ffff;
		right ^= work;
		leftt ^= (work << 16);
		work = ((right >>> 2) ^ leftt) & 0x33333333;
		leftt ^= work;
		right ^= (work << 2);
		work = ((right >>> 8) ^ leftt) & 0x00ff00ff;
		leftt ^= work;
		right ^= (work << 8);
		right = ((right << 1) | ((right >>> 31) & 1)) & 0xffffffff;
		work = (leftt ^ right) & 0xaaaaaaaa;
		leftt ^= work;
		right ^= work;
		leftt = ((leftt << 1) | ((leftt >>> 31) & 1)) & 0xffffffff;
		
		for (round = 0; round < 8; round++) {
			work = (right << 28) | (right >>> 4);
			work ^= keys[round * 4];
			fval  = SP7[work         & 0x3f];
			fval |= SP5[(work >>>  8) & 0x3f];
			fval |= SP3[(work >>> 16) & 0x3f];
			fval |= SP1[(work >>> 24) & 0x3f];
			work = right ^ keys[round * 4 + 1];
			fval |= SP8[work         & 0x3f];
			fval |= SP6[(work >>>  8) & 0x3f];
			fval |= SP4[(work >>> 16) & 0x3f];
			fval |= SP2[(work >>> 24) & 0x3f];
			leftt ^= fval;
      work = (leftt << 28) | (leftt >>> 4);
			work ^= keys[round * 4 + 2];
			fval  = SP7[work         & 0x3f];
			fval |= SP5[(work >>>  8) & 0x3f];
			fval |= SP3[(work >>> 16) & 0x3f];
			fval |= SP1[(work >>> 24) & 0x3f];
			work = leftt ^ keys[round * 4 + 3];
			fval |= SP8[work         & 0x3f];
			fval |= SP6[(work >>>  8) & 0x3f];
			fval |= SP4[(work >>> 16) & 0x3f];
			fval |= SP2[(work >>> 24) & 0x3f];
			right ^= fval;
		}
		right = (right << 31) | (right >>> 1);
		work = (leftt ^ right) & 0xaaaaaaaa;
		leftt ^= work;
		right ^= work;
		leftt = (leftt << 31) | ( leftt >>> 1);
		work = ((leftt >>> 8) ^ right) & 0x00ff00ff;
		right ^= work;
		leftt ^= (work << 8);
		work = ((leftt >>> 2) ^ right) & 0x33333333;
		right ^= work;
		leftt ^= (work << 2);
		work = ((right >>> 16) ^ leftt) & 0x0000ffff;
		leftt ^= work;
		right ^= (work << 16);
		work = ((right >>> 4) ^ leftt) & 0x0f0f0f0f;
		leftt ^= work;
		right ^= (work << 4);
		block[0] = right;
		block[1] = leftt;
		return;
	}

	private void unscrun(int[] outof, byte[] into)
	{
		into[0] = (byte)((outof[0] >>> 24) & 0xff);
		into[1] = (byte)((outof[0] >>> 16) & 0xff);
		into[2] = (byte)((outof[0] >>> 8) & 0xff);
		into[3] = (byte)(outof[0] & 0xff);
		into[4] = (byte)((outof[1] >>> 24) & 0xff);
		into[5] = (byte)((outof[1] >>> 16) & 0xff);
		into[6] = (byte)((outof[1] >>> 8) & 0xff);
		into[7] = (byte)(outof[1] & 0xff);
	}

	/**
	 * test
	 */
	public static void main(String args[])
	{
		String passPhase = "PASSWORD";
        String text = "321400+A";
        
        System.out.println("Pass Phrase text:" + passPhase);
        System.out.println("Text:" + text);

        // Encrypt password
        byte[] passBytes = passPhase.getBytes();
        DES des = new DES(passBytes, 1);
        byte[] encrypedPass = des.encrypt(passBytes);

        // Encrypt text
        des = new DES(encrypedPass, 4);
        byte[] encrypedText = des.encrypt(text.getBytes());

        String encrypedString = BytesToHexString(encrypedText);
        System.out.println("encrypt str:" + encrypedString);
        //byte[] convertedBytes = HexStringToBytes(encrypedString);
        byte[] convertedBytes = new byte[encrypedString.length()/2];;
		try {
			convertedBytes = getBinFromString(encrypedString);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// Decrypt text
        //byte[] decrypted = des.decrypt(encrypedText);
        byte[] decrypted2 = des.decrypt(convertedBytes);
        System.out.println("after decrypt text:" + new String(decrypted2));
        String ret = new String(decrypted2);
        ret = ret.substring(0, ret.indexOf(0));
        System.out.println("decrypted text length:" + ret);
               

	}
    public static byte[] getBinFromString(String binStr)
    throws Exception
{
    if(binStr == null || binStr.length() == 0)
        return new byte[0];
    int length = binStr.length();
    if(length % 2 != 0)
        throw new Exception("invalid length of source string");
    byte data[] = new byte[length / 2];
    for(int i = 0; i < data.length; i++)
    {
        String s = binStr.substring(i * 2, i * 2 + 2);
        data[i] = (byte)Integer.parseInt(binStr.substring(i * 2, i * 2 + 2), 16);
    }

    return data;
}
	
	public static String BytesToHexString(byte[]bytes)
	{
		StringBuffer sb = new StringBuffer();
		for (int i=0; i<bytes.length; ++i)
		{
			byte b = bytes[i];
			int low = b & 0x0000000f;
			int hi = (b >>> 4) & 0x0000000f;
			sb.append(ByteToChar(hi));
			sb.append(ByteToChar(low));
		}
		return sb.toString();
	}
	
	public static char ByteToChar(int b)
	{
		if (b < 10)
			return (char)('0' + b);
		else
			return (char)('A' + (b - 10));
	}

}
