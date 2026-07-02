import ConvertPairPage from "@/pages/convert-pair";
import type { ConvertPair } from "@/lib/convertPairs";

interface ConvertPairEnPageProps {
  pair: ConvertPair;
}

export default function ConvertPairEnPage({ pair }: ConvertPairEnPageProps) {
  return <ConvertPairPage pair={pair} lang="en" />;
}
