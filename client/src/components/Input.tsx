
type InputProps = {
  name:string,
  type:string,
  label:string,
  children:JSX.Element,
  inputRef?:React.MutableRefObject<HTMLInputElement|null>,
  inputValue?:string,
}


const Input = (props:InputProps) =>{

  const {label, type, name, inputRef, inputValue} = props;
  const svg = props.children;

  return(
    <div>
    <label htmlFor={label+type} className="sr-only">{label}</label>
    <div className="relative">
      <input name={name} type={type} id={label+type} ref={inputRef} 
      defaultValue={inputValue}
      className="py-3 ps-11 pe-4 block w-full dark:bg-white/10 dark:border-white/20 bg-slate-200 rounded-lg text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11 placeholder-slate-600 dark:placeholder-slate-400" placeholder={label}/>
      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
      {svg}
      </div>
    </div>
  </div>
  )
}
export default Input;

/*        <svg className="flex-shrink-0 size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>*/