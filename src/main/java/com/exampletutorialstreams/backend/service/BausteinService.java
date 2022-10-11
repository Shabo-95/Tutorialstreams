package com.exampletutorialstreams.backend.service;

import com.exampletutorialstreams.backend.model.Baustein;
import com.exampletutorialstreams.backend.repository.BausteinRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class BausteinService implements InterfaceBausteinService {

    @Autowired
    private BausteinRepository bausteinRepository;

    @Override
    public List<Baustein> findAll() {
        return bausteinRepository.findAll();
    }

    @Override
    public Baustein findById(String id) {
        return bausteinRepository.findById(id).get();
    }

    @Override
    public List<Baustein> findByName(String name) {
        log.info("####### FIND BY TITLE {} ",name);
        List<Baustein> bausteinList = bausteinRepository.findByName(name);
        log.info("####### FIND BY bausteinList {} ",bausteinList);
        return bausteinList;
    }

    @Override
    public Baustein create(Baustein baustein) {
        return bausteinRepository.save(baustein);
    }

    @Override
    public Baustein update(Baustein baustein) {
        return bausteinRepository.save(baustein);
    }

    @Override
    public void delete(String id) {
        bausteinRepository.deleteById(id);
    }
}
