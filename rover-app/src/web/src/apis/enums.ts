import ky from "ky";

export const fetchEnums = async () => {
    return ky.get('/api/platform/enums').json()
}