package com.exampletutorialstreams.backend.service;

import com.exampletutorialstreams.backend.model.Baustein;

import java.util.List;

public interface InterfaceBausteinService {

    List<Baustein> findAll();

    Baustein findById(String id);

    List<Baustein> findByName(String name);

    Baustein create(Baustein baustein);

    Baustein update(Baustein baustein);

    void delete(String id);

}
