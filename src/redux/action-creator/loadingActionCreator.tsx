
import { LoadingType } from "../types/LoadingType"
export const hideLoadingActionCreator = () => {
    return {
        type: LoadingType.HIDE_LOADING,
        payload: 'none'
    }

}
export const showLoadingActionCreator = () => {
    return{
        type: LoadingType.SHOW_LOADING,
        payload: 'block'
    }
}
