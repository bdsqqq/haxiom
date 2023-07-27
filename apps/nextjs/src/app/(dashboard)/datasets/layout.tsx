import { TopToolBar } from '~/app/(dashboard)/_components/top-tool-bar';
import { VirtualFieldsButton } from '~/app/(dashboard)/datasets/_components/top-toolbar-buttons';
import { SelectDataset } from '~/app/(dashboard)/datasets/_components/select-dataset';
import {
  DocsButton,
  QueryHistoryButton,
  StarredQuerriesButton,
} from '~/app/(dashboard)/_components/top-toolbar-buttons';

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
          <VirtualFieldsButton />
          <StarredQuerriesButton />
          <QueryHistoryButton />
        </div>
      </TopToolBar>
      {children}
    </>
  );
}

const Separator = () => <div className="bg-gray-6 w-px my-2 h-full mx-2" />;
