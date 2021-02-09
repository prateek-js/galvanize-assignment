# Speedy Cheers Diagram Explanatipn

While working on the speedy cheers problem, thought process goes as follows

This works as micro service architecture with different services playing different roless & responsibility

# Services :- 
Location & availibility Service - This service syncs location of user & speedy cheer associates & their availibility zone
SC allotment service - This service allocates a speedy cheer for requested task based on task type 
Order Service - Order related transcations are primary job of this service. Like ongoing order, order completion, order started
billing service - Once order is completed this service takes care of billings based on task type, duration, commission to speedy cheer, any tips provided, any discounts applied, etc.
payment service - This service keeps a record of payments of each unpaid order and talking with payment gateways

* - Each service can be a docker container managed by kubernetes during run time for scalibility on AWS managed EKS service

# Database - 
User DB - This databse consists of user profile like user's address, name, date of birth, life events, contact info
SC DB - speedy cheer profile is stored here.
Order DB - all the orders of organization be it ongoing, completed, cancelled, archived
Billing - bill invoices, tax invoices are stored under this database
feedback - this database consist of feedback for orders, feedback received via social media.

Database can be relational database as Aurora Mysql or postgres 
& Caching Database can be Amazon ElastiCache for Redis

# Event Queue - 
Kafka which acts as streaming platform using pub-sub mechanism or AWS SQS can also be used here.

# API Gateway - 
currently added under feedback service but all communication between client & server can be done via API gateway like AWS API gateway or Kong


# Sequence of Communication in the diagram :- 
# Step 1 :- 
User's location is synced to Location & Availibity Service when user opens the app.
For Speedy cheers the location is being synced at the background in real time.
And for time being all this is stored in temporary cache

# Step 2 :-
User requests for Speedy cheers service. This goes to  Allotment service based on user's coordinates received from Location & Availibity Service.
Same way coordinates of Speedy cheers are received from Location & Availibity Service and based on the radius & availibility for specifc type of requested task Allotment service will send the request to Speedy cheer associates one by one giving a time of 45-60 seconds to accept/cancel request.

# step 3 :-
Once acceptance is received from Speedy Cheer allotment is done and event is passed to the Queue for creation of order by Order Service.

# Step 4 & 5 :-
Order Service receives the details and gets the user & speedy cheer data from user & SC databased and cknowledges the order by creation of order id & mapping the speedy cheer associate and user and there by making a entry in order database

# Step 6 :-
User's location & speedy cheer associate location is kept in Location service cache till the time order is ongoing state

# Step 7 :-
With help of Location & Availibility Service the location of Speedy Cheer associate is being shared with User for tracking the direction guidance & same user's location is shared with Speedy Cheer Associate to reach the destination for task

# Step 8 :- 
Once Speedy Cheer Associate arrives at destination and starts the order Allotment is moved from cache storage to persistent storage and order start notification is sent to system

# Step 9 :- 
Once event/task has start again with use of Event Queue message is being sent to order service for changing the state of order and binding the assoicate and user to this order for future events like billing, payment, feedback using order ID as foreign key

# Step 10 :-
Once the task/ event is over either associate or user sends a request for stop or completion state

# Step 11 :-
Again using event queue , message is transported to the order service to mark the order as end and generate details like start time, end time, type of task, any surcharges or discount code applied to be passed on to billing service

# Step 12 :-
After ending the order state to completion the details are passed on to billing service for generate of final invoice and cost based on time, task type, surcharges, discount, tips

# Step 13 :-
Billing service sends the billing data to user and Speedy cheer associate for settling the bill.

# Step 14 :-
User makes the payment via payment gateway options or if paid directly by cash speedy cheer associates updates the payment under his app and payment service receives the acknowledgment from user end or associates end regarding payment confirmation and paid via type

# Step 15 :-
Payment service will now trigger event to billing service to update the payment type and information for final invoice generation and details of transaction

# Step 16 :- 
After final invoice generation event it send to order service to close the order 

# Step 17 :- 
After order is  termed as close event is generated to mark the speedy chair associate as available under allotment service for next task

# Step 18 :- 
Parallely  order closed & feedback request is being sent for user & associate for the completed order

# Step 19 :- 
Once under order on their client data if they choose to provide feedback via app, social media via API gateway a lamba function is triggered to capture the feedback against user profile & associate profile and stored under feedback database.


# Note :-

Although each database share information with each other but is not marked clearly in diagram.
Eg:- For order database, user Id of user & associate Id of speedy cheer associate is being take from user DB & associate DB
Order Id is shared with feedback database to capture feedback against order & billing service to keep track of invoice against the order
Billing service in return talks with payment service to take details of transaction and mark against the order for invoice & taxation purpose.




