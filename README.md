#  UnMutedMinds – Teletherapy Web App

Welcome to UnMutedMinds, a web-based teletherapy platform designed to bridge the gap between mental health support and accessibility for young people. Whether you're a therapist offering your services or a client seeking guidance, UnMutedMinds creates a safe, welcoming, and user-friendly environment to connect and heal.
---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Video Conferencing:** Jitsi Meet
- **File Uploads:** Multer

---

##  Local Setup Instructions

Follow the steps below to run the app locally on your machine.

###  1. Clone the Repository

```bash
git clone https://github.com/Emma-Asoliya/teletherapy_platform.git
```

---

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend` directory and add the following:

```env
MONGO_URI=mongodb+srv://EmmanuellaB:c70LumEssoXnoAAJ@unmutedminds.bocnyte.mongodb.net/?retryWrites=true&w=majority&appName=UnMutedMinds
PORT=5000
JWT_SECRET=yourjwtsecret
```

Then, start the backend server:

```bash
npm start
```

The backend will run at: `http://localhost:5000`

---

###  3. Setup the Frontend

```bash
cd ../frontend
```

You can now open `index.html` with **Live Server** or serve the frontend manually:

- VS Code Live Server Extension
- Or open `http://127.0.0.1:5500/frontend/index.html`

> Make sure your backend is running before interacting with the frontend.

---

###  Folder Overview

```
teletherapy_platform/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── uploads/
│   └── index.js
├── frontend/
│   ├── dashboard.html
│   ├── therapist-dashboard.html
│   ├── login.html
│   ├── signup.html
│   ├── about.html, contact.html...
│   └── assets (CSS/JS/Images)
```

---

###  Authentication Flow

- Users select a role (client or therapist) during signup.
- After login, JWT token is stored in `localStorage`.
- Token is used to access role-specific dashboard and APIs.

---

###  File Upload Handling

- User profile pictures are uploaded and stored in `/uploads`
- Files are served from backend using Express static route

---

###  Core Features

- Role-based dashboards
- Therapist profiles (with specializations & qualifications)
- Appointment booking & rescheduling
- Jitsi video conferencing
- Profile editing with photo upload
- Secure login & signup

---

###  Future Features

- Therapist availability calendar
- Chat/messaging between client & therapist
- Payments or session credits
- Admin panel for session analytics
- Push/email notifications

---

###  Notes

- MongoDB must be running locally or use Atlas for production
- Profile images will be stored in the backend `/uploads` directory
- Jitsi uses public server by default (`https://meet.jit.si`)

---

© 2025 UnMutedMinds. All rights reserved.
