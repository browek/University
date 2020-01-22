export interface Groups {
  id: string;
  name: string;
  owner: {
      id: string;
      createdOn: Date,
      modifiedOn: Date,
      firstName: string,
      lastName: string,
      email: string,
      subject: string,
      department: string,
      college: string,
      enabled: boolean,
      accountNonExpired: boolean,
      accountNonLocked: boolean,
      credentialsNonExpired: boolean,
      username: string,
      authorities: [
          {
              authority: string
          }
      ]
  };
  users: [];
  posts: [];
}
