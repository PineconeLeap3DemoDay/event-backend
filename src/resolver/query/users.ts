import { GraphQLError } from "graphql";
import { Users } from "../../model";
export const getUser = async (_: any, _param: any, context: any) => {
    const {user} = context;
    try {
        const user1 = await Users.findById(user?.id).populate(["favorites",'hashtags','following']);
        return user1;
    } catch (error) {
        throw new GraphQLError('user not found')
    }
}