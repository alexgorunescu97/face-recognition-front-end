# face-reconginition-front-end
A fullstack app written in JavaScript using React.js, Node.js, Express.js and PostgreSQL.  
You can test the app using the following link: https://face-recognition-f-e.herokuapp.com/  
  
Functionalities:
1. Register: checks if the user has filled in all the input fields and stores the user's information in the database.  
If the user doesn't enter all the required information, then he will not be able to register.
2. Signin: checks to see if the email and password values entered by the user are present in the database. If so, the user will have access to his profile.
3. Face recognition: once the user is logged in, he has the option to provide a image url. The app will then be able to recognize if  
the image contains any human faces. This is done using the Clarifai API. The entry count is incremented for every face recognized by the app.  

The app is deployed using Heroku.
