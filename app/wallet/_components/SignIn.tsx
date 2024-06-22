import React from 'react';

interface SignInProps {
  onSignIn: () => Promise<void>;
  onModalClose: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn, onModalClose }) => (
  <div>
    <h2>Sign In</h2>
    <button onClick={onSignIn}>Sign In with Pi</button>
    <button onClick={onModalClose}>Close</button>
  </div>
);

export default SignIn;
