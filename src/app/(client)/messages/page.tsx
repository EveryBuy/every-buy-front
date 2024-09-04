import { Box } from "@mui/material";
import { MessageListBlock } from "@/components";
import { DialogueBlock } from "@/components";

export default async function Page() {
  return (
    <>
      <h1 className="title">Повідомлення</h1>
      <Box sx={{ display: "flex", columnGap: "35px", height: "720px" }}>
        <MessageListBlock />
        <DialogueBlock />
      </Box>
    </>
  );
}
