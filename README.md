# Storyblok Space Quickstart CLI
The Storyblok Space Quickstart CLI is a command-line tool designed to facilitate the migration of stories, story file structures, components, and their file structures between different Storyblok accounts. This tool simplifies the process of transferring content and structures, making it easier for users to manage their Storyblok spaces across accounts.
## Data removing
The import functionality is designed for empty spaces only. If your destination space contains existing data, it will be cleared before importing the new data during the importing process.

## Prerequisites
Before using the CLI application, ensure you have the following:
- A Storyblok account.
- Access to both the source and destination Storyblok spaces, with chosen billing plans.
- The **Space ID** and **Personal Access Token** for both the source and destination accounts.
![Projekt bez nazwy (1)](https://github.com/MichalRsa/storyblok-space-quickstart/assets/73226214/eeeab39b-e6d9-4d60-b963-c49fe73f7386)
![Projekt bez nazwy (2)](https://github.com/MichalRsa/storyblok-space-quickstart/assets/73226214/aa6c8553-126e-4bca-96ad-567455b761a6)

## Usage
To use the CLI application, follow these steps:

Ensure you have Node.js installed on your machine.
Open your terminal.
Run the following command:
```bash
npx run storyblok-space-quickstart
```
Follow the on-screen prompts to complete the installation process.
During installation, you will need to provide your Storyblok account details, including the **spaceId** and **userAuthToken** for both the source and destination accounts.

## Usage
The CLI application provides two main functionalities:

### Export Space data
This feature allows you to export stories, story file structures, components, and their file structures from the source Storyblok space to the local files.

### Import Space data
The import functionality enables you to import the exported content into the destination Storyblok space.

## Support
That is the package that was made because of my personal needs.
For any questions, issues, or feedback, please open an issue on GitHub.
