import { Button } from '@haxiom/ui/button';
import { TopToolBar } from '../_components/top-tool-bar';
import { SelectDataset } from './_components/select-dataset';
import { History } from '@haxiom/ui/icons';
import { DocsButton, StarredQuerriesButton } from './_components/top-toolbar-buttons';

export default function DatasetsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopToolBar className="justify-between">
        <div className="flex h-full items-center">
          <SelectDataset />
        </div>
        <div className="flex h-full items-center gap-2">
          <DocsButton />
          <Separator />
          <StarredQuerriesButton />

          <Button
            options={{
              variant: 'outline',
              size: 'icon',
            }}
          >
            <History className="h-4 w-4" />
          </Button>
        </div>
      </TopToolBar>
      {children}
    </>
  );
}

const Separator = () => <div className="bg-gray-6 w-px my-2 h-full mx-2" />;
