package com.doublecolorball.mapper;

import java.util.List;

import com.doublecolorball.model.DoubleColorBallInfo;

/**
 * 双色球数据访问
 * 
 */
public interface DoublecolorballInfoDAO {

	public List<DoubleColorBallInfo> findAll(DoubleColorBallInfo doubleColorBallInfo);

	public DoubleColorBallInfo selectByOpenNo(String openNo);
	
	public String selectMaxOpenNo();
	
}
