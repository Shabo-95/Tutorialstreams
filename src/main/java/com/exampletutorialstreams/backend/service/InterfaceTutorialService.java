package com.exampletutorialstreams.backend.service;

import com.exampletutorialstreams.backend.model.Tutorial;

import java.util.List;

public interface InterfaceTutorialService {

    List<Tutorial> findAll();

    Tutorial findById(String id);

    List<Tutorial> findByName(String name);

    List<Tutorial> findByBaustein(String baustein);

    List<Tutorial> findByBausteinAndLevel(String baustein, String level);

    Tutorial create(Tutorial tutorial);

    Tutorial update(Tutorial tutorial);

    void delete(String id);

}
