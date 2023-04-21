import {Category} from '../../model/category';
export const categories = async () => {
    const categories = await Category.find();
    return categories;
}