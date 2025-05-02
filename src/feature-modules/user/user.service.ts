import bcrypt from "bcryptjs";
import { Credentials } from "../auth/auth.type";
import userRepo from "./user.repo";
import { UserResponses } from "./user.responses";
import { User } from "./user.types";
import roleServices from "../role/role.services";

const findOne = async (user: Credentials) => {
    try {
        const userRecord = await userRepo.findOne({ email: user.email });
        if (!userRecord) throw UserResponses.USER_NOT_FOUND;

        return userRecord.dataValues;
    } catch (e) {
        console.dir(e)
        throw UserResponses.USER_NOT_FOUND;
    }
}

const getUserPass = async (id: string) => {
    try {
        const userRecord = await userRepo.findOne({ id });
        if (!userRecord) throw UserResponses.USER_NOT_FOUND;

        return userRecord.dataValues.password;
    } catch (e) {
        console.dir(e)
        throw UserResponses.USER_NOT_FOUND;
    }
}

const findOneWithID = async (id: string) => {
    try {
        const userRecord = await userRepo.findOne({ id });
        if (!userRecord) throw UserResponses.USER_NOT_FOUND;

        const { password, ...restOfUser } = userRecord.dataValues
        return restOfUser;
    } catch (e) {
        console.dir(e)
        throw UserResponses.USER_NOT_FOUND;
    }
}

const getAll = async () => {
    try {
        const userID = (await roleServices.getRole({ role: 'USER' })).id
        if (!userID) throw Error('THERE IS NO USER ROLE')
        const result = await userRepo.getAll(userID);
        return result.map(e => e.dataValues)
    } catch (e) {
        console.dir(e)
        throw UserResponses.USER_NOT_FOUND;
    }
}

const search = async (searchTerm: string) => {
    try {
        const result = await userRepo.search(searchTerm);
        return result.map(e => e.dataValues);
    } catch (e) {
        console.dir(e)
        throw UserResponses.USER_NOT_FOUND;
    }
}

const createUser = async (user: User) => {
    try {
        const result = await userRepo.create(user);
        return UserResponses.USER_CREATED;
    } catch (e) {
        console.dir(e)
        throw UserResponses.USER_CREATION_FAILED;
    }
}

const update = async (user: Partial<User>) => {
    try {
        if (!user.id) throw "ID NOT FOUND"
        const result = await userRepo.update(user);
        return UserResponses.USER_UPDATED
    } catch (e) {
        console.dir(e)
        throw UserResponses.USER_UPDATION_FAILED
    }
}

const deleteUser = async (id: string) => {
    try {
        const result = await userRepo.deleteUser(id);
        return UserResponses.USER_DELETED
    } catch (e) {
        console.dir(e)
        throw UserResponses.USER_DELETION_FAILED
    }
}

export default {
    findOne,
    findOneWithID,
    createUser,
    update,
    deleteUser,
    getUserPass,
    getAll,
    search
}