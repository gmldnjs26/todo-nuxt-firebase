export const useTransition = () => {
  const accordionBeforeEnter = (el: HTMLElement) => {
    el.style.height = '0'
    el.style.opacity = '0'
    el.style.transition = 'all 0.2s'
  }
  const accordionEnter = (el: HTMLElement) => {
    setTimeout(() => {
      el.style.height = el.scrollHeight + 'px'
      el.style.opacity = '1'
    })
  }
  const accordionBeforeLeave = (el: HTMLElement) => {
    el.style.height = el.scrollHeight + 'px'
    el.style.opacity = '1'
  }
  const accordionLeave = (el: HTMLElement) => {
    setTimeout(() => {
      el.style.height = '0'
      el.style.opacity = '0'
    })
  }

  const rightFullBeforeEnter = (el: HTMLElement) => {
    el.style.transform = 'translateX(100vw)'
    el.style.transition = 'transform 0.5s cubic-bezier(0, 0, 0.2, 1) 0ms'
  }
  const rightFullEnter = (el: HTMLElement) => {
    setTimeout(() => {
      el.style.transform = 'translateX(0px)'
    })
  }
  const rightFullBeforeLeave = (el: HTMLElement) => {
    el.style.transform = 'translateX(0px)'
  }
  const rightFullLeave = (el: HTMLElement) => {
    setTimeout(() => {
      el.style.transform = 'translateX(100vw)'
      el.style.transition = 'transform 0.5s cubic-bezier(0, 0, 0.2, 1) 0ms'
    })
  }

  const rightSideBeforeEnter = (el: HTMLElement) => {
    el.style.backgroundColor = 'rgba(0,0,0,0)'
    el.style.transition = 'background-color 0.5s ease'
    ;(el.firstChild! as HTMLElement).style.transform = 'translateX(563px)'
    ;(el.firstChild! as HTMLElement).style.transition = 'transform 0.5s cubic-bezier(0, 0, 0.2, 1) 0ms'
  }
  const rightSideEnter = (el: HTMLElement) => {
    setTimeout(() => {
      el.style.backgroundColor = 'rgba(0,0,0,0.8)'
      ;(el.firstChild! as HTMLElement).style.transform = 'translateX(0px)'
    })
  }
  const rightSideBeforeLeave = (el: HTMLElement) => {
    el.style.backgroundColor = 'rgba(0,0,0,0.8)'
    ;(el.firstChild! as HTMLElement).style.transform = 'translateX(0px)'
  }
  const rightSideLeave = (el: HTMLElement) => {
    setTimeout(() => {
      el.style.backgroundColor = 'rgba(0,0,0,0)'
      el.style.transition = 'background-color 0.5s ease'
      ;(el.firstChild! as HTMLElement).style.transform = 'translateX(563px)'
      ;(el.firstChild! as HTMLElement).style.transition = 'transform 0.5s cubic-bezier(0, 0, 0.2, 1) 0ms'
    })
  }

  return {
    accordionBeforeEnter,
    accordionEnter,
    accordionBeforeLeave,
    accordionLeave,
    rightFullBeforeEnter,
    rightFullEnter,
    rightFullBeforeLeave,
    rightFullLeave,
    rightSideBeforeEnter,
    rightSideEnter,
    rightSideBeforeLeave,
    rightSideLeave,
  }
}
