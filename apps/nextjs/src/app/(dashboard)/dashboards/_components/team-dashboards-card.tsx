import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@haxiom/ui/card';
import { Logo, Users } from '@haxiom/ui/icons';
import Link from 'next/link';

const MAX_DASHBOARDS = 5;
// TODO: make MOCK_DASHBOARDS
const DASHBOARDS: string[] = ['', '', '', ''];
const DASHBOARDS_TO_RENDER = DASHBOARDS.slice(0, MAX_DASHBOARDS);

export const TeamDashboardsCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 items-start">
        <CardTitle className="flex gap-2">
          <Users className="h-4 w-4" /> Team Dashboards
        </CardTitle>
        <CardDescription>Only you can see and change these dashboards</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-0">
        {DASHBOARDS_TO_RENDER.length ? (
          DASHBOARDS_TO_RENDER.map((dashboard) => <Dashboard key={dashboard} />)
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
};

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <p>no queries in history</p>
    </div>
  );
};

// TODO: Update with actual content once MOCK_DASHBOARDS is done
const Dashboard = () => {
  return (
    <Link
      className="w-full flex justify-between h-full p-4 hover:bg-element-hover focus:bg-element-hover focus:ring-offset-0 [&:not(:last-child)]:border-b"
      href={''}
    >
      <div className="flex gap-2">
        <Logo className="mt-1 h-6 w-6 shrink-0" />
        <div>
          <h4 className="leading-0">Title title</h4>

          <p className="text-subtle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, labore?</p>
        </div>
      </div>
    </Link>
  );
};
