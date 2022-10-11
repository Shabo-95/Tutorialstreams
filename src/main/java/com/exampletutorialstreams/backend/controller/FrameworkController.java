package com.exampletutorialstreams.backend.controller;

import com.exampletutorialstreams.backend.model.Framework;
import com.exampletutorialstreams.backend.service.FrameworkService;
import com.exampletutorialstreams.backend.service.InterfaceFrameworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class FrameworkController {

    @Autowired
    private InterfaceFrameworkService frameworkService;

    @GetMapping("framework/all")
    public List<Framework> getAllFrameworks(){
        return frameworkService.findAll();
    }

    @GetMapping("framework/id/{id}")
    public Framework getFrameworksById(@PathVariable String id){
        return frameworkService.findById(id);
    }

    @GetMapping("framework/name/{name}")
    public List<Framework> getFrameworksByName(@PathVariable String name){
        return frameworkService.findByName(name);
    }

    @PostMapping("framework/create")
    public Framework create(@RequestBody Framework framework){
        framework.setFrameworkId(UUID.randomUUID().toString());
        return frameworkService.create(framework);
    }

    @PutMapping("framework/update")
    public Framework update(@RequestBody Framework framework){
        return frameworkService.update(framework);
    }

    @DeleteMapping("framework/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteById(@PathVariable String id){
        frameworkService.delete(id);
    }
}
