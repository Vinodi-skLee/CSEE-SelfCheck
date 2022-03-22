package com.example.cseeselfcheck.user.domain;

import com.example.cseeselfcheck.common.BaseEntity;
import com.example.cseeselfcheck.major.domain.Major;

import lombok.Getter;


import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Getter
public class User extends BaseEntity {

    @Id @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Major major;

    private String email;

    private String studentNumber;

    private int result;

    private LocalDateTime resultDate;

    private String takenStatus;
}
