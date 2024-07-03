class CrudService {
    constructor(respository) {
        this.respository = respository;
    }

    async create(data){
        try {
            const response = await this.respository.create(data);
            return response;
        } catch (error) {
            throw {error};
        }
    }
    async destroy(id){
        try {
            const response = await this.respository.destroy(id);
            return response;
        } catch (error) {
            throw {error};
        }
    }
    async get(id){
        try {
            const response = await this.respository.get(id);
            return response;
        } catch (error) {
            throw {error};
        }
    }
    async getAll(){
        try {
            const response = await this.respository.getAll();
            return response;
        } catch (error) {
            throw {error};
        }
    }
    async update(id,data){
        try {
            const response = await this.respository.update(id,data);
            return response;
        } catch (error) {
            throw {error};
        }
    }
}

module.exports = CrudService;