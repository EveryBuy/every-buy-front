import { MessageType } from "@/types/messages/messages";

type UserDataType = {
  userId: number;
  fullName: string | null;
  photoUrl?: string | null;
};

type ChatType = {
  chatId?: number;
  lastMessage: string;
  lastMessageDate: string;
  section?: string;
  userData: UserDataType;
  selectedChatId?: number | null;
  // handleChatClick: (chatId: number) => void;
};

type FullChatType = {
  id: number;
  section: string;
  advertisementId: number;
  creationDate: string;
  updateAt: string;
  userId: number;
  adOwnerId: number;
  chatMessages: MessageType[];
  userData: UserDataType;
  shortAdvertisementInfo: {
    id: number;
    section: string | null;
    title: string;
    price: string;
    userId: number;
    mainPhotoUrl: string;
  };
  anotherUserBlocked: boolean;
  currentlyUserBlocked: boolean;
};

type ChatsType = ChatType[];

type FavoritesChatType = {
  chatId: number;
  userData: UserDataType;
  lastMessage: string;
  lastMessageDate: string;
  section: string;
  advertisementActive: boolean;
};
type ArchivedChatType = {
  chatId: number;
  userData: UserDataType;
  lastMessage: string;
  lastMessageDate: string;
  section: string;
  advertisementActive: boolean;
};

export {
  UserDataType,
  ChatType,
  FullChatType,
  ChatsType,
  FavoritesChatType,
  ArchivedChatType,
};
