import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]); // Add router as a dependency

  return null; // Since this component redirects, you don't need to render anything
}
