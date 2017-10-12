package com.doublecolorball.service;

import com.doublecolorball.model.DoubleColorBallInfo;
import com.doublecolorball.model.UserSsq;
import com.github.pagehelper.PageInfo;

public interface DoublecolorballInfoService{
    
	public PageInfo<DoubleColorBallInfo> findAll(int currentPage, int pageSize);
	
	public void validBall(UserSsq userSsq);
	
	public void queryBallListForValid();
}
