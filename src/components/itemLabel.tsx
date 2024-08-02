export const ItemLabel = (props: ItemProps) => {
  const { label, Icon, value } = props;

  return (
    <div className="w-max gap-4 flex items-center">
      <div className="flex items-center gap-2">
        <Icon size={20} className="text-textColorLight" />
        <span className="text-sm text-textColorLight">{label} :</span>
      </div>
      <span className="text-sm font-semibold text-textColor">{value}</span>
    </div>
  );
};

type ItemProps = {
  label: string;
  Icon: React.ElementType;
  value: string;
};
