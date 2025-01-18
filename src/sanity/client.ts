import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "1govgnq9",
  dataset: "production",
  apiVersion: "2024-01-01",
  token:"skDn1jzjrGVnv9MZiamdzV5yQVkJM1YVHBBtprJGhYHNnCTJ8ZSe1XejuiDikrbnx6PD5jwH7GX1e8Sixbb0SYdWi66q4iNHXBS9izPHtcxapSIsXcWNe1o357AD0wioz9jRsL5444B0cCtuLspeJitNzTY4U2uwL7cZuqPqMNGfrrPk0RsY",
  useCdn: false,
});
