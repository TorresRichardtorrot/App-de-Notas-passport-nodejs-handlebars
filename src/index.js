import app from './server.js';
import './database.js';

app.listen(app.get('port'), () => {
    console.log("** Servidor Activo **", app.get('port'))
})