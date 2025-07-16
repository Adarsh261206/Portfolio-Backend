# Portfolio Backend (Contact Form)

This is the backend for the contact form. It saves submissions as JSON files in the `client/` folder.

## How to Deploy on Render

1. **Push this `backend/` folder to a new GitHub repository.**
2. **Go to [Render](https://render.com/)** and create a new Web Service.
3. **Connect your GitHub repo.**
4. **Set the following settings:**
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Deploy!**

Your backend will be live at a public URL (e.g., `https://your-backend.onrender.com`).

## API
- **POST `/contact`**
  - Body: `{ name, email, message }`
  - Saves a JSON file in `client/` with the submission. 