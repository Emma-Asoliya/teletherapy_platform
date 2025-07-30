UnMutedMinds Teletherapy Web App
A teletherapy platform connecting clients and therapists with appointment booking, profiles, and video sessions.
 
## Table of Contents
Project Overview

Tech Stack

Prerequisites

## Setup & Installation

1. Clone the Repository

2. Backend Setup

3. Frontend Setup

Running the App

Environment Variables

Folder Structure

Notes

Troubleshooting

## Project Overview
UnMutedMinds is a teletherapy web app that allows clients to find therapists, book and manage appointments, and conduct therapy sessions online. It features role-based dashboards, profile editing with image uploads, appointment booking, rescheduling, cancellation, and video conferencing integration.

## Tech Stack
Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT

File Uploads: Multer

Frontend: HTML, CSS, JavaScript (Vanilla)

Video Conferencing: Jitsi API (or other)

## Prerequisites
Make sure you have the following installed on your system:

Node.js (v16 or higher)

npm (comes with Node.js)

MongoDB installed and running locally, or a cloud MongoDB URI

(Optional) Git if you want to clone the repo

## Setup & Installation

### 1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/unmutedminds.git
cd unmutedminds

### 2. Backend Setup
Navigate to the backend folder (if your backend is inside a folder, e.g., backend):

bash
Copy code
cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the backend root directory with the following environment variables (see Environment Variables):

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:

bash
Copy code
npm start
The backend server will run at http://localhost:5000 by default.

### 3. Frontend Setup
Navigate to the frontend folder (if applicable):

bash
Copy code
cd ../frontend
If you don’t have a build step, you can simply open the .html files in a browser or use a simple static server like Live Server VSCode extension or:

bash
Copy code
npx serve .
Ensure that frontend API requests point to the backend URL (http://localhost:5000) in your JS fetch calls.

## Running the App
Make sure MongoDB is running locally or your cloud URI is working.

Start backend server with npm start.

Open frontend index.html or dashboard.html in your browser or serve the frontend with a static server.

Use the app in your browser at http://localhost:<frontend-port-or-file>.

## Environment Variables
Create a .env file in your backend root with:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/unmutedminds
JWT_SECRET=yourStrongJWTSecret
Replace with your actual MongoDB URI and a strong JWT secret.

Folder Structure (Example)
bash
Copy code
/unmutedminds
  /backend
    /models
    /routes
    /middleware
    index.js
    package.json
    .env
  /frontend
    dashboard.html
    login.html
    signup.html
    css/
    js/
    images/
README.md

## Notes
The app uses JWT for authentication; tokens are stored in localStorage on the client.

Image uploads are handled via Multer and saved in /uploads directory.

Video conferencing uses Jitsi API embedded in the frontend.

Adjust API URLs in frontend JS files if your backend runs on a different port or domain.

## Troubleshooting
MongoDB connection errors: Ensure your MongoDB service is running or the URI is correct.

CORS errors: Backend uses CORS middleware — ensure requests come from your frontend domain or localhost.

JWT errors: Confirm your JWT secret matches in .env and frontend tokens are fresh.

File upload errors: Check backend permissions for /uploads folder.
