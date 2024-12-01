package com.example.demo.Repository;

import com.example.demo.Model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Card, Long> {
}
