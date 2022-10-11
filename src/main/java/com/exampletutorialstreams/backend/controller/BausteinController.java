package com.exampletutorialstreams.backend.controller;

import com.exampletutorialstreams.backend.model.Baustein;
import com.exampletutorialstreams.backend.service.InterfaceBausteinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class BausteinController {

    @Autowired
    private InterfaceBausteinService bausteinService;

    @GetMapping("baustein/all")
    public List<Baustein> getAllBaustein(){
        return bausteinService.findAll();
    }

    @GetMapping("baustein/id/{id}")
    public Baustein getBausteinById(@PathVariable String id){
        return bausteinService.findById(id);
    }

    @GetMapping("baustein/name/{name}")
    public List<Baustein> getBausteinByName(@PathVariable String name){
        return bausteinService.findByName(name);
    }

    @PostMapping("baustein/create")
    public Baustein create(@RequestBody Baustein baustein){
        baustein.setBausteinId(UUID.randomUUID().toString());
        return bausteinService.create(baustein);
    }

    @PutMapping("baustein/update")
    public Baustein update(@RequestBody Baustein baustein){
        return bausteinService.update(baustein);
    }

    @DeleteMapping("baustein/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteById(@PathVariable String id){
        bausteinService.delete(id);
    }
}
