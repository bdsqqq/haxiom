import { Button } from "@haxiom/ui/button";
import { Input, TextArea } from "@haxiom/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@haxiom/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@haxiom/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@haxiom/ui/card";
import { Checkbox } from "@haxiom/ui/checkbox";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="">
      <div className="flex h-full min-h-screen max-w-xl mx-auto flex-col items-center justify-center gap-4">
        <Input placeholder="placeholder..." />
        <TextArea placeholder="another placeholder..." />

        <Avatar>
          <AvatarImage src="https://github.com/bdsqqq.png" />
          <AvatarFallback>IB</AvatarFallback>
        </Avatar>

        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>Card Content</CardContent>
          <CardFooter>Card Footer</CardFooter>
        </Card>

        <fieldset className="inline-flex gap-1 items-center">
          <Checkbox name="checkbox" />
          <label htmlFor="checkbox">Checkbox</label>
        </fieldset>

        <Dialog>
          <DialogTrigger asChild>
            <Button>open</Button>
          </DialogTrigger>
          <DialogContent options={{
            variant: "modal",
          }}>modal</DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button>open</Button>
          </DialogTrigger>
          <DialogContent options={{
            variant: "drawer",
            side: "right",
          }}>right</DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button>open</Button>
          </DialogTrigger>
          <DialogContent options={{
            variant: "drawer",
            side: "left",
          }}>left</DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
