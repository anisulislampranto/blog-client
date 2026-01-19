import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { userService } from "@/services/user.service";
import { cookies } from "next/headers";

export default async function Home() {
  const {data, error} = await userService.getSession();

  console.log('this is data', data);

  return (
    <div>
      <Button>Hello</Button>
    </div>
  );
}
