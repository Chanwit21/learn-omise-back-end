const express = require('express');
const app = express();
const cors = require('cors');
const omise = require('omise')({ secretKey: 'skey_test_5ov8h8rdpslf54x97k1' });

app.use(cors());
app.use(express.json());

app.post('/credit', (req, res, next) => {
  const { token, amount } = req.body;

  omise.charges.create(
    {
      amount: amount,
      currency: 'thb',
      card: token,
    },
    function (err, charge) {
      if (err) {
        next(err);
      } else {
        console.log(charge);
        res.status(200).json({ charge });
      }
    }
  );

  // omise.charges.create(
  //   {
  //     amount: '100000',
  //     currency: 'thb',
  //     customer: 'cust_test_5pdqyagnq8p20qy71fg',
  //     card: 'card_test_5pdqyabu6kv1lnr0xwm',
  //   },
  //   function (error, charge) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log(charge);
  //     }
  //   }
  // );

  // omise.customers.create(
  //   {
  //     description: 'John Doe (id: 30)',
  //     email: 'john.doe@example.com',
  //     card: token,
  //   },
  //   function (error, customer) {
  //     if (error) {
  //       next(error);
  //     } else {
  //       console.log(customer);
  //       res.status(200).json({ customer });
  //     }
  //   }
  // );

  // omise.customers.update('cust_test_5pdqyagnq8p20qy71fg', { card: token }, function (error, customer) {
  //   if (error) {
  //     next(error);
  //   } else {
  //     console.log(customer);
  //     res.status(200).json({ customer });
  //   }
  // });
});

// omise.customers.retrieve('cust_test_5pdqyagnq8p20qy71fg', function (err, customer) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(customer);
//   }
// });

app.post('/source', (req, res, next) => {
  const { source, amount } = req.body;
  omise.charges.create(
    {
      amount: amount,
      currency: 'THB',
      return_uri: 'http://localhost:3000',
      source: source,
    },
    function (error, charge) {
      if (error) {
        next(error);
      } else {
        console.log(charge);
        res.status(200).json({ charge });
      }
    }
  );
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(8888, () => console.log('Server is running on port 8888'));
