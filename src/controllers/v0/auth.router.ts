import { Router, Request, Response, NextFunction } from 'express';
import * as EmailValidator from 'email-validator';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const router: Router = Router();

function generateJWT(user: {
  email: string;
}): string {
  return jwt.sign(user, process.env.JWT_SECRET)
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization){
      return res.status(401).send({ message: 'No authorization headers.' });
  }


  const token_bearer = req.headers.authorization.split(' ');
  if(token_bearer.length != 2){
      return res.status(401).send({ message: 'Malformed token.' });
  }

  const token = token_bearer[1];

  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
    }
    return next();
  });
}

//register a new user
router.post('/', async (req: Request, res: Response) => {
  const email = req.body.email;
  const plainTextPassword = req.body.password;

  // check email is valid
  if (!email || !EmailValidator.validate(email)) {
      return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
  }

  // check email password valid
  if (!plainTextPassword) {
      return res.status(400).send({ auth: false, message: 'Password is required' });
  }

  const newUser = {
      email: email,
  };

  // Generate JWT
  const jwt = generateJWT(newUser);

  res.status(201).send({token: jwt, user: newUser.email});
});

router.get('/', async (req: Request, res: Response) => {
  res.send('auth');
});

export const AuthRouter: Router = router;