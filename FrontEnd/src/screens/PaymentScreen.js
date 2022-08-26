import FormContainer from 'components/FormContainer'
import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from 'redux/Actions/CartActions';

const PaymentScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [paymentMethod,setPaymentMethod] = useState("PayPal")
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder")
    }
    if(!shippingAddress){
        navigate("/shipping")
    }
  return (
    <FormContainer>
    {/* <CheckoutSteps step1 step2/> */}
    <h1>Phương Thức Thanh Toán</h1>
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label as='legend'>Chọn Phương Thức</Form.Label>
        <Col>
          <Form.Check
            type='radio'
            label='PayPal or Credit Card'
            id='PayPal'
            name='paymentMethod'
            value={paymentMethod}
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
          <Form.Check
            type='radio'
            label='Stripe'
            id='Stripe'
            name='paymentMethod'
            value='Stripe'
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
      </Form.Group>

      <Button className="mt-3" type='submit' variant='primary'> Continue </Button>
    </Form>
  </FormContainer>
  )
}

export default PaymentScreen