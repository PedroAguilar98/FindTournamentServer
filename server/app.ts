
import { Action, createExpressServer, ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { UserController } from './controllers/UserController';
import { TournamentController } from './controllers/TournamentController';
import { PlayerController } from './controllers/PlayerController';
import { User } from './models/UserModel';
import { Sequelize } from 'sequelize';
import { TeamController } from './controllers/TeamController';
import jwt from 'jsonwebtoken';
import { GeneralController } from './controllers/GeneralController';


@Middleware({ type: 'before' }) // runs before controllers
export class NoCacheMiddleware implements ExpressMiddlewareInterface {
  use(req: any, res: any, next: (err?: any) => any): void {
    res.set('Cache-Control', 'no-store');
    next();
  }
}

const app = createExpressServer({

  cors: {
    origin: 'http://localhost:8081', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies and credentials
  },

    controllers: [UserController, TournamentController, TeamController, PlayerController, GeneralController],
    middlewares: [NoCacheMiddleware],
    /* authorizationChecker: async (action: Action, roles: string[]) => {
        const token = action.request.headers['authorization'];

        const user = await User.findOneByToken(User, token);
        if (user && !roles.length) return true;
        if (user && roles.find(role => user.roles.indexOf(role) !== -1)) return true;

    return false;
    
    } */
    currentUserChecker: async (action: Action) => {
        // here you can use request/response objects from action
        // you need to provide a user object that will be injected in controller actions
        // demo code:
        const token = action.request.headers['authorization'];
        if (token) {
          console.log("token", token)
            return jwt.verify(token.split(' ')[1], 'secret_key', (err:any, user:any) => {
              if (err) return err;
              return user
            });
          } else {
            return 'unauthorized'
          }
      },
})


const port = 3000

app.listen(port, async () => {
    
    console.log("servidor corriendo en el puerto ", port)
    


})
