'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import loginReducer from '../slice/login.slice'
import serviceReducer from '../slice/services.slice'
import editReducer from '../slice/edit.slice'
import bookingReducer from '../slice/booking.slice'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'],
};

const rootReducer = combineReducers({
  login: loginReducer,
  service:serviceReducer,
  editService:editReducer,
  allBooking:bookingReducer
});

export type RootState = ReturnType<typeof rootReducer>;



const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>['store'];
export type AppDispatch = AppStore['dispatch'];