import axios from "axios"

const remote = false
class Backend {
    public url: string = "http://" +  (remote ? "157.90.224.86" : "localhost") + ":5000/api/v1"

    public projectURL: string = this.url + "/project/"
    public sectionURL = (object_id : string) => this.projectURL + object_id + "/section/"

    // Projects
    public async getProjects() {
        return (await axios.get(this.projectURL)).data
    }

    public async getProject(objectId: string) {
        return (await axios.get(this.projectURL + objectId)).data
    }

    public async deleteProject(objectId: string) {
        return (await axios.delete(this.projectURL + objectId)).data
    }

    public async updateProject(project: Project) {
        return (await axios.put(this.projectURL + project._id?.$oid, project)).data
    }

    public async createProject(project: Project) {
        return (await axios.post(this.projectURL, project)).data
    }

    // Project sections
    public async createSection(objectId: string, sectionIndex: number, section : Section) {
        return (await axios.post(this.sectionURL(objectId) + sectionIndex, section)).data
    }


    // MIL
    public milURL: string = this.url + "/mil/"
    public async getOrganizations() {
        return (await axios.get(this.milURL)).data
    }
    public async getOrganization(objectId: string) {
        return (await axios.get(this.milURL + objectId)).data
    }
}

const backend = new Backend()
export default backend