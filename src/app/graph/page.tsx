import GraphPage from "@/components/GraphPage";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";

const Graph = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<GraphPage />
		</Suspense>
	);
};

export default Graph;
