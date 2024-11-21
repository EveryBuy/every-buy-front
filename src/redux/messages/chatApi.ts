import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";
import { ChatsType, FullChatType } from "@/types/messages/chats";
import { MessageType } from "@/types/messages/messages";

interface ChatMessagesDataTypeInt {
  chatMessages: MessageType[];
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
    getChats: builder.query<ChatsType, void>({
      query: () => "/chat/get-all-users-chats",
    }),
    getChat: builder.query<FullChatType, number>({
      query: (chatId) => `/chat/${chatId}`,
      transformResponse: (response: { data: FullChatType }) => response.data,
    }),
    getMessagesByChatId: builder.query<MessageType[], number>({
      query: (chatId) => `/chat/${chatId}`,
      transformResponse: (response: { data: ChatMessagesDataTypeInt }) =>
        response.data.chatMessages,
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatQuery,
  useGetMessagesByChatIdQuery,
} = chatApi;
