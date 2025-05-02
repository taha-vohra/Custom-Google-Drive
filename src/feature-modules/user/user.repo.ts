import { Op } from "sequelize";
import { Pagination_Helper } from "../../utility/pagination";
import { UserSchema } from "./user.schema";
import { User } from "./user.types";


const findOne = (user: Partial<User>) => UserSchema.findOne({
    where: user
});

const search = (searchTerm: string) =>
    UserSchema.findAll({
        attributes: { exclude: ['password'] },
        where: {
            [Op.or]: [{
                name: { [Op.iLike]: `%${searchTerm}%` }
            }, {
                email: { [Op.iLike]: `%${searchTerm}%` }
            }]
        }
    });

// const getAll = (pageSize: number, increment: 'next' | 'previous' | null = null) => {
//     if (!increment)
//     const paginator = new Pagination_Helper(pageSize);

//     UserSchema.findAll({
//         attributes: { exclude: ['password'] },
//         offset: paginator.offset(),
//         limit: paginator.pageSize,
//     });
// }; 
// page baad me banaunga 

const getAll = (role_id: string) => UserSchema.findAll({
    attributes: { exclude: ['password'] },
    where: { role_id }
});

const create = (user: User) => {
    return UserSchema.create(user);
}

const update = (user: Partial<User>) => UserSchema.update(user, { where: { id: user.id } })

const deleteUser = (id: string) => UserSchema.destroy({ where: { id } })

export default {
    findOne,
    create,
    update,
    deleteUser,
    getAll,
    search
}