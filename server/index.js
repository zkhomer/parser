const express = require ( 'express' );
const mongoose = require ( 'mongoose' );
const cors = require ( 'cors' );

const app = express ();
app.use ( express.json () );
app.use ( cors ( { origin: '*' } ) );

mongoose.connect ( 'mongodb://localhost:27017/usersbox' )
    .then ( () => {
        console.log ( 'Connected to MongoDB' );
    } )
    .catch ( ( err ) => {
        console.log ( err );
    } );

const userRoutes = require ( '../server/routes/user-routs' );
app.use ( userRoutes );

const PORT = 3000;
app.listen ( PORT, () => {
    console.log ( `Server listening on port ${ PORT }` );
} );
