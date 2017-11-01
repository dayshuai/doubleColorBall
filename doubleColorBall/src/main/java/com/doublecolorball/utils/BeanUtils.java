package com.doublecolorball.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 数据转换工具类
 *  
 * @author: shi zunming
 */
public class BeanUtils {
	
	private static final Logger log = LoggerFactory.getLogger(BeanUtils.class);
	
	/**
     * 数据对象同属性对象转换
     * @param source
     * @param clazz
     * @return
     */
	public static <T> T dataConvert(Object source, Class<T> clazz) {
		try {
		    T target = clazz.newInstance();
			return dataObjConvert(source, target);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	/**
     * 批量数据对象同属性对象转换
     * @param sources
     * @param target
     * @return
     * @throws Exception
     */
	public static <T, E> List<T> dataConverts(List<E> sources, Class<T> target) {
		List<T> targets = null;
		if (sources != null && sources.size() > 0) {
			targets = new ArrayList<T>(sources.size());
			for (Object source : sources) {
				T temp = dataConvert(source, target);
				targets.add(temp);
			}
		}

		return targets;
	}
	
	/**
     * DTO、实体属性互转
     * @param source
     * @param target
     * @return
     * @throws Exception
     */
	public static <T> T dataObjConvert(Object source, T target) {
		try {
    		if(source == null || target == null) {
    			return null;
    		}
    		
    		Class<?> clazz = source.getClass();
    		
    		for (; clazz != Object.class; clazz = clazz.getSuperclass()) {
        		Field[] fields = clazz.getDeclaredFields();
        		for (Field field : fields) {
        		    try {
            			Method getMethod = null;
            			Method setMethod = null;
            			Object enVal = null;
            			String name = field.getName();
            			String upperName = name.substring(0, 1).toUpperCase() + name.substring(1);
            			
        				getMethod = clazz.getMethod("get" + upperName);
        				setMethod = findMethod(target.getClass(), "set" + upperName, getMethod.getReturnType());
            			
            			if (setMethod == null || getMethod == null) {
            				continue;
            			}
            			enVal = getMethod.invoke(source);
            			if (enVal == null) {
            				continue;
            			}
            			setMethod.setAccessible(true);
            			setMethod.invoke(target, enVal);
        		    } catch (Exception e) {
                        continue;
                    }
        		}
    		}
    		return target;
	    } catch (Exception e) {
	    	throw new RuntimeException(e);
        }
	}
	
	private static Method findMethod(Class<?> clazz, String name, Class<?>... paramTypes) {
		Class<?> searchType = clazz;
		while (searchType != null) {
			Method[] methods = (searchType.isInterface() ? searchType.getMethods() : searchType.getDeclaredMethods());
			for (Method method : methods) {
				if (name.equals(method.getName())
						&& (paramTypes == null || Arrays.equals(paramTypes, method.getParameterTypes()))) {
					return method;
				}
			}
			searchType = searchType.getSuperclass();
		}
		return null;
	}
}

