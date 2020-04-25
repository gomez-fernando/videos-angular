export class User {
  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public nick: string,
    public email: string,
    public password: string,
    public role: string,
    public created_at: string
  ) {}
}
