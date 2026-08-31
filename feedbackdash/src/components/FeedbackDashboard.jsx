import { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import SubmissionsList from './SubmissionsList';

function FeedbackDashboard() {
  const [submissions, setSubmissions] = useState([]);

  function addSubmission(newSubmission) {
    setSubmissions(prevSubmissions => [
      ...prevSubmissions,
      newSubmission,
    ]);
  }

  return (
    <div>
      <h1>Dashboard test</h1>
      <FeedbackForm onAdd={addSubmission} />
      <SubmissionsList submissions={submissions} />
    </div>
  );
}

export default FeedbackDashboard;