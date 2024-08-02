import React from "react";

export const PageHeader = (props: Props) => {
  const { title, Icon, header } = props;
  return header ? (
    <div className="flex items-center gap-4">
      <span className="font-bold text-4xl text-textColor capitalize">
        {title}
      </span>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <div className="bg-primary  p-3 rounded-lg">
        {Icon && <Icon className="text-white" size={18} />}
      </div>
      <span className="font-semibold text-md text-textColor">{title}</span>
    </div>
  );
};

type Props = {
  title: string;
  Icon?: React.ElementType;
  header?: boolean;
};
