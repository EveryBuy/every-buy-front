type UserDataType = {
  userId: number;
  fullName: string;
  photoUrl?: string;
};

type MessageType = {
  chatId: number | null;
  creationTime: string;
  id: number;
  text?: string;
  fileUrl?: string;
  userId: number;
  userPhotoUrl: string | null;
  read: boolean;
};

export { ChatsType, UserDataType, MessageType };
