package com.exampletutorialstreams.backend.controller;

import com.exampletutorialstreams.backend.model.Tutorial;
import com.exampletutorialstreams.backend.service.InterfaceTutorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class TutorialController {

    @Autowired
    private InterfaceTutorialService tutorialService;

    @GetMapping("tutorial/all")
    public List<Tutorial> getAllTutorials(){
        return tutorialService.findAll();
    }

    @GetMapping("tutorial/id/{id}")
    public Tutorial getTutorialsById(@PathVariable String id){
        return tutorialService.findById(id);
    }

    @GetMapping("tutorial/name/{name}")
    public List<Tutorial> getTutorialsByName(@PathVariable String name){
        return tutorialService.findByName(name);
    }

    @GetMapping("tutorial/{baustein}")
    public List<Tutorial> getTutorialsByBaustein(@PathVariable String baustein){
        return tutorialService.findByBaustein(baustein);
    }

    @GetMapping("tutorial/{baustein}/{level}")
    public List<Tutorial> getTutorialsByBausteinAndLevel(@PathVariable String baustein, @PathVariable String level){
        return tutorialService.findByBausteinAndLevel(baustein, level);
    }

    @PostMapping("tutorial/create")
    public Tutorial create(@RequestBody Tutorial tutorial){
        tutorial.setTutorialId(UUID.randomUUID().toString());
        return tutorialService.create(tutorial);
    }

    @PutMapping("tutorial/update")
    public Tutorial update(@RequestBody Tutorial tutorial){
        return tutorialService.update(tutorial);
    }

    @DeleteMapping("tutorial/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteById(@PathVariable String id){
        tutorialService.delete(id);
    }
}
