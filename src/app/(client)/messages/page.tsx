import { MessagesWrapper } from "@/components";
import { Box } from "@mui/material";

export default async function Page() {
  return (
    <Box
      sx={{
        "@media screen and (min-width: 768px)": {
          minHeight: "calc(100vh - 141px - 162px)",
        },
        "@media screen and (min-width: 1024px)": {
          minHeight: "calc(100vh - 181px - 444px)",
        },
      }}
    >
      <MessagesWrapper />
    </Box>
  );
}
