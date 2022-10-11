package com.exampletutorialstreams.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Requirement {

    @Id
    private String requirementId;
    private String baustein;
    private String level;
    private Integer position;

}
