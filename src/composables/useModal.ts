export const useModal = () => {
  // 모달을 열었을 때 뒷 배경 스크롤 되는걸 막기위해
  const onOffBodyScroll = () => {
    const body = document.getElementsByTagName('body')
    if (body) {
      body[0].classList.toggle('overflow-hidden')
    }
  }
  return {
    onOffBodyScroll,
  }
}
