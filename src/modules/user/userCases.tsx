
// import { UserType } from "@/schema";
// import { Badge, DataTable } from "@/packages/ui";
// import React from "react";
// import { caseColumns } from "../case";

// export const UserCases = async (props: UserCasesProps) => {
//   const { user } = props;

//   const supervisorCases = await trpc.case.listBySupervisor.query(user.id);
//   const agentCases = await trpc.case.listByAgent.query(user.id);
//   const creatorCases = await trpc.case.listByCreator.query(user.id);

//   const cases = [...supervisorCases, ...agentCases, ...creatorCases];
//   const closedCases = cases.filter((item) => item.status === "Closed");
//   const openCases = cases.filter((item) => item.status === "Open");
//   const submittedCases = cases.filter((item) => item.status === "Submitted");
//   return (
//     <div className="w-full flex flex-col gap-4 ">
//       <div className="flex items-center justify-end gap-x-8 py-4 ">
//         <Badge
//           variant="secondary"
//           className="flex items-center justify-center gap-2"
//         >
//           <p className="text-sm font-semibold text-white">Open:</p>
//           <p className="text-sm font-semibold text-white">{openCases.length}</p>
//         </Badge>

//         <Badge
//           variant="primary"
//           className="flex items-center justify-center gap-2"
//         >
//           <p className="text-sm font-semibold text-white">Submitted:</p>
//           <p className="text-sm font-semibold text-white">
//             {submittedCases.length}
//           </p>
//         </Badge>

//         <Badge
//           variant="success"
//           className="flex items-center justify-center gap-2"
//         >
//           <p className="text-sm font-semibold text-white">Closed:</p>
//           <p className="text-sm font-semibold text-white">
//             {closedCases.length}
//           </p>
//         </Badge>
//       </div>

//       <DataTable
//         columns={caseColumns}
//         data={cases}
//         searchColumn={"id"}
//         search={true}
//       />
//     </div>
//   );
// };

// type UserCasesProps = {
//   user: UserType;
// };
