package com.exampletutorialstreams.backend.repository;

import com.exampletutorialstreams.backend.model.Baustein;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BausteinRepository extends MongoRepository<Baustein, String> {
    @Query("{'name':?0}")
    public List<Baustein> findByName(String name);
}
