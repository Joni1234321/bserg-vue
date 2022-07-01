import axios from "axios"

class Backend {
    public url: string = "http://localhost:5000/api/v1"

    constructor() {}

    public async getProjects () {
        return (await axios.get(this.url + "/project/")).data
    }
    public async getProject (id : string) {
        return (await axios.get(this.url + "/project/" + id)).data
    }

    public async createProject (project: Project) {
        return (await axios.post(this.url + "/project/", project)).data
    }
}

const backend = new Backend()
export default backend