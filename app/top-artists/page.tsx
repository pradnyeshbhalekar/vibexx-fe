import { Suspense } from "react";
import TopArtistsClient from "./TopArtistsClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <TopArtistsClient />
    </Suspense>
  );
}