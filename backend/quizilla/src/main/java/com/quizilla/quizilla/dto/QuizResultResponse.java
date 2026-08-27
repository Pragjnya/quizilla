package com.quizilla.quizilla.dto;

import java.util.List;

public class QuizResultResponse {

    private int score;

    private int totalQuestions;

    private String message;

    private List<AnswerReviewDto> answerReviews;


    public QuizResultResponse(
            int score,
            int totalQuestions,
            String message,
            List<AnswerReviewDto> answerReviews
    ) {
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.message = message;
        this.answerReviews = answerReviews;
    }


    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }


    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public List<AnswerReviewDto> getAnswerReviews() {
        return answerReviews;
    }

    public void setAnswerReviews(
            List<AnswerReviewDto> answerReviews
    ) {
        this.answerReviews = answerReviews;
    }
}