# Proof-of-Concept
Angular &amp; .NET 8 Web API


## Project Overview

This project is a proof-of-concept web application developed using Angular for the front-end and .NET 6 Web API for the back-end. The application allows users to register, log in, manage an inventory of products, and generate reports based on active products. Data is stored in an SQL Server 2022 database.

### Features

- **User Authentication:** Users can register and log in securely using email and password. Passwords are stored in a hashed format.

- **Product Management:** Users can add, view, filter, and sort products.

- **Pagination:** Users can choose to display 3, 5, or 10 products per page.

- **Product Reporting:** Generates bar charts to visualize product counts based on brand and product type.

- **Secure Logout:** Users can log out securely, and navigation is restricted based on authentication status.

### Installation and Setup

#### Prerequisites

Ensure you have the following installed:

- **Node.js (for Angular)**

- **Angular CLI**

- **.NET 6 SDK**

- **Microsoft SQL Server 2022**

- **Visual Studio 2022**

### Backend Setup (.NET 8 Web API)

1. Open the .NET Core application in Visual Studio 2022.

2. Update the **appsettings.json** file to match your SQL Server instance:
``
"ConnectionStrings": {
   "DefaultConnection": "Server=.;Database='Input your database name here';Trusted_Connection=True;MultipleActiveResultSets=True"
}
``
3. Open **Package Manager** Console and run:

``add-migration initial
update-database``

4. Run **SqlDataCodeScript.sql** in SQL Server Management Studio to populate initial data.

5. Start the API by running the project in Visual Studio.

### Frontend Setup (Angular App)

1. Navigate to the Angular project directory.

2. Install dependencies:
``
npm install
``
3. Start the Angular application:
``
ng serve
``
4. Open your browser and navigate to **http://localhost:4200/.**

### Running the Application

1. Ensure the backend API is running.

2. Run the Angular application.

3. Open the browser and log in to the application.

### Usage

- **Login Page:** Users must log in with a valid email and password.

- **Register Page:** New users can create an account.

- **Product Listing:** Displays products retrieved from the database with sorting and filtering options.

- **Add Product:** Users can add new products with validation checks.

- **Product Reporting:** Displays charts and an accordion-based hierarchy for active products.

### Project Goals

- The purpose of this project is to demonstrate:

- Full-stack development using Angular and .NET 6.

- Secure user authentication and CRUD operations.

- Data visualization using charts and structured reports.
