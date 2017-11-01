package com.doublecolorball.utils;

import java.io.UnsupportedEncodingException;

import org.slf4j.MDC;
import org.springframework.util.DigestUtils;

/**
 * 加密工具类
 * 
 * @author shi zunming
 *
 */
public class SecurityUtil {

	/** 默认hash盐值 */
	public static final String DEFAULT_SALT = "4bdbce7643b3ae37eb953df1e93c37e9";

	/**
     * md5加密算法
     * 
     * @param input
     * @return
     */
    public static String md5(String input) {
    	try {
			return DigestUtils.md5DigestAsHex(input.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			return null;
		}
    }

    /**
     * 用户密码加密
     * @param userId
     * @param password
     * @return
     */
    public static String md5Pwd(String userName, String password) {
    	return md5(userName + password);
    }

    public static void main(String[] args) {
    	System.out.println(md5Pwd("linguoxiang","1"));
    	System.out.println(md5Pwd("liuyaogang","1"));
	}
    /**
     * 多个字段联合散列，一般用于数据库记录关键字段值同时进行hash
     * 
     * @param fieldValue
     * @return
     */
    public static String fieldHash(String... fieldValue) {
    	if (fieldValue == null)
    		return null;

    	StringBuilder builder = new StringBuilder(DEFAULT_SALT);
    	for (String str : fieldValue) {
    		builder.append(str);
    	}

    	return md5(builder.toString());
    }

    /**
     * 数据是否匹配hash散列值
     * 
     * @param hashValue	散列值
     * @param fieldValue
     * @return	true 匹配		false 不匹配
     */
    public static boolean isMatchingHash(String hashValue, String... fieldValue) {
    	if (hashValue == null && fieldValue == null)
    		return true;

    	if (hashValue == null)
    		return false;

    	return hashValue.equals(fieldHash(fieldValue));
    }

    /**
     * 生成passKey
     * @param fieldValue	字段值
     * @param salt	盐值
     * @return
     */
    public static String generatePassKey(String fieldValue, String salt) {
    	String userName = MDC.get("userName");

    	return fieldHash(userName, fieldValue, salt);
    }

    /**
     * 验证passKey
     * @param hashValue
     * @param fieldValue
     * @param salt	盐值
     * @return
     */
    public static boolean validatePassKey(String hashValue, String fieldValue, String salt) {
    	String userName = MDC.get("userName");

    	return isMatchingHash(hashValue, userName, fieldValue, salt);
    }
}
