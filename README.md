# AddressManager

INTRODUCTION
The common requirement for variety of applications such as E-Commerce platforms, Shipping/ delivery services, Location based services etc. It is to be maintaining and handling postal addresses. The requirement is to build a web-based interface that dynamically captures country specific address formats. The validation of the address given by the user, searching for the address and retrieving the results and displaying them, everything must be efficient and the response time must be less. 
Overall, the problem statement requires us to design and implement a scalable, reliable, and efficient API that can provide accurate addresses based on input parameters such as postal code, state, country, or any combination of address specific details. This involves understanding the functional and nonfunctional requirements, selecting appropriate data sources to retrieve data and use it, designing an appropriate architecture and data model, and implementing the API using appropriate programming languages and frameworks.
ARCHITECTURAL OVERVIEW
Syatem Context diagram
![image](https://user-images.githubusercontent.com/22576343/225454827-21848b6a-1adc-4013-902f-90cef5754b48.png)


In this context diagram, the Client is the external entity that sends HTTP requests to the RESTful API, which then returns the street address data based on the input parameters (combination of any of the Postal Code, State, or address details). The client can provide the combination of input, For instance, Street Number and zip code or country, state and city and the API returns the corresponding street address data as output. 
 
COMPONENT DIAGRAM
![image](https://user-images.githubusercontent.com/22576343/225454932-3aad0060-7902-4c47-a235-70825c3cab51.png)

 The above diagram is the high-level version of component diagram which show what all components are involved and how are they interacting with each other and data. 
Components:
•	User Interface: The user interface is designed to allow users to input the Address specific information they want to look up. It is designed to be intuitive and user-friendly. 
•	Load Balancer: A load balancer is a component that distributes incoming network traffic across multiple servers to ensure that no single server is overwhelmed with requests. This helps to improve the performance and availability of the application.
•	API Gateway: It will handle the routing of requests to the appropriate microservice based on the endpoint and the HTTP method. For instance, it routes to Address Format service to get the format specific information of a particular country. It routes to Address Service to get the full addresses for the specified address parameters.
•	API Logging: API logging is the process of capturing and storing information about requests and responses to an API. This includes details such as the request method, URL, headers, payload, response status code, and response body.
•	Business Logic: This is where the search filter and the address_format method is built which is used to query the database to get the appropriate address.
•	Database: Repository to store the address and format specific data. 
•	Cache: The code uses a cache to store search results. This will reduce the response time of a request.
Connector:
•	MongoDB driver: A connector that allows the Flask application to communicate with the MongoDB database.
ARCHITECTURAL STYLE
![image](https://user-images.githubusercontent.com/22576343/225454959-0c03d27b-e8ee-4e0f-aa09-7d0f4de4b446.png)

RESTful API design style can be chosen for this system. REST is a widely used architectural style for web services due to its simplicity, scalability, and flexibility.
It uses standard HTTP protocols for communication, which makes it easy to develop, test, and deploy web applications.
 TOOLS AND TECHNOLOGIES:
•	Web Framework: FLASK
•	Backend: Python
•	Frontend: HTML, CSS, JAVASCRIPT
•	Database: Mongo DB
•	Load Balancer: Nginx
•	Load Testing Tool: Apache JMeter
API SETUP

Flask Installation: pip install Flask.
Mongo DB : pip install Flask-Pymongo
Flask-Caching: pip install Flask-Caching
Flask-Swagger: pip install flask-swagger-ui

LOAD BALANCER Tool: Nginx
LOAD TESTING Tool: Apache JMeter

Apache JMeter is a popular open-source tool for load testing, performance testing, and functional testing of applications.
NGINX is a popular open-source web server, reverse proxy, and load balancer software that is widely used for serving static and dynamic content on the web. NGINX is known for its high performance, scalability, and low memory footprint. It can handle large amounts of traffic while consuming very few resources, making it ideal for high-traffic websites and web applications.
We setup a Docker-Compose.yaml file, Docker File and Nginx.confg file. There are three services defined one is the addressmanager-app service which is bind to the application implementation, the second one is the db service which is responsible for running MongoDB instance. The last service is the nginx service, this runs an NGINX reverse proxy in a Docker container. It listens on port 80 and forwards incoming HTTP requests to the addressmanager-app service.
In conclusion, The application is run as a set of Docker containers, with NGINX acting as a reverse proxy ( creating about 5 servers) to route incoming requests to the appropriate server.
Response Time of an API without Cache implementation running on the local flask server for 100 requests:
![image](https://user-images.githubusercontent.com/22576343/225455228-7cece36f-437d-41c3-b3bb-0822aa0a1f41.png)

 

Response Time of an API with cache implementation running on Nginx server but only on one server instance for 1000 requests
![image](https://user-images.githubusercontent.com/22576343/225455286-2dfd816b-4ecf-488f-a605-5dfcbde8741d.png)

 
Summary of Response stats :
Here the min time is 3 ms and max time is 129 ms
 ![image](https://user-images.githubusercontent.com/22576343/225455324-2b118c90-8381-4c46-8648-d027f289cb19.png)


Response Time of an API with cache implementation running on Nginx server but using 5 server instance to balance the load for 1000 requests

 ![image](https://user-images.githubusercontent.com/22576343/225455343-b4e00cbc-4494-4a23-bf7d-e156d4fe9f6e.png)

Summary of response stats:
![image](https://user-images.githubusercontent.com/22576343/225455374-83db512f-b4a8-41ec-92f1-e720e05d8adc.png)

Here as there are 5 servers the load is balanced and the min response time and max response time is also decreased to 3 ms and 54 ms with an average of 5ms.
 
NON FUNCTIONAL REQUIREMENTS

Performance: As the application is using caching which improves application performance by storing frequently accessed data in memory or disk to reduce the number of database or API calls.  Nginx is a high-performance web server and reverse proxy that can handle a large number of concurrent connections. By using Nginx as a load balancer, the application can achieve better performance and lower latency.
Scalability: As the application is deployed behind a load balancer, it can scale horizontally by adding more instances of the application server. This ensures that the application can handle increasing traffic without performance degradation.
High Availability: By using a load balancer, the application can achieve high availability. In case of a failure of one of the application servers, the load balancer can redirect the traffic to the healthy servers, ensuring uninterrupted service.
Reliability: As the application is using logging, This can help to analyze and debug issues, identify bottlenecks, monitor application usage and make the API more reliable for future usage.
Usability: Overall using a well-defined user interface, API logging, caching and load balancing it will surely increase the usability of the API.

