package com.exampletutorialstreams.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "Tutorials")
public class Tutorial {

    @Id
    private String tutorialId;
    private String name;
    private String baustein;
    private String level;
    private String url;
}
