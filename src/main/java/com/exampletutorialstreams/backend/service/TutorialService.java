package com.exampletutorialstreams.backend.service;

import com.exampletutorialstreams.backend.model.Tutorial;
import com.exampletutorialstreams.backend.repository.TutorialRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TutorialService implements InterfaceTutorialService {

    @Autowired
    private TutorialRepository tutorialRepository;

    @Override
    public List<Tutorial> findAll() {
        return tutorialRepository.findAll();
    }

    @Override
    public Tutorial findById(String id) {
        return tutorialRepository.findById(id).get();
    }

    @Override
    public List<Tutorial> findByName(String name) {
        List<Tutorial> tutorialsList = tutorialRepository.findByName(name);
        log.info("####### FIND BY Name, tutorialsList {} ",tutorialsList);
        return tutorialsList;
    }

    @Override
    public List<Tutorial> findByBaustein(String baustein) {
        List<Tutorial> tutorialsList = tutorialRepository.findByBaustein(baustein);
        log.info("####### FIND BY Baustein, tutorialsList {} ",tutorialsList);
        return tutorialsList;
    }

    @Override
    public List<Tutorial> findByBausteinAndLevel(String baustein, String level) {
        List<Tutorial> tutorialsList = tutorialRepository.findByBausteinAndLevel(baustein, level);
        log.info("####### FIND BY Baustein And Level tutorialsList {} ",tutorialsList);
        return tutorialsList;
    }

    @Override
    public Tutorial create(Tutorial tutorials) {
        return tutorialRepository.save(tutorials);
    }

    @Override
    public Tutorial update(Tutorial tutorials) {
        return tutorialRepository.save(tutorials);
    }

    @Override
    public void delete(String id) {
        tutorialRepository.deleteById(id);
    }
}
