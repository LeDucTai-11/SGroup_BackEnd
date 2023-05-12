import query from '../../database/query.js';
import {HttpException} from '../../shared/index.js';
import {hashPassword,generateRandomToken} from '../../helpers/hash.js';
import { MailService } from '../../services/index.js';

class AuthService {

    getByEmail = async (email) => {
        return await query("Select * from user where email = ?",[email]);
    }

    async generateForgetPasswordToken(userId) {
        const user = (await query("Select * from user where id = ?",[userId]))[0];

        if (!user) {
            throw new HttpException(400,"User not found");
        }

        if (user.passwordResetExpiration < new Date()) {
            const forgetPasswordToken = generateRandomToken();
            const forgetPasswordTokenExpiration = new Date(Date.now() + 30 * 60 * 1000);
            await query("update user set passwordResetToken = ?,passwordResetExpiration = ? where id = ?",
                [forgetPasswordToken,forgetPasswordTokenExpiration,user.id]);

            return forgetPasswordToken;
        } else {
            return user.passwordResetToken;
        }
    }

    async sendForgetPasswordMail(user, forgetPasswordToken) {
        const content = `
            <p>UserId: ${user.id}</p>
            <p>Forget password token: ${forgetPasswordToken}</p>
        `;
        await MailService.sendMail(user.email, 'Change password', content);
    }

    async resetPassword(token, password) {
        const user = (await query("Select * from user where passwordResetToken = ?",[token]))[0];

        if (!user) {
            throw new HttpException(404,'Invalid token.');
        }

        if (user.passwordResetExpiration < new Date()) {
            throw new HttpException(400,'Forget password token has already expired.')
        }

        const { salt, hashedPassword } = hashPassword(password);
        return await query("update user set password = ?,salt = ?,passwordResetExpiration = ?,passwordResetToken = ? where id = ?",
            [hashedPassword,salt,null,null,user.id]);
    }
}

export default new AuthService();