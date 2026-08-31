import { useState } from 'react';

export default function FeedbackForm({ onAdd }) {
  const [form, setForm] = useState({
    guestName: '',
    email: '',
    comments: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // tell the parent about this new submission
    onAdd(form);
    // then clear the form
    setForm({
      guestName: '',
      email: '',
      comments: '',
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="guest-name">Guest name:</label>
      <input
        id="guest-name"
        name="guestName"
        type="text"
        value={form.guestName}
        onChange={handleChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />

      <label htmlFor="comments">Comments:</label>
      <textarea
        id="comments"
        name="comments"
        value={form.comments}
        onChange={handleChange}
      />

      <button type="submit">Submit feedback</button>

      <p>You typed: {form.guestName}</p>
    </form>
  );
}