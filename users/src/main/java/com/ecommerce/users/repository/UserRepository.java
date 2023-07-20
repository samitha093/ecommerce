package com.ecommerce.users.repository;

import com.ecommerce.users.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {

    User getById(Long id);

    User findByEmail(String email);

}
