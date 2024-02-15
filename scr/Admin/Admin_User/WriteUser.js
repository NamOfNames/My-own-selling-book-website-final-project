export class WriteUser {
  constructor() {}

  WriteUser(user, dbrt, ref, set) {
    set(ref(dbrt, `user/${user.id}`), user);
  }
  updateUser(user, dbrt, ref, update) {
    update(ref(dbrt, `user/${user.id}`), user);
  }
  removeUser(id, dbrt, ref, remove) {
    remove(ref(dbrt, `user/${id}`));
  }
}
