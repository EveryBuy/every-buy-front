import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";
import { ChatsType, ChatMessagesType } from "@/types/messages/messages";

interface ChatDataTypeInt {
  id: number;
  advertisementId: number;
  chatMessages: ChatMessagesType[];
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://service-chat-t47s.onrender.com",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllChats: builder.query<ChatsType, void>({
      query: () => "/chat/get-all-users-chats",
    }),
    getAllMessagesById: builder.query<ChatMessagesType[], number>({
      query: (chatId) => `/chat/${chatId}`,
      transformResponse: (response: { data: ChatDataTypeInt }) =>
        response.data.chatMessages,
    }),
  }),
});

export const { useGetAllChatsQuery, useGetAllMessagesByIdQuery } = chatApi;
