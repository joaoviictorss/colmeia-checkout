"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/contexts/user-context";

const Checkout = () => {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  if (!user) {
    return null;
  }

  return <div>Checkout</div>;
};

export default Checkout;
