import { makeAutoObservable } from 'mobx';
import List from './list';
import Task from './task';

export default class AppInstance {
  lists: List[];
  activeList: List;
  taskBeingEdited = null as Task | null;

  constructor() {
    this.lists = [new List('Your tasks'), new List('Another list')];
    this.activeList = this.lists[0];
    makeAutoObservable(this);
  }

  public addList(newList: List) {
    this.lists.push(newList);
  }

  public deleteList(listToDelete: List) {
    this.lists = this.lists.filter(list => list !== listToDelete);
    if (listToDelete === this.activeList) {
      this.setActiveList(this.lists[0]);
    }
  }

  public setActiveList(list: List) {
    this.activeList = list;
    this.taskBeingEdited = null;
  }

  public setTaskBeingEdited(task: Task | null) {
    this.taskBeingEdited = task;
  }
}