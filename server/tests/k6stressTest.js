import http from 'k6/http';
import { sleep } from 'k6';

// randomize product id
const getRandProd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const min = 1;
const max = 1000000;
export const options = {
  scenarios: {
    stress: {
      executor: 'constant-arrival-rate',
      duration: '30s',
      rate: 1000,
      timeUnit: '1s',
      preAllocatedVUs: 3000,
    },
  },
};

export default () => {
  const productId = getRandProd(min, max);
  const url = `http://localhost:3001/reviews?product_id=${productId}`;
  // console.log('url:', url);
  http.get(url);
  sleep(0.1);
  http.get(`http://localhost:3001/reviews/meta?product_id=${productId}`);
  sleep(0.1);
};
