import React from 'react';
import { useUserAuth } from '../Authentication/UseAuthContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';

const Payment = (props) => {
  const [payment, setPayment] = React.useState('');

  const handleChange = (event) => {
    setPayment(event.target.value);
  };

  const { user } = useUserAuth();

  const amount = 50000;
  const currency = "INR";
  const receiptID = "qwsaq1";

  const paymentHandler = async (e) =>{
    const response = await fetch("http://localhost:8000/order",{
      method:"POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt : receiptID,
      }),
      headers:{
        "Content-Type" : "application/json",
      },
    });
    const order = await response.json();
    console.log(order)

    var options = {
      "key": "rzp_test_RNzP8Il9LFT8hU", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      "name": "SkillSprint", //your business name
      "description": "Course Fees",
      "image": "https://example.com/your_logo",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async function (response){
          const body = {
            ...response,
          };

          const validateRes = await fetch("http://localhost:8000/order/validate",{
            method:"POST",
            body: JSON.stringify(body),
            headers:{
              "Content-Type" : "application/json",
            },
          });
          const jsonRes = await validateRes.json();
          console.log(jsonRes)

      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": user.displayName, //your customer's name
          "email": user.email, 
          "contact": "+919000090000"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: 'All payment methods',
              instruments: [
                {
                  method: 'upi'
                },
                {
                  method: 'card'
                },
                {
                    method: 'wallet'
                },
                {
                    method: 'netbanking'
                }
              ],
            },
          },
          sequence: ['block.banks'],
          preferences: {
            show_default_blocks: false,
          },
        },
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  }
  
  return (
    <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 80 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Course ID</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Course Amount</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Pay Via</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{props.id}</TableCell>
              <TableCell>{props.coursename}</TableCell>
              <TableCell>{amount.toFixed(2)}</TableCell>
              <TableCell>{props.userName}</TableCell>
              <TableCell>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="online-payment">Payment type</InputLabel>
                  <Select
                    labelId="online-payment"
                    id="online-payment"
                    value={payment}
                    label="Payment"
                    onChange={handleChange}
                  >
                    <MenuItem value="Online">Online</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
      <Button variant='contained' color='secondary' sx={{marginTop:"2em" }} onClick={paymentHandler} id="rzp-button1">Pay Via Razorpay</Button>
    </>
  )
}

export default Payment