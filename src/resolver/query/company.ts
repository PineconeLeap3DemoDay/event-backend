import {Company} from '../../model';
export const companies = async () => {
    const companies = await Company.find();
    return companies;
}
export const company = async (_: any, args: any) => {
    const {id: companyid} = args;
    const company = await Company.findById(companyid);
    return company
}