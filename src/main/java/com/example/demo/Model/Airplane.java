package com.example.demo.Model;
import jakarta.persistence.*;


@Entity
//@Data
@Table(name="Airplane")
public class Airplane {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long airplaneID;

    @Column(nullable = false)
    private String airline;

    @Column(nullable = false)
    private String planeModel;

    @Column(nullable = false)
    private Integer capacity;
}
