# background-jobs

 Simple server side app to run and test background jobs
 
 
 ## How to use
 ```
 yarn install 
 ```
 
  create a .env and set all the necessary data provided on: 
  [.env.example](https://github.com/felipeLeao18/background-jobs/blob/main/.env.example)
 
 ## Setup redis locally
  if using locally instance run:  
  ```
sudo docker run --name redis -p port:port -d -t redis:alpine
```

## Start 
```
yarn dev
```
