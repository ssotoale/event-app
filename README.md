# QuestLogger
# Introduction
Help people organize their lives with a fun fantasy game twist 🌟. QuestLogger is a to-do list app that combines the unique nostalgia of fantasy RPG games with the convenience of a to-do list tracker to promote productivity, organization, and progress in your daily tasks! 

Unlike the minimalist design of most to-do list apps, **QuestLogger** transforms your daily tasks into quests, making every accomplishment feel like part of an epic journey. Say goodbye to boring task managers that all look the same, and embrace the feeling of a traveler jotting down their adventures in a magical scroll after a long day.

## Features that make QuestLogger magical:
- ☑️ **Secure Login**: Create an account with encrypted user login and logout for peace of mind.  
- ☑️ **Unique Interface**: A beautifully designed, RPG-inspired interface optimized for mobile use.  
- ☑️ **Task Tracking**: Easily add tasks (quests!) to your daily log and track your progress.  
- ☑️ **Journey Through Time**: Scroll through previous days of your log to reflect on your adventures.  

**Embark on your productivity quest and conquer your day, one quest at a time!**

**[Click here](https://www.figma.com/proto/pLOeuJosEQzmTugGTaWfRu/TA-2%3A-Storyboard?node-id=90-4&t=kRTwjutYyFHnk6BK-1)** to see our UI Prototype, last updated (11/04/2024)

**[Click here](https://github.com/ssotoale/event-app/blob/main/wikipage.md)** to view our UML Class Diagrams



# Installation & Setup
# Development Environment Setup

To set up the development environment on your local machine, follow these steps:

### 1. Clone the Repository
Clone the project repository to your local machine:
```bash
git clone <repository-url>
```

### 2. Install Dependencies

#### Frontend & Backend
Navigate to the root directory of the project and install the necessary dependencies using `npm ci` for a clean install:
```bash
npm ci
```

This will install all the dependencies for both the frontend and backend.

### 3. Running the Development Servers

#### Frontend
Navigate to the frontend directory and start the frontend development server:
```bash
cd frontend
npm run dev
```
The frontend will be available at `http://localhost:5000`.

#### Backend
Navigate to the backend directory and start the backend development server:
```bash
cd backend
npm start
```
The backend will be available at `http://127.0.0.1:5173`.

### 4. Additional Configuration (if needed)
If the project requires environment variables or additional configuration files, make sure to set them up as needed. For example, you may need to create a `.env` file by copying `.env.example`:
```bash
cp .env.example .env
```

### 5. Verify the Setup
Once both the frontend and backend are running, visit `http://localhost:5000` to ensure the frontend is accessible and `http://127.0.0.1:5173` for the backend API.

### Notes:
- Ensure both the frontend and backend servers are running simultaneously for proper communication.
- If you encounter any issues related to port conflicts, check if the ports are already in use and modify the configurations if necessary.
- If the project includes tests, you can run them with:
   ```bash
   npm test
   ```
   (Or follow specific test instructions in the README if applicable.)

---

By following these steps, you should be able to set up the project environment and start contributing to the project.

## Code Style

Please follow these coding standards to maintain consistency across the project:
- We use **Prettier** and **ESLint** to enforce consistent formatting.
- Make sure to install the recommended VSCode extensions and set up auto-formatting.
- Run the following command to format your code before submitting:
  ```
  npm run format
  ```

### Setup Instructions
- Install Prettier and ESLint:
- ESLinst: adding jest to env section to avoid Jest errors:  https://gist.github.com/bklingen-calpoly/5cb27a78243665e697cde12781f0e8b5
- ESLint: adding rules to avoid some React errors:  https://gist.github.com/bklingen-calpoly/463786ad61d05755c9c69e3cfbc7c73e
- Prettier: adding prettier on to ESLint: https://gist.github.com/bklingen-calpoly/4ed88b4093a5bcfa4be93a9ee0d8a31e
- Prettier: adding the format command to package.json: https://gist.github.com/bklingen-calpoly/c80cac4a012357dbb2751d22a428fd92
- Here are some instructions on how to setup VSCode to auto-format your code:  https://blog.yogeshchavan.dev/automatically-format-code-on-file-save-in-visual-studio-code-using-prettier
- Configure your IDE to format on save by installing the Prettier extension in VSCode.  
