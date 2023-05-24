import { Users } from "../model";
import jwt from 'jsonwebtoken';
const authScope = async (token: string) => {
    if(!token) {
        return null;
    }
    const parsedToken: any = jwt.verify(token, 'haha');
    if(parsedToken.exp * 1000 < Date.now()) {
        return null
    }
    return parsedToken
}
export default authScope;