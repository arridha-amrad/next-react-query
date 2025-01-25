This app is using json-server.

To get started :
  npm run json-server
  npm run dev

The intention of this repository is to learn react-query with nextjs.

Notes:
  - Always avoid request waterfall whenever possible. By tweaking the api
  - formatFromDistanceToNowStrict of date-fns can cause component mismatch of server and client
  - Using 2 prefetch at the same server component cause an error of ssr. solved by using paralel routes
