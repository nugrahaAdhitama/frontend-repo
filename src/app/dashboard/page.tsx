"use client";

import React from "react";
import Dashboard from "@/components/Dashboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/token";

function DashboardPage() {
  const router = useRouter();
  const storedToken = getToken();

  useEffect(() => {
    if (!storedToken) {
      router.push("/auth/signin");
    } else {
      router.push("/dashboard");
    }
  }, [storedToken, router]);

  return <Dashboard />;
}

export default DashboardPage;
