package com.java110.order.dao;

import java.util.Map;

/**
 * 权限数据层操作接口
 * Created by Administrator on 2019/4/1.
 */
public interface IPrivilegeDAO {

    /**
     * 保存用户权限
     * @param info
     * @return
     */
    public boolean saveUserDefaultPrivilege(Map info);


    /**
     * 删除用所有权限
     * @param info
     * @return
     */
    public boolean deleteUserAllPrivilege(Map info);
}