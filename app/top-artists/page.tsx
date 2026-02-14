import { Suspense } from "react";
import TopArtistsClient from "./top-artists-client";

export default function TopArtistsPage() {
  return (
    <Suspense fallback={null}>
      <TopArtistsClient />
    </Suspense>
  );
}