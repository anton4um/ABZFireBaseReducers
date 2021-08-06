import { UserDataFormat } from "./../user-models/user-data-format";
import * as editUserActions from "../store/edit-user.actions";
export interface State {
  user: UserDataFormat;
}

const initState: State = {
  user: null,
};

export function EditUserReducer(
  state = initState,
  action: editUserActions.EditUserActions
) {
  switch (action.type) {
    case editUserActions.EDIT_USER_START:
      return {
        ...state,
        user: action.payload,
      };
    case editUserActions.EDIT_USER_END:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
