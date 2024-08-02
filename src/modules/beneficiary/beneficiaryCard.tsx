'use client'
import  profileAvatar  from "@/assets/profileAvatar.webp";
import { AddressType, BeneficiaryType } from "@/schema";
import { Badge } from "@/packages/ui";
import Image from "next/image";
import React from "react";
import { BeneficiaryActions } from ".";
import { CrudActions, ItemLabel } from "@/components";
import {
  Building2,
  Clock,
  Fingerprint,
  Flag,
  LandPlot,
  Locate,
  MapPin,
  PhoneCall,
  UsersRound,
} from "lucide-react";
import { formatDate } from "@/utils";
import { clientApi } from "@/client/react";
import { Beneficiary } from "@prisma/client";

export const BeneficiaryCard =  (props: Props) => {
  const { beneficiary } = props;

  const {data: address, isLoading, error} = clientApi.address.listByRefId.useQuery(beneficiary.id);

  if(!address) return null

  if (!address[0]) return null;

  return (
    <div className=" p-8 rounded-lg shadow-lg flex flex-col  md:min-w-max max-w-max border border-borderColor/50 dark:border-borderColor/20">
      <div className=" flex gap-x-10 gap-y-4 mb-4 justify-between">
        <div className="flex flex-col gap-4 items-center">
          <Image
            width={500}
            height={500}
            alt="beneficiary profile image"
            src={beneficiary.image ? beneficiary.image : profileAvatar}
            className="w-36 h-36 rounded-full object-cover"
          />

          <Badge
            className="px-8 py-2"
            variant={
              beneficiary?.traceStatus === "Untraced" ? "danger" : "success"
            }
          >
            {beneficiary.traceStatus}
          </Badge>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-10 border-b border-borderColor pb-4 mb-4">
            <h1 className="font-semibold text-lg">
              {beneficiary.name + " " + beneficiary.surname}
            </h1>
            <div className="flex items-center gap-2">
              {<BeneficiaryActions
                action="edit"
                beneficiary={beneficiary}
                address={address[0]}
              />}
              <CrudActions
                partial={true}
                remove
                id={beneficiary.id}
                model="beneficiaries"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <ItemLabel
              label="Contact number"
              Icon={PhoneCall}
              value={beneficiary?.contactNumber}
            />
            <ItemLabel
              label="Id number"
              Icon={Fingerprint}
              value={beneficiary?.idNumber}
            />
            <ItemLabel
              label="Gender"
              Icon={UsersRound}
              value={beneficiary?.gender}
            />
            <ItemLabel
              label="GPS Location"
              Icon={MapPin}
              value={
                beneficiary?.gpsLocation ? beneficiary.gpsLocation : "Untraced"
              }
            />
            <ItemLabel
              label="Date captured"
              Icon={Clock}
              value={formatDate(beneficiary?.createdAt.toISOString())}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-textColorLight text-lg border-b border-borderColor pb-1">
          Physical address
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-2 max-w-[500px]">
          <ItemLabel
            label="Street address"
            Icon={Locate}
            value={address[0].streetAddress}
          />
          <ItemLabel label="City" Icon={Building2} value={address[0].city} />
          <ItemLabel
            label="Zip code"
            Icon={LandPlot}
            value={address[0].zipCode}
          />
          <ItemLabel label="Country" Icon={Flag} value={address[0].country} />
        </div>
      </div>
    </div>
  );
};

type Props = {
  beneficiary: Beneficiary;
};
