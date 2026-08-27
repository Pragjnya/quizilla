package com.quizilla.quizilla.dto;

public class AnswerReviewDto {

    private Long questionId;

    private String questionText;

    private String selectedAnswer;

    private String selectedAnswerText;

    private String correctAnswer;

    private String correctAnswerText;

    private boolean correct;


    public AnswerReviewDto(
            Long questionId,
            String questionText,
            String selectedAnswer,
            String selectedAnswerText,
            String correctAnswer,
            String correctAnswerText,
            boolean correct
    ) {

        this.questionId = questionId;
        this.questionText = questionText;
        this.selectedAnswer = selectedAnswer;
        this.selectedAnswerText = selectedAnswerText;
        this.correctAnswer = correctAnswer;
        this.correctAnswerText = correctAnswerText;
        this.correct = correct;
    }


    public Long getQuestionId() {
        return questionId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public String getSelectedAnswer() {
        return selectedAnswer;
    }

    public String getSelectedAnswerText() {
        return selectedAnswerText;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public String getCorrectAnswerText() {
        return correctAnswerText;
    }

    public boolean isCorrect() {
        return correct;
    }
}