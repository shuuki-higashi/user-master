import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();

/**
 * @swagger
 * tag:
 *   name: auth
 *   description: ユーザー関連API
 */
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - users
 *     summary: ユーザー認証
 *     description: ユーザー名とパスワードで認証を行う。
 *     parameters:
 *       - in: body
 *         name: body
 *         description: ユーザー情報
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - password
 *           properties:
 *             name:
 *               type: string
 *               description: ユーザー名
 *             password:
 *               type: string
 *               format: password
 *               description: パスワード
 *     responses:
 *       200:
 *         description: 認証OK
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: 認証トークン
 *       400:
 *         description: 認証NG
 *         schema:
 *           type: string
 */
router.post('/login', AuthController.login);

//Change my password
router.post('/change-password', [checkJwt], AuthController.changePassword);

export default router;
