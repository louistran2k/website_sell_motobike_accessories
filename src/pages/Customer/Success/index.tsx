import { Typography } from '@mui/material';
import axiosClient from 'api/axiosClient';
import { useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const Success = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('PayerID'));
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosClient.get('api/checkout/success', {
          params: {
            PayerID: searchParams.get('PayerID'),
            paymentId: searchParams.get('paymentId'),
          },
        });
        console.log(res);
        // navigate();
        // return res;
      } catch (error) {
        throw new Error(String(error));
      }
    })();
  }, []);

  return <Typography variant="h5">Thanh toán thành công</Typography>;
};

export default Success;
