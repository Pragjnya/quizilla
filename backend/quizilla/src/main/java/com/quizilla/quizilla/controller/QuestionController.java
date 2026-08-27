package com.quizilla.quizilla.controller;

import com.quizilla.quizilla.dto.QuestionResponse;
import com.quizilla.quizilla.entity.Question;
import com.quizilla.quizilla.service.QuestionService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public Question createQuestion(@RequestBody Question question) {
        return questionService.createQuestion(question);
    }

    @GetMapping("/quiz/{quizId}")
    public List<QuestionResponse> getQuestionsByQuizId(
            @PathVariable Long quizId
    ) {
        return questionService.getQuestionsByQuizId(quizId);
    }
}