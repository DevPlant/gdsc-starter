package com.example.docprojectapi0java;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@RestController
public class FilesController {

    private final FileRepo fileRepo;


    @PostConstruct
    public void init() {

        fileRepo.save(new FileEntity( "file1", 100));
        fileRepo.save(new FileEntity( "file2", 200));
        fileRepo.save(new FileEntity( "file3", 300));
    }

    @GetMapping("/files")
    public List<FileModel> getFiles() {

        return fileRepo.findAll().stream().map(fileEntity ->
                new FileModel(fileEntity.getId(), fileEntity.getName(), fileEntity.getSize())).toList();
    }

}
