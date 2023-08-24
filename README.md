# Demo 
LINK: https://bug-2s2y.onrender.com/ 

Use either the admin or user account to view the app (Admin priviledge to be added)

# MERN Stack Bug Tracker (Baygon MVP)

This is a full-stack project management and ticketing system built using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides authentication, CRUD capabilities, authorization, and data analysis features for efficient project and ticket management. 

Current stage: MVP

## Features

1. **Authentication** - JWT Token
   - Users can sign up, log in, and log out.
   - JWT (JSON Web Token) is used for secure authentication and authorization.

2. **CRUD Capabilities**
   - Create, edit, and delete projects.
   - Create, edit, and delete tickets within projects.
   - Assign users to projects and tickets.

3. **Authorization**
   - Users can only access projects and tickets that they have created or have been assigned to.
   - Access control prevents unauthorized users from modifying or viewing projects and tickets.

4. **Data Analysis**
   - The home page provides a short analysis and summary of project and ticket data assigned to user.
   - Graphs and visualizations give users insights into project progress and ticket distribution.

## Technologies Used

- **Frontend**
  - React: JavaScript library for building user interfaces.
  - React Router: Routing library for handling navigation.
  - Axios: Promise-based HTTP client for making API requests.

- **Backend**
  - Node.js: JavaScript runtime for server-side development.
  - Express.js: Web application framework for building APIs.
  - MongoDB: NoSQL database for storing application data.
  - Mongoose: MongoDB object modeling for Node.js.

- **Authentication**
  - JSON Web Tokens (JWT): Securely manage user authentication and access.

- **Deployment**
  - Render: Platform for deploying modern web applications.
  - React Build: Production-ready build of the frontend.

## Things to fix
1.  ~~After login - Refresh required to get data~~
2.  Edit Project page does not show the name of project (should show so users will know which project is being clicked on 
3.   ~~Refreshing page causes get error ~~(Fixed)
4.  To add acknowledgement when form is submitted successfully
5.  ~~Comment table doesn’t refresh after submitting comment page~~
6.  ~~Adding tickets doesn’t show up instantly after adding~~
Second priority:
1. History tracking for bugs and projects
2. Picture table

## Created by 

- [TT](https://github.com/KyroC)


