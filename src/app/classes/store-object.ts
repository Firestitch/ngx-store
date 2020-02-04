export class FsStoreObject {
  static readonly EVENT_SET = 'set';
  static readonly EVENT_REMOVE = 'remove';
  static readonly EVENT_INIT = 'init';

  constructor(public name, public event, public value?) {}
}
