import AuthService from './auth.service.js';
import { MailService } from '../../services/index.js';

class AuthController {
    requestForgetPassword = async(req, res, next) => {
        const user = (await AuthService.getByEmail(req.body.email))[0];
        if(!user) {
            return res.status(400).json({
                "message" : "Email is not exist"
            });
        }

        const forgetPasswordToken = await AuthService.generateForgetPasswordToken(user.id);
        await AuthService.sendForgetPasswordMail(user,forgetPasswordToken);
        return res.status(200).json({
            "message" : "Please check your email address !"
        });
    }

    resetPassword = async(req, res, next) =>{
        const { token, password } = req.body;
        await AuthService.resetPassword(token, password);
        return res.status(200).json({
            message: 'Reset password successfully.'
        });
    }
}
export default new AuthController();