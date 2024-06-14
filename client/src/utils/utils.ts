export function formDataToJson(formData:FormData) {
  return JSON.stringify( 
    Object.fromEntries(
      Array.from(formData.keys()).map(key => [
      key, formData.getAll(key).length > 1 ? 
      formData.getAll(key) : formData.get(key)
      ])
    )
  )
}