
import { Company, addCompanyInput } from '../../model';
export const addCompany = async (_: any, args: addCompanyInput) => {
    const {company: {registrationnumber, password}} = args;
    const company = await Company.create({
        registrationnumber, password
    })
    return company
}
