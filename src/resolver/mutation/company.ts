
import { Company, companyInput } from '../../model';
import { GraphQLError } from 'graphql';
import { createToken } from '../../utils/token';
import bcrypt from 'bcryptjs';
export const signupCompany = async (_: any, { company: input }: companyInput) => {
    const { registrationnumber, password } = input;
    const company = await Company.findOne({registrationnumber});
    if(company) {
        throw new GraphQLError("Компани бүртгэлтэй байна", {
            extensions: {
                code: "FORBIDDEN",
                status: 400,
            },
        });
    }
    const newcompany = await Company.create({
        registrationnumber, password
    });
    const token = createToken(newcompany);

    return {
        company: newcompany,
        token: token
    };
}
export const signinCompany = async (_: any, { company: input }: companyInput) => {
    const { registrationnumber, password } = input;
    const company = await Company.findOne({registrationnumber}).
    select('+password');

    if(!company) {
        throw new GraphQLError("Таны оруулсан компани оршдоггүй", {
            extensions: {
                code: "FORBIDDEN",
                status: 400,
            },
        });
    }
    const isPasswordRight = await bcrypt.compare(password, company.password);
    if(!isPasswordRight) {
        throw new GraphQLError("Таны оруулсан нууц үг таарахгүй байна", {
            extensions: {
                code: "FORBIDDEN",
                status: 400,
            },
        });
    }
    const token = createToken(company);
    return {
        company,
        token
    };
}
