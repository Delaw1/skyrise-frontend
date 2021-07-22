import { routes } from '../../services/url'
import { serviceConstant } from '../constants/apicall.constant'
import { ApiCall } from '../cliient.action'
import { SystemConstant } from '../../shared/app.constant'

const createProjectConstant = {
    success: serviceConstant.CREATE_PROJECT_SUCCESS,
    pending: serviceConstant.CREATE_PROJECT_PENDING,
    failure: serviceConstant.CREATE_PROJECT_FAILURE
}

const saveProjectConstant = {
    success: serviceConstant.SAVE_PROJECT_SUCCESS,
    pending: serviceConstant.SAVE_PROJECT_PENDING,
    failure: serviceConstant.SAVE_PROJECT_FAILURE
}

const delProjectConstant = {
    success: serviceConstant.DELETE_PROJECT_SUCCESS,
    pending: serviceConstant.DELETE_PROJECT_PENDING,
    failure: serviceConstant.DELETE_PROJECT_FAILURE,
}


const createDeveloperConstant = {
    success: serviceConstant.CREATE_DEVELOPER_SUCCESS,
    pending: serviceConstant.CREATE_DEVELOPER_PENDING,
    failure: serviceConstant.CREATE_DEVELOPER_FAILURE
}

const editDeveloperConstant = {
    success: serviceConstant.EDIT_DEVELOPER_SUCCESS,
    pending: serviceConstant.EDIT_DEVELOPER_PENDING,
    failure: serviceConstant.EDIT_DEVELOPER_FAILURE
}

const getProjectsConstant = {
    success: serviceConstant.GET_PROJECTS_SUCCESS,
    pending: serviceConstant.GET_PROJECTS_PENDING,
    failure: serviceConstant.GET_PROJECTS_FAILURE
}

const getDevelopersConstant = {
    success: serviceConstant.GET_DEVELOPERS_SUCCESS,
    pending: serviceConstant.GET_DEVELOPERS_PENDING,
    failure: serviceConstant.GET_DEVELOPERS_FAILURE
}

const getDeveloperConstant = {
    success: serviceConstant.GET_DEVELOPER_SUCCESS,
    pending: serviceConstant.GET_DEVELOPER_PENDING,
    failure: serviceConstant.GET_DEVELOPER_FAILURE
}

const getGSConstant = {
    success: serviceConstant.GET_GS_SUCCESS,
    pending: serviceConstant.GET_GS_PENDING,
    failure: serviceConstant.GET_GS_FAILURE,
    update: serviceConstant.GET_GS_UPDATE
}

const saveGSConstant = {
    success: serviceConstant.SAVE_GS_SUCCESS,
    pending: serviceConstant.SAVE_GS_PENDING,
    failure: serviceConstant.SAVE_GS_FAILURE
}

const createProject = (data, i) => {
    if(i === 0) {
        return ApiCall(routes.CREATEPROJECT, data, SystemConstant.VERB.POST, saveProjectConstant, SystemConstant.HEADER)
    }
    return ApiCall(routes.CREATEPROJECT, data, SystemConstant.VERB.POST, createProjectConstant, SystemConstant.HEADER)
}

const saveProject = (data) => {
    return ApiCall(routes.CREATEPROJECT, data, SystemConstant.VERB.POST, saveProjectConstant, SystemConstant.HEADER)
}

const editProject = (data, i) => {
    if(i === 0) {
        return ApiCall(routes.EDITPROJECT, data, SystemConstant.VERB.POST, saveProjectConstant, SystemConstant.HEADER)
    }
    return ApiCall(routes.EDITPROJECT, data, SystemConstant.VERB.POST, createProjectConstant, SystemConstant.HEADER)
}

const createDevelper = (data) => {
    return ApiCall(routes.CREATEDEVELOPER, data, SystemConstant.VERB.POST, createDeveloperConstant, SystemConstant.HEADER)
}

const editDevelper = (data) => {
    return ApiCall(routes.EDITDEVELOPER, data, SystemConstant.VERB.POST, createDeveloperConstant, SystemConstant.HEADER)
}

const getProjects = () => {
    return ApiCall(routes.GETPROJECT, null, SystemConstant.VERB.GET, getProjectsConstant)
}

const delProject = (id) => {
    return ApiCall(routes.DELPROJECT(id), null, SystemConstant.VERB.GET, delProjectConstant)
}

const getDevelopers = () => {
    return ApiCall(routes.GETDEVELOPERS, null, SystemConstant.VERB.GET, getDevelopersConstant)
}

// const getDeveloper = () => {
//     return ApiCall(routes.GETDEVELOPER, null, SystemConstant.VERB.GET, getDeveloperConstant)
// }

const getGS = () => {
    return ApiCall(routes.GETGS, null, SystemConstant.VERB.GET, getGSConstant)
}

const saveGS = (data) => {
    return ApiCall(routes.SAVEGS, data, SystemConstant.VERB.POST, saveGSConstant)
}

const updateGS = (name, value) => {
    return {
        type: getGSConstant.update,
        payload: {[name]: value}
    }
}

const getDeveloper = (developer) => {
    return {
        type: getDeveloperConstant.success,
        payload: developer
    }
}

const filterProperty = (name, data, featured) => {
    return {
        type: serviceConstant.FILTER_PROPERTY_SUCCESS,
        payload: {name, data, featured}
    }
}

const propertyData = (project) => {
    return {
        type: serviceConstant.PROPERTY_DATA_SUCCESS,
        payload: project
    }
}

const login = () => {
    return {
        type: serviceConstant.LOGIN_SUCCESS
    }
}



export const apiCallAction = {
    createProject,
    saveProject,
    editProject,
    editDevelper,
    getProjects,
    createDevelper,
    getDevelopers,
    getDeveloper,
    getGS,
    saveGS,
    updateGS,
    delProject,
    filterProperty,
    propertyData,
    login
}