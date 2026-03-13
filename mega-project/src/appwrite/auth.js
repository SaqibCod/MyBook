import {Account, Client, ID} from 'appwrite'
import {confi} from "../conf/conf"

 export class AuthService {
    client = new Client()
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

    async getAccount() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logoutAccount() {
        try {
            return await this.account.deleteSessions('current');
        } catch (error) {
            throw error;
        }
}

}
const authService = new AuthService();
export default authService;