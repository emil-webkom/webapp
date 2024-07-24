"use client";

import UserInfo from "@/components/admin/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const DebugPage = () => {
    const user = useCurrentUser();
    return ( 
        <div className="h-screen">
            <UserInfo user={user} label="Debug" />
        </div>
    );
}
 
export default DebugPage;