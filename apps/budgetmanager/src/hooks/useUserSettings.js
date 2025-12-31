import { useQuery } from "@tanstack/react-query";
import { ENV } from "../config/env";

export function useUserSettings() {
  return useQuery({
    queryKey: ["userSettings"],
    queryFn: async () => {
      const res = await fetch(`${ENV.BACKEND_URL}/api/v1/settings`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Could not fetch settings");
      return res.json();
    },
  });
}
