# Client
`https://vitejs.dev/guide/`
## get start
`Yarn` then go with dev server `yarn dev`
## CSS framework
`https://tailwindcss.com/docs/installation`

# Backend Microservices

This repository contains a set of microservices that collectively form the backend of your application. Each microservice serves a specific function and communicates with others via RESTful APIs.

## Services

1. **API Gateway (Port: 9093)**
   The API Gateway is the entry point to the microservices architecture. It routes incoming requests from react application to the appropriate services and can handle tasks like authentication and load balancing.

2. **Eureka Microservice (Port: 8761)**
   Eureka is a service registry that allows microservices to register themselves and discover other services within the system. It plays a vital role in enabling service-to-service communication.
   ```http://localhost:8761```

3. **User Authentication Service (Port: 8081)**
   The User Authentication Service is responsible for managing user authentication and authorization. It provides endpoints for user login, registration, and tokens generation.
   ```http://localhost:8081/swagger-ui/index.html#/```

4. **Product Service (Port: 8082)**
   The Product Service handles product-related operations. It can manage product catalogs,images, pricing, and availability. have all CRUD opperation with related to images, catalogs and products.
   ```http://localhost:8082/swagger-ui/index.html#/```

5. **Notification Service (Port: 8083)**
   The Notification Service is responsible for sending notifications to users or other parts of the system. It can handle email notifications. i feture can extend this service like SMS and push notifications also.
   ```http://localhost:8083/swagger-ui/index.html#/```

6. **Transaction Service (Port: 8084)**
   The Transaction Service manages financial transactions within the system. It can handle orders.
   ```http://localhost:8084/swagger-ui/index.html#/```

## Getting Started

To run these microservices, follow these steps:

1. Clone this repository to your local machine.

2. Navigate to each microservice's directory and start springboot micro service.

3. Start Eureka Server before start other micro service.

4. Ensure that the necessary dependencies and databases are set up and running.

5. Once all microservices are running, you can use the API Gateway to access the functionalities provided by the backend.




