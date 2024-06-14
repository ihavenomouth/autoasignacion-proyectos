type CheckboxProps = {
  label: string;
  checked?: boolean;
  name: string;
  inputRef?: React.MutableRefObject<HTMLInputElement|null>
};

const Checkbox = ({ label, checked, name, inputRef }: CheckboxProps) => {
  const clases = "relative w-[35px] h-[21px] bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-orange-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-orange-600 checked:border-orange-600 focus:checked:border-orange-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-orange-500 dark:checked:border-orange-500 dark:focus:ring-offset-gray-600\
  before:inline-block before:size-4 before:bg-white checked:before:bg-orange-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-orange-200";

  let checkBox; 
  if(checked)
    checkBox= <input type="checkbox" id={name} defaultChecked className={clases} ref={inputRef}/>
  else
    checkBox= <input type="checkbox" id={name} className={clases} ref={inputRef}/>


  return (
    <div className="flex items-center">
      {checkBox}
      <label htmlFor={name} className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
