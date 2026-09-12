import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Zustand from "./zustand/Zustand";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TanstackQuery from "./react-query/TanstackQuery";

const queryClient = new QueryClient();

export default function App() {
  return <div>
    {/* <Zustand/> */}
    <QueryClientProvider client={queryClient}>
      <TanstackQuery/>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </div>
}