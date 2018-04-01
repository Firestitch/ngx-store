
export class FsStoreObject {
  static readonly EVENT_SET = 'set';
  static readonly EVENT_REMOVE = 'remove';
  static readonly EVENT_INIT = 'init';

  constructor(private name, private event, private value?) {}
}
