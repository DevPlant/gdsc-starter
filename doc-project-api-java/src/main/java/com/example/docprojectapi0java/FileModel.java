package com.example.docprojectapi0java;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileModel {

    private int id;
    private String name;
    private int size;
}
