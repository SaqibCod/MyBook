import {Client, ID, TablesDB, Storage, Query} from 'appwrite'
import {confi} from "../conf/conf"

export class Service {
    client = new Client();
    tablesDB;
    storage;

    constructor() {
        this.client
            .setEndpoint(confi.appwriteUrl)
            .setProject(confi.appwriteProjectId)
        this.tablesDB = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.tablesDB.createRow({
                databaseId: confi.appwriteDatabaseId,
                tableId: confi.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content, 
                    featuredImage,
                    status,
                    userId
                }
            })
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: confi.appwriteDatabaseId,
                tableId: confi.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content, 
                    featuredImage,
                    status,
                }
            })
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            return await this.tablesDB.deleteRow({
                databaseId: confi.appwriteDatabaseId,
                tableId: confi.appwriteTableId,
                rowId: slug,
            })
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: confi.appwriteDatabaseId,
                tableId: confi.appwriteTableId,
                rowId: slug
            })
        } catch (error) {
            throw error;
        }
    }

    async getPosts() {
        try {
            return await this.tablesDB.listRows({
                databaseId: confi.appwriteDatabaseId,
                tableId: confi.appwriteTableId,
                queries: [
                    Query.equal('status', 'active')
                ]
            })
        } catch(error) {
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile({
                bucketId: confi.appwriteBucketId,
                fileId: ID.unique(),
                file
            })
           
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile({
                bucketId: confi.appwriteBucketId,
                fileId
            })
            return true;
        } catch (error) {
            throw error;
        }
    }
}
export default new Service();