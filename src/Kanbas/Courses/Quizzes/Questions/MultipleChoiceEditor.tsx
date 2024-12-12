export default function MultipleChoice() {
    return (
        <div id="multiple-choice-question-type">
            <p>
                Enter your question and multiple answers, then select the one correct answer.
            </p>
            <div>
                <label htmlFor="question">Question</label>
                <textarea className="form-control" id="question"></textarea>
            </div>
            <p>Answers</p>
            <div>
                <label htmlFor="answer-a">Possible Answer</label>
                <input className="form-control" id="answer-a" />
                <label htmlFor="answer-b">Possible Answer</label>
                <input className="form-control" id="answer-b" />
                <label htmlFor="answer-c">Possible Answer</label>
                <input className="form-control" id="answer-c" />
                <label htmlFor="answer-d">Possible Answer</label>
                <input className="form-control" id="answer-d" />
            </div>
        </div>
    );
}
