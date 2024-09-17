import { navItems } from "@/utils/data";
import NavItem from "./navitem/NavItem";
import { Bell, Package2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen border-r bg-muted/40 hidden lg:block">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="">P-count</span>
        </Link>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <nav className="flex flex-col items-start px-4 py-2 text-sm font-medium">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            href={item.href}
            icon={item.icon}
            label={item.label}
            badgeCount={item.badgeCount}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

// "use client"

// import { Bird, Rabbit, Turtle } from "lucide-react"

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"

// export default function Component() {
//   return (
//     <div
//       className="relative hidden flex-col items-start gap-8 md:flex"
//     >
//       <form className="grid w-full items-start gap-6">
//         <fieldset className="grid gap-6 rounded-lg border p-4">
//           <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
//           <div className="grid gap-3">
//             <Label htmlFor="model">Model</Label>
//             <Select>
//               <SelectTrigger
//                 id="model"
//                 className="items-start [&_[data-description]]:hidden"
//               >
//                 <SelectValue placeholder="Select a model" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="genesis">
//                   <div className="flex items-start gap-3 text-muted-foreground">
//                     <Rabbit className="size-5" />
//                     <div className="grid gap-0.5">
//                       <p>
//                         Neural{" "}
//                         <span className="font-medium text-foreground">
//                           Genesis
//                         </span>
//                       </p>
//                       <p className="text-xs" data-description>
//                         Our fastest model for general use cases.
//                       </p>
//                     </div>
//                   </div>
//                 </SelectItem>
//                 <SelectItem value="explorer">
//                   <div className="flex items-start gap-3 text-muted-foreground">
//                     <Bird className="size-5" />
//                     <div className="grid gap-0.5">
//                       <p>
//                         Neural{" "}
//                         <span className="font-medium text-foreground">
//                           Explorer
//                         </span>
//                       </p>
//                       <p className="text-xs" data-description>
//                         Performance and speed for efficiency.
//                       </p>
//                     </div>
//                   </div>
//                 </SelectItem>
//                 <SelectItem value="quantum">
//                   <div className="flex items-start gap-3 text-muted-foreground">
//                     <Turtle className="size-5" />
//                     <div className="grid gap-0.5">
//                       <p>
//                         Neural{" "}
//                         <span className="font-medium text-foreground">
//                           Quantum
//                         </span>
//                       </p>
//                       <p className="text-xs" data-description>
//                         The most powerful model for complex computations.
//                       </p>
//                     </div>
//                   </div>
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid gap-3">
//             <Label htmlFor="temperature">Temperature</Label>
//             <Input id="temperature" type="number" placeholder="0.4" />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="grid gap-3">
//               <Label htmlFor="top-p">Top P</Label>
//               <Input id="top-p" type="number" placeholder="0.7" />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="top-k">Top K</Label>
//               <Input id="top-k" type="number" placeholder="0.0" />
//             </div>
//           </div>
//         </fieldset>
//         <fieldset className="grid gap-6 rounded-lg border p-4">
//           <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
//           <div className="grid gap-3">
//             <Label htmlFor="role">Role</Label>
//             <Select defaultValue="system">
//               <SelectTrigger>
//                 <SelectValue placeholder="Select a role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="system">System</SelectItem>
//                 <SelectItem value="user">User</SelectItem>
//                 <SelectItem value="assistant">Assistant</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid gap-3">
//             <Label htmlFor="content">Content</Label>
//             <Textarea
//               id="content"
//               placeholder="You are a..."
//               className="min-h-[9.5rem]"
//             />
//           </div>
//         </fieldset>
//       </form>
//     </div>
//   )
// }
