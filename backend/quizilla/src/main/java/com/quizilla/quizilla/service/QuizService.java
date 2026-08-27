package com.quizilla.quizilla.service;
import com.quizilla.quizilla.dto.AnswerRequest;
import com.quizilla.quizilla.dto.AnswerReviewDto;
import com.quizilla.quizilla.dto.QuizResultResponse;
import com.quizilla.quizilla.dto.QuizSubmissionRequest;
import com.quizilla.quizilla.entity.Question;
import com.quizilla.quizilla.entity.Quiz;
import com.quizilla.quizilla.repository.QuestionRepository;
import com.quizilla.quizilla.repository.QuizRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
@Service
public class QuizService {
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    public QuizService(
            QuizRepository quizRepository,
            QuestionRepository questionRepository
    ) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }
    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }
     public QuizResultResponse submitQuiz(
            QuizSubmissionRequest submission
    ) {

        int score = 0;

        List<AnswerReviewDto> answerReviews =
                new ArrayList<>();


        for (AnswerRequest answer : submission.getAnswers()) {

            Question question =
                    questionRepository
                            .findById(
                                    answer.getQuestionId()
                            )
                            .orElseThrow();


            boolean isCorrect =
                    question.getCorrectAnswer()
                            .equalsIgnoreCase(
                                    answer.getSelectedAnswer()
                            );


            if (isCorrect) {

                score++;
            }


            String selectedAnswerText =
                    getOptionText(
                            question,
                            answer.getSelectedAnswer()
                    );


            String correctAnswerText =
                    getOptionText(
                            question,
                            question.getCorrectAnswer()
                    );


            AnswerReviewDto answerReview =
                    new AnswerReviewDto(

                            question.getId(),

                            question.getQuestionText(),

                            answer.getSelectedAnswer(),

                            selectedAnswerText,

                            question.getCorrectAnswer(),

                            correctAnswerText,

                            isCorrect
                    );


            answerReviews.add(answerReview);
        }


        int totalQuestions =
                submission.getAnswers().size();


        String message;


        if (score == totalQuestions) {

            message =
                    "PERFECT SCORE! You're absolutely insane!";

        } else if (score >= totalQuestions * 0.7) {

            message =
                    "Certified Quizilla genius!";

        } else if (score >= totalQuestions * 0.4) {

            message =
                    "Not bad... but you can do better!";

        } else {

            message =
                    "That was chaotic. Try again!";
        }


        return new QuizResultResponse(

                score,

                totalQuestions,

                message,

                answerReviews
        );
    }
    private String getOptionText(
            Question question,
            String answer
    ) {

        if (answer == null) {

            return "No answer selected";
        }


        return switch (
                answer.toUpperCase()
        ) {

            case "A" ->
                    question.getOptionA();

            case "B" ->
                    question.getOptionB();

            case "C" ->
                    question.getOptionC();

            case "D" ->
                    question.getOptionD();

            default ->
                    "Unknown answer";
        };
    }
    public Quiz updateQuiz(
        Long id,
        Quiz updatedQuiz
) {
    Quiz existingQuiz = quizRepository
            .findById(id)
            .orElseThrow();

    existingQuiz.setTitle(
            updatedQuiz.getTitle()
    );
    existingQuiz.setCategory(
            updatedQuiz.getCategory()
    );
    existingQuiz.setDescription(
            updatedQuiz.getDescription()
    );
    return quizRepository.save(
            existingQuiz
    );
}
}