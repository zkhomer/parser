import {configureStore} from '@reduxjs/toolkit'


type State = {
    data: string;
}

type changeData = {
    type: "change"
}
type clearData = {
    type: "clearData"
}

type Action = changeData | clearData

const reducer = (prevState = initialState, action: Action): State => {
    switch (action.type) {
        case "change":
            return {
                ...prevState,
                data: prevState.data + 'asd'
            }
        case "clearData": {
            return {
                data: "",
            }
        }
        default:
            return prevState
    }
}

const initialState: State = {
    data: 'default state text',
}
export const store = configureStore({
    reducer: reducer,
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch