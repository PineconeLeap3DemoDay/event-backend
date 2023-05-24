export interface ICompany {
  registrationnumber: string;
  password: string;
  name: string;
  rating: number;
  profile: string;
}
export interface companyInput {
  company: ICompany;
}
