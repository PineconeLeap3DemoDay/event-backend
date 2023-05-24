export interface ICompany {
  name: string;
  email: string;
  rating: number;
  profile: string;
  password: string;
  registrationnumber: string;
}
export interface companyInput {
  company: ICompany;
}
