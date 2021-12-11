import { createAction, props } from '@ngrx/store';
import { User } from '../models/users';


export const buildUserSession = createAction('Build User Session');

export const buildUserSessionSuccess = createAction('[Users/API] Build User Session Success', props<{ user: User }>());

export const buildUserSessionFailure = createAction('[Users/API] Build User Session Failure');
