# D4 Dashboard
## Introduction
Welcome to the District 4 Community App! This user-friendly platform is designed specifically for the residents of Boston's District 4 to enhance community engagement and connectivity. Our app serves as a one-stop hub where residents can easily access vital resources, stay updated with important announcements, and participate in local events.

### Key Features:
- Learn About the District 4: Users can easily access information about the District 4 councilor, stay updated on announcements, and recent developments in the district.
- Event Calendar: Keep track of all district events through a comprehensive calendar feature.
- Mailing List: Users can subscribe to a mailing list by entering their email to receive important updates and information directly.
- Civic Associations: Find information about local civic associations and discover associations in your area by entering your address.
- Content Management: The city councilor's office can easily add events, announcements, and other content using Strapi, ensuring the app remains current and relevant.
- Resources Page: Access important links and information easily, including a way to report non-emergency issues through 311.

## Tech Stack
- React: We are using the React JavaScript library to build the frontend of the D4 Dashboard. React allows us to create reusable UI components and efficiently update the user interface as data changes.
- PatternFly: As our UI/UX kit, we are using PatternFly to ensure a consistent and professional design throughout the app.
- PostGres: We are using PostgreSQL for our backend database because it offers robust performance, scalability, and advanced features such as support for complex queries, full-text search, and JSON data types.
- Strapi: We decided to use Strapi as our content management system as it gave us a very user-friendly UI to modify data. This would allow anyone at the city councilor's office who doesn't have a technical background to add events, announcements, etc.
- Firebase: We are using Firebase to host our website as it provides a very easy and efficient way to manage our hosting needs, offering seamless integration with our development tools and ensuring reliable performance.

## Getting Started
To get started with the D4 Dashboard, you'll need to have [node.js](https://nodejs.org/) and the [Firebase CLI](https://firebase.google.com/docs/cli) installed on your machine. Once you've cloned this repository to your local machine, navigate to the project directory and run `npm install` to install all necessary dependencies. 

To start the app in development mode, run `npm start`. This will launch the app in your default browser, where you can begin using it.

## Deployment
To deploy the D4 Dashboard, you'll need to do the following:

1. Build the production version of the app by running `npm run build`. This will create a production-ready build of the app in the `build` directory.
2. Log into the Firebase CLI via `npx firebase login`. Provide login details.
3. Use the Firebase CLI to deploy the build to your Firebase hosting by running `npx firebase deploy`.
4. Deployed web app will be linked to https://district-4-app.web.app/

This will deploy the D4 Dashboard, making it accessible to users.

## Known Bugs and Limitations
There are no known bugs, but there are some limitations with the current implementation of the D4 Dashboard. These include:
- We didn't get the time to verify if the email in the mailing list feature belongs to the user or not. This would allow the users to subscribe any email to the mailing list.
- The CSS isn't organized.

## Adding Users
If you'd like to contribute to the D4 Dashboard, we welcome your help! To add yourself as a collaborator, simply open a Pull Request and modify the `COLLABORATORS` file by adding your GitHub username on a new line.

Please be sure to follow the Pull Request template, and include a descriptive title in the following format: `[Project Name]: <Descriptive Title>`.