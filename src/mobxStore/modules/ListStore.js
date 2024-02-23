import { makeAutoObservable } from 'mobx'
class ListStore {

  list = [ 'REACT', 'VUE']

  constructor () {
    makeAutoObservable(this)
  }

  addList = () => {
    this.list.push( 'Angular' )
  }

}

export { ListStore }
