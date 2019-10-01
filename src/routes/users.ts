import { Router } from 'express';
import UserController from '../controllers/UserController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

/**
 * @swagger
 * definition:
 *   User:
 *     type: object
 *     description: ユーザー情報
 *     required:
 *       - firstName
 *       - lastName
 *       - password
 *     properties:
 *       name:
 *         type: string
 *         description: ユーザー名
 *       password:
 *         type: string
 *         format: password
 *         description: パスワード
 */

//Get all users
router.get('/', [checkJwt, checkRole(['ADMIN'])], UserController.listAll);

// Get one user
router.get(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['ADMIN'])],
  UserController.getOneById
);

//Create a new user
router.post('/', [checkJwt, checkRole(['ADMIN'])], UserController.newUser);
router.post('/new', [checkJwt, checkRole(['ADMIN'])], UserController.newUser);

//Edit one user
router.patch(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['ADMIN'])],
  UserController.editUser
);

//Delete one user
router.delete(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['ADMIN'])],
  UserController.deleteUser
);

export default router;
