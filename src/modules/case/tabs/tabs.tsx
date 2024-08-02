import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/packages/ui";
import {
  ClipboardList,
  HandPlatter,
  Hourglass,
  NotebookPen,
} from "lucide-react";
import { BeneficiaryTab } from "./beneficiaryTab";
import { TaskActions } from "@/modules/task";
import { TaskTab } from "./taskTab";
import { NoteActions } from "@/modules/note/actions";
import { NoteTab } from "./noteTab";
import { CaseType } from "@/schema";
import { TimelineTab } from "./timelineTab";
import { AuthUserType } from "@/context";

export const CaseTabs = (props: CaseTabsProps) => {
  const { beneficiaryId, case: openCase, auth } = props;
  return (
    <Tabs className="w-full" defaultValue="beneficiary">
      <TabsList className="grid w-full grid-cols-4 rounded-full">
        <TabsTrigger
          value="beneficiary"
          className="flex items-center gap-2 w-full h-full rounded-full "
        >
          <HandPlatter className="text-inherit" size={15} />
          <span className="hidden md:flex text-inherit font-semibold">
            Beneficiary
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="timeline"
          className="flex items-center gap-2 w-full h-full rounded-full "
        >
          <Hourglass className="text-inherit" size={15} />
          <span className="hidden md:flex text-inherit font-semibold">
            Timeline
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="tasks"
          className="flex items-center gap-2 w-full h-full rounded-full "
        >
          <ClipboardList className="text-inherit" size={15} />
          <span className="hidden md:flex text-inherit font-semibold">
            Tasks
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="notes"
          className="flex items-center gap-2 w-full h-full rounded-full "
        >
          <NotebookPen className="text-inherit" size={15} />
          <span className="hidden md:flex text-inherit font-semibold">
            Notes
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="beneficiary"
        className="bg-secondaryBg dark:bg-primaryBg/50 p-4 border border-borderColor/50 rounded-lg "
      >
        <BeneficiaryTab
          beneficiaryId={beneficiaryId}
          caseId={openCase.id}
          auth={auth}
        />
      </TabsContent>

      <TabsContent
        value="timeline"
        className="bg-secondaryBg dark:bg-primaryBg/50 p-4 border border-borderColor/50 rounded-lg "
      >
        <h1 className="font-semibold text-lg text-textColorLight">Timeline</h1>
        <TimelineTab caseId={openCase?.id} />
      </TabsContent>

      <TabsContent
        value="tasks"
        className="bg-secondaryBg dark:bg-primaryBg/50 p-4 border border-borderColor/50 rounded-lg "
      >
        <div className="w-full flex items-center justify-between mb-4 border-b border-borderColor/50 pb-2">
          <h1 className="font-semibold text-lg text-textColorLight">Tasks</h1>
          <TaskActions case={openCase} />
        </div>
        <TaskTab caseId={openCase?.id} />
      </TabsContent>

      <TabsContent
        value="notes"
        className="bg-secondaryBg dark:bg-primaryBg/50 p-4 border border-borderColor/50 rounded-lg "
      >
        <div className="w-full flex items-center justify-between mb-4 border-b border-borderColor/50 pb-2">
          <h1 className="font-semibold text-lg text-textColorLight">Notes</h1>
          <NoteActions case={openCase} />
        </div>
        <NoteTab caseId={openCase?.id} />
      </TabsContent>
    </Tabs>
  );
};

type CaseTabsProps = {
  beneficiaryId: string;
  case: CaseType;
  auth: AuthUserType;
};
