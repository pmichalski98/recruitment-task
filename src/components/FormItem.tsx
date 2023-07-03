interface FormItemProps {
  imgUrl: string;
  currency: "PLN" | "EUR";
}
const FormItem = ({ imgUrl, currency }: FormItemProps) => {
  return (
    <div className=" p-6 flex gap-4 items-center">
      <img
        className="shadow rounded"
        width={50}
        height={50}
        alt={currency}
        src={imgUrl}
      />
      <span className="font-medium text-xl">{currency}</span>
    </div>
  );
};

export default FormItem;
