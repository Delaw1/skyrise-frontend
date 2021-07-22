import { combineReducers } from 'redux'
import { createProjectCall, getProjects, createDeveloperCall, isLoggedIn, getDevelopers, getDeveloper, getGS, filterProperty, propertyData} from './apicall.reducer'

const rootReducer = combineReducers({
    addProject: createProjectCall,
    projects: getProjects,
    addDeveloper: createDeveloperCall,
    developers: getDevelopers,
    developer: getDeveloper,
    gs: getGS,
    filterProperty,
    propertyData,
    isLoggedIn
})

export default rootReducer