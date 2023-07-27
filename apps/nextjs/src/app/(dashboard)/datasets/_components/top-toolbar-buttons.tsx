'use client';

import { Button } from '@haxiom/ui/button';
import { Book, History, Star } from '@haxiom/ui/icons';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@haxiom/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@haxiom/ui/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const DEFAULT_DOCS_URL = 'https://axiom.co/docs';
export const ROUTE_TO_DOCS_URL: Record<string, string> = {
  datasets: 'https://axiom.co/docs/query-data/datasets',
  default: DEFAULT_DOCS_URL,
};

const matchRouteToDocsUrl = (route: string) => {
  const match = ROUTE_TO_DOCS_URL[route];

  if (!match) {
    return DEFAULT_DOCS_URL;
  }

  return match;
};

export const DocsButton = () => {
  const pathName = usePathname();
  const topLevelRoute = pathName.split('/')[1];

  const docsUrl = matchRouteToDocsUrl(topLevelRoute ?? 'default');

  return (
    <Button
      asChild
      options={{
        variant: 'outline',
        size: 'icon',
      }}
    >
      <Link href={docsUrl} target="_blank">
        <Book className="h-4 w-4" />
      </Link>
    </Button>
  );
};

export const StarredQuerriesButton = () => {
  const pathname = usePathname();

  const urlSegments = pathname.split('/');
  const datasetIdFromUrl = urlSegments[urlSegments.indexOf('datasets') + 1];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          options={{
            variant: 'outline',
            size: 'icon',
          }}
        >
          <Star className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Starred Queries</SheetTitle>
        {datasetIdFromUrl ? <>for dataset {datasetIdFromUrl}</> : <>for all datasets</>}
      </SheetContent>
    </Sheet>
  );
};

export const QueryHistoryButton = () => {
  const pathname = usePathname();

  const urlSegments = pathname.split('/');
  const datasetIdFromUrl = urlSegments[urlSegments.indexOf('datasets') + 1];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          options={{
            variant: 'outline',
            size: 'icon',
          }}
        >
          <History className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Query History</SheetTitle>
        <Tabs>
          <TabsList>
            <TabsTrigger value="mine">My queries</TabsTrigger>
            <TabsTrigger value="team">Team queries</TabsTrigger>
          </TabsList>
          <TabsContent value="mine">
            <>My queries {datasetIdFromUrl ? <>for dataset {datasetIdFromUrl}</> : <>for all datasets</>}</>
          </TabsContent>
          <TabsContent value="team">
            <>Team queries {datasetIdFromUrl ? <>for dataset {datasetIdFromUrl}</> : <>for all datasets</>}</>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
