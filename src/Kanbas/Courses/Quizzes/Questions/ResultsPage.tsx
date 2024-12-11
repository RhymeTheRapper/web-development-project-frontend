import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, ListGroup } from "react-bootstrap";

interface QuizResult {
  score: number;
  totalPoints: number;
  answers: {
    questionId: string;
    answer: string;
    isCorrect: boolean;
    pointsEarned: number;
    question: {
      title: string;
      points: number;
      type: string;
    };
  }[];
  startTime: Date;
  endTime: Date;
}

export default function QuizResults() {
  const { qid } = useParams();
  const [results, setResults] = useState<QuizResult | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Replace with your actual API call
        const response = await fetch(`/api/quizzes/${qid}/results`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };
    fetchResults();
  }, [qid]);

  if (!results) {
    return <div>Loading results...</div>;
  }

  return (
    <div className="container mt-4">
      <Card>
        <Card.Header>
          <h4>Quiz Results</h4>
        </Card.Header>
        <Card.Body>
          <div className="mb-4">
            <h5>
              Score: {results.score}/{results.totalPoints}
            </h5>
            <p>
              Time taken:{" "}
              {new Date(results.endTime).getTime() -
                new Date(results.startTime).getTime()}{" "}
              minutes
            </p>
          </div>
          <ListGroup>
            {results.answers.map((answer, index) => (
              <ListGroup.Item
                key={answer.questionId}
                variant={answer.isCorrect ? "success" : "danger"}
              >
                <h6>
                  Question {index + 1}: {answer.question.title}
                </h6>
                <p>Your answer: {answer.answer}</p>
                <p>
                  Points earned: {answer.pointsEarned}/{answer.question.points}
                </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}
