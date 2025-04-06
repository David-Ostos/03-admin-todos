'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {


  const {data: session} = useSession()
  
  useEffect(() => {
    console.log({session})
  }, [session])
  

  return (
    <div>
      <h1>Hello Page</h1>
      <hr />
      <div className="flex flex-col mt-4">
        <span>{session?.user?.image ?? 'no image'}</span>
        <span>{session?.user?.name  ?? 'no name'}</span>
        <span>{session?.user?.email  ?? 'no email'}</span>
      </div>
    </div>
  );
}