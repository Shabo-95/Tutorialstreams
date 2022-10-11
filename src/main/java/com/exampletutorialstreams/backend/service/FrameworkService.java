package com.exampletutorialstreams.backend.service;

import com.exampletutorialstreams.backend.model.Framework;
import com.exampletutorialstreams.backend.repository.FrameworkRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class FrameworkService implements InterfaceFrameworkService {

    @Autowired
    private FrameworkRepository frameworkRepository;

    @Override
    public List<Framework> findAll() {
        return frameworkRepository.findAll();
    }

    @Override
    public Framework findById(String id) {
        return frameworkRepository.findById(id).get();
    }

    @Override
    public List<Framework> findByName(String name) {
        log.info("####### FIND BY TITLE {} ",name);
        List<Framework> frameworkList = frameworkRepository.findByName(name);
        log.info("####### FIND BY frameworkList {} ",frameworkList);
        return frameworkList;
    }

    @Override
    public Framework create(Framework framework) {
        return frameworkRepository.save(framework);
    }

    @Override
    public Framework update(Framework framework) {
        return frameworkRepository.save(framework);
    }

    @Override
    public void delete(String id) {
        frameworkRepository.deleteById(id);
    }
}
