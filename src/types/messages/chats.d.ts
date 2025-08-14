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
  isHeartSelected: boolean;
  setHeartSelected: (isHeartSelected: boolean) => void;
  isArchived: boolean;
  setArchived: (isArchived: boolean) => void;
  unreadMessagesCount?: number;
  chat: ChatType;
  anotherUserBlocked?: boolean | null;
  currentlyUserBlocked?: boolean | null;
  read?: boolean;
};

type NewChatType = {
  id: number;
  advertisementId: number;
  creationDate: string;
  buyerId: number;
  sellerId: number;
  status?: number;
};

// type NewMessageType = {
//   id: number;
//   advertisementId: number;
//   creationDate: string;
//   buyerId: number;
//   sellerId: number;
// };

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
  NewChatType,
  ChatType,
  FullChatType,
  ChatsType,
  FavoritesChatType,
  ArchivedChatType,
};
