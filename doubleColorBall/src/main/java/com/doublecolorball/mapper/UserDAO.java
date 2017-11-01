package com.doublecolorball.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.doublecolorball.model.User;

/**
 * Created by SuperS on 16/3/8.
 */
@Repository
public interface UserDAO {
    // 添加或保存用户
    public void save(User user) throws Exception;

    // 更新用户
    public void update(User user) throws Exception;

    // 获取用户列表
    public List<User> getUsers() throws Exception;

    // 删除用户
    public void delete(Integer id) throws Exception;

    // 获取用户
    public User getUser(Integer id) throws Exception;

    // 是否存在用户
    public int userIsNotEmpty(String name) throws Exception;

	public User getUserByUserName(String userName);
}
