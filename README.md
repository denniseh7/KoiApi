# Koi API

An API for e-commerce websites designed to scale with increasing traffic. The API supports ratings and reviews for products by providing the ability to get and post review data. The API met business requirements of 1000 requests per second, under 2000ms latency, with less than 0.1% error rate.

- Designed an Express backend with Postgres relational database to handle ratings and reviews for products
- Scaled backend to 4 instances on AWS to handle customer requirement of 1000 requests per second with less than 0.1% error rate using Nginx server
- Improved database query latency by improving Postgres read queries and indexing to lower response time from 97.3ms to 18.1 ms
- Lowered average request time from 2133ms to 139ms using Nginx load balancing and a 10Mb cache
