import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function StripePayment(props) {
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });
    if (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
    } else {
      const order = {
        products: props.cart,
        amount: props.total,
        paymentMethodId: paymentMethod.id
      };
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order)
        });
        if (response.ok) {
          setSucceeded(true);
          setProcessing(false);
          props.clearCart();
        } else {
          setError('Payment failed');
          setProcessing(false);
        }
      } catch (error) {
        setError(`Payment failed: ${error.message}`);
        setProcessing(false);
      }
    }
  }

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : null);
  }

  return (
    <div>
      <h2>Payment</h2>
      <form onSubmit={handleSubmit}>
        <CardElement onChange={handleChange} />
        <button disabled={processing || disabled || succeeded}>{processing ? 'Processing...' : 'Pay'}</button>
      </form>
      {error && <div>{error}</div>}
      {succeeded && <div>Payment succeeded!</div>}
    </div>
  );
}

export default StripePayment;
