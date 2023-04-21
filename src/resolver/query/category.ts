import categoryModel from '../../model/category';
export const categories = {
    Query: {
        categories: async() => {
            console.log('hah');
            
            const categories = await categoryModel.find();
            return categories
        }
     }
}