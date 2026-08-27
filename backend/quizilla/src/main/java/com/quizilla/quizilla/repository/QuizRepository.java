package com.quizilla.quizilla.repository;

import com.quizilla.quizilla.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

}