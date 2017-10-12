package com.doublecolorball.utils;

/**
 * Created by SuperS on 16/2/26.
 */

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by SuperS on 15/12/10.
 * 字符串辅助类 判断是否为空
 * 辅助 DateUtil类
 */
public class StringUtil {

    public static boolean isEmpty(String str){
        if("".equals(str)|| str==null){
            return true;
        }else{
            return false;
        }
    }

    public static boolean isNotEmpty(String str){
        if(!"".equals(str)&&str!=null){
            return true;
        }else{
            return false;
        }
    }

    public static boolean isNumeric(String str){
        Pattern pattern = Pattern.compile("[0-9]*");
        Matcher isNum = pattern.matcher(str);
        if(!isNum.matches()){
            return false;
        }
        return true;
    }
}
