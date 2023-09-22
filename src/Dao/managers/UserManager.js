const { userModel } = require ( '../models/usersModel.js')
const ManagerAccess = require ( '../managers/ManagerAccess.js')

const managerAccess = new ManagerAccess();

 class UserManager{

    constructor(){
        this.model = userModel;
    }

    async getUsers(){
        try {
            const result = await this.model.find();;
            return result;
        } catch (error) {
            console.log('Cannot get users in manager with mongoose: '+error)
        }
    }
    async createUser(user){
        try {
            const result = await this.model.create(user);
            return result;
        } catch (error) {
            console.log('Cannot post the user in manager with mongoose: '+error)     
        }
    }
}

module.exports =  UserManager