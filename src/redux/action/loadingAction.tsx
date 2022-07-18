import { LoadingType } from "../types/LoadingType";

interface LoadingVisibleAction {
    type: LoadingType,
    payload: string
}
export type LoadingAction = LoadingVisibleAction