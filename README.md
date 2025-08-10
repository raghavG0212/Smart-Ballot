# Smart-Ballot

> A full-stack web application for secure and transparent online voting.  This application allows voters to cast their votes securely and provides administrators with tools to manage candidates and elections.

## 📚 Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [File Structure](#file-structure)
- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [Usage](#usage)
  - [Execution Options](#execution-options)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)
- [Credits](#credits)


## Description

Smart-Ballot is a full-stack web application designed for secure online voting.  The backend, built with Node.js and Express.js, manages user authentication, candidate information, and vote tallies using a MongoDB database. The frontend, developed with React, provides a user-friendly interface for voters to register, login, and cast their votes.  The application features separate dashboards for voters and administrators, allowing for secure access control and efficient election management.  Key features include user authentication with JWTs, secure vote storage, and robust error handling.

## Tech Stack

[![Node.js](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/) [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) [![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/) [![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![Mongoose](https://img.shields.io/badge/Mongoose-000000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/) [![Bcrypt](https://img.shields.io/badge/bcrypt-blue?style=for-the-badge&logo=bcrypt&logoColor=white)](https://www.npmjs.com/package/bcrypt) [![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-black?style=for-the-badge&logo=jsonwebtoken&logoColor=white)](https://www.npmjs.com/package/jsonwebtoken) [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/) [![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)  [![✨ Made with ReadME Wiz](https://img.shields.io/badge/✨%20Made%20with-ReadME%20Wiz-blueviolet?style=for-the-badge&logo=markdown&logoColor=white)](https://github.com/PIYUSH1SAINI/ReadMe-wiz.git)


## Architecture Overview

```mermaid
graph LR
    subgraph Frontend
        A[React Components] --> B(User Interface);
        B --> C[Redux Store];
    end
    subgraph Backend
        D[Express.js Server] --> E(API Routes);
        E --> F[MongoDB Database];
    end
    C --> E;
```

## File Structure

```mermaid
graph TD
    A[server.js] --> B(controllers);
    A --> C(models);
    A --> D(routes);
    A --> E(utils);
    B --> F["admin.controller.js"];
    B --> G["candidate.controller.js"];
    B --> H["voter.controller.js"];
    C --> I["admin.model.js"];
    C --> J["candidate.model.js"];
    C --> K["voter.model.js"];
    D --> L["admin.route.js"];
    D --> M["candidate.route.js"];
    D --> N["voter.route.js"];
    E --> O["error.js"];
    E --> P["verifyUser.js"];
    A --> Q(client);
    Q --> R["index.html"];
    Q --> S["src"];
    
```

## Features

- Secure user authentication and authorization using JWTs.
- Separate dashboards for voters and administrators with role-based access control.
- Secure vote storage and tallying mechanisms to prevent fraud.
- Real-time updates for vote counts (on the admin dashboard).
- User-friendly interface for easy navigation and voting.
- Comprehensive error handling and feedback mechanisms.

## Installation

### Prerequisites

> [!NOTE]
> Node.js >=14, npm, and MongoDB are required.  Ensure MongoDB is running before proceeding.

### Setup

1. **Clone Repository**: Clone the repository from GitHub and install dependencies.

   ```bash
   git clone https://github.com/raghavG0212/Smart-Ballot.git
   cd Smart-Ballot
   npm install
   ```

2. **Database Setup**: Create a MongoDB database and adjust the connection string in `database/connectDB.js`.


> [!TIP]
> Use the `git clone` method above for quick setup.


## Usage

### Execution Options

1. **Backend Execution:** Start the backend server.

   ```bash
   npm run start
   ```

2. **Frontend Execution:** Start the frontend development server.

   ```bash
   npm run client
   ```

> [!IMPORTANT]
> Run both the backend and frontend servers concurrently using `npm run happy_voting` for a complete application experience.


## Contributing

Contributions are welcome! Please open issues or submit pull requests on GitHub.


## Contributors

<a href="https://github.com/raghavG0212" target="_blank"><img src="https://avatars.githubusercontent.com/raghavG0212?s=60&v=4" width="60" height="60" alt="@raghavG0212" title="@raghavG0212" style="border-radius: 50%; margin-right: 10px;" onerror="this.src='https://github.com/identicons/raghavG0212.png'" /></a>


## License

ISC License


## Credits

RAGHAVGOEL

Node.js, Express.js, React, MongoDB, Bcrypt, jsonwebtoken, Mongoose, Firebase, Redux




<a href="https://github.com/PIYUSH1SAINI/ReadMe-wiz.git" target="_blank">
      <img src="https://res.cloudinary.com/dy1znaiby/image/upload/v1754320207/ReadMe-wiz-logo_k3uq6w.png" alt="ReadMe Wiz Logo" width="300"/>
    </a>
