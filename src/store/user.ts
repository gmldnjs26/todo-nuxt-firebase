import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { UserState, MutationTypes } from './type'
import { Category, Todo } from '@/types/todo'
@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true, // can do it -> getters['account/accountInfo']
})
export default class User extends VuexModule implements UserState {
  todoList: Todo[] = []
  categoryList: Category[] = []
  createdAt = '1970-01-01';

  @Mutation
  [MutationTypes.SET_ACCOUNT_INFO](accountInfo: UserState) {
    this.todoList = accountInfo.todoList
    this.createdAt = accountInfo.createdAt
  }

  @Mutation
  [MutationTypes.SET_TODOLIST_COMPLETION]({ todoId, completion }: { todoId: string; completion: boolean }) {
    const target = this.todoList.find((item) => item.id === todoId)
    if (target) target.completion = completion
  }

  @Mutation
  [MutationTypes.SET_TODOLIST_CONTEXT]({ todoId, context }: { todoId: string; context: string }) {
    const target = this.todoList.find((item) => item.id === todoId)
    if (target) target.context = context
  }

  @Mutation
  [MutationTypes.ADD_TODOLIST]({ catId, date }: { catId: string; date: string }) {
    this.todoList.push({
      // FIXME: default 내용들은 로그인, 비로그인으로 나누기
      categoryId: catId,
      id: (this.todoList.length + 1).toString(),
      doDate: date,
      doTime: '0000',
      context: '할일적어줘',
      completion: false,
      createdAt: date,
      userId: 'gmldnjs',
      rowNum: this.todoList.length + 1,
    })
  }

  @Mutation
  [MutationTypes.REMOVE_TODOITEM](todoId: string) {
    const targetIndex = this.todoList.findIndex((item) => item.id === todoId)
    this.todoList.splice(targetIndex, 1)
  }

  @Action({ rawError: true })
  setTodolistCompletion(payload: { todoId: string; completion: boolean }) {
    this.SET_TODOLIST_COMPLETION(payload)
  }

  @Action({ rawError: true })
  setTodolistContext(payload: { todoId: string; context: string }) {
    this.SET_TODOLIST_CONTEXT(payload)
  }

  @Action({ rawError: true })
  addTodolist(payload: { catId: string; date: string }) {
    this.ADD_TODOLIST(payload)
  }

  @Action({ rawError: true })
  removeTodoItem(todoId: string) {
    this.REMOVE_TODOITEM(todoId)
  }
}
