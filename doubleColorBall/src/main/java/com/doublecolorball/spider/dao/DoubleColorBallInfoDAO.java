package com.doublecolorball.spider.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.doublecolorball.model.DoubleColorBallInfo;

/**
 * @author code4crafer@gmail.com
 *         Date: 13-6-23
 *         Time: 下午4:27
 */
public interface DoubleColorBallInfoDAO {

    @Insert("insert into doublecolorball_info (`red_nums`,`blue_num`,`open_date`,`open_no`,`all_nums`,`sale_num`,`table`,`first_num`,`second_num`) values (#{redNums},#{blueNum},#{openDate},#{openNo},#{allNums},#{saleNum},#{table},#{firstGradeNum},#{secondGradeNum})")
    public int add(DoubleColorBallInfo doubleColorBallInfo);
    
    @Select("select count(1) from doublecolorball_info where open_no = #{openNo}")
    public int queryOpenNoIsExists(DoubleColorBallInfo doubleColorBallInfo);
   
    @Update("update doublecolorball_info set red_nums = #{redNums}, blue_num = #{blueNum}, open_date = #{openDate}, all_nums = #{allNums}, sale_num = #{saleNum}, first_num = #{firstGradeNum}, second_num = #{secondGradeNum} where open_no = #{openNo}")
    public int update(DoubleColorBallInfo doubleColorBallInfo);
}
