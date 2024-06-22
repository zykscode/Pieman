// 'use client';

import PiAuth from "./_components/PiAuth";
import PiPayment from "./_components/PiPayement";

// import { useUser, UserProvider } from '#/contexts/UserContext';
// import { MyPaymentMetadata, PaymentDTO } from '#/types';
// import React, { useState } from 'react';
// import Header from './_components/Header';
// import SignIn from './_components/SignIn';

// const Shop = () => {
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const { user, signIn, signOut } = useUser();

//   const onModalClose = () => {
//     setShowModal(false);
//   }

//   const orderProduct = async (memo: string, amount: number, paymentMetadata: MyPaymentMetadata) => {
//     if (user === null) {
//       return setShowModal(true);
//     }
//     const paymentData = { amount, memo, metadata: paymentMetadata };
//     const callbacks = {
//       onReadyForServerApproval,
//       onReadyForServerCompletion,
//       onCancel,
//       onError
//     };
//     const payment = await window.Pi.createPayment(paymentData, callbacks);
//     console.log(payment);
//   }

//   const onReadyForServerApproval = (paymentId: string) => {
//     console.log("onReadyForServerApproval", paymentId);
//     axiosClient.post('/payments/approve', { paymentId });
//   }

//   const onReadyForServerCompletion = (paymentId: string, txid: string) => {
//     console.log("onReadyForServerCompletion", paymentId, txid);
//     axiosClient.post('/payments/complete', { paymentId, txid });
//   }

//   const onCancel = (paymentId: string) => {
//     console.log("onCancel", paymentId);
//     return axiosClient.post('/payments/cancelled_payment', { paymentId });
//   }

//   const onError = (error: Error, payment?: PaymentDTO) => {
//     console.log("onError", error);
//     if (payment) {
//       console.log(payment);
//     }
//   }

//   return (
//     <>
//       <Header />
    
//       {showModal && <SignIn onSignIn={signIn} onModalClose={onModalClose} />}
//     </>
//   );
// };

// const HomePage = () => (
//   <UserProvider>
//     <Shop />
//   </UserProvider>
// );

// export default HomePage;


// app/page.js
;

export default function Home() {
  return (
    <main>
      <h1>Pi Network Integration</h1>
      <PiAuth />
      <PiPayment />
    </main>
  );
}