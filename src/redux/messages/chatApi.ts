import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";
import {
  NewChatType,
  ChatsType,
  FullChatType,
  FavoritesChatType,
  ArchivedChatType,
} from "@/types/messages/chats";
import { MessageType } from "@/types/messages/messages";

interface ChatMessagesDataTypeInt {
  chatMessages: MessageType[];
}
interface BlockUserResponse {
  status: number;
  data: {
    userId: number;
    blockedUserId: number;
  }[];
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
  tagTypes: ["Chat", "BuyChats"],
  endpoints: (builder) => ({
    createChat: builder.mutation<NewChatType, { advId: number }>({
      query: ({ advId }) => ({
        url: `/chat/create?advertisementId=${advId}`,
        method: "POST",
      }),
      transformResponse: (response: { status: number; data: NewChatType }) =>
        response.data,
      invalidatesTags: ["Chat"],
    }),
    getBuyChats: builder.query<ChatsType, void>({
      query: () => "/chat/get-buy-users-chats",
      providesTags: ["BuyChats"],
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
    addMessageToChat: builder.mutation<
      MessageType,
      { chatId: number; text: string }
    >({
      query: ({ chatId, text }) => ({
        url: `/chat/${chatId}/send-message`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Chat", "BuyChats"],
    }),
    uploadFileToChat: builder.mutation({
      query: ({
        chatId,
        formData,
      }: {
        chatId: number;
        formData: FormData;
      }) => ({
        url: `/chat/${chatId}/file-upload`,
        method: "POST",
        body: formData,
      }),
    }),
    blockUser: builder.mutation<BlockUserResponse, { userId: number }>({
      query: ({ userId }) => ({
        url: `/chat/black-list/block?blockedUserId=${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Chat"],
    }),
    unblockUser: builder.mutation<void, { userId: number }>({
      query: ({ userId }) => ({
        url: `/chat/black-list/block?blockedUserId=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useCreateChatMutation,
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
  useAddMessageToChatMutation,
  useUploadFileToChatMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} = chatApi;
