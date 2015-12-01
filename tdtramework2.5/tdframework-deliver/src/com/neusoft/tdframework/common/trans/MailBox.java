package com.neusoft.tdframework.common.trans;

import java.util.Properties;
import java.util.HashMap;
import java.util.Map;
import java.io.IOException;
import java.io.File;
import javax.activation.FileDataSource;
import javax.activation.DataHandler;

import javax.mail.*;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;

import com.neusoft.tdframework.common.util.FileUtil;

/**
 * Title: MailBox
 * Description: 
 * 公共的MAIL类. 实现收,发MAIL. 
 * 该对象将用过的MAIL Session保存静态的Map里.
 * MAIL的信息的以文件的方式配置. 如: <p>
 * <pre>
 * 	配置文件: mail/zhang.properties
 *	  	mail.transport.protocol=smtp
 *		mail.store.protocol=pop3
 *		mail.smtp.host=smtp.neusoft.com
 *		mail.pop3.host=mail.neusoft.com
 *		mail.port=25
 *		mail.from=zhang@neusoft.com
 *		mail.user=zhang
 *		mail.password=123456
 *		mail.smtp.auth=true
 *	
 *	可以直接调用 sendMail(String mailName,String subject,String bodyInfo,String receiver)
 *	发送简单的不带附件的信件.
 *	根据配置额文件的名称,mailName 参数的值为: mail/zhang
 *	
 *	如果需要发送带附件的邮件, 则需要开发人员自己构造MimeMessage.
 *		如:
 *		import java.io.File;
 *		import javax.activation.FileDataSource;
 *		import javax.activation.DataHandler;
 *		
 *		import javax.mail.internet.MimeBodyPart;
 *		import javax.mail.internet.MimeMessage;
 *		import javax.mail.internet.MimeMultipart;
 *		//----------------------------------
 *				
 *		Session session = MailBox.getSession(mailName);
 *		
 *		MimeMessage msg = new MimeMessage(session);
 *		
 *		msg.setSubject(subject);
 *		
 *		MimeMultipart attachments = new MimeMultipart();
 *		
 *		// 构造BODY的内容
 *		MimeBodyPart textbody = new MimeBodyPart();
 *      textbody.setContent(bodyInfo, "text/plain; charset=gb2312")      
 *      // 构造附件的内容
 *      MimeBodyPart filebody = new MimeBodyPart();
 *		FileDataSource fileData = new FileDataSource(file);
 *		DataHandler fileDataHandler = new DataHandler(fileData);
 *			
 *       filebody.setDataHandler(fileDataHandler);
 *       filebody.setFileName(file.getName());
 *
 *    // 在part里添加BODY和附件
 *      attachments.addBodyPart(textbody);
 *		attachments.addBodyPart(filebody);
 *		
 *		// 设置MimeMessage的content.
 *		msg.setContent(attachments);
 *	// -----------------------------------------
 *	
 *	对于收信来说, 该类只封装了收取subject的API.
 *	该方法应用通过MAIL做异步触发.
 * </pre>
 * Company: neusoft
 * Date: 2004-10-15
 * @author liyj copy from oldframework
 * @version 1.0
 */

public class MailBox {
	// 静态数据存储信箱配置
	private static Map mailBox = new HashMap();	
	//强化无实例
	private MailBox(){}
	
	/**
	 * 获取session
	 */
	public static Session getSession(String mailName) throws IOException{
		
		Properties mailProps = FileUtil.getProperties(mailName + ".properties");		
		Session session = (Session)mailBox.get(mailName);		
		// 如果有值的话直接返回session
		if(session!=null) return session;
		// ----------------------------------------------------------------------
		
		// 如果没有值的话, 生成Session
		String ifAuth = mailProps.getProperty("mail.smtp.auth").toLowerCase();		
		if(ifAuth==null) session = Session.getInstance(mailProps);		
		
		if(ifAuth.intern()=="true".intern()){
			String user = mailProps.getProperty("mail.user");
			String password = mailProps.getProperty("mail.password");
			session = Session.getInstance(mailProps,
			new MyAuthenticator(user,password));
		}else
			session = Session.getInstance(mailProps);
		
		mailBox.put(mailName,session);
		return session;
		
	}
	
	/**
	 * 发送MAIL, 发送字符信息,不带附件
	 * @param mailName
	 *		mail的配置文件名称
	 * @param subject
	 *		发送邮件的主题
	 * @param bodyInfo
	 *		发送的信息体的内容
	 * @param receiver
	 *		接收者, 如:zhang@neusoft.com,li@neusoft.com,liu@neusoft.com
	 */	
	public static void sendMail(String mailName,String subject,String bodyInfo,String receiver) 
		throws Exception{
		
		Session session = getSession(mailName);		
		MimeMessage msg = new MimeMessage(session);		
		msg.setSubject(subject);		
		MimeMultipart attachments = new MimeMultipart();		
		MimeBodyPart textbody = new MimeBodyPart();
		textbody.setContent(bodyInfo, "text/plain; charset=gb2312");        
		attachments.addBodyPart(textbody);		
		msg.setContent(attachments);		
		sendMail(msg,receiver);		
	}

	/** 
	 * 发送带附件的MAIL
	 */
	public static void sendMail(MimeMessage msg,String receiver) 
		throws Exception{		
		InternetAddress address[] = InternetAddress.parse(receiver);
		Transport.send(msg,address);		
	}
	
	/**
	 * 构造MimeMessage
	 * @param mailName 
	 *		邮箱配置信息文件名
	 * @param 
	 */
	public static MimeMessage getMessage(
			String mailName,
			String subject,
			String bodyInfo,
			String[] fileName) throws Exception{
    	
		MimeMessage msg = new MimeMessage(MailBox.getSession(mailName));		
		msg.setSubject(subject);		
		MimeMultipart attachments = new MimeMultipart();
		
		// 构造BODY的内容
		MimeBodyPart textbody = new MimeBodyPart();
		textbody.setContent(bodyInfo, "text/plain; charset=gb2312");
        
		// 在part里添加BODY
		attachments.addBodyPart(textbody);
        
		// 添加附件的内容
		if(fileName!=null)
		for(int i=0;i<fileName.length;i++){
			MimeBodyPart filebody = new MimeBodyPart();
			File file = new File(fileName[i]);
			FileDataSource fileData = new FileDataSource(file);
			DataHandler fileDataHandler = new DataHandler(fileData);
				
			filebody.setDataHandler(fileDataHandler);
			filebody.setFileName(file.getName());
			
			attachments.addBodyPart(filebody);
		}
		
		// 设置MimeMessage的content.
		msg.setContent(attachments);    	
		return msg;    	
	}	
	
	/**
	 * 接收方法, 得到发MAIL的主题并删除邮件.
	 * @param mailName
	 *		邮件配置的资源名称
	 */
	public static String receiveMail(String mailName) throws Exception{
		Session session = getSession(mailName);
		
		// 得到Store对象
		Store store = session.getStore();
		store.connect();
    	
		// 得到Folder对象
		Folder inbox = store.getDefaultFolder().getFolder("INBOX");
		inbox.open(Folder.READ_WRITE);
    	
		// 获取信息对象
		String subject = null;
		String from = null;    	
    	
		if(inbox.getMessageCount() > 0){
			Message message = inbox.getMessage(1);
			
			// 删除信息的邮件
			message.setFlag(Flags.Flag.DELETED,true);			
			subject = message.getSubject();			
			Address[] addresses = message.getFrom();			
		} 
		
		// 强制关闭邮箱,邮件被删除
		inbox.close(true);
		store.close();
	    
		return subject;
	}
	
	public static void main(String args[]){
		try{
			/**
			String files[] = new String[2];
			files[0] = "d:\\devlop\\test\\FtpClient.java";
			files[1] = "d:\\devlop\\test\\JdbcTest.java";
			
			MimeMessage msg = MailBox.getMessage("mail_chenzt",
				"subject_info",
				"body information",
				files);
			
			sendMail(msg,"yz_dailybuild@td.neusoft.com");
			*/
			System.out.println(receiveMail("mail_chenzt"));
		}catch(Exception e){
			e.printStackTrace();
		}
	}	
}

/**
 * 认证的类
 */
class MyAuthenticator extends Authenticator{
	private String user;
	private String password;	
	
	MyAuthenticator(String user,String password){
		this.user = user;
		this.password = password;
	}
	
	public PasswordAuthentication getPasswordAuthentication(){
		return new PasswordAuthentication(user,password);
	}
}
