import { Users } from "../model";
import jwt from 'jsonwebtoken';
const authScope = async (token: string) => {
    if(!token) {
        return null;
    }
    const parsedToken: any = jwt.verify(token, 'haha');
    return parsedToken
}
export default authScope;