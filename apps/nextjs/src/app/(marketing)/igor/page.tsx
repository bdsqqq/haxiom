import { Button } from "@haxiom/ui/button";
import { Input, TextArea } from "@haxiom/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@haxiom/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@haxiom/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@haxiom/ui/card";
import { Checkbox } from "@haxiom/ui/checkbox";
import { CommandDialogDemo } from "./_components/command-palette-demo"
import { DataTableDemo } from "./_components/data-table-demo"
import { DropdownMenuDemo } from "./_components/dropdown-menu-demo";
import { Label } from "@haxiom/ui/label";
import { ScrollArea } from "@haxiom/ui/scroll-area";
import { SelectDemo } from "./_components/select-demo";
import { Sheet, SheetTrigger, SheetContent} from "@haxiom/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger} from "@haxiom/ui/tabs";

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
          <Checkbox name="checkbox" id="checkbox" />
          <Label htmlFor="checkbox">Checkbox</Label>
        </fieldset>

        <CommandDialogDemo />

        <DataTableDemo />

        <Dialog>
          <DialogTrigger asChild>
            <Button>open dialog</Button>
          </DialogTrigger>
          <DialogContent>modal</DialogContent>
        </Dialog>
        
        <DropdownMenuDemo />

        <ScrollArea className="h-24">
          {new Array(100).fill(0).map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              Item {i}
            </div>
          ))}
        </ScrollArea>

        <SelectDemo />

        <Sheet>
          <SheetTrigger asChild>
            <Button>open Sheet</Button>
          </SheetTrigger>
          <SheetContent>Sheet</SheetContent>
        </Sheet>

        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
