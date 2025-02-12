import { defineLive } from "next-sanity";
import "server-only";
import { client } from "./client";

const token = process.env.SANITY_VIEWER_TOKEN;
if (!token) {
  throw new Error("SANITY_VIEWER_TOKEN is required");
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0
  }
});
