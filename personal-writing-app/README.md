# Praxle-Draft

## Project Structure

This document outlines the design for Praxle-Draft, a personal writing application.  The application will be built using Next.js for the frontend and backend. Data will be stored locally on the user's machine and synchronized between devices.

- `/app`: Next.js 13 app directory
  - `/api`: API routes for handling server-side logic
  - `/note`: Note-related pages
  - `/notebooks`: Notebook-related pages
  - `/entry`: Entry route for new users
- `/components`: React components
  - `BurgerMenu.tsx`: Burger menu component for navigation
- `/hooks`: Custom React hooks
- `/types`: TypeScript type definitions
- `/utils`: Utility functions and classes


## Implemented Features

1. **Note Creation and Editing**
   - Rich text editor using Markdown
   - Real-time saving with debounce functionality
   - Support for attachments (images, PDFs, URLs)

2. **Note Organization**
   - Tagging system for flexible categorization
   - Stack-based grouping for hierarchical organization

3. **Search Functionality**
   - Full-text search across all notes
   - Search by title, content, tags, and stacks

4. **Data Visualization**
   - Commit dashboard to track writing activity over time

5. **Data Portability**
   - Export all notes as a zip file
   - Import notes from a zip file

6. **Progressive Web App (PWA)**
   - Offline capabilities
   - Installable on desktop and mobile devices
   - Automatic synchronization between devices

7. **Version Control**
   - View and restore previous versions of notes

8. **Improved User Interface**
   - Responsive design with a burger menu for easy navigation
   - Entry route for a smooth onboarding experience


## Key Components

1. **Canvas**: The main note editing interface. It handles note creation, editing, and real-time saving.  (Note: This will likely be replaced with a Markdown editor)

2. **CommitDashboard**: Visualizes the user's writing activity over time, providing insights into productivity.

3. **SearchComponent**: Allows users to search across all notes, displaying results in real-time.

4. **StackNotes**: Displays all notes within a specific stack, allowing for easy navigation and organization.

5. **Breadcrumb**: Provides contextual navigation, showing the user's current location within the app's structure.
6. **BurgerMenu**: Provides a mobile-friendly navigation menu.


## API Routes

1. `/api/notes`: Handles CRUD operations for notes
2. `/api/search`: Provides full-text search functionality across all notes
3. `/api/export`: Allows users to export all their notes as a zip file
4. `/api/import`: Enables users to import notes from a zip file
5. `/api/sync`: Handles synchronization of notes between devices
6. `/api/versions`: Manages note version history

## Utility Functions and Hooks

1. **useDebounce**: A custom hook that provides debounced values, used for optimizing real-time saving and search.

2. **fileSystem.ts**: Utility functions for file system operations, abstracting the complexity of reading and writing note files.  (Note: This will need to be adapted for Next.js)

3. **search.ts**: Contains the logic for searching notes, used by the search API route.

## Data Storage

Notes are stored as individual JSON files. This approach allows for easy versioning, backup, and portability of data.  (Note: Location will need to be specified based on Next.js file system)

## Next Steps

1. Implement a plugin system for extending the application's functionality
2. Enhance the rich text editing capabilities with more advanced Markdown features
3. Implement a more robust conflict resolution system for synchronization
4. Implement user authentication and authorization for multi-user support. (Considered but not a priority for MVP)
5. Add real-time collaboration features using WebSockets. (Considered but not a priority for MVP)


## Updates and Deployments

This application is designed for easy updates and deployments:

1. **Continuous Integration/Continuous Deployment (CI/CD)**:
   - Set up a CI/CD pipeline (e.g., GitHub Actions, GitLab CI, or Jenkins) to automatically test and deploy changes.
   - Configure the pipeline to run tests, build the application, and deploy to your hosting platform on each push to the main branch.

2. **Environment Variables**:
   - Use environment variables for configuration settings that may change between environments.
   - Store sensitive information (API keys, database credentials) as environment variables in your deployment platform.

3. **Database Migrations**:
   - Implement a database migration system to manage changes to the data structure.
   - Run migrations automatically as part of the deployment process.

4. **Feature Flags**:
   - Implement feature flags to enable or disable new features without redeploying.
   - This allows for gradual rollouts and easy rollbacks if issues are discovered.

5. **Monitoring and Logging**:
   - Integrate application monitoring and error tracking (e.g., Sentry, New Relic) to quickly identify and resolve issues in production.
   - Implement comprehensive logging to aid in debugging and performance optimization.

6. **Backup and Restore**:
   - Regularly backup user data and provide an easy way to restore from backups if needed.
   - Implement a system for users to export and import their data.

7. **Update Notifications**:
   - Implement an in-app notification system to inform users about new features and updates.
   - Provide release notes or a changelog to keep users informed about what's new or changed.

By following these practices, you can ensure that your application remains up-to-date and that new features or bug fixes can be quickly and safely deployed to users.

## Getting Started

1. Clone the repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

1. Build the application:
   \`\`\`
   npm run build
   \`\`\`
2. Start the production server:
   \`\`\`
   npm start
   \`\`\`

## Offline Usage

The application works offline thanks to its PWA capabilities. Notes are stored locally and synced with the server when an internet connection is available.

## Synchronization

Notes are automatically synchronized between devices when an internet connection is available. The sync process merges changes from different devices, prioritizing the most recent updates.

## Future Enhancements

1. Implement a plugin system for extending the application's functionality
2. Enhance the rich text editing capabilities with more advanced Markdown features
3. Implement a more robust conflict resolution system for synchronization

## Contributing

As this is a personal project, contributions are not currently accepted. However, feel free to fork the repository and adapt it for your own use.

## License

This project is licensed under the MIT License.

