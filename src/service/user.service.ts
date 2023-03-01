import userModel, { userInput } from '../models/user.model';

const createUser = async function (input: userInput) {
    try {
        const user = await userModel.create(input);
        return user;
    } catch (error: any) {
        throw new Error(error);
    }
};

export default createUser;
