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
<<<<<<< HEAD
    baseUrl: "https://service-chat-t47s.onrender.com",
=======
    baseUrl: "https://api-everybuy.onrender.com",
>>>>>>> 3c6254c7bbb0f754f23afe00e6624536522817f6
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
<<<<<<< HEAD
    getChats: builder.query<ChatsType, void>({
      query: () => "/chat/get-all-users-chats",
=======
    getBuyChats: builder.query<ChatsType, void>({
      query: () => "/chat/get-buy-users-chats",
    }),
    getSellChats: builder.query<ChatsType, void>({
      query: () => "/chat/get-sell-users-chats",
>>>>>>> 3c6254c7bbb0f754f23afe00e6624536522817f6
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
<<<<<<< HEAD
  useGetChatsQuery,
=======
  useGetBuyChatsQuery,
  useGetSellChatsQuery,
>>>>>>> 3c6254c7bbb0f754f23afe00e6624536522817f6
  useGetChatQuery,
  useGetMessagesByChatIdQuery,
} = chatApi;
