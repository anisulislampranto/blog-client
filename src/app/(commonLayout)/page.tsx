import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";

export default async function Home() {
  const {data, error} = await userService.getSession();

  console.log('this is data', data);

  return (
    <div>
      <Button>Hello</Button>
    </div>
  );
}
