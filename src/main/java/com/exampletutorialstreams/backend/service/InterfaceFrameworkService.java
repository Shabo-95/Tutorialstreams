package com.exampletutorialstreams.backend.service;

import com.exampletutorialstreams.backend.model.Framework;

import java.util.List;

public interface InterfaceFrameworkService {

    List<Framework> findAll();

    Framework findById(String id);

    List<Framework> findByName(String name);

    Framework create(Framework framework);

    Framework update(Framework framework);

    void delete(String id);

}
