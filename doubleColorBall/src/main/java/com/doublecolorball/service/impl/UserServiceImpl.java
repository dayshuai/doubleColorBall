package com.doublecolorball.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.doublecolorball.mapper.UserDAO;
import com.doublecolorball.model.User;
import com.doublecolorball.service.UserService;

/**
 * Created by SuperS on 15/12/13.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
    @Resource
    private UserDAO userDAO;

    @Override
    public boolean userIsNotEmpty(String name) {
        int total = 0;
        try {
            total = userDAO.userIsNotEmpty(name);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return total > 0 ? true : false;
    }


    @Override
    public void saveUser(User user) {
        try {
            userDAO.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateUser(User user) {
        try {
            userDAO.update(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public User getUser(Integer id) {
        User u = null;
        try {
            u = userDAO.getUser(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return u;
    }

    @Override
    public void deleteUser(Integer id) {
        try {
            userDAO.delete(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<User> getUsers() {
        List<User> users = null;
        try {
            users = userDAO.getUsers();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return users;
    }
    @Cacheable(value="user",key="'user'+#userName")
    @Override
    public User getUserByUserName(String userName) {
        User u = null;
        try {
            u = userDAO.getUserByUserName(userName);
        } catch (Exception e) {
        	e.printStackTrace();        }
        return u;
    }
}
