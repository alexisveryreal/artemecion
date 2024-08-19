import { useEffect, useState } from "react";

type OS = "Windows" | "MacOS" | "Linux" | "iOS" | "Android" | "Unknown";

const getOS = (): OS => {
  const { userAgent } = navigator;

  if (/Windows/i.test(userAgent)) return "Windows";
  if (/Mac/i.test(userAgent) || /iPhone|iPad|iPod/.test(userAgent))
    return "MacOS";
  if (/Linux/i.test(userAgent) && !/Android/i.test(userAgent)) return "Linux";
  if (/Android/i.test(userAgent)) return "Android";
  if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";

  return "Unknown";
};

export const useOS = (): OS => {
  const [os, setOS] = useState<OS>("Unknown");

  useEffect(() => {
    setOS(getOS());
  }, []);

  return os;
};
