export const BASEURL = "https://skyriseprojects.com/api"
export const UPLOADURL = "https://skyriseprojects.com/api/public/uploads"

// export const BASEURL = "http://localhost:8000"
// export const UPLOADURL = "http://localhost:8000/uploads"


export const routes = {
    BASEURL,

    // AUTH
    CREATEPROJECT: `${BASEURL}/createProject`,
    EDITPROJECT: `${BASEURL}/editProject`,
    CREATEDEVELOPER: `${BASEURL}/createDeveloper`,
    EDITDEVELOPER: `${BASEURL}/editDeveloper`,
    DELETEDEVELOPER: `${BASEURL}/deleteDeveloper`,
    GETPROJECT: `${BASEURL}/getProject`,
    DELPROJECT(id) { return `${BASEURL}/deleteProject/${id}`} ,
    GETATTACHED: `${BASEURL}/getAttached`,
    GETDETTACHED: `${BASEURL}/getDetached`,
    GETDEVELOPERS: `${BASEURL}/getDevelopers`,
    GETDEVELOPER: `${BASEURL}/getDeveloper/`,
    GETGS: `${BASEURL}/getGS`,
    SAVEGS: `${BASEURL}/saveGS`,
    UPLOAD: `${BASEURL}/uploadMedia`,
    UPLOADVIDEO: `${BASEURL}/test`

}