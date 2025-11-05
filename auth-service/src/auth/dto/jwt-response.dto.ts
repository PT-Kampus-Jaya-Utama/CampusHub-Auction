export class JwtResponseDto {
  token: string

  constructor(token: string) {
    this.token = token
  }
}
