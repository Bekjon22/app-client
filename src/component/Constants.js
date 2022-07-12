// export const API_PATH = "http://localhost:8082/api/v1";
export const API_PATH = "https://app-personal-collection.herokuapp.com/api/v1";
export const TOKEN = "user"
export const USER_KEY = localStorage.getItem(TOKEN)
export const CONFIG = {
    headers: {Authorization: `Bearer ` + localStorage.getItem(TOKEN)}
};