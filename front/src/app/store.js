import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import modulesReducer from '../features/modules/modulesSlice'
import coursReducer from '../features/cours/coursSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store =  configureStore({
    reducer: {
        auth: persistedReducer,
        modules: modulesReducer,
        cours: coursReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store)