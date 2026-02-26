import {Account, client, ID} from 'appwrite'
import {confi} from "../conf/conf"

class AuthService {
    client = new client()
    account

    constructor() {
        this.client
            .setEndpoint(confi.appwriteUrl)
            .setProject(confi.appwriteProjectId)
        this.account = new Account(this.client)    
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name
            })
            if(userAccount) {
                //call another account
                return this.loginAccount({email, password})
            } else {
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async loginAccount({email, password}) {
        try {
            return await this.account.createEmailPasswordSession({
                email: email,
                password: password
            })
        } catch (error) {
            throw error
        }
    }
}

export default new AuthService();