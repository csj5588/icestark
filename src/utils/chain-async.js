class ChainAsync {
  constructor(fn) {
    this.fn = fn
    this.successor = null
  }

  setNextSuccessor = (successor) => {
    return (this.successor = successor)
  }

  passRequest = (...args) => {
    const ret = this.fn.apply(this, args)

    if (ret === 'nextSuccessor') {
      return this.next()
    }

    return ret
  }

  next = (...args) => {
    return this.successor && this.successor.passRequest.apply(this.successor, args)
  }
}

export default ChainAsync
