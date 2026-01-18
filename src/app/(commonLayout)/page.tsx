import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();

  console.log('object', cookieStore.toString())

  const res = await fetch('http://localhost:5000/api/auth/get-session', {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  const data = await res.json();
  
  console.log('fetch', data);

  return (
    <div>
      <Button>Hello</Button>
    </div>
  );
}
