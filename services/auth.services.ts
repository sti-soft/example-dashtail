import { AxiosError } from "axios"
import { appApi } from "@/api/app.api"
import { LoginResponse } from "@/interfaces"

export class AuthService {
    static login = async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const { data } = await appApi.post<LoginResponse>('/auth/signin', { email, password })

            return data
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data)
            }
            throw new Error()
        }
    }

    static checkStatus = async (): Promise<LoginResponse> => {
        try {
            const { data } = await appApi.get<LoginResponse>('/auth/signin')

            return data
        } catch (error) {
            throw Error('No autorizado')
        }
    }
}