import { produce } from 'immer'

const InitialState = {
    user_details: [
    ],
    user_posts: [{
    },]
};

export const dataReducer = produce((state = InitialState, action) => {
    switch (action.type) {
        case "SET_USERS":
            state.user_details = action.payload
            break;
        case "SET_USERS_POSTS":
            state.user_posts = action.payload
            break;
        case "SET_NEW_USER_POST":
            state.user_posts.push(action.payload);
            break
        default:
            return state
    }

}, InitialState);

