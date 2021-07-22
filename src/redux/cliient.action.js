import { apiService } from '../services/apiService'

export const ApiCall = (route, data, verb, actionType, header = undefined, token = null) => {
    return (dispatch) => { 
        let service = apiService.request(route, verb, data, header)
        dispatch(pending(data))

        return service.then(resp => {
            dispatch(success(resp))
        }).catch(error => {
            dispatch(failure(error))
        })
    }

    function pending(data) {
        return {
            type: actionType.pending,
            data
        }
    }
    
    function success(response) {
        return {
            type: actionType.success,
            response
        }
    }
    
    function failure(error) {
        return {
            type: actionType.failure,
            error
        }
    }
}

