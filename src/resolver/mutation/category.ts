
import { Category, CategoryAddParams, CategoryDeleteParams, CategoryUpdateParams, ICategory } from '../../model';
import { GraphQLError } from 'graphql';
export const addCategory = async (_: any, args: CategoryAddParams) => {
    try {
        const category = await Category.create({
            name: args.name
        });
        return category
    } catch {
        throw new GraphQLError('Бүртгэлтэй категори байна');
    }
}
export const deleteCategory = async (_: any, args: CategoryDeleteParams) => {
    const category = await Category.findById(args.id);
    if (!category) {
        throw new GraphQLError('Ийм категори байхгүй', {
            extensions: {
                code: 'FORBIDDEN',
                http: { status: 400 },
            }
        });
    }
    await category.deleteOne();
    return true
}
export const updateCategory = async (
        _: any, 
        args: CategoryUpdateParams, 
        context: any 
    ) => {
    const { id, name } = args;
    try {
        const category = await Category.findById(id);
        await category?.updateOne({
            name: name
        })
        return {
            _id: id,
            name: name
        }
    } catch (error) {
        throw new GraphQLError('Ийм категори байхгүй', {
            extensions: {
                code: 'FORBIDDEN',
                http: { status: 400 },
            }
        });
    }

}