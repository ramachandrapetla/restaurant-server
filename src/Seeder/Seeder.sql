DROP SCHEMA restaurantSystem;

CREATE SCHEMA restaurantSystem;

USE restaurantSystem;

CREATE TABLE Address (
    addressId VARCHAR(45) PRIMARY KEY,
    street VARCHAR(45) NOT NULL,
    city VARCHAR(25) NOT NULL,
    state VARCHAR(24) NOT NULL,
    zipcode NUMERIC(5) NOT NULL
);

CREATE TABLE UserRole (
    roleCode VARCHAR(5) PRIMARY KEY,
    roleName VARCHAR(45) NOT NULL
);

CREATE TABLE Users (
    userId VARCHAR(45) PRIMARY KEY,
    fname VARCHAR(25) NOT NULL,
    lname VARCHAR(25) NOT NULL,
    addressId VARCHAR(45) NOT NULL REFERENCES Address(addressId),
    phone NUMERIC(10) NOT NULL,
    email VARCHAR(30) NOT NULL,
    username VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
    roleCode VARCHAR(5) NOT NULL REFERENCES UserRole(roleCode)
);

CREATE TABLE EmployeeRole (
    roleCode VARCHAR(5) PRIMARY KEY,
    roleName VARCHAR(45) NOT NULL
);

CREATE or replace TABLE Employee (
    employeeId VARCHAR(45) PRIMARY KEY,
    role VARCHAR(5) NOT NULL REFERENCES EmployeeRole(roleCode),
    dateOfJoin DATE NOT NULL DEFAULT CURRENT_DATE,
    Salary INT NOT NULL DEFAULT 5000,
    userId VARCHAR(45) NOT NULL UNIQUE REFERENCES Users(userId)
);

CREATE TABLE Customer (
    customerId VARCHAR(45) PRIMARY KEY,
    userId VARCHAR(45) NOT NULL UNIQUE REFERENCES Users(userId),
    custCredits INT DEFAULT 0 CHECK(custCredits >= 0)
);

CREATE TABLE Payroll (
    paymentId VARCHAR(45) PRIMARY KEY,
    month VARCHAR(10) NOT NULL
        CHECK(month IN ('JAN','FEB','MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC')),
    year NUMERIC(4) NOT NULL,
    amount INT NOT NULL CHECK(amount > 0),
    employeeId VARCHAR(45) NOT NULL REFERENCES Employee(employeeId)
);

CREATE TABLE TableStatus (
    statusCode VARCHAR(2) PRIMARY KEY ,
    status VARCHAR(25) NOT NULL
);

CREATE TABLE Tables (
    tableNumber INT PRIMARY KEY ,
    capacity INT NOT NULL,
    statusCode VARCHAR(2) NOT NULL REFERENCES TableStatus(statusCode)
);

CREATE TABLE Booking (
    bookingId INT PRIMARY KEY,
    tableNumber INT NOT NULL REFERENCES Tables(tableNumber),
    customerId VARCHAR(45) NOT NULL REFERENCES Customer(customerId),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    time TIME NOT NULL DEFAULT CURRENT_TIME
);

CREATE TABLE FoodMenu (
    itemId INT PRIMARY KEY ,
    itemName VARCHAR(45) NOT NULL,
    itemDesc VARCHAR(255) NULL,
    price INT NOT NULL CHECK ( price > 0 )
);

CREATE TABLE Orders (
    orderId INT PRIMARY KEY ,
    customerId VARCHAR(45) NOT NULL REFERENCES Customer(customerId),
    bookingId INT REFERENCES Booking(bookingId),
    OrderType VARCHAR(10) NOT NULL CHECK(OrderType IN ('Delivery', 'Dine In'))
);

CREATE TABLE OrderDetail (
    orderId INT NOT NULL REFERENCES Orders(orderId) ,
    itemId INT NOT NULL REFERENCES FoodMenu(ItemId),
    quantity INT DEFAULT 1 NOT NULL CHECK(quantity > 0),
    CONSTRAINT OrderDetails_pk PRIMARY KEY (orderId, itemId)
);

CREATE TABLE Billing (
    billingId INT PRIMARY KEY,
    orderId INT NOT NULL REFERENCES Orders(orderId),
    subTotal INT NOT NULL CHECK(subTotal > 0),
    Delivery INT NULL,
    total INT NOT NULL CHECK ( total >= Billing.subTotal )
);

CREATE TABLE Payment (
    paymentId VARCHAR(45) PRIMARY KEY ,
    billingId INT NOT NULL REFERENCES Billing(billingId),
    type VARCHAR(10) NOT NULL CHECK(type IN ('cash', 'card', 'credit','CustCredits')),
    amount INT NOT NULL CHECK(amount > 0),
    balance INT NOT NULL DEFAULT 0,
    status VARCHAR(10) NOT NULL CHECK(status IN ('DUE', 'PAID'))
);

CREATE TABLE Delivery (
    deliveryId INT PRIMARY KEY ,
    orderId INT NOT NULL REFERENCES Orders(orderId),
    billingId INT NOT NULL REFERENCES Billing(billingId),
    addressId VARCHAR(45) NOT NULL REFERENCES Address(addressId),
    assignee VARCHAR(45) NOT NULL REFERENCES Employee(employeeId),
    status VARCHAR(15) NOT NULL CHECK(status IN ('Preparing','On the way', 'Delayed', 'Delivered'))
);


insert into userRole values("C", "Customer");
insert into userRole values("E", "Employee");
insert into employeeRole values("C", "Chef");


