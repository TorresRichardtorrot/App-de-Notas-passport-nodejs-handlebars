import express from 'express';
import exphbs from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import morgan from 'morgan';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import indexRoutes from './routes/index.routes.js';
import notesRoutes from './routes/notes.routes.js';
import usersRoutes from './routes/users.routes.js';
import dotenv from 'dotenv';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
import './config/passport.js';

app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));

app.engine(
  '.hbs',
  exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use(indexRoutes);
app.use(notesRoutes);
app.use(usersRoutes);

app.use(express.static(join(__dirname, 'public')));

export default app;
