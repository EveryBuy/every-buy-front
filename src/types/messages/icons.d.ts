import style from "@/components/pages/messages/chats/Icons/Icons.module.scss";

interface IconsBlockType {
  scss?: keyof typeof style;
  isItTopBlock: boolean;
  statusHeartHandler?: () => void;
  statusFolderHandler?: () => void;
  isHeartSelected?: boolean;
  handlerHeartSelected?: (
    selectedChatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  setArchived?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  chatId?: number | undefined;
  handlerHeartSelected?: (
    selectedChatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handlerHeartRemovedFromSelected?: (
    selectedChatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export default IconsBlockType;
