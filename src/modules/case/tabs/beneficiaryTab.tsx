import  profileAvatar  from "@/assets/profileAvatar.webp";
import Image from "next/image";
import React from "react";
import { CaseItemLabel } from "..";
import {
  Building2,
  CircleUser,
  Fingerprint,
  Flag,
  LandPlot,
  MapPin,
} from "lucide-react";
import { Badge } from "@/packages/ui";
import { BeneficiaryActions } from "@/modules/beneficiary";
import { AuthUserType } from "@/context";
import { serverApi } from "@/client/server";
import { TraceStatus } from "@prisma/client";

export const BeneficiaryTab = async (props: BeneficiaryTabProps) => {
  const { beneficiaryId, caseId, auth } = props;

  const beneficiary = await serverApi.beneficiary.single(beneficiaryId);
  const addressQuery = await serverApi.address.listByRefId(beneficiaryId);
  const address = addressQuery[0];

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="w-full flex items-center justify-between border-b border-borderColor pb-2">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-lg text-textColorLight">
            Beneficiary
          </h1>
          <Badge
            variant={
              beneficiary?.traceStatus === TraceStatus.Untraced
                ? "secondary"
                : beneficiary?.traceStatus === TraceStatus.Found
                  ? "success"
                  : "danger"
            }
          >
            {beneficiary?.traceStatus}
          </Badge>
        </div>
        {auth.role === "Agent" && (
          <BeneficiaryActions
            beneficiary={beneficiary!}
            address={address}
            action="update"
            caseId={caseId}
            auth={auth}
          />
        )}
      </div>

      <div className="flex flex-col gap-y-4 md:flex-row gap-x-10 w-full items-start">
        <Image
          width={500}
          height={500}
          alt="beneficiary profile image"
          src={beneficiary?.image ? beneficiary?.image : profileAvatar}
          className="w-36 h-36 rounded-full object-cover"
        />

        <div className="flex flex-col gap-y-4 flex-1">
          <div className="flex flex-wrap max-w-full w-full gap-x-5 md:gap-x-40 gap-y-4 items-start justify-start border-b border-borderColor">
            <h1 className="w-full font-semibold text-textColorLight">
              Personal information
            </h1>
            <CaseItemLabel
              label="Names"
              Icon={CircleUser}
              value={`${beneficiary?.name} ${beneficiary?.surname}`}
            />
            <CaseItemLabel
              label="Id Number"
              Icon={Fingerprint}
              value={beneficiary?.idNumber ?? ""}
            />
            <CaseItemLabel
              label="Contact number"
              Icon={CircleUser}
              value={beneficiary?.contactNumber ?? ""}
            />
            <CaseItemLabel
              label="Gender"
              Icon={CircleUser}
              value={beneficiary?.gender ?? ""}
            />
          </div>

          <div className="flex flex-wrap max-w-full w-full gap-x-5 md:gap-x-40 gap-y-4 items-start justify-start">
            <h1 className="w-full font-semibold text-textColorLight">
              Physical address
            </h1>
            <CaseItemLabel
              label="Street address"
              Icon={CircleUser}
              value={address?.streetAddress?? ""}
            />
            <CaseItemLabel
              label="City"
              Icon={Building2}
              value={address?.city ?? ""}
            />
            <CaseItemLabel
              label="Zip code"
              Icon={LandPlot}
              value={address?.zipCode ?? ""}
            />
            <CaseItemLabel
              label="Country"
              Icon={Flag}
              value={address?.country ?? ""}
            />

            <CaseItemLabel
              label="GPS location"
              Icon={MapPin}
              value={`${address?.lat} - ${address?.long}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type BeneficiaryTabProps = {
  beneficiaryId: string;
  caseId: string;
  auth: AuthUserType;
};
