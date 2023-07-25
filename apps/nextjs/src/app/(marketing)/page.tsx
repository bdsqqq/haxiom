import { Button } from "@haxiom/ui/button";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="">
      <div className="flex h-full min-h-screen w-full items-center justify-center gap-4">
        <Button variant={"destructive"} size={"sm"}>
          Hej do
        </Button>
        <Button variant={"destructive"}>Hej do</Button>
        <Button variant={"destructive"} size="lg">
          Hej do
        </Button>
      </div>
    </main>
  );
}
