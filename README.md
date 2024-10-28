# IT3040 - LINGO TRANSLATE

LINGO TRANSLATE utilizes the MERN stack (MongoDB, Express.js, React.js, Node.js) to create a comprehensive translation webapp. Here's an overview of its key features:

## Translator App
LINGO TRANSLATE serves as a translator application from English to Sinhala. It considers cultural context, ensuring accurate and relevant translations. For example, words like "orange" may have nuanced meanings based on context, which this app accounts for.

## Forum
The project includes a forum for users to post questions and receive responses, fostering collaboration and knowledge sharing within the IT community.

## Emoji Translator
LINGO TRANSLATE features an emoji translator, bridging the gap between textual and visual expressions, enhancing communication.

## Authentication and Profile Management
Proper authentication mechanisms are in place for secure user access. Users can create accounts, log in securely, and manage profiles, fostering a sense of community within the platform.

## Voice Recognition Translation
The app supports voice recognition translation, allowing users to input voice commands or text and receive real-time translations, enhancing accessibility.

LINGO TRANSLATE aims to streamline language translation, facilitate community collaboration, and provide a seamless user experience in the IT domain.

## Running the Project

### Installing Packages
Before running the project, ensure you have Node.js and npm (Node Package Manager) installed on your system.

1. Clone the repository to your local machine:
    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:
    ```bash
    cd ITPM-LINGO/backend
    ```

3. Install server-side dependencies:
    ```bash
    npm install
    ```

4. Navigate to the client directory:
    ```bash
    cd ITPM-LINGO/frontend
    ```

5. Install client-side dependencies:
    ```bash
    npm install
    ```

### Running the Project
After installing the necessary packages, you can run the project with the following commands:

1. Start the server:
    ```bash
    npm run dev
    ```

2. Start the client:
    ```bash
    npm start
    ```

By default, the server runs on port 3040 and the client runs on port 3000. Ensure that MongoDB is running on your system.

## Testing

### Running Tests
To run tests for this project, use the following command:

```bash
npm test
