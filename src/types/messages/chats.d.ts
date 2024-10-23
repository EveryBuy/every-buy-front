// type ChatsType = MessageType[];

type UserDataType = {
  userId: number;
  fullName: string;
  photoUrl?: string;
};

type ChatType = {
  chatId?: number;
  lastMessage: string;
  lastMessageDate: string;
  section?: string;
  userData: UserDataType;
  // alt: string;
};

// interface ChatMessagesType {
//   id: number;
//   text: string;
//   creationTime: string;
//   userId: number;
//   chatId: number;
//   userPhotoUrl: null | string;
// }

export { UserDataType, ChatType };
