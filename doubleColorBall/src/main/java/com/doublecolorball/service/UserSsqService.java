package com.doublecolorball.service;

import com.doublecolorball.model.UserSsq;
import com.github.pagehelper.PageInfo;

public interface UserSsqService{

	public int insertSelective(UserSsq userSsq);
	
	public PageInfo<UserSsq> findUserSsq(int currentPage, int pageSize);
}
