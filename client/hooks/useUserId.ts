import { AUTHOR_BY_ID_QUERY } from "@/lib/queries";
import { client } from "@/lib/sanity";
import { useUser } from "@clerk/clerk-expo";
import React, { useEffect, useCallback } from "react";

export function useUserId() {
  const [userId, setUserId] = React.useState<string | null>(null);
  const [userData, setUserData] = React.useState<any | null>(null);
  const { user } = useUser();

  const fetchUserId = async () => {
    try {
      const response = await client.fetch(AUTHOR_BY_ID_QUERY, {
        id: user?.id,
      });
      setUserData(response);
      setUserId(response?._id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Memoized function for manual invalidation
  const invalidate = useCallback(() => {
    fetchUserId();
  }, [user]);

  // Fetch data when user changes or invalidation is triggered
  useEffect(() => {
    if (user) {
      fetchUserId();
    }
  }, [user]);

  return { userId, userData, invalidate };
}
