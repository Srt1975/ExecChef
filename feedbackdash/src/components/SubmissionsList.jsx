function SubmissionsList({ submissions = [] }) {
    const submissionsToRender = []

    return (
    <div>
      <h2>Submissions</h2>
      <ul>
        {submissionsToRender.map((submission, index) => (
          <li key={index}>
            <strong>{submission.guestName}</strong> ({submission.email}):{' '}
            {submission.comments}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubmissionsList;