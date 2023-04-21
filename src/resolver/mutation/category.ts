
import {Category} from '../../model';
export const addCategory = async (_: any, args: any) => {
    const category = await Category.create({
        name: args.name
    });
    return category
}