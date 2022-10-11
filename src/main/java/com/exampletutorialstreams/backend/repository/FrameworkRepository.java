package com.exampletutorialstreams.backend.repository;

import com.exampletutorialstreams.backend.model.Framework;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FrameworkRepository extends MongoRepository<Framework, String> {
    @Query("{'name':?0}")
    public List<Framework> findByName(String name);
}
