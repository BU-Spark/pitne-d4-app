import React, { useState } from 'react';

interface SubscriptionFormProps {
  onSubmit: (email: string) => void;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email);
    setEmail(''); // Clear the input field after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Subscribe</button>
    </form>
  );
};

export default SubscriptionForm;

// Code to add in the home page to handle the submit button and use the API to subsrcibe to the mailing list.

// import React from 'react';
// import ReactDOM from 'react-dom';
// import SubscriptionForm from './SubscriptionForm';

// const App: React.FC = () => {
//   const handleSubscription = (email: string) => {
//     // Here you can implement your subscription logic, such as making an API request
//     // For demonstration purposes, we'll just log the email to the console
//     console.log(`Subscribing email: ${email}`);
//   };

//   return (
//     <div>
//       <h1>Subscribe to Our Mailing List</h1>
//       <SubscriptionForm onSubmit={handleSubscription} />
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById('root'));