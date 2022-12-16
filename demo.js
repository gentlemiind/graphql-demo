const gql = require("graphql-tag");

const {
    ApolloServer
} = require("apollo-server");

/*
    it is going to take everything we put in the string and compile it 
    into graphQL EST that can be understood by the server.

    the ! means that the field is mandatory in our case the user must always have an email.
    ex.
        ...
            friend:  [User!]! 
        ...

        that means friends is always going to be an array and the array should always have something in it.

        if these conditions are not satisfied graphQL is going to break during the query or during the mutation.

        GraphQL built in scalars :

        String 
        Int 
        Float 
        ID (field should be a unique identifier)
        Boolean 

        ! you always have to define a query 
        ! Always call your query Query even though the name can be change 

        ! when defining your resolvers you have to name them the same way you did in your type definitions 


*/
const typeDefs = gql `
    type User{
        email: String!
        avatar: String
        friends:  [User]! 
    }

    type Query {
        me: User!
    }
`;
//  creating a resolver for the me field 
const resolvers = {
    Query: {
        me() {
            return {
                email: "babacar@gmail.com",
                avatar: "http://yoda.png",
                friends: [{
                    email: "thierno@gmail.com",
                    avatar: "http://yoda.png"
                }]
            }
        }
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers
});
server.listen(4000)
    .then(() => {
            console.log("Server is listening on port 4000");
        },
        (err) => {
            console.log(err);
        }
    );