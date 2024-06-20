# Getting Started

This project is a React application To manage a cultivation in the greenhouse, requirement includes 

- Adding new users to a cultivation
- Deleting a user from a cultivation
- Changing role of a user in the cultivation
- Search functionality to filter the users

Depending on their designated roles, users will possess specific permissions within the cultivation. These roles are adjustable, allowing for changes as needed.

In the interface, there is a dropdown menu currently displaying two dummy cultivation options (no API integration is implemented here as it's outside the assignment's scope). Upon selecting a cultivation, the system lists all users associated with that cultivation. Users can add new members to the cultivation by clicking a button, which opens a popup displaying a list of users. From this popup, users can be selected individually or in multiples and added to the cultivation's member list.

Additionally, users have the ability to modify roles and delete members directly from the user list within the cultivation.

## Development server

After cloning the project in the local machine run `npm install` to install the dependencies and followed by `npm run dev` to run server locally. Navigate to `http://localhost:5173/`. To run unit test use 'npm run test' command.


## Framework/Libraries Used

- React 18.2.0
- TypeScript ^5.2.2
- Tailwind for styling along with SCSS
- Vitest for unit testing
- Redux Toolkit for state management

This project was developed using Node.js and npm. Below are the versions used:

- Node.js: v20.13.1
- npm: 10.5.2

