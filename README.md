# UnMutedMinds — Teletherapy Platform

**UnMutedMinds** is a full-stack web application designed to connect individuals (clients) with licensed therapists for virtual mental health support. The platform supports profile creation, therapist browsing, appointment scheduling, and secure video sessions.

---

## Live Demo

[https://teletherapy-platform.onrender.com](https://teletherapy-platform.onrender.com)

---

## Key Features

- **JWT Authentication** for secure login & signup
- **Role-Based Dashboards** for Clients & Therapists
- Profile Picture Upload & Bio Editing
- Appointment Booking, Rescheduling, & Cancellation
- **Integrated Video Sessions** via Jitsi
- Contact Form with Backend Email Handling
- Fully Responsive UI (Mobile & Desktop)

---

## Tech Stack

### Frontend

- HTML5, CSS3, JavaScript
- Responsive Layout & Custom CSS
- Toasts for UI Feedback

### Backend

- Node.js + Express
- MongoDB + Mongoose
- Multer (for file uploads)
- JWT (for authentication)
- Jitsi (for video conferencing)

---

## Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/Emma-Asoliya/teletherapy_platform.git
```

2. **Install Dependencies**

```bash
npm install
```

3. **Environment Variables**

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. **Run the App Locally**

```bash
node index.js
```

Then open `http://localhost:5000` in your browser.

---

## Project Structure

```
├── public/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── therapist-dashboard.html
│   ├── session.html
│   ├── about.html
│   └── contact.html
│
├── routes/
│   ├── auth.js
│   ├── appointments.js
│   └── contact.js
│
├── models/
│   ├── User.js
│   └── Appointment.js
│
├── middleware/
│   ├── upload.js
│   └── auth.js
│
├── uploads/
├── index.js
└── .env
```

---

## Image Upload Notes

- Uploaded profile images are saved in the `/uploads` directory.
- If deployed on **Render**, consider using **Cloudinary** for persistent image hosting.
- Default fallback images are stored in `public/images/`.

---

## Video Conferencing

- Uses [Jitsi Meet](https://jitsi.org) for real-time sessions
- Sessions are room-based using unique IDs

---

## Deployment

- **Frontend** deployed to [netlify.com](https://netlify.com)
- **Backend** deployed to [Render.com](https://render.com)
- Static files served via Express
- Uses `express.static()` for `/uploads` and `/public`

---

## Developer

**Emmanuella Briggs**  
Frontend & Backend Developer | UI Designer  
e.briggs@alustudent.com 


---
