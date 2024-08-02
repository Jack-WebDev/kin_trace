import React from "react";
import { cn } from "@/lib";
import { CircularProgress } from "@/components";
import {
  ChevronRight,
  HandPlatter,
  Handshake,
  MapPin,
  MapPinOff,
  MapPinned,
} from "lucide-react";
import Link from "next/link";
import { trace } from "console";

export const DashboardWidget = (props: DashboardWidgetProps) => {
  const {
    className,
    title,
    Icon,
    iconClassName,
    completed,
    total,
    submitted,
    tracing,
    open,
    capturing,
    link,
    clients,
    beneficiaries,
    found,
    traced,
    notFound,
  } = props;

  const percentage = completed ? Math.floor((completed / total) * 100) : 0;
  return (
    <Link
      href={link}
      className={cn(
        "p-8 rounded-lg shadow-lg w-full md:w-[490px] flex flex-col bg-primaryBg text-textColor hover:scale-105 transition-all",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold text-inherit text-2xl">{title}</h1>
        <Icon size={40} className={cn("text-primary", iconClassName)} />
      </div>

      {capturing ? (
        <div className="">
          <WidgetLabel
            label="Clients"
            value={clients ? clients : 0}
            Icon={Handshake}
            className="w-48"
          />
          <WidgetLabel
            label="Beneficiary"
            value={beneficiaries ? beneficiaries : 0}
            Icon={HandPlatter}
            className="w-48"
          />
        </div>
      ) : tracing ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-4">
          <div className="w-max flex flex-col gap-0">
            <WidgetLabel
              label="Traced"
              value={traced ? traced : 0}
              Icon={MapPin}
              className="w-48 "
            />
            <WidgetLabel
              label="Found"
              value={found ? found : 0}
              Icon={MapPinned}
              className="w-48 text-success"
            />

            <WidgetLabel
              label="Not Found"
              value={notFound ? notFound : 0}
              Icon={MapPinOff}
              className="w-48 text-danger "
              iconClassName=""
            />
          </div>
          <CircularProgress percentage={percentage} total={total} />
        </div>
      ) : (
        <div className="flex items-center justify-between mb-4">
          <CircularProgress percentage={percentage} total={total} />
          <div className="flex flex-col gap-0">
            <WidgetLabel label="Closed" value={completed ? completed : 0} />

            <WidgetLabel label="Open" value={open ? open : 0} />

            <WidgetLabel label="Submitted" value={submitted ? submitted : 0} />
          </div>
        </div>
      )}
    </Link>
  );
};

const WidgetLabel = (props: {
  label: string;
  value: string | number;
  Icon?: React.ElementType;
  className?: string;
  iconClassName?: string;
}) => {
  const Icon = props.Icon;
  return (
    <div
      className={cn(
        "flex items-center text-textColor justify-between w-36",
        props.className,
      )}
    >
      <div className="flex items-center gap-2">
        {Icon && (
          <Icon
            size={20}
            className={cn("text-textColorLight", props.iconClassName)}
          />
        )}
        <span className="text-md font-normal text-textColor">
          {props.label}
        </span>
      </div>
      <span className="text-lg font-normal text-inherit">{props.value}</span>
    </div>
  );
};

type DashboardWidgetProps = {
  className?: string;
  Icon: React.ElementType;
  title: string;
  iconClassName?: string;
  completed?: number;
  total: number;
  submitted?: number;
  clients?: number;
  beneficiaries?: number;
  open?: number;
  capturing?: boolean;
  tracing?: boolean;
  traced?: number;
  found?: number;
  notFound?: number;
  link: string;
};
