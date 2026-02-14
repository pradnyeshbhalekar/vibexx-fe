"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SonicPioneersPage from "./top-artists-client";

export default function TopArtistsPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("jwt", token);
      router.replace("/top-artists"); // clean URL
    }
  }, [params, router]);

  // render your actual UI
  return <SonicPioneersPage/>;
}