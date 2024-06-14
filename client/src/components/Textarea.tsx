
type TextareaProps = {
  name:string,
  label:string,
  children:JSX.Element,
  textareaRef?:React.MutableRefObject<HTMLTextAreaElement|null>,
  textareaValue?:string,
}


const Textarea = (props:TextareaProps) =>{

  const {label, name, textareaRef, textareaValue} = props;
  const svg = props.children;

  return(
    <div>
    <label htmlFor={label} className="sr-only">{label}</label>
    <div className="relative">
      <textarea  name={name} id={label} ref={textareaRef}
      defaultValue={textareaValue}
      className="py-3 ps-11 pe-4 block w-full dark:bg-white/10 dark:border-white/20 bg-slate-200 rounded-lg text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11 placeholder-slate-600 dark:placeholder-slate-400 max-h-[20rem]"
      rows={10} 
      placeholder={label}></textarea>

      <div className="absolute inset-y-4 start-0 flex  pointer-events-none z-20 ps-4">
      {svg}
      </div>
    </div>
  </div>
  )
}
export default Textarea;