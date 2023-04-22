import {GraphQLScalarType,Kind, GraphQLError} from 'graphql';
const emailregex = new RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
  const validate = (val: any) => {
    if(typeof val !== 'string') {
        throw new GraphQLError('Та үсэг оруулна уу')
    }
    if(!emailregex.test(val)) {
        throw new GraphQLError('Та имайл оруулна уу')
    }
    return val
}
const emailparseliteral = (ast: any) => {
    if(ast.Kind !== Kind.STRING) {
        throw new GraphQLError('expected to be string')
    }
    return ast.value
}
export const emailScaler = new GraphQLScalarType({
    name: 'Email',
    description: 'this is email',
    serialize: validate,
    parseValue: validate,
    parseLiteral: emailparseliteral
})