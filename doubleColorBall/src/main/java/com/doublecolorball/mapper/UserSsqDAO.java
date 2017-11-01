package com.doublecolorball.mapper;

import java.util.List;

import com.doublecolorball.model.UserSsq;

/**
 * 用户双色球数据访问
 * 
 */
public interface UserSsqDAO {
	
	/**
 	* 保存用户双色球
 	* 
 	*/
    int insert(UserSsq userSsq);

	/**
 	* 用户双色球属性非空保存
 	* 
 	*/
    int insertSelective(UserSsq userSsq);
	
	/**
 	* 根据Id查询用户双色球
 	* 
 	*/
    UserSsq selectById(Long id);

	/**
 	* 修改用户双色球
 	* 
 	*/
    int updateById(UserSsq userSsq);
    
    /**
 	* 用户双色球属性非空修改
 	* 
 	*/
    int updateIdKeySelective(UserSsq userSsq);
    
    /**
 	* 根据id删除用户双色球
 	* 
 	*/	    	
	int deleteById(Long id);

	List<UserSsq> queryNoGradeBall();
	
	List<UserSsq> findUserSsq(UserSsq userSsq);
  
}
