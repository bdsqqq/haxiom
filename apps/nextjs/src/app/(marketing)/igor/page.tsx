import { Button } from "@haxiom/ui/button";
import { Input, TextArea } from "@haxiom/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@haxiom/ui/dialog";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="">
      <div className="flex h-full min-h-screen max-w-xl mx-auto flex-col items-center justify-center gap-4">
        <Input placeholder="placeholder..." />
        <TextArea placeholder="another placeholder..." />

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
            variant: "modal",
            side: "left",
          }}>left</DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
