import {Company} from '../../model';
export const companies = async () => {
    const companies = await Company.find();
    return companies;
}