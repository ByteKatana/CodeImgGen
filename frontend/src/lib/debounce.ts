function debounce(func: Function, wait: number): Function {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return function (this: any, ...args: any[]) {
    //Clear if there is a timeout already
    clearTimeout(timeoutId ?? undefined)
    timeoutId = setTimeout(() => {
      timeoutId = null
      func.apply(this, args)
    }, wait)
  }
}

export default debounce
