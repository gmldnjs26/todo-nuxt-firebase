/** 알람정보를 수집해 api를 실행시키는 모듈
 *  plugin으로 만들지도 모름?
 */
import { accountStore } from '~/store/index'

function execAlram() {
  const exampleList = accountStore.todoList
  console.log(exampleList)
}

export { execAlram }
