
import categoryModel from '../../model/category';
const addCategory = {
    Mutation: {
        async addCategory(_: any, args: any) {
            const category = await categoryModel.create({
                name: args.name
            });
            return category

        }
    }
}
export default addCategory