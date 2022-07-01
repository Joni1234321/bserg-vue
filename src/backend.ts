import axios from "axios"

class Backend {
    public url: string = "http://localhost:5000/api/v1"
    public projectURL : string = this.url + "/project/"

    // Projects
    public async getProjects () {
        return (await axios.get(this.projectURL)).data
    }
    public async getProject (objectId : string) {
        return (await axios.get(this.projectURL + objectId)).data
    }
    public async deleteProject (objectId: string) {
        return (await axios.delete(this.projectURL + objectId)).data
    }

    public async createProject (project: Project) {
        return (await axios.post(this.projectURL, project)).data
    }
}

const backend = new Backend()
export default backend