import profileAvatar from "@/assets/profileAvatar.webp";
import { ItemLabel, PageHeader } from "@/components";
import { BeneficiaryType, ClientType, UserType } from "@/schema";
import {
  Building2,
  Clock,
  Fingerprint,
  Flag,
  HandPlatter,
  LandPlot,
  Locate,
  PhoneCall,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { z } from "zod";
import { AddressActions } from "@/modules/address";
import { formatDate } from "@/utils";
import { BeneficiaryActions } from "@/modules/beneficiary/actions";
import { BeneficiaryCard } from "@/modules/beneficiary";
import { ClientActions } from "@/modules/client/actions";
import { getAuth } from "@/context";
import { serverApi } from "@/client/server";

const schema = z.string().uuid();
const isUUID = (id: string) => schema.safeParse(id).success;

const Page = async (props: PageProps) => {
  const { params, searchParams } = props;
  const auth = await getAuth();

  if(!params.id) {
    return null
  }

  if (!isUUID(params.id)) {
    return null;
  }

  const client = await serverApi.client.single(params.id);

  const address = await serverApi.address.listByRefId(params.id);
  const beneficiaries = await serverApi.beneficiary.listByClient(params.id);



  return (
    client && (
      <div className="flex w-full flex-col  items-start gap-10  ">
        <div className="relative flex w-full flex-col items-start gap-2 rounded-lg bg-primaryBg p-4 shadow-lg dark:bg-primaryBg/50 ">
          <div className="absolute right-5 top-5 ">
            <ClientActions
              auth={auth}
              action="edit"
              client={client}
              address={address}
            />
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-8 md:flex-row ">
            <Image
              height={500}
              width={500}
              alt="profile image"
              src={client?.image ? client?.image : profileAvatar}
              className="mb-4 h-32 w-32 self-start rounded-full object-cover md:self-start"
            />

            <div className="mb-8 flex  w-fit flex-1 flex-col  gap-2 ">
              <h1 className="text-2xl font-semibold text-sideBarBg dark:text-textColor">
                {client.name + " " + client.surname}
              </h1>

              <div className="mb-4 flex flex-col flex-wrap  gap-x-5 gap-y-2 md:max-w-[900px] md:flex-row">
                <ItemLabel
                  label="Id number"
                  Icon={Fingerprint}
                  value={client?.idNumber}
                />
                <ItemLabel
                  label="Contact number"
                  Icon={PhoneCall}
                  value={client?.contactNumber1}
                />
                <ItemLabel
                  label="Secondary contact number"
                  Icon={PhoneCall}
                  value={client?.contactNumber1}
                />
                <ItemLabel
                  label="Member since"
                  Icon={Clock}
                  value={formatDate(client.createdAt.toDateString(), false)}
                />
              </div>

              {address.length > 0 ? (
                <div className="flex flex-col   justify-between gap-10 rounded-lg">
                  <div className="flex w-fit flex-col gap-2 rounded-lg border border-borderColor/50 p-4 shadow-lg dark:border-borderColor/20">
                    <p className="w-max text-xl font-semibold  text-textColorLight">
                      Physical address
                    </p>
                    <div className="flex flex-col flex-wrap gap-2  md:flex-row md:gap-5">
                      <ItemLabel
                        label="Street Address"
                        Icon={Locate}
                        value={address[0]!.streetAddress}
                      />
                      <ItemLabel
                        label="City"
                        Icon={Building2}
                        value={address[0]!.city}
                      />
                      <ItemLabel
                        label="Zip code"
                        Icon={LandPlot}
                        value={address[0]!.zipCode}
                      />
                      <ItemLabel
                        label="Country"
                        Icon={Flag}
                        value={address[0]!.country}
                      />
                    </div>{" "}
                  </div>

                  <div className=" flex w-fit flex-col gap-2 rounded-lg border border-borderColor/50 p-4 shadow-lg dark:border-borderColor/20">
                    <p className="w-max text-xl font-semibold  text-textColorLight">
                      Postal address
                    </p>
                    <div className="flex flex-col flex-wrap gap-2  md:flex-row md:gap-5">
                      <ItemLabel
                        label="Street Address"
                        Icon={Locate}
                        value={address[1]!.streetAddress}
                      />
                      <ItemLabel
                        label="City"
                        Icon={Building2}
                        value={address[1]!.city}
                      />
                      <ItemLabel
                        label="Zip code"
                        Icon={LandPlot}
                        value={address[1]!.zipCode}
                      />
                      <ItemLabel
                        label="Country"
                        Icon={Flag}
                        value={address[1]!.country}
                      />
                    </div>{" "}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-textColorLight">Add address</span>
                  <AddressActions
                    action="create"
                    user={client}
                    type="multiple"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col rounded-lg bg-primaryBg p-4 dark:bg-primaryBg/50">
          <div className="mb-4 flex w-full items-center justify-between">
            <PageHeader
              title="Beneficiaries"
              header={false}
              Icon={HandPlatter}
            />
            <BeneficiaryActions
              auth={auth}
              action="create"
              clientId={client?.id}
            />
          </div>

        </div>
      </div>
    )
  );
};

export default Page;

export type PageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};
