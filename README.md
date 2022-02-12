Steps to setup the project:

    1. download the project folder
    2. open terminal inside the folder and run 'npm i' to install all   the required packages
    3. run 'mongod' in terminal to host the local database for mongoDB
    4. run 'nodemon' to host the app on localhost:3000

Project briefing:

    The home page gets rendered initially which has 2 options: login or register. 
    User can select accordingly. Once logged in, jwt token is generated and sent to the client. 
    Upon successful authorization of the user, the user can access the 'userPage' wherein, the email and password can be edited.
    All passwords are hashed before storing in the database, ensuring security of the sensitive content.
