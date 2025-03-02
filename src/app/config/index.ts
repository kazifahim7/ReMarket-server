import dotenv from 'dotenv'
import path from 'path'


dotenv.config({ path: path.join(process.cwd(), ".env") })

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    dataBase_url: process.env.DATABASE_URL,
    salt_round: process.env.SALT_ROUND,
    jwt_secret: process.env.JWT_SECRET,
    smtp_user: process.env.SMTP_USER,
    smtp_pass: process.env.SMTP_PASS,

}