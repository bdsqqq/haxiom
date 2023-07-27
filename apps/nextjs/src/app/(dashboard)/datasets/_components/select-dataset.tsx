'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@haxiom/ui/select';
import { MOCK_DATASETS } from '~/app/(dashboard)/_constants';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const SelectDataset = () => {
  const router = useRouter();
  const pathname = usePathname();

  const urlSegments = pathname.split('/');
  const datasetIdFromUrl = urlSegments[urlSegments.indexOf('datasets') + 1] ?? '';

  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(datasetIdFromUrl);

  useEffect(() => {
    console.log('datasetIdFromUrl changed', datasetIdFromUrl);
    setSelectedDatasetId(datasetIdFromUrl);
    router.push(`/datasets/${datasetIdFromUrl}`);
  }, [datasetIdFromUrl, router]);

  return (
    <Select
      defaultValue={datasetIdFromUrl ? datasetIdFromUrl : ''}
      value={selectedDatasetId}
      onValueChange={(newDatasetId) => {
        setSelectedDatasetId(newDatasetId);
        router.push(`/datasets/${newDatasetId}`);
      }}
    >
      <SelectTrigger className="w-[240px] ring-offset-0">
        <SelectValue placeholder="Select dataset..." />
      </SelectTrigger>
      <SelectContent sideOffset={0} alignOffset={0}>
        <SelectItem value="" className="hidden">
          Select dataset...
        </SelectItem>
        {MOCK_DATASETS.map((dataset) => (
          <SelectItem key={dataset.id} value={dataset.id}>
            {dataset.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
