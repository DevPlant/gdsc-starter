package com.example.testdocs;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.core.io.ClassPathResource;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Builder;
import lombok.Data;
import lombok.SneakyThrows;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;

public class TestDocsApplication {

    @Data
    @Builder
    public static class Input {

        private String key;
        private String type;
        private Map<String, Object> props;

    }


    @SneakyThrows
    public static void main(String[] args) {

        var text = readDocxFile(new ClassPathResource("sample-input.docx").getFile().getAbsolutePath());

        var regex = "\\{\\{(.*?)}}";
        List<String> matches = new ArrayList<>();
        Matcher m = Pattern.compile(regex).matcher(text);

        while (m.find()) {
            matches.add(m.group());
        }

        System.out.println(matches);

        var inputs = new ArrayList<Input>();
        for (var key : matches) {
            String cleaned = key.replace("{{", "").replace("}}", "");

            var label = cleaned.replace(".", " ");
            label = label.substring(0, 1).toUpperCase() + label.substring(1);
            inputs.add(Input.builder().key(cleaned).type("text").props(Map.of("label", label)).build());
        }

        var om = new ObjectMapper();
        var json = om.writerWithDefaultPrettyPrinter().writeValueAsString(inputs);

        var out = File.createTempFile("sample-out",".json");
        try (var fos = new FileOutputStream(out)) {
            fos.write(json.getBytes());
        }
        System.out.println("Output written to: " + out.getAbsolutePath());

    }


    public static String readDocxFile(String fileName) {

        try (var fis = new FileInputStream(fileName); var document = new XWPFDocument(fis);) {

            var paragraphs = document.getParagraphs();
            var whole = new StringBuilder();
            for (XWPFParagraph para : paragraphs) {
                whole.append("\n").append(para.getText());
            }
            return whole.toString();
        } catch (Exception e) {
            return "";
        }
    }

}
