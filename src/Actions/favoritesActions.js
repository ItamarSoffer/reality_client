import {apiGetFavorites} from "./apiActions";
import {message} from "antd";

export const setUserFavorites = (favoritesList) => {
    return {
        type: "FAVORITES_SET",
        favoritesList: favoritesList
    }
};

export const getUserFavorites1 = (jwtToken) => {
    apiGetFavorites(jwtToken)

        .then((response) => {
                    if (response.status === 201) {
                        message.warning(response.data)
                    } else if (response.status === 200) {
                        return {
                            type: "FAVORITES_GET",
                            favoritesList: response.data
                        }
                    }
                }
            )
};
