package com.quizilla.quizilla.controller;

import com.quizilla.quizilla.dto.QuizResultResponse;
import com.quizilla.quizilla.dto.QuizSubmissionRequest;
import com.quizilla.quizilla.entity.Quiz;
import com.quizilla.quizilla.service.QuizService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizService.createQuiz(quiz);
    }

    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @PostMapping("/submit")
    public QuizResultResponse submitQuiz(
            @RequestBody QuizSubmissionRequest submission
    ) {
        return quizService.submitQuiz(submission);
    }

    @PutMapping("/{id}")
    public Quiz updateQuiz(
            @PathVariable Long id,
            @RequestBody Quiz quiz
    ) {
        return quizService.updateQuiz(id, quiz);
    }
}