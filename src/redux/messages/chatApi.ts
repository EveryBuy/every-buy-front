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
    baseUrl: "https://api-everybuy.onrender.com",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBuyChats: builder.query<ChatsType, void>({
      query: () => "/chat/get-buy-users-chats",
    }),
    getSellChats: builder.query<ChatsType, void>({
      query: () => "/chat/get-sell-users-chats",
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
  useGetBuyChatsQuery,
  useGetSellChatsQuery,
  useGetChatQuery,
  useGetMessagesByChatIdQuery,
} = chatApi;
