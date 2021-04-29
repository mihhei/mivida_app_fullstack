import React from 'react';
import { FeedBackForm } from './feedbackform';
import { ContactInfo } from './contactinfo';
import { Heading } from './heading';

export const Block5 = () => {
  return (
    <div className="block bl5" id="yhteystiedot">
      <Heading value="Yhteystiedot" />
      <FeedBackForm />
      <ContactInfo />
    </div>
  );
};
