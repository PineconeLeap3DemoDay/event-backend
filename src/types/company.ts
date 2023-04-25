export interface ICompany {
    registrationnumber: string,
    password: string,
    name: string;
    rating: number
}
export interface companyInput {
    company: ICompany
}