import { cookies } from "next/headers";
import { TabBar } from "@/components";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Cookies Page",
  description: "This is the cookies page",
};

export default async function CookiesPage() {

  const cookiesStore = await cookies()
  const selectedTab = ()=>{
    if(cookiesStore.has("selectedTab")){
    return Number(cookiesStore.get("selectedTab")!.value)
    }
    return 1
  }
  console.log(selectedTab())
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

      <div className="flex flex-col gap-4">
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={selectedTab()} />
      </div>

    </div>
  );
}