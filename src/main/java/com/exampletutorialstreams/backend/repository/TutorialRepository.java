package com.exampletutorialstreams.backend.repository;

import com.exampletutorialstreams.backend.model.Tutorial;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TutorialRepository extends MongoRepository<Tutorial, String> {

    @Query("{'name':?0}")
    public List<Tutorial> findByName(String name);
    @Query("{'baustein':?0}")
    public List<Tutorial> findByBaustein(String baustein);

    @Query("{'baustein':?0, 'level':?1}}")
    public List<Tutorial> findByBausteinAndLevel(String baustein, String level);

}
