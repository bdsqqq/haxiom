export default async function Page({
  params,
}: {
  params: Promise<{ datasetId: string }>;
}) {
  const { datasetId } = await params;

  return <div>Stream dataset: {datasetId}</div>;
}
