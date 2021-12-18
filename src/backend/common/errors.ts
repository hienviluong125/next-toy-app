export class CannotGetRecordError extends Error {
  recordName: string
  errCode: string

  constructor(recordName: string) {
    super(`cannot get ${recordName.toLowerCase()}`)
    this.recordName = recordName
    this.errCode = `cannotGet${recordName.charAt(0).toUpperCase() + recordName.slice(1)}`
  }
}

export class CannotGetRecordListError extends Error {
  recordName: string
  errCode: string

  constructor(recordName: string) {
    super(`cannot get list of ${recordName.toLowerCase()}`)
    this.recordName = recordName
    this.errCode = `cannotGet${recordName.charAt(0).toUpperCase() + recordName.slice(1)}List`
  }
}

export class CannotProcessRecordError extends Error {
  recordName: string
  errCode: string

  constructor(recordName: string) {
    super(`cannot process ${recordName.toLowerCase()}`)
    this.recordName = recordName
    this.errCode = `cannotProcess${recordName.charAt(0).toUpperCase() + recordName.slice(1)}`
  }
}

export class CannotDeleteRecordError extends Error {
  recordName: string
  errCode: string

  constructor(recordName: string) {
    super(`cannot delete ${recordName.toLowerCase()}`)
    this.recordName = recordName
    this.errCode = `cannotDelete${recordName.charAt(0).toUpperCase + recordName.slice(1)}`
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials')
  }
}
