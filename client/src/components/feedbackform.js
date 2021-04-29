import React, { useState } from 'react';
import {Heading} from './heading';

export const FeedBackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');

  const onNameChange = (event) => {
    setFormData({ ...formData, name: event.target.value });
  };

  const onEmailChange = (event) => {
    setFormData({ ...formData, email: event.target.value });
  };

  const onMessageChange = (event) => {
    setFormData({ ...formData, message: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/feedback/send', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.status === 'success') {
      setSubmitMessage('Viestisi on lähetetty onnistuneesti'); 
      resetForm();
    } else if(data.status === 'fail') {
      setSubmitMessage("Viestin lähettäminen epäonnistui, yritä uudelleen!");
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit} method="POST">
      <Heading value="Lähetä meille viestiä" />
      <div className="submitMessage">{submitMessage}</div>
      <div className="form-group">
        <label htmlFor="name">Nimi</label>
        <input
          type="text"
          className="form-control"
          value={formData.name}
          onChange={onNameChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Sähköposti</label>
        <input
          type="email"
          className="form-control"
          aria-describedby="emailHelp"
          value={formData.email}
          onChange={onEmailChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Viesti</label>
        <textarea
          className="form-control"
          rows="5"
          value={formData.message}
          onChange={onMessageChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Lähetä
      </button>
    </form>
  );
};
