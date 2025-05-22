# 📝 Luciene Assessments - Smart Todo Application

![Project Banner](https://github.com/sundramsharma1/Leucin-Assessments/blob/master/Poster.PNG)  
*A full-stack todo app with AI-powered task summarization*

## 🌟 Features

### 🎯 Core Functionality
- **Task Management** (Full CRUD Operations)
  - ✅ Add new tasks
  - ✔️ Mark tasks as complete/incomplete
  - ✏️ Edit existing tasks
  - 🗑️ Delete tasks
- **AI-Powered Insights**
  - 🤖 Generate smart summaries of pending tasks
  - 📊 Task categorization (work, personal, shopping)
  - ⚡ Real-time processing via Groq API

### 🎨 Frontend
- 💅 **Modern UI** with responsive design
- 📱 Mobile-first approach (works on all devices)
- 🎛️ Interactive task controls
- 🔄 Real-time state management

### ⚙️ Backend
- 🚀 Express.js REST API
- 🔐 Secure JWT authentication (ready for extension)
- 🗄️ PostgreSQL database via Supabase
- 📡 Slack integration for notifications

## 🛠️ Tech Stack

| Area          | Technologies Used |
|---------------|-------------------|
| **Frontend**  | React.js, Axios, CSS3, React Icons |
| **Backend**   | Node.js, Express, Supabase, Groq SDK |
| **APIs**      | RESTful endpoints, Slack Webhook |
| **Database**  | Supabase PostgreSQL |
| **DevOps**    | GitHub, GitHub Pages (for frontend) |

## 📂 Project Structure
luciene-assessments/
├── backend/ # Backend server code
│ ├── controllers/ # Business logic
│ ├── db/ # Database configuration
│ ├── routes/ # API endpoints
│ ├── server.js # Main server file
│ └── package.json # Backend dependencies
├── frontend/ # React application
│ ├── public/ # Static assets
│ ├── src/ # React components
│ ├── package.json # Frontend dependencies
│ └── README.md # Frontend docs
├── .gitignore # Git exclusion rules
└── README.md # Project documentation (you are here)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm (v8+)
- Supabase account
- Groq API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/luciene-assessments.git
   cd luciene-assessments
   
2. **Backend Setup**
   ```bash
    cd Backend
    npm install
    .env.example .env  # Update with your credentials
   
3. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   .env.example .env  # Set API base URL
   
### Running Locally

1. **Start Backend Server**
   ```bash
    cd Backend
    npm start

2. **Start Frontend Server**
   ```bash
   cd Frontend
   npm run dev
