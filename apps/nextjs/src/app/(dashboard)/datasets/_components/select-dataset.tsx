'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@haxiom/ui/select';
import { MOCK_DATASETS } from '~/app/(dashboard)/_constants';
import { usePathname, useRouter } from 'next/navigation';

export const SelectDataset = () => {
  const router = useRouter();
  const pathname = usePathname();

  const urlSegments = pathname.split('/');
  const datasetIdFromUrl = urlSegments[urlSegments.indexOf('datasets') + 1];

  return (
    <Select
      defaultValue={datasetIdFromUrl ? datasetIdFromUrl : undefined}
      onValueChange={(datasetId) => {
        router.push(`/datasets/${datasetId}`);
      }}
    >
      <SelectTrigger className="w-[240px] ring-offset-0">
        <SelectValue placeholder="Select dataset..." />
      </SelectTrigger>
      <SelectContent sideOffset={0} alignOffset={0}>
        {MOCK_DATASETS.map((dataset) => (
          <SelectItem key={dataset.id} value={dataset.id}>
            {dataset.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
