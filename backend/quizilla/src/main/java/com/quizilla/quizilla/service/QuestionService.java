package com.quizilla.quizilla.service;
import com.quizilla.quizilla.dto.QuestionResponse;
import com.quizilla.quizilla.entity.Question;
import com.quizilla.quizilla.repository.QuestionRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }
    public List<QuestionResponse> getQuestionsByQuizId(Long quizId) {
        return questionRepository.findByQuizId(quizId)
                .stream()
                .map(question -> new QuestionResponse(
                        question.getId(),
                        question.getQuestionText(),
                        question.getOptionA(),
                        question.getOptionB(),
                        question.getOptionC(),
                        question.getOptionD()
                ))
                .toList();
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
}