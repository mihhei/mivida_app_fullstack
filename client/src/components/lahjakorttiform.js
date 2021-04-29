import React, { useState } from 'react';
import { Yhteenveto } from './yhteenveto';

export const LahjakorttiForm = () => {
  const [showForm, setShowForm] = useState('first');
  const [formData, setFormData] = useState({
    nameTo: '',
    emailTo: '',
    summa: '',
    nameFrom: '',
    emailFrom: '',
    message: '',
  });

  const onNameToChange = (event) => {
    setFormData({ ...formData, nameTo: event.target.value });
  };

  const onEmailToChange = (event) => {
    setFormData({ ...formData, emailTo: event.target.value });
  };
  const onNameFromChange = (event) => {
    setFormData({ ...formData, nameFrom: event.target.value });
  };

  const onEmailFromChange = (event) => {
    setFormData({ ...formData, emailFrom: event.target.value });
  };

  const onSummChange = (event) => {
    setFormData({ ...formData, summa: event.target.value });
  };
  const onMessageChange = (event) => {
    setFormData({ ...formData, message: event.target.value });
  };

  const buttonClickHandler = (string) => {
    setShowForm(string);
  };

  return (
    <div className="giftCard">
      <h3>LAHJAKORTTI</h3>
      {showForm === 'first' && (
        <form
          id="giftcard-form"
          onSubmit={(event) => {
            event.preventDefault();
            setShowForm('second');
          }}
        >
          <div className="form-group">
            <label htmlFor="name">Saajan nimi</label>
            <input
              type="text"
              className="form-control"
              value={formData.nameTo}
              onChange={onNameToChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Saajan sähköposti</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              value={formData.emailTo}
              onChange={onEmailToChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Kortin arvo</label>
            <input
              type="number"
              className="form-control"
              value={formData.summa}
              onChange={onSummChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Eteenpäin
          </button>
        </form>
      )}
      {showForm === 'second' && (
        <form
          id="giftcard-form2"
          onSubmit={(event) => {
            event.preventDefault();
            setShowForm('last');
          }}
        >
          <div className="form-group">
            <label htmlFor="name">Ostajan nimi</label>
            <input
              type="text"
              className="form-control"
              value={formData.nameFrom}
              onChange={onNameFromChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Ostajan sähköposti</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              value={formData.emailFrom}
              onChange={onEmailFromChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Viesti vastaanottajalle</label>
            <textarea
              rows="5"
              className="form-control"
              value={formData.message}
              onChange={onMessageChange}
            />
          </div>
          <button
            onClick={() => {
              setShowForm('first');
            }}
            className="btn btn-primary"
          >
            Taaksepäin
          </button>
          <button type="submit" className="btn btn-primary">
            Eteenpäin
          </button>
        </form>
      )}
      {showForm === 'last' && (
        <Yhteenveto data={formData} ButtonClick={buttonClickHandler} />
      )}
    </div>
  );
};
