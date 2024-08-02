import { Badge } from "@/packages/ui";

export const CaseItemLabel = (props: CaseItemLabelProps) => {
  const { label, Icon, value, badge } = props;

  return (
    <div className="flex flex-col gap-2 w-max p-2 ">
      <div className="flex items-center gap-2 ">
        {Icon && <Icon size={15} className="text-textColorLight" />}
        <span className="text-sm text-textColorLight font-semibold ">
          {label}:
        </span>
      </div>
      {badge ? (
        <Badge
          className="flex items-center justify-center"
          variant={
            value === "Open" || value === "Untraced"
              ? "secondary"
              : value === "Found" || value === "Closed" || value === "Arrived"
                ? "success"
                : value === "Submitted"
                  ? "primary"
                  : "danger"
          }
        >
          {value}
        </Badge>
      ) : (
        <h1 className="font-semibold text-textColor text-md">{value}</h1>
      )}
    </div>
  );
};

type CaseItemLabelProps = {
  label: string | number;
  Icon?: React.ElementType;
  value: string;
  badge?: boolean;
};
