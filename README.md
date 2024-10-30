# Law Firm Project

A web application for managing a law firm’s operations, built with **ASP.NET Core** (backend) and **React** (frontend).

## Features
- Authentication (JWT)
- Legal articles management (CRUD)
- Role-based access control (Admin/User)
- Commenting system for articles
- Responsive design for mobile and desktop
- Admin dashboard for content management

## Tech Stack
### Frontend:
- React, Redux Toolkit, React Router
- Bootstrap, SCSS, Font Awesome
- Formik, React-toast-notifications

### Backend:
- ASP.NET Core, MSSQL
- Entity Framework Core
- JWT Authentication
- Layered Architecture

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/ayk6/lawyerWeb.git
    ```
2. **Frontend**:
    ```bash
    cd lawyerWeb.UI
    npm install
    npm start
    ```
3. **Backend**:
    ```bash
    cd lawyerWeb.api
    dotnet restore
    dotnet ef database update
    dotnet run
    ```

## Configuration
- Update the connection string in `appsettings.json` (backend).
- Modify environment variables in `.env` (frontend) if necessary.

## Project Structure
```bash
lawyerWeb.UI/
  └── src/
      └── components/, pages/, services/, styles/
backend/
  └── Controllers/, Models/, Services/, Data/
```

