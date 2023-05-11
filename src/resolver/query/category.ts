import { GraphQLError } from 'graphql';
import { Category } from '../../model/category';
export const categories = async () => {
    const categories = await Category.find().populate({
        path: 'events',
        populate: {
            path: 'category',
        }
    });
    return categories;
}
export const category = async (_: any, args: any) => {
    const { categoryid: categoryid } = args;

    try {
        const category = await Category.findById(categoryid);
        await category?.populate({
            path: 'events',
            populate: {
                path: 'category',
            }
        })
        return category;
    } catch (error) {
        throw new GraphQLError(`${categoryid}-тай cat`)
    }
    
}