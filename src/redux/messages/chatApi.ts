import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";
import {
  ChatsType,
  FullChatType,
  FavoritesChatType,
  ArchivedChatType,
} from "@/types/messages/chats";
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
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    getBuyChats: builder.query<ChatsType, void>({
      query: () => "/chat/get-buy-users-chats",
      providesTags: ["Chat"],
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
    getFavoritesChats: builder.query<FavoritesChatType[], void>({
      query: () => "/chat/get-all-favorite-chats",
      providesTags: ["Chat"],
    }),
    addChatToFavorites: builder.mutation<void, { chatId: number }>({
      query: ({ chatId }) => ({
        url: `/chat/add-to-favorite?chatId=${chatId}`,
        method: "POST",
      }),
      invalidatesTags: ["Chat"],
    }),
    removeChatFromFavorites: builder.mutation<void, { chatId: number }>({
      query: ({ chatId }) => ({
        url: `/chat/remove-from-favorite?chatId=${chatId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chat"],
    }),
    getArchivedChats: builder.query<ArchivedChatType[], void>({
      query: () => "/chat/get-all-archive-chats",
      providesTags: ["Chat"],
    }),
    addChatToArchive: builder.mutation<void, { chatId: number }>({
      query: ({ chatId }) => ({
        url: `/chat/add-to-archive?chatId=${chatId}`,
        method: "POST",
      }),
      invalidatesTags: ["Chat"],
    }),
    removeChatFromArchive: builder.mutation<void, { chatId: number }>({
      query: ({ chatId }) => ({
        url: `/chat/remove-from-archive?chatId=${chatId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetBuyChatsQuery,
  useGetSellChatsQuery,
  useGetChatQuery,
  useGetMessagesByChatIdQuery,
  useGetFavoritesChatsQuery,
  useAddChatToFavoritesMutation,
  useRemoveChatFromFavoritesMutation,
  useGetArchivedChatsQuery,
  useAddChatToArchiveMutation,
  useRemoveChatFromArchiveMutation,
} = chatApi;
