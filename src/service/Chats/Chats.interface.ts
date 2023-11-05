export interface IChat {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    created_by: number,
    last_message?: {
        user: {
            first_name: string,
            second_name: string,
            avatar: string,
            email: string,
            login: string,
            phone: string,
        },
        time: string,
        content: string,
    } | null,
}

export interface IChatCreate {
    title: string,
}

export interface IChatUpdateAvatar {
    chatId: number,
    avatar: File,
}

export interface IChatUpdateAvatarResponse {
    avatar: string,
    created_by: number,
    id: number,
    title: string,
}

export interface IChatInfo {
    chatId: number,
}

export interface IChatActionUsers {
    chatId: number,
    users: number[],
}


export interface IChatDeleteResponse {
    userId: number,
    result: {
        id: number,
        title: string,
        avatar: string,
        created_by: number,
    }
}

export interface IChatUser {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    avatar: string,
    role: string,
}

export interface IChatToken {
    token: string,
}

export interface IChatMessage {
    chat_id: number,
    time: string,
    type: string,
    user_id: number,
    content: string,
    file?: {
        id: number,
        user_id: number,
        path: string,
        filename: string,
        content_type: string,
        content_size: number,
        upload_date: string,
    }
}

export interface IChatActive extends IChat {
    messages: ReadonlyArray<IChatMessage>,
}
