export default function TrueFalse() {
  return (
    <div id="true-false-question-type">
      <p>
        Enter your text, then select if True or False is the correct answer.
      </p>
      <div>
        <label htmlFor="question">Question</label>
        <textarea className="form-control" id="question"></textarea>
      </div>
      <p>Answers</p>
      <div>
        <label htmlFor="true">True</label>
        <input className="form-control" type="radio" value="False" id="true" />
        <label htmlFor="false">False</label>
        <input className="form-control" type="radio" value="False" id="false" />
      </div>
    </div>
  );
}
