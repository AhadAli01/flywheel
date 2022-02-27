[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
![made-with-react](https://user-images.githubusercontent.com/66704595/155446271-e37af7a5-a6fa-4e19-b9b8-2bb965741750.svg)
![made-with-express (1)](https://user-images.githubusercontent.com/66704595/155446809-c456baac-9b89-49b0-a93f-850934d6595c.svg)
![made-with-node js](https://user-images.githubusercontent.com/66704595/155447041-6137aec1-532a-4094-928c-e84e2336fb42.svg)
![db-mongodb](https://user-images.githubusercontent.com/66704595/155447686-f65eefd2-5780-42e1-9f89-9421a238fd38.svg)
![deployed-on-heroku](https://user-images.githubusercontent.com/66704595/155449267-ee5d4f1f-a135-435e-96fa-14e255dfa75f.svg)

# Flywheel 🚗
![Screenshot 2022-02-26 193213](https://user-images.githubusercontent.com/66704595/155865869-dd136f6e-873d-4be3-aafa-d0c01ff16d11.png)

## About ✍️

To build flywheel, we utilized a React front end which communicates to our Node.js/Express backend API via HTTP Requests. Our server/API directly communicates with the database via Mongoose queries, and we chose MongoDB as our (NoSQL) cloud database.

## Live Demo ☁️

Flywheel was deployed on Heroku, and can be accessed [here.](https://flywheelapp.herokuapp.com/)

## API Documentation 🚀

The backend API was documented and tested using the Postman app. The documentation which was generated can be found [here.](https://documenter.getpostman.com/view/18239776/UVRAH74a)

### To Run 🖥️

After you have cloned this git repository, please ensure you have npm and node.js installed. Next, please type

```bash
cd client
npm install
cd ..
npm install
```
to install all necessary node modules as specified in the client and server's package.json and then type

```bash
npm run dev
```

to run both the backend API/server (on localhost:5000) and the frontend client (on localhost:3000).

