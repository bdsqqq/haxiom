'use client';

import { Button } from '@haxiom/ui/button';
import { Book } from '@haxiom/ui/icons';
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
